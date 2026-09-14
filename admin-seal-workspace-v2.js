/* 印章证照 V4：三级菜单展示已产生表单台账；列表只保留流程级字段，详情页区分查看与办理。 */
(() => {
  if (typeof AdminBusiness === 'undefined' || typeof AdminWorkspace === 'undefined') return;

  const B = AdminBusiness;
  const W = AdminWorkspace;
  const sealKeys = new Set(['sealUse','sealOut','sealLifecycle','licenseLoan']);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button = (label, action, cls='secondary', disabled=false) => `<button class="${cls}" onclick="${action}" ${disabled?'disabled':''}>${esc(label)}</button>`;

  const configs = {
    sealUse: {
      title:'用印申请', code:'OA-L3-030101', action:'新建用印申请',
      desc:'这里展示所有已产生的用印申请表单；点击“查看”进入只读详情，点击“办理”进入当前节点办理。具体用印字段、审批版本、附件证据和关联结果均在单据详情中查看。'
    },
    sealOut: {
      title:'印章外出使用', code:'OA-L3-030102', action:'新建印章外出申请',
      desc:'这里展示所有已产生的印章外出表单；点击“查看”进入只读详情，点击“办理”进入当前节点办理。外出事由、地点、领出、使用和归还核验在单据详情中查看。'
    },
    sealLifecycle: {
      title:'印章刻制、启用、停用及销毁', code:'OA-L3-030103', action:'新建生命周期事项',
      desc:'这里展示所有已产生的印章生命周期表单；点击“查看”进入只读详情，点击“办理”进入当前节点办理。刻制、启停、销毁及处置凭证在单据详情中查看。'
    },
    licenseLoan: {
      title:'证照借用及归还', code:'OA-L3-030104', action:'新建证照借还申请',
      desc:'这里展示所有已产生的证照借还表单；点击“查看”进入只读详情，点击“办理”进入当前节点办理。借出、延期、提前归还和归还核验在单据详情中查看。'
    }
  };

  const filters=['全部表单','申请中','审批中','办理中','已完成'];
  const columns=['编号','流程','事项名称','申请人','当前节点','状态','操作'];

  function tuneDemoRows(){
    const use = B.store.records.filter(r=>r.key==='sealUse');
    const byVariant = v => use.find(r=>r.variant===v);
    const normal = byVariant('可办理');
    if(normal){
      normal.title='银行资信证明材料用印';
      Object.assign(normal.fields,{'文件类别':'证明材料','文件名称':'银行资信证明材料_V3最终版.pdf','文件版本':'V3','最终版确认':'是','印章编号':'SEAL-001 公司公章','用印份数':'3','骑缝章':'是','密级':'普通'});
      normal.rows[0]['文件名称']=normal.fields['文件名称'];
      normal.rows[0]['送审版本']='V3';
    }
    const exception = byVariant('异常待补充');
    if(exception){
      exception.title='授权委托书用印';
      Object.assign(exception.fields,{'文件类别':'授权委托书','文件名称':'项目授权委托书_V2.pdf','文件版本':'V2','印章编号':'SEAL-001 公司公章','用印份数':'2','骑缝章':'否','密级':'普通'});
      exception.rows[0]['文件名称']=exception.fields['文件名称'];
      exception.rows[0]['送审版本']='V2';
    }
    const done = byVariant('已完成案例');
    if(done){
      done.title='政府报送材料用印';
      Object.assign(done.fields,{'文件类别':'对外报送材料','文件名称':'政府报送材料_V1最终版.pdf','文件版本':'V1','最终版确认':'是','印章编号':'SEAL-002 法定代表人章','用印份数':'1','骑缝章':'否','密级':'内部'});
      done.rows[0]['文件名称']=done.fields['文件名称'];
      done.rows[0]['送审版本']='V1';
      done.rows[0]['实际用印份数']=1;
      done.rows[0]['执行结果']='已用印';
    }
  }
  tuneDemoRows();
  B.sync();

  function currentNode(r){
    if(B.terminal(r))return '已完成';
    return B.def(r.key)?.steps?.[r.step] || '办理完成';
  }

  function formStatus(r){
    if(r.cancelled)return '已作废';
    if(r.closed)return '已完成';
    if(r.returned)return '已退回';
    if(r.step===0)return '申请中';
    if(r.step===1)return '审批中';
    return '办理中';
  }

  function matchFilter(r,filter){
    if(!filter||filter==='全部表单')return true;
    if(filter==='申请中')return !B.terminal(r)&&!r.returned&&r.step===0;
    if(filter==='审批中')return !B.terminal(r)&&!r.returned&&r.step===1;
    if(filter==='办理中')return !B.terminal(r)&&!r.returned&&r.step>=2;
    if(filter==='已完成')return r.closed;
    return false;
  }

  function rowCells(r){
    const d=B.def(r.key);
    const status=formStatus(r);
    const viewAction=button('查看',`AdminWorkspace.viewSealRecord('${r.id}')`,'secondary');
    const handleAction=B.terminal(r)?'':button('办理',`AdminWorkspace.handleSealRecord('${r.id}')`,'primary',!B.canAct(r));
    return [
      `<b>${esc(r.id)}</b>`,
      `${esc(d?.name||configs[r.key].title)}<br><small>${esc(r.code)}</small>`,
      esc(r.title),
      esc(r.applicant||'—'),
      esc(currentNode(r)),
      badge(status),
      `<div class="adm-tools">${viewAction}${handleAction}</div>`
    ];
  }

  function table(heads,rows){
    return `<div class="adm-table"><table><thead><tr>${heads.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(cells=>`<tr>${cells.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${heads.length}"><div class="empty compact">当前筛选条件下没有表单</div></td></tr>`}</tbody></table></div>`;
  }

  function listPage(key){
    const cfg=configs[key];
    const scope=B.store.records.filter(r=>r.key===key&&B.visible(r));
    const q=W.ui.query.trim();
    const searched=scope.filter(r=>!q||[r.id,r.title,r.applicant,r.code,B.def(r.key)?.name].join(' ').includes(q));
    const selectedFilter=filters.includes(W.ui.filter)?W.ui.filter:filters[0];
    if(W.ui.filter!==selectedFilter)W.ui.filter=selectedFilter;
    const filtered=searched.filter(r=>matchFilter(r,selectedFilter));
    const max=Math.max(1,Math.ceil(filtered.length/W.ui.size));
    W.ui.page=Math.min(Math.max(1,W.ui.page),max);
    const start=(W.ui.page-1)*W.ui.size;
    const pageRows=filtered.slice(start,start+W.ui.size);
    const stats=filters.map(label=>{
      const n=searched.filter(r=>matchFilter(r,label)).length;
      return `<button class="stat ${selectedFilter===label?'active':''}" onclick="AdminWorkspace.filter('${label}')"><b>${n}</b><span>${esc(label)}</span></button>`;
    }).join('');
    const toolbar=`<div class="toolbar"><input id="adm-query" value="${esc(W.ui.query)}" placeholder="搜索编号、流程、事项名称或申请人" onkeydown="if(event.key==='Enter')AdminWorkspace.query()">${button('查询','AdminWorkspace.query()')}${button('重置','AdminWorkspace.resetQuery()')}<span class="spacer"></span>${button('+ '+cfg.action,'AdminWorkspace.newRecord()','primary')}</div>`;
    const note=`<section class="card adm-card"><div class="card-h"><div><h2>${esc(cfg.title)}</h2><span class="meta">${esc(cfg.desc)}</span></div></div><p class="adm-hint">列表只展示表单级信息：编号、流程、事项、申请人、当前节点和状态。审批中或办理中的单据同时提供“查看”和“办理”；“办理”仅当前处理身份可用。进入详情后统一查看业务办理、审批与版本、附件证据、关联结果。</p></section>`;
    const body=`<div class="adm-workspace"><div class="adm-boundary">${esc(cfg.code)} · ${esc(cfg.title)} · 表单台账</div>${note}<div class="stat-row">${stats}</div>${toolbar}${table(columns,pageRows.map(rowCells))}<div class="pager"><span>共 ${filtered.length} 条 · 第 ${W.ui.page}/${max} 页</span>${button('上一页','AdminWorkspace.page(-1)','secondary',W.ui.page===1)}${button('下一页','AdminWorkspace.page(1)','secondary',W.ui.page===max)}</div></div>`;
    return shell(body,cfg.title,'统一展示已产生的表单、当前流程节点、状态和查看/办理入口；具体业务字段进入表单详情查看。');
  }

  W.viewSealRecord=function viewSealRecord(id){
    W.ui.sealOpenMode='view';
    W.open(id);
  };

  W.handleSealRecord=function handleSealRecord(id){
    const record=B.get(id);
    if(!record||B.terminal(record)||!B.canAct(record))return;
    W.ui.sealOpenMode='handle';
    W.open(id);
  };

  const previousView=W.view;
  W.view=function sealFormLedgerView(){
    const record=W.ui.id?B.get(W.ui.id):null;
    const key=record?.key||W.ui.key;
    if(!sealKeys.has(key))return previousView();
    if(!record)return listPage(key);
    if(W.ui.sealOpenMode!=='view')return previousView();

    const originalCanAct=B.canAct;
    const originalCanEdit=B.canEdit;
    B.canAct=function sealReadonlyCanAct(target){return target?.id===record.id?false:originalCanAct(target);};
    B.canEdit=function sealReadonlyCanEdit(target){return target?.id===record.id?false:originalCanEdit(target);};
    try{
      return previousView();
    }finally{
      B.canAct=originalCanAct;
      B.canEdit=originalCanEdit;
    }
  };

  const previousList=W.list;
  W.list=function sealFormLedgerList(key){
    if(sealKeys.has(key)){
      W.ui.query='';
      W.ui.page=1;
      W.ui.filter=filters[0];
      W.ui.id=null;
      W.ui.sealOpenMode='view';
    }
    return previousList.apply(this,arguments);
  };

  render();
})();
