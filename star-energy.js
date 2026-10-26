/* ===== 观星台 · 能源分析（SOW STAR-F-037 ~ STAR-F-043 / STAR-O-008 / STAR-S-007） ===== */
/* SOW 将能源分析标记为待确认：本页为 Demo 预演，保留采集点、计量层级、映射和口径的确认清单。 */

DEMO_RELEASE.version = 'V1.7.4-ENERGY-dev';
DEMO_RELEASE.scope = '在 V1.7.3 主题数据基础上，新增观星台能源分析 Demo 预演：能源日报、用能去向、用能成本、生产电耗、单件能耗、能源质量、能耗预警和数据准备度；SOW 标记为待确认，不作为生产验收依据。';

state.energyTab = state.energyTab || 'daily';
state.energyMetric = state.energyMetric || 'electricity';
state.energyDestDim = state.energyDestDim || 'org';
state.energyWarningType = state.energyWarningType || '全部类型';
state.energyWarningStatus = state.energyWarningStatus || '全部状态';
state.energyUpdatedAt = state.energyUpdatedAt || '2026-08-20 08:30';

const ENERGY_KPIS = [
  { label: '总用电量', value: '286.4', unit: '万kWh', target: '280.0', delta: '+2.3%', status: '预警', note: '月度计划 280.0 万kWh' },
  { label: '电费', value: '198.6', unit: '万元', target: '192.0', delta: '+3.4%', status: '关注', note: '峰谷电价与需量电费待确认' },
  { label: '用水量', value: '3,860', unit: '吨', target: '4,000', delta: '-3.5%', status: '正常', note: '环比下降 2.1%' },
  { label: '用气量', value: '12,480', unit: 'm³', target: '12,000', delta: '+4.0%', status: '关注', note: '烘干工序用气增加' },
  { label: '综合能耗', value: '486.2', unit: 'tce', target: '475.0', delta: '+2.4%', status: '预警', note: '折标煤系数按国标口径' }
];

const ENERGY_DAILY = [
  { date: '08-14', elec: '13.2', unit: '515', cost: '9.1', water: '182', gas: '580', status: '正常' },
  { date: '08-15', elec: '13.1', unit: '508', cost: '9.0', water: '180', gas: '575', status: '正常' },
  { date: '08-16', elec: '13.4', unit: '522', cost: '9.2', water: '184', gas: '588', status: '正常' },
  { date: '08-17', elec: '13.0', unit: '505', cost: '8.9', water: '178', gas: '570', status: '正常' },
  { date: '08-18', elec: '13.6', unit: '538', cost: '9.4', water: '186', gas: '595', status: '关注' },
  { date: '08-19', elec: '13.2', unit: '512', cost: '9.1', water: '182', gas: '582', status: '正常' },
  { date: '08-20', elec: '13.8', unit: '565', cost: '9.6', water: '176', gas: '610', status: '预警' }
];

const ENERGY_TRENDS = {
  labels: ['08-14', '08-15', '08-16', '08-17', '08-18', '08-19', '08-20'],
  electricity: { label: '用电量', unit: '万kWh', actual: [13.2, 13.1, 13.4, 13.0, 13.6, 13.2, 13.8], plan: [13.0, 13.0, 13.0, 13.0, 13.0, 13.0, 13.0] },
  water: { label: '用水量', unit: '吨', actual: [182, 180, 184, 178, 186, 182, 176], plan: [185, 185, 185, 185, 185, 185, 185] },
  gas: { label: '用气量', unit: 'm³', actual: [580, 575, 588, 570, 595, 582, 610], plan: [585, 585, 585, 585, 585, 585, 585] }
};

const ENERGY_DEST = {
  org: {
    title: '按车间 / 组织',
    headers: ['车间 / 组织', '用电量（万kWh）', '占比', '单位产值电耗（kWh/元）', '状态'],
    rows: [
      ['印刷一车间', '96.2', '33.6%', '0.078', '正常'],
      ['印刷二车间', '78.4', '27.4%', '0.084', '关注'],
      ['后加工车间', '62.8', '21.9%', '0.094', '预警'],
      ['动力 / 空压', '28.6', '10.0%', '—', '关注'],
      ['办公 / 照明', '20.4', '7.1%', '—', '正常']
    ],
    bars: [['印刷一车间', 33.6, '96.2 万kWh'], ['印刷二车间', 27.4, '78.4 万kWh'], ['后加工车间', 21.9, '62.8 万kWh'], ['动力 / 空压', 10.0, '28.6 万kWh'], ['办公 / 照明', 7.1, '20.4 万kWh']],
    insight: '后加工车间单位产值电耗 0.094 kWh/元，高于印刷一车间 0.078；设备空转和停机是主要差异来源。'
  },
  usage: {
    title: '按用途',
    headers: ['用途', '占比', '用电量（万kWh）'],
    rows: [['生产设备', '68%', '194.8'], ['空压 / 动力', '14%', '40.1'], ['空调 / 照明', '10%', '28.6'], ['办公', '5%', '14.3'], ['其他', '3%', '8.6']],
    bars: [['生产设备', 68, '194.8 万kWh'], ['空压 / 动力', 14, '40.1 万kWh'], ['空调 / 照明', 10, '28.6 万kWh'], ['办公', 5, '14.3 万kWh'], ['其他', 3, '8.6 万kWh']],
    insight: '生产设备用电占 68%；空压/动力和空调/照明合计 24%，是错峰和节能改造的重点。'
  },
  company: {
    title: '按公司',
    headers: ['公司', '占比', '用电量（万kWh）'],
    rows: [['精美', '82%', '234.8'], ['丽彩', '8%', '22.9'], ['五彩', '5%', '14.3'], ['欣兴', '3%', '8.6'], ['嘉美', '2%', '5.7']],
    bars: [['精美', 82, '234.8 万kWh'], ['丽彩', 8, '22.9 万kWh'], ['五彩', 5, '14.3 万kWh'], ['欣兴', 3, '8.6 万kWh'], ['嘉美', 2, '5.7 万kWh']],
    insight: '精美本部用电占 82%，与生产任务集中一致；子公司用电按组织维度单独归集。'
  }
};

const ENERGY_PRICES = [
  ['电', '0.693 元/kWh', '峰谷分时 + 需量电费'],
  ['水', '4.20 元/吨', '含污水处理费'],
  ['气', '3.10 元/m³', '天然气']
];
const ENERGY_COST_ROWS = [
  ['印刷一车间', '96.2', '66.7', '0.62', '1.48', '68.80', '230'],
  ['印刷二车间', '78.4', '54.3', '0.48', '1.20', '55.98', '241'],
  ['后加工车间', '62.8', '43.5', '0.35', '0.82', '44.67', '270'],
  ['动力 / 空压', '28.6', '19.8', '0.12', '0.25', '20.17', '—'],
  ['办公 / 照明', '20.4', '14.1', '0.05', '0.12', '14.27', '—'],
  ['合计', '286.4', '198.6', '1.62', '3.87', '204.09', '611']
];

const ENERGY_PRODUCTION = [
  ['重点客户 A 包装盒', '印刷一车间', '268', '1,120', '980', '13.8', '515', '关注'],
  ['高档礼盒', '印刷二车间', '210', '960', '880', '12.6', '600', '预警'],
  ['标签卷材', '后加工车间', '186', '820', '760', '12.2', '656', '预警'],
  ['说明书', '印刷一车间', '154', '640', '610', '8.4', '545', '正常'],
  ['外协配套', '后加工车间', '98', '420', '390', '6.8', '694', '预警']
];

const ENERGY_UNIT = [
  ['标准包装盒', '12,600 件', '6.2', '4.92', '515', '480', '+7.3%', '关注'],
  ['高档礼盒', '3,800 件', '5.8', '15.26', '600', '560', '+7.1%', '关注'],
  ['标签卷材', '8,600 卷', '4.1', '4.77', '656', '610', '+7.5%', '预警'],
  ['说明书', '22,000 本', '2.8', '1.27', '545', '520', '+4.8%', '关注'],
  ['外协配套', '1,200 件', '2.2', '18.33', '694', '650', '+6.8%', '预警']
];

const ENERGY_QUALITY_KPIS = [
  { label: '平均功率因数', value: '0.92', unit: '', target: '≥0.90', status: '正常', note: '较上月 +0.01' },
  { label: '电压合格率', value: '99.6', unit: '%', target: '≥99.5%', status: '正常', note: '12 个计量点' },
  { label: '三相不平衡', value: '2.1', unit: '%', target: '≤3%', status: '正常', note: '最大 3.4%' },
  { label: '超限记录', value: '3', unit: '条', target: '0 条', status: '预警', note: '功率因数/三相不平衡' }
];
const ENERGY_QUALITY = [
  ['2026-08-20 10:15', '后加工车间', '电压', '412V', '380–420V', '正常'],
  ['2026-08-20 14:20', '印刷二车间', '功率因数', '0.88', '≥0.90', '超限'],
  ['2026-08-19 22:10', '空压站', '三相不平衡', '3.4%', '≤3%', '超限'],
  ['2026-08-19 09:30', '印刷一车间', '电压', '418V', '380–420V', '正常'],
  ['2026-08-18 16:45', '后加工车间', '功率因数', '0.89', '≥0.90', '超限']
];

const ENERGY_WARNINGS = [
  { id: 'EN-W-001', type: '超计划', title: '总用电量超月度计划 2.3%', scope: '设备动力部', owner: '李超', level: '高', status: '整改中', current: '286.4 万kWh', target: '280.0 万kWh', source: '能源计量 / ERP', due: '2026-08-25', overdue: true, cause: '后加工车间设备空转与高温天气空调负荷增加。', action: '优化设备启停和错峰生产，空调设定温度统一到 26℃。' },
  { id: 'EN-W-002', type: '超基线', title: '后加工车间单位产值电耗超基线 12%', scope: '生产管理部', owner: '刘强', level: '高', status: '待反馈', current: '0.094 kWh/元', target: '0.084 kWh/元', source: 'MES / 能源计量', due: '2026-08-24', overdue: true, cause: '模切设备停机后空转，重点订单换版次数增加。', action: '建立设备空转停机标准，按订单换版优化排产。' },
  { id: 'EN-W-003', type: '趋势上升', title: '8/20 日用电峰值 13.8 万kWh', scope: '设备动力部', owner: '李超', level: '中', status: '待处理', current: '13.8 万kWh', target: '≤13.0 万kWh', source: '能源计量', due: '2026-08-22', overdue: false, cause: '高温天气空调负荷与后加工设备同时启动。', action: '错峰启动大功率设备，空调负荷分区控制。' },
  { id: 'EN-W-004', type: '质量超限', title: '印刷二车间功率因数 0.88 低于限值', scope: '设备动力部', owner: '李超', level: '中', status: '整改中', current: '0.88', target: '≥0.90', source: '能源质量采集', due: '2026-08-23', overdue: false, cause: '无功补偿装置投切异常，夜间负荷偏低。', action: '校验无功补偿控制器，优化投切策略。' },
  { id: 'EN-W-005', type: '超基线', title: '空压系统夜间泄漏', scope: '设备动力部', owner: '李超', level: '中', status: '待复核', current: '泄漏率 8.2%', target: '≤5%', source: '能源计量 / 巡检', due: '2026-08-21', overdue: true, cause: '夜班停机后空压机未完全卸载，管路存在泄漏点。', action: '完成管路泄漏点排查和空压机停机策略调整。' }
];

const ENERGY_READINESS = [
  { key: 'points', item: '采集点', status: '待确认', owner: '信息工程部 / 设备动力部', requirement: '电表、水表、气表点位、倍率、通讯协议', impact: '决定能源日报、用能去向和预警能否自动生成', next: '现场盘点计量点并确认通讯方式' },
  { key: 'levels', item: '计量层级', status: '部分确认', owner: '设备动力部', requirement: '公司 / 车间 / 产线 / 设备四级计量', impact: '决定分层看板和单件能耗能否下钻到设备', next: '确认各层级计量点清单与上下级关系' },
  { key: 'mapping', item: '设备 / 产线映射', status: '部分确认', owner: '设备动力部 / 信息工程部', requirement: 'MES 设备编码与能源计量点映射', impact: '决定生产电耗与设备运行数据能否关联', next: '补齐 3 个未映射计量点和设备编码' },
  { key: 'price', item: '电价 / 分摊规则', status: '待确认', owner: '财务部', requirement: '峰谷电价、需量电费、公摊和分摊规则', impact: '决定用能成本和单位产值成本的准确性', next: '财务确认电价版本、分摊口径和结算期间' },
  { key: 'unit', item: '单件能耗口径', status: '待确认', owner: '经营发展部 / 生产管理部', requirement: '产品、工序、产量与计量点映射', impact: '决定单件能耗和单位产值能耗能否发布', next: '确认产品/工序/产量口径和计量映射' },
  { key: 'history', item: '历史数据范围', status: '部分确认', owner: '信息工程部', requirement: '近 12 个月历史数据完整性', impact: '决定同比/环比和基线预警是否可用', next: '补齐 2025 年 9—12 月历史数据' }
];

const ENERGY_TRACE = [
  { time: '2026-08-20 08:30', actor: '系统动作流', action: '能源数据刷新', result: '汇聚 12 个计量点电/水/气数据，生成 8 月能源日报和 5 条预警。' },
  { time: '2026-08-20 09:10', actor: '李超', action: '总用电超计划预警', result: '确认后加工车间空转和空调负荷，制定错峰措施。' },
  { time: '2026-08-20 09:30', actor: '尚椿琳', action: '计量点映射校验', result: '完成 12 个计量点与车间/设备映射，3 个点位待确认。' }
];

/* ---------- 辅助 ---------- */

function energyNow() { return '2026-08-25 10:40'; }
function energyTone(value) {
  const text = String(value);
  if (/预警|高|超限|超计划|超基线|未达标|超期/.test(text)) return 'warning';
  if (/关注|中|待处理|待反馈|待复核|整改中|部分确认/.test(text)) return 'watch';
  if (/待确认/.test(text)) return 'muted';
  return 'normal';
}
function energyBadge(value) {
  return '<span class="energy-status ' + energyTone(value) + '">' + value + '</span>';
}
function energyKpi(k) {
  return '<article class="energy-kpi ' + energyTone(k.status) + '"><div class="energy-kpi-head"><span>' + k.label + '</span>' + energyBadge(k.status) + '</div><strong>' + k.value + '<small>' + k.unit + '</small></strong><div class="energy-kpi-meta"><span>目标 ' + k.target + '</span><span class="' + (String(k.delta).indexOf('-') === 0 ? 'down' : 'up') + '">' + k.delta + '</span></div><p>' + k.note + '</p></article>';
}
function energyTabs() {
  const tabs = [['daily', '能源日报'], ['dest', '用能去向'], ['cost', '用能成本'], ['production', '生产电耗'], ['unit', '单件能耗'], ['quality', '能源质量'], ['warning', '能耗预警'], ['readiness', '数据准备度']];
  const open = ENERGY_WARNINGS.filter(function (w) { return w.status !== '已关闭'; }).length;
  return '<div class="tabs energy-tabs">' + tabs.map(function (x) {
    return '<button class="' + (state.energyTab === x[0] ? 'active' : '') + '" onclick="setEnergyTab(\'' + x[0] + '\')">' + x[1] + (x[0] === 'warning' ? '<i class="tab-count">' + open + '</i>' : '') + '</button>';
  }).join('') + '</div>';
}
function energyTable(headers, rows) {
  return '<div class="table-card energy-table"><table><thead><tr>' + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
}
function energyBars(items) {
  return '<div class="energy-bar-list">' + items.map(function (x) {
    return '<div class="energy-bar-row"><div><b>' + x[0] + '</b><span>' + x[2] + '</span></div><div class="energy-bar-track"><i style="width:' + Math.min(100, x[1]) + '%"></i></div><strong>' + x[1] + '%</strong></div>';
  }).join('') + '</div>';
}
function energyTrendChart() {
  const m = ENERGY_TRENDS[state.energyMetric];
  const max = Math.max.apply(null, m.actual.concat(m.plan));
  return '<div class="trend-chart energy-trend">' + m.actual.map(function (v, i) {
    const ah = Math.max(16, v / max * 100), ph = Math.max(16, m.plan[i] / max * 100);
    return '<div class="trend-group"><div class="trend-bars"><i class="target" style="height:' + ph + '%"></i><i class="actual" style="height:' + ah + '%"></i></div><b>' + ENERGY_TRENDS.labels[i] + '</b><span>' + v.toLocaleString('zh-CN') + '</span></div>';
  }).join('') + '</div><div class="chart-legend"><span><i class="legend-target"></i>计划</span><span><i class="legend-actual"></i>实际</span><span class="energy-chart-unit">单位：' + m.unit + '</span></div>';
}
function energyWarningFiltered() {
  return ENERGY_WARNINGS.filter(function (w) {
    return (state.energyWarningType === '全部类型' || w.type === state.energyWarningType) &&
      (state.energyWarningStatus === '全部状态' || w.status === state.energyWarningStatus);
  });
}
function energyWarning(id) { return ENERGY_WARNINGS.find(function (w) { return w.id === id; }); }
function energyReadinessProgress() {
  return Math.round(ENERGY_READINESS.filter(function (r) { return r.status === '部分确认'; }).length / ENERGY_READINESS.length * 100);
}

/* ---------- 页面区块 ---------- */

function energyHero() {
  return '<div class="energy-hero"><div><span class="eyebrow">观星台 · 能源分析</span><h2>能源日报、用能去向与能耗预警</h2><p>在能源采集数据可用的前提下，支持日报、去向、成本、生产电耗、单件能耗、质量和预警分析。</p><div class="energy-hero-chips"><span>数据期间 2026年8月</span><span>12 / 15 个计量点</span><span>更新 ' + state.energyUpdatedAt + '</span></div></div><div class="session-note">当前：' + currentRole().label + '<br>数据为 Demo 模拟，刷新后恢复基线。<br><b>设备动力部 / 李超</b></div></div>' +
    '<div class="energy-boundary"><b>SOW 标记：待确认</b><span>能源分析 7 项（STAR-F-037 ~ F-043 / STAR-O-008 / STAR-S-007）在签字 SOW 中标记为待确认。本页为 Demo 预演，采集点、计量层级、设备/产线映射、电价与分摊规则、单件能耗口径需客户确认，不作为生产验收依据。</span></div>';
}
function energyKpis() {
  return '<div class="energy-kpi-grid">' + ENERGY_KPIS.map(energyKpi).join('') + '</div>';
}

function energyDailyView() {
  const metrics = [['electricity', '用电量'], ['water', '用水量'], ['gas', '用气量']];
  const rows = ENERGY_DAILY.map(function (d) {
    return [d.date, d.elec, d.unit, d.cost, d.water, d.gas, energyBadge(d.status)];
  });
  return '<div class="split"><section class="card"><div class="card-h"><h2>能源日报趋势</h2><div class="energy-metric-tabs">' + metrics.map(function (x) { return '<button class="' + (state.energyMetric === x[0] ? 'active' : '') + '" onclick="setEnergyMetric(\'' + x[0] + '\')">' + x[1] + '</button>'; }).join('') + '</div></div>' + energyTrendChart() + '</section><section class="card"><div class="card-h"><h2>本期能源结论</h2><span class="meta">供能源管理例会审议</span></div><div class="energy-conclusions"><div><b>总用电量超计划 2.3%</b><p>8 月累计 286.4 万kWh，月末高温和后加工设备空转是主要增量。</p></div><div><b>单位产值电耗高于基线</b><p>后加工车间 0.094 kWh/元，较基线 0.084 高 12%，需优化停机和换版。</p></div><div><b>用水量低于计划 3.5%</b><p>用水 3,860 吨，节水措施有效；用气量因烘干工序增加 4.0%。</p></div><div><b>能源质量存在 3 条超限</b><p>功率因数和三相不平衡需校验无功补偿和负荷分配。</p></div></div><div class="card-footer"><button class="secondary" onclick="setEnergyTab(\'warning\')">查看能耗预警</button><button class="primary" onclick="setEnergyTab(\'readiness\')">查看数据条件</button></div></section></div>' +
    '<section class="card top-gap"><div class="card-h"><h2>近 7 日能源日报</h2><span class="meta">电 / 水 / 气 · 单位产值电耗</span></div>' + energyTable(['日期', '用电量（万kWh）', '单位产值电耗（kWh/万元）', '电费（万元）', '用水（吨）', '用气（m³）', '状态'], rows) + '<div class="energy-foot"><span>数据批次 ENERGY-BATCH-20260820-01 · 更新 ' + state.energyUpdatedAt + '</span><span>来源：电表 / 水表 / 气表计量 · ERP 产量</span></div></section>';
}
function energyDestView() {
  const dims = [['org', '按车间 / 组织'], ['usage', '按用途'], ['company', '按公司']];
  const d = ENERGY_DEST[state.energyDestDim];
  return '<div class="energy-dimension-tabs">' + dims.map(function (x) { return '<button class="' + (state.energyDestDim === x[0] ? 'active' : '') + '" onclick="setEnergyDestDim(\'' + x[0] + '\')">' + x[1] + '</button>'; }).join('') + '</div><section class="card"><div class="card-h"><h2>用能去向 · ' + d.title + '</h2><span class="meta">公司 / 组织 / 车间 / 产线 / 设备 / 用途</span></div><div class="energy-dest-body">' + energyBars(d.bars) + energyTable(d.headers, d.rows) + '<div class="energy-insight"><b>分析结论</b><p>' + d.insight + '</p></div></div></section><div class="energy-foot"><span>口径：计量点 → 车间/用途/公司映射；设备与产线映射待确认。</span><span>数据批次 ENERGY-BATCH-20260820-01</span></div>';
}
function energyCostView() {
  const priceRows = ENERGY_PRICES.map(function (p) { return '<tr><td>' + p[0] + '</td><td>' + p[1] + '</td><td>' + p[2] + '</td></tr>'; }).join('');
  const rows = ENERGY_COST_ROWS.map(function (r, i) { return '<tr class="' + (i === ENERGY_COST_ROWS.length - 1 ? 'energy-total-row' : '') + '">' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('');
  return '<div class="split"><section class="card"><div class="card-h"><h2>用能成本汇总</h2><span class="meta">电 / 水 / 气</span></div><div class="energy-cost-cards"><div><span>电费</span><b>198.6<small>万元</small></b><em>预算 192.0</em></div><div><span>水费</span><b>1.62<small>万元</small></b><em>3,860 吨</em></div><div><span>气费</span><b>3.87<small>万元</small></b><em>12,480 m³</em></div><div><span>合计</span><b>204.09<small>万元</small></b><em>较预算 +3.8%</em></div></div><div class="energy-insight"><b>成本结构</b><p>电费占能源成本 97.3%，是最主要的可控成本；水费和燃气费合计占 2.7%。电价、公摊和分摊规则待财务确认。</p></div></section><section class="card"><div class="card-h"><h2>能源价格与规则</h2><span class="meta">待财务确认</span></div>' + energyTable(['介质', '单价', '计费规则'], ENERGY_PRICES.map(function (p) { return [p[0], p[1], p[2]]; })) + '<div class="energy-note">峰谷电价、需量电费、公摊和分摊规则尚未确认；当前单价为 Demo 模拟值。</div></section></div>' +
    '<section class="card top-gap"><div class="card-h"><h2>按车间用能成本</h2><span class="meta">用电量 / 电费 / 水费 / 气费 / 单位产值成本</span></div><div class="table-card energy-table"><table><thead><tr><th>车间</th><th>用电量（万kWh）</th><th>电费（万元）</th><th>水费（万元）</th><th>气费（万元）</th><th>合计（万元）</th><th>单位产值成本（元/万元）</th></tr></thead><tbody>' + rows + '</tbody></table></div><div class="energy-foot"><span>单位产值成本 = 能源总成本 ÷ 当期产值；分摊规则待确认。</span><span>电价版本：DEMO-2026.08</span></div></section>';
}
function energyProductionView() {
  const rows = ENERGY_PRODUCTION.map(function (r) {
    return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td><td>' + r[5] + '</td><td><b>' + r[6] + '</b></td><td>' + energyBadge(r[7]) + '</td></tr>';
  }).join('');
  return '<section class="card"><div class="card-h"><h2>生产电耗</h2><span class="meta">订单 / 产量 / 工时 / 设备运行</span></div><div class="table-card energy-table"><table><thead><tr><th>订单 / 产品</th><th>车间</th><th>产量（万元）</th><th>工时（h）</th><th>设备运行（h）</th><th>用电量（万kWh）</th><th>单位产量电耗（kWh/万元）</th><th>状态</th></tr></thead><tbody>' + rows + '</tbody></table></div><div class="energy-insight"><b>分析结论</b><p>后加工车间外协配套单位产量电耗 694 kWh/万元，为最高；设备空转 36 小时，建议建立停机标准和错峰开机机制。生产任务、工时和设备运行数据来自 MES，关联口径待确认。</p></div><div class="energy-foot"><span>产量取自 ERP/MES；用电量取自能源计量点。</span><span>数据批次 ENERGY-BATCH-20260820-01</span></div></section>' +
    '<div class="energy-readiness-strip"><b>关联条件</b><span>生产任务、工时、设备运行和计量点需建立业务键映射；当前 3 个计量点待确认。</span><button class="link" onclick="setEnergyTab(\'readiness\')">查看数据条件 →</button></div>';
}
function energyUnitView() {
  const rows = ENERGY_UNIT.map(function (r) {
    return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td><td>' + r[5] + '</td><td class="energy-deviation">' + r[6] + '</td><td>' + energyBadge(r[7]) + '</td></tr>';
  }).join('');
  return '<section class="card"><div class="card-h"><h2>单件能耗</h2><span class="meta">产品 / 工序 / 产量 / 计量映射</span></div><div class="table-card energy-table"><table><thead><tr><th>产品 / 工序</th><th>产量</th><th>用电量（万kWh）</th><th>单件电耗（kWh/件）</th><th>单位产值能耗（kWh/万元）</th><th>基线</th><th>偏差</th><th>状态</th></tr></thead><tbody>' + rows + '</tbody></table></div><div class="energy-insight"><b>分析结论</b><p>标准包装盒、高档礼盒和标签卷材单位产值能耗均高于基线 7% 左右；标签卷材和外协配套偏差最大。产品、工序、产量与计量点映射待客户确认后，才能作为正式考核口径。</p></div><div class="energy-foot"><span>基线为 Demo 模拟值，待确认后按产品/工序版本发布。</span><span>数据批次 ENERGY-BATCH-20260820-01</span></div></section>' +
    '<div class="energy-readiness-strip"><b>待确认口径</b><span>产品/工序/产量与计量点映射、单件能耗基线、外协产量归属。</span><button class="link" onclick="setEnergyTab(\'readiness\')">查看数据条件 →</button></div>';
}
function energyQualityView() {
  const rows = ENERGY_QUALITY.map(function (r) {
    return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + r[3] + '</td><td>' + r[4] + '</td><td>' + energyBadge(r[5]) + '</td></tr>';
  }).join('');
  return '<div class="energy-quality-kpis">' + ENERGY_QUALITY_KPIS.map(function (k) { return '<article class="energy-quality-kpi ' + energyTone(k.status) + '"><div><span>' + k.label + '</span>' + energyBadge(k.status) + '</div><strong>' + k.value + '<small>' + k.unit + '</small></strong><p>目标 ' + k.target + ' · ' + k.note + '</p></article>'; }).join('') + '</div><section class="card top-gap"><div class="card-h"><h2>能源质量超限记录</h2><span class="meta">电压 / 功率因数 / 三相不平衡</span></div><div class="table-card energy-table"><table><thead><tr><th>时间</th><th>计量点</th><th>指标</th><th>实测值</th><th>限值</th><th>状态</th></tr></thead><tbody>' + rows + '</tbody></table></div><div class="energy-insight"><b>分析结论</b><p>平均功率因数 0.92 达标，但印刷二车间和后加工车间出现 3 次功率因数超限；空压站三相不平衡 3.4%。建议校验无功补偿控制器和负荷分配。</p></div><div class="energy-foot"><span>采集点、计量层级和设备映射待确认。</span><span>数据批次 ENERGY-BATCH-20260820-01</span></div></section>';
}
function energyWarningView() {
  const filtered = energyWarningFiltered();
  const high = ENERGY_WARNINGS.filter(function (w) { return w.level === '高'; }).length;
  const open = ENERGY_WARNINGS.filter(function (w) { return w.status !== '已关闭'; }).length;
  const overdue = ENERGY_WARNINGS.filter(function (w) { return w.overdue && w.status !== '已关闭'; }).length;
  const rows = filtered.map(function (w, i) {
    return '<tr><td>' + (i + 1) + '</td><td><span class="energy-type">' + w.type + '</span></td><td><button class="table-link" onclick="energyWarningDetail(\'' + w.id + '\')">' + w.title + '</button><small class="energy-row-sub">' + w.source + ' · 截止 ' + w.due + '</small></td><td><b>' + w.scope + '</b><small class="energy-row-sub">' + w.owner + ' · ' + w.level + '优先级</small></td><td>' + w.current + '<small class="energy-row-sub">目标 ' + w.target + '</small></td><td>' + energyBadge(w.status) + (w.escalated ? '<span class="energy-escalated">已升级</span>' : '') + '</td><td><button class="link" onclick="energyWarningDetail(\'' + w.id + '\')">详情</button><button class="link" onclick="energyCreateProblem(\'' + w.id + '\')">转问题</button></td></tr>';
  }).join('');
  return '<div class="energy-warning-summary"><div><b>' + ENERGY_WARNINGS.length + '</b><span>全部预警</span></div><div class="danger"><b>' + high + '</b><span>高优先级</span></div><div class="warning"><b>' + open + '</b><span>未关闭</span></div><div class="watch"><b>' + overdue + '</b><span>超期</span></div></div>' +
    '<div class="toolbar energy-filters"><select onchange="state.energyWarningType=this.value;render()">' + ['全部类型', '超计划', '超基线', '趋势上升', '质量超限'].map(function (x) { return '<option ' + (state.energyWarningType === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select><select onchange="state.energyWarningStatus=this.value;render()">' + ['全部状态', '待处理', '待反馈', '整改中', '待复核', '已关闭'].map(function (x) { return '<option ' + (state.energyWarningStatus === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select><button class="secondary" onclick="resetEnergyWarningFilters()">重置</button><span class="spacer"></span><button class="secondary" onclick="exportEnergyData()">导出 / 打印</button></div>' +
    '<div class="table-card energy-table energy-warning-table"><table><thead><tr><th>序号</th><th>类型</th><th>预警事项 / 来源</th><th>责任 / 期限</th><th>当前值 / 目标</th><th>状态</th><th>操作</th></tr></thead><tbody>' + (rows || '<tr><td colspan="7"><div class="empty compact">当前筛选条件下没有预警。</div></td></tr>') + '</tbody></table></div><div class="energy-note">能耗预警按基线、计划、阈值和趋势触发；正式接入后按 OA 问题闭环处理，保留原始计量点、批次和处置记录。</div>';
}
function energyReadinessView() {
  const partial = ENERGY_READINESS.filter(function (r) { return r.status === '部分确认'; }).length;
  const pending = ENERGY_READINESS.filter(function (r) { return r.status === '待确认'; }).length;
  const cards = ENERGY_READINESS.map(function (r) {
    return '<article class="energy-readiness-card ' + energyTone(r.status) + '"><div class="energy-readiness-head"><span>' + r.item + '</span>' + energyBadge(r.status) + '</div><p>' + r.requirement + '</p><div class="energy-readiness-meta"><span>责任：' + r.owner + '</span><span>影响：' + r.impact + '</span></div><div class="energy-readiness-foot"><button class="link" onclick="energyReadinessDetail(\'' + r.key + '\')">查看说明</button><span>下一步：' + r.next + '</span></div></article>';
  }).join('');
  const trace = ENERGY_TRACE.map(function (x) {
    return '<div class="energy-trace-item"><span>' + x.time + '</span><i></i><div><b>' + x.actor + ' · ' + x.action + '</b><p>' + x.result + '</p></div></div>';
  }).join('');
  return '<div class="energy-readiness-hero"><div><span>数据准备度</span><b>' + energyReadinessProgress() + '%</b><p>6 项数据条件中，' + partial + ' 项部分确认、' + pending + ' 项待确认；完成确认后才能把能源分析从 Demo 预演转为正式实施。</p></div><div class="energy-readiness-rule">SOW STAR-S-007：采集点、计量层级、设备/产线映射、成本及单件能耗口径待确认。</div></div><div class="energy-readiness-grid">' + cards + '</div><div class="split top-gap"><section class="card"><div class="card-h"><h2>运行留痕</h2><span class="meta">刷新、预警、映射校验</span></div><div class="energy-trace">' + trace + '</div></section><section class="card"><div class="card-h"><h2>实施边界</h2><span class="meta">待确认 · 不作为验收依据</span></div><div class="energy-principles"><div><b>当前 Demo</b><span>仅演示能源日报、去向、成本、生产电耗、单件能耗、质量和预警的目标形态。</span></div><div><b>数据接入</b><span>电表、水表、气表点位、倍率、通讯协议和采集频率需现场确认。</span></div><div><b>口径确认</b><span>电价、公摊、分摊、单件能耗基线和外协归属需财务/生产/经营共同确认。</span></div><div><b>正式实施</b><span>确认后按 STAR-F-037 ~ F-043 纳入实施与验收；当前不承诺真实接口能力。</span></div></div><div class="card-footer"><button class="secondary" onclick="energyOpenTheme()">查看能源主题</button><button class="secondary" onclick="energyOpenQuality()">查看数据质量</button></div></section></div>';
}

function energyPage() {
  let body = energyDailyView();
  if (state.energyTab === 'dest') body = energyDestView();
  if (state.energyTab === 'cost') body = energyCostView();
  if (state.energyTab === 'production') body = energyProductionView();
  if (state.energyTab === 'unit') body = energyUnitView();
  if (state.energyTab === 'quality') body = energyQualityView();
  if (state.energyTab === 'warning') body = energyWarningView();
  if (state.energyTab === 'readiness') body = energyReadinessView();
  const content = energyHero() + energyKpis() + energyTabs() + body;
  const actions = '<button class="secondary" onclick="refreshEnergyData()">刷新数据</button><button class="secondary" onclick="exportEnergyData()">导出 / 打印</button><button class="primary" onclick="setEnergyTab(\'readiness\')">数据条件</button>';
  return shell(content, '能源分析', '能源日报 · 用能去向 · 成本 · 电耗 · 预警（SOW 待确认）', actions);
}

/* ---------- 交互 ---------- */

function setEnergyTab(tab) {
  if (['daily', 'dest', 'cost', 'production', 'unit', 'quality', 'warning', 'readiness'].indexOf(tab) < 0) return;
  state.energyTab = tab;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function setEnergyMetric(metric) {
  if (!ENERGY_TRENDS[metric]) return;
  state.energyMetric = metric;
  render();
}
function setEnergyDestDim(dim) {
  if (!ENERGY_DEST[dim]) return;
  state.energyDestDim = dim;
  render();
}
function resetEnergyWarningFilters() {
  state.energyWarningType = '全部类型';
  state.energyWarningStatus = '全部状态';
  render();
  toast('已重置能耗预警筛选条件。');
}
function energyWarningDetail(id) {
  const w = energyWarning(id);
  if (!w) return;
  openModal(w.id + ' · ' + w.title, '<div class="energy-detail-head"><div><span>' + w.type + ' · ' + w.source + '</span><h2>' + w.title + '</h2><p>' + w.scope + ' / ' + w.owner + ' · 截止 ' + w.due + '</p></div>' + energyBadge(w.status) + '</div><div class="info-grid">' + info('预警类型', w.type) + info('风险等级', w.level) + info('当前值', w.current) + info('目标值', w.target) + info('责任部门', w.scope) + info('责任人', w.owner) + info('数据来源', w.source) + info('是否超期', w.overdue ? '是' : '否') + '</div><div class="energy-detail-block"><b>原因分析</b><p>' + w.cause + '</p></div><div class="energy-detail-block"><b>建议措施</b><p>' + w.action + '</p></div>', '<button class="secondary" onclick="closeModal()">关闭</button><button class="secondary" onclick="closeModal();energyCreateProblem(\'' + id + '\')">转问题台账</button><button class="primary" onclick="energyEscalate(\'' + id + '\')">升级至管理层</button>', true);
}
function energyEscalate(id) {
  const w = energyWarning(id);
  if (!w) return;
  if (w.escalated) { toast('该预警已升级至公司管理层。'); return; }
  if (!['operations', 'it', 'manager'].includes(state.role)) {
    toast('仅经营发展部、信息工程部或公司管理层可升级能耗预警。');
    return;
  }
  w.escalated = true;
  if (w.status === '待处理' || w.status === '待反馈') w.status = '整改中';
  ENERGY_TRACE.unshift({ time: energyNow(), actor: currentRole().name, action: '能耗预警升级 · ' + w.id, result: w.title + ' 已升级至公司管理层协调，保留原责任人 ' + w.owner + '；原因、措施和计量点证据已留痕。' });
  closeModal();
  render();
  toast('能耗预警已升级至公司管理层，运行留痕已更新。');
}
function energyCreateProblem(id) {
  const w = energyWarning(id);
  if (!w) return;
  if (document.querySelector('[role=dialog]')) closeModal();
  go('problem');
  toast('能源预警 ' + id + ' 已进入问题台账（Demo 演示）；正式接入后按 OA 问题闭环处理。');
}
function energyReadinessDetail(key) {
  const r = ENERGY_READINESS.find(function (x) { return x.key === key; });
  if (!r) return;
  openModal(r.item + ' · 数据条件', '<div class="energy-detail-head"><div><span>SOW STAR-S-007 · 待确认</span><h2>' + r.item + '</h2><p>' + r.requirement + '</p></div>' + energyBadge(r.status) + '</div><div class="info-grid">' + info('责任方', r.owner) + info('当前状态', r.status) + info('影响', r.impact) + info('下一步', r.next) + '</div><div class="energy-note">该项未确认前，能源分析只作为 Demo 预演，不作为生产验收依据。</div>', '<button class="primary" onclick="closeModal()">关闭</button>', true);
}
function refreshEnergyData() {
  if (!['operations', 'it', 'manager'].includes(state.role)) {
    toast('仅经营发展部、信息工程部或公司管理层可刷新能源数据。');
    return;
  }
  state.energyUpdatedAt = energyNow();
  ENERGY_TRACE.unshift({ time: energyNow(), actor: currentRole().name, action: '能源数据刷新', result: '重新汇聚 12 个计量点电/水/气数据，更新能源日报、用能去向、成本、电耗、质量和预警。' });
  render();
  toast('能源数据已刷新；数据准备度、预警和留痕同步更新。');
}
function exportEnergyData() {
  toast('已打开打印预览；可在浏览器中选择“另存为 PDF”。');
  setTimeout(function () { window.print(); }, 260);
}
function energyOpenTheme() {
  state.themeKey = 'energy';
  state.themeTab = 'preview';
  navNavigate('theme', 'star', 'star:theme');
  toast('已打开能源主题占位；主题数据中能源仍标记为待确认。');
}
function energyOpenQuality() {
  go('quality');
}

/* ---------- 接管 render，保留经营简报、指挥看板、主题数据与所有原有页面 ---------- */

const renderBeforeStarEnergy = render;
render = function () {
  if (state.page === 'energy') {
    $('#app').innerHTML = energyPage();
    return;
  }
  return renderBeforeStarEnergy();
};
