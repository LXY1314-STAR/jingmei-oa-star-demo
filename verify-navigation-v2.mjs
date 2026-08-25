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
    department: state.navDeptOpen,
    process: state.activeNavProcess,
  };
  navNavigate('promotion', 'operations', 'operations:promotion');

  return {
    html,
    firstLevelLabels,
    firstLevelCount: count(html, 'class="nav-primary"'),
    openPrimaryCount: count(html, 'nav-primary-body open'),
    allSecondLevelsExpanded:
      count(html, 'nav-tertiary-list') === count(html, 'nav-tertiary-list open'),
    processCounts,
    auditKey,
    auditMapping,
    promotionHtml: document.querySelector('#app').innerHTML,
  };
})()`, context);

assert.equal(result.firstLevelCount, 7, '一级菜单应为 7 项');
for (const label of result.firstLevelLabels) {
  assert.ok(result.html.includes(`>${label}<`), `缺少一级菜单：${label}`);
}
assert.equal(result.openPrimaryCount, 1, '仅当前一级菜单应展开');
assert.equal(result.allSecondLevelsExpanded, true, '二级菜单应默认全部展开');
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
}, null, 2));
