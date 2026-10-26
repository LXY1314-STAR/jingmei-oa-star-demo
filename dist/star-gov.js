/* ===== 观星台 · 指标治理 / 多维筛选 / 会议治理 / 数据资产目录 / 风险治理 ===== */
/* 覆盖 SOW STAR-F-004/005/006/007/019/023/025/033/043/045/049 的 Demo 实现。 */

state.mgTab = state.mgTab || 'version';
state.mgMetric = state.mgMetric || 'MET-002';
state.sfOrg = state.sfOrg || '全部';
state.sfBusiness = state.sfBusiness || '全部';
state.sfProduct = state.sfProduct || '全部';
state.sfCustomer = state.sfCustomer || '全部';
state.sfPeriod = state.sfPeriod || '2026-08';
state.mtgTab = state.mtgTab || 'config';
state.mtgScene = state.mtgScene || '月度经营分析会';
state.mtgParts = state.mtgParts || ['theme', 'kpis', 'trend', 'issues', 'todos', 'snapshot'];
state.acQuery = state.acQuery || '';
state.acType = state.acType || '全部';
state.acLevel = state.acLevel || '全部';
state.rgTab = state.rgTab || 'scenario';
state.rgCategory = state.rgCategory || '全部';

/* ---------- 指标治理：数据 ---------- */

const MG_VERSIONS = [
  { id: 'V-001', metric: '产值完成率', code: 'STAR-M-006', version: 'V1.6', status: '已生效', reason: '口径调整为合格完工产值 ÷ 计划产值', scope: '驾驶舱 / 经营简报 / 会议快照', range: '2026-07-01 起', owner: '生产管理部' },
  { id: 'V-002', metric: '产值完成率', code: 'STAR-M-006', version: 'V1.7', status: '待审批', reason: '新增产线维度并调整阈值', scope: '指挥看板 / 异常视图', range: '拟 2026-09-01', owner: '生产管理部' },
  { id: 'V-003', metric: '营业收入', code: 'STAR-M-001', version: 'V2.1', status: '已生效', reason: '收入口径与财务月结对齐', scope: '驾驶舱 / 经营简报', range: '2026-06-01 起', owner: '财务部' },
  { id: 'V-004', metric: '库存周转天数', code: 'STAR-M-011', version: 'V1.3', status: '已生效', reason: '出库成本按移动加权平均', scope: '供应链分析 / 驾驶舱', range: '2026-05-01 起', owner: '供应链管理部' }
];

const MG_TARGETS = [
  { id: 'T-01', metric: '产值完成率', org: '生产管理部', period: '2026-08', target: '100%', yellow: '< 95%', red: '< 90%', rule: '低于目标 5 个百分点黄灯，低于 10 个百分点红灯' },
  { id: 'T-02', metric: '产值完成率', org: '印刷一车间', period: '2026-08', target: '100%', yellow: '< 96%', red: '< 92%', rule: '按车间计划产值单独设置阈值' },
  { id: 'T-03', metric: '营业收入', org: '公司', period: '2026-08', target: '8,700 万元', yellow: '< 96%', red: '< 92%', rule: '月度收入目标按年度预算分解' },
  { id: 'T-04', metric: '库存周转天数', org: '供应链管理部', period: '2026-08', target: '38 天', yellow: '> 40 天', red: '> 45 天', rule: '周转天数越高越异常，反向阈值' }
];

const MG_COMPARE = [
  { metric: '产值完成率', cur: '93.8%', prev: '95.1%', mom: '-1.3 pt', last: '92.1%', yoy: '+1.7 pt', cum: '95.6%', achieve: '93.8%', dev: '-6.2 pt' },
  { metric: '营业收入', cur: '8,426 万元', prev: '8,180 万元', mom: '+3.0%', last: '7,990 万元', yoy: '+5.5%', cum: '64,320 万元', achieve: '96.8%', dev: '-3.2%' },
  { metric: '库存周转天数', cur: '42.6 天', prev: '41.8 天', mom: '+0.8 天', last: '37.8 天', yoy: '+4.8 天', cum: '41.2 天', achieve: '89.2%', dev: '+4.6 天' }
];

const MG_MATRIX_ROLES = ['业务部门', '经营发展部', '信息工程部', '审计监督部', '数据责任人'];
const MG_MATRIX = [
  { duty: '指标提出', marks: ['R', 'C', 'I', '', ''] },
  { duty: '口径确认', marks: ['C', 'R', 'C', 'I', 'C'] },
  { duty: '数据提供', marks: ['I', 'I', 'R', 'I', 'R'] },
  { duty: '质量核验', marks: ['I', 'C', 'R', 'A', 'C'] },
  { duty: '指标发布', marks: ['I', 'A', 'R', 'C', 'I'] },
  { duty: '指标使用', marks: ['R', 'R', 'I', 'C', 'I'] }
];

/* ---------- 多维筛选：数据 ---------- */

const SF_ROWS = [
  { metric: '营业收入', org: '财务部', business: '印刷', product: '精品盒', customer: '华东区', period: '2026-08', value: '8,426 万元', target: '8,700 万元', state: '关注' },
  { metric: '产值完成率', org: '生产管理部', business: '印刷', product: '精品盒', customer: '华东区', period: '2026-08', value: '93.8%', target: '100%', state: '预警' },
  { metric: '产值完成率', org: '生产管理部', business: '包装', product: '彩箱', customer: '华南区', period: '2026-08', value: '95.4%', target: '100%', state: '关注' },
  { metric: '库存周转天数', org: '供应链管理部', business: '包装', product: '标签', customer: '集团内部', period: '2026-08', value: '42.6 天', target: '38 天', state: '预警' },
  { metric: '订单蓄水', org: '经营发展部', business: '印刷', product: '说明书', customer: '华南区', period: '2026-08', value: '18,600 万元', target: '18,000 万元', state: '正常' },
  { metric: '营业收入', org: '财务部', business: '印刷', product: '精品盒', customer: '华东区', period: '2026-07', value: '8,180 万元', target: '8,550 万元', state: '关注' },
  { metric: '产值完成率', org: '生产管理部', business: '印刷', product: '精品盒', customer: '华东区', period: '2026-07', value: '95.1%', target: '100%', state: '正常' },
  { metric: '库存周转天数', org: '供应链管理部', business: '包装', product: '标签', customer: '集团内部', period: '2026-07', value: '41.8 天', target: '38 天', state: '关注' },
  { metric: '营业收入', org: '财务部', business: '包装', product: '彩箱', customer: '华南区', period: '2026-08', value: '6,312 万元', target: '6,500 万元', state: '关注' },
  { metric: '订单蓄水', org: '经营发展部', business: '包装', product: '彩箱', customer: '华南区', period: '2026-07', value: '17,900 万元', target: '17,500 万元', state: '正常' }
];

/* ---------- 会议治理：数据 ---------- */

const MTG_PART_DEFS = [
  { key: 'theme', name: '会议主题', desc: '月度经营分析会主题与数据期间' },
  { key: 'kpis', name: '核心指标', desc: '8 项经营指标卡与目标达成' },
  { key: 'trend', name: '趋势图表', desc: '产值、收入 8 个月趋势' },
  { key: 'issues', name: '问题清单', desc: '未关闭经营问题 4 项' },
  { key: 'todos', name: '待办事项', desc: 'OA 联动责任待办 7 项' },
  { key: 'snapshot', name: '数据快照', desc: 'STAR-SNAPSHOT-202608-01' }
];

const MTG_PREP = [
  { id: 'P-01', org: '生产管理部', item: '产值完成率低于计划 6.2%', reason: true, measure: true, forecast: false, reminded: false },
  { id: 'P-02', org: '供应链管理部', item: '库存周转天数环比上升 4.8 天', reason: true, measure: false, forecast: false, reminded: false },
  { id: 'P-03', org: '财务部', item: '制造费用超预算预警', reason: false, measure: false, forecast: false, reminded: false },
  { id: 'P-04', org: '经营发展部', item: '重点客户交付准时率下降', reason: true, measure: true, forecast: true, reminded: false }
];

/* ---------- 数据资产目录：数据 ---------- */

const AC_ASSETS = [
  { id: 'DA-001', name: '完工报工明细', type: '数据集', parent: '生产经营主题', owner: '生产管理部', freq: '日', level: '内部', metric: 'MET-002', lineage: 'MES → ODS → DWD → 指标' },
  { id: 'DA-002', name: '销售收入明细', type: '表', parent: '财务主题', owner: '财务部', freq: '日', level: '敏感', metric: 'MET-001', lineage: 'ERP → ODS → DWD → 指标' },
  { id: 'DA-003', name: '库存收发存', type: '表', parent: '供应链主题', owner: '供应链管理部', freq: '日', level: '内部', metric: 'MET-011', lineage: 'ERP → ODS → DWD → 指标' },
  { id: 'DA-004', name: '供应商统一社会信用代码', type: '字段', parent: '供应商主数据', owner: '采购部', freq: '周', level: '公开', metric: 'DQ-202608-004', lineage: 'SRM → MDM → 质量规则' },
  { id: 'DA-005', name: '月度经营简报', type: '报表', parent: '经营简报', owner: '经营发展部', freq: '月', level: '内部', metric: 'BRIEF-202608', lineage: '指标 → 简报模板 → 会议快照' },
  { id: 'DA-006', name: '员工组织岗位有效性', type: '字段', parent: 'HR 员工主数据', owner: '人力资源部', freq: '日', level: '敏感', metric: 'DQ-202608-002', lineage: 'HR → MDM → 质量规则' },
  { id: 'DA-007', name: '能源计量点读数', type: '数据集', parent: '能源主题', owner: '设备动力部', freq: '小时', level: '内部', metric: 'ENERGY-001', lineage: '计量 → 采集 → 主题 → 指标' }
];

/* ---------- 风险治理：数据 ---------- */

const RG_SCENARIOS = [
  { id: 'RS-01', name: '逾期应收', category: '财务', source: 'ERP 应收', threshold: '逾期 > 30 天且金额 > 50 万', rule: '规则 R-AR-01', org: '财务部', version: 'V1.2', status: '启用' },
  { id: 'RS-02', name: '长期票据 / 往来', category: '财务', source: 'ERP 票据 / 往来', threshold: '账龄 > 180 天', rule: '规则 R-NOTE-02', org: '财务部', version: 'V1.1', status: '启用' },
  { id: 'RS-03', name: '设备超期维保', category: '生产设备', source: 'EHS / 设备台账', threshold: '超过维保周期 7 天', rule: '规则 R-EQ-03', org: '设备动力部', version: 'V1.3', status: '启用' },
  { id: 'RS-04', name: '工艺参数偏差', category: '生产设备', source: 'MES 报工 / 参数', threshold: '偏差 > 控制限 3σ', rule: '模型 M-PARAM-01', org: '生产管理部', version: 'V1.0', status: '试运行' },
  { id: 'RS-05', name: '审批超时', category: '流程合规', source: 'OA 流程实例', threshold: '超过节点时限 48 小时', rule: '规则 R-WF-05', org: '党政综合办', version: 'V1.1', status: '启用' },
  { id: 'RS-06', name: '归档遗漏', category: '流程合规', source: 'OA 档案库', threshold: '办结 30 天未归档', rule: '规则 R-ARC-06', org: '党政综合办', version: 'V1.0', status: '停用' }
];

const RG_HIDDEN = [
  { id: 'HR-01', scenario: '逾期应收', object: '华东区域包装材料应收', basis: '账龄 90 天，金额 126 万元', time: '2026-08-25 08:10', level: '高', status: '待转审核' },
  { id: 'HR-02', scenario: '长期票据 / 往来', object: '某客户商业承兑票据', basis: '账龄 210 天，余额 86 万元', time: '2026-08-25 08:12', level: '高', status: '待转审核' },
  { id: 'HR-03', scenario: '设备超期维保', object: '模切机 MC-03', basis: '超维保周期 12 天', time: '2026-08-25 08:15', level: '中', status: '待转审核' },
  { id: 'HR-04', scenario: '工艺参数偏差', object: '印刷二车间 8 月 24 日夜班', basis: '套印偏差连续 3 批次超控制限', time: '2026-08-25 08:18', level: '中', status: '已转审核' },
  { id: 'HR-05', scenario: '审批超时', object: '包装材料采购合同会签', basis: '会签节点超时 52 小时', time: '2026-08-25 08:20', level: '低', status: '待转审核' },
  { id: 'HR-06', scenario: '归档遗漏', object: '2026-07 用印申请单', basis: '办结 41 天未归档', time: '2026-08-25 08:22', level: '低', status: '待转审核' }
];

const RG_DASH = [
  { unit: '印刷一车间', manual: 2, ai: 3, pending: 1, fixing: 2, overdue: 0, closed: 5 },
  { unit: '印刷二车间', manual: 3, ai: 4, pending: 2, fixing: 2, overdue: 1, closed: 6 },
  { unit: '后加工车间', manual: 2, ai: 2, pending: 1, fixing: 1, overdue: 0, closed: 4 },
  { unit: '供应链管理部', manual: 3, ai: 5, pending: 2, fixing: 2, overdue: 1, closed: 4 },
  { unit: '财务部', manual: 2, ai: 4, pending: 1, fixing: 2, overdue: 1, closed: 2 }
];

/* ---------- 公共 ---------- */

function govHero(kicker, title, desc, tone) {
  return '<div class="gov-hero ' + (tone || '') + '"><div><span class="eyebrow">' + kicker + '</span><h2>' + title + '</h2><p>' + desc + '</p></div><div class="gov-hero-note">数据为 Demo 模拟<br>刷新后恢复基线</div></div>';
}

function govKpis(items) {
  return '<div class="stat-row">' + items.map(function (x) {
    return '<div class="stat"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>';
  }).join('') + '</div>';
}

function govTab(tab, label, current, fn) {
  return '<button class="' + (current === tab ? 'active' : '') + '" onclick="' + fn + "('" + tab + "')" + '">' + label + '</button>';
}

/* ---------- 指标治理 ---------- */

function metricGovPage() {
  const tabs = [['version', '版本与生效'], ['target', '目标与阈值'], ['compare', '同比环比'], ['matrix', '责任矩阵']];
  const tabHtml = '<div class="tabs">' + tabs.map(function (x) { return govTab(x[0], x[1], state.mgTab, 'setMgTab'); }).join('') + '</div>';
  let body = mgVersionView();
  if (state.mgTab === 'target') body = mgTargetView();
  if (state.mgTab === 'compare') body = mgCompareView();
  if (state.mgTab === 'matrix') body = mgMatrixView();
  const content = govHero('观星台 · 指标管理', '版本、目标阈值、计算规则与责任统一维护',
    '指标新增、变更、停用经审批后生效；目标、阈值、同比环比口径和责任矩阵在同一处维护，页面按版本引用。', 'gov-tone-blue') +
    govKpis([['3', '在用指标'], ['1', '待审批版本'], ['4', '目标阈值规则'], ['6', '责任类型']]) + tabHtml + body;
  return shell(content, '指标管理', '指标版本、目标阈值、计算规则与责任矩阵统一维护。', '<button class="secondary" onclick="toast(\'规则已导出为演示文件\')">导出规则</button>');
}

function setMgTab(tab) { state.mgTab = tab; render(); }

function mgVersionView() {
  const rows = MG_VERSIONS.map(function (v) {
    const act = v.status === '待审批'
      ? '<button class="primary" onclick="approveVersion(\'' + v.id + '\')">审批生效</button>'
      : '<button class="link" onclick="toast(\'历史版本与变更依据已保留\')">查看依据</button>';
    return '<tr><td><b>' + v.code + '</b><small>' + v.metric + '</small></td><td>' + v.version + '</td><td>' + badge(v.status) + '</td><td>' + v.reason + '</td><td>' + v.scope + '</td><td>' + v.range + '</td><td>' + v.owner + '</td><td>' + act + '</td></tr>';
  }).join('');
  return '<div class="toolbar"><span class="context-label">指标新增、变更、停用均走版本流程：提交变更原因和影响范围，经审批后生成新版本并设置生效区间。</span><span class="spacer"></span><button class="primary" onclick="openVersionForm()">+ 提交指标变更</button></div>' +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>指标</th><th>版本</th><th>状态</th><th>变更原因</th><th>影响范围</th><th>生效区间</th><th>责任部门</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="context-tip"><b>版本规则：</b>发布后的指标供报表、页面、预警和会议场景统一引用；历史版本保留，报表按数据期间引用对应版本。</div>';
}

function approveVersion(id) {
  const v = MG_VERSIONS.find(function (x) { return x.id === id; });
  if (!v) return;
  v.status = '已生效';
  v.range = '2026-09-01 起';
  toast(v.code + ' ' + v.version + ' 已审批生效，影响范围已通知引用方');
  render();
}

function openVersionForm() {
  const body = '<div class="form-grid"><div class="field"><label>指标</label><select id="mgvMetric"><option>产值完成率</option><option>营业收入</option><option>库存周转天数</option></select></div>' +
    '<div class="field"><label>变更类型</label><select id="mgvType"><option>口径变更</option><option>新增维度</option><option>停用</option></select></div>' +
    '<div class="field full"><label>变更原因</label><textarea id="mgvReason">调整统计口径，新增产线维度并同步阈值规则。</textarea></div>' +
    '<div class="field full"><label>影响范围</label><input id="mgvScope" value="驾驶舱 / 指挥看板 / 异常视图"></div>' +
    '<div class="field"><label>拟生效日期</label><input type="date" id="mgvDate" value="2026-09-01"></div></div>';
  openModal('提交指标变更', body, '<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="submitVersion()">提交审批</button>');
}

function submitVersion() {
  const metric = $('#mgvMetric').value, reason = $('#mgvReason').value.trim(), scope = $('#mgvScope').value.trim(), date = $('#mgvDate').value;
  if (!reason || !scope) { toast('请填写变更原因和影响范围'); return; }
  const seq = MG_VERSIONS.length + 1;
  MG_VERSIONS.unshift({ id: 'V-' + String(seq).padStart(3, '0'), metric: metric, code: metric === '营业收入' ? 'STAR-M-001' : metric === '库存周转天数' ? 'STAR-M-011' : 'STAR-M-006', version: 'V1.8', status: '待审批', reason: reason, scope: scope, range: '拟 ' + date, owner: metric === '营业收入' ? '财务部' : '生产管理部' });
  closeModal(); state.mgTab = 'version'; render(); toast('变更已提交，等待审批生效');
}

function mgTargetView() {
  const rows = MG_TARGETS.map(function (t) {
    return '<tr><td><b>' + t.metric + '</b></td><td>' + t.org + '</td><td>' + t.period + '</td><td>' + t.target + '</td><td>' + t.yellow + '</td><td>' + t.red + '</td><td>' + t.rule + '</td><td><button class="link" onclick="openTargetForm(\'' + t.id + '\')">维护</button></td></tr>';
  }).join('');
  return '<div class="toolbar"><span class="context-label">按组织、期间和指标维护目标值、黄色/红色阈值及判断规则；反向指标（如周转天数）支持"越高越异常"。</span><span class="spacer"></span><button class="primary" onclick="openTargetForm()">+ 新增目标</button></div>' +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>指标</th><th>组织</th><th>期间</th><th>目标值</th><th>黄色阈值</th><th>红色阈值</th><th>判断规则</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="context-tip"><b>红黄绿规则：</b>绿灯为达成目标；黄灯为低于目标 5 个百分点或进入预警阈值；红灯为低于目标 10 个百分点或触发红色阈值。阈值随指标版本生效。</div>';
}

function openTargetForm(id) {
  const t = id ? MG_TARGETS.find(function (x) { return x.id === id; }) : null;
  const body = '<div class="form-grid"><div class="field"><label>指标</label><select id="mgtMetric"><option ' + (t && t.metric === '产值完成率' ? 'selected' : '') + '>产值完成率</option><option ' + (t && t.metric === '营业收入' ? 'selected' : '') + '>营业收入</option><option ' + (t && t.metric === '库存周转天数' ? 'selected' : '') + '>库存周转天数</option></select></div>' +
    '<div class="field"><label>组织</label><input id="mgtOrg" value="' + (t ? t.org : '生产管理部') + '"></div>' +
    '<div class="field"><label>期间</label><input id="mgtPeriod" value="' + (t ? t.period : '2026-08') + '"></div>' +
    '<div class="field"><label>目标值</label><input id="mgtTarget" value="' + (t ? t.target : '100%') + '"></div>' +
    '<div class="field"><label>黄色阈值</label><input id="mgtYellow" value="' + (t ? t.yellow : '< 95%') + '"></div>' +
    '<div class="field"><label>红色阈值</label><input id="mgtRed" value="' + (t ? t.red : '< 90%') + '"></div>' +
    '<div class="field full"><label>判断规则</label><textarea id="mgtRule">' + (t ? t.rule : '低于目标 5 个百分点黄灯，低于 10 个百分点红灯') + '</textarea></div></div>';
  openModal(t ? '维护目标与阈值 · ' + t.id : '新增目标与阈值', body, '<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="saveTarget(\'' + (id || '') + '\')">保存</button>');
}

function saveTarget(id) {
  const data = { metric: $('#mgtMetric').value, org: $('#mgtOrg').value.trim(), period: $('#mgtPeriod').value.trim(), target: $('#mgtTarget').value.trim(), yellow: $('#mgtYellow').value.trim(), red: $('#mgtRed').value.trim(), rule: $('#mgtRule').value.trim() };
  if (!data.org || !data.target || !data.yellow || !data.red) { toast('请完整填写组织、目标和阈值'); return; }
  if (id) {
    const t = MG_TARGETS.find(function (x) { return x.id === id; });
    Object.assign(t, data);
  } else {
    MG_TARGETS.push(Object.assign({ id: 'T-' + String(MG_TARGETS.length + 1).padStart(2, '0') }, data));
  }
  closeModal(); state.mgTab = 'target'; render(); toast('目标与阈值已保存，按指标版本生效');
}

function mgCompareView() {
  const formulas = [
    ['同比', '(本期 − 去年同期) ÷ 去年同期 × 100%', '消除季节性影响，默认按自然月对齐'],
    ['环比', '(本期 − 上期) ÷ 上期 × 100%', '反映短期变化，默认对比上一统计周期'],
    ['累计', '本期及以前各期实际值之和', '按数据期间累计，跨年重置'],
    ['达成率', '实际值 ÷ 目标值 × 100%', '目标值取同组织、同期间生效版本'],
    ['偏差率', '(实际值 − 目标值) ÷ 目标值 × 100%', '负值为未达目标，用于红黄绿判断']
  ];
  const rows = MG_COMPARE.map(function (x) {
    return '<tr><td><b>' + x.metric + '</b></td><td>' + x.cur + '</td><td>' + x.prev + '</td><td>' + x.mom + '</td><td>' + x.last + '</td><td>' + x.yoy + '</td><td>' + x.cum + '</td><td>' + x.achieve + '</td><td>' + x.dev + '</td></tr>';
  }).join('');
  return '<div class="gov-formula-grid">' + formulas.map(function (f) {
    return '<div class="gov-formula"><b>' + f[0] + '</b><code>' + f[1] + '</code><span>' + f[2] + '</span></div>';
  }).join('') + '</div>' +
    '<div class="toolbar top-gap"><span class="context-label">所有页面、简报和会议引用同一套计算规则，避免逐页重复定义。</span><span class="spacer"></span><button class="secondary" onclick="toast(\'计算规则已发布到指标版本 V1.6\')">发布计算规则</button></div>' +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>指标</th><th>本期</th><th>上期</th><th>环比</th><th>去年同期</th><th>同比</th><th>累计</th><th>达成率</th><th>偏差率</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
}

function mgMatrixView() {
  const head = '<tr><th>责任类型</th>' + MG_MATRIX_ROLES.map(function (r) { return '<th>' + r + '</th>'; }).join('') + '</tr>';
  const rows = MG_MATRIX.map(function (m) {
    return '<tr><td><b>' + m.duty + '</b></td>' + m.marks.map(function (k) {
      return '<td class="mx-cell mx-' + (k || 'none').toLowerCase() + '">' + (k || '—') + '</td>';
    }).join('') + '</tr>';
  }).join('');
  return '<div class="toolbar"><span class="context-label">责任矩阵明确指标提出、口径确认、数据提供、质量核验、发布和使用的责任角色。</span><span class="spacer"></span><select class="gov-select" onchange="toast(\'已切换指标：\' + this.value)"><option>产值完成率 STAR-M-006</option><option>营业收入 STAR-M-001</option><option>库存周转天数 STAR-M-011</option></select></div>' +
    '<div class="table-card"><table class="gov-table gov-matrix"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="gov-legend"><span class="mx-r">R</span> 负责执行 <span class="mx-a">A</span> 审批确认 <span class="mx-c">C</span> 协作配合 <span class="mx-i">I</span> 知会</div>' +
    '<div class="context-tip"><b>矩阵维护：</b>责任矩阵随指标版本发布；口径确认由经营发展部负责，质量核验由审计监督部审批。</div>';
}

/* ---------- 多维筛选（嵌入经营驾驶舱） ---------- */

function sfOpts(key, values, current) {
  return '<select class="gov-select" onchange="setSf(\'' + key + '\', this.value)">' + ['全部'].concat(values).map(function (v) {
    return '<option ' + (current === v ? 'selected' : '') + '>' + v + '</option>';
  }).join('') + '</select>';
}

function sfFilterBar() {
  return '<div class="gov-filter-bar gov-filter-bar-inline">' +
    '<b class="gov-filter-title">多维筛选</b>' +
    sfOpts('sfOrg', ['财务部', '生产管理部', '供应链管理部', '经营发展部'], state.sfOrg) +
    sfOpts('sfBusiness', ['印刷', '包装'], state.sfBusiness) +
    sfOpts('sfProduct', ['精品盒', '彩箱', '标签', '说明书'], state.sfProduct) +
    sfOpts('sfCustomer', ['华东区', '华南区', '集团内部'], state.sfCustomer) +
    sfOpts('sfPeriod', ['2026-08', '2026-07'], state.sfPeriod) +
    '<button class="secondary" onclick="resetSf()">重置</button>' +
    '<span class="gov-filter-hint">指标卡按组织筛选 · 明细按全部维度 · 口径 V1.6</span></div>';
}

function sfRowsFiltered() {
  return SF_ROWS.filter(function (r) {
    return (state.sfOrg === '全部' || r.org === state.sfOrg) &&
      (state.sfBusiness === '全部' || r.business === state.sfBusiness) &&
      (state.sfProduct === '全部' || r.product === state.sfProduct) &&
      (state.sfCustomer === '全部' || r.customer === state.sfCustomer) &&
      (state.sfPeriod === '全部' || r.period === state.sfPeriod);
  });
}

function sfResultSection() {
  const rows = sfRowsFiltered();
  const body = rows.length ? rows.map(function (r) {
    return '<tr><td><b>' + r.metric + '</b></td><td>' + r.org + '</td><td>' + r.business + '</td><td>' + r.product + '</td><td>' + r.customer + '</td><td>' + r.period + '</td><td>' + r.value + '</td><td>' + r.target + '</td><td>' + badge(r.state) + '</td></tr>';
  }).join('') : '<tr><td colspan="9"><div class="empty compact">当前筛选条件下没有指标记录。</div></td></tr>';
  return '<section class="card top-gap"><div class="card-h"><div><h2>多维筛选结果</h2><span class="meta">筛选只改变数据范围，不改变指标编码、版本和计算公式</span></div><span class="meta">共 ' + rows.length + ' 条 · 口径 V1.6</span></div>' +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>指标</th><th>组织</th><th>业务</th><th>产品</th><th>客户</th><th>期间</th><th>当前值</th><th>目标</th><th>状态</th></tr></thead><tbody>' + body + '</tbody></table></div></section>';
}

function setSf(key, value) { state[key] = value; render(); }
function resetSf() { state.sfOrg = '全部'; state.sfBusiness = '全部'; state.sfProduct = '全部'; state.sfCustomer = '全部'; state.sfPeriod = '2026-08'; render(); }

/* ---------- 会议治理 ---------- */

function meetingGovPage() {
  const tabs = [['config', '场景配置'], ['prep', '会前准备']];
  const tabHtml = '<div class="tabs">' + tabs.map(function (x) { return govTab(x[0], x[1], state.mtgTab, 'setMtgTab'); }).join('') + '</div>';
  const body = state.mtgTab === 'config' ? mtgConfigView() : mtgPrepView();
  const content = govHero('观星台 · 会议场景', '会议界面按主题、指标、图表、问题与待办自由组合',
    '将月度经营分析会所需的主题、指标、图表、问题清单和待办固化为工作界面；会前逐部门补齐异常原因、措施和预测。', 'gov-tone-amber') +
    tabHtml + body;
  return shell(content, '会议场景', '自主组合会议场景，并跟踪会前准备完整性。', '<button class="secondary" onclick="toast(\'会议场景配置已导出\')">导出配置</button>');
}

function setMtgTab(tab) { state.mtgTab = tab; render(); }

function mtgConfigView() {
  const parts = MTG_PART_DEFS.map(function (p) {
    const on = state.mtgParts.indexOf(p.key) >= 0;
    return '<button class="gov-part ' + (on ? 'active' : '') + '" onclick="toggleMtgPart(\'' + p.key + '\')"><b>' + p.name + '</b><span>' + p.desc + '</span><em>' + (on ? '已纳入' : '未纳入') + '</em></button>';
  }).join('');
  const has = function (k) { return state.mtgParts.indexOf(k) >= 0; };
  const preview = '<div class="gov-preview">' +
    (has('theme') ? '<div class="gov-preview-head"><span>会议主题</span><h3>' + state.mtgScene + ' · 2026 年 8 月</h3><small>数据快照 STAR-SNAPSHOT-202608-01</small></div>' : '') +
    (has('kpis') ? '<div class="gov-preview-kpis">' + ['营业收入 8,426 万元', '产值完成率 93.8%', '库存周转 42.6 天', '订单蓄水 18,600 万元'].map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' : '') +
    (has('trend') ? '<div class="gov-preview-block"><b>趋势图表</b><div class="gov-bars"><i style="height:62%"></i><i style="height:70%"></i><i style="height:66%"></i><i style="height:74%"></i><i style="height:71%"></i><i style="height:78%"></i><i style="height:75%"></i><i style="height:72%"></i></div></div>' : '') +
    (has('issues') ? '<div class="gov-preview-block"><b>问题清单 · 4 项</b><p>产值完成率低于计划 6.2%</p><p>库存周转天数环比上升 4.8 天</p></div>' : '') +
    (has('todos') ? '<div class="gov-preview-block"><b>待办事项 · 7 项</b><p>生产管理部 3 项 · 供应链管理部 2 项 · 财务部 2 项</p></div>' : '') +
    (has('snapshot') ? '<div class="gov-preview-foot">数据快照已冻结 · 会议决策引用该版本</div>' : '') +
    '</div>';
  return '<div class="toolbar"><span class="context-label">选择会议场景，勾选需要固化的组件，右侧实时预览工作界面。</span><span class="spacer"></span><select class="gov-select" onchange="state.mtgScene=this.value;render()"><option>月度经营分析会</option><option>生产交付专题会</option><option>采购成本专题会</option></select><button class="primary" onclick="saveMtgScene()">保存场景配置</button></div>' +
    '<div class="gov-scene-layout"><div class="gov-parts">' + parts + '</div>' + preview + '</div>' +
    '<div class="context-tip"><b>配置规则：</b>场景配置保存为版本，会议快照按当次配置冻结；后续指标或图表调整不改变已冻结会议的依据。</div>';
}

function toggleMtgPart(key) {
  const i = state.mtgParts.indexOf(key);
  if (i >= 0) state.mtgParts.splice(i, 1); else state.mtgParts.push(key);
  render();
}

function saveMtgScene() {
  if (!state.mtgParts.length) { toast('至少选择一个会议组件'); return; }
  toast(state.mtgScene + ' 配置已保存，共 ' + state.mtgParts.length + ' 个组件');
}

function mtgPrepView() {
  const rows = MTG_PREP.map(function (p) {
    const missing = [!p.reason, !p.measure, !p.forecast].filter(Boolean).length;
    const status = missing === 0 ? '已齐全' : '缺失 ' + missing + ' 项';
    return '<tr><td><b>' + p.org + '</b></td><td>' + p.item + '</td><td>' + (p.reason ? '<span class="gov-check ok">已补</span>' : '<span class="gov-check miss">缺失</span>') + '</td><td>' + (p.measure ? '<span class="gov-check ok">已补</span>' : '<span class="gov-check miss">缺失</span>') + '</td><td>' + (p.forecast ? '<span class="gov-check ok">已补</span>' : '<span class="gov-check miss">缺失</span>') + '</td><td>' + badge(status) + '</td><td><button class="link" onclick="openPrepForm(\'' + p.id + '\')">补充</button> <button class="link" onclick="remindPrep(\'' + p.id + '\')">' + (p.reminded ? '已提醒' : '提醒') + '</button></td></tr>';
  }).join('');
  const totalMissing = MTG_PREP.reduce(function (n, p) { return n + [!p.reason, !p.measure, !p.forecast].filter(Boolean).length; }, 0);
  return '<div class="toolbar"><span class="context-label">会前提醒责任部门补充异常原因、改进措施和预测信息，缺失项在会议材料中标记。</span><span class="spacer"></span><button class="secondary" onclick="remindAllPrep()">一键提醒缺失部门</button><button class="primary" onclick="toast(\'会前准备清单已发布到会议材料\')">发布准备清单</button></div>' +
    govKpis([[String(MTG_PREP.length), '应准备部门/事项'], [String(MTG_PREP.length * 3 - totalMissing), '已补充材料'], [String(totalMissing), '缺失材料']]) +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>责任部门</th><th>异常事项</th><th>原因说明</th><th>改进措施</th><th>预测信息</th><th>状态</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="context-tip"><b>缺失标记：</b>缺失项在会议议题中显示黄色标记，责任部门补充后自动更新；连续两期缺失进入会议督办。</div>';
}

function openPrepForm(id) {
  const p = MTG_PREP.find(function (x) { return x.id === id; });
  const body = '<div class="form-grid"><div class="field full"><label>异常原因</label><textarea id="prepReason">' + (p.reason ? '已补充：设备停机与订单换版影响有效生产时长。' : '') + '</textarea></div>' +
    '<div class="field full"><label>改进措施</label><textarea id="prepMeasure">' + (p.measure ? '已补充：调整排产并完成设备专项点检。' : '') + '</textarea></div>' +
    '<div class="field full"><label>预测信息</label><textarea id="prepForecast">' + (p.forecast ? '已补充：预计 9 月恢复至 96% 以上。' : '') + '</textarea></div></div>';
  openModal('会前准备 · ' + p.org, body, '<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="savePrep(\'' + id + '\')">保存补充</button>');
}

function savePrep(id) {
  const p = MTG_PREP.find(function (x) { return x.id === id; });
  p.reason = !!$('#prepReason').value.trim();
  p.measure = !!$('#prepMeasure').value.trim();
  p.forecast = !!$('#prepForecast').value.trim();
  closeModal(); render(); toast(p.org + ' 会前材料已更新');
}

function remindPrep(id) {
  const p = MTG_PREP.find(function (x) { return x.id === id; });
  p.reminded = true; render(); toast('已向 ' + p.org + ' 发送补充提醒');
}

function remindAllPrep() {
  const missing = MTG_PREP.filter(function (p) { return !p.reason || !p.measure || !p.forecast; });
  missing.forEach(function (p) { p.reminded = true; });
  render(); toast('已提醒 ' + missing.length + ' 个缺失部门，提醒记录已留痕');
}

/* ---------- 数据资产目录 ---------- */

function assetCatalogPage() {
  const q = state.acQuery.trim().toLowerCase();
  const rows = AC_ASSETS.filter(function (a) {
    const hit = !q || [a.id, a.name, a.parent, a.owner, a.metric].join(' ').toLowerCase().indexOf(q) >= 0;
    return hit && (state.acType === '全部' || a.type === state.acType) && (state.acLevel === '全部' || a.level === state.acLevel);
  });
  const body = rows.length ? rows.map(function (a) {
    return '<tr><td><b>' + a.id + '</b></td><td><button class="table-link" onclick="openAsset(\'' + a.id + '\')">' + a.name + '</button></td><td>' + a.type + '</td><td>' + a.parent + '</td><td>' + a.owner + '</td><td>' + a.freq + '</td><td>' + badge(a.level === '敏感' ? '敏感' : a.level) + '</td><td>' + a.metric + '</td><td>' + a.lineage + '</td><td><button class="link" onclick="openAsset(\'' + a.id + '\')">查看</button></td></tr>';
  }).join('') : '<tr><td colspan="10"><div class="empty compact">没有符合条件的数据资产。</div></td></tr>';
  const content = govHero('观星台 · 数据治理', '数据资产目录登记数据集、表、字段、指标与报表',
    '按资产类型、安全级别和责任部门登记数据资产，关联指标、血缘和更新频率，作为口径追溯和质量规则的统一入口。', 'gov-tone-green') +
    govKpis([[String(AC_ASSETS.length), '登记资产'], ['2', '敏感级资产'], ['3', '本期待补登记']]) +
    '<div class="gov-filter-bar"><input id="acQuery" value="' + state.acQuery + '" placeholder="资产编号、名称、责任部门或指标" oninput="state.acQuery=this.value;render()"><select class="gov-select" onchange="state.acType=this.value;render()">' + ['全部', '数据集', '表', '字段', '指标', '报表'].map(function (x) { return '<option ' + (state.acType === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select><select class="gov-select" onchange="state.acLevel=this.value;render()">' + ['全部', '公开', '内部', '敏感'].map(function (x) { return '<option ' + (state.acLevel === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select><span class="gov-filter-hint">共 ' + rows.length + ' 项</span></div>' +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>资产编号</th><th>资产名称</th><th>类型</th><th>所属数据集/表</th><th>责任部门</th><th>更新频率</th><th>安全级别</th><th>关联指标</th><th>血缘</th><th>操作</th></tr></thead><tbody>' + body + '</tbody></table></div>' +
    '<div class="context-tip"><b>登记规则：</b>数据资产由责任部门登记、信息工程部审核；敏感级资产需标明授权范围，指标和报表必须关联到具体数据集或表。</div>';
  return shell(content, '数据资产目录', '登记数据集、表、字段、指标、报表及责任、频率和安全级别。', '<button class="primary" onclick="toast(\'新增资产登记表单已打开（Demo）\')">+ 登记数据资产</button>');
}

function openAsset(id) {
  const a = AC_ASSETS.find(function (x) { return x.id === id; });
  if (!a) return;
  const body = '<div class="info-grid">' + info('资产编号', a.id) + info('资产名称', a.name) + info('资产类型', a.type) + info('所属数据集/表', a.parent) + info('责任部门', a.owner) + info('更新频率', a.freq) + info('安全级别', a.level) + info('关联指标', a.metric) + '</div><div class="context-tip"><b>血缘链路：</b>' + a.lineage + '</div>';
  openModal('数据资产 · ' + a.name, body, '<button class="primary" onclick="closeModal()">关闭</button>', true);
}

/* ---------- 风险治理 ---------- */

function riskGovPage() {
  const tabs = [['scenario', '风险场景库'], ['hidden', '隐性风险识别'], ['dashboard', '风险监测看板']];
  const tabHtml = '<div class="tabs">' + tabs.map(function (x) { return govTab(x[0], x[1], state.rgTab, 'setRgTab'); }).join('') + '</div>';
  let body = rgScenarioView();
  if (state.rgTab === 'hidden') body = rgHiddenView();
  if (state.rgTab === 'dashboard') body = rgDashboardView();
  const content = govHero('观星台 · AI 风险识别', '场景库、隐性识别与监测看板统一治理',
    '按财务、生产设备、流程合规维护识别场景；对隐性风险执行识别并进入待审核池；按来源、场景、单位、等级和状态监测风险。', 'gov-tone-red') + tabHtml + body;
  return shell(content, 'AI 风险识别', '风险场景、隐性识别和监测看板。', '<button class="secondary" onclick="toast(\'风险治理数据已导出\')">导出</button>');
}

function setRgTab(tab) { state.rgTab = tab; render(); }

function rgScenarioView() {
  const rows = RG_SCENARIOS.filter(function (s) { return state.rgCategory === '全部' || s.category === state.rgCategory; }).map(function (s) {
    return '<tr><td><b>' + s.id + '</b></td><td>' + s.name + '</td><td>' + s.category + '</td><td>' + s.source + '</td><td>' + s.threshold + '</td><td>' + s.rule + '</td><td>' + s.org + '</td><td>' + s.version + '</td><td>' + badge(s.status) + '</td><td><button class="link" onclick="toggleScenario(\'' + s.id + '\')">' + (s.status === '启用' ? '停用' : '启用') + '</button></td></tr>';
  }).join('');
  const cats = ['全部', '财务', '生产设备', '流程合规'];
  return '<div class="gov-filter-bar">' + cats.map(function (c) {
    return '<button class="gov-chip ' + (state.rgCategory === c ? 'active' : '') + '" onclick="state.rgCategory=\'' + c + '\';render()">' + c + '</button>';
  }).join('') + '<span class="gov-filter-hint">共 ' + (rows.split('<tr>').length - 1) + ' 个场景</span></div>' +
    '<div class="table-card"><table class="gov-table"><thead><tr><th>编号</th><th>场景名称</th><th>类别</th><th>数据源</th><th>阈值</th><th>规则/模型</th><th>适用组织</th><th>生效版本</th><th>状态</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="context-tip"><b>场景规则：</b>风险场景按类别维护数据源、阈值和规则/模型；停用场景保留历史识别结果，不影响已进入待审核池的风险。</div>';
}

function toggleScenario(id) {
  const s = RG_SCENARIOS.find(function (x) { return x.id === id; });
  if (!s) return;
  s.status = s.status === '启用' ? '停用' : '启用';
  render(); toast(s.name + ' 已' + s.status);
}

function rgHiddenView() {
  const rows = RG_HIDDEN.map(function (h) {
    return '<tr><td><b>' + h.id + '</b></td><td>' + h.scenario + '</td><td>' + h.object + '</td><td>' + h.basis + '</td><td>' + h.time + '</td><td>' + badge(h.level + '风险') + '</td><td>' + badge(h.status) + '</td><td>' + (h.status === '待转审核' ? '<button class="link" onclick="promoteHidden(\'' + h.id + '\')">转待审核</button>' : '<span class="muted">已进入风险池</span>') + '</td></tr>';
  }).join('');
  const pending = RG_HIDDEN.filter(function (h) { return h.status === '待转审核'; }).length;
  return govKpis([[String(RG_HIDDEN.length), '本次识别'], ['2', '高风险'], [String(pending), '待转审核']]) +
    '<div class="table-card top-gap"><table class="gov-table"><thead><tr><th>识别编号</th><th>场景</th><th>业务对象</th><th>识别依据</th><th>发生时间</th><th>初步等级</th><th>状态</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="context-tip"><b>识别范围：</b>逾期应收、长期票据/往来、设备超期维保、参数偏差、审批超时和归档遗漏；识别结果先进入待审核池，人工核实后才转为正式风险。</div>';
}

function promoteHidden(id) {
  const h = RG_HIDDEN.find(function (x) { return x.id === id; });
  if (!h) return;
  h.status = '已转审核'; render(); toast(h.id + ' 已转入待审核风险池');
}

function rgDashboardView() {
  const totals = RG_DASH.reduce(function (a, r) {
    ['manual', 'ai', 'pending', 'fixing', 'overdue', 'closed'].forEach(function (k) { a[k] += r[k]; });
    return a;
  }, { manual: 0, ai: 0, pending: 0, fixing: 0, overdue: 0, closed: 0 });
  const kpis = [[String(totals.manual), '人工报送'], [String(totals.ai), 'AI 新增'], [String(totals.pending), '待审核'], [String(totals.fixing), '整改中'], [String(totals.overdue), '逾期'], [String(totals.closed), '已销号']];
  const max = Math.max.apply(null, RG_DASH.map(function (r) { return r.manual + r.ai; }));
  const bars = RG_DASH.map(function (r) {
    const total = r.manual + r.ai;
    return '<div class="gov-bar-row"><span>' + r.unit + '</span><div class="gov-bar"><i class="manual" style="width:' + (r.manual / max * 100) + '%"></i><i class="ai" style="width:' + (r.ai / max * 100) + '%"></i></div><b>' + total + '</b></div>';
  }).join('');
  const rows = RG_DASH.map(function (r) {
    return '<tr><td>' + r.unit + '</td><td>' + r.manual + '</td><td>' + r.ai + '</td><td>' + r.pending + '</td><td>' + r.fixing + '</td><td>' + r.overdue + '</td><td>' + r.closed + '</td></tr>';
  }).join('');
  return govKpis(kpis) +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>来源结构 · 人工报送 vs AI 新增</h2><span class="meta">按归属单位</span></div><div class="gov-bars-legend"><span class="manual">人工报送</span><span class="ai">AI 新增</span></div>' + bars + '</section>' +
    '<section class="card"><div class="card-h"><h2>风险状态分布</h2><span class="meta">当前周期</span></div><div class="gov-donut"><div><b>' + (totals.pending + totals.fixing + totals.overdue) + '</b><span>在办风险</span></div><ul><li>待审核 <b>' + totals.pending + '</b></li><li>整改中 <b>' + totals.fixing + '</b></li><li>逾期 <b>' + totals.overdue + '</b></li><li>已销号 <b>' + totals.closed + '</b></li></ul></div></section></div>' +
    '<div class="table-card top-gap"><table class="gov-table"><thead><tr><th>归属单位</th><th>人工报送</th><th>AI 新增</th><th>待审核</th><th>整改中</th><th>逾期</th><th>已销号</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="context-tip"><b>监测口径：</b>人工报送与 AI 新增分开统计，待审核为尚未确认的候选风险；逾期指超过整改期限仍未关闭的风险。</div>';
}

/* ---------- 路由接管 ---------- */

const renderBeforeStarGov = render;
render = function () {
  const pages = {
    metricGov: metricGovPage,
    meetingGov: meetingGovPage,
    assetCatalog: assetCatalogPage,
    riskGov: riskGovPage
  };
  if (pages[state.page]) {
    $('#app').innerHTML = pages[state.page]();
    return;
  }
  return renderBeforeStarGov();
};
