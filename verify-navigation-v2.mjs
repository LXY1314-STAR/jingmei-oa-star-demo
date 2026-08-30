import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const appElement = { innerHTML: '' };
const genericElement = {
  value: '',
  innerHTML: '',
  textContent: '',
  classList: { add() {}, remove() {} },
  focus() {},
};

const context = vm.createContext({
  console,
  setTimeout,
  clearTimeout,
  document: {
    querySelector(selector) {
      return selector === '#app' ? appElement : genericElement;
    },
  },
  window: { scrollTo() {} },
});

vm.runInContext(fs.readFileSync('app.js', 'utf8'), context, { filename: 'app.js' });
vm.runInContext(fs.readFileSync('navigation-v2.js', 'utf8'), context, { filename: 'navigation-v2.js' });

const result = vm.runInContext(`(() => {
  const count = (html, token) => (html.match(new RegExp(token, 'g')) || []).length;
  const firstLevelLabels = ['工作台','人力资源部','党政综合办','审计监督部','信息工程部','经营发展部','观星台'];
  const primaryHtml = renderPrimaryNav();
  const html = renderNav();
  const processCounts = {
    hr: count(hrMenu(), 'nav-tertiary '),
    admin: count(adminMenu(), 'nav-tertiary '),
    audit: Object.keys(auditModules).length,
    auditSupportViews: 2,
    it: count(itMenu(), 'nav-tertiary '),
    operations: count(operationsMenu(), 'nav-tertiary '),
    starMainLines: 7,
  };

  const auditKey = Object.keys(auditModules)[0];
  openAuditMenu(auditKey);
  const auditMapping = {
    page: state.page,
    department: navDepartmentForPage(state.page),
    process: state.activeNavProcess,
  };
  navNavigate('promotion', 'operations', 'operations:promotion');
  const promotionHtml = document.querySelector('#app').innerHTML;
  navNavigate('blueprint', 'star', 'star:blueprint');
  const blueprintHtml = document.querySelector('#app').innerHTML;
  const blueprintCoverage = blueprintCatalog.map((item) => ({
    id: item.id,
    fields: item.fields.length,
    rules: item.rules.length,
    pages: item.pages.length,
  }));

  return {
    html,
    primaryHtml,
    firstLevelLabels,
    firstLevelCount: count(primaryHtml, 'class="primary-nav-button'),
    openThirdLevelGroups: count(html, 'nav-tertiary-list open'),
    processCounts,
    auditKey,
    auditMapping,
    promotionHtml,
    blueprintHtml,
    blueprintCoverage,
    starMenuHtml: starMenu(),
    releaseVersion: DEMO_RELEASE.version,
  };
})()`, context);

assert.equal(result.firstLevelCount, 7, '一级菜单应为 7 项');
for (const label of result.firstLevelLabels) {
  assert.ok(result.primaryHtml.includes(`>${label}<`), `缺少一级菜单：${label}`);
}
assert.equal(result.openThirdLevelGroups, 0, '三级菜单默认应全部收起');
vm.runInContext("navNavigate('hr', 'hr', 'page:hr')", context);
vm.runInContext("toggleNavSection('hr', hrDomains[0].id)", context);
assert.match(appElement.innerHTML, /nav-tertiary-list open/, '点击二级菜单后应展开对应三级流程');
for (const label of ['人力资源部工作台','党政综合办工作台','审计监督部工作台','信息工程部工作台']) {
  assert.equal(result.html.includes(label), false, `部门工作台不应保留为二级入口：${label}`);
}
for (const [label, page] of [['人力资源部','hr'],['党政综合办','admin'],['审计监督部','audit-home'],['信息工程部','itHome']]) {
  assert.ok(result.primaryHtml.includes(`selectPrimaryNav('`+page), `一级菜单未合并对应部门工作台：${label}`);
}
assert.ok(result.html.includes('当前菜单'), '左侧未显示当前一级菜单对应的二三级导航');
assert.equal(result.html.includes('人力资源部'), false, '默认工作台左侧不应混入其他一级菜单');
assert.deepEqual(JSON.parse(JSON.stringify(result.processCounts)), {
  hr: 31,
  admin: 29,
  audit: 15,
  auditSupportViews: 2,
  it: 10,
  operations: 1,
  starMainLines: 7,
});
assert.equal(result.auditMapping.page, `audit-${result.auditKey}`);
assert.equal(result.auditMapping.department, 'audit');
assert.equal(result.auditMapping.process, `audit:${result.auditKey}`);
assert.ok(result.promotionHtml.includes('宣传内容发布审批'), '经营发展部流程页面未正确渲染');
assert.ok(result.starMenuHtml.includes('蓝图设计基线'), '观星台缺少蓝图设计基线入口');
assert.equal(result.releaseVersion, 'V1.2.0-P1', 'Demo版本信息未更新');
assert.ok(result.blueprintHtml.includes('页面区域'), '蓝图字段表缺少页面区域列');
assert.ok(result.blueprintHtml.includes('值域/校验规则'), '蓝图字段表缺少校验规则列');
assert.ok(result.blueprintHtml.includes('联动/权限'), '蓝图字段表缺少联动权限列');
assert.deepEqual(JSON.parse(JSON.stringify(result.blueprintCoverage)), [
  { id:'metric', fields:7, rules:3, pages:3 },
  { id:'collection', fields:7, rules:3, pages:3 },
  { id:'meeting', fields:7, rules:3, pages:3 },
  { id:'problem', fields:7, rules:3, pages:3 },
  { id:'quality', fields:7, rules:3, pages:3 },
  { id:'risk', fields:7, rules:3, pages:3 },
  { id:'ruleLab', fields:7, rules:3, pages:3 },
], '七条主线蓝图覆盖不完整');

const css = fs.readFileSync('navigation-v2.css', 'utf8');
assert.match(css, /--nav-level-1\s*:\s*15px/);
assert.match(css, /--nav-level-2\s*:\s*13px/);
assert.match(css, /--nav-level-3\s*:\s*12px/);

console.log(JSON.stringify({
  firstLevel: result.firstLevelLabels,
  processCounts: result.processCounts,
  fontSizes: { level1: '15px', level2: '13px', level3: '12px' },
  mapping: 'pass',
  promotionPage: 'pass',
  blueprintCoverage: result.blueprintCoverage,
  releaseVersion: result.releaseVersion,
}, null, 2));
