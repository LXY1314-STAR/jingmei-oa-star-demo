/* Business work surfaces. All records, imports and due checks stay in this demo session. */
const HrBusiness = (() => {
  let H, dialog=null, seq=1;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button=(s,a,disabled=false,cls='secondary')=>`<button class="${cls}" onclick="HrBusiness.${a}" ${disabled?'disabled':''}>${esc(s)}</button>`;
  const table=(heads,rows)=>`<div class="hw-table"><table><thead><tr>${['序号',...heads].map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr><td>${i+1}</td>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${heads.length+1}"><div class="empty compact">尚无明细</div></td></tr>`}</tbody></table></div>`;
  const panel=(title,body,actions='')=>`<section class="card hw-panel hb-business"><div class="card-h"><h2>${esc(title)}</h2><div class="hw-tools">${actions}</div></div><div class="hw-body">${body}</div></section>`;
  const pairs=o=>`<div class="hw-info">${Object.entries(o).map(([k,v])=>`<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}</div>`;
  const employee=id=>db.employees.find(e=>e.id===id);
  const spec=(title,action,columns,rows)=>({title,action,columns:columns.split('|'),rows});
  const specs={
    '01':spec('岗位编制与招聘执行','核验招聘编制','岗位|年度计划|核定编制|在岗人数|需求人数|核验结论',[['质量检验员','2026年度招聘计划',12,10,1,'待核验']]),
    '02':spec('候选人资格与录用条件','核验录用条件','核验项目|要求|候选人资料|核验结论',[['岗位资格','质量检验能力','面试及操作评价','待核验'],['入职条件','证明材料齐全','体检与学历证明（模拟）','待核验']]),
    '03':spec('入职资料与条件任务','核验入职资料','资料类别|适用条件|办理责任|核验结论',[['身份与任职资料','全体员工','人事','待核验'],['住宿需求','生产员工','综合办','待核验'],['物资领用','全体员工','综合办','待核验']]),
    '04':spec('试用期考核与后续安排','登记转正评价','评价维度|员工总结|部门评价|结论',[['工作完成','完成试用期任务','岗位表现符合要求','待核验'],['岗位能力','培训与实操合格','具备岗位能力','待核验']]),
    '05':spec('逐人岗位异动与资格核验','核验目标岗位','员工编号|原部门|目标部门|目标岗位|资格结论',[['EMP-2026-018','经营发展部','经营发展部','经营分析专员','待核验']]),
    '06':spec('合同版本与签署办理','核验签署材料','合同编号|办理类型|签署渠道|文件版本|核验结论',[['LD-2026-018','签订','线下签署','签署版V1','待核验']]),
    '07':spec('工作与资产交接清单','登记交接结果','交接事项|接收岗位|数量|证据说明|核验结论',[['工作资料','部门负责人',1,'工作交接清单','待核验'],['电脑及卡证','综合办',2,'资产清点清单','待核验']]),
    '08':spec('解除依据与通知送达','核验送达依据','材料类别|依据编号|送达渠道|证据说明|核验结论',[['终止依据','REL-2026-018','当面签收','届满依据（模拟）','待核验'],['通知送达','NOTICE-2026-018','当面签收','员工签收凭据（模拟）','待核验']]),
    '09':spec('调查、调解与仲裁记录','登记调查反馈','办理轮次|事项|责任岗位|意见或证据|结论',[[1,'调查','人事','核对原始材料','待核验']]),
    '10':spec('离岗证明与后续安排','核验休养证明','证明类别|开始日期|结束日期|后续安排|核验结论',[['离岗证明（模拟）','2026-10-01','2026-10-15','复岗','待核验']]),
    '11':spec('员工档案字段变更','核验字段变更','字段|修改前|修改后|材料依据|核验结论',[['location','生产园区','生产园区A区','员工提交的地址更新说明','待核验']]),
    '12':spec('请假时段与额度核算','核验请假时段','假别|开始日期|结束日期|核定天数|核验结论',[['年休假','2026-10-08','2026-10-08',1,'待核验']]),
    '13':spec('原请假与变更差额','核验变更差额','原单编号|原天数|变更天数|差额说明|核验结论',[['HR-LEAVE-BASE',2,1,'返还1天','待核验']]),
    '14':spec('逐人加班时长核定','核定加班时长','员工编号|申请小时|核定小时|加班类别|核验结论',[['EMP-2026-018',4,4,'平时','待核验']]),
    '15':spec('调休来源批次核销','核验补休来源','来源批次|类别|可用小时|本次小时|核验结论',[['COMP-BASE-018','平时',8,4,'待核验']]),
    '16':spec('出差外出行程','核验外勤行程','事项类型|日期|地点|工作事项|核验结论',[['出差','2026-10-13','成都供应商现场','现场质量核验','待核验']]),
    '17':spec('班组排班与调换班明细','核验班次冲突','员工编号|日期|原班次|目标班次|核验结论',[['EMP-2026-018','2026-10-14','早班','早班','待核验']]),
    '18':spec('考勤异常逐条核对','核对异常明细','员工编号|日期|原始异常|更正结果|核验结论',[['EMP-2026-018','2026-09-06','缺卡','正常','待核验']]),
    '19':spec('月度考勤行级确认','登记月度核对','员工编号|日期|排班与打卡|日结果|核验结论',[['EMP-2026-018','2026-09-06','行政班 / 缺卡','待补卡','待核验']]),
    '20':spec('年度汇总与输出条件','核验输出范围','员工编号|年度|公司|组织|核验结论',[['EMP-2026-018',2026,'五粮液精美印务','经营发展部','待核验']]),
    '21':spec('考核指标与目标','调整考核指标','指标|目标值|单位|权重',[]),
    '22':spec('逐指标评分与校准','登记评分校准','指标|权重|原评分|校准分|评分依据|校准原因',[['经营分析及时率',70,86,88,'经营分析成果（模拟）','补充已核实成果'],['问题闭环率',30,86,88,'问题闭环记录（模拟）','补充已核实成果']]),
    '23':spec('奖惩依据与档案预览','核验奖惩依据','事项|依据|来源|生效日期|核验结论',[['表彰','安全生产表彰决定（模拟）','本流程审批','2026-10-01','待核验']]),
    '24':spec('工资项目与定向发布','核验工资项目','员工编号|基本工资|加班工资|扣减|实发金额',[['EMP-2026-018',7500,500,0,8000]]),
    '25':spec('工资修订项目对比','核验修订差异','项目|原金额|修订金额|处理依据|核验结论',[['加班工资',500,600,'核对加班确认记录','待核验']]),
    '26':spec('分险种增减员与缴费','核验参保明细','员工编号|险种|事项|期间|基数或金额|核验结论',[['EMP-2026-018','社保','增员','2026-09',2000,'待核验']]),
    '27':spec('理赔材料补充与费用','核验待遇材料','材料类别|费用|材料版本|补充说明|核验结论',[['费用凭证（模拟）',1000,'V1','已提供申请证明','待核验'],['待遇证明（模拟）',0,'V1','已提供资格依据','待核验']]),
    '28':spec('年度培训项目与学习任务','登记学习进度','员工编号|年度计划|课程|学习进度|核验结论',[['EMP-2026-018','2026年度培训计划','岗位安全与质量基础',0,'待核验']]),
    '29':spec('考试记录与成绩确认','核验考试成绩','员工编号|考试名称|考试方式|成绩|核验结论',[['EMP-2026-018','岗位安全与质量考试','线下考试',88,'待核验']]),
    '30':spec('证照原件与借还记录','核验证照资料','证照名称|类别|到期日期|原件状态|核验结论',[['岗位安全资格证','证书','2027-09-30','在库','待核验']]),
    '31':spec('岗位标准与准入核验','核验岗位准入','目标岗位|所需证照|关联考试|有效期|核验结论',[['经营分析专员','经营分析岗位资格','HR-EXAM-001','2027-09-30','待核验']])
  };
  const store={date:'2026-09-07',pendingChanges:[],dueTasks:[],imports:[],loans:[],snapshots:[],compLots:[],calendar:{dayHours:8,workStart:'08:30',workEnd:'17:30',breakStart:'12:30',breakEnd:'13:30'},positions:[{name:'经营分析专员',certificate:'经营分析岗位资格'},{name:'质量检验员',certificate:'岗位安全资格证'}]};
  function ensure(r){if(r.business)return r.business;const s=specs[r.key];r.business={rows:copy(s.rows),events:[],links:[],due:r.f.到岗日期||r.f.生效日期||r.f.实施日期||'2026-10-15'};const b=r.business;
    for(const row of b.rows){s.columns.forEach((k,i)=>{if(k==='员工编号')row[i]=r.employeeId;if(r.f[k]!==undefined&&k!=='核验结论')row[i]=r.f[k];});}
    if(r.key==='21')b.rows=r.items.map(x=>[x.指标,x.目标值,x.单位,x.权重]);
    if(r.key==='24')b.rows=r.items.map(x=>[x.员工编号,Number(x.金额)-500,500,0,Number(x.金额)]);
    if(r.key==='11'){b.rows[0]=[r.f.变更字段,employee(r.employeeId)?.[r.f.变更字段]||'未填写',r.f.变更后值,r.f.变更原因,'待核验'];}
    if(r.key==='05')b.rows=H.people(r).map(id=>[id,employee(id)?.org,r.f.目标部门,r.f.目标岗位,'待核验']);
    if(r.key==='14')b.rows=H.people(r).map(id=>[id,Number(r.f.小时数),Number(r.f.小时数),r.f.加班类别,'待核验']);
    if(r.key==='28')b.rows=H.people(r).map(id=>[id,r.f.年度计划,r.f.课程,0,'待核验']);
    if(r.key==='17')b.rows=H.people(r).map(id=>[id,r.f.开始日期,r.f.原班次,r.f.目标班次,'待核验']);
    return b;
  }
  function editable(r){return H.visible(r)&&!H.done(r)&&(H.canEdit(r)||H.canAct(r));}
  function event(r,action,detail){ensure(r).events.unshift({action,detail,role:state.role,date:store.date,version:r.version});H.log(r,action,typeof detail==='string'?detail:format(detail));}
  function format(o){if(o==null)return '—';if(Array.isArray(o))return o.map(format).join('；');if(typeof o==='object')return Object.entries(o).map(([k,v])=>k+'：'+format(v)).join('；');return String(o);}
  function link(id){const r=H.get(id);return r&&H.visible(r)?button(id,`open('${id}')`,false,'link'):esc(id||'尚未关联');}
  function open(id){H.open(id);}
  function actionLabel(r){if(r.stage<0)return '提交'+H.def(r.key).short;if(r.appealSteps)return ['受理绩效申诉','登记复核结论','作出仲裁结论','发送最终反馈','确认收悉最终结果'][r.stage];return H.current(r)?.name||'已归档';}
  function diff(old,current){const keys=[...new Set([...Object.keys(old||{}),...Object.keys(current||{})])];return table(['字段 / 明细','调整前','调整后'],keys.filter(k=>JSON.stringify(old?.[k])!==JSON.stringify(current?.[k])).map(k=>[esc(k),esc(format(old?.[k])),esc(format(current?.[k]))]));}
  function versions(r){return panel('字段与明细版本对比',r.history.length?r.history.map(h=>`<h3>V${h.version} → V${r.version} · ${esc(h.reason)}</h3>`+diff({...h.f,明细:h.business?.rows||h.items},{...r.f,明细:ensure(r).rows})).join(''):'<p>当前为首个版本，修订后保留逐项差异。</p>');}
  function view(r){const b=ensure(r),s=specs[r.key],may=editable(r);let html='';if(r.caseType==='异常')html+='<div class="hb-inline-error">此案例缺少办理依据，提交时将拦截。请到附件证据页补充材料后继续。</div>';if(r.historical)html+='<div class="hw-boundary">历史演示资料：查看完整业务明细与结论，不代表本次会话已经执行这些操作。</div>';
    if(r.key==='21')html+=panel('计划生效与修订',pairs({考核周期:r.f.周期,适用员工:employee(r.employeeId)?.name,当前有效版本:r.effective?'V'+r.effective.version:H.done(r)?'V'+r.version:'尚未生效',当前申请:'V'+r.version+' · '+H.status(r),调整原因:r.reason||'首次制定'}));
    if(r.key==='22')html+=panel('评分来源与发布状态',pairs({考核周期:r.f.周期,绑定计划版本:r.checks.planVersion?'V'+r.checks.planVersion:'提交时锁定',评分来源:r.f.来源批次,结果发布:r.checks.published?'已发布':'未发布',员工确认:r.checks.finalPublished?'最终反馈已发送':H.done(r)?'已收悉':'待确认',加权结果:score(r)+' / 等级 '+r.f.结果等级}),link(r.f.计划编号));
    if(r.key==='05')html+=panel(r.f.异动类型==='部门内调动'?'部门内岗位调整':'组织与人员调配',pairs({异动类型:r.f.异动类型,生效日期:r.f.生效日期,目标部门:r.f.目标部门,目标岗位:r.f.目标岗位}));
    if(['12','13','14','15','16'].includes(r.key))html+=panel('时段与计算口径',pairs({开始:r.f.开始日期+' '+(r.f.开始时刻||'08:30'),结束:r.f.结束日期+' '+(r.f.结束时刻||'17:30'),计算小时:hours(r),日历:'演示：工作日8小时，午休1小时；加班按实际时段',余额控制:'占用 → 释放 / 扣减 → 差额核对'}));
    if(r.key==='17')html+=calendarView(r);
    if(['18','19','20'].includes(r.key))html+=attendanceView(r);
    const editingBlocked=['21','24'].includes(r.key)&&r.stage>=0||r.key==='22'&&r.stage>=0&&!(r.stage===1&&!r.appealSteps);
    html+=panel(s.title,table([...s.columns,'操作'],b.rows.map((row,i)=>[...row.map(esc),button(s.action,`editRow(${i})`,!may||editingBlocked,'link')+button('删除',`removeRow(${i})`,!may||r.stage>=0,'link')])),button('新增明细',`editRow(-1)`,!may||editingBlocked));
    if(['22','24','18','29'].includes(r.key))html+=panel('文件导入与校验',`<p>下载演示 CSV 模板，上传后先核验每一行，再确认写入当前会话。</p><div class="hw-tools">${button('下载CSV模板','template()')}<label class="secondary hb-file">选择CSV文件<input aria-label="选择CSV文件" type="file" accept=".csv,text/csv" ${!may||r.stage>=0?'disabled':''} onchange="HrBusiness.importFile(this.files[0])"></label></div>`+table(['批次','有效行 / 错误行','状态'],store.imports.filter(x=>x.source===r.id).map(x=>[esc(x.id),x.rows.length+' / '+x.errors.length,esc(x.status)])));
    if(r.key==='22')html+=appealView(r)+panel('同周期发布记录',table(['结果单','员工','状态'],H.store.records.filter(x=>x.key==='22'&&x.f.周期===r.f.周期&&H.visible(x)).map(x=>[link(x.id),esc(employee(x.employeeId)?.name),esc(H.status(x))])),button('发布已复核绩效结果',"batchPublishDialog('22')",state.role!=='hr'));
    if(r.key==='23')html+=panel('档案回写预览',pairs({员工:employee(r.employeeId)?.name,事项:r.f.奖惩类型,依据:r.f.依据,来源:r.f.审批来源,生效日期:r.f.生效日期,档案版本:'V'+r.version}),button('选择有效审批来源','sourceDialog()',!may));
    if(['02','05','06','09','10','13','17','25','29','30','31'].includes(r.key))html+=sourceView(r);
    if(r.key==='25'){const src=H.get(r.f.原单编号);html+=panel('工资条修订前后',pairs({原工资条:src?.id,原实发:src?.items[0]?.金额,修订实发:r.f.修订金额,原版本:src?.version,再次确认:r.checks.republished?'已重发，等待再次确认':'修订尚未发布'}),src?link(src.id):'');}
    if(r.key==='29')html+=examView(r);
    if(r.key==='28')html+=learningView(r);
    if(r.key==='24')html+=payBatchView(r)+(r.checks.revisionSource?panel('修订再次确认',pairs({修订单:r.checks.revisionSource,状态:r.checks.confirmed?'已再次确认':'等待员工再次确认'}),link(r.checks.revisionSource)):'');
    if(['01','02'].includes(r.key))html+=recruitView(r);
    if(['03','04','05','06','07','08','10','11'].includes(r.key))html+=lifecycleView(r);
    if(r.key==='30')html+=panel('原件借阅与归还',table(['借阅单','证照','借出 / 应还日期','状态'],store.loans.filter(x=>x.employeeId===r.employeeId).map(x=>[link(x.source),esc(x.name),x.start+' / '+x.due,esc(x.returned?'已归还':'借出中')])));
    if(r.key==='31')html+=panel('岗位资格匹配',table(['目标岗位','所需证照','实际证照','校验结果'],store.positions.map(p=>{const q=employee(r.employeeId)?.qualifications.find(q=>q.name===p.certificate&&q.status==='有效'&&q.expires>=store.date);return [esc(p.name),esc(p.certificate),esc(q?.name||'缺少有效证照'),q?'符合':'不符合'];})));
    html+=panel('本事项业务处理记录',table(['动作','处理日期 / 身份','业务结果'],b.events.map(x=>[esc(x.action),esc(x.date+' / '+(roles[x.role]?.label||x.role)),esc(format(x.detail))])));
    return `<div data-hr-business="${r.key}">${html}</div>`;
  }
  function score(r){const rs=ensure(r).rows;return Math.round(rs.reduce((s,x)=>s+Number(x[1])*Number(x[3])/100,0)*100)/100;}
  function error(message){H.fail(message);return false;}
  function field(name,value,type='text'){return `<label class="field"><span>${esc(name)}</span><input name="${esc(name)}" value="${esc(value)}" type="${type}" ${type==='number'?'step="any"':''} required></label>`;}
  function editRow(i){const r=H.get();if(!editable(r)||(['21','24'].includes(r.key)&&r.stage>=0||r.key==='22'&&r.stage>=0&&!(r.stage===1&&!r.appealSteps)))return error('当前节点只读；修改已提交内容须先退回或撤回');const s=specs[r.key],row=i<0?s.columns.map(k=>k==='核验结论'||k==='结论'?'待核验':''):ensure(r).rows[i];dialog={type:'row',id:r.id,index:i,version:r.version,stage:r.stage,role:state.role};
    openModal(s.action,`<form id="hb-form"><div id="hw-error" role="alert"></div><div class="form-grid">${s.columns.map((k,j)=>k==='核验结论'||k==='结论'?`<label class="field"><span>${k}</span><select name="${k}"><option ${row[j]==='待核验'?'selected':''}>待核验</option><option ${row[j]==='通过'?'selected':''}>通过</option><option ${row[j]==='退回补充'?'selected':''}>退回补充</option></select></label>`:field(k,row[j],/人数|编制|小时|天数|金额|工资|费用|扣减|权重|评分|校准分|目标值|成绩|学习进度|轮次/.test(k)?'number':/日期|有效期/.test(k)?'date':'text')).join('')}${field('办理依据','')}</div></form>`,button('取消','close()')+button('保存明细','saveRow()',false,'primary'));
  }
  function validDialog(){if(!dialog)return null;const r=H.get(dialog.id);return r&&r.version===dialog.version&&r.stage===dialog.stage&&state.role===dialog.role&&editable(r)?r:null;}
  function saveRow(){const r=validDialog();if(!r)return error('身份、节点或版本已变化，请重新打开');const f=document.querySelector('#hb-form');if(!f.reportValidity())return false;const v=Object.fromEntries(new FormData(f)),s=specs[r.key],row=s.columns.map(k=>v[k]),b=ensure(r);const numeric=s.columns.map((k,i)=>/人数|编制|小时|天数|金额|工资|费用|扣减|权重|评分|校准分|目标值|成绩|学习进度|轮次/.test(k)?i:-1).filter(i=>i>=0);
    if(numeric.some(i=>!Number.isFinite(Number(row[i]))||Number(row[i])<0))return error('数值须为有效非负数');if(s.columns.includes('员工编号')&&!employee(row[s.columns.indexOf('员工编号')]))return error('员工编号不存在');if(['18','26','29'].includes(r.key)&&row[0]!==r.employeeId)return error('当前单据仅允许关联员工的明细，其他员工请另建单据');
    if(r.key==='22'&&[row[2],row[3]].some(v=>Number(v)>100))return error('评分须为0到100');if(r.key==='28'&&Number(row[3])>100||r.key==='29'&&Number(row[3])>100)return error('进度或成绩须在0到100');
    if(r.key==='22'&&r.stage>=0&&(dialog.index<0||[0,1,2,4].some(i=>String(row[i])!==String(b.rows[dialog.index][i]))))return error('校准节点仅允许修改校准分与原因；指标、权重和原评分须保持来源版本');
    const candidate=copy(b.rows);if(dialog.index<0)candidate.push(row);else candidate[dialog.index]=row;
    if(r.key==='24'&&Number(row[4])!==Number(row[1])+Number(row[2])-Number(row[3]))return error('实发金额必须等于基本工资加加班工资减扣减');
    if(r.key==='14'&&Number(row[2])>Number(row[1]))return error('核定时长不能超过申请时长');
    if(['14','17','28','24'].includes(r.key)&&new Set(candidate.map(x=>x[0]+(r.key==='17'?x[1]:''))).size!==candidate.length)return error('员工明细重复');
    const previousBusiness=copy(b),previousFields=copy(r.f),previousItems=copy(r.items);b.rows=candidate;sync(r);const fieldError=H.validate&&r.key!=='21'?H.validate(r,false):'';if(fieldError){r.business=previousBusiness;r.f=previousFields;r.items=previousItems;return error(fieldError);}event(r,s.action,v.办理依据);close();render();return true;
  }
  function removeRow(i){const r=H.get();if(!H.canEdit(r))return error('仅草稿允许删除');dialog={type:'remove',id:r.id,index:i,role:state.role,version:r.version,stage:r.stage};openModal('删除业务明细','<p>删除后需重新核验该事项的明细与汇总。</p>',button('取消','close()')+button('确认删除','confirmRemove()'));}
  function confirmRemove(){const r=validDialog();if(!r)return error('状态已变化');ensure(r).rows.splice(dialog.index,1);sync(r);event(r,'删除明细','删除第'+(dialog.index+1)+'行');close();render();}
  function close(){dialog=null;closeModal();}
  function sync(r){const rows=ensure(r).rows,x=rows[0];if(!x)return;
    if(r.key==='01'){Object.assign(r.f,{岗位:x[0],年度计划:x[1],编制余额:String(Number(x[2])-Number(x[3])),需求人数:String(x[4])});}
    if(r.key==='03')r.f.资料核验=rows.every(x=>x.at(-1)==='通过')?'通过':'待补齐';
    if(r.key==='05'){r.f.人员明细=rows.map(x=>x[0]).join(',');r.f.目标部门=x[2];r.f.目标岗位=x[3];}
    if(r.key==='06'){r.f.合同编号=x[0];r.f.办理类型=x[1];r.f.签署方式=x[2];}
    if(r.key==='10'){r.f.开始日期=x[1];r.f.结束日期=x[2];r.f.后续结果=x[3];}
    if(r.key==='11'){r.f.变更字段=x[0];r.f.变更后值=x[2];r.f.变更原因=x[3];}
    if(r.key==='12'){r.f.假别=x[0];r.f.开始日期=x[1];r.f.结束日期=x[2];r.f.天数=String(x[3]);}
    if(r.key==='13'){r.f.原单编号=x[0];r.f.新天数=String(x[2]);}
    if(r.key==='14'){r.f.人员明细=rows.map(x=>x[0]).join(',');r.f.小时数=String(x[2]);r.f.加班类别=x[3];}
    if(r.key==='15'){r.f.来源类别=x[1];r.f.天数=String(Number(x[3])/8);}
    if(r.key==='16'){r.f.事项类型=x[0];r.f.开始日期=x[1];r.f.地点=x[2];r.f.事由=x[3];}
    if(r.key==='17'){r.f.人员明细=rows.map(x=>x[0]).join(',');r.f.原班次=x[2];r.f.目标班次=x[3];}
    if(r.key==='18'){r.f.开始日期=x[1];r.f.更正结果=x[3];}
    if(r.key==='20'){r.f.年度=x[1];r.f.公司=x[2];r.f.组织=x[3];}
    if(r.key==='21')r.items=rows.map(x=>({指标:x[0],目标值:Number(x[1]),单位:x[2],权重:Number(x[3])}));
    if(r.key==='22'){r.f.原评分=String(Math.round(rows.reduce((s,x)=>s+Number(x[1])*Number(x[2])/100,0)*100)/100);r.f.校准分=String(score(r));r.f.校准依据=rows.map(x=>x[5]).join('；');}
    if(r.key==='23'){r.f.奖惩类型=x[0];r.f.依据=x[1];r.f.审批来源=x[2];r.f.生效日期=x[3];}
    if(r.key==='24')r.items=rows.map(x=>({员工编号:x[0],金额:Number(x[4])}));
    if(r.key==='25'){const src=H.get(r.f.原单编号);r.f.修订金额=String(Number(src?.items[0]?.金额||0)+rows.reduce((n,x)=>n+(x[0]==='扣减'?-1:1)*(Number(x[2])-Number(x[1])),0));r.f.处理结论=rows.map(x=>x[3]).join('；');}
    if(r.key==='26'){r.f.险种=x[1];r.f.事项类型=x[2];r.f.月份=x[3];r.f.金额=String(rows.reduce((n,x)=>n+Number(x[4]),0));}
    if(r.key==='27')r.f.费用=String(rows.reduce((n,x)=>n+Number(x[1]),0));
    if(r.key==='28'){r.f.参加人员=rows.map(x=>x[0]).join(',');r.f.年度计划=x[1];r.f.课程=x[2];}
    if(r.key==='29'){r.f.考试名称=x[1];r.f.考试方式=x[2];r.f.成绩=String(x[3]);}
    if(r.key==='30'){r.f.证照名称=x[0];r.f.类别=x[1];r.f.到期日期=x[2];}
    if(r.key==='31'){r.f.关联考试=x[2];r.f.到期日期=x[3];}
  }
  function hours(r){const f=r.f;if(!f.开始日期||!f.结束日期)return 0;const start=new Date(f.开始日期+'T'+(f.开始时刻||'08:30')),end=new Date(f.结束日期+'T'+(f.结束时刻||'17:30'));if(r.key==='14')return Math.max(0,(end-start)/3600000);let total=0;for(let d=new Date(f.开始日期+'T00:00');d<=end;d.setDate(d.getDate()+1)){if([0,6].includes(d.getDay()))continue;const day=d.toLocaleDateString('sv-SE');for(const [a,b] of [['08:30','12:30'],['13:30','17:30']])total+=Math.max(0,(Math.min(end,new Date(day+'T'+b))-Math.max(start,new Date(day+'T'+a)))/3600000);}return Math.round(total*100)/100;}
  function calendarView(r){const rows=ensure(r).rows;return panel('班组排班日历',`<div class="hb-calendar">${rows.map(x=>`<article><strong>${esc(x[1])}</strong><h3>${esc(employee(x[0])?.name||x[0])}</h3><p>${esc(x[2])} → ${esc(x[3])}</p><small>${esc(r.f.班组)} · V${r.version}</small></article>`).join('')}</div>`);}
  function attendanceView(r){const rows=H.attendanceRows(r);return panel(r.key==='20'?'年度同源考勤明细':'排班、打卡与假勤核对',table(['日期','员工','结果','来源 / 修订','版本'],rows.map(x=>[esc(x.date),esc(employee(x.employeeId)?.name),esc(x.type),link(x.correction||x.source),'V'+x.version])),r.key==='19'?button('查看月度锁定','balances()'):button('导出当前考勤','exportAttendance()'));}
  function balances(){H.balances();}function exportAttendance(){H.exportAttendance();}
  function sourceView(r){const b=ensure(r);return panel('来源与后续业务',table(['来源编号','关联说明'],b.links.map(x=>[link(x.id),esc(x.kind)])),button('选择关联对象','sourceDialog()',!editable(r)));}
  const sourceKeys={'02':['01'],'05':['31'],'06':['06'],'09':['22','09'],'10':['10'],'13':['12'],'17':['17'],'23':['22','23'],'25':['24'],'29':['28'],'30':['30'],'31':['29']};
  function sourceDialog(){const r=H.get();if(!editable(r))return error('当前不能修改来源');const allowed=sourceKeys[r.key]||[];const options=H.store.records.filter(x=>x.id!==r.id&&allowed.includes(x.key)&&H.visible(x)&&H.done(x)&&(r.key==='02'||x.employeeId===r.employeeId));dialog={type:'source',id:r.id,role:state.role,version:r.version,stage:r.stage};openModal('选择有效来源',`<form id="hb-source"><div id="hw-error"></div><label class="field"><span>来源对象</span><select name="source">${options.map(x=>`<option value="${x.id}">${esc(x.id+' · '+H.def(x.key).short+' · V'+x.version)}</option>`).join('')}</select></label>${options.length?'':'<p>当前没有符合员工、状态和权限要求的来源，请先完成前置业务。</p>'}</form>`,button('取消','close()')+button('关联来源','saveSource()',!options.length,'primary'));}
  function saveSource(){const r=validDialog(),f=document.querySelector('#hb-source');if(!r)return error('状态已变化');const src=H.get(new FormData(f).get('source'));if(!src||!H.visible(src)||!H.done(src)||!(sourceKeys[r.key]||[]).includes(src.key)||r.key!=='02'&&src.employeeId!==r.employeeId)return error('来源不再有效');const key={'13':'原单编号','25':'原单编号','29':'关联培训','31':'关联考试','23':'审批来源'}[r.key];if(key)r.f[key]=src.id;if(r.key==='23')ensure(r).rows[0][2]=src.id;if(r.key==='13')ensure(r).rows[0][0]=src.id;if(r.key==='31')ensure(r).rows[0][2]=src.id;ensure(r).links=ensure(r).links.filter(x=>x.kind!=='有效审批来源');ensure(r).links.push({id:src.id,version:src.version,kind:'有效审批来源'});event(r,'关联有效来源',src.id+' V'+src.version);close();render();}
  function appealView(r){const a=r.appeal;return panel('绩效申诉与仲裁',a?pairs({申诉理由:a.reason,受理状态:r.stage>0||H.done(r)?'已受理':'待受理',复核意见:a.review||'待复核',复核评分:a.score??'待复核',仲裁结论:a.final||'待仲裁',最终反馈:r.checks.finalPublished?'已发送':'待发送'}):`<p>${r.checks.published?'结果已发布，员工可确认结果或直接提出申诉。':'结果发布后开放确认和申诉。'}</p>`);}
  function examView(r){return panel('题库与在线考试',table(['题目','参考答案'],H.store.questions.map(q=>[esc(q.question),state.role==='hr'||state.role==='hrHead'?esc(q.answer):'作答后核验'])),button('维护题库','questionDialog()',!editable(r)||state.role!=='hr')+button('在线作答','examDialog()',r.f.考试方式!=='在线考试'||r.stage!==1||!H.visible(r)));}
  function questionDialog(){const r=H.get();if(!editable(r)||state.role!=='hr')return error('仅人事可维护');dialog={type:'question',id:r.id,role:state.role,version:r.version,stage:r.stage};openModal('新增考试题目',`<form id="hb-form">${field('题目','')}${field('参考答案','')}</form>`,button('取消','close()')+button('保存题目','saveQuestion()'));}
  function saveQuestion(){const r=validDialog(),f=document.querySelector('#hb-form');if(!r||!f.reportValidity())return;const v=Object.fromEntries(new FormData(f));H.store.questions.push({id:'Q-'+seq++,question:v.题目,answer:v.参考答案});event(r,'维护题库',v.题目);close();render();}
  function examDialog(){const r=H.get();if(!H.visible(r)||r.f.考试方式!=='在线考试'||r.stage!==1)return error('当前不能作答');dialog={type:'exam',id:r.id,role:state.role,version:r.version,stage:r.stage};openModal('在线考试作答',`<form id="hb-exam"><div id="hw-error"></div>${H.store.questions.map(q=>field(q.id+' '+q.question,'')).join('')}</form>`,button('取消','close()')+button('提交答案','submitExam()'));
  }
  function submitExam(){if(!dialog)return error('考试窗口已关闭');const r=H.get(dialog.id);if(!r||!H.visible(r)||r.version!==dialog.version||state.role!==dialog.role||r.stage!==dialog.stage)return error('考试状态已变化');const f=document.querySelector('#hb-exam');if(!f.reportValidity())return;const v=Object.values(Object.fromEntries(new FormData(f))),correct=H.store.questions.filter((q,i)=>v[i].trim()===q.answer.trim()).length,result=Math.round(correct/H.store.questions.length*100);ensure(r).answers={values:v,score:result,questions:copy(H.store.questions)};ensure(r).rows[0][3]=result;r.f.成绩=String(result);event(r,'提交考试答案',{正确题数:correct,总题数:v.length,成绩:result});close();render();}
  function csv(text){const rows=[];let row=[],cell='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell);cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x.trim()))rows.push(row);row=[];cell='';}else cell+=c;}if(quoted)throw new Error('CSV引号未闭合');row.push(cell);if(row.some(x=>x.trim()))rows.push(row);return rows;}
  function template(){const r=H.get();if(!H.visible(r))return error('无查看权限');const s=specs[r.key];H.download(H.def(r.key).short+'-演示模板.csv',new Blob(['\ufeff'+[s.columns,...ensure(r).rows].map(x=>x.map(H.csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));}
  function inspectImport(r,text){const parsed=csv(text.replace(/^\ufeff/,'')),headers=parsed.shift()||[],s=specs[r.key];if(headers.join('|')!==s.columns.join('|'))throw new Error('模板列不匹配，请使用当前流程模板');const rows=[],errors=[],seen=new Set();for(const [i,row] of parsed.entries()){let reason='';if(row.length!==headers.length||row.some(x=>!x.trim()))reason='列数或必填内容不完整';for(let j=0;j<headers.length;j++){if(/金额|工资|扣减|评分|校准分|权重|成绩/.test(headers[j])&&(!Number.isFinite(Number(row[j]))||Number(row[j])<0))reason='存在无效数值';}
      const employeeIndex=headers.indexOf('员工编号');if(employeeIndex>=0&&!employee(row[employeeIndex]))reason='员工不存在';if(employeeIndex>=0&&r.key!=='24'&&row[employeeIndex]!==r.employeeId)reason='当前单据仅接收关联员工';
      const identity=r.key==='22'?row[0]:r.key==='18'?row[0]+'|'+row[1]:row[0];if(seen.has(identity))reason='文件内重复记录';seen.add(identity);
      if(r.key==='24'&&Number(row[4])!==Number(row[1])+Number(row[2])-Number(row[3]))reason='工资项目与实发不相等';if(['22','29'].includes(r.key)&&(Number(row[3])>100||r.key==='22'&&Number(row[2])>100))reason='成绩须为0到100';
      if(r.key==='24'&&H.store.records.some(x=>x.id!==r.id&&!x.historical&&x.key==='24'&&x.employeeId===row[0]&&x.f.月份===r.f.月份&&x.checks.published))reason='该员工月份已发布，须走异议修订';
      if(reason)errors.push({line:i+2,reason});rows.push(row);
    }if(r.key==='24'&&!rows.some(row=>row[0]===r.employeeId))errors.push({line:0,reason:'批次必须包含当前单据员工'});if(!rows.length)errors.push({line:2,reason:'没有数据行'});
    if(r.key==='22'){const plan=H.get(r.f.计划编号),items=plan?.effective?.items||plan?.items||[];if(rows.length!==items.length||rows.some(x=>!items.some(y=>y.指标===x[0]&&Number(y.权重)===Number(x[1]))))errors.push({line:0,reason:'指标及权重与有效计划不匹配'});}
    return {id:'HR-IMPORT-'+seq++,source:r.id,version:r.version,role:state.role,stage:r.stage,rows,errors,status:'待确认',fingerprint:JSON.stringify(rows)};
  }
  async function importFile(file){const r=H.get();if(!file||!editable(r)||r.stage>=0)return error('请在草稿状态导入');if(file.size>2*1024*1024)return error('演示CSV限2MB');try{const x=inspectImport(r,await file.text());if(store.imports.some(y=>y.source===r.id&&y.status==='已导入'&&y.fingerprint===x.fingerprint))return error('此文件内容已导入，禁止重复');dialog={type:'import',id:r.id,version:r.version,role:state.role,stage:r.stage,import:x};openModal('导入预览与逐行校验',`<div id="hw-error"></div><p>${x.rows.length}行数据，${x.errors.length}项错误。${r.key==='24'?'确认后按员工拆分工资条草稿。':''}</p>${table(specs[r.key].columns,x.rows.map(row=>row.map(esc)))}${table(['文件行号','错误原因'],x.errors.map(e=>[e.line||'整批',esc(e.reason)]))}`,button('取消','close()')+button('确认导入','commitImport()',!!x.errors.length,'primary'));}catch(e){error(e.message);}}
  function commitImport(){const r=validDialog(),x=dialog?.import;if(!r||!x||x.errors.length||r.stage>=0)return error('导入条件已变化');if(store.imports.some(y=>y.source===r.id&&y.status==='已导入'&&y.fingerprint===x.fingerprint))return error('禁止重复导入');
    if(r.key==='24'){for(const row of x.rows){let target=row[0]===r.employeeId?r:null;if(!target){target=H.createRecord('24',row[0]);target.f=copy(r.f);target.employeeId=row[0];H.store.records.unshift(target);}ensure(target).rows=[copy(row)];sync(target);event(target,'导入工资条明细',x.id+' · '+row[0]);}if(!x.rows.some(row=>row[0]===r.employeeId))return error('批次须包含当前单据员工');}
    else{ensure(r).rows=copy(x.rows);sync(r);if(r.key==='18'){for(const row of x.rows){if(!H.store.attendance.some(a=>a.employeeId===row[0]&&a.date===row[1]&&a.source===x.id))H.store.attendance.push({id:'CLOCK-'+seq++,employeeId:row[0],date:row[1],end:row[1],type:row[2],source:x.id,version:1,anomaly:row[2]!=='正常'});}}}
    x.status='已导入';store.imports.push(x);event(r,'确认文件导入',x.id+' / '+x.rows.length+'行');H.todoSync();close();render();return true;
  }
  function check(r){const b=ensure(r),rows=b.rows,s=specs[r.key];if(!rows.length)return '请先填写'+s.title;
    if(r.key==='01'&&(!Number.isInteger(Number(r.f.需求人数))||Number(r.f.需求人数)<=0||rows.some(x=>Number(x[4])>Number(x[2])-Number(x[3]))))return '招聘人数须为正整数且不超过编制余额';
    if(r.key==='02'&&!b.links.some(x=>H.get(x.id)?.key==='01'&&H.done(H.get(x.id))))return '请关联已批准的招聘需求';
    if(r.key==='11'&&r.f.变更字段==='mobile'&&!/^1\d{10}$/.test(r.f.变更后值))return '手机号须为11位有效格式；地址请选择工作地点字段';
    if(r.key==='22'){const p=H.get(r.f.计划编号),effective=p?.effective||p;const items=r.checks.planSnapshot?.items||effective?.items||[];if(rows.length!==items.length||rows.some(x=>!items.some(y=>y.指标===x[0]&&Number(y.权重)===Number(x[1]))))return '评分指标与所绑定的有效计划版本不一致，请重新载入计划指标';if(rows.some(x=>!x[4]||!x[5]||Number(x[2])<0||Number(x[3])<0||Number(x[2])>100||Number(x[3])>100))return '评分依据、校准原因及0到100的分值必须完整';}
    if(r.key==='23'&&r.f.审批来源!=='本流程审批'){const src=H.get(r.f.审批来源);if(!src||!H.done(src)||src.employeeId!==r.employeeId||!['22','23'].includes(src.key))return '奖惩审批来源必须是该员工已确认的有效结果';}
    if(['12','15'].includes(r.key)&&Math.abs(hours(r)/8-Number(r.f.天数))>0.001)return '申请天数与演示工作日历计算不一致，请核对起止时段';
    if(r.key==='13'){const start=Date.parse(r.f.开始日期+'T08:30'),end=Date.parse(r.f.结束日期+'T17:30');if(H.store.records.some(x=>!x.historical&&x.id!==r.id&&x.id!==r.f.原单编号&&x.employeeId===r.employeeId&&['12','14','15','16'].includes(x.key)&&x.stage>=0&&Date.parse(x.f.开始日期+'T'+(x.f.开始时刻||'08:30'))<end&&Date.parse(x.f.结束日期+'T'+(x.f.结束时刻||'17:30'))>start))return '变更时段与其他已提交假勤冲突';}
    if(r.key==='14'&&rows.some(x=>Number(x[2])>Number(x[1])||Number(x[1])>hours(r)))return '逐人核定时长不得超过申请及实际时段';
    if(r.key==='15'){if(rows.length!==1)return '本次调休须指定一个来源批次，多个来源请分单核销';const lot=store.compLots.find(x=>x.id===rows[0][0]&&x.employeeId===r.employeeId);if(!lot||lot.expires<store.date||lot.category!==r.f.来源类别||lot.hours-lot.held+Number(r.checks.compHeld||0)<Number(r.f.天数)*8)return '补休来源批次无效、已到期或可用额度不足';}
    if(r.key==='17'){const days=rows.map(x=>x[0]+'|'+x[1]);if(new Set(days).size!==days.length)return '同一员工同一天不能重复排班';if(r.f.办理类型!=='排班发布'&&!b.links.some(x=>H.get(x.id)?.key==='17'))return '调班或换班须关联原排班';if(H.store.records.some(x=>x.key==='17'&&!x.historical&&x.id!==r.id&&x.stage>=0&&!b.links.some(l=>l.id===x.id)&&ensure(x).rows.some(y=>days.includes(y[0]+'|'+y[1]))))return '与已提交排班存在人员日期冲突';}
    if(r.key==='25'&&rows.some(x=>!['基本工资','加班工资','扣减'].includes(x[0])))return '修订项目须选择基本工资、加班工资或扣减';
    if(r.key==='25'&&H.store.records.some(x=>x.id!==r.id&&!x.historical&&x.key==='25'&&x.f.原单编号===r.f.原单编号&&x.stage>=0&&!H.done(x)))return '原工资条已有未完成的异议，请先处理该异议';
    if(r.key==='30'&&r.f.办理类型==='原件借阅'&&store.loans.some(x=>x.employeeId===r.employeeId&&x.name===r.f.证照名称&&!x.returned))return '此证照原件尚未归还，不能重复借阅';
    if(r.key==='30'&&r.f.办理类型==='原件归还'&&!store.loans.some(x=>x.employeeId===r.employeeId&&x.name===r.f.证照名称&&!x.returned&&b.links.some(l=>l.id===x.source)))return '请关联尚未归还的原借阅单';
    if(['05','31'].includes(r.key)){for(const row of rows){const id=r.key==='05'?row[0]:r.employeeId,position=r.key==='05'?row[3]:row[0],standard=store.positions.find(p=>p.name===position);if(!standard)return '目标岗位尚无已配置准入标准';if(!employee(id)?.qualifications.some(q=>q.name===standard.certificate&&q.status==='有效'&&q.expires>=(r.f.生效日期||store.date)))return '目标岗位所需证照不匹配或已失效';}}
    if(r.stage>=0){const idx=s.columns.findIndex(x=>['核验结论','结论'].includes(x));if(idx>=0&&rows.some(row=>row[idx]!=='通过'))return '请逐项完成'+s.title+'，未通过项目不能推进';if(r.key==='28'&&r.stage===4&&rows.some(row=>Number(row[3])<100))return '学习任务尚未全部完成';if(r.key==='29'&&r.f.考试方式==='在线考试'&&!b.answers)return '请先完成在线作答';}
    return '';
  }
  function before(r,kind){if(kind!=='advance')return '';return check(r);}
  function after(r,stage,kind){ensure(r);if(r.key==='25'&&stage===2&&kind==='advance'){const src=H.get(r.f.原单编号),row=ensure(src).rows[0];for(const change of ensure(r).rows){const index={'基本工资':1,'加班工资':2,'扣减':3}[change[0]];if(index)row[index]=Number(change[2]);}row[4]=Number(src.items[0].金额);src.checks.revisionSource=r.id;ensure(src).links.push({id:r.id,kind:'工资修订再次确认'});event(src,'修订工资项目',r.id+' / V'+src.version);}if(['reject','withdraw'].includes(kind)){if(r.checks.compHeld)releaseComp(r);return;}
    if(stage<0&&r.key==='15'){const lot=store.compLots.find(x=>x.id===ensure(r).rows[0][0]);r.checks.compHeld=Number(r.f.天数)*8;lot.held+=r.checks.compHeld;}
    if(H.done(r)&&kind==='advance'){const key=r.id+':'+r.version;if(store.snapshots.some(x=>x.key===key))return;store.snapshots.push({key,id:r.id,version:r.version,employeeId:r.employeeId,fields:copy(r.f),rows:copy(ensure(r).rows),date:store.date});
      if(r.key==='05'&&r.f.生效日期>store.date)store.pendingChanges.push({source:r.id,date:r.f.生效日期,version:r.version,rows:copy(ensure(r).rows),status:'待生效'});
      if(r.key==='21')r.effective={version:r.version,f:copy(r.f),items:copy(r.items),business:copy(r.business)};
      if(r.key==='14'){for(const x of ensure(r).rows){const id='COMP-'+r.id+'-'+x[0];if(!store.compLots.some(l=>l.id===id))store.compLots.push({id,employeeId:x[0],source:r.id,category:x[3],hours:Number(x[2]),held:0,expires:'2026-12-31'});}}
      if(r.key==='15'){const lot=store.compLots.find(x=>x.id===ensure(r).rows[0][0]);if(lot){lot.hours-=Number(r.f.天数)*8;lot.held=Math.max(0,lot.held-Number(r.checks.compHeld||0));}r.checks.compHeld=0;}
      if(r.key==='30'&&r.f.办理类型==='原件借阅')store.loans.push({source:r.id,employeeId:r.employeeId,name:r.f.证照名称,start:store.date,due:r.f.归还日期,returned:false});
      if(r.key==='30'&&r.f.办理类型==='原件归还'){const l=store.loans.find(x=>!x.returned&&ensure(r).links.some(y=>y.id===x.source));if(l){l.returned=true;l.returnSource=r.id;}}
      if(r.key==='03'){const next=H.createRecord('04',r.employeeId);next.employeeId=r.employeeId;next.f.试用结束='2026-12-31';H.store.records.push(next);ensure(r).links.push({id:next.id,kind:'试用期考核任务'});}
      if(r.key==='04'&&r.f.结论!=='转正'){const next=H.createRecord(r.f.结论==='延期'?'04':'08',r.employeeId);next.employeeId=r.employeeId;if(r.f.结论==='延期')next.f.试用结束=r.f.延期至||r.f.生效日期;H.store.records.push(next);ensure(r).links.push({id:next.id,kind:r.f.结论==='延期'?'延期再考核':'不予转正后续办理'});}
      if(r.key==='06'){const e=employee(r.employeeId);e.contractVersions=e.contractVersions||[];e.contractVersions.push({source:r.id,version:r.version,number:r.f.合同编号,expires:r.f.到期日期,files:r.files.map(f=>f.name)});}
      event(r,'业务明细归集',{来源:r.id,版本:r.version,明细:ensure(r).rows});
    }
  }
  function releaseComp(r){const lot=store.compLots.find(x=>x.id===ensure(r).rows[0]?.[0]);if(lot)lot.held=Math.max(0,lot.held-Number(r.checks.compHeld||0));r.checks.compHeld=0;}
  function dueDialog(){if(state.role!=='hr')return error('仅人事可运行到期检查');openModal('演示日期与到期检查',`<form id="hb-due">${field('演示日期',store.date,'date')}<p>仅扫描本次会话的合同、试用期、证照和资格，不调用生产任务服务。</p></form>`,button('取消','close()')+button('检查并生成任务','checkDue()',false,'primary'));}
  function checkDue(){if(state.role!=='hr')return error('无办理权限');const f=document.querySelector('#hb-due');if(!f.reportValidity())return;store.date=new FormData(f).get('演示日期');for(const change of store.pendingChanges.filter(x=>x.status==='待生效'&&x.date<=store.date)){for(const row of change.rows){const e=employee(row[0]);if(e){e.org=row[2];e.position=row[3];}}change.status='已生效';event(H.get(change.source),'生效日岗位更新',change.date);}for(const r of H.store.records.filter(x=>!x.historical)){let due,key;if(r.key==='04'&&!H.done(r)){due=r.f.试用结束;key='试用期考核';}if(r.key==='06'&&H.done(r)){due=r.f.到期日期;key='劳动合同续签';}if(['30','31'].includes(r.key)&&H.done(r)){due=r.f.到期日期;key=r.key==='30'?'证照到期更新':'资格复审';}if(due&&due<=store.date&&!store.dueTasks.some(x=>x.source===r.id&&x.version===r.version)){store.dueTasks.push({id:'DUE-'+seq++,source:r.id,version:r.version,due,kind:key,employeeId:r.employeeId,status:'待处理'});event(r,'到期检查生成任务',key+' / '+due);}}
    H.todoSync();close();state.page='hr-due';render();}
  function dueView(){return shell(panel('生效日岗位更新',table(['来源','生效日期','版本','状态'],store.pendingChanges.map(x=>[link(x.source),x.date,'V'+x.version,x.status])))+panel('到期事项与任务',table(['员工','事项','到期日期','来源版本','操作'],store.dueTasks.filter(x=>H.visible(H.get(x.source))).map(x=>[esc(employee(x.employeeId)?.name),esc(x.kind),esc(x.due),link(x.source)+' V'+x.version,button(x.status==='待处理'?'发起后续办理':'查看办理单',`dueFollow('${x.id}')`,state.role!=='hr')]))),'到期检查与后续办理','当前演示日期：'+store.date,button('调整日期并检查','dueDialog()'));}
  function dueFollow(id){if(state.role!=='hr')return error('无办理权限');const t=store.dueTasks.find(x=>x.id===id);if(!t)return;if(t.follow)return H.open(t.follow);const src=H.get(t.source);if(src.key==='04'){t.follow=src.id;t.status='已下发';return H.open(src.id);}const r=H.createRecord(src.key,t.employeeId);r.f=copy(src.f);r.f.办理类型=src.key==='06'?'续签':src.key==='30'?'更新':'复审';r.f.到期日期=String(Number(store.date.slice(0,4))+1)+store.date.slice(4);H.store.records.unshift(r);ensure(r).links.push({id:src.id,version:src.version,kind:'到期后续办理'});t.follow=r.id;t.status='已下发';H.todoSync();H.open(r.id);}
  function loadIndicators(){const r=H.get();if(r.key!=='22'||!H.canEdit(r))return error('仅结果草稿可载入');const p=H.get(r.f.计划编号),base=p?.effective||(p&&H.done(p)?p:null);if(!base)return error('计划尚未生效');ensure(r).rows=base.items.map(x=>[x.指标,x.权重,86,88,'成果记录（模拟）','补充已核实成果']);sync(r);event(r,'载入有效计划指标','V'+base.version);render();}
  function recruitView(r){const follow=H.store.records.filter(x=>H.visible(x)&&ensure(x).links.some(l=>l.id===r.id));return panel('招聘执行与下游人员',pairs({岗位:r.f.岗位,年度计划:r.f.年度计划||'按关联招聘需求',可用编制:r.key==='01'?Number(r.f.编制余额):'见来源需求',录用结果:H.done(r)?'已形成办理结论':'待审批'}),r.key==='02'?button('关联批准招聘需求','sourceDialog()',!editable(r)):'')+panel('关联录用与入职',table(['业务编号','流程','员工 / 候选人','状态'],follow.map(x=>[link(x.id),esc(H.def(x.key).short),esc(employee(x.employeeId)?.name||x.f.候选人),esc(H.status(x))])));}
  function lifecycleView(r){const e=employee(r.employeeId);return panel('员工当前状态与业务联动',pairs({员工:e?.name||r.f.候选人,组织:e?.org||'待录用',岗位:e?.position||r.f.岗位,人员状态:e?.status||'拟录用',考勤起点:e?.hireDate||'未形成',考勤终点:e?.leaveDate||'未离职'}))+panel('关联任务与后续申请',table(['来源编号','业务事项','状态'],ensure(r).links.map(l=>[link(l.id),esc(l.kind),esc(H.get(l.id)?H.status(H.get(l.id)):'参考依据')])));}
  function learningView(r){const b=ensure(r);return panel('课程内容与学习进度',`<article class="hb-course"><h3>${esc(r.f.课程)}</h3><p>第一节：岗位安全检查。发现安全隐患应停止相关作业并报告。</p><p>第二节：质量记录。检验结果应关联批次，异常需登记处理及复核证据。</p><p>以上为演示教材，正式课程由企业确认。</p></article>`+table(['员工','学习任务','进度','状态'],b.rows.map(x=>[esc(employee(x[0])?.name),esc(x[2]),x[3]+'%',Number(x[3])===100?'已完成':'学习中'])),button('完成本节学习','completeLesson()',r.stage!==3||!H.people(r).includes(H.employeeForRole())));}
  function payBatchView(r){const records=H.store.records.filter(x=>x.key==='24'&&x.f.导入批次===r.f.导入批次&&H.visible(x));return panel('发布批次与员工确认',table(['工资条','员工','月份','发布','确认'],records.map(x=>[link(x.id),esc(employee(x.employeeId)?.name),esc(x.f.月份),x.checks.published?'已发布':'待发布',x.checks.confirmed?'已确认':'待确认'])),button('发布已复核工资条',"batchPublishDialog('24')",state.role!=='hr'));}
  function completeLesson(){const r=H.get(),id=H.employeeForRole();if(r?.key!=='28'||r.stage!==3||!H.people(r).includes(id))return error('仅已下发学习任务的员工可登记');const row=ensure(r).rows.find(x=>x[0]===id);if(!row)return error('无本人学习任务');if(Number(row[3])>=100)return error('本课程已完成');row[3]=Math.min(100,Number(row[3])+50);if(row[3]===100)row[4]='通过';event(r,'完成本节学习',id+' / '+row[3]+'%');render();}
  function batchPublishDialog(key){if(state.role!=='hr')return error('仅人事可发布');const current=H.get();const records=H.store.records.filter(x=>x.key===key&&!x.historical&&x.stage===2&&!x.appealSteps&&H.visible(x)&&(key==='24'?x.f.导入批次===current.f.导入批次:x.f.周期===current.f.周期));dialog={type:'batch',role:state.role,key,records:records.map(x=>({id:x.id,stage:x.stage,version:x.version}))};openModal('确认定向发布',`<form id="hb-publish"><div id="hw-error"></div><p>本次仅发布已完成复核的${records.length}条记录，其他记录保持原状态。</p>${table(['单据','员工','版本'],records.map(x=>[esc(x.id),esc(employee(x.employeeId)?.name),'V'+x.version]))}${field('发布依据','')}</form>`,button('取消','close()')+button('确认批量发布','batchPublish()',!records.length,'primary'));}
  function batchPublish(){if(dialog?.type!=='batch'||state.role!==dialog.role)return error('身份已变化');const f=document.querySelector('#hb-publish');if(!f.reportValidity())return;const records=dialog.records.map(x=>H.get(x.id));for(const [i,r] of records.entries()){if(!r||r.version!==dialog.records[i].version||r.stage!==2||!H.canAct(r)||H.validate(r,true)||check(r))return error('存在状态变化或未通过校验的记录，请重新核对');}const note=new FormData(f).get('发布依据');for(const r of records)H.transition(r.id,'advance',{note});close();render();}
  function init(core){H=core;for(const e of db.employees){for(const category of ['平时','周末','节假日'])store.compLots.push({id:category==='平时'?'COMP-BASE-'+e.id.slice(-3):'COMP-'+category+'-'+e.id,employeeId:e.id,category,source:'历史余额',hours:e.hrBalance.comp[category],held:0,expires:e.hrBalance.compExpiry});}
    for(const r of H.store.records){ensure(r);if(r.key==='21'&&H.done(r))r.effective={version:r.version,f:copy(r.f),items:copy(r.items),business:copy(r.business)};}
  }
  return {completeLesson,batchPublishDialog,batchPublish,specs,store,init,ensure,view,versions,pairs,table,panel,format,actionLabel,before,after,check,event,sync,hours,releaseComp,open,editRow,saveRow,removeRow,confirmRemove,close,sourceDialog,saveSource,template,importFile,inspectImport,commitImport,questionDialog,saveQuestion,examDialog,submitExam,dueDialog,checkDue,dueView,dueFollow,loadIndicators,balances,exportAttendance};
})();
