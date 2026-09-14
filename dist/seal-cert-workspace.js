/* 印章证照深化工作台：4条SOW流程 + 印章台账 + 证照台账。
 * 统一遵循“查看 / 查看及办理”双模式；会话内生效，刷新恢复演示基线。
 */
(() => {
  if (typeof db === 'undefined' || typeof shell !== 'function') return;

  const esc = value => String(value ?? '—').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
  const copy = value => JSON.parse(JSON.stringify(value));
  const today = '2026-09-14';
  const processAliases = {
    '用印':'sealUse', '用印申请':'sealUse',
    '印章外出':'sealOut', '印章外出使用':'sealOut',
    '印章全生命周期':'sealLife', '刻制、启用、停用及销毁':'sealLife',
    '证照借还':'licenseLoan', '证照借用及归还':'licenseLoan'
  };
  const definitions = {
    sealUse:{
      code:'OA-L3-030101', name:'用印申请流程', short:'用印申请',
      steps:[
        {name:'申请及材料核验',role:'owner'},
        {name:'党政综合办审核',role:'admin'},
        {name:'授权审批',role:'manager'},
        {name:'实际用印登记',role:'admin'},
        {name:'归档用印结果',role:'admin'}
      ],
      groups:[
        {title:'申请信息',fields:[
          ['applicant','申请人','text',null,[0]],['department','申请部门','text',null,[0]],
          ['reason','用印事由','textarea',null,[0]],['documentName','文件名称','text',null,[0]],
          ['documentType','文件类型','select',['制度/方案','对外报送材料','证明材料','其他非合同文件'],[0]],
          ['businessSource','业务来源','text',null,[0]],['due','计划完成日期','date',null,[0]]
        ]},
        {title:'文件与用印控制',fields:[
          ['sealId','印章','select','@seals',[0,1]],['copies','用印份数','number',null,[0,1]],
          ['crossPage','是否骑缝章','select',['否','是'],[0,1]],['confidentiality','密级','select',['普通','内部','秘密'],[0,1]],
          ['external','是否对外文件','select',['是','否'],[0,1]],['finalVersion','最终定稿版本','text',null,[0,1]],
          ['approvalComplete','前置审批状态','select',['未完成','已完成'],[0,1]]
        ]},
        {title:'实际用印登记',fields:[
          ['actualUseTime','实际用印时间','datetime-local',null,[3]],['operator','经办人','text',null,[3]],
          ['supervisor','监印人','text',null,[3]],['actualCopies','实际用印份数','number',null,[3]],
          ['useResult','用印结果','select',['待登记','已完成','异常'],[3]],['archiveNote','盖章版归档说明','textarea',null,[3,4]]
        ]}
      ]
    },
    sealOut:{
      code:'OA-L3-030102', name:'印章外出使用流程', short:'印章外出使用',
      steps:[
        {name:'外出申请核验',role:'owner'},
        {name:'授权审批',role:'manager'},
        {name:'印章领出登记',role:'admin'},
        {name:'归还与状态核验',role:'admin'},
        {name:'归档外出记录',role:'admin'}
      ],
      groups:[
        {title:'外出申请',fields:[
          ['reason','外出事由','textarea',null,[0]],['location','外出地点','text',null,[0]],
          ['useStart','计划使用时间','datetime-local',null,[0]],['expectedReturn','预计归还时间','datetime-local',null,[0]],
          ['carrier','携带人','text',null,[0]],['companion','陪同人','text',null,[0]],
          ['sealId','外出印章','select','@seals',[0]],['due','计划完成日期','date',null,[0]]
        ]},
        {title:'领出登记',fields:[
          ['actualOutTime','实际领出时间','datetime-local',null,[2]],['handoverBy','交章人','text',null,[2]],
          ['receiverOut','领章人','text',null,[2]],['usageDocs','现场使用文件','textarea',null,[2,3]],
          ['usageCount','现场用印次数','number',null,[2,3]]
        ]},
        {title:'归还核验',fields:[
          ['actualReturnTime','实际归还时间','datetime-local',null,[3]],['receiverReturn','接收人','text',null,[3]],
          ['condition','印章完好情况','select',['待核验','完好','异常'],[3]],['returnNote','归还核验说明','textarea',null,[3,4]]
        ]}
      ]
    },
    sealLife:{
      code:'OA-L3-030103', name:'印章刻制、启用、停用及销毁流程', short:'印章全生命周期',
      steps:[
        {name:'生命周期事项申请',role:'admin'},
        {name:'授权审批',role:'manager'},
        {name:'印章台账登记',role:'admin'},
        {name:'处置结果确认',role:'admin'},
        {name:'归档生命周期记录',role:'admin'}
      ],
      groups:[
        {title:'生命周期申请',fields:[
          ['eventType','办理类型','select',['刻制','启用','保管人变更','停用','销毁'],[0]],
          ['sealId','印章编号','text',null,[0]],['sealName','印章名称','text',null,[0]],
          ['sealType','印章类型','select',['公司公章','合同专用章','法定代表人章','行政章','其他'],[0]],
          ['reason','办理原因','textarea',null,[0]],['due','计划完成日期','date',null,[0]]
        ]},
        {title:'台账与保管信息',fields:[
          ['custodian','保管人','text',null,[2]],['storage','存放位置','text',null,[2]],
          ['effectiveDate','生效/启用日期','date',null,[2]],['stopDate','停用/销毁日期','date',null,[2,3]],
          ['disposalResult','处置结果','textarea',null,[3]]
        ]}
      ]
    },
    licenseLoan:{
      code:'OA-L3-030104', name:'证照借用及归还流程', short:'证照借用及归还',
      steps:[
        {name:'借用申请核验',role:'owner'},
        {name:'授权审批',role:'manager'},
        {name:'借出登记',role:'admin'},
        {name:'归还/延期办理',role:'admin'},
        {name:'归档借还记录',role:'admin'}
      ],
      groups:[
        {title:'借用申请',fields:[
          ['licenseId','证照','select','@licenses',[0]],['copyType','借用形式','select',['原件','复印件'],[0]],
          ['purpose','借用事由','textarea',null,[0]],['borrower','借用人','text',null,[0]],
          ['expectedReturn','预计归还日期','date',null,[0]],['due','计划完成日期','date',null,[0]]
        ]},
        {title:'借出登记',fields:[
          ['actualOutDate','实际借出日期','date',null,[2]],['handoverBy','经办人','text',null,[2]],
          ['borrowStatus','借出状态','select',['待登记','已借出'],[2]]
        ]},
        {title:'归还 / 延期',fields:[
          ['returnAction','办理动作','select',['正常归还','提前归还','延期'],[3]],
          ['extensionDate','延期至','date',null,[3]],['actualReturnDate','实际归还日期','date',null,[3]],
          ['receiver','归还接收人','text',null,[3]],['returnNote','归还/延期说明','textarea',null,[3,4]]
        ]}
      ]
    }
  };

  const store = {
    seq:20,
    seals:[
      {id:'SEAL-001',name:'五粮液精美印务公章',type:'公司公章',company:'五粮液精美印务',custodian:'何静',storage:'党政综合办印章柜 A01',status:'在库',enabled:'2023-01-01',holder:'',expectedReturn:'',lastUsed:'2026-09-10',usageCount:36,audit:[{time:'2026-09-10',action:'用印完成',detail:'安全生产检查材料用印 2 份'}]},
      {id:'SEAL-002',name:'合同专用章',type:'合同专用章',company:'五粮液精美印务',custodian:'何静',storage:'党政综合办印章柜 A02',status:'在库',enabled:'2024-02-01',holder:'',expectedReturn:'',lastUsed:'2026-09-12',usageCount:18,audit:[{time:'2026-09-12',action:'用印完成',detail:'年度供应商协议归档'}]},
      {id:'SEAL-003',name:'法定代表人章',type:'法定代表人章',company:'五粮液精美印务',custodian:'何静',storage:'党政综合办印章柜 A03',status:'外出中',enabled:'2024-02-01',holder:'李明',expectedReturn:'2026-09-16 17:00',lastUsed:'2026-09-14',usageCount:9,audit:[{time:'2026-09-14',action:'印章领出',detail:'成都供应商现场事项，携带人李明'}]},
      {id:'SEAL-004',name:'原行政专用章',type:'行政章',company:'五粮液精美印务',custodian:'—',storage:'历史封存',status:'已销毁',enabled:'2020-01-01',holder:'',expectedReturn:'',lastUsed:'2025-12-31',usageCount:112,audit:[{time:'2026-01-15',action:'销毁',detail:'旧版行政章已按审批结果销毁'}]}
    ],
    licenses:[
      {id:'LIC-BIZ-001',name:'营业执照',type:'企业证照',copyType:'原件',custodian:'何静',storage:'党政综合办证照柜 B01',status:'在库',holder:'',expectedReturn:'',validTo:'长期',audit:[{time:'2026-09-08',action:'归还',detail:'银行业务办理后归还'}]},
      {id:'LIC-PRINT-001',name:'印刷经营许可证',type:'经营许可',copyType:'原件',custodian:'何静',storage:'党政综合办证照柜 B02',status:'已借出',holder:'周敏',expectedReturn:'2026-09-18',validTo:'2028-12-31',audit:[{time:'2026-09-13',action:'借出',detail:'客户审厂资料准备'}]},
      {id:'LIC-ISO-001',name:'质量管理体系认证证书',type:'体系证书',copyType:'原件',custodian:'周勇',storage:'质量管理部资料柜',status:'延期中',holder:'周勇',expectedReturn:'2026-09-20',validTo:'2027-06-30',audit:[{time:'2026-09-14',action:'延期',detail:'客户审厂延期至 9 月 20 日'}]}
    ],
    records:[]
  };

  function def(key){return definitions[key];}
  function currentRoleName(){return typeof currentRole === 'function' ? currentRole().name : state.role;}
  function assignedRole(record){return def(record.key).steps[record.step]?.role || 'admin';}
  function canAct(record){return !!record && !record.closed && assignedRole(record)===state.role;}
  function canView(record){return !!record && (['admin','manager'].includes(state.role) || record.applicantRole===state.role || record.department==='生产管理部'&&state.role==='owner' || state.role==='employee'&&record.applicant==='李明');}
  function status(record){
    if(record.closed)return '已归档';
    if(record.returned)return '已退回';
    const map={
      sealUse:['待提交','审批中','审批中','待用印','待归档'],
      sealOut:['待提交','审批中','待领出','待归还','待归档'],
      sealLife:['待提交','审批中','待登记','待处置确认','待归档'],
      licenseLoan:['待提交','审批中','待借出','待归还/延期','待归档']
    };
    return map[record.key]?.[record.step] || '办理中';
  }
  function processName(key){return def(key)?.short || key;}
  function sealOptions(){return store.seals.filter(x=>!['已销毁'].includes(x.status)).map(x=>[x.id,`${x.name} · ${x.status}`]);}
  function licenseOptions(){return store.licenses.map(x=>[x.id,`${x.name} · ${x.status}`]);}
  function log(record,action,detail){record.audit.unshift({time:today+' '+new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}),actor:currentRoleName(),role:state.role,action,detail,version:'V'+record.version});}
  function snapshot(record,reason){record.snapshots.unshift({version:'V'+record.version,time:today,reason,fields:copy(record.fields)});}
  function makeRecord(key,opts={}){
    const base={
      id:opts.id || `SC-${key.toUpperCase()}-${String(++store.seq).padStart(3,'0')}`,
      key, code:def(key).code, title:opts.title || def(key).short+'事项', company:'五粮液精美印务',
      department:opts.department || '生产管理部', applicant:opts.applicant || '刘强', applicantRole:opts.applicantRole || 'owner',
      owner:opts.owner || '党政综合办 / 何静', source:opts.source || '当前会话发起', step:opts.step ?? 0,
      version:opts.version || 1, effectiveVersion:opts.effectiveVersion || 0, closed:!!opts.closed, returned:false,
      fields:copy(opts.fields||{}), files:copy(opts.files||[]), audit:copy(opts.audit||[]), snapshots:[]
    };
    store.records.push(base);return base;
  }
  function seed(){
    makeRecord('sealUse',{
      id:'SC-USE-001',title:'安全生产检查实施方案用印申请',step:1,source:'文件评审 ADM17-review-008 / V1',
      fields:{applicant:'刘强',department:'生产管理部',reason:'安全生产检查实施方案经评审确认后，对外报送前申请加盖公司公章。',documentName:'安全生产检查实施方案（定稿）',documentType:'对外报送材料',businessSource:'文件评审 ADM17-review-008',due:'2026-09-16',sealId:'SEAL-001',copies:3,crossPage:'是',confidentiality:'内部',external:'是',finalVersion:'V1.0定稿',approvalComplete:'已完成',actualUseTime:'',operator:'何静',supervisor:'',actualCopies:3,useResult:'待登记',archiveNote:''},
      files:[{name:'安全生产检查实施方案_V1.0定稿.pdf',version:'V1',time:'2026-09-14 10:20',category:'最终版文件'}],
      audit:[{time:'2026-09-14 10:20',actor:'刘强',role:'owner',action:'提交用印申请',detail:'最终定稿版本 V1.0，申请公司公章 3 份并加盖骑缝章。',version:'V1'}]
    });
    makeRecord('sealUse',{
      id:'SC-USE-002',title:'供应商资质证明材料用印',step:5,closed:true,effectiveVersion:1,source:'经营发展部证明材料申请',department:'经营发展部',applicant:'周敏',applicantRole:'operations',
      fields:{applicant:'周敏',department:'经营发展部',reason:'供应商准入证明材料对外提交。',documentName:'企业资质情况说明',documentType:'证明材料',businessSource:'经营发展部申请',due:'2026-09-12',sealId:'SEAL-001',copies:2,crossPage:'否',confidentiality:'普通',external:'是',finalVersion:'V1.0',approvalComplete:'已完成',actualUseTime:'2026-09-12T15:20',operator:'何静',supervisor:'王丽',actualCopies:2,useResult:'已完成',archiveNote:'盖章扫描件及申请单已归档。'},
      files:[{name:'企业资质情况说明_盖章版.pdf',version:'V1',time:'2026-09-12 15:30',category:'盖章版'}],
      audit:[{time:'2026-09-12 15:30',actor:'何静',role:'admin',action:'归档用印结果',detail:'实际用印 2 份，盖章版已归档。',version:'V1'}]
    });
    makeRecord('sealOut',{
      id:'SC-OUT-001',title:'成都供应商现场事项携章申请',step:3,source:'采购业务现场办理',
      fields:{reason:'供应商现场业务材料需当面盖章确认。',location:'成都供应商现场',useStart:'2026-09-14T13:30',expectedReturn:'2026-09-16T17:00',carrier:'李明',companion:'王丽',sealId:'SEAL-003',due:'2026-09-16',actualOutTime:'2026-09-14T12:50',handoverBy:'何静',receiverOut:'李明',usageDocs:'现场确认函、授权材料',usageCount:2,actualReturnTime:'',receiverReturn:'何静',condition:'待核验',returnNote:''},
      files:[{name:'印章外出审批单.pdf',version:'V1',time:'2026-09-14 11:30',category:'审批材料'}],
      audit:[{time:'2026-09-14 12:50',actor:'何静',role:'admin',action:'印章领出登记',detail:'法定代表人章已领出，携带人李明，预计 9 月 16 日归还。',version:'V1'}]
    });
    makeRecord('sealOut',{
      id:'SC-OUT-002',title:'政务大厅事项携章记录',step:5,closed:true,effectiveVersion:1,source:'党政综合办直接申请',department:'党政综合办',applicant:'何静',applicantRole:'admin',
      fields:{reason:'政务大厅办理企业事项。',location:'宜宾政务服务中心',useStart:'2026-09-05T09:00',expectedReturn:'2026-09-05T17:00',carrier:'何静',companion:'王丽',sealId:'SEAL-001',due:'2026-09-05',actualOutTime:'2026-09-05T08:30',handoverBy:'王丽',receiverOut:'何静',usageDocs:'企业事项申请表',usageCount:1,actualReturnTime:'2026-09-05T16:20',receiverReturn:'王丽',condition:'完好',returnNote:'当日归还并核验无异常。'},
      files:[{name:'外出用章归还核验单.pdf',version:'V1',time:'2026-09-05 16:30',category:'归还凭证'}],audit:[]
    });
    makeRecord('sealLife',{
      id:'SC-LIFE-001',title:'新行政专用章启用申请',step:1,source:'党政综合办印章管理',department:'党政综合办',applicant:'何静',applicantRole:'admin',
      fields:{eventType:'启用',sealId:'SEAL-005',sealName:'行政事务专用章',sealType:'行政章',reason:'原行政章已销毁，申请启用新版行政事务专用章。',due:'2026-09-20',custodian:'何静',storage:'党政综合办印章柜 A04',effectiveDate:'2026-09-21',stopDate:'',disposalResult:''},
      files:[{name:'印章启用申请材料.pdf',version:'V1',time:'2026-09-14 09:00',category:'申请材料'}],audit:[]
    });
    makeRecord('sealLife',{
      id:'SC-LIFE-002',title:'原行政专用章销毁记录',step:5,closed:true,effectiveVersion:1,source:'印章年度清理',department:'党政综合办',applicant:'何静',applicantRole:'admin',
      fields:{eventType:'销毁',sealId:'SEAL-004',sealName:'原行政专用章',sealType:'行政章',reason:'版本替换并完成停用审批。',due:'2026-01-15',custodian:'—',storage:'历史封存',effectiveDate:'2020-01-01',stopDate:'2026-01-15',disposalResult:'已现场销毁并形成销毁记录。'},files:[{name:'印章销毁记录.pdf',version:'V1',time:'2026-01-15 16:00',category:'处置凭证'}],audit:[]
    });
    makeRecord('licenseLoan',{
      id:'SC-LIC-001',title:'印刷经营许可证客户审厂借用',step:3,source:'客户审厂准备',department:'经营发展部',applicant:'周敏',applicantRole:'operations',
      fields:{licenseId:'LIC-PRINT-001',copyType:'原件',purpose:'客户现场审厂需核验印刷经营许可证原件。',borrower:'周敏',expectedReturn:'2026-09-18',due:'2026-09-18',actualOutDate:'2026-09-13',handoverBy:'何静',borrowStatus:'已借出',returnAction:'正常归还',extensionDate:'',actualReturnDate:'',receiver:'何静',returnNote:''},
      files:[{name:'证照借用审批单.pdf',version:'V1',time:'2026-09-13 10:00',category:'借用依据'}],audit:[{time:'2026-09-13 10:30',actor:'何静',role:'admin',action:'借出登记',detail:'印刷经营许可证原件已交周敏，预计 9 月 18 日归还。',version:'V1'}]
    });
    makeRecord('licenseLoan',{
      id:'SC-LIC-002',title:'质量体系证书借用延期',step:3,source:'质量管理部客户审厂',department:'质量管理部',applicant:'周勇',applicantRole:'owner',
      fields:{licenseId:'LIC-ISO-001',copyType:'原件',purpose:'客户审厂资料核验。',borrower:'周勇',expectedReturn:'2026-09-15',due:'2026-09-20',actualOutDate:'2026-09-10',handoverBy:'何静',borrowStatus:'已借出',returnAction:'延期',extensionDate:'2026-09-20',actualReturnDate:'',receiver:'何静',returnNote:'客户审厂时间调整，申请延期至 9 月 20 日。'},files:[],audit:[]
    });
  }
  seed();

  const ui={active:false,section:'business',process:'sealUse',id:null,mode:'view',tab:'业务办理',query:'',filter:'全部'};
  function reset(){ui.active=false;ui.id=null;ui.tab='业务办理';ui.mode='view';}
  function activate(process){ui.active=true;ui.section='business';ui.process=process||ui.process||'sealUse';ui.id=null;ui.mode='view';ui.tab='业务办理';ui.query='';ui.filter='全部';state.page='admin';state.adminTab='印章证照';}
  function list(type){activate(processAliases[type]||type||'sealUse');state.adminQuery=type||'';state.activeNavProcess='admin:印章证照:'+(type||'用印');render();window.scrollTo({top:0,behavior:'smooth'});}
  function setSection(section){ui.section=section;ui.id=null;ui.tab='业务办理';render();}
  function setProcess(key){ui.process=key;ui.section='business';ui.id=null;state.activeNavProcess='admin:印章证照:'+({sealUse:'用印',sealOut:'印章外出',sealLife:'印章全生命周期',licenseLoan:'证照借还'}[key]);render();}
  function open(id,mode='view'){const r=store.records.find(x=>x.id===id);if(!r||!canView(r))return toast('当前身份无权查看该事项');ui.id=id;ui.mode=mode==='handle'&&canAct(r)?'handle':'view';ui.tab='业务办理';render();window.scrollTo({top:0,behavior:'smooth'});}
  function back(){ui.id=null;ui.mode='view';ui.tab='业务办理';render();window.scrollTo({top:0,behavior:'smooth'});}
  function setTab(tab){ui.tab=tab;render();}
  function findRecord(){return store.records.find(x=>x.id===ui.id);}
  function statusClass(value){if(['已归档','在库','已归还'].includes(value))return 'ok';if(['审批中','待用印','待领出','待借出','办理中'].includes(value))return 'active';if(['待归还','待归还/延期','延期中','外出中','已借出'].includes(value))return 'pending';if(['已退回','异常','逾期未还','已停用','已销毁'].includes(value))return 'warn';return '';}
  function pill(value){return `<span class="sc-status ${statusClass(value)}">${esc(value)}</span>`;}
  function btn(label,action,cls='secondary',disabled=false){return `<button class="${cls}" onclick="${action}" ${disabled?'disabled':''}>${esc(label)}</button>`;}
  function processCounts(key){return store.records.filter(x=>x.key===key&&canView(x)).length;}
  function syncTodos(){
    db.todos=db.todos.filter(t=>!String(t.id).startsWith('SC-TODO-'));
    store.records.filter(r=>!r.closed).forEach(r=>db.todos.push({id:'SC-TODO-'+r.id,objectId:r.id,type:processName(r.key),title:r.title+' · '+status(r),role:assignedRole(r),due:r.fields.due||today,status:'待处理'}));
  }
  syncTodos();

  function hero(){
    const active=store.records.filter(r=>!r.closed&&canView(r));
    const sealsOut=store.seals.filter(s=>s.status==='外出中').length;
    const licensesOut=store.licenses.filter(s=>['已借出','延期中'].includes(s.status)).length;
    const due=store.records.filter(r=>!r.closed&&(r.fields.due||'9999-99-99')<today).length;
    return `<div class="sc-hero"><div><span class="eyebrow">OA-L3-030101 ~ 030104 · 印章证照深化</span><h2>流程办理与实物台账同步管理</h2><p>用印、外出携章、印章生命周期、证照借还统一保留审批、实际交接、状态和版本轨迹。</p></div><div class="sc-hero-actions">${btn('+ 新建当前事项','SealCertWorkspace.newRecord()','primary')}${btn('查看印章台账',"SealCertWorkspace.setSection('seals')")}</div></div>
      <div class="sc-kpis"><button class="sc-kpi" onclick="SealCertWorkspace.setSection('business')"><b>${active.length}</b><span>当前办理事项</span></button><button class="sc-kpi" onclick="SealCertWorkspace.setSection('seals')"><b>${sealsOut}</b><span>当前外出印章</span></button><button class="sc-kpi" onclick="SealCertWorkspace.setSection('licenses')"><b>${licensesOut}</b><span>当前借出证照</span></button><button class="sc-kpi"><b>${due}</b><span>已逾期事项</span></button></div>
      <div class="sc-tabs"><button class="${ui.section==='business'?'active':''}" onclick="SealCertWorkspace.setSection('business')">业务事项</button><button class="${ui.section==='seals'?'active':''}" onclick="SealCertWorkspace.setSection('seals')">印章台账</button><button class="${ui.section==='licenses'?'active':''}" onclick="SealCertWorkspace.setSection('licenses')">证照台账</button></div>`;
  }
  function processTabs(){return `<div class="sc-process-tabs">${Object.entries(definitions).map(([key,d])=>`<button class="${ui.process===key?'active':''}" onclick="SealCertWorkspace.setProcess('${key}')">${esc(d.short)} <b>${processCounts(key)}</b></button>`).join('')}</div>`;}
  function businessList(){
    let rows=store.records.filter(r=>r.key===ui.process&&canView(r));
    const q=ui.query.trim();if(q)rows=rows.filter(r=>[r.id,r.title,r.department,r.source,status(r)].join(' ').includes(q));
    if(ui.filter!=='全部')rows=rows.filter(r=>ui.filter==='待我办理'?canAct(r):status(r)===ui.filter);
    return `${processTabs()}<div class="toolbar"><input value="${esc(ui.query)}" placeholder="编号、事项、申请部门或来源" oninput="SealCertWorkspace.search(this.value)"><select onchange="SealCertWorkspace.filter(this.value)">${['全部','待我办理','审批中','待归还','已归档'].map(v=>`<option ${ui.filter===v?'selected':''}>${v}</option>`).join('')}</select><span class="spacer"></span>${btn('新建'+definitions[ui.process].short,'SealCertWorkspace.newRecord()','primary')}</div>
      <div class="sc-table"><table><thead><tr><th>序号</th><th>编号</th><th>流程</th><th>事项名称</th><th>来源 / 关联</th><th>责任 / 期限</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><td><button class="sc-link" onclick="SealCertWorkspace.open('${r.id}','view')">${esc(r.id)}</button><small>${esc(r.code)}</small></td><td>${esc(def(r.key).short)}</td><td class="wrap"><button class="sc-link" onclick="SealCertWorkspace.open('${r.id}','view')">${esc(r.title)}</button><small>${esc(r.department)} · ${esc(r.applicant)}</small></td><td class="wrap">${esc(r.source)}<small>${relationSummary(r)}</small></td><td>${esc(r.owner)}<small>${esc(r.fields.due||'—')}</small></td><td>${pill(status(r))}</td><td>${canAct(r)?btn('查看及办理',`SealCertWorkspace.open('${r.id}','handle')`,'primary'):btn('查看',`SealCertWorkspace.open('${r.id}','view')`)}</td></tr>`).join('')||'<tr><td colspan="8"><div class="sc-empty">当前筛选没有业务事项。</div></td></tr>'}</tbody></table></div>`;
  }
  function relationSummary(r){
    if(r.key==='sealUse'||r.key==='sealOut')return '印章：'+(store.seals.find(x=>x.id===r.fields.sealId)?.name||r.fields.sealId||'待选择');
    if(r.key==='sealLife')return (r.fields.sealId||'新印章')+' / '+(r.fields.eventType||'生命周期事项');
    if(r.key==='licenseLoan')return '证照：'+(store.licenses.find(x=>x.id===r.fields.licenseId)?.name||r.fields.licenseId||'待选择');
    return '—';
  }
  function sealsLedger(){return `<div class="sc-section"><div class="sc-section-h"><h3>印章台账</h3><div class="sc-ledger-summary"><span class="sc-pill">在库 ${store.seals.filter(x=>x.status==='在库').length}</span><span class="sc-pill">外出中 ${store.seals.filter(x=>x.status==='外出中').length}</span><span class="sc-pill">停用/销毁 ${store.seals.filter(x=>['已停用','已销毁'].includes(x.status)).length}</span></div></div><div class="sc-table"><table><thead><tr><th>印章编号</th><th>印章名称</th><th>类型</th><th>保管人</th><th>存放位置</th><th>当前状态</th><th>当前持有人</th><th>预计归还</th><th>最近使用</th></tr></thead><tbody>${store.seals.map(s=>`<tr><td><b>${esc(s.id)}</b></td><td>${esc(s.name)}</td><td>${esc(s.type)}</td><td>${esc(s.custodian)}</td><td>${esc(s.storage)}</td><td>${pill(s.status)}</td><td>${esc(s.holder||'—')}</td><td>${esc(s.expectedReturn||'—')}</td><td>${esc(s.lastUsed||'—')}<small>累计 ${s.usageCount||0} 次</small></td></tr>`).join('')}</tbody></table></div></div><div class="sc-section"><div class="sc-section-h"><h3>台账说明</h3></div><div class="sc-section-body"><div class="sc-good">印章外出流程在“领出登记”后自动改为“外出中”，归还核验后恢复“在库”；停用、销毁结果由印章生命周期流程写回台账。</div></div></div>`;}
  function licensesLedger(){return `<div class="sc-section"><div class="sc-section-h"><h3>证照台账</h3><div class="sc-ledger-summary"><span class="sc-pill">在库 ${store.licenses.filter(x=>x.status==='在库').length}</span><span class="sc-pill">已借出 ${store.licenses.filter(x=>x.status==='已借出').length}</span><span class="sc-pill">延期中 ${store.licenses.filter(x=>x.status==='延期中').length}</span></div></div><div class="sc-table"><table><thead><tr><th>证照编号</th><th>证照名称</th><th>类型</th><th>形式</th><th>保管人 / 位置</th><th>当前状态</th><th>当前借用人</th><th>预计归还</th><th>有效期</th></tr></thead><tbody>${store.licenses.map(x=>`<tr><td><b>${esc(x.id)}</b></td><td>${esc(x.name)}</td><td>${esc(x.type)}</td><td>${esc(x.copyType)}</td><td>${esc(x.custodian)}<small>${esc(x.storage)}</small></td><td>${pill(x.status)}</td><td>${esc(x.holder||'—')}</td><td>${esc(x.expectedReturn||'—')}</td><td>${esc(x.validTo||'—')}</td></tr>`).join('')}</tbody></table></div></div><div class="sc-section"><div class="sc-section-h"><h3>借还规则</h3></div><div class="sc-section-body"><div class="sc-good">证照借出后台账自动记录借用人和预计归还日期；延期形成独立办理动作并更新预计归还日期，实际归还后恢复“在库”。</div></div></div>`;}

  function optionHtml(field,value){
    let options=field[3];if(options==='@seals')options=sealOptions();if(options==='@licenses')options=licenseOptions();
    if(Array.isArray(options)&&Array.isArray(options[0]))return options.map(([v,label])=>`<option value="${esc(v)}" ${String(v)===String(value)?'selected':''}>${esc(label)}</option>`).join('');
    return (options||[]).map(v=>`<option ${String(v)===String(value)?'selected':''}>${esc(v)}</option>`).join('');
  }
  function fieldControl(record,field){
    const [key,label,type,,editSteps]=field;const editable=ui.mode==='handle'&&canAct(record)&&editSteps.includes(record.step);const value=record.fields[key]??'';let control='';
    if(type==='select')control=`<select id="sc-${key}" ${editable?'':'disabled'}>${optionHtml(field,value)}</select>`;
    else if(type==='textarea')control=`<textarea id="sc-${key}" ${editable?'':'disabled'}>${esc(value)}</textarea>`;
    else control=`<input id="sc-${key}" type="${type}" value="${esc(value)}" ${editable?'':'disabled'}>`;
    return `<div class="sc-field ${type==='textarea'?'full':''}"><label>${esc(label)}</label>${control}${editable?'<span class="sc-inline-note">当前节点可维护</span>':''}</div>`;
  }
  function editableFields(record){return def(record.key).groups.flatMap(g=>g.fields).filter(f=>f[4].includes(record.step));}
  function save(){
    const r=findRecord();if(!r||ui.mode!=='handle'||!canAct(r))return toast('当前模式不能保存');const fields=editableFields(r);if(!fields.length)return toast('当前节点没有需要维护的业务字段');snapshot(r,'保存前版本');
    fields.forEach(([key,,type])=>{const el=document.querySelector('#sc-'+key);if(el)r.fields[key]=type==='number'?Number(el.value):el.value;});r.version++;log(r,'保存业务修订','当前节点字段已保存，历史版本保留。');syncTodos();render();toast('已保存业务信息并生成新版本');
  }
  function validate(record){
    const f=record.fields,s=store.seals.find(x=>x.id===f.sealId),l=store.licenses.find(x=>x.id===f.licenseId);
    if(record.key==='sealUse'){
      if(record.step===0&&(!f.documentName||!f.reason||!f.finalVersion||!f.sealId||Number(f.copies)<=0))return '请补齐文件名称、用印事由、最终定稿版本、印章和份数';
      if(record.step===1&&f.approvalComplete!=='已完成')return '前置审批未完成，不能继续用印审批';
      if(record.step===1&&(!s||!['在库'].includes(s.status)))return '所选印章当前不在库，不能进入授权审批';
      if(record.step===3&&(!f.actualUseTime||!f.operator||!f.supervisor||Number(f.actualCopies)<=0||f.useResult!=='已完成'))return '请完成实际用印时间、经办人、监印人、份数和结果登记';
    }
    if(record.key==='sealOut'){
      if(record.step===0&&(!f.reason||!f.location||!f.useStart||!f.expectedReturn||!f.carrier||!f.sealId))return '请补齐外出事由、地点、时间、携带人和印章';
      if(record.step===1&&(!s||s.status!=='在库'))return '印章当前不在库，不能批准外出';
      if(record.step===2&&(!f.actualOutTime||!f.handoverBy||!f.receiverOut))return '请登记实际领出时间、交章人和领章人';
      if(record.step===3&&(!f.actualReturnTime||!f.receiverReturn||f.condition==='待核验'))return '请完成实际归还时间、接收人和印章完好核验';
    }
    if(record.key==='sealLife'){
      if(record.step===0&&(!f.eventType||!f.sealId||!f.sealName||!f.reason))return '请填写办理类型、印章编号、名称和办理原因';
      if(record.step===2&&(!f.custodian||!f.storage||!f.effectiveDate))return '请填写保管人、存放位置和生效/启用日期';
      if(record.step===3&&['停用','销毁'].includes(f.eventType)&&(!f.stopDate||!f.disposalResult))return '停用或销毁须登记日期和处置结果';
    }
    if(record.key==='licenseLoan'){
      if(record.step===0&&(!l||!f.purpose||!f.borrower||!f.expectedReturn))return '请选择证照并填写借用事由、借用人和预计归还日期';
      if(record.step===1&&f.copyType==='原件'&&l.status!=='在库')return '证照原件当前不在库，不能批准借用';
      if(record.step===2&&(!f.actualOutDate||!f.handoverBy||f.borrowStatus!=='已借出'))return '请登记实际借出日期、经办人并确认已借出';
      if(record.step===3&&f.returnAction==='延期'&&!f.extensionDate)return '延期必须填写延期至日期';
      if(record.step===3&&f.returnAction!=='延期'&&(!f.actualReturnDate||!f.receiver))return '归还必须填写实际归还日期和接收人';
    }
    return '';
  }
  function applyStepEffect(record){
    const f=record.fields;
    if(record.key==='sealUse'&&record.step===3){const s=store.seals.find(x=>x.id===f.sealId);if(s){s.lastUsed=(f.actualUseTime||today).slice(0,10);s.usageCount=(s.usageCount||0)+Number(f.actualCopies||0);s.audit.unshift({time:today,action:'用印完成',detail:`${record.title} · ${f.actualCopies}份`});}}
    if(record.key==='sealOut'&&record.step===2){const s=store.seals.find(x=>x.id===f.sealId);if(s){s.status='外出中';s.holder=f.receiverOut||f.carrier;s.expectedReturn=(f.expectedReturn||'').replace('T',' ');s.lastUsed=today;s.audit.unshift({time:today,action:'印章领出',detail:`${record.id} · ${s.holder}`});}}
    if(record.key==='sealOut'&&record.step===3){const s=store.seals.find(x=>x.id===f.sealId);if(s){s.status='在库';s.holder='';s.expectedReturn='';s.audit.unshift({time:today,action:'印章归还',detail:`${record.id} · ${f.condition}`});}}
    if(record.key==='sealLife'&&record.step===2){let s=store.seals.find(x=>x.id===f.sealId);if(!s){s={id:f.sealId,name:f.sealName,type:f.sealType,company:record.company,custodian:f.custodian,storage:f.storage,status:'待启用',enabled:f.effectiveDate,holder:'',expectedReturn:'',lastUsed:'',usageCount:0,audit:[]};store.seals.push(s);}s.name=f.sealName;s.type=f.sealType;s.custodian=f.custodian;s.storage=f.storage;if(f.eventType==='刻制')s.status='待启用';if(f.eventType==='启用')s.status='在库';if(f.eventType==='保管人变更')s.status=s.status==='已销毁'?'已销毁':'在库';if(f.eventType==='停用')s.status='已停用';if(f.eventType==='销毁')s.status='已销毁';s.audit.unshift({time:today,action:f.eventType,detail:record.id+' · '+(f.disposalResult||f.reason)});}
    if(record.key==='licenseLoan'&&record.step===2){const l=store.licenses.find(x=>x.id===f.licenseId);if(l&&f.copyType==='原件'){l.status='已借出';l.holder=f.borrower;l.expectedReturn=f.expectedReturn;l.audit.unshift({time:today,action:'借出',detail:`${record.id} · ${f.borrower}`});}}
    if(record.key==='licenseLoan'&&record.step===3){const l=store.licenses.find(x=>x.id===f.licenseId);if(l&&f.copyType==='原件'){if(f.returnAction==='延期'){l.status='延期中';l.expectedReturn=f.extensionDate;l.audit.unshift({time:today,action:'延期',detail:`${record.id} · 延期至 ${f.extensionDate}`});}else{l.status='在库';l.holder='';l.expectedReturn='';l.audit.unshift({time:today,action:f.returnAction,detail:`${record.id} · ${f.actualReturnDate}`});}}}
  }
  function operation(action='advance'){
    const r=findRecord();if(!r||ui.mode!=='handle'||!canAct(r))return toast('当前身份或模式不能办理该节点');
    if(action==='return'){if(r.step===0)return toast('首节点不能退回');const note=prompt('填写退回原因：');if(!note)return;r.step=Math.max(0,r.step-1);r.returned=true;log(r,'退回补充',note);syncTodos();render();return;}
    const error=validate(r);if(error)return toast(error);
    const note=prompt('填写办理意见 / 核验说明：');if(!note)return;
    applyStepEffect(r);log(r,def(r.key).steps[r.step].name,note);r.returned=false;r.step++;
    if(r.step>=def(r.key).steps.length){r.closed=true;r.effectiveVersion=r.version;log(r,'事项归档','流程全部完成，当前有效版本 V'+r.version);}
    syncTodos();ui.mode='view';render();toast(r.closed?'事项已归档':'节点办理完成，已进入下一环节');
  }
  function addEvidence(){const r=findRecord();if(!r||ui.mode!=='handle'||!canAct(r))return toast('查看模式不能新增附件');const name=prompt('填写附件名称：','办理佐证_'+(r.files.length+1)+'.pdf');if(!name)return;r.files.unshift({name,version:'V'+r.version,time:today+' 15:30',category:'办理佐证'});log(r,'新增附件',name);render();}
  function newRecord(){
    const key=ui.process,d=def(key);if(!['admin','owner','employee','operations'].includes(state.role))return toast('当前身份无权发起该流程');
    const fields={due:'2026-09-30'};
    d.groups.flatMap(g=>g.fields).forEach(([k,,type,options])=>{if(fields[k]!==undefined)return;if(options==='@seals')fields[k]=store.seals.find(x=>x.status==='在库')?.id||'';else if(options==='@licenses')fields[k]=store.licenses.find(x=>x.status==='在库')?.id||'';else if(Array.isArray(options))fields[k]=Array.isArray(options[0])?options[0][0]:options[0];else fields[k]=type==='number'?1:'';});
    if(key==='sealUse')Object.assign(fields,{applicant:currentRoleName(),department:state.role==='owner'?'生产管理部':'党政综合办',documentType:'对外报送材料',copies:1,finalVersion:'V1.0定稿',approvalComplete:'已完成'});
    if(key==='sealOut')Object.assign(fields,{carrier:currentRoleName(),receiverOut:currentRoleName(),usageCount:1});
    if(key==='sealLife')Object.assign(fields,{eventType:'刻制',sealId:'SEAL-'+String(store.seals.length+1).padStart(3,'0'),sealName:'新印章',sealType:'行政章'});
    if(key==='licenseLoan')Object.assign(fields,{borrower:currentRoleName(),copyType:'原件',borrowStatus:'待登记',returnAction:'正常归还'});
    const r=makeRecord(key,{title:d.short+' · 新建事项',department:state.role==='owner'?'生产管理部':'党政综合办',applicant:currentRoleName(),applicantRole:state.role,source:'当前会话发起',fields,files:[]});
    log(r,'新建草稿','已生成印章证照业务事项');syncTodos();open(r.id,canAct(r)?'handle':'view');
  }
  function search(value){ui.query=value;render();}
  function filter(value){ui.filter=value;render();}

  function detailModeTip(r){return ui.mode==='handle'&&canAct(r)?'<div class="sc-mode"><strong>查看及办理</strong> · 当前身份为本节点办理人，可按节点权限维护字段、添加附件、保存并提交；其他历史内容只读。</div>':'<div class="sc-mode"><strong>查看模式</strong> · 页面结构与办理页一致，仅供查看；不可新增、编辑、删除、上传或提交节点动作。</div>';}
  function stepsHtml(r){const steps=def(r.key).steps;return `<div class="sc-steps">${steps.map((s,i)=>`<div class="sc-step ${i<r.step?'done':i===r.step&&!r.closed?'current':''}"><b>${i+1}. ${esc(s.name)}</b><span>${i<r.step?'已完成':i===r.step&&!r.closed?'当前节点 · '+esc(roles[s.role]?.label||s.role):'待办理 · '+esc(roles[s.role]?.label||s.role)}</span></div>`).join('')}</div>`;}
  function businessForm(r){
    const d=def(r.key);const groups=d.groups.map(g=>`<div class="sc-section"><div class="sc-section-h"><h3>${esc(g.title)}</h3><span class="sc-inline-note">${esc(currentStageHint(r,g.title))}</span></div><div class="sc-section-body"><div class="sc-form-grid">${g.fields.map(f=>fieldControl(r,f)).join('')}</div></div></div>`).join('');
    const editable=ui.mode==='handle'&&canAct(r)&&editableFields(r).length>0;
    return `${groups}${workflowRule(r)}${editable?`<div class="sc-actions">${btn('保存当前填写','SealCertWorkspace.save()','secondary')}</div>`:''}`;
  }
  function currentStageHint(r,title){if(ui.mode!=='handle'||!canAct(r))return '只读';const fields=def(r.key).groups.find(g=>g.title===title)?.fields||[];return fields.some(f=>f[4].includes(r.step))?'当前节点可维护':'当前节点只读';}
  function workflowRule(r){
    const f=r.fields;if(r.key==='sealUse')return `<div class="sc-section"><div class="sc-section-h"><h3>关键控制</h3></div><div class="sc-section-body">${f.approvalComplete==='已完成'&&f.finalVersion?'<div class="sc-good">已识别最终定稿版本 '+esc(f.finalVersion)+'；实际用印必须与该版本保持一致。</div>':'<div class="sc-alert">前置审批或最终定稿版本未满足，不能进入实际用印。</div>'}</div></div>`;
    if(r.key==='sealOut'){const s=store.seals.find(x=>x.id===f.sealId);return `<div class="sc-section"><div class="sc-section-h"><h3>印章状态联动</h3></div><div class="sc-section-body">${s?`当前 ${esc(s.name)}：${pill(s.status)}；持有人 ${esc(s.holder||'—')}；预计归还 ${esc(s.expectedReturn||'—')}。`:'尚未选择有效印章。'}</div></div>`;}
    if(r.key==='sealLife')return `<div class="sc-section"><div class="sc-section-h"><h3>生命周期规则</h3></div><div class="sc-section-body"><div class="sc-good">刻制、启用、保管人变更、停用、销毁均保留独立来源流程和处理轨迹；处置结果回写印章台账。</div></div></div>`;
    if(r.key==='licenseLoan'){const l=store.licenses.find(x=>x.id===f.licenseId);return `<div class="sc-section"><div class="sc-section-h"><h3>证照状态联动</h3></div><div class="sc-section-body">${l?`当前 ${esc(l.name)}：${pill(l.status)}；借用人 ${esc(l.holder||'—')}；预计归还 ${esc(l.expectedReturn||'—')}。`:'尚未选择有效证照。'}</div></div>`;}
    return '';
  }
  function historyView(r){
    const versions=r.snapshots.map(s=>`<tr><td>${esc(s.version)}</td><td>${esc(s.time)}</td><td class="wrap">${esc(s.reason)}</td><td class="wrap">${esc(Object.entries(s.fields).slice(0,5).map(([k,v])=>k+'：'+v).join('；'))}</td></tr>`).join('');
    return `<div class="sc-section"><div class="sc-section-h"><h3>版本记录</h3><span class="sc-inline-note">当前申请 V${r.version} · 有效 ${r.effectiveVersion?'V'+r.effectiveVersion:'未生效'}</span></div><div class="sc-table"><table><thead><tr><th>版本</th><th>时间</th><th>原因</th><th>快照摘要</th></tr></thead><tbody>${versions||'<tr><td colspan="4"><div class="sc-empty">当前尚无字段修订版本。</div></td></tr>'}</tbody></table></div></div><div class="sc-section"><div class="sc-section-h"><h3>审批与操作轨迹</h3></div><div class="sc-section-body"><div class="sc-audit">${r.audit.map(a=>`<div class="sc-audit-row"><time>${esc(a.time)}</time><div><b>${esc(a.actor)} · ${esc(a.action)}</b><small>${esc(a.detail)} · ${esc(a.version)}</small></div></div>`).join('')||'<div class="sc-empty">暂无操作轨迹。</div>'}</div></div></div>`;
  }
  function evidenceView(r){return `<div class="sc-section"><div class="sc-section-h"><h3>附件与办理证据</h3>${ui.mode==='handle'&&canAct(r)?btn('+ 添加办理佐证','SealCertWorkspace.addEvidence()','secondary'):''}</div><div class="sc-table"><table><thead><tr><th>序号</th><th>材料名称</th><th>类别</th><th>版本</th><th>时间</th></tr></thead><tbody>${r.files.map((f,i)=>`<tr><td>${i+1}</td><td>${esc(f.name)}</td><td>${esc(f.category||'业务材料')}</td><td>${esc(f.version)}</td><td>${esc(f.time)}</td></tr>`).join('')||'<tr><td colspan="5"><div class="sc-empty">暂无附件。查看模式不能新增附件。</div></td></tr>'}</tbody></table></div></div>`;}
  function relatedView(r){
    const source=`<div><b>业务来源</b><span>${esc(r.source)}</span></div>`;let asset='';
    if(['sealUse','sealOut'].includes(r.key)){const s=store.seals.find(x=>x.id===r.fields.sealId);asset=`<div><b>关联印章</b><span>${s?esc(s.id+' · '+s.name+' · '+s.status):'待选择'}</span></div>`;}
    if(r.key==='sealLife')asset=`<div><b>生命周期对象</b><span>${esc((r.fields.sealId||'—')+' · '+(r.fields.sealName||'—')+' · '+(r.fields.eventType||'—'))}</span></div>`;
    if(r.key==='licenseLoan'){const l=store.licenses.find(x=>x.id===r.fields.licenseId);asset=`<div><b>关联证照</b><span>${l?esc(l.id+' · '+l.name+' · '+l.status):'待选择'}</span></div>`;}
    return `<div class="sc-section"><div class="sc-section-h"><h3>来源与关联结果</h3></div><div class="sc-section-body"><div class="sc-source-card">${source}${asset}<div><b>事项编号</b><span>${esc(r.id)}</span></div><div><b>当前版本</b><span>申请 V${r.version} / 有效 ${r.effectiveVersion?'V'+r.effectiveVersion:'未生效'}</span></div><div><b>状态</b><span>${esc(status(r))}</span></div></div></div></div>`;}
  function detail(){
    const r=findRecord();if(!r)return businessList();const d=def(r.key);const tabs=['业务办理','审批与版本','附件证据','关联结果'];const body=ui.tab==='业务办理'?businessForm(r):ui.tab==='审批与版本'?historyView(r):ui.tab==='附件证据'?evidenceView(r):relatedView(r);
    return `${detailModeTip(r)}<div class="sc-section"><div class="sc-section-body"><div class="sc-detail-head"><div><span class="sc-inline-note">${esc(r.id)} / ${esc(r.code)}</span><h2>${esc(r.title)}</h2><div class="sc-detail-meta">${esc(r.company)} · ${esc(r.department)} · 申请人 ${esc(r.applicant)} · 责任 ${esc(r.owner)} · 期限 ${esc(r.fields.due||'—')}</div></div><div>${pill(status(r))}<small style="display:block;margin-top:8px;color:#74889a">申请 V${r.version} · 有效 ${r.effectiveVersion?'V'+r.effectiveVersion:'未生效'}</small></div></div></div></div>${stepsHtml(r)}<div class="sc-tabs">${tabs.map(t=>`<button class="${ui.tab===t?'active':''}" onclick="SealCertWorkspace.setTab('${t}')">${t}</button>`).join('')}</div>${body}${ui.mode==='handle'&&canAct(r)?`<div class="sc-actions">${r.step>0?btn('退回补充',"SealCertWorkspace.operation('return')") : ''}${btn(d.steps[r.step].name,"SealCertWorkspace.operation('advance')",'primary')}</div>`:'<div class="sc-mode">当前页面为只读查看；只有当前办理岗位通过“查看及办理”进入时，才显示节点动作。</div>'}`;
  }
  function view(){
    const content=`<div class="sc-workspace">${ui.id?`<div>${btn('← 返回印章证照列表','SealCertWorkspace.back()','secondary')}</div>`:''}${hero()}${ui.id?detail():ui.section==='business'?businessList():ui.section==='seals'?sealsLedger():licensesLedger()}</div>`;
    const title=ui.id?processName(findRecord()?.key||ui.process):'印章证照管理';
    return shell(content,title,'用印、外出携章、印章生命周期及证照借还；业务办理结果与资产台账保持一致。');
  }

  const previousAdminPage = adminPage;
  adminPage = function sealCertAwareAdminPage(){return ui.active?view():previousAdminPage();};
  const previousOpenAdminMenu = openAdminMenu;
  openAdminMenu = function sealCertAwareMenu(group,type){if(group==='印章证照')return list(type);reset();return previousOpenAdminMenu(group,type);};
  const previousSelectPrimaryNav = selectPrimaryNav;
  selectPrimaryNav = function sealCertAwarePrimary(page,key){if(key==='admin')reset();return previousSelectPrimaryNav(page,key);};
  const previousOpenObject = typeof openObject==='function'?openObject:null;
  if(previousOpenObject){openObject=function sealCertOpenObject(id){const r=store.records.find(x=>x.id===id);if(r){activate(r.key);return open(id,canAct(r)?'handle':'view');}return previousOpenObject(id);};}

  globalThis.SealCertWorkspace={ui,store,definitions,view,list,setSection,setProcess,open,back,setTab,save,operation,addEvidence,newRecord,search,filter,reset};
  if(typeof DEMO_RELEASE!=='undefined'){
    DEMO_RELEASE.version='V1.7.2-SEAL-CERT-B1-dev';
    DEMO_RELEASE.scope='党政印章证照4条流程深化：查看/办理双模式、用印版本控制、印章外出状态、印章生命周期、证照借还与双台账。';
  }
})();