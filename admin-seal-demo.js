/* 印章证照深化：统一资产台账、四条流程业务控制、领出/归还/启停状态联动。 */
(() => {
  if (typeof AdminBusiness === 'undefined' || typeof AdminWorkspace === 'undefined') return;

  const B = AdminBusiness;
  const W = AdminWorkspace;
  const sealKeys = new Set(['sealUse','sealOut','sealLifecycle','licenseLoan']);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const firstCode = value => String(value || '').split(/\s+/)[0];

  B.store.sealAssets = B.store.sealAssets || [
    {id:'SEAL-001',name:'公司公章',type:'公司公章',department:'党政综合办',custodian:'何静',status:'在库',lifecycle:'已启用',enabled:'2024-01-12',holder:'',due:'',last:'2026-09-05',timeline:[['2024-01-12','启用','完成启用登记'],['2026-09-05','使用归还','银行材料用印后归库']]},
    {id:'SEAL-002',name:'法定代表人章',type:'法定代表人章',department:'党政综合办',custodian:'何静',status:'在库',lifecycle:'已启用',enabled:'2024-01-12',holder:'',due:'',last:'2026-08-28',timeline:[['2024-01-12','启用','完成启用登记']]},
    {id:'SEAL-003',name:'财务专用章',type:'财务专用章',department:'财务部',custodian:'财务印章保管岗',status:'在库',lifecycle:'已启用',enabled:'2024-01-12',holder:'',due:'',last:'2026-08-30',timeline:[['2024-01-12','启用','完成启用登记']]},
    {id:'SEAL-004',name:'业务专用章',type:'业务专用章',department:'党政综合办',custodian:'何静',status:'待启用',lifecycle:'已刻制',enabled:'—',holder:'',due:'',last:'2026-09-10',timeline:[['2026-09-10','刻制','刻制完成，待启用审批']]}
  ];
  B.store.licenseAssets = B.store.licenseAssets || [
    {id:'LIC-001',name:'营业执照',kind:'原件',department:'党政综合办',custodian:'何静',status:'在库',holder:'',due:'',expires:'长期',last:'2026-09-06'},
    {id:'LIC-002',name:'印刷经营许可证',kind:'原件',department:'党政综合办',custodian:'何静',status:'在库',holder:'',due:'',expires:'2028-12-31',last:'2026-08-21'},
    {id:'LIC-003',name:'排污许可证',kind:'原件',department:'安全环保部',custodian:'环保资料管理员',status:'已借出',holder:'王晓雨',due:'2026-09-18',expires:'2029-06-30',last:'2026-09-12'}
  ];

  const sealAsset = value => B.store.sealAssets.find(item => item.id === firstCode(value));
  const licenseAsset = value => B.store.licenseAssets.find(item => item.id === firstCode(value));

  for (const record of B.store.records.filter(record => sealKeys.has(record.key))) {
    record.department = '党政综合办';
    record.owner = '何静';
    if (record.key === 'sealUse') {
      record.title = record.variant === '已完成案例' ? '对外资信证明材料用印' : record.title;
      if (record.variant === '已完成案例') record.rows.forEach(row => { row['最终版校验']='一致'; row['实际用印份数']=Number(record.fields['用印份数']); row['执行结果']='已用印'; });
      if (record.variant === '异常待补充') record.fields['最终版确认']='否';
    }
    if (record.key === 'sealOut') {
      if (record.variant === '已完成案例') record.rows.forEach(row => { row['领出登记']='已领出'; row['归还结果']='完好归还'; row['核验说明']='印章、印模及保管盒核验完好'; });
      if (record.variant === '异常待补充') record.fields['计划归还时间']=record.fields['计划领出时间'];
    }
    if (record.key === 'sealLifecycle') {
      if (record.variant === '已完成案例') record.rows.forEach(row => row['核验结论']='通过');
      if (record.variant === '异常待补充') record.rows.forEach(row => row['核验结论']='待核验');
    }
    if (record.key === 'licenseLoan') {
      if (record.variant === '已完成案例') record.rows.forEach(row => { row['借出登记']='已借出'; row['归还状态']='已归还'; row['归还核验']='证照原件完整、编号一致，已归库'; });
      if (record.variant === '异常待补充') record.fields['计划归还日期']=record.fields['计划借出日期'];
    }
  }
  B.sync();

  function specialValidate(record) {
    if (!record || !sealKeys.has(record.key)) return '';
    const f = record.fields;
    if (record.key === 'sealUse') {
      const asset = sealAsset(f['印章编号']);
      if (!f['文件名称']?.trim() || !f['文件版本']?.trim()) return '必须绑定最终版文件及明确版本';
      if (f['最终版确认'] !== '是') return '当前文件尚未确认最终版，不能进入用印审批';
      if (!asset || ['已停用','已销毁'].includes(asset.status)) return '所选印章不存在或已停用/销毁';
      if (asset.status !== '在库' && record.step <= 2) return '所选印章当前不在库，不能办理现场用印';
      if (!Number.isFinite(Number(f['用印份数'])) || Number(f['用印份数']) <= 0) return '用印份数必须为正数';
      if (record.step === 2 && record.rows.some(row => row['最终版校验']!=='一致' || row['执行结果']!=='已用印' || Number(row['实际用印份数'])!==Number(f['用印份数']))) return '实际用印前须核验最终版一致，并登记与申请一致的实际用印份数和执行结果';
    }
    if (record.key === 'sealOut') {
      const asset = sealAsset(f['印章编号']);
      if (!f['外出事由']?.trim() || !f['使用地点']?.trim() || !f['使用人']?.trim()) return '请补充外出事由、地点和使用人';
      if (!f['计划领出时间'] || f['计划归还时间'] <= f['计划领出时间']) return '计划归还时间必须晚于计划领出时间';
      if (!asset || ['已停用','已销毁'].includes(asset.status)) return '所选印章不可外出使用';
      if (record.step <= 2 && asset.status !== '在库') return '印章当前不在库，禁止重复领出';
      if (record.step === 2 && record.rows.some(row => row['领出登记']!=='已领出')) return '请先逐项登记印章已领出';
      if (record.step === 3 && record.rows.some(row => row['归还结果']!=='完好归还' || !row['核验说明']?.trim())) return '归还时须完成印章完好核验并填写核验说明';
    }
    if (record.key === 'sealLifecycle') {
      const asset = sealAsset(f['印章编号']);
      if (!f['印章名称']?.trim() || !f['保管人']?.trim() || !f['办理依据']?.trim()) return '请补充印章名称、保管人及办理依据';
      if (['停用','销毁'].includes(f['办理类型']) && !asset) return '停用或销毁必须关联现有印章台账';
      if (asset?.status === '外出使用中') return '印章尚在外出使用中，不能办理启停或销毁';
      if (record.step === 2 && record.rows.some(row => row['核验结论']!=='通过' || !row['凭证编号']?.trim())) return '更新台账前须完成生命周期凭证核验';
    }
    if (record.key === 'licenseLoan') {
      const asset = licenseAsset(f['证照编号']);
      if (!asset || !f['借用事由']?.trim() || !f['借用人']?.trim()) return '请选择有效证照并填写借用事由、借用人';
      if (!f['计划借出日期'] || f['计划归还日期'] < f['计划借出日期']) return '计划归还日期不能早于借出日期';
      if (f['办理类型']==='借用' && f['借用形式']==='原件' && record.step <= 2 && asset.status !== '在库') return '证照原件当前不在库，不能重复借出';
      if (f['办理类型']==='延期' && (!f['延期至'] || f['延期至'] <= (asset.due || f['计划归还日期']))) return '延期日期必须晚于当前计划归还日期';
      if (record.step === 2 && record.rows.some(row => row['借出登记']!=='已借出')) return '请先登记证照已借出';
      if (record.step === 3 && f['办理类型']!=='延期' && record.rows.some(row => row['归还状态']!=='已归还' || !row['归还核验']?.trim())) return '实际归还时须登记归还状态并完成原件核验';
      if (record.step === 3 && f['办理类型']==='延期' && record.rows.some(row => row['归还状态']!=='延期中')) return '延期办理须将归还状态登记为延期中';
    }
    return '';
  }

  const originalValidate = B.validate;
  B.validate = function validateSeal(record) {
    return specialValidate(record) || originalValidate(record);
  };

  function postEffect(record, priorStep) {
    const f = record.fields;
    if (record.key === 'sealUse' && priorStep === 2) {
      const asset = sealAsset(f['印章编号']);
      asset.last = B.config.date;
      asset.timeline.unshift([B.config.date,'非合同用印',record.id+' · '+f['文件名称']+' · '+f['用印份数']+'份']);
      B.evidence(record,'盖章执行登记.txt','文件：'+f['文件名称']+'\n版本：'+f['文件版本']+'\n印章：'+asset.name+'\n实际用印：'+f['用印份数']+'份\n骑缝章：'+f['骑缝章']);
      B.log(record,'登记实际用印','最终版、印章、份数及执行结果一致');
    }
    if (record.key === 'sealOut' && priorStep === 2) {
      const asset = sealAsset(f['印章编号']);
      asset.status='外出使用中';asset.holder=f['使用人'];asset.due=f['计划归还时间'];asset.last=B.config.date;
      asset.timeline.unshift([B.config.date,'外出领用',record.id+' · '+f['使用人']+' · '+f['使用地点']]);
      B.log(record,'印章领出并锁定库存',asset.id+' 状态更新为外出使用中');
    }
    if (record.key === 'sealOut' && priorStep === 3) {
      const asset = sealAsset(f['印章编号']);
      asset.status='在库';asset.holder='';asset.due='';asset.last=B.config.date;
      asset.timeline.unshift([B.config.date,'归还核验',record.id+' · 完好归库']);
      B.log(record,'印章归还入库',asset.id+' 已完成完好核验');
    }
    if (record.key === 'sealLifecycle' && priorStep === 2) {
      const id=firstCode(f['印章编号']);
      let asset=B.store.sealAssets.find(item=>item.id===id);
      if(!asset){asset={id,name:f['印章名称'],type:f['印章类型'],department:f['保管部门'],custodian:f['保管人'],status:'待刻制',lifecycle:'待刻制',enabled:'—',holder:'',due:'',last:B.config.date,timeline:[]};B.store.sealAssets.push(asset);}
      asset.name=f['印章名称'];asset.type=f['印章类型'];asset.department=f['保管部门'];asset.custodian=f['保管人'];asset.last=B.config.date;
      const operation=f['办理类型'];
      if(operation==='刻制'){asset.status='待启用';asset.lifecycle='已刻制';}
      if(operation==='启用'){asset.status='在库';asset.lifecycle='已启用';asset.enabled=f['计划生效日期'];}
      if(operation==='停用'){asset.status='已停用';asset.lifecycle='已停用';}
      if(operation==='销毁'){asset.status='已销毁';asset.lifecycle='已销毁';}
      asset.timeline.unshift([B.config.date,operation,record.id+' · '+record.rows.map(row=>row['凭证编号']).filter(Boolean).join('、')]);
      B.log(record,'更新印章生命周期台账',asset.id+' → '+asset.lifecycle+' / '+asset.status);
    }
    if (record.key === 'licenseLoan' && priorStep === 2 && f['借用形式']==='原件') {
      const asset=licenseAsset(f['证照编号']);asset.status='已借出';asset.holder=f['借用人'];asset.due=f['计划归还日期'];asset.last=B.config.date;
      B.log(record,'证照原件借出',asset.id+' · '+asset.holder+' · 应还 '+asset.due);
    }
    if (record.key === 'licenseLoan' && priorStep === 3 && f['借用形式']==='原件') {
      const asset=licenseAsset(f['证照编号']);
      if(f['办理类型']==='延期'){asset.status='已借出';asset.due=f['延期至'];asset.last=B.config.date;B.log(record,'证照借用延期',asset.id+' 延期至 '+asset.due);}
      else{asset.status='在库';asset.holder='';asset.due='';asset.last=B.config.date;B.log(record,'证照原件归还入库',asset.id+' 已完成完整性核验');}
    }
    B.sync();
  }

  const originalAct = B.act;
  B.act = function actSeal(id, expected, note, action='advance') {
    const record=B.get(id), priorStep=record?.step;
    if (record && sealKeys.has(record.key) && action==='advance') {
      const error=specialValidate(record);if(error)return error;
    }
    const result=originalAct(id, expected, note, action);
    if (!result && record && sealKeys.has(record.key) && action==='advance') postEffect(record, priorStep);
    return result;
  };

  const previousMenu = openAdminMenu;
  openAdminMenu = function openSealMenu(group,type) {
    const aliases={'用印':'sealUse','印章外出':'sealOut','印章全生命周期':'sealLifecycle','证照借还':'licenseLoan'};
    if(group==='印章证照' && aliases[type]){
      W.ui.legacy=false;state.adminTab=group;state.adminQuery=type;state.activeNavProcess='admin:'+group+':'+type;W.list(aliases[type]);return;
    }
    return previousMenu(group,type);
  };

  function assetTable(record) {
    if(record?.key==='licenseLoan'){
      const rows=B.store.licenseAssets.map((item,i)=>`<tr><td>${i+1}</td><td><b>${esc(item.id)}</b><br><small>${esc(item.name)}</small></td><td>${esc(item.department)} / ${esc(item.custodian)}</td><td>${esc(item.expires)}</td><td>${badge(item.status)}</td><td>${esc(item.holder||'—')}</td><td>${esc(item.due||'—')}</td></tr>`).join('');
      return `<section class="card adm-card"><div class="card-h"><div><h2>证照台账</h2><span class="meta">原件位置、借用人和计划归还日期随流程回写</span></div></div><div class="adm-table"><table><thead><tr><th>序号</th><th>证照</th><th>保管部门/人</th><th>有效期</th><th>状态</th><th>当前借用人</th><th>应还日期</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
    }
    const rows=B.store.sealAssets.map((item,i)=>`<tr><td>${i+1}</td><td><b>${esc(item.id)}</b><br><small>${esc(item.name)}</small></td><td>${esc(item.type)}</td><td>${esc(item.department)} / ${esc(item.custodian)}</td><td>${badge(item.status)}</td><td>${esc(item.holder||'—')}</td><td>${esc(item.due||'—')}</td><td>${esc(item.last)}</td></tr>`).join('');
    return `<section class="card adm-card"><div class="card-h"><div><h2>印章台账</h2><span class="meta">每枚实体印章统一记录保管、在库/外出及生命周期状态</span></div></div><div class="adm-table"><table><thead><tr><th>序号</th><th>印章</th><th>类型</th><th>保管部门/人</th><th>状态</th><th>当前使用人</th><th>应还时间</th><th>最近变更</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }

  function controlPanel(record){
    if(!record)return '';
    const f=record.fields;
    if(record.key==='sealUse'){
      const asset=sealAsset(f['印章编号']);
      return `<section class="card adm-card"><div class="card-h"><h2>用印控制</h2><span class="meta">非合同类文件</span></div><div class="info-grid">${info('最终版文件',f['文件名称'])}${info('送审版本',f['文件版本'])}${info('最终版校验',f['最终版确认'])}${info('印章状态',asset?.status||'未匹配')}${info('用印份数',f['用印份数']+'份')}${info('骑缝章',f['骑缝章'])}${info('密级',f['密级'])}${info('归档要求','盖章结果及扫描件同编号归档')}</div></section>`;
    }
    if(record.key==='sealOut'){
      const asset=sealAsset(f['印章编号']);
      return `<section class="card adm-card"><div class="card-h"><h2>外出领用与归还控制</h2></div><div class="info-grid">${info('印章',asset?.name||f['印章编号'])}${info('当前库存状态',asset?.status||'未匹配')}${info('使用人',f['使用人'])}${info('使用地点',f['使用地点'])}${info('计划领出',f['计划领出时间'])}${info('计划归还',f['计划归还时间'])}${info('当前持有人',asset?.holder||'—')}${info('归还核验','印章、印模、保管盒及现场使用记录')}</div></section>`;
    }
    if(record.key==='sealLifecycle'){
      const asset=sealAsset(f['印章编号']);
      const timeline=(asset?.timeline||[]).map(row=>`<div class="audit-row"><time>${esc(row[0])}</time><div><b>${esc(row[1])}</b><small>${esc(row[2])}</small></div></div>`).join('');
      return `<section class="card adm-card"><div class="card-h"><h2>印章生命周期</h2><span class="meta">刻制 → 启用 → 停用 → 销毁</span></div><div class="info-grid">${info('印章编号',asset?.id||firstCode(f['印章编号']))}${info('当前状态',asset?.status||'待建立')}${info('生命周期',asset?.lifecycle||'待建立')}${info('保管人',asset?.custodian||f['保管人'])}</div><div class="audit-list">${timeline||'<div class="empty compact">尚无生命周期记录</div>'}</div></section>`;
    }
    if(record.key==='licenseLoan'){
      const asset=licenseAsset(f['证照编号']);
      return `<section class="card adm-card"><div class="card-h"><h2>证照借还控制</h2></div><div class="info-grid">${info('证照',asset?.name||f['证照编号'])}${info('借用形式',f['借用形式'])}${info('当前状态',asset?.status||'未匹配')}${info('当前借用人',asset?.holder||'—')}${info('当前应还',asset?.due||'—')}${info('计划归还',f['计划归还日期'])}${info('延期至',f['延期至'])}${info('归还核验','原件编号、完整性及归库位置')}</div></section>`;
    }
    return '';
  }

  const detailLabels={sealUse:'用印文件与执行明细',sealOut:'外出使用与归还核验明细',sealLifecycle:'生命周期凭证与核验明细',licenseLoan:'证照借出、延期与归还明细'};
  const originalView=W.view;
  W.view=function sealEnhancedView(){
    let html=originalView();
    const record=W.ui.id?B.get(W.ui.id):null;
    const key=record?.key||W.ui.key;
    if(!sealKeys.has(key))return html;
    html=html.replace('第一批：公文及会议督办13条。其余16条保持原基线，待第一批页面验收后深化。','印章证照深化版：030101—030104 已接入统一印章/证照台账，演示最终版核验、领出、使用、归还、启停和销毁闭环。');
    if(record){
      html=html.replace('<h3></h3>',`<h3>${detailLabels[key]}</h3>`);
      html=html.replace('<div class="tabs">',controlPanel(record)+'<div class="tabs">');
    }else{
      html=html.replace('<div class="toolbar">',assetTable({key})+'<div class="toolbar">');
    }
    return html;
  };

  render();
})();
