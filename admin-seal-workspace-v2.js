/* 印章证照 V3：三级菜单展示“已产生表单”的统一业务台账；业务字段进入详情页查看和办理。 */
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
      desc:'这里展示所有已产生的用印申请表单；点击“办理/查看”进入单据后，再查看最终版文件、印章、份数、骑缝章、密级、审批轨迹及归档材料。'
    },
    sealOut: {
      title:'印章外出使用', code:'OA-L3-030102', action:'新建印章外出申请',
      desc:'这里展示所有已产生的印章外出表单；进入单据后查看外出事由、地点、使用人、陪同人、领出、现场使用和归还核验。'
    },
    sealLifecycle: {
      title:'印章刻制、启用、停用及销毁', code:'OA-L3-030103', action:'新建生命周期事项',
      desc:'这里展示所有已产生的印章生命周期表单；进入单据后查看刻制、启用、停用、销毁、保管人、日期及处置凭证。'
    },
    licenseLoan: {
      title:'证照借用及归还', code:'OA-L3-030104', action:'新建证照借还申请',
      desc:'这里展示所有已产生的证照借还表单；进入单据后查看原件/复印件、借出、延期、提前归还、实际归还和核验信息。'
    }
  };

  const filters=['全部表单','申请中','审批中','办理中','已完成'];
  const columns=['编号','流程','事项名称','申请人','申请部门','申请时间','当前节点','状态','操作'];

  // 三条默认案例分别代表正常申请、待补充申请和已完成申请，便于列表演示不同状态。
  function tuneDemoRows(){
    const use = B.store.records.filter(r=>r.key==='sealUse');
    const byVariant = v => use.find(r=>r.variant===v);
    const normal = byVariant('可办理');
    if(normal){
      normal.title='银行资信证明材料用印';
      Object.assign(normal.fields,{'文件类别':'证明材料','文件名称':'银行资信证明材料_V3最终版.pdf','文件版本':'V3','最终版确认':'是','印章编号':'SEAL-001 公司公章','用印份数':'3','骑缝章':'是','密级':'普通'});
      normal.rows[0]['文件名称']=normal.fields['文件名称'];normal.rows[0]['送审版本']='V3';
    }
    const exception = byVariant('异常待补充');
    if(exception){
      exception.title='授权委托书用印';
      Object.assign(exception.fields,{'文件类别':'授权委托书','文件名称':'项目授权委托书_V2.pdf','文件版本':'V2','印章编号':'SEAL-001 公司公章','用印份数':'2','骑缝章':'否','密级':'普通'});
      exception.rows[0]['文件名称']=exception.fields['文件名称'];exception.rows[0]['送审版本']='V2';
    }
    const done = byVariant('已完成案例');
    if(done){
      done.title='政府报送材料用印';
      Object.assign(done.fields,{'文件类别':'对外报送材料','文件名称':'政府报送材料_V1最终版.pdf','文件版本':'V1','最终版确认':'是','印章编号':'SEAL-002 法定代表人章','用印份数':'1','骑缝章':'否','密级':'内部'});
      done.rows[0]['文件名称']=done.fields['文件名称'];done.rows[0]['送审版本']='V1';done.rows[0]['实际用印份数']=1;done.rows[0]['执行结果']='已用印';
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

  function applicationTime(r){
    return r.history?.[0]?.time || B.config.date || '—';
  }

  function rowCells(r){
    const d=B.def(r.key);
    // 已产生表单不存在“未申请”状态：未发起时没有记录；一旦生成记录即从“申请中”开始。
    const status=formStatus(r);
    const actionLabel=B.terminal(r)?'查看':'办理';
    return [
      r.id,
      `${d?.name||configs[r.key].title}<br><small>${esc(r.code)}</small>`,
      esc(r.title),
      esc(r.applicant||'—'),
      esc(r.department||'—'),
      esc(applicationTime(r)),
      esc(currentNode(r)),
      badge(status),
      button(actionLabel,`AdminWorkspace.open('${r.id}')`,actionLabel==='办理'?'primary':'secondary')
    ];
  }

  function table(heads,rows){
    return `<div class="adm-table"><table><thead><tr>${heads.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(cells=>`<tr>${cells.map((cell,i)=>`<td>${i===0?`<button class="table-link" onclick="AdminWorkspace.open('${esc(cell)}')">${esc(cell)}</button>`:cell}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${heads.length}"><div class="empty compact">当前筛选条件下没有表单</div></td></tr>`}</tbody></table></div>`;
  }

  function listPage(key){
    const cfg=configs[key];
    const scope=B.store.records.filter(r=>r.key===key&&B.visible(r));
    const q=W.ui.query.trim();
    const searched=scope.filter(r=>!q||[r.id,r.title,r.applicant,r.department,r.code,B.def(r.key)?.name].join(' ').includes(q));
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
    const toolbar=`<div class="toolbar"><input id="adm-query" value="${esc(W.ui.query)}" placeholder="搜索编号、流程、事项名称、申请人或申请部门" onkeydown="if(event.key==='Enter')AdminWorkspace.query()">${button('查询','AdminWorkspace.query()')}${button('重置','AdminWorkspace.resetQuery()')}<span class="spacer"></span>${button('+ '+cfg.action,'AdminWorkspace.newRecord()','primary')}</div>`;
    const note=`<section class="card adm-card"><div class="card-h"><div><h2>${esc(cfg.title)}</h2><span class="meta">${esc(cfg.desc)}</span></div></div><p class="adm-hint">列表定位为“表单台账”：所有已发起并生成编号的表单都会出现；未发起的事项不会产生列表记录。审批中或办理中的单据显示“办理”，已完成单据显示“查看”。</p></section>`;
    const body=`<div class="adm-workspace"><div class="adm-boundary">${esc(cfg.code)} · ${esc(cfg.title)} · 表单台账</div>${note}<div class="stat-row">${stats}</div>${toolbar}${table(columns,pageRows.map(rowCells))}<div class="pager"><span>共 ${filtered.length} 条 · 第 ${W.ui.page}/${max} 页</span>${button('上一页','AdminWorkspace.page(-1)','secondary',W.ui.page===1)}${button('下一页','AdminWorkspace.page(1)','secondary',W.ui.page===max)}</div></div>`;
    return shell(body,cfg.title,'统一展示已产生的表单、当前流程节点、状态和办理入口；具体业务字段进入表单详情查看。');
  }

  const previousView=W.view;
  W.view=function sealFormLedgerView(){
    const record=W.ui.id?B.get(W.ui.id):null;
    const key=record?.key||W.ui.key;
    if(!sealKeys.has(key)||record)return previousView();
    return listPage(key);
  };

  const previousList=W.list;
  W.list=function sealFormLedgerList(key){
    if(sealKeys.has(key)){
      W.ui.query='';W.ui.page=1;W.ui.filter=filters[0];W.ui.id=null;
    }
    return previousList.apply(this,arguments);
  };

  render();
})();
