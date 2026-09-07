/* HR domain: explicit SOW workflows with session-only records, versions and result ledgers. */
const HrWorkspace=(()=>{
  const defs=HR_DEFINITIONS,copy=x=>JSON.parse(JSON.stringify(x));
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ui={key:null,id:null,tab:'业务信息',query:'',filter:'全部',page:1,size:5,edit:null,dialog:null,domain:null};
  const store={records:[],archives:[],balanceLogs:[],attendance:[],locks:[],runs:[],tasks:[],policies:{year:2026,annualDays:10,carryYears:1,hoursPerDay:8},questions:[{id:'Q1',question:'发现岗位安全隐患应如何处理？',answer:'按岗位规程停止相关作业并报告'}]};
  let sequence=100;
  const date='2026-09-07';
  Object.assign(roles,{hrHead:{label:'人事业务部门负责人',name:'部门负责人（演示）',short:'部',scope:'本演示公司人事事项部门审核'},hrArb:{label:'绩效及争议复核仲裁岗',name:'仲裁岗（演示）',short:'仲',scope:'仅绩效申诉及劳动争议核查'}});
  const employeeForRole=()=>roles[state.role]?.hrEmployeeId||(state.role==='employee'?'EMP-2026-018':state.role==='staffZhang'?'EMP-2026-026':null);
  function roleForEmployee(id){return id==='EMP-2026-018'?'employee':id==='EMP-2026-026'?'staffZhang':Object.keys(roles).find(k=>roles[k].hrEmployeeId===id);}
  Object.assign(roles,{staffWang:{label:'王晓雨（员工本人）',name:'王晓雨',short:'王',scope:'仅本人事项',hrEmployeeId:'EMP-2025-089'},staffChen:{label:'陈杰（员工本人）',name:'陈杰',short:'陈',scope:'仅本人事项',hrEmployeeId:'EMP-2024-133'}});
  const isHr=()=>state.role==='hr';
  const employee=id=>db.employees.find(e=>e.id===id);
  const def=key=>defs.find(d=>d.key===key);
  const get=(id=ui.id)=>store.records.find(r=>r.id===id);
  const name=r=>employee(r.employeeId)?.name||r.f.候选人||'待录用人员';
  const visible=r=>!!r&&(['hr','manager','hrHead'].includes(state.role)||(state.role==='hrArb'&&['09','22'].includes(r.key))||(employeeForRole()===r.employeeId&&(def(r.key).self||def(r.key).steps.some(s=>s.role==='employee'))));
  const canCreate=key=>isHr()||(!!employeeForRole()&&def(key).self);
  const current=r=>r.stage<0?{name:'草稿',role:r.requesterRole}:r.appealSteps?r.appealSteps[r.stage]:def(r.key).steps[r.stage];
  const expected=r=>{const role=current(r)?.role;return role==='employee'?roleForEmployee(r.employeeId):role;};
  const done=r=>r.stage>=(r.appealSteps||def(r.key).steps).length;
  const status=r=>done(r)?'已归档':current(r).name;
  const canAct=r=>visible(r)&&!done(r)&&state.role===expected(r);
  const mayTasks=r=>canAct(r)&&state.role==='hr'&&r.stage>=def(r.key).steps.length-(r.key==='28'?2:1);
  const canEdit=r=>visible(r)&&r.stage<0&&state.role===r.requesterRole;
  function log(r,action,note,before=null,after=null){r.audit.unshift({time:new Date().toLocaleString('zh-CN'),actor:currentRole().name,role:state.role,action,note,before,after,version:r.version});}
  function fail(message){toast(message);const e=document.querySelector('#hw-error');if(e)e.textContent=message;return false;}
  function archive(r,kind,detail){store.archives.unshift({id:'HRA-'+(++sequence),employeeId:r.employeeId,source:r.id,version:r.version,kind,detail:copy(detail),time:date});const e=employee(r.employeeId);if(e){e.audit.unshift({time:date,actor:currentRole().name,action:kind,result:r.id+' V'+r.version+' · '+JSON.stringify(detail)});}}
  function tasksFor(r){return store.tasks.filter(t=>t.source===r.id&&t.version===r.version);}
  function todoSync(){db.todos=db.todos.filter(t=>t.namespace!=='hr');for(const r of store.records.filter(r=>!done(r)&&r.stage>=0))db.todos.push({id:'TODO-'+r.id,namespace:'hr',objectId:r.id,role:expected(r),type:def(r.key).short,title:name(r)+' · '+current(r).name,due:date,status:'待处理'});}
  function createRecord(key,employeeId='EMP-2026-018'){
    const d=def(key),r={id:'HR-'+key+'-'+(++sequence),key,employeeId,company:'五粮液精美印务',requesterRole:employeeForRole()?state.role:'hr',stage:-1,version:1,f:Object.fromEntries(d.fields.map(f=>[f.key,f.value])),files:[],audit:[],history:[],items:[],checks:{}};
    if(key==='02')r.employeeId=null;
    if(key==='03')r.employeeId='EMP-2026-026';
    if(key==='21')r.items=[{指标:'经营分析及时率',目标值:98,单位:'%',权重:70},{指标:'问题闭环率',目标值:95,单位:'%',权重:30}];
    if(key==='24')r.items=[{员工编号:r.employeeId,金额:8000}];
    r.files.push({id:'FILE-'+(++sequence),name:d.short+'模拟依据.txt',content:'仅为本地演示的脱敏依据。\n'+d.scope,version:1,time:date});
    return r;
  }
  function init(){
    for(const d of defs){const r=createRecord(d.key);store.records.push(r);}
    const fixed={'21':'HR-PLAN-001','22':'HR-RESULT-001','24':'HR-PAYSLIP-001','28':'HR-TRAIN-001','29':'HR-EXAM-001'};
    for(const [key,id] of Object.entries(fixed))getByKey(key).id=id;
    for(const key of ['21','28','29']){const r=getByKey(key);r.stage=def(key).steps.length;r.checks.baseline=true;archive(r,'历史确认基线',{来源:'历史演示基线',...r.f});}
    const r=getByKey('12');r.f.开始日期='2026-10-08';
    for(const e of db.employees){e.hrBalance={annual:e.annualBalance,held:0,carry:0,comp:{平时:8,周末:8,节假日:0},compExpiry:'2026-12-31'};}
    store.attendance.push({id:'ATT-SEED',employeeId:'EMP-2026-018',date:'2026-09-06',end:'2026-09-06',startTime:'08:30',endTime:'17:30',type:'缺卡',source:'CLOCK-20260906',version:1,anomaly:true});
    const prior=createRecord('12');prior.id='HR-LEAVE-BASE';prior.stage=def('12').steps.length;prior.f={...prior.f,开始日期:'2026-08-10',结束日期:'2026-08-11',天数:'2'};store.records.push(prior);getByKey('13').f.原单编号=prior.id;
    const other=createRecord('26','EMP-2025-089');store.records.push(other);
    todoSync();
  }
  function getByKey(key){return store.records.find(r=>r.key===key);}
  const btn=(label,action,cls='secondary',disabled=false)=>`<button class="${cls}" onclick="${action}" ${disabled?'disabled':''}>${esc(label)}</button>`;
  const kv=(k,v)=>`<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`;
  const panel=(title,body,actions='')=>`<section class="card hw-panel"><div class="card-h"><h2>${esc(title)}</h2>${actions}</div><div class="hw-body">${body}</div></section>`;
  const table=(heads,rows)=>`<div class="table-card hw-table"><table><thead><tr>${heads.map(h=>'<th>'+esc(h)+'</th>').join('')}</tr></thead><tbody>${rows.length?rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join(''):'<tr><td colspan="'+heads.length+'"><div class="empty compact">暂无符合条件的记录</div></td></tr>'}</tbody></table></div>`;
  const boundary=()=>`<div class="hw-boundary">本地演示 · 操作在当前会话生效，刷新后恢复基线。OA负责协同、发布确认与档案；ERP负责正式绩效及薪资业务。评分/校准操作位置、制度参数及真实接口待确认。</div>`;
  const deniedPage=()=>shell(panel('当前身份无权查看','请使用本人事项入口，或切换至具有相应授权的人事角色。'),'人事访问受限','按员工和岗位职责控制详情范围');
  function nav(page){state.page=page;render();window.scrollTo({top:0,behavior:'smooth'});}
  function list(key=null,domain=null){const section=key?def(key).domain:domain;state.navSectionOpen=section?{['hr:'+section]:true}:{};state.activeNavProcess='hr:'+key;ui.key=key;ui.domain=domain;ui.query='';ui.filter='全部';ui.page=1;ui.edit=null;nav('hr-list');}
  function open(id){const r=get(id);if(!visible(r))return fail('当前身份无权查看此人事记录');state.activeNavProcess='hr:'+r.key;state.navSectionOpen={['hr:'+def(r.key).domain]:true};ui.id=id;ui.tab='业务信息';ui.edit=null;closeModal();nav('hr-record');}
  function rows(){return store.records.filter(r=>visible(r)&&(!ui.key||r.key===ui.key)&&(!ui.domain||def(r.key).domain===ui.domain)&&[r.id,def(r.key).name,name(r),r.company,status(r)].join(' ').includes(ui.query)&&(ui.filter==='全部'||(ui.filter==='待我处理'?canAct(r):ui.filter==='已归档'?done(r):!done(r))));}
  function home(){const all=store.records.filter(visible);return shell(boundary()+`<div class="stat-row">${[['可见事项',all.length,'全部'],['待我处理',all.filter(canAct).length,'待我处理'],['办理中',all.filter(r=>!done(r)).length,'办理中'],['已归档',all.filter(done).length,'已归档']].map(([label,n,f])=>`<button class="stat" onclick="HrWorkspace.list();HrWorkspace.filter('${f}')"><b>${n}</b><span>${label}</span></button>`).join('')}</div><div class="hr-domain-grid">${hrDomains.map(d=>`<button class="hr-domain-card ${d.tone}" onclick="HrWorkspace.list(null,'${d.id}')"><span>SOW 2.1.4</span><strong>${defs.filter(x=>x.domain===d.id).length}</strong><h2>${esc(d.name)}</h2><p>${esc(d.desc)}</p><small>查看业务台账 →</small></button>`).join('')}</div>`+panel('员工服务与控制台',`<div class="hw-tools">${btn('员工360档案',"go('employee')")}${btn('假期余额与调整',"HrWorkspace.balances()")}${btn('接口与补偿',"HrWorkspace.runs()")}${btn('查看配置与边界',"HrWorkspace.settings()")}</div>`)+panel('当前责任待办',recordTable(all.filter(canAct).slice(0,5))),'人力资源工作台','31条SOW流程 · 计划、办理、结果与档案按员工关联');}
  function recordTable(rs,offset=0){return table(['序号','单据 / 流程','员工 / 组织','当前环节','版本','责任角色'],rs.map((r,i)=>[offset+i+1,btn(r.id,`HrWorkspace.open('${r.id}')`,'link')+'<small>'+esc(def(r.key).name)+'</small>',esc(name(r))+'<small>'+esc(employee(r.employeeId)?.org||'待录用')+'</small>',badge(status(r)),'V'+r.version,esc(roles[expected(r)]?.label||'已完成')]));}
  function listView(){const all=rows(),max=Math.max(1,Math.ceil(all.length/ui.size));ui.page=Math.min(ui.page,max);return shell(boundary()+`<div class="toolbar"><input id="hw-search" placeholder="编号、姓名或流程" value="${esc(ui.query)}">${btn('查询',"HrWorkspace.search()")}${btn('重置',"HrWorkspace.reset()")}${['全部','待我处理','办理中','已归档'].map(f=>btn(f,`HrWorkspace.filter('${f}')`,ui.filter===f?'primary':'secondary')).join('')}</div>`+recordTable(all.slice((ui.page-1)*ui.size,ui.page*ui.size),(ui.page-1)*ui.size)+`<div class="pager"><span id="hw-total">共 ${all.length} 条 · 第 ${ui.page}/${max} 页</span>${btn('上一页',`HrWorkspace.page(${ui.page-1})`,'secondary',ui.page<=1)}${btn('下一页',`HrWorkspace.page(${ui.page+1})`,'secondary',ui.page>=max)}</div>`,ui.key?def(ui.key).name:ui.domain?hrDomain(ui.domain).name:'人事业务台账',ui.key?def(ui.key).code+' · '+def(ui.key).scope:'按SOW流程、员工及当前责任筛选',`${ui.key&&canCreate(ui.key)?btn('新建申请',`HrWorkspace.create('${ui.key}')`,'primary'):''}${btn('导出台账',"HrWorkspace.exportList()")}${btn('返回工作台',"go('hr')")}`);}
  function detail(){const r=get();if(!visible(r))return deniedPage();const d=def(r.key);const tabs=['业务信息','流程与版本','附件证据','关联结果'];let content='';
    if(ui.tab==='业务信息')content=panel('申请信息',`<div class="hw-info">${kv('员工',name(r)+' / '+(r.employeeId||'候选人'))}${kv('公司 / 组织',r.company+' / '+(employee(r.employeeId)?.org||'待录用'))}${kv('状态',status(r))}${kv('版本','V'+r.version)}${Object.entries(r.f).map(([k,v])=>kv(k,v)).join('')}</div>`)+specialView(r);
    if(ui.tab==='流程与版本')content=panel('办理路径',`<div class="hw-steps">${(r.appealSteps||d.steps).map((s,i)=>`<div class="${i<r.stage?'done':i===r.stage?'current':''}"><b>${i+1}. ${esc(s.name)}</b><small>${esc(roles[s.role]?.label||'员工本人')}</small><span>${i<r.stage?'已完成':i===r.stage?'当前节点':'待办理'}</span></div>`).join('')}</div>`)+panel('版本快照',table(['序号','原版本','变更原因','原字段 / 原明细'],r.history.map((h,i)=>[i+1,'V'+h.version,esc(h.reason),esc(JSON.stringify({fields:h.f,items:h.items}))])))+panel('处理轨迹',table(['序号','时间 / 处理人','动作','意见 / 变化'],r.audit.map((a,i)=>[i+1,esc(a.time)+'<small>'+esc(a.actor)+'</small>',esc(a.action),esc(a.note)+(a.before?'<small>原值：'+esc(JSON.stringify(a.before))+'<br>新值：'+esc(JSON.stringify(a.after))+'</small>':'')])));
    if(ui.tab==='附件证据')content=panel('依据与版本',table(['序号','文件','版本 / 日期','操作'],r.files.map((f,i)=>[i+1,esc(f.name),'V'+f.version+' / '+esc(f.time),btn('预览',`HrWorkspace.file('${f.id}',false)`,'link')+btn('下载',`HrWorkspace.file('${f.id}',true)`,'link')]))+`<label class="hw-upload">上传本地材料 <input type="file" onchange="HrWorkspace.upload(this.files[0])" ${canEdit(r)||canAct(r)?'':'disabled'}></label><small>附件仅在本次会话保存，不上传外部系统。</small>`);
    if(ui.tab==='关联结果')content=panel('员工档案与来源',`<div class="hw-tools">${r.employeeId?btn('查看员工360',`showEmployee('${r.employeeId}')`):''}${['22','25','13','29','31'].includes(r.key)?btn('查看来源单据',"HrWorkspace.source()"):''}</div>`+archiveTable(store.archives.filter(a=>a.source===r.id)))+panel('跨系统结果与对账',runTable(store.runs.filter(x=>x.source===r.id)));
    const actions=[btn('返回台账',`HrWorkspace.list('${r.key}')`),canEdit(r)?btn('编辑申请',"HrWorkspace.edit()"):'',canEdit(r)?btn('提交申请',"HrWorkspace.act('advance')",'primary'):'',canAct(r)&&r.stage>=0?btn(r.key==='22'&&r.stage===3&&!r.appealSteps?'确认绩效结果':'办理当前环节',"HrWorkspace.act('advance')",'primary'):'',canAct(r)&&r.stage>=0?btn('退回修改',"HrWorkspace.act('reject')"):'',visible(r)&&r.stage>=0&&!done(r)&&state.role===r.requesterRole?btn('撤回申请',"HrWorkspace.act('withdraw')"):'',r.key==='22'&&r.stage===3&&!r.appealSteps&&canAct(r)?btn('提出申诉',"HrWorkspace.act('appeal')"):'',done(r)&&r.key==='21'&&isHr()?btn('调整计划',"HrWorkspace.revise()",'primary'):''].join('');
    return shell(boundary()+`<div class="hw-head"><b>${esc(r.id)} · ${esc(d.code)}</b>${badge(status(r))}<span>当前办理：${esc(roles[expected(r)]?.label||'归档完成')}</span></div><div class="tabs">${tabs.map(t=>btn(t,`HrWorkspace.tab('${t}')`,ui.tab===t?'active':'')).join('')}</div>${content}`,d.name,d.scope,actions);}
  function specialView(r){
    let html='';
    if(r.key==='21')html+=panel('考核指标与目标值（演示配置）',table(['序号','指标','目标值','单位','权重'],r.items.map((x,i)=>[i+1,esc(x.指标),esc(x.目标值),esc(x.单位),esc(x.权重)+'%'])));
    if(r.key==='22')html+=panel('评分与结果依据',`<div class="hw-info">${kv('计划版本',r.checks.planVersion?'V'+r.checks.planVersion:'提交时绑定有效计划版本')}${kv('来源','ERP模拟批次；实际评分/校准操作位置待确认')}${kv('评分差异',r.f.原评分+' → '+r.f.校准分)}${kv('结果版本','V'+r.version)}</div><p>${r.appeal?esc('申诉：'+r.appeal.reason+'；复核：'+(r.appeal.review||'待办理')+'；最终反馈：'+(r.appeal.final||'待办理')):'发布后，员工可直接确认或提出申诉。'}</p>`);
    if(r.key==='24')html+=panel('工资条明细（模拟金额）',table(['序号','员工','实发金额','校验状态'],r.items.filter(x=>isHr()||['manager','hrHead'].includes(state.role)||x.员工编号===employeeForRole()).map((x,i)=>[i+1,esc(employee(x.员工编号)?.name||x.员工编号),'¥'+esc(x.金额),r.checks.validated?'校验通过':'待校验'])));
    if(['03','04','05','07','08','28'].includes(r.key))html+=panel('协同任务',table(['序号','办理事项','结果','操作'],tasksFor(r).map((t,i)=>[i+1,esc(t.name),esc(t.status),t.status!=='已完成'?btn('登记完成',`HrWorkspace.task('${t.id}')`,'link',!mayTasks(r)):esc(t.result)]))+'<small>任务按演示人员类别下发；适用条件由客户确认。</small>');
    if(['12','13','14','15'].includes(r.key)){const b=employee(r.employeeId)?.hrBalance;html+=panel('假期与补休余额',`<div class="hw-info">${kv('年休可用',(b?.annual-b?.held)+'天')}${kv('已占用',(b?.held||0)+'天')}${kv('结转年休',(b?.carry||0)+'天')}${kv('补休来源',JSON.stringify(b?.comp||{}))}</div>`);}
    if(['18','19','20'].includes(r.key))html+=panel('同源考勤明细',attendanceTable(attendanceRows(r)),btn('下载考勤明细',"HrWorkspace.exportAttendance()"));
    if(['06','08'].includes(r.key)&&canAct(r))html+=panel('回传证据',btn(r.key==='06'?'登记签署回传':'登记通知送达',"HrWorkspace.evidenceDialog()"));
    if(r.key==='29')html+=panel('考试题库与成绩依据',table(['序号','题目','参考答案'],store.questions.map((q,i)=>[i+1,esc(q.question),esc(q.answer)]))+`<p>本地示例题库；成绩录入经部门核验后归档。</p>`);
    if(r.key==='31')html+=panel('准入条件',`<p>引用已确认考试成绩，并核验员工有效证照；归档后更新员工岗位资格。MES上机和ERP计件资格校验仅输出模拟结果，具体控制点待联合确认。</p>`);
    return html;
  }
  function create(key){if(!canCreate(key))return fail('当前身份不能发起该流程');ui.edit=createRecord(key,employeeForRole()||'EMP-2026-018');ui.edit.isNew=true;nav('hr-edit');}
  function edit(){const r=get();if(!canEdit(r))return fail('只能由申请人在草稿状态编辑');ui.edit=copy(r);ui.edit.files=[...r.files];nav('hr-edit');}
  function revise(){const r=get();if(!visible(r)||!isHr()||r.key!=='21'||!done(r))return fail('仅人事可调整生效计划');ui.edit=copy(r);ui.edit.files=[...r.files];ui.edit.revision=true;nav('hr-edit');}
  function input(f,value){const attrs=`name="${esc(f.key)}" ${f.type==='number'?'step="any"':''} required`;return `<div class="field"><label>${esc(f.label)}</label>${f.type==='select'?`<select ${attrs}>${f.options.map(v=>`<option ${v===value?'selected':''}>${esc(v)}</option>`).join('')}</select>`:`<input ${attrs} type="${f.type}" value="${esc(value)}">`}</div>`;}
  function editView(){const r=ui.edit;if(!r||(!canCreate(r.key)&&r.isNew)||(!r.isNew&&!visible(r)))return deniedPage();return shell(boundary()+`<form id="hw-form" onsubmit="event.preventDefault();HrWorkspace.save()"><div id="hw-error" role="alert"></div>`+panel('申请字段',`<div class="form-grid">${r.key==='02'?'':`<div class="field"><label>关联员工</label><select name="employeeId" ${!isHr()||!r.isNew?'disabled':''}>${db.employees.filter(e=>isHr()||e.id===employeeForRole()).map(e=>`<option value="${e.id}" ${e.id===r.employeeId?'selected':''}>${esc(e.name+' / '+e.org)}</option>`).join('')}</select></div>`}${def(r.key).fields.map(f=>input(f,r.f[f.key])).join('')}${input({key:'修改原因',label:r.revision?'计划调整原因':'申请或修改说明',type:'text'},r.reason||'按业务需要提交（演示）')}</div>`)+(['21','24'].includes(r.key)?panel(r.key==='21'?'指标明细':'工资条导入明细',`<p>${r.key==='21'?'每行：指标,目标值,单位,权重；权重合计须为100。':'每行：员工编号,实发金额；模板、人员、月份及重复数据校验。'}</p><textarea name="items" class="hw-csv" required>${esc(r.items.map(x=>Object.values(x).join(',')).join('\n'))}</textarea>`):'')+`<div class="hw-tools"><button class="primary" type="submit">保存草稿</button><button type="button" class="secondary" onclick="HrWorkspace.cancel()">取消</button></div></form>`,r.revision?'绩效计划调整':def(r.key).name,'保留原业务版本与变更原因；保存后再提交审批');}
  function save(){const form=document.querySelector('#hw-form');if(!form?.reportValidity())return false;const draft=ui.edit;if(!draft)return false;const old=get(draft.id);if(old&&!(draft.revision?isHr()&&done(old)&&old.key==='21':canEdit(old)))return fail('当前身份或状态不允许保存');if(!old&&!canCreate(draft.key))return fail('无发起权限');const values=Object.fromEntries(new FormData(form));const r=copy(draft);r.files=[...draft.files];for(const f of def(r.key).fields)r.f[f.key]=values[f.key];if(values.employeeId&&r.isNew)r.employeeId=values.employeeId;r.reason=values.修改原因;
    if(r.key==='21')r.items=values.items.split('\n').filter(Boolean).map(l=>{const [指标,目标值,单位,权重]=l.split(/[,，]/);return{指标,目标值:Number(目标值),单位,权重:Number(权重)}});
    if(r.key==='24')r.items=values.items.split('\n').filter(Boolean).map(l=>{const [员工编号,金额]=l.split(/[,，]/);return{员工编号,金额:Number(金额)}});
    const err=validate(r,false);if(err)return fail(err);
    if(old){r.history.push({version:old.version,f:copy(old.f),items:copy(old.items),reason:r.reason});r.version=old.version+1;r.stage=-1;r.checks={};}
    delete r.isNew;delete r.revision;store.records=store.records.filter(x=>x.id!==r.id);store.records.unshift(r);log(r,old?'保存修订':'新建申请',r.reason,old?.f,r.f);ui.edit=null;todoSync();open(r.id);return true;}
  function temporal(r){return ['12','14','15','16'].includes(r.key);}
  function overlaps(a,b){return a.f.开始日期<=b.f.结束日期&&b.f.开始日期<=a.f.结束日期&&(a.f.开始时刻||'00:00')<(b.f.结束时刻||'23:59')&&(b.f.开始时刻||'00:00')<(a.f.结束时刻||'23:59');}
  function people(r){return String(r.f.人员明细||r.f.参加人员||r.employeeId||'').split(/[,，、\s]+/).filter(Boolean);}
  function validate(r,submitting=true){
    for(const f of def(r.key).fields){if(r.f[f.key]===undefined||String(r.f[f.key]).trim()==='')return f.label+'不能为空';if(f.type==='number'&&(!Number.isFinite(Number(r.f[f.key]))||Number(r.f[f.key])<0))return f.label+'必须为非负数';if(f.type==='select'&&!f.options.includes(r.f[f.key]))return f.label+'不在可选范围';}
    if(r.key!=='02'&&!employee(r.employeeId))return '员工不存在';
    if(r.f.开始日期&&r.f.结束日期<r.f.开始日期)return '结束日期不能早于开始日期';
    if(r.f.开始时刻&&r.f.结束时刻<=r.f.开始时刻)return '结束时刻须晚于开始时刻；跨夜班请按两段登记';
    if(r.key==='01'&&Number(r.f.需求人数)>Number(r.f.编制余额))return '需求人数超过可用编制';
    if(['05','14','17','28'].includes(r.key)&&people(r).some(id=>!employee(id)))return '人员明细存在无效员工编号';
    if(r.key==='21'&&(!r.items.length||r.items.some(x=>!x.指标||!x.单位||!Number.isFinite(x.目标值)||!Number.isFinite(x.权重)||x.权重<=0)||Math.abs(r.items.reduce((s,x)=>s+x.权重,0)-100)>0.001))return '指标、目标值、单位须完整，权重合计必须等于100';
    if(r.key==='24'){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(r.f.月份)||r.f.模板版本!=='PAY-V1')return '月份格式或工资条模板版本不匹配';if(!r.items.length||r.items.some(x=>!employee(x.员工编号)||!Number.isFinite(x.金额)||x.金额<0))return '工资条人员或金额无效';if(new Set(r.items.map(x=>x.员工编号)).size!==r.items.length)return '工资条含重复人员';if(r.items.some(x=>x.员工编号!==r.employeeId))return '本演示工资条按员工定向发布；请为其他员工另建单据';if(store.records.some(x=>x.id!==r.id&&x.key==='24'&&x.checks.published&&x.f.月份===r.f.月份&&x.employeeId===r.employeeId))return '该人员月份已发布，请通过薪酬异议及修订流程处理';}
    if(!submitting)return '';
    if(!r.files.length)return '请补充办理依据附件';
    if(r.key==='05'&&r.f.资格要求==='有效资格'&&people(r).some(id=>!employee(id).qualifications.some(q=>q.status==='有效'&&q.expires>=r.f.生效日期)))return '目标岗位资格校验未通过';
    if(r.key==='17'&&people(r).some(id=>!employee(id).qualifications.some(q=>q.status==='有效'&&q.expires>=r.f.开始日期)))return '排班人员没有有效岗位资格';
    if(r.key==='31'&&(!employee(r.employeeId).qualifications.some(q=>q.status==='有效'&&q.expires>=date)||r.f.到期日期<=date))return '证照无效或资格有效期不合法';
    if(r.key==='13'){const src=get(r.f.原单编号);if(src&&src.f.假别==='年休假'&&Number(r.f.新天数)-Number(src.f.天数)>employee(r.employeeId).hrBalance.annual-employee(r.employeeId).hrBalance.held)return '延期增加的天数超过年休余额';if(Number(r.f.新天数)<0)return '变更天数不能为负';}
    if(temporal(r)&&store.records.some(x=>x.id!==r.id&&temporal(x)&&x.stage>=0&&people(x).some(id=>people(r).includes(id))&&overlaps(r,x)))return '与同一人员已提交的假勤时段冲突，请修改后重提';
    const b=employee(r.employeeId)?.hrBalance;
    if(r.key==='12'&&Number(r.f.天数)<=0||r.key==='15'&&Number(r.f.天数)<=0)return '申请天数必须大于0';
    if(r.key==='12'&&r.f.假别==='年休假'&&Number(r.f.天数)>b.annual-b.held+(r.checks.held||0))return '年休可用余额不足';
    if(r.key==='15'&&(Number(r.f.天数)*8>b.comp[r.f.来源类别]||b.compExpiry<date))return '补休余额不足或已过有效期';
    if(r.key==='12'&&r.f.假别==='补休')return '补休请使用调休申请流程，以便指定来源类别';
    if(['13','25','22','29','31'].includes(r.key)){const key=r.key==='13'||r.key==='25'?'原单编号':r.key==='22'?'计划编号':r.key==='29'?'关联培训':'关联考试';const src=get(r.f[key]),expectedKey={'13':'12','25':'24','22':'21','29':'28','31':'29'}[r.key];if(!src||src.key!==expectedKey||src.employeeId!==r.employeeId||!done(src))return '来源单据须为同一员工的已确认有效'+def(expectedKey).short;if(r.key==='22'&&src.f.周期!==r.f.周期)return '结果与计划考核周期不一致';if(r.key==='31'&&Number(src.f.成绩)<Number(src.f.合格线))return '考试未达到合格线，不能准入';if(r.key==='13'&&store.records.some(x=>x.id!==r.id&&x.key==='13'&&x.f.原单编号===src.id&&x.stage>=0))return '原请假已有变更，请先完成或撤回该变更';}
    if(r.key==='19'&&store.locks.some(l=>l.employeeId===r.employeeId&&l.month===r.f.月份&&l.source!==r.id))return '此月份已锁定，请先解锁原确认单';
    if(r.key==='29'&&(Number(r.f.成绩)>100||Number(r.f.合格线)>100))return '考试成绩与合格线须在0到100';
    if(r.key==='19'&&attendanceRows(r).some(a=>a.anomaly))return '当月仍有考勤异常，处理后才可确认锁定';
    if(['18','12','13','14','15','16','17'].includes(r.key)&&store.locks.some(l=>people(r).includes(l.employeeId)&&String(r.f.开始日期||'').startsWith(l.month)))return '期间已锁定，须先由人事解除锁定并保留原因';
    return '';
  }
  function reserve(r,release=false){if(r.key==='12'&&r.f.假别==='年休假'){const b=employee(r.employeeId).hrBalance;const before=b.held;if(release){b.held-=r.checks.held||0;r.checks.held=0;}else if(!r.checks.held){r.checks.held=Number(r.f.天数);b.held+=r.checks.held;}store.balanceLogs.unshift({employeeId:r.employeeId,source:r.id,reason:release?'释放申请占用':'提交申请占用',before,after:b.held,date});}}
  function act(kind){const r=get();if(!visible(r))return fail('无权办理');if(kind==='withdraw'?(state.role!==r.requesterRole||r.stage<0||done(r)):!canAct(r))return fail('请切换当前办理角色');ui.dialog={id:r.id,kind};let fields=input({key:'note',label:kind==='appeal'?'申诉理由':'办理意见 / 原因',type:'text'},'');
    if(r.key==='22'&&r.appealSteps&&r.stage===1)fields+=input({key:'score',label:'复核评分（演示）',type:'number'},r.f.校准分);
    if(r.key==='22'&&r.appealSteps&&r.stage===2)fields+=input({key:'grade',label:'仲裁最终等级（制度待确认）',type:'text'},r.f.结果等级);
    openModal(kind==='appeal'?'发起绩效申诉':kind==='reject'?'退回修改':kind==='withdraw'?'撤回申请':r.stage<0?'提交申请':current(r).name,`<form id="hw-action-form" onsubmit="event.preventDefault();HrWorkspace.confirm()"><div id="hw-error" role="alert"></div><div class="form-grid">${fields}</div><p>办理结果将更新当前事项、责任待办及关联记录。</p></form>`,btn('取消',"closeModal()")+btn('确认办理',"HrWorkspace.confirm()",'primary'));}
  function confirm(){const form=document.querySelector('#hw-action-form');if(!form?.reportValidity())return;const values=Object.fromEntries(new FormData(form));if(transition(ui.dialog.id,ui.dialog.kind,values)){closeModal();render();}}
  function transition(id,kind,v){const r=get(id);if(!visible(r))return fail('无权访问记录');if(!v.note?.trim())return fail('请填写办理意见或原因');if(kind==='withdraw'?state.role!==r.requesterRole||r.stage<0||done(r):!canAct(r))return fail('当前身份不是本环节办理人');
    if(['reject','withdraw'].includes(kind)){if(done(r))return fail('已归档记录不能撤回');reserve(r,true);log(r,kind==='reject'?'退回修改':'撤回申请',v.note);r.history.push({version:r.version,f:copy(r.f),items:copy(r.items),reason:v.note});r.stage=-1;r.version++;r.checks={};r.appealSteps=null;todoSync();return true;}
    if(kind==='appeal'){if(r.key!=='22'||r.stage!==3||r.appealSteps)return fail('仅已发布待确认绩效可申诉');r.appeal={reason:v.note};r.appealSteps=[{name:'申诉受理',role:'hr'},{name:'申诉复核',role:'hrHead'},{name:'仲裁结论',role:'hrArb'},{name:'最终结果反馈',role:'hr'},{name:'员工收悉',role:'employee'}];r.stage=0;log(r,'提出申诉',v.note);todoSync();return true;}
    const err=validate(r,true);if(err)return fail(err);
    if(r.stage<0){reserve(r);if(r.key==='22'){r.checks.planVersion=get(r.f.计划编号).version;}generateTasks(r);r.stage=0;log(r,'提交申请',v.note);todoSync();return true;}
    if(r.key==='22'&&r.appealSteps){if(r.stage===1){if(!Number.isFinite(Number(v.score))||Number(v.score)<0||Number(v.score)>100)return fail('复核评分须在0到100之间');r.appeal.review=v.note;r.appeal.score=Number(v.score);}if(r.stage===2){if(!v.grade?.trim())return fail('填写最终结果等级');r.history.push({version:r.version,f:copy(r.f),items:[],reason:v.note});r.version++;r.f.校准分=r.appeal.score;r.f.结果等级=v.grade;r.appeal.final=v.note;}if(r.stage===3)r.checks.finalPublished=true;}
    else{
      if(['03','04','05','07','08','28'].includes(r.key)&&r.stage===def(r.key).steps.length-1&&tasksFor(r).some(t=>t.status!=='已完成'))return fail('协同任务未全部完成，不能归档');
      if(r.key==='06'&&r.stage>=2&&r.f.签署状态!=='已签署')return fail('须登记已签署及签署版附件；请退回修改或登记签署回传');
      if(r.key==='08'&&r.stage===2&&r.f.通知送达!=='已送达')return fail('通知尚未送达，请登记送达证据');
      if(r.key==='19'&&r.stage===1&&r.f.确认意见==='退回核对')return fail('存在异议，请退回核对');
      if(r.key==='22'){if(r.stage===0){if(Number(r.f.原评分)>100||Number(r.f.校准分)>100)return fail('评分须为0到100');r.checks.sourceChecked=true;}if(r.stage===1)r.checks.calibration=v.note;if(r.stage===2){r.checks.published=true;log(r,'结果发布','绑定计划V'+r.checks.planVersion+'；结果V'+r.version);}}
      if(r.key==='24'){if(r.stage===0)r.checks.validated=true;if(r.stage===2)r.checks.published=true;}
      if(r.key==='25'&&r.stage===2){const src=get(r.f.原单编号);src.history.push({version:src.version,f:copy(src.f),items:copy(src.items),reason:r.f.异议说明});src.version++;src.items[0].金额=Number(r.f.修订金额);src.checks.confirmed=false;log(src,'异议修订重发',r.id+' / '+v.note);r.checks.republished=true;}
    }
    log(r,current(r).name,v.note);r.stage++;
    if(done(r)){apply(r);r.files.push({id:'FILE-'+(++sequence),name:r.id+'-办理结论-V'+r.version+'.txt',content:JSON.stringify({流程:def(r.key).name,编号:r.id,版本:r.version,字段:r.f,明细:r.items,处理轨迹:r.audit},null,2),version:r.version,time:date});}
    todoSync();return true;
  }
  function generateTasks(r){if(tasksFor(r).length)return;let names=[];
    if(r.key==='03')names=['账号开通','卡证与指纹/人脸登记','劳动合同','岗位培训',...(r.f.人员类别==='生产员工'?['宿舍登记','车辆登记','季度劳保','节假日慰问品','购物卡']:['车辆登记','购物卡'])];
    if(r.key==='04')names=r.f.结论==='转正'?['工会会员','企业年金','五粮液家园','购物卡',...(r.f.人员类别==='生产员工'?['季度劳保']:[])]:['延期或不予转正结果通知'];
    if(r.key==='05')names=['组织岗位更新确认','账号权限变更协同','目标岗位资格核验'];
    if(['07','08'].includes(r.key))names=['工作交接','资产交接','账号停用协同','考勤终点与结算协同'];
    if(r.key==='28')names=['课程发布','学习任务下发','学习完成登记'];
    for(const name of names)store.tasks.push({id:'HRT-'+(++sequence),source:r.id,version:r.version,name,status:'待办理',result:''});
  }
  function task(id){const r=get(),t=store.tasks.find(t=>t.id===id&&t.source===r?.id&&t.version===r.version);if(!t||!mayTasks(r))return fail('审批完成后由人事在协同环节办理任务');ui.dialog={id:r.id,kind:'task',taskId:id};openModal(t.name,`<form id="hw-task-form"><div id="hw-error"></div>${input({key:'result',label:'办理结果与证据说明',type:'text'},'')}${input({key:'outcome',label:'办理结果',type:'select',options:['成功','失败待补偿']},'成功')}</form>`,btn('取消',"closeModal()")+btn('登记结果',"HrWorkspace.confirmTask()",'primary'));}
  function confirmTask(){const form=document.querySelector('#hw-task-form');if(!form.reportValidity())return;const r=get(ui.dialog.id),t=store.tasks.find(t=>t.id===ui.dialog.taskId);if(!r||!mayTasks(r)||!t||t.source!==r.id)return fail('无办理权限');const v=Object.fromEntries(new FormData(form));t.result=v.result;t.status=v.outcome==='成功'?'已完成':'待补偿';log(r,'协同任务 '+t.name,v.result);if(t.status==='待补偿')store.runs.push({id:'HRRUN-'+(++sequence),source:r.id,employeeId:r.employeeId,version:r.version,taskId:t.id,system:'协同任务模拟',period:date,status:'失败待补偿',note:v.result});closeModal();render();}
  function run(r,system,note){store.runs.push({id:'HRRUN-'+(++sequence),source:r.id,employeeId:r.employeeId,position:employee(r.employeeId)?.position,version:r.version,system,period:r.f.月份||r.f.周期||r.f.开始日期||date,status:'待模拟回执',note});}
  function attendanceRows(r){return store.attendance.filter(a=>a.employeeId===r.employeeId&&(!r.f.月份||a.date.startsWith(r.f.月份))&&(!r.f.年度||a.date.startsWith(String(r.f.年度))));}
  const attendanceTable=rs=>table(['序号','日期 / 期间','类型 / 结果','来源','版本'],rs.map((a,i)=>[i+1,esc(a.date+'—'+a.end),esc(a.type),esc(a.source),'V'+a.version]));
  function writeAttendance(r,type){for(const id of people(r)){store.attendance.push({id:'HRA-'+(++sequence),employeeId:id,date:r.f.开始日期,end:r.f.结束日期,startTime:r.f.开始时刻||'08:30',endTime:r.f.结束时刻||'17:30',source:r.id,type,version:r.version,anomaly:false});const e=employee(id);if(e)e.attendance.unshift({date:r.f.开始日期,shift:r.f.目标班次||'行政班',source:r.id,result:type});}}
  function apply(r){const e=employee(r.employeeId),b=e?.hrBalance;let result={状态:'已完成',...r.f};
    if(r.key==='02'){const id='EMP-HR-'+(++sequence);const template=copy(db.employees[0]);Object.assign(template,{id,name:r.f.候选人,avatar:r.f.候选人.slice(0,1),position:r.f.岗位,hireDate:r.f.入职日期,status:'入职办理中',source:r.id,audit:[],qualifications:[],attendance:[],annualBalance:0,hrBalance:{annual:0,held:0,carry:0,comp:{平时:0,周末:0,节假日:0},compExpiry:'2026-12-31'}});db.employees.push(template);r.employeeId=id;roles['staff'+sequence]={label:r.f.候选人+'（员工本人）',name:r.f.候选人,short:r.f.候选人.slice(0,1),scope:'仅本人事项',hrEmployeeId:id};const on=createRecord('03',id);on.employeeId=id;on.f.入职日期=r.f.入职日期;store.records.unshift(on);result.入职任务=on.id;}
    if(r.key==='03'){e.status='在职';e.hireDate=r.f.入职日期;result.考勤起点=r.f.入职日期;}
    if(r.key==='04'){e.status=r.f.结论==='转正'?'在职':r.f.结论==='延期'?'试用延期':'不予转正';}
    if(r.key==='05'){for(const id of people(r)){const emp=employee(id);const before={org:emp.org,position:emp.position};emp.org=r.f.目标部门;emp.position=r.f.目标岗位;archive({...r,employeeId:id},'组织岗位异动',{before,after:{org:emp.org,position:emp.position}});}run(r,'OA/ERP/MES权限协同模拟','组织岗位与权限变更结果');}
    if(r.key==='06'){e.contractNo=r.f.合同编号;e.contractEnd=r.f.到期日期;result.签署版=r.files.map(f=>f.name);}
    if(['07','08'].includes(r.key)){e.status='离职';e.leaveDate=r.f.离职日期||r.f.终止日期;result.考勤终点=e.leaveDate;run(r,'ERP结算及账号停用模拟','按人员和离职日期输出协同结果');}
    if(r.key==='10')e.status=r.f.后续结果==='复岗'?'在职':r.f.后续结果==='延期'?'离岗休养':'离岗终止';
    if(r.key==='11'){const field=r.f.变更字段;result={字段:field,原值:e[field],新值:r.f.变更后值};e[field]=r.f.变更后值;}
    if(r.key==='12'){if(r.f.假别==='年休假'){const before=b.annual;reserve(r,true);b.annual-=Number(r.f.天数);e.annualBalance=b.annual;store.balanceLogs.unshift({employeeId:e.id,source:r.id,reason:'审批扣减',before,after:b.annual,date});}writeAttendance(r,r.f.假别);db.leaves.unshift({id:r.id,employeeId:e.id,employee:e.name,org:e.org,type:r.f.假别,start:r.f.开始日期,end:r.f.结束日期,days:Number(r.f.天数),status:'已通过',audit:[],workflow:[]});}
    if(r.key==='13'){const src=get(r.f.原单编号),before=copy(src.f),delta=Number(src.f.天数)-Number(r.f.新天数);src.history.push({version:src.version,f:before,items:[],reason:r.f.原因});src.version++;src.f.天数=r.f.新天数;src.f.开始日期=r.f.开始日期;src.f.结束日期=r.f.结束日期;if(src.f.假别==='年休假'){const old=b.annual;b.annual+=delta;e.annualBalance=b.annual;store.balanceLogs.unshift({employeeId:e.id,source:r.id,reason:'销假变更差额',before:old,after:b.annual,date});}store.attendance=store.attendance.filter(a=>a.source!==src.id);writeAttendance(src,src.f.假别);const legacy=db.leaves.find(l=>l.id===src.id);if(legacy)Object.assign(legacy,{start:src.f.开始日期,end:src.f.结束日期,days:Number(src.f.天数)});result={原单:src.id,原记录:before,调整后:copy(src.f),余额差额:delta};}
    if(r.key==='14'){for(const id of people(r)){const emp=employee(id);emp.hrBalance.comp[r.f.加班类别]+=Number(r.f.小时数);store.balanceLogs.unshift({employeeId:id,source:r.id,reason:'加班来源 '+r.f.加班类别,before:emp.hrBalance.comp[r.f.加班类别]-Number(r.f.小时数),after:emp.hrBalance.comp[r.f.加班类别],date});}writeAttendance(r,'加班');}
    if(r.key==='15'){b.comp[r.f.来源类别]-=Number(r.f.天数)*8;writeAttendance(r,'补休');}
    if(r.key==='16')writeAttendance(r,r.f.事项类型);
    if(r.key==='17'){writeAttendance(r,'班次：'+r.f.目标班次);run(r,'ERP班次输出模拟','按人员、班组及排班版本输出');}
    if(r.key==='18'){for(const a of store.attendance.filter(a=>a.employeeId===e.id&&a.date===r.f.开始日期)){a.history=copy(a);a.type=r.f.更正结果;a.anomaly=false;a.version++;a.correction=r.id;}writeAttendance(r,r.f.更正结果);}
    if(r.key==='19'){store.locks.push({employeeId:e.id,month:r.f.月份,source:r.id,version:r.version});run(r,'ERP考勤输出模拟','月度版本已锁定');}
    if(r.key==='20')result.年度考勤=attendanceRows(r);
    if(r.key==='22')run(r,'ERP绩效最终结果同步模拟','员工已确认/收悉；权威系统与回传规范待确认');
    if(r.key==='24')r.checks.confirmed=true;
    if(r.key==='25'){get(r.f.原单编号).checks.confirmed=true;result.修订版本=get(r.f.原单编号).version;}
    if(r.key==='30'){if(['新增','更新'].includes(r.f.办理类型)){const q=e.qualifications.find(q=>q.name===r.f.证照名称);if(q)Object.assign(q,{expires:r.f.到期日期,status:'有效',source:r.id});else e.qualifications.push({id:'QUAL-'+(++sequence),name:r.f.证照名称,category:r.f.类别,issued:date,expires:r.f.到期日期,status:'有效',source:r.id});}result.借阅状态=r.f.办理类型==='原件借阅'?'已借出':r.f.办理类型==='原件归还'?'已归还':'未借出';}
    if(r.key==='31'){const q=e.qualifications.find(q=>q.name===r.f.资格名称),values={name:r.f.资格名称,category:'岗位资格',issued:date,expires:r.f.到期日期,status:'有效',source:r.id};if(q)Object.assign(q,values);else e.qualifications.push({id:'QUAL-'+(++sequence),...values});run(r,'MES/ERP资格结果接口模拟','仅提供确认结果，硬拦截策略待联合确认');}
    archive(r,def(r.key).short,result);log(r,'结果归档','V'+r.version+'写入员工关联记录');
  }
  function evidenceDialog(){const r=get();if(!canAct(r)||!['06','08'].includes(r.key))return fail('无权登记');ui.dialog={id:r.id};openModal('登记办理证据',`<form id="hw-evidence-form">${input({key:'note',label:'签署或送达凭据说明',type:'text'},'')}</form>`,btn('取消',"closeModal()")+btn('登记证据',"HrWorkspace.confirmEvidence()",'primary'));}
  function confirmEvidence(){const f=document.querySelector('#hw-evidence-form');if(!f.reportValidity())return;const r=get(ui.dialog.id);if(!canAct(r))return fail('无办理权限');const note=new FormData(f).get('note');r.f[r.key==='06'?'签署状态':'通知送达']=r.key==='06'?'已签署':'已送达';r.files.push({id:'FILE-'+(++sequence),name:r.id+'-回传证据.txt',content:note,version:r.version,time:date});log(r,'登记回传证据',note);closeModal();render();}
  function source(){const r=get(),id=r.f.原单编号||r.f.计划编号||r.f.关联培训||r.f.关联考试;if(!get(id)||!visible(get(id)))return fail('当前来源不存在或无查看权限');open(id);}
  function archiveTable(rs){return table(['序号','来源单据','业务结果','版本 / 日期','摘要'],rs.map((a,i)=>[i+1,btn(a.source,`HrWorkspace.open('${a.source}')`,'link'),esc(a.kind),'V'+a.version+' / '+a.time,esc(JSON.stringify(a.detail))]));}
  function employeeArchive(id){const rs=store.archives.filter(a=>a.employeeId===id&&visible(get(a.source)));return panel('人事结果与版本',archiveTable(rs));}
  function download(name,blob){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function file(id,save){const r=get();if(!visible(r))return fail('无查看权限');const f=r.files.find(f=>f.id===id);if(!f)return;const blob=f.blob||new Blob([f.content],{type:'text/plain;charset=utf-8'});if(save)return download(f.name,blob);openModal('材料预览',f.content?`<pre class="hw-pre">${esc(f.content)}</pre>`:`<p>${esc(f.name)} · 本地文件，${blob.size}字节</p><p>请下载后使用相应阅读器查看。</p>`,btn('关闭',"closeModal()")+btn('下载文件',`HrWorkspace.file('${id}',true)`));}
  async function upload(f){const r=get();if(!f||!visible(r)||!(canEdit(r)||canAct(r)))return fail('当前不能上传');if(f.size>10*1024*1024)return fail('演示附件限10MB以内');r.files.push({id:'FILE-'+(++sequence),name:f.name,blob:f,content:f.type.startsWith('text/')?await f.text():null,version:r.version,time:date});log(r,'上传附件',f.name);render();}
  function exportList(){const rs=rows();const csv=['编号,流程,员工,状态,版本',...rs.map(r=>[r.id,def(r.key).name,name(r),status(r),r.version].map(csvCell).join(','))].join('\n');download('人事台账.csv',new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));}
  const csvCell=x=>'"'+String(x??'').replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';
  function exportAttendance(){const r=get();if(!visible(r))return fail('无导出权限');download(name(r)+'考勤明细.csv',new Blob(['\ufeff日期,结果,来源,版本\n'+attendanceRows(r).map(a=>[a.date,a.type,a.source,a.version].map(csvCell).join(',')).join('\n')],{type:'text/csv'}));}
  function runTable(rs){return table(['序号','批次 / 来源','人员 / 期间','目标系统','状态','操作'],rs.map((x,i)=>[i+1,esc(x.id)+'<small>'+esc(x.source)+' V'+x.version+'</small>',esc(x.employeeId+' / '+x.period),esc(x.system),esc(x.status),isHr()?btn('模拟成功回执',`HrWorkspace.receive('${x.id}',true)`,'link')+btn('模拟失败',`HrWorkspace.receive('${x.id}',false)`,'link'):'只读']));}
  function runs(){nav('hr-runs');}
  function receive(id,ok){const x=store.runs.find(x=>x.id===id);if(!isHr()||!x)return fail('仅人事可模拟回执');if(x.status==='对账成功')return fail('此批次已完成，不重复执行');if(!visible(get(x.source)))return fail('无来源权限');x.status=ok?'对账成功':'失败待补偿';if(ok&&x.taskId){const t=store.tasks.find(t=>t.id===x.taskId);t.status='已完成';t.result+='；补偿重试成功';}log(get(x.source),ok?'模拟回执成功':'模拟失败待补偿',x.id+' / 员工、期间、版本对账');render();}
  function balances(){nav('hr-balances');}
  function balancesView(){const es=db.employees.filter(e=>isHr()||state.role==='manager'||employeeForRole()===e.id);return shell(boundary()+panel('年休与补休余额',table(['序号','员工','年休可用 / 占用','结转','平时 / 周末 / 节假日补休（小时）','有效期'],es.map((e,i)=>[i+1,esc(e.name),`${e.hrBalance.annual-e.hrBalance.held} / ${e.hrBalance.held}`,e.hrBalance.carry,Object.values(e.hrBalance.comp).join(' / '),e.hrBalance.compExpiry])))+panel('调整轨迹',table(['序号','员工','来源 / 原因','调整前','调整后'],store.balanceLogs.filter(l=>es.some(e=>e.id===l.employeeId)).map((l,i)=>[i+1,esc(employee(l.employeeId)?.name),esc(l.source+' / '+l.reason),esc(l.before),esc(l.after)])))+panel('月度锁定',table(['序号','员工','月份','版本','操作'],store.locks.filter(l=>es.some(e=>e.id===l.employeeId)).map((l,i)=>[i+1,esc(employee(l.employeeId)?.name),l.month,l.version,btn('解除锁定',`HrWorkspace.unlock('${l.source}')`,'link',!isHr())]))),'假期余额与控制','制度参数为可核对的演示配置，不代表客户制度',isHr()?btn('批量年休申请 / 修改',"HrWorkspace.batchLeaveDialog()")+btn('批量核算 / 调整',"HrWorkspace.balanceDialog()",'primary'):'');}
  function batchLeaveDialog(){if(!isHr())return fail('仅人事可批量办理');openModal('批量年休申请与修改',`<form id="hw-batch-form"><div id="hw-error"></div><div class="form-grid">${input({key:'mode',label:'操作类型',type:'select',options:['批量新建','修改草稿']},'批量新建')}${input({key:'ids',label:'员工编号 / 草稿单号（逗号分隔）',type:'text'},'EMP-2026-018')}${input({key:'start',label:'开始日期',type:'date'},'2026-11-02')}${input({key:'end',label:'结束日期',type:'date'},'2026-11-02')}${input({key:'days',label:'天数',type:'number'},1)}${input({key:'reason',label:'批量申请或修改依据',type:'text'},'')}</div></form>`,btn('取消',"closeModal()")+btn('批量保存草稿',"HrWorkspace.batchLeaveSave()",'primary'));}
  function batchLeaveSave(){if(!isHr())return fail('无批量权限');const f=document.querySelector('#hw-batch-form');if(!f.reportValidity())return;const v=Object.fromEntries(new FormData(f)),ids=v.ids.split(/[,，、\s]+/).filter(Boolean);if(!ids.length||new Set(ids).size!==ids.length)return fail('请填写不重复的编号');const drafts=[];for(const id of ids){let r;if(v.mode==='批量新建'){if(!employee(id))return fail('存在无效员工');r=createRecord('12',id);}else{const old=get(id);if(!old||old.key!=='12'||old.stage>=0||!canEdit(old))return fail('仅允许修改人事发起的请假草稿');r=copy(old);r.files=[...old.files];r.history.push({version:r.version,f:copy(r.f),items:[],reason:v.reason});r.version++;}Object.assign(r.f,{假别:'年休假',开始日期:v.start,结束日期:v.end,天数:v.days,事由:v.reason});const err=validate(r,true);if(err)return fail(name(r)+'：'+err);drafts.push(r);}for(const r of drafts){store.records=store.records.filter(x=>x.id!==r.id);store.records.unshift(r);log(r,'批量保存年休草稿',v.reason);}closeModal();list('12');}
  function balanceDialog(){if(!isHr())return fail('仅人事可调整');openModal('假期批量核算与调整',`<form id="hw-balance-form"><div id="hw-error"></div><div class="form-grid">${input({key:'ids',label:'员工编号（逗号分隔）',type:'text'},'EMP-2026-018')}${input({key:'mode',label:'操作类型',type:'select',options:['手工调整','年度分段核算','次年结转','平时补休调整','周末补休调整','节假日补休调整']},'手工调整')}${input({key:'value',label:'调整天数 / 全年标准天数',type:'number'},10)}${input({key:'reason',label:'制度依据与调整原因',type:'text'},'')}</div><p>分段核算按演示年度内在职天数比例，结果保留1位小数；结转仅保留一年，旧结转到期清理。具体制度须客户确认。</p></form>`,btn('取消',"closeModal()")+btn('执行并留痕',"HrWorkspace.adjustBalances()",'primary'));}
  function adjustBalances(){if(!isHr())return fail('无调整权限');const f=document.querySelector('#hw-balance-form');if(!f.reportValidity())return;const v=Object.fromEntries(new FormData(f)),ids=v.ids.split(/[,，、\s]+/).filter(Boolean),value=Number(v.value);if(!ids.length||new Set(ids).size!==ids.length||ids.some(id=>!employee(id))||!Number.isFinite(value)||value<0)return fail('员工或调整值无效');if(ids.some(id=>employee(id).hrBalance.held))return fail('存在未结清申请占用，不能批量调整');if(v.mode==='次年结转'&&ids.some(id=>employee(id).hrBalance.carriedYear===store.policies.year+1))return fail('该员工已执行次年结转，禁止重复');for(const id of ids){const e=employee(id),b=e.hrBalance,before=b.annual;if(v.mode.endsWith('补休调整')){const category=v.mode.replace('补休调整','');const old=b.comp[category];b.comp[category]=value;store.balanceLogs.unshift({employeeId:id,source:'BAL-'+(++sequence),reason:v.mode+' / '+v.reason,before:old,after:value,date});continue;}if(v.mode==='手工调整')b.annual=value;else if(v.mode==='年度分段核算'){const start=Math.max(Date.parse(e.hireDate),Date.parse('2026-01-01')),end=Math.min(Date.parse(e.leaveDate||'2026-12-31'),Date.parse('2026-12-31'));b.annual=Math.round(value*Math.max(0,(end-start)/86400000+1)/365*10)/10;}else{b.carry=Math.max(0,b.annual-b.carry);b.annual=value+b.carry;b.carriedYear=2027;b.carryExpiry='2027-12-31';}e.annualBalance=b.annual;store.balanceLogs.unshift({employeeId:id,source:'BAL-'+(++sequence),reason:v.mode+' / '+v.reason,before,after:b.annual,date});}closeModal();render();}
  function unlock(id){if(!isHr())return fail('仅人事可解除锁定');const l=store.locks.find(l=>l.source===id);if(!l)return;ui.dialog={id,kind:'unlock'};openModal('解除月度锁定',`<form id="hw-unlock-form">${input({key:'reason',label:'解锁原因',type:'text'},'')}</form>`,btn('取消',"closeModal()")+btn('确认解锁',"HrWorkspace.confirmUnlock()",'primary'));}
  function confirmUnlock(){if(!isHr())return;const f=document.querySelector('#hw-unlock-form');if(!f.reportValidity())return;const r=get(ui.dialog.id);log(r,'解除月度锁定',new FormData(f).get('reason'));store.locks=store.locks.filter(l=>l.source!==r.id);r.history.push({version:r.version,f:copy(r.f),items:[],reason:'解除锁定重新确认'});r.version++;r.stage=0;todoSync();closeModal();render();}
  function settings(){openModal('人事演示配置与待确认边界',`<div class="hw-info">${kv('SOW范围','2.1.4 / 31条流程')}${kv('演示日期',date)}${kv('工作时长','8小时/天（演示）')}${kv('结转','一年；具体制度待确认')}${kv('审批角色','申请人→部门负责人→人事/管理层，按流程分开')}${kv('绩效来源','ERP模拟批次，评分和校准实际操作归属待确认')}${kv('待确认','电子签服务、设备协议、移动定位、MES/ERP资格校验')}</div>`,btn('关闭',"closeModal()"));}
  function view(){if(state.page==='hr')return home();if(['hrCatalog','hrDomain','hrSample'].includes(state.page)){if(state.page==='hrSample'){const idx=db.hrSamples.findIndex(x=>x.id===state.hrSampleId);ui.key=defs[idx]?.key||'01';}else ui.key=null;return listView();}if(state.page==='hr-list')return listView();if(state.page==='hr-record')return detail();if(state.page==='hr-edit')return editView();if(state.page==='hr-balances')return balancesView();if(state.page==='hr-runs')return shell(boundary()+runTable(store.runs.filter(x=>visible(get(x.source)))),'人事接口与补偿','模拟人员、岗位、期间与业务版本对账；不调用外部系统');return null;}
  init();
  return {batchLeaveDialog,batchLeaveSave,employeeForRole,evidenceDialog,confirmEvidence,ui,store,defs,def,get,visible,done,status,current,expected,canAct,canEdit,mayTasks,view,home,list,open,create,edit,revise,save,transition,act,confirm,task,confirmTask,source,employeeArchive,file,upload,exportList,exportAttendance,runs,receive,balances,balanceDialog,adjustBalances,unlock,confirmUnlock,settings,tab(t){ui.tab=t;render();},filter(f){ui.filter=f;ui.page=1;render();},search(){ui.query=document.querySelector('#hw-search').value.trim();ui.page=1;render();},reset(){ui.query='';ui.filter='全部';ui.page=1;render();},page(p){ui.page=p;render();},cancel(){ui.edit=null;if(ui.id)open(ui.id);else list(ui.key);},getByKey};
})();
const hrPreviousRender=render;
render=function(){const page=HrWorkspace.view();if(page!==null)return $('#app').innerHTML=page;return hrPreviousRender();};
const hrPreviousDepartment=navDepartmentForPage;
navDepartmentForPage=function(page){return page.startsWith('hr-')?'hr':hrPreviousDepartment(page);};
// 导航目录与事项权限分离：所有角色均可查看 SOW 流程目录，进入记录后再由 visible/canAct 统一控制数据和动作。
hrMenu=function(){return hrDomains.map(d=>navSection('hr',d.id,d.name,HrWorkspace.defs.filter(x=>x.domain===d.id).map(x=>navProcess(x.name,"HrWorkspace.list('"+x.key+"')",'hr:'+x.key)).join(''))).join('')+navSecondLink('employee','员工360档案','hr');};
openHrMenu=function(id){const index=db.hrSamples.findIndex(x=>x.id===id);if(index>=0)HrWorkspace.list(HrWorkspace.defs[index].key);};
showHrSample=openHrMenu;
showHrDomain=function(id){HrWorkspace.list(null,id);};
const hrPreviousEmployeeDetail=employeeDetailPage;
employeeDetailPage=function(){const body=hrPreviousEmployeeDetail();const e=employee();return body.replace('</section>\n    </main>',HrWorkspace.employeeArchive(e.id)+'</section>\n    </main>');};
const hrPreviousShowEmployee=showEmployee;
showEmployee=function(id){const own=HrWorkspace.employeeForRole();if(!['hr','hrHead','manager'].includes(state.role)&&id!==own)return toast('当前身份无权查看此员工档案');return hrPreviousShowEmployee(id);};
visibleEmployees=function(){return db.employees.filter(e=>['hr','hrHead','manager'].includes(state.role)||e.id===HrWorkspace.employeeForRole());};
const hrPreviousObject=typeof openObject==='function'?openObject:null;
if(hrPreviousObject)openObject=function(id){if(HrWorkspace.get(id))return HrWorkspace.open(id);return hrPreviousObject(id);};
render();
/* Keep employee cards and older shortcuts on the same HR records. */
const hrLegacyLeaveForm=openLeaveForm;
openLeaveForm=function(employeeId){const id=employeeId||HrWorkspace.employeeForRole()||'EMP-2026-018';if(!['hr'].includes(state.role)&&id!==HrWorkspace.employeeForRole())return toast('只能为本人申请请假');HrWorkspace.create('12');if(HrWorkspace.ui.edit){HrWorkspace.ui.edit.employeeId=id;render();}};
const hrLegacyShowLeave=showLeave;
showLeave=function(id){if(HrWorkspace.get(id))return HrWorkspace.open(id);return hrLegacyShowLeave(id);};
const hrLegacyShowOnboarding=showOnboarding;
showOnboarding=function(id){const o=db.onboardings.find(o=>o.id===id),r=HrWorkspace.store.records.find(r=>r.key==='03'&&r.employeeId===o?.employeeId);if(r&&HrWorkspace.visible(r))return HrWorkspace.open(r.id);return hrLegacyShowOnboarding(id);};
const hrLegacyGo=go;
go=function(page){if(page==='leave')return HrWorkspace.list('12');if(page==='onboarding')return HrWorkspace.list('03');if(page==='qualification')return HrWorkspace.list('31');return hrLegacyGo(page);};
const hrLegacyEmployeeDetail2=employeeDetailPage;
employeeDetailPage=function(){const id=state.employeeId;if(!visibleEmployees().some(e=>e.id===id))return shell('<div class="empty">当前身份无权查看此员工档案</div>','员工档案访问受限','请返回本人事项');return hrLegacyEmployeeDetail2();};
render();
