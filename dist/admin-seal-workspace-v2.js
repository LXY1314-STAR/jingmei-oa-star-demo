/* 印章证照 V2：三级菜单进入独立业务工作区，不再复用党政综合办总工作中心筛选页。 */
(() => {
  if (typeof AdminBusiness === 'undefined' || typeof AdminWorkspace === 'undefined') return;

  const B = AdminBusiness;
  const W = AdminWorkspace;
  const sealKeys = new Set(['sealUse','sealOut','sealLifecycle','licenseLoan']);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const firstCode = value => String(value || '').split(/\s+/)[0];
  const button = (label, action, cls='secondary', disabled=false) => `<button class="${cls}" onclick="${action}" ${disabled?'disabled':''}>${esc(label)}</button>`;

  const configs = {
    sealUse: {
      title:'用印申请', code:'OA-L3-030101', action:'新建用印申请',
      desc:'办理非合同类文件用印，控制最终版文件、印章类型、份数、骑缝章、密级及审批权限；用印后登记实际用印结果并归档。',
      filters:['全部用印申请','待审批','待用印','待归档','已归档'],
      columns:['编号','用印事项','申请部门/人','最终版文件','印章','份数','骑缝章','密级','当前节点','状态','操作']
    },
    sealOut: {
      title:'印章外出使用', code:'OA-L3-030102', action:'新建印章外出申请',
      desc:'登记印章外出事由、地点、使用人和陪同人，完成专项审批、领出登记、现场使用、归还核验和记录归档。',
      filters:['全部外出申请','待审批','待领出','外出使用中','已归档'],
      columns:['编号','外出事项','使用人/陪同人','印章','使用地点','计划领出','计划归还','当前节点','状态','操作']
    },
    sealLifecycle: {
      title:'印章刻制、启用、停用及销毁', code:'OA-L3-030103', action:'新建生命周期事项',
      desc:'以印章唯一编号管理刻制、启用、停用和销毁，记录印章名称、保管人、日期、审批及处置凭证，形成完整生命周期台账。',
      filters:['全部生命周期事项','待审批','待更新台账','已归档'],
      columns:['编号','办理事项','办理类型','印章编号/名称','保管部门/人','计划日期','台账状态','当前节点','状态','操作']
    },
    licenseLoan: {
      title:'证照借用及归还', code:'OA-L3-030104', action:'新建证照借还申请',
      desc:'覆盖证照原件/复印件借用、借出登记、提前归还、延期、实际归还和完整性核验，并实时维护证照当前状态。',
      filters:['全部借还事项','待审批','待借出','待归还/延期','已归档'],
      columns:['编号','借还事项','证照','借用形式','借用人','计划借出','计划归还/延期','当前节点','状态','操作']
    }
  };

  // 让三条默认案例在列表上更像真实演示数据，而不是同一条记录的状态复制。
  function tuneDemoRows(){
    const use = B.store.records.filter(r=>r.key==='sealUse');
    const byVariant = v => use.find(r=>r.variant===v);
    const normal = byVariant('可办理');
    if(normal){normal.title='银行资信证明材料用印';Object.assign(normal.fields,{'文件类别':'证明材料','文件名称':'银行资信证明材料_V3最终版.pdf','文件版本':'V3','最终版确认':'是','印章编号':'SEAL-001 公司公章','用印份数':'3','骑缝章':'是','密级':'普通'});normal.rows[0]['文件名称']=normal.fields['文件名称'];normal.rows[0]['送审版本']='V3';}
    const exception = byVariant('异常待补充');
    if(exception){exception.title='授权委托书用印';Object.assign(exception.fields,{'文件类别':'授权委托书','文件名称':'项目授权委托书_V2.pdf','文件版本':'V2','印章编号':'SEAL-001 公司公章','用印份数':'2','骑缝章':'否','密级':'普通'});exception.rows[0]['文件名称']=exception.fields['文件名称'];exception.rows[0]['送审版本']='V2';}
    const done = byVariant('已完成案例');
    if(done){done.title='政府报送材料用印';Object.assign(done.fields,{'文件类别':'对外报送材料','文件名称':'政府报送材料_V1最终版.pdf','文件版本':'V1','最终版确认':'是','印章编号':'SEAL-002 法定代表人章','用印份数':'1','骑缝章':'否','密级':'内部'});done.rows[0]['文件名称']=done.fields['文件名称'];done.rows[0]['送审版本']='V1';done.rows[0]['实际用印份数']=1;done.rows[0]['执行结果']='已用印';}
  }
  tuneDemoRows();
  B.sync();

  function currentNode(r){
    if (B.terminal(r)) return '已归档';
    return B.def(r.key)?.steps?.[r.step] || '已完成';
  }
  function sealAsset(value){return B.store.sealAssets?.find(item=>item.id===firstCode(value));}
  function licenseAsset(value){return B.store.licenseAssets?.find(item=>item.id===firstCode(value));}

  function matchFilter(key, r, filter){
    if (!filter || filter===configs[key].filters[0]) return true;
    if (filter==='已归档') return B.terminal(r);
    if (key==='sealUse') {
      if(filter==='待审批') return !B.terminal(r) && r.step<2;
      if(filter==='待用印') return !B.terminal(r) && r.step===2;
      if(filter==='待归档') return !B.terminal(r) && r.step===3;
    }
    if (key==='sealOut') {
      if(filter==='待审批') return !B.terminal(r) && r.step<2;
      if(filter==='待领出') return !B.terminal(r) && r.step===2;
      if(filter==='外出使用中') return !B.terminal(r) && r.step===3;
    }
    if (key==='sealLifecycle') {
      if(filter==='待审批') return !B.terminal(r) && r.step<2;
      if(filter==='待更新台账') return !B.terminal(r) && r.step===2;
    }
    if (key==='licenseLoan') {
      if(filter==='待审批') return !B.terminal(r) && r.step<2;
      if(filter==='待借出') return !B.terminal(r) && r.step===2;
      if(filter==='待归还/延期') return !B.terminal(r) && r.step===3;
    }
    return false;
  }

  function rowCells(key,r){
    const action=button(B.canAct(r)?'办理':'查看',`AdminWorkspace.open('${r.id}')`,'link');
    if(key==='sealUse'){
      const f=r.fields;
      return [r.id,r.title,`${r.department} / ${r.applicant}`,f['文件名称'],f['印章编号'],f['用印份数']+'份',f['骑缝章'],f['密级'],currentNode(r),badge(B.status(r)),action];
    }
    if(key==='sealOut'){
      const f=r.fields;
      return [r.id,r.title,`${f['使用人']} / ${f['陪同人']||'—'}`,f['印章编号'],f['使用地点'],String(f['计划领出时间']).replace('T',' '),String(f['计划归还时间']).replace('T',' '),currentNode(r),badge(B.status(r)),action];
    }
    if(key==='sealLifecycle'){
      const f=r.fields,asset=sealAsset(f['印章编号']);
      return [r.id,r.title,f['办理类型'],`${firstCode(f['印章编号'])} / ${f['印章名称']}`,`${f['保管部门']} / ${f['保管人']}`,f['计划生效日期'],badge(asset?.status||'待建立'),currentNode(r),badge(B.status(r)),action];
    }
    const f=r.fields,asset=licenseAsset(f['证照编号']);
    return [r.id,r.title,f['证照编号'],f['借用形式'],f['借用人'],f['计划借出日期'],f['办理类型']==='延期'?f['延期至']:f['计划归还日期'],currentNode(r),badge(B.status(r)),action];
  }

  function table(heads,rows){
    return `<div class="adm-table"><table><thead><tr>${heads.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map(cells=>`<tr>${cells.map((cell,i)=>`<td>${i===0?`<button class="table-link" onclick="AdminWorkspace.open('${esc(cell)}')">${esc(cell)}</button>`:cell}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${heads.length}"><div class="empty compact">当前筛选条件下没有记录</div></td></tr>`}</tbody></table></div>`;
  }

  function assetSummary(key){
    if(key==='licenseLoan'){
      const assets=B.store.licenseAssets||[];
      return `<section class="card adm-card"><div class="card-h"><div><h2>证照当前状态</h2><span class="meta">原件借出、应还日期和归还结果由 030104 流程联动</span></div></div><div class="profile-metrics">${assets.map(item=>`<button><b>${esc(item.id)}</b><span>${esc(item.name)} · ${esc(item.status)}${item.holder?' · '+esc(item.holder):''}</span></button>`).join('')}</div></section>`;
    }
    const assets=B.store.sealAssets||[];
    return `<section class="card adm-card"><div class="card-h"><div><h2>印章当前状态</h2><span class="meta">在库、外出、启停和销毁状态由 030101—030103 共用台账控制</span></div></div><div class="profile-metrics">${assets.map(item=>`<button><b>${esc(item.id)}</b><span>${esc(item.name)} · ${esc(item.status)}</span></button>`).join('')}</div></section>`;
  }

  function listPage(key){
    const cfg=configs[key];
    const scope=B.store.records.filter(r=>r.key===key && B.visible(r));
    const q=W.ui.query.trim();
    const searched=scope.filter(r=>!q||[r.id,r.title,r.department,r.owner,...Object.values(r.fields||{})].join(' ').includes(q));
    const selectedFilter=cfg.filters.includes(W.ui.filter)?W.ui.filter:cfg.filters[0];
    if(W.ui.filter!==selectedFilter)W.ui.filter=selectedFilter;
    const filtered=searched.filter(r=>matchFilter(key,r,selectedFilter));
    const max=Math.max(1,Math.ceil(filtered.length/W.ui.size));
    W.ui.page=Math.min(Math.max(1,W.ui.page),max);
    const start=(W.ui.page-1)*W.ui.size;
    const pageRows=filtered.slice(start,start+W.ui.size);
    const stats=cfg.filters.slice(0,4).map((label,i)=>{
      const n=searched.filter(r=>matchFilter(key,r,label)).length;
      return `<button class="stat ${selectedFilter===label?'active':''}" onclick="AdminWorkspace.filter('${label}')"><b>${n}</b><span>${esc(label)}</span></button>`;
    }).join('');
    const toolbar=`<div class="toolbar"><input id="adm-query" value="${esc(W.ui.query)}" placeholder="搜索编号、事项、申请人或业务字段" onkeydown="if(event.key==='Enter')AdminWorkspace.query()">${button('查询','AdminWorkspace.query()')}${button('重置','AdminWorkspace.resetQuery()')}<span class="spacer"></span>${button('+ '+cfg.action,'AdminWorkspace.newRecord()','primary')}</div>`;
    const body=`<div class="adm-workspace"><div class="adm-boundary">${esc(cfg.code)} · 五粮液精美印务 · 当前页面仅展示${esc(cfg.title)}业务；正式审批权限和制度参数待客户确认。</div><section class="card adm-card"><div class="card-h"><div><h2>${esc(cfg.title)}</h2><span class="meta">${esc(cfg.desc)}</span></div></div></section><div class="stat-row">${stats}</div>${toolbar}${table(cfg.columns,pageRows.map(r=>rowCells(key,r)))}<div class="pager"><span>共 ${filtered.length} 条 · 第 ${W.ui.page}/${max} 页</span>${button('上一页','AdminWorkspace.page(-1)','secondary',W.ui.page===1)}${button('下一页','AdminWorkspace.page(1)','secondary',W.ui.page===max)}</div>${assetSummary(key)}</div>`;
    return shell(body,cfg.title,cfg.desc);
  }

  const previousView=W.view;
  W.view=function sealBusinessView(){
    const record=W.ui.id?B.get(W.ui.id):null;
    const key=record?.key||W.ui.key;
    if(!sealKeys.has(key)||record)return previousView();
    return listPage(key);
  };

  // 切换四个印章证照菜单时清空上一业务的查询、筛选和页码，保证页面只保留当前业务上下文。
  const previousList=W.list;
  W.list=function sealBusinessList(key){
    if(sealKeys.has(key)){
      W.ui.query='';W.ui.page=1;W.ui.filter=configs[key].filters[0];W.ui.id=null;
    }
    return previousList.apply(this,arguments);
  };

  render();
})();
