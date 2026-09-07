/* Final navigation model: level 1 = workbench/department/star, level 2 = business domain, level 3 = SOW process. */
state.navSectionOpen = state.navSectionOpen || {};
state.activeNavProcess = state.activeNavProcess || 'page:home';
state.promotionRecord = state.promotionRecord || {
  id:'PR-202608-006', title:'2026年绿色印刷专题宣传稿', requester:'经营发展部 / 周敏',
  channel:'公司官网 / 公众号', reviewer:'党政综合办 / 何静', due:'2026-08-28',
  status:'审核中', version:'V1.2送审稿', files:2
};

function navDepartmentForPage(page){
  if(['home','p0'].includes(page))return 'workbench';
  if(page==='promotion')return 'operations';
  if(page==='admin')return 'admin';
  if(page.startsWith('it-')||['itHome','itCatalog','service'].includes(page))return 'it';
  if(['hr','hrCatalog','hrDomain','hrSample','onboarding','onboardingDetail','employee','employeeDetail','leave','leaveDetail','qualification'].includes(page))return 'hr';
  if(page==='audit-home'||page.indexOf('audit-')===0||['contract','contractDetail','erp','srm'].includes(page))return 'audit';
  if(['starOverview','blueprint','star','metric','collection','meeting','problem','problemDetail','quality','risk','ruleLab'].includes(page))return 'star';
  return 'workbench';
}
function navNavigate(page,dept,processKey){
  state.page=page;
  state.activeNavProcess=processKey||('page:'+page);
  state.auditFilter='全部状态';state.auditQuery='';
  render();window.scrollTo({top:0,behavior:'smooth'});
}
function go(page){navNavigate(page,navDepartmentForPage(page),'page:'+page);}
function toggleNavSection(dept,key){const id=dept+':'+key;state.navSectionOpen[id]=!navSectionIsOpen(dept,key);render();}
function navSectionIsOpen(dept,key){return state.navSectionOpen[dept+':'+key]===true;}
const primaryNavigation=[
  {key:'workbench',label:'工作台',page:'home'}, {key:'hr',label:'人力资源部',page:'hr',count:'31'},
  {key:'admin',label:'党政综合办',page:'admin',count:'29'}, {key:'audit',label:'审计监督部',page:'audit-home',count:'15'},
  {key:'it',label:'信息工程部',page:'itHome',count:'10'}, {key:'operations',label:'经营发展部',page:'promotion',count:'1'},
  {key:'star',label:'观星台',page:'starOverview',count:'7'}
];
function selectPrimaryNav(page,key){const deptRoles={hr:'hr',audit:'audit',it:'it',admin:'admin',operations:'operations'};if(deptRoles[key])setRole(deptRoles[key]);state.navSectionOpen={};navNavigate(page,key,'page:'+page);}
function renderPrimaryNav(){const active=navDepartmentForPage(state.page);return '<nav class="primary-nav" aria-label="一级菜单">'+primaryNavigation.map(function(item){return '<button class="primary-nav-button '+(item.key===active?'active':'')+'" onclick="selectPrimaryNav(\''+item.page+'\',\''+item.key+'\')"><span>'+item.label+'</span></button>';}).join('')+'</nav>';}
function navSecondLink(page,label,dept){const active=state.page===page;return '<button class="nav-secondary-link '+(active?'active':'')+'" onclick="navNavigate(\''+page+'\',\''+dept+'\',\'page:'+page+'\')"><span>'+label+'</span></button>';}
function navSection(dept,key,label,items){const open=navSectionIsOpen(dept,key);return '<div class="nav-secondary"><button class="nav-secondary-button '+(open?'open':'')+'" onclick="toggleNavSection(\''+dept+'\',\''+key+'\')"><span>'+label+'</span><i>'+(open?'⌄':'›')+'</i></button><div class="nav-tertiary-list '+(open?'open':'')+'">'+items+'</div></div>';}
function navProcess(label,action,key){return '<button class="nav-tertiary '+(state.activeNavProcess===key?'active':'')+'" onclick="'+action+'">'+label+'</button>';}

function openAuditMenu(key){navNavigate('audit-'+key,'audit','audit:'+key);}
function openHrMenu(id){state.hrSampleId=id;navNavigate('hrSample','hr','hr:'+id);}
function openAdminMenu(group,type){state.adminTab=group;state.adminQuery=type;navNavigate('admin','admin','admin:'+group+':'+type);}
function openItMenu(key){if(typeof ItWorkspace!=='undefined')return ItWorkspace.list(key);state.itModule=key;state.itFilter='全部状态';navNavigate('itCatalog','it','it:'+key);}

function workbenchMenu(){return navSecondLink('home','管理工作台','workbench')+navSecondLink('p0','建设与追溯总览','workbench');}
function auditMenu(){
  let body='';
  ['合同与履约','合规与法律','风险管理','审计整改','招采监督'].forEach(function(group){
    const items=Object.keys(auditModules).filter(function(k){return auditModules[k].group===group;}).map(function(k){return navProcess(auditModules[k].label,"openAuditMenu('"+k+"')",'audit:'+k);}).join('');
    body+=navSection('audit',group,group,items);
  });
  body+=navSection('audit','external','跨系统协同',navProcess('ERP合同履约与付款回传',"navNavigate('erp','audit','audit:erp')",'audit:erp')+navProcess('SRM招采流程与异常回传',"navNavigate('srm','audit','audit:srm')",'audit:srm'));
  return body;
}
function hrMenu(){
  let body='';
  hrDomains.forEach(function(domain){
    const items=db.hrSamples.filter(function(x){return x.domain===domain.id;}).map(function(x){return navProcess(x.name,"openHrMenu('"+x.id+"')",'hr:'+x.id);}).join('');
    body+=navSection('hr',domain.id,domain.name,items);
  });
  return body;
}
function adminMenu(){
  let body='';
  adminTabs().forEach(function(group){
    const items=adminCatalog.filter(function(x){return x[0]===group;}).map(function(x){return navProcess(x[2],"openAdminMenu('"+x[0]+"','"+x[1]+"')",'admin:'+x[0]+':'+x[1]);}).join('');
    body+=navSection('admin',group,group,items);
  });
  return body;
}
function itMenu(){
  let body='';
  Array.from(new Set(itModules.map(function(x){return x.group;}))).forEach(function(group){
    const items=itModules.filter(function(x){return x.group===group;}).map(function(x){return navProcess(x.name,"openItMenu('"+x.key+"')",'it:'+x.key);}).join('');
    body+=navSection('it',group,group,items);
  });
  return body;
}
function operationsMenu(){return navSection('operations','promotion','宣传管理',navProcess('宣传内容发布审批流程',"navNavigate('promotion','operations','operations:promotion')",'operations:promotion'));}
function starMenu(){
  const overview=navProcess('观星台全景',"navNavigate('starOverview','star','star:overview')",'star:overview')+navProcess('蓝图设计基线',"navNavigate('blueprint','star','star:blueprint')",'star:blueprint')+navProcess('经营驾驶舱',"navNavigate('star','star','star:dashboard')",'star:dashboard');
  const flows=[['指标全生命周期','metric'],['数据采集与发布','collection'],['会议场景运行','meeting'],['问题快发闭环','problem'],['数据质量闭环','quality'],['双源风险采集与闭环','risk'],['AI风险规则优化','ruleLab']].map(function(x){return navProcess(x[0],"navNavigate('"+x[1]+"','star','star:"+x[1]+"')",'star:'+x[1]);}).join('');
  return navSection('star','overview','经营总览',overview)+navSection('star','flows','七条经营主线',flows);
}
function renderNav(){const current=navDepartmentForPage(state.page);const item=primaryNavigation.find(function(x){return x.key===current;})||primaryNavigation[0];const menus={workbench:workbenchMenu,hr:hrMenu,admin:adminMenu,audit:auditMenu,it:itMenu,operations:operationsMenu,star:starMenu};return '<nav class="nav-v2 nav-secondary-pane" aria-label="二三级菜单"><div class="side-nav-heading"><span>当前菜单</span><b>'+item.label+'</b></div>'+menus[current]()+'</nav>';}

function promotionPage(){
  const x=state.promotionRecord;
  const content='<div class="role-banner"><div><span class="eyebrow">经营发展部 · 宣传管理</span><h2>宣传内容发布审批</h2><p>对外宣传材料在发布前完成内容、品牌、保密与渠道审核，发布版和审批版保持一致。</p></div><div class="session-note">当前为静态 Demo<br>会话内操作可见，刷新后恢复基线。</div></div><div class="stat-row"><button class="stat active"><b>1</b><span>待审核宣传事项</span></button><button class="stat"><b>'+x.files+'</b><span>送审材料</span></button><button class="stat"><b>1</b><span>发布渠道</span></button><button class="stat"><b>0</b><span>逾期事项</span></button></div><section class="card"><div class="card-h"><div><h2>'+x.id+' · '+x.title+'</h2><span class="meta">'+x.version+' · '+x.channel+'</span></div>'+badge(x.status)+'</div><div class="info-grid">'+info('申请部门',x.requester)+info('审核责任',x.reviewer)+info('计划完成',x.due)+info('发布渠道',x.channel)+info('送审版本',x.version)+info('附件材料',x.files+'份')+'</div><div class="promotion-flow"><span>材料提交</span><i>→</i><span>业务审核</span><i>→</i><span>品牌/保密复核</span><i>→</i><span>审批发布</span><i>→</i><span>发布版归档</span></div><div class="card-footer"><button class="secondary" onclick="toast(\'已打开送审材料预览；当前为脱敏模拟文件\')">预览材料</button><button class="primary" onclick="approvePromotion()">审核并发布</button></div></section>';
  return shell(content,'宣传内容发布审批','经营发展部负责宣传内容发起与归集，相关责任部门完成审核后方可对外发布。');
}
function approvePromotion(){if(!['operations','admin','manager'].includes(state.role)){toast('请切换至经营发展部、党政综合办或公司管理层视角办理');return;}state.promotionRecord.status='已发布';state.promotionRecord.version='V1.0发布版';render();toast('审批状态、发布版本和归档结果已同步；刷新后恢复 Demo 基线');}

const renderBeforeNavigationV2=render;
render=function(){if(state.page==='promotion')return $('#app').innerHTML=promotionPage();return renderBeforeNavigationV2();};
render();
