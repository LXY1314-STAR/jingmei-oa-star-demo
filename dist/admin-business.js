/* Session-only domain objects. All policies and actors below are demonstration configuration. */
const AdminBusiness = (() => {
  const clone=x=>JSON.parse(JSON.stringify(x));
  const config={date:'2026-09-07',company:'五粮液精美印务',companies:['五粮液精美印务','演示子公司'],note:'审批岗位、公司范围、文号模板、期限及授权规则为演示配置，待确认。集团OA、ERP均未接通；只处理非涉密材料。'};
  const store={records:[],reservations:[],notifications:[],archives:[],reminders:[],seq:0};
  const def=key=>ADMIN_DEFINITIONS.find(d=>d.key===key);
  const get=id=>store.records.find(r=>r.id===id);
  const person=()=>currentRole().name;
  const roleName={admin:'何静',owner:'刘强',employee:'李明',manager:'公司管理层'};
  const terminal=r=>r.closed||r.cancelled;
  const assignedRole=r=>def(r.key).roles[r.step]||'admin';
  const visible=r=>!!r&&(['admin','manager'].includes(state.role)||r.applicant===person()||r.rows.some(row=>Object.values(row).includes(person()))||state.role==='owner'&&r.department==='生产管理部');
  const canAct=r=>visible(r)&&!terminal(r)&&state.role===assignedRole(r);
  const frozen=r=>(r.key==='issue'&&r.step>=2)||(['minutes','meeting','meetingChange'].includes(r.key)&&r.step>=2);
  const canEdit=r=>!frozen(r)&&(canAct(r)||visible(r)&&!terminal(r)&&r.step===0&&r.applicant===person());
  const status=r=>r.cancelled?'已取消':r.closed?'已归档':r.returned?'已退回':def(r.key).steps[r.step];
  function evidence(r,name,content){r.files.push({id:r.id+'-F'+(r.files.length+1),name,version:'V'+r.version,content,actor:person(),time:config.date});}
  function log(r,action,note){r.history.push({action,note,actor:person(),role:state.role,time:config.date,version:'V'+r.version});}
  function sync(){
    db.todos=db.todos.filter(t=>!String(t.id).startsWith('ADMIN-T-'));
    for(const r of store.records){r.status=status(r);if(!terminal(r))db.todos.push({id:'ADMIN-T-'+r.id,objectId:r.id,type:def(r.key).name,title:r.title+' · '+r.status,role:assignedRole(r),due:r.due,status:'待处理'});}
    db.adminCenter=store.records.map(r=>({...r,type:def(r.key).name,group:def(r.key).group,owner:r.department+' / '+r.owner,tasks:r.key==='supervision'?r.rows:[],audit:r.history,source:r.sourceId||'直接登记',relation:r.links.join(' / ')})).concat(legacy);
  }
  const legacy=db.adminCenter.filter((r,i)=>![0,1,2,3,4,9,10,11,12,13,14,15,16].includes(i));
  function create(key,variant='可办理'){
    const d=def(key),r={id:'ADM17-'+key+'-'+String(++store.seq).padStart(3,'0'),key,code:d.code,title:d.initial+' · '+variant,company:config.company,department:'生产管理部',applicant:key==='rsvp'?'李明':'何静',owner:'刘强',due:'2026-09-25',version:1,revision:0,effectiveVersion:0,step:0,closed:false,cancelled:false,returned:false,fields:Object.fromEntries(d.fields.map(f=>[f.key,f.value])),rows:clone(d.rows),files:[],history:[],snapshots:[],links:[],sourceId:'',sourceVersion:0,variant};
    evidence(r,'业务依据.txt','脱敏演示材料\n'+r.title+'\n依据：2026年度工作安排。\n对象：'+r.id+'\n仅演示用途，非真实审批文件。');
    store.records.push(r);log(r,'登记草稿','建立专属业务明细');return r;
  }
  function snapshot(r){return {version:r.version,fields:clone(r.fields),rows:clone(r.rows),company:r.company,due:r.due,sourceId:r.sourceId,sourceVersion:r.sourceVersion};}
  function sourceAllowed(r,s){
    if(!s||!visible(s)||s.company!==r.company)return false;
    const types={report:['issue'],rsvp:['meeting'],meetingChange:['meeting'],meetingCancel:['meeting'],minutes:['meeting'],supervisionChange:['supervision'],acceptance:['supervision']};
    return !(types[r.key])||types[r.key].includes(s.key);
  }
  function save(id,expected,data){
    const r=get(id);if(!canEdit(r))return '当前身份无权编辑此节点';if(r.revision!==expected)return '对象已更新，请重新打开后办理';
    if(state.role==='employee'&&data.rows?.some(row=>row['参会人']!==person()))return '员工只能提交本人的参会回执';
    if(data.company&&!config.companies.includes(data.company))return '请选择有效公司';
    if(data.sourceId){const s=get(data.sourceId);if(!sourceAllowed({...r,company:data.company||r.company},s))return '来源类型、公司或访问范围不符';}
    r.snapshots.push(snapshot(r));
    for(const k of ['title','due','company','fields','rows','sourceId','sourceVersion'])if(data[k]!==undefined)r[k]=clone(data[k]);
    r.revision++;r.version++;log(r,'保存业务修订','保留修改前字段与明细，有效版本不变');sync();return '';
  }
  function validate(r){
    const f=r.fields,rows=r.rows,s=get(r.sourceId);
    if(!r.title.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(r.due))return '请填写主题及有效期限';
    if(!r.files.length)return '请上传或选择可查看的依据材料';
    if(!rows.length)return '至少保留一条业务明细';
    const need=['report','rsvp','meetingChange','meetingCancel','minutes','supervisionChange','acceptance'];
    if(need.includes(r.key)){
      if(!sourceAllowed(r,s))return '请选择当前公司内可访问的有效业务来源';
      if(['废止','失效'].includes(s.disposition))return '来源文件已废止或失效';
      if(s.cancelled&&!(r.key==='meetingCancel'&&r.step>=2))return '来源已取消，不能继续办理';
      if(r.sourceVersion!==(s.effectiveVersion||s.version))return '来源版本已变化，请重新选择当前有效版本';
      if(['report','rsvp','meetingChange','meetingCancel','minutes'].includes(r.key)&&!s.effectiveVersion)return '来源尚未签发或批准';
    }
    if(r.key==='receipt'&&(!f['来文单位']||!f['来文字号']||!f['办理要求']))return '请补充来文单位、字号及办理要求';
    if(r.key==='receipt'&&r.step===1&&rows.some(x=>f['办理分类']==='传阅'?x['阅知状态']!=='已阅':!x['反馈'].trim()))return '逐人完成阅知或填写承办反馈';
    if(r.key==='issue'){
      if(!f['正文'].trim()||!f['签发依据'].trim())return '正文与签发依据必填';
      if(rows.some(x=>!config.companies.includes(x['发送公司'])||!x['接收部门']))return '发送公司及接收部门不能为空';
      if(r.step===1&&rows.some(x=>!x['会签意见'].trim()))return '请逐项填写部门会签意见';
      if(r.step===3&&r.effectiveVersion!==r.version)return '签发后正文已变化，必须重新会签签发';
    }
    if(r.key==='review'&&r.step===1&&rows.some(x=>x['结论']!=='同意'||!x['评审意见']))return '各部门须填写意见并同意；需修改请执行退回';
    if(r.key==='report'){
      if(f['报送对象']!==f['授权范围'])return '报送对象超出演示授权范围';
      if(rows.some(x=>x['版本']!=='V'+r.sourceVersion||x['核验结论']!=='一致'))return '报送材料版本应与来源一致并逐项核验';
      if(r.step===2&&f['报送结果']!=='成功')return f['报送结果']==='失败'?'报送失败，请登记异常后修正并重试':'请登记报送结果';
    }
    if(r.key==='cleanup'&&rows.some(x=>!visible(get(x['文件编号']))||get(x['文件编号']).company!==r.company||get(x['文件编号']).key!=='issue'||!x['处置原因']||x['处置']==='修订'&&!x['修订正文']))return '每项须关联现有文件，填写处置依据及修订正文';
    if(['meeting','meetingChange'].includes(r.key)){
      if(!f['会议开始']||f['会议结束']<=f['会议开始'])return '会议结束必须晚于开始时间';
      if(store.reservations.some(x=>x.active&&x.meetingId!==(r.key==='meeting'?r.id:r.sourceId)&&x.room===f['会议室']&&f['会议开始']<x.end&&f['会议结束']>x.start))return '会议室时段冲突，请调整时间或会议室';
      if(r.key==='meeting'&&f['申请依据']==='已通过评审/请示')return '会前评审/请示专属流程待第四批接入；当前请使用有依据的直接申请';
      if(r.key==='meeting'&&f['申请依据']==='允许直接申请'&&!f['直接申请依据'].trim())return '请填写允许直接申请的依据';
      if(r.key==='meetingChange'&&!f['变更原因'].trim())return '请填写变更原因';
    }
    if(r.key==='meetingCancel'&&!f['取消原因'].trim())return '取消原因不能为空';
    if(r.key==='rsvp'&&rows.some(x=>x['回执']==='未回复'||x['回执']==='委托'&&!x['委托人']))return '请完成回执，委托参会必须指定委托人';
    if(r.key==='minutes'&&(!f['纪要正文'].trim()||rows.some(x=>!x['议定事项']||x['转督办']==='是'&&(!x['责任人']||!x['期限']||!x['目标']))))return '请补齐纪要正文及需转督办事项的责任、目标、期限';
    if(['supervision','supervisionChange'].includes(r.key)&&rows.some(x=>!x['任务']||!x['责任人']||!x['目标']||!x['期限']||Number(x['进度'])<0||Number(x['进度'])>100))return '逐项填写任务、责任、目标、期限和0至100进度';
    if(r.key==='supervision'&&r.step===1&&rows.some(x=>Number(x['进度'])!==100||!x['反馈'].trim()))return '请完成全部任务并逐项填写成果反馈';
    if(r.key==='supervision'&&r.step===1&&r.files.length<2)return '请补充一份实际成果佐证，可使用页面演示成果文件';
    if(r.key==='supervisionChange'&&(!f['调整原因']||terminal(s)))return '请填写调整原因；已结束督办不可变更';
    if(r.key==='acceptance'){
      if(s.closed)return '来源已销号，不可重复验收';
      if(r.step===0&&(s.rows.some(x=>Number(x['进度'])!==100||!x['反馈'])||r.files.length<2))return '来源任务须完成并提交成果佐证';
      if(r.step===1&&(f['验收结论']!=='通过'||!f['验收意见']||rows.some(x=>x['核验结果']!=='通过'||!x['佐证说明'])))return '填写验收意见并逐项核验；不通过请执行验收退回';
    }
    return '';
  }
  function notify(r,people,kind){for(const receiver of [...new Set(people)]){const id=r.id+'-'+r.version+'-'+kind+'-'+receiver;if(store.notifications.some(x=>x.id===id))continue;store.notifications.push({id,sourceId:r.id,receiver,kind,status:'已生成本地消息',time:config.date});db.messages.push({id,objectId:r.id,title:r.title+' · '+kind,type:'党政通知',read:false,receiver,role:receiver==='李明'?'employee':'owner',time:config.date});}}
  function archive(r){const id='ARC-'+r.id;if(!store.archives.some(x=>x.id===id))store.archives.push({id,sourceId:r.id,title:r.title,company:r.company,version:r.effectiveVersion||r.version,time:config.date,files:clone(r.files)});r.links=[...new Set([...r.links,id])];r.closed=true;}
  function effects(r){
    const s=get(r.sourceId),f=r.fields;
    if(r.key==='issue'&&r.step===2){r.effectiveVersion=r.version;r.approved=snapshot(r);}
    if(r.key==='issue'&&r.step===3){r.documentNumber=r.company+'〔2026〕演示'+r.id.split('-').pop()+'号';r.rows.forEach(x=>x['发布状态']='已发布');r.deliveries=r.rows.map((x,i)=>({id:r.id+'-PUB-'+(i+1),company:x['发送公司'],department:x['接收部门'],version:r.effectiveVersion,status:'已发布',date:config.date}));evidence(r,'签发发布正文.txt',r.documentNumber+'\nV'+r.effectiveVersion+'\n'+f['正文']);notify(r,r.rows.map(x=>x['接收部门']),'公文发布');}
    if(r.key==='review'&&r.step===2)r.effectiveVersion=r.version;
    if(r.key==='cleanup'&&r.step===2)for(const row of r.rows){const d=get(row['文件编号']);d.snapshots.push(snapshot(d));d.disposition=row['处置'];if(row['处置']==='修订'){d.version++;d.fields['正文']=row['修订正文'];d.effectiveVersion=d.version;}d.revision++;log(d,'清理目录更新',r.id+' / '+row['处置']+' / '+row['处置原因']);r.links.push(d.id);}
    if(['meeting','meetingChange'].includes(r.key)&&r.step===1){const target=r.key==='meeting'?r:s;if(target!==r){target.snapshots.push(snapshot(target));Object.assign(target.fields,clone(f));target.rows=clone(r.rows);target.version++;target.revision++;log(target,'会议变更生效',r.id+' / '+f['变更原因']);}target.effectiveVersion=target.version;store.reservations=store.reservations.filter(x=>x.meetingId!==target.id);store.reservations.push({id:'BOOK-'+target.id,meetingId:target.id,room:f['会议室'],start:f['会议开始'],end:f['会议结束'],active:true,version:target.effectiveVersion});r.links.push(target.id,'BOOK-'+target.id);r.sourceVersion=target.effectiveVersion;}
    if(r.key==='meetingCancel'&&r.step===1){s.cancelled=true;s.revision++;store.reservations.filter(x=>x.meetingId===s.id).forEach(x=>x.active=false);log(s,'会议取消',r.id+' / '+f['取消原因']);}
    if(['meeting','meetingChange','meetingCancel'].includes(r.key)&&r.step===2){const target=r.key==='meeting'?r:s;notify(r,target.rows.map(x=>x['参会人']),r.key==='meetingCancel'?'会议取消':r.key==='meetingChange'?'会议变更':'会议邀请');}
    if(r.key==='rsvp'&&r.step===0){for(const row of r.rows){const existing=s.rows.find(x=>x['参会人']===row['参会人']);if(existing)Object.assign(existing,clone(row));else s.rows.push(clone(row));}log(s,'收到参会回执',r.id);s.revision++;}
    if(r.key==='receipt'&&r.step===0&&f['办理分类']==='传阅')notify(r,r.rows.map(x=>x['接收人']),'来文阅知');
    if(r.key==='receipt'&&r.step===0&&f['办理分类']==='承办')notify(r,r.rows.map(x=>x['接收人']),'承办分派');
    if(r.key==='minutes'&&r.step===2){r.effectiveVersion=r.version;for(const row of r.rows.filter(x=>x['转督办']==='是')){const t=create('supervision','纪要转入');t.title=row['议定事项'];t.sourceId=r.id;t.sourceVersion=r.version;t.fields['来源类型']='会议纪要';t.due=row['期限'];t.rows=[{'任务':row['议定事项'],'责任人':row['责任人'],'目标':row['目标'],'期限':row['期限'],'进度':0,'反馈':''}];r.links.push(t.id);t.links.push(r.id);}notify(r,[f['发布范围']],'纪要发布');}
    if(r.key==='supervision'&&r.step===0){r.due=r.rows.map(x=>x['期限']).sort().at(-1);notify(r,r.rows.map(x=>x['责任人']),'督办分派');}
    if(r.key==='supervision'&&r.step===2){r.effectiveVersion=r.version;evidence(r,'验收结论.txt','验收对象：'+r.id+'\n通过\n'+r.actionNote);}
    if(r.key==='supervisionChange'&&r.step===1){s.snapshots.push(snapshot(s));if(f['调整类型']==='取消'){s.cancelled=true;}else{s.rows=clone(r.rows);s.due=r.rows.map(x=>x['期限']).sort().at(-1);s.version++;}s.revision++;r.sourceVersion=s.effectiveVersion||s.version;log(s,'督办调整生效',r.id+' / '+f['调整类型']+' / '+f['调整原因']);notify(r,s.rows.map(x=>x['责任人']),'督办调整');}
    if(r.key==='acceptance'&&r.step===2){archive(s);s.revision++;log(s,'独立验收销号',r.id+' / '+f['验收意见']);r.links.push(s.id);}
    if(r.sourceId&&!r.links.includes(r.sourceId))r.links.push(r.sourceId);
  }
  function act(id,expected,note,action='advance'){
    const r=get(id);if(!canAct(r))return '当前身份、节点或终态不允许此操作';if(r.revision!==expected)return '办理版本已变化，请刷新当前单据';if(!note?.trim())return '请填写办理意见';
    if(action==='return'){
      if(r.step===0)return '草稿不能退回';const old=r.step;r.returned=true;r.step=(r.key==='supervision'&&old>=2)?1:0;r.revision++;log(r, r.key==='acceptance'?'验收退回':'退回补充',note);sync();return '';
    }
    const error=validate(r);if(error)return error;
    r.actionNote=note;effects(r);log(r,def(r.key).steps[r.step],note);r.returned=false;r.step++;r.revision++;
    if(r.step>=def(r.key).steps.length)archive(r);sync();return '';
  }
  function remind(){let count=0;for(const r of store.records.filter(x=>visible(x)&&!terminal(x)&&x.due<config.date)){const id=r.id+'-'+config.date;if(store.reminders.some(x=>x.id===id))continue;store.reminders.push({id,sourceId:r.id,due:r.due,date:config.date});notify(r,[r.owner],'到期催办');count++;}return count;}
  function seed(){
    const doc=create('issue','既有签发来源');doc.files.forEach(f=>f.content=f.content.replaceAll(doc.id,'ADM-DOC-BASE'));doc.id='ADM-DOC-BASE';doc.step=4;doc.effectiveVersion=1;doc.rows[0]['会签意见']='已按示例部门意见修订';doc.rows[0]['发布状态']='已发布';doc.approved=snapshot(doc);doc.documentNumber='精美〔2026〕演示001号';log(doc,'既有签发与发布','演示历史：签发正文V1，供报送和清理关联');
    const m=create('meeting','既有批准来源');m.files.forEach(f=>f.content=f.content.replaceAll(m.id,'ADM-MEETING-BASE'));m.id='ADM-MEETING-BASE';m.step=3;m.effectiveVersion=1;m.fields['会议开始']='2026-09-15T14:00';m.fields['会议结束']='2026-09-15T16:00';store.reservations.push({id:'BOOK-'+m.id,meetingId:m.id,room:'第一会议室',start:m.fields['会议开始'],end:m.fields['会议结束'],active:true,version:1});log(m,'既有会议批准','演示历史：会议室已占用，参会人待回执');
    const task=create('supervision','既有待验收来源');task.files.forEach(f=>f.content=f.content.replaceAll(task.id,'ADM-TASK-BASE'));task.id='ADM-TASK-BASE';task.step=2;task.rows[0]['进度']=100;task.rows[0]['反馈']='已完成检查，未发现未处置问题';evidence(task,'设备检查报告.txt','设备01至03检查完成；防护装置有效，消防通道已复核。');log(task,'既有反馈','演示历史：责任部门已提交检查报告，等待验收');
    for(const d of ADMIN_DEFINITIONS){for(const variant of ['可办理','异常待补充']){const r=create(d.key,variant);const sources={report:doc,rsvp:m,meetingChange:m,meetingCancel:m,minutes:m,supervisionChange:task,acceptance:task};if(sources[d.key]){r.sourceId=sources[d.key].id;r.sourceVersion=sources[d.key].effectiveVersion||sources[d.key].version;}
      if(d.key==='cleanup')r.rows[0]['文件编号']=doc.id;
      if(variant==='异常待补充'){if(d.key==='meeting'||d.key==='meetingChange'){r.fields['会议开始']=m.fields['会议开始'];r.fields['会议结束']=m.fields['会议结束'];}else if(d.key==='report'){r.sourceVersion=99;}else if(d.key==='rsvp'){r.rows[0]['回执']='委托';}else if(d.key==='issue'){r.fields['正文']='';}else{r.files=[];}log(r,'待补充原因','业务材料或明细未满足办理条件，须通过页面修正');}
    }}
    const priorRole=state.role;
    for(const [index,d] of ADMIN_DEFINITIONS.entries()){
      const r=create(d.key,'已完成案例');
      if(['report','rsvp','meetingChange','meetingCancel','minutes','supervisionChange','acceptance'].includes(d.key)){
        const template=d.key==='report'?doc:['supervisionChange','acceptance'].includes(d.key)?task:m;
        const source=clone(template);source.id=r.id+'-SOURCE';source.files=source.files.map(f=>({...f,content:f.content.replaceAll(template.id,source.id)}));source.links=[];source.history=clone(template.history);store.records.push(source);r.sourceId=source.id;r.sourceVersion=source.effectiveVersion||source.version;
      }
      if(d.key==='cleanup'){const source=clone(doc);source.id=r.id+'-SOURCE';source.files=source.files.map(f=>({...f,content:f.content.replaceAll(doc.id,source.id)}));store.records.push(source);r.rows[0]['文件编号']=source.id;}
      if(['meeting','meetingChange'].includes(d.key)){r.fields['会议开始']='2026-10-'+String(index+1).padStart(2,'0')+'T09:00';r.fields['会议结束']='2026-10-'+String(index+1).padStart(2,'0')+'T10:00';}
      if(d.key==='receipt'){r.rows[0]['反馈']='完成检查并提交反馈';r.rows[0]['阅知状态']='已阅';}
      if(d.key==='issue')r.rows.forEach(x=>x['会签意见']='已核验正文及发送范围，同意');
      if(d.key==='review')r.rows.forEach(x=>{x['结论']='同意';x['评审意见']='内容完整，评审通过'});
      if(d.key==='report'){r.fields['报送结果']='成功';r.rows[0]['核验结论']='一致';}
      if(d.key==='rsvp')r.rows[0]['回执']='参加';
      if(d.key==='supervision')r.rows.forEach(x=>{x['进度']=100;x['反馈']='已完成检查并形成报告'});
      if(d.key==='acceptance'){r.fields['验收结论']='通过';r.fields['验收意见']='逐项核验报告与成果，通过';r.rows.forEach(x=>{x['核验结果']='通过';x['佐证说明']='设备报告与清单一致'});}
      evidence(r,'完成案例成果.txt','演示历史成果：'+r.title+'，明细与成果已核验。');
      let guard=0;
      while(!terminal(r)&&guard++<8){state.role=assignedRole(r);const error=act(r.id,r.revision,'演示历史：已按该节点核验对象、明细及证据');if(error)throw new Error(d.key+' completed seed: '+error);}
    }
    state.role=priorRole;sync();
  }
  seed();
  return {config,store,def,get,create,save,act,visible,canAct,canEdit,assignedRole,roleName,terminal,status,snapshot,validate,sync,remind,evidence,log,sourceAllowed};
})();
