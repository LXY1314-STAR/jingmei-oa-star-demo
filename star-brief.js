/* ===== 观星台 · 经营简报（SOW STAR-F-015 / 016 / 017 / 024 / 025） ===== */
/* 月度经营简报：模板章节、经营总览、重点专题、快照与版本留痕。 */

DEMO_RELEASE.version = 'V1.7.1-BRIEF-dev';
DEMO_RELEASE.scope = '在 V1.7.0 党政开发版基础上，新增观星台经营简报：月度模板、经营总览、七个重点专题、数据快照、会议议题联动与版本留痕；其余范围不变。';

state.briefTab = state.briefTab || 'overview';
state.briefTopic = state.briefTopic || 'operation';
state.briefPeriod = state.briefPeriod || '2026-08';
state.briefTemplateVersion = state.briefTemplateVersion || 'V1.3';
state.briefSnapshot = state.briefSnapshot || 'STAR-SNAPSHOT-202608-01';
state.briefUpdatedAt = state.briefUpdatedAt || '2026-08-20 08:30';
state.briefPublished = state.briefPublished === undefined ? true : state.briefPublished;

const BRIEF_TOPIC_TABS = [
  ['operation', '经营情况'],
  ['structure', '业务结构'],
  ['orders', '订单蓄水'],
  ['output', '产值分析'],
  ['product', '产品结构'],
  ['outsourcing', '自产外协'],
  ['investment', '投资执行']
];

const BRIEF_CHAPTER_DEFS = [
  { no: '01', name: '经营总览', owner: '经营发展部 / 周敏', source: '经营驾驶舱 · 指标库', updated: '2026-08-20 08:30', status: '已就绪', target: 'overview', included: true },
  { no: '02', name: '收入与利润', owner: '财务部 / 李敏', source: 'ERP 财务 · 收入/利润', updated: '2026-08-20 08:10', status: '已就绪', target: 'topics:operation', included: true },
  { no: '03', name: '订单与产值', owner: '营销中心 / 生产管理部', source: 'ERP 订单 · MES 报工', updated: '2026-08-20 08:20', status: '待补1项', target: 'topics:output', included: true },
  { no: '04', name: '存货与应收', owner: '供应链管理部 / 财务部', source: 'ERP 存货 · 应收', updated: '2026-08-20 08:15', status: '已就绪', target: 'topics:operation', included: true },
  { no: '05', name: '现金流与投资', owner: '财务部 / 李敏', source: 'ERP 资金 · 投资台账', updated: '2026-08-20 08:05', status: '已就绪', target: 'topics:investment', included: true },
  { no: '06', name: '风险与问题', owner: '审计监督部 / 陈欣悦', source: '双源风险 · 问题台账', updated: '2026-08-20 08:25', status: '待补1项', target: 'overview', included: true },
  { no: '07', name: '会议决策与责任事项', owner: '经营发展部 / 周敏', source: '会议快照 MTG-202608-011', updated: '2026-08-20 09:35', status: '已就绪', target: 'meeting', included: true }
];

state.briefChapters = state.briefChapters || BRIEF_CHAPTER_DEFS.map(function (x) { return Object.assign({}, x); });

const BRIEF_TOPIC_BASE = {
  operation: {
    summary: [
      ['累计营业收入', '63,216', '万元', '年度预算完成 66.3%'],
      ['累计利润总额', '9,076', '万元', '利润率 14.4%'],
      ['累计经营现金流', '7,774', '万元', '回款覆盖支出 1.06 倍']
    ],
    rows: [
      ['1月', '7,210', '980', '842', '92.4%'],
      ['2月', '7,480', '1,020', '910', '93.1%'],
      ['3月', '7,650', '1,080', '960', '94.2%'],
      ['4月', '7,890', '1,120', '1,005', '95.0%'],
      ['5月', '8,030', '1,150', '980', '95.6%'],
      ['6月', '8,180', '1,200', '1,010', '96.1%'],
      ['7月', '8,350', '1,240', '1,025', '96.5%'],
      ['8月', '8,426', '1,286', '1,042', '96.8%']
    ],
    insight: '收入累计完成年度预算 66.3%；8 月收入 8,426 万元为年内最高，但距月度目标仍有 274 万元缺口。利润端保持达标，经营现金流为正，收入质量总体稳定。'
  },
  structure: {
    rows: [
      ['印刷主业', '5,224', '62%', '19.8%', '+6.2%'],
      ['包装业务', '1,517', '18%', '16.2%', '+3.8%'],
      ['标签业务', '1,011', '12%', '22.4%', '+9.1%'],
      ['其他业务', '674', '8%', '12.1%', '-1.5%']
    ],
    bars: [
      ['印刷主业', 62, '5,224 万元'],
      ['包装业务', 18, '1,517 万元'],
      ['标签业务', 12, '1,011 万元'],
      ['其他业务', 8, '674 万元']
    ],
    insight: '印刷主业仍是收入基本盘，占比 62%；标签业务毛利率最高（22.4%），增速也快于整体。包装业务收入增长 3.8%，低于公司平均，需关注订单结构和报价策略。'
  },
  orders: {
    funnel: [
      ['已签未交付', '12,400', 67],
      ['在谈项目', '4,200', 23],
      ['投标项目', '2,000', 11]
    ],
    rows: [
      ['华东包装材料年度框架', '四川华彩', '3,200', '2026-09-30', '已签未交付'],
      ['纸张原料季度框架', '成都恒丰', '1,860', '2026-09-15', '已签未交付'],
      ['绿色印刷技改配套', '宜宾智造', '1,200', '2026-10-20', '在谈'],
      ['标签年度集采', '重点客户 A', '860', '2026-09-05', '投标']
    ],
    insight: '订单蓄水 18,600 万元，环比增长 8.4%；已签未交付占 67%。9—10 月交付压力集中在包装材料和标签订单，需提前锁定产能与外协资源。'
  },
  output: {
    rows: [
      ['印刷一车间', '2,980', '2,896', '97.2%', '正常'],
      ['印刷二车间', '2,450', '2,318', '94.6%', '预警'],
      ['后加工车间', '1,860', '1,657', '89.1%', '重点关注']
    ],
    insight: '后加工车间是主要偏差来源：计划 1,860 万元、实际 1,657 万元，缺口 203 万元。两台模切设备停机和重点订单换版次数增加，是产值完成率低于计划的主要原因。'
  },
  product: {
    bars: [
      ['标准产品', 54, '4,550 万元'],
      ['高毛利产品', 28, '2,359 万元'],
      ['新品 / 打样', 18, '1,517 万元']
    ],
    rows: [
      ['标准产品', '4,550', '54%', '14.2%', '+2.1%'],
      ['高毛利产品', '2,359', '28%', '26.8%', '+8.4%'],
      ['新品 / 打样', '1,517', '18%', '21.5%', '+12.6%']
    ],
    insight: '高毛利产品占比 28%，同比提升 2.4 个百分点；新品/打样增长最快（+12.6%），但批量转化率仍需跟踪，避免只增收不增利。'
  },
  outsourcing: {
    split: [78, 22],
    rows: [
      ['自产', '6,572', '78%', '—', '98.6%'],
      ['外协', '1,854', '22%', '+0.8pp', '97.2%']
    ],
    insight: '外协占比 22%，环比上升 0.8 个百分点，主要来自后加工产能不足。外协质量合格率 97.2%，低于自产 1.4 个百分点，需在 9 月经营会明确外协准入与质量追责要求。'
  },
  investment: {
    projects: [
      { name: '绿色印刷技改', budget: '2,800', spent: '1,736', progress: 62, status: '按计划' },
      { name: '智能仓储项目', budget: '1,500', spent: '570', progress: 38, status: '滞后' },
      { name: '数字化车间', budget: '800', spent: '568', progress: 71, status: '按计划' }
    ],
    insight: '投资执行率 58.3%。智能仓储项目进度 38%，低于时序目标 12 个百分点，需明确赶工措施和责任人；绿色印刷技改和数字化车间按计划推进。'
  }
};

const BRIEF_DATA = {
  '2026-08': {
    label: '2026年8月',
    short: '8月',
    status: '已发布',
    snapshot: 'STAR-SNAPSHOT-202608-01',
    batch: 'STAR-BATCH-20260820-01',
    updatedAt: '2026-08-20 08:30',
    publisher: '经营发展部 / 周敏',
    meeting: 'MTG-202608-011',
    revenueSummary: { actual: '8,426', target: '8,700', gap: '274', cumulative: '63,216' },
    kpis: [
      { label: '营业收入', value: '8,426', unit: '万元', target: '8,700', achievement: '96.8%', delta: '+5.4%', deltaLabel: '同比', state: '正常', note: '年度预算完成 66.3%', metric: 'MET-001' },
      { label: '利润总额', value: '1,286', unit: '万元', target: '1,270', achievement: '101.2%', delta: '+6.8%', deltaLabel: '同比', state: '正常', note: '毛利率 18.6% · 环比 +0.4pp' },
      { label: '产值完成率', value: '93.8', unit: '%', target: '100', achievement: '93.8%', delta: '-3.1%', deltaLabel: '同比', state: '预警', note: '低于计划 6.2 个百分点', metric: 'MET-002' },
      { label: '订单蓄水', value: '18,600', unit: '万元', target: '18,000', achievement: '103.3%', delta: '+8.4%', deltaLabel: '环比', state: '正常', note: '已签未交付 12,400 万元' },
      { label: '存货周转天数', value: '42.6', unit: '天', target: '38.0', achievement: '89.2%', delta: '+4.8天', deltaLabel: '环比', state: '预警', note: '成品与后加工库存上升', metric: 'MET-003' },
      { label: '应收周转天数', value: '58.2', unit: '天', target: '55.0', achievement: '94.5%', delta: '+2.1天', deltaLabel: '环比', state: '关注', note: '重点客户回款延迟' },
      { label: '经营现金流', value: '1,042', unit: '万元', target: '1,000', achievement: '104.2%', delta: '+4.2%', deltaLabel: '环比', state: '正常', note: '回款覆盖支出 1.08 倍' },
      { label: '制造费用率', value: '12.4', unit: '%', target: '12.0', achievement: '96.8%', delta: '+0.4pp', deltaLabel: '环比', state: '预警', note: '设备维保与外协费用增加' }
    ],
    trend: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      actual: [7210, 7480, 7650, 7890, 8030, 8180, 8350, 8426],
      target: [7300, 7500, 7750, 8000, 8200, 8400, 8550, 8700]
    },
    conclusions: [
      { title: '收入保持增长，但仍差月度目标 274 万元', text: '8 月营业收入 8,426 万元，同比 +5.4%，目标达成 96.8%；收入端连续三个月环比增长，但距 8,700 万元目标仍有缺口。' },
      { title: '产值偏差集中在后加工车间', text: '产值完成率 93.8%，低于计划 6.2 个百分点；后加工车间实际 1,657 万元、计划 1,860 万元，缺口 203 万元，主因是模切设备停机与重点订单换版。' },
      { title: '存货和应收周转同步放缓', text: '存货周转 42.6 天、应收周转 58.2 天，分别环比恶化 4.8 天和 2.1 天；需在 8 月经营会明确压降目标和责任部门。' },
      { title: '制造费用率超预算，需专项说明', text: '制造费用率 12.4%，高于预算 0.4 个百分点；设备维保和临时外协费用增加，建议在 9 月预算中单列并跟踪。' }
    ],
    anomalies: [
      { title: '8月产值完成率低于计划 6.2%', org: '生产管理部 / 刘强', status: '整改中', progress: 60, metric: 'MET-002', priority: '高', note: '设备停机与换版增加' },
      { title: '库存周转天数环比上升 4.8 天', org: '供应链管理部 / 杨林', status: '待反馈', progress: 20, metric: 'MET-003', priority: '中', note: '成品与后加工库存上升' },
      { title: '制造费用超预算 1.8 个百分点', org: '财务部 / 李敏', status: '待复核', progress: 100, metric: '', priority: '高', note: '设备维保及外协费用增加' }
    ],
    versions: [
      { version: 'V1.3', period: '2026年8月', status: '已发布', publisher: '周敏', publishedAt: '2026-08-20 09:40', snapshot: 'STAR-SNAPSHOT-202608-01', changes: '补充后加工车间停机原因、措施和会议责任事项' },
      { version: 'V1.2', period: '2026年7月', status: '已归档', publisher: '周敏', publishedAt: '2026-07-20 10:05', snapshot: 'STAR-SNAPSHOT-202607-01', changes: '完成 7 月简报，纳入订单蓄水和存货专题' },
      { version: 'V1.1', period: '2026年6月', status: '已归档', publisher: '周敏', publishedAt: '2026-06-20 09:50', snapshot: 'STAR-SNAPSHOT-202606-01', changes: '首次按确认模板固化经营总览' }
    ],
    timeline: [
      { time: '2026-08-20 08:30', actor: '系统动作流', action: '冻结数据快照', result: '完成 ERP / MES / QMS 数据对账，冻结 8 月简报快照' },
      { time: '2026-08-20 09:10', actor: '周敏', action: '补充经营结论', result: '补充收入缺口、产值偏差和存货周转分析' },
      { time: '2026-08-20 09:25', actor: '刘强', action: '责任部门补充', result: '补充后加工车间停机原因和整改措施' },
      { time: '2026-08-20 09:40', actor: '周敏', action: '发布简报 V1.3', result: '推送公司管理层和 8 月经营分析会' },
      { time: '2026-08-20 09:45', actor: '周敏', action: '加入会议议题', result: '将产值偏差和存货周转纳入 8 月经营分析会' }
    ]
  },
  '2026-07': {
    label: '2026年7月',
    short: '7月',
    status: '已归档',
    snapshot: 'STAR-SNAPSHOT-202607-01',
    batch: 'STAR-BATCH-20260720-01',
    updatedAt: '2026-07-20 08:30',
    publisher: '经营发展部 / 周敏',
    meeting: 'MTG-202607-009',
    revenueSummary: { actual: '8,350', target: '8,550', gap: '200', cumulative: '54,790' },
    kpis: [
      { label: '营业收入', value: '8,350', unit: '万元', target: '8,550', achievement: '97.7%', delta: '+5.1%', deltaLabel: '同比', state: '正常', note: '年度预算完成 57.4%', metric: 'MET-001' },
      { label: '利润总额', value: '1,240', unit: '万元', target: '1,230', achievement: '100.8%', delta: '+6.2%', deltaLabel: '同比', state: '正常', note: '毛利率 18.2% · 环比 +0.3pp' },
      { label: '产值完成率', value: '95.1', unit: '%', target: '100', achievement: '95.1%', delta: '-2.5%', deltaLabel: '同比', state: '预警', note: '低于计划 4.9 个百分点', metric: 'MET-002' },
      { label: '订单蓄水', value: '17,160', unit: '万元', target: '17,500', achievement: '98.1%', delta: '+5.6%', deltaLabel: '环比', state: '正常', note: '已签未交付 11,800 万元' },
      { label: '存货周转天数', value: '41.8', unit: '天', target: '38.0', achievement: '90.9%', delta: '+2.2天', deltaLabel: '环比', state: '预警', note: '成品库存上升', metric: 'MET-003' },
      { label: '应收周转天数', value: '56.1', unit: '天', target: '55.0', achievement: '98.0%', delta: '+1.4天', deltaLabel: '环比', state: '关注', note: '重点客户回款延迟' },
      { label: '经营现金流', value: '1,025', unit: '万元', target: '1,000', achievement: '102.5%', delta: '+3.1%', deltaLabel: '环比', state: '正常', note: '回款覆盖支出 1.05 倍' },
      { label: '制造费用率', value: '12.1', unit: '%', target: '12.0', achievement: '99.2%', delta: '+0.2pp', deltaLabel: '环比', state: '关注', note: '外协费用小幅增加' }
    ],
    trend: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      actual: [7210, 7480, 7650, 7890, 8030, 8180, 8350],
      target: [7300, 7500, 7750, 8000, 8200, 8400, 8550]
    },
    conclusions: [
      { title: '收入完成率 97.7%，较 6 月改善', text: '7 月营业收入 8,350 万元，环比 +2.1%，目标达成 97.7%；包装材料订单贡献主要增量。' },
      { title: '产值完成率 95.1%，后加工仍是短板', text: '后加工车间计划 1,820 万元、实际 1,690 万元，缺口 130 万元；设备换版和临时外协影响交付节奏。' },
      { title: '存货周转 41.8 天，环比上升 2.2 天', text: '成品库存和纸张原料库存同步上升，需在 7 月经营会明确压降目标。' }
    ],
    anomalies: [
      { title: '7月产值完成率低于计划 4.9%', org: '生产管理部 / 刘强', status: '已关闭', progress: 100, metric: 'MET-002', priority: '高', note: '设备换版与临时外协' },
      { title: '存货周转天数环比上升 2.2 天', org: '供应链管理部 / 杨林', status: '整改中', progress: 45, metric: 'MET-003', priority: '中', note: '成品库存上升' }
    ],
    topicOverrides: {
      operation: {
        summary: [
          ['累计营业收入', '54,790', '万元', '年度预算完成 57.4%'],
          ['累计利润总额', '7,790', '万元', '利润率 14.2%'],
          ['累计经营现金流', '6,732', '万元', '回款覆盖支出 1.05 倍']
        ],
        rows: [
          ['1月', '7,210', '980', '842', '92.4%'],
          ['2月', '7,480', '1,020', '910', '93.1%'],
          ['3月', '7,650', '1,080', '960', '94.2%'],
          ['4月', '7,890', '1,120', '1,005', '95.0%'],
          ['5月', '8,030', '1,150', '980', '95.6%'],
          ['6月', '8,180', '1,200', '1,010', '96.1%'],
          ['7月', '8,350', '1,240', '1,025', '97.7%']
        ],
        insight: '收入累计完成年度预算 57.4%；7 月收入 8,350 万元，环比 +2.1%，目标达成 97.7%。利润端保持达标，经营现金流为正。'
      },
      orders: {
        funnel: [
          ['已签未交付', '11,800', 69],
          ['在谈项目', '3,760', 22],
          ['投标项目', '1,600', 9]
        ],
        rows: [
          ['华东包装材料年度框架', '四川华彩', '3,050', '2026-08-31', '已签未交付'],
          ['纸张原料季度框架', '成都恒丰', '1,720', '2026-08-20', '已签未交付'],
          ['绿色印刷技改配套', '宜宾智造', '1,050', '2026-09-25', '在谈'],
          ['标签年度集采', '重点客户 A', '760', '2026-08-28', '投标']
        ],
        insight: '订单蓄水 17,160 万元，环比增长 5.6%；已签未交付占 69%。8—9 月交付压力集中在包装材料和标签订单。'
      },
      output: {
        rows: [
          ['印刷一车间', '2,940', '2,872', '97.7%', '正常'],
          ['印刷二车间', '2,430', '2,312', '95.1%', '预警'],
          ['后加工车间', '1,820', '1,690', '92.9%', '重点关注']
        ],
        insight: '后加工车间计划 1,820 万元、实际 1,690 万元，缺口 130 万元；设备换版和临时外协影响交付节奏。'
      }
    },
    versions: [
      { version: 'V1.2', period: '2026年7月', status: '已归档', publisher: '周敏', publishedAt: '2026-07-20 10:05', snapshot: 'STAR-SNAPSHOT-202607-01', changes: '完成 7 月简报，纳入订单蓄水和存货专题' },
      { version: 'V1.1', period: '2026年6月', status: '已归档', publisher: '周敏', publishedAt: '2026-06-20 09:50', snapshot: 'STAR-SNAPSHOT-202606-01', changes: '首次按确认模板固化经营总览' }
    ],
    timeline: [
      { time: '2026-07-20 08:30', actor: '系统动作流', action: '冻结数据快照', result: '完成 ERP / MES / QMS 数据对账，冻结 7 月简报快照' },
      { time: '2026-07-20 09:20', actor: '周敏', action: '补充经营结论', result: '补充订单蓄水、产值偏差和存货周转分析' },
      { time: '2026-07-20 10:05', actor: '周敏', action: '发布简报 V1.2', result: '推送公司管理层和 7 月经营分析会' }
    ]
  }
};

state.briefVersions = state.briefVersions || BRIEF_DATA['2026-08'].versions.map(function (x) { return Object.assign({}, x); });
state.briefTimeline = state.briefTimeline || BRIEF_DATA['2026-08'].timeline.map(function (x) { return Object.assign({}, x); });

/* ---------- 数据与格式化辅助 ---------- */

function briefPeriodData() { return BRIEF_DATA[state.briefPeriod] || BRIEF_DATA['2026-08']; }
function briefStateLabel() {
  const d = briefPeriodData();
  if (state.briefPublished) return '已发布';
  return d.status === '已归档' ? '已归档' : '编制中';
}
function briefTopicData() {
  const d = briefPeriodData();
  return Object.assign({}, BRIEF_TOPIC_BASE, d.topicOverrides || {});
}
function briefStatus(value) {
  const text = String(value);
  let cls = 'info';
  if (/已发布|已就绪|已归档|已生效|通过|正常|按计划/.test(text)) cls = 'ok';
  else if (/预警|待补|滞后|关注|待反馈|待复核/.test(text)) cls = 'warn';
  else if (/草稿|编制中|待发布/.test(text)) cls = 'info';
  return '<span class="brief-status ' + cls + '">' + text + '</span>';
}
function briefDeltaClass(delta) {
  const text = String(delta);
  if (text.indexOf('-') === 0) return 'down';
  if (text.indexOf('+') === 0) return 'up';
  return 'flat';
}
function briefNextVersion(version) {
  const m = String(version).match(/V(\d+)\.(\d+)/);
  if (!m) return 'V1.0';
  return 'V' + m[1] + '.' + (Number(m[2]) + 1);
}
function briefNow() {
  return '2026-08-25 10:00';
}
function briefTable(headers, rows) {
  return '<div class="table-card brief-table"><table><thead><tr>' + headers.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
    rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + cell + '</td>'; }).join('') + '</tr>'; }).join('') +
    '</tbody></table></div>';
}
function briefBars(items) {
  return '<div class="brief-bar-list">' + items.map(function (item) {
    const label = item[0], value = Number(item[1]), note = item[2] || '';
    return '<div class="brief-bar-row"><div class="brief-bar-label"><b>' + label + '</b><span>' + note + '</span></div><div class="brief-bar-track"><i style="width:' + Math.min(100, value) + '%"></i></div><strong>' + value + '%</strong></div>';
  }).join('') + '</div>';
}

/* ---------- 页面区块 ---------- */

function briefHero() {
  const d = briefPeriodData();
  return '<div class="brief-hero"><div><span class="eyebrow">观星台 · 经营简报</span><h2>' + d.label + '经营简报</h2><p>经营发展部月度经营简报 · 按确认模板固化经营总览、重点专题、异常说明和会议责任事项。</p><div class="brief-hero-chips"><span>' + briefStatus(briefStateLabel()) + '</span><span>数据快照 ' + state.briefSnapshot + '</span><span>更新 ' + state.briefUpdatedAt + '</span></div></div><div class="session-note">当前：' + currentRole().label + '<br>数据为 Demo 模拟，刷新后恢复基线。<br><b class="brief-publisher">' + d.publisher + '</b></div></div>';
}

function briefMetaStrip() {
  const d = briefPeriodData();
  const included = state.briefChapters.filter(function (x) { return x.included; }).length;
  return '<div class="brief-meta"><div><span>简报状态</span><b>' + briefStatus(briefStateLabel()) + '</b><small>模板 ' + state.briefTemplateVersion + '</small></div><div><span>数据快照</span><b>' + state.briefSnapshot + '</b><small>' + state.briefUpdatedAt + '</small></div><div><span>指标覆盖</span><b>8 项</b><small>财务 / 生产 / 供应链</small></div><div><span>简报章节</span><b>' + included + ' / ' + state.briefChapters.length + '</b><small>本期纳入</small></div><div><span>待补原因</span><b>2 项</b><small>订单 / 风险</small></div><div><span>关联会议</span><b>' + d.meeting + '</b><small>' + d.short + '经营分析会</small></div></div>';
}

function briefTabs() {
  const tabs = [['overview', '经营总览'], ['topics', '重点专题'], ['template', '简报模板'], ['history', '版本与留痕']];
  return '<div class="tabs brief-tabs">' + tabs.map(function (x) {
    return '<button class="' + (state.briefTab === x[0] ? 'active' : '') + '" onclick="setBriefTab(\'' + x[0] + '\')">' + x[1] + (x[0] === 'template' ? '<i class="tab-count">' + state.briefChapters.length + '</i>' : '') + '</button>';
  }).join('') + '</div>';
}

function briefKpiCard(k) {
  const tag = k.metric ? 'button' : 'article';
  const attr = k.metric ? ' onclick="briefOpenMetric(\'' + k.metric + '\')" title="查看指标下钻"' : '';
  return '<' + tag + ' class="brief-kpi ' + (k.state === '预警' ? 'warning' : '') + '"' + attr + '>' +
    '<div class="brief-kpi-head"><span>' + k.label + '</span>' + badge(k.state) + '</div>' +
    '<strong>' + k.value + '<small>' + k.unit + '</small></strong>' +
    '<div class="brief-kpi-meta"><span>目标 ' + k.target + k.unit + '</span><span>达成 ' + k.achievement + '</span></div>' +
    '<div class="brief-kpi-foot"><b class="' + briefDeltaClass(k.delta) + '">' + k.delta + '</b><span>' + k.deltaLabel + '</span><small>' + k.note + '</small></div>' +
    '</' + tag + '>';
}

function briefTrendChart(trend) {
  const max = Math.max.apply(null, trend.actual.concat(trend.target));
  return '<div class="trend-chart brief-trend">' + trend.actual.map(function (v, i) {
    const ah = Math.max(18, v / max * 100), th = Math.max(18, trend.target[i] / max * 100);
    return '<div class="trend-group"><div class="trend-bars"><i class="target" style="height:' + th + '%"></i><i class="actual" style="height:' + ah + '%"></i></div><b>' + trend.labels[i] + '</b><span>' + v.toLocaleString('zh-CN') + '</span></div>';
  }).join('') + '</div><div class="chart-legend"><span><i class="legend-target"></i>计划</span><span><i class="legend-actual"></i>实际</span><span class="brief-chart-unit">单位：万元</span></div>';
}

function briefOverview() {
  const d = briefPeriodData();
  const conclusions = d.conclusions.map(function (x, i) {
    return '<div class="brief-conclusion"><span>' + String(i + 1).padStart(2, '0') + '</span><div><b>' + x.title + '</b><p>' + x.text + '</p></div></div>';
  }).join('');
  const anomalies = d.anomalies.map(function (a) {
    const action = a.metric ? '<button class="link" onclick="briefOpenProblem(\'' + a.metric + '\')">发起问题 →</button>' : '<button class="link" onclick="go(\'problem\')">查看台账 →</button>';
    return '<div class="brief-anomaly"><div class="brief-anomaly-main"><div><span class="priority ' + a.priority + '">' + a.priority + '</span><b>' + a.title + '</b></div><small>' + a.org + ' · ' + a.note + '</small><div class="brief-progress"><i style="width:' + a.progress + '%"></i></div></div><aside>' + badge(a.status) + action + '</aside></div>';
  }).join('');
  return '<div class="brief-kpi-grid">' + d.kpis.map(briefKpiCard).join('') + '</div>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>营业收入与计划趋势</h2><span class="meta">' + d.label + ' · 单位：万元</span></div>' + briefTrendChart(d.trend) +
    '<div class="brief-chart-summary"><div><span>' + d.short + '实际</span><b>' + d.revenueSummary.actual + '<small>万元</small></b></div><div><span>月度目标</span><b>' + d.revenueSummary.target + '<small>万元</small></b></div><div><span>月度缺口</span><b class="down">' + d.revenueSummary.gap + '<small>万元</small></b></div><div><span>年度累计</span><b>' + d.revenueSummary.cumulative + '<small>万元</small></b></div></div></section>' +
    '<section class="card"><div class="card-h"><h2>本期经营结论</h2><span class="meta">供经营分析会审议</span></div><div class="brief-conclusions">' + conclusions + '</div><div class="card-footer"><button class="secondary" onclick="setBriefTab(\'topics\')">查看重点专题</button><button class="primary" onclick="addBriefToMeeting()">加入会议议题</button></div></section></div>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>重点异常与责任事项</h2><span class="meta">' + d.anomalies.length + ' 项</span></div><div class="brief-anomaly-list">' + anomalies + '</div><div class="card-footer"><button class="secondary" onclick="go(\'problem\')">查看问题台账</button><button class="secondary" onclick="go(\'meeting\')">打开经营分析会</button></div></section>' +
    '<section class="card"><div class="card-h"><h2>数据来源与口径</h2><span class="meta">' + state.briefSnapshot + '</span></div><div class="info-grid brief-source-grid">' +
      info('数据批次', d.batch) + info('责任部门', '经营发展部 / 周敏') + info('指标版本', '3 个指标 · 版本已锁定') + info('来源系统', 'ERP · MES · QMS') + info('质量结果', '完整性 99.8% · 3 条异常已分派') + info('发布状态', briefStatus(briefStateLabel())) +
    '</div><div class="context-tip">简报引用冻结数据快照；实时驾驶舱更新不会改写已发布简报的判断依据。</div><div class="card-footer"><button class="secondary" onclick="refreshBriefSnapshot()">刷新快照</button><button class="secondary" onclick="exportBrief()">导出 / 打印</button></div></section></div>';
}

function briefTopicPanel() {
  const t = briefTopicData()[state.briefTopic] || briefTopicData().operation;
  const d = briefPeriodData();
  let body = '';
  if (state.briefTopic === 'operation') {
    body = '<div class="brief-topic-summary">' + t.summary.map(function (x) { return '<div><span>' + x[0] + '</span><b>' + x[1] + '<small>' + x[2] + '</small></b><em>' + x[3] + '</em></div>'; }).join('') + '</div>' +
      briefTable(['月份', '营业收入（万元）', '利润总额（万元）', '经营现金流（万元）', '收入达成率'], t.rows);
  } else if (state.briefTopic === 'structure') {
    body = briefBars(t.bars) + briefTable(['业务板块', '收入（万元）', '收入占比', '毛利率', '同比'], t.rows);
  } else if (state.briefTopic === 'orders') {
    body = '<div class="brief-funnel">' + t.funnel.map(function (x) { return '<div class="brief-funnel-row"><div><b>' + x[0] + '</b><span>' + x[1] + ' 万元</span></div><div class="brief-bar-track"><i style="width:' + x[2] + '%"></i></div><strong>' + x[2] + '%</strong></div>'; }).join('') + '</div>' +
      briefTable(['重点订单 / 项目', '客户', '金额（万元）', '交付节点', '状态'], t.rows);
  } else if (state.briefTopic === 'output') {
    body = briefTable(['车间', '计划产值（万元）', '实际产值（万元）', '完成率', '状态'], t.rows);
  } else if (state.briefTopic === 'product') {
    body = briefBars(t.bars) + briefTable(['产品类型', '收入（万元）', '占比', '毛利率', '同比'], t.rows);
  } else if (state.briefTopic === 'outsourcing') {
    body = '<div class="brief-split-bar"><i class="self" style="width:' + t.split[0] + '%">自产 ' + t.split[0] + '%</i><i class="out" style="width:' + t.split[1] + '%">外协 ' + t.split[1] + '%</i></div>' + briefTable(['生产方式', '产值（万元）', '占比', '环比', '质量合格率'], t.rows);
  } else if (state.briefTopic === 'investment') {
    body = '<div class="brief-projects">' + t.projects.map(function (p) {
      return '<div class="brief-project"><div><b>' + p.name + '</b><span>预算 ' + p.budget + ' 万元 · 已执行 ' + p.spent + ' 万元</span></div><strong>' + p.progress + '%</strong><div class="brief-progress"><i style="width:' + p.progress + '%"></i></div><em>' + p.status + '</em></div>';
    }).join('') + '</div>' + briefTable(['项目', '预算（万元）', '已执行（万元）', '执行率', '状态'], t.projects.map(function (p) { return [p.name, p.budget, p.spent, p.progress + '%', p.status]; }));
  }
  const meta = '<div class="brief-topic-meta"><span>数据期间：' + d.label + '</span><span>数据来源：' + (state.briefTopic === 'investment' ? 'ERP 资金 / 投资台账' : state.briefTopic === 'orders' ? 'ERP 订单' : state.briefTopic === 'output' ? 'MES 报工' : 'ERP 财务') + '</span><span>口径版本：简报模板 ' + state.briefTemplateVersion + '</span><span>责任部门：经营发展部</span></div>';
  return '<div class="brief-topic-tabs">' + BRIEF_TOPIC_TABS.map(function (x) {
    return '<button class="brief-topic-tab ' + (state.briefTopic === x[0] ? 'active' : '') + '" onclick="setBriefTopic(\'' + x[0] + '\')">' + x[1] + '</button>';
  }).join('') + '</div><section class="card"><div class="card-h"><h2>' + (BRIEF_TOPIC_TABS.find(function (x) { return x[0] === state.briefTopic; }) || ['', '经营情况'])[1] + '</h2><span class="meta">' + d.label + ' · 重点专题</span></div><div class="brief-topic-body">' + body + '<div class="brief-insight"><b>分析结论</b><p>' + t.insight + '</p></div>' + meta + '</div></section>';
}

function briefTemplate() {
  const included = state.briefChapters.filter(function (x) { return x.included; }).length;
  const rows = state.briefChapters.map(function (c, i) {
    return '<div class="brief-chapter-row ' + (c.included ? '' : 'excluded') + '"><label class="brief-check"><input type="checkbox" ' + (c.included ? 'checked' : '') + ' onchange="toggleBriefChapter(' + i + ')"></label><span class="brief-chapter-no">' + c.no + '</span><div><b>' + c.name + '</b><small>' + c.owner + '</small></div><span>' + c.source + '</span><span>' + c.updated + '</span>' + briefStatus(c.status) + '<button class="link" onclick="briefPreviewChapter(\'' + c.target + '\')">预览</button></div>';
  }).join('');
  return '<section class="card"><div class="card-h"><h2>月度经营简报模板</h2><span class="meta">' + state.briefTemplateVersion + ' · 本期纳入 ' + included + ' / ' + state.briefChapters.length + ' 章</span></div><div class="brief-template-info"><div><span>模板名称</span><b>月度经营简报（标准版）</b></div><div><span>适用范围</span><b>公司级月度经营分析会</b></div><div><span>审批状态</span>' + briefStatus('已生效') + '</div><div><span>责任人</span><b>经营发展部 / 周敏</b></div><div><span>数据期间</span><b>' + briefPeriodData().label + '</b></div><div><span>关联会议</span><b>' + briefPeriodData().meeting + '</b></div></div><div class="brief-chapter-head"><span></span><span>序号</span><span>章节 / 责任人</span><span>数据来源</span><span>最后更新</span><span>状态</span><span>操作</span></div><div class="brief-chapter-list">' + rows + '</div><div class="card-footer"><button class="secondary" onclick="resetBriefTemplate()">恢复默认</button><button class="secondary" onclick="addBriefChapter()">+ 添加章节</button><button class="primary" onclick="saveBriefTemplate()">保存模板版本</button></div></section><div class="context-tip">模板变更需经经营发展部确认；未勾选章节不纳入本期简报，历史版本保留，发布后仍可回看原始章节和口径。</div>';
}

function briefHistory() {
  const versionRows = state.briefVersions.map(function (v) {
    return ['<b>' + v.version + '</b>', v.period, briefStatus(v.status), v.publisher, v.publishedAt, v.snapshot, v.changes];
  });
  const timeline = state.briefTimeline.map(function (x) {
    return '<div class="brief-timeline-item"><span>' + x.time + '</span><i></i><div><b>' + x.actor + ' · ' + x.action + '</b><p>' + x.result + '</p></div></div>';
  }).join('');
  return '<section class="card"><div class="card-h"><h2>版本与发布记录</h2><span class="meta">最新 ' + (state.briefVersions[0] ? state.briefVersions[0].version : '—') + '</span></div>' + briefTable(['版本', '期间', '状态', '发布人', '发布时间', '数据快照', '变更说明'], versionRows) + '<div class="card-footer"><button class="secondary" onclick="refreshBriefSnapshot()">刷新数据快照</button><button class="primary" onclick="publishBrief()">发布简报</button></div></section>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>运行留痕</h2><span class="meta">快照、审核、发布、会议</span></div><div class="brief-timeline">' + timeline + '</div></section><section class="card"><div class="card-h"><h2>发布检查</h2><span class="meta">发布前自动校验</span></div><div class="brief-checks"><div><b>章节完整性</b><span>' + state.briefChapters.filter(function (x) { return x.included; }).length + ' 章纳入 · 2 项待补原因</span>' + briefStatus('通过') + '</div><div><b>数据快照</b><span>' + state.briefSnapshot + ' · 已冻结</span>' + briefStatus('通过') + '</div><div><b>指标口径</b><span>3 个指标已绑定版本与责任部门</span>' + briefStatus('通过') + '</div><div><b>会议联动</b><span>' + briefPeriodData().meeting + ' · 议题可回看</span>' + briefStatus('通过') + '</div></div><div class="context-tip">发布后生成新版本并保留原快照；如指标口径变化，需重新走简报评审。</div></section></div>';
}

function briefPage() {
  let body = briefOverview();
  if (state.briefTab === 'topics') body = briefTopicPanel();
  if (state.briefTab === 'template') body = briefTemplate();
  if (state.briefTab === 'history') body = briefHistory();
  const content = briefHero() + briefMetaStrip() + briefTabs() + body;
  const actions = '<select class="brief-period-select" aria-label="选择简报期间" onchange="switchBriefPeriod(this.value)">' +
    Object.keys(BRIEF_DATA).map(function (key) { return '<option value="' + key + '" ' + (state.briefPeriod === key ? 'selected' : '') + '>' + BRIEF_DATA[key].label + '</option>'; }).join('') +
    '</select><button class="secondary" onclick="exportBrief()">导出 / 打印</button><button class="secondary" onclick="refreshBriefSnapshot()">刷新快照</button><button class="primary" onclick="publishBrief()">发布简报</button>';
  return shell(content, '经营简报', '经营发展部 · 月度经营简报', actions);
}

/* ---------- 交互动作 ---------- */

function setBriefTab(tab) {
  if (['overview', 'topics', 'template', 'history'].indexOf(tab) < 0) return;
  state.briefTab = tab;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function setBriefTopic(topic) {
  if (!BRIEF_TOPIC_TABS.some(function (x) { return x[0] === topic; })) return;
  state.briefTopic = topic;
  render();
}
function switchBriefPeriod(period) {
  if (!BRIEF_DATA[period]) return;
  const d = BRIEF_DATA[period];
  state.briefPeriod = period;
  state.briefSnapshot = d.snapshot;
  state.briefUpdatedAt = d.updatedAt;
  state.briefPublished = d.status === '已发布';
  state.briefVersions = d.versions.map(function (x) { return Object.assign({}, x); });
  state.briefTimeline = d.timeline.map(function (x) { return Object.assign({}, x); });
  state.briefTab = 'overview';
  render();
  toast('已切换至' + d.label + '经营简报；数据快照和版本记录同步更新。');
}
function briefOpenMetric(metricId) {
  if (typeof showMetric === 'function' && db.metrics.some(function (m) { return m.id === metricId; })) {
    showMetric(metricId);
    return;
  }
  setBriefTab('topics');
  toast('该指标未配置独立下钻页，已打开重点专题。');
}
function briefOpenProblem(metricId) {
  if (metricId && typeof openProblemForm === 'function') { openProblemForm(metricId); return; }
  go('problem');
}
function exportBrief() {
  toast('已打开打印预览；可在浏览器中选择“另存为 PDF”。');
  setTimeout(function () { window.print(); }, 260);
}
function refreshBriefSnapshot() {
  if (typeof starManageable === 'function' && !starManageable()) {
    toast('仅经营发展部、审计监督部或公司管理层可刷新简报快照。');
    return;
  }
  const d = briefPeriodData();
  const newSnapshot = 'STAR-SNAPSHOT-' + state.briefPeriod.replace('-', '') + '-02';
  state.briefSnapshot = newSnapshot;
  state.briefUpdatedAt = briefNow();
  d.snapshot = newSnapshot;
  d.updatedAt = state.briefUpdatedAt;
  state.briefTimeline.unshift({ time: briefNow(), actor: currentRole().name, action: '刷新数据快照', result: '重新执行 ERP / MES / QMS 对账，生成 ' + newSnapshot + '；驾驶舱实时数据与简报冻结依据分离。' });
  render();
  toast('数据快照已刷新，简报版本和会议依据仍保留原快照。');
}
function publishBrief() {
  if (!['operations', 'manager'].includes(state.role)) {
    toast('仅经营发展部或公司管理层可发布经营简报。');
    return;
  }
  const included = state.briefChapters.filter(function (x) { return x.included; });
  if (included.length < 4) {
    toast('本期纳入章节少于 4 章，请先在“简报模板”中确认章节。');
    return;
  }
  const d = briefPeriodData();
  const next = briefNextVersion(state.briefVersions[0] ? state.briefVersions[0].version : 'V1.0');
  d.status = '已发布';
  state.briefPublished = true;
  state.briefVersions.unshift({ version: next, period: d.label, status: '已发布', publisher: currentRole().label + ' / ' + currentRole().name, publishedAt: briefNow(), snapshot: state.briefSnapshot, changes: '基于模板 ' + state.briefTemplateVersion + ' 发布，本期纳入 ' + included.length + ' 章；关联 ' + d.meeting + '。' });
  state.briefTimeline.unshift({ time: briefNow(), actor: currentRole().name, action: '发布简报 ' + next, result: '简报已推送公司管理层和经营分析会，版本与数据快照已绑定。' });
  render();
  toast('简报 ' + next + ' 已发布；版本、快照和会议引用已同步。');
}function toggleBriefChapter(index) {
  const c = state.briefChapters[index];
  if (!c) return;
  c.included = !c.included;
  render();
  toast('已' + (c.included ? '纳入' : '移出') + '“' + c.name + '”；保存模板后生效。');
}
function saveBriefTemplate() {
  if (!['operations', 'manager'].includes(state.role)) {
    toast('仅经营发展部或公司管理层可保存简报模板。');
    return;
  }
  const included = state.briefChapters.filter(function (x) { return x.included; }).length;
  if (included < 4) {
    toast('至少保留 4 个章节才能保存模板。');
    return;
  }
  state.briefTemplateVersion = briefNextVersion(state.briefTemplateVersion);
  state.briefTimeline.unshift({ time: briefNow(), actor: currentRole().name, action: '保存简报模板 ' + state.briefTemplateVersion, result: '本期纳入 ' + included + ' 章；模板变更保留历史版本，待发布时生效。' });
  render();
  toast('模板已保存为 ' + state.briefTemplateVersion + '，历史版本仍可回看。');
}
function resetBriefTemplate() {
  state.briefChapters = BRIEF_CHAPTER_DEFS.map(function (x) { return Object.assign({}, x); });
  render();
  toast('已恢复默认 7 章模板；保存后生成新的模板版本。');
}
function addBriefChapter() {
  openModal('添加简报章节', '<div class="form-grid"><div class="field full"><label>章节名称</label><input id="briefNewChapterName" value="专题：质量与交付"></div><div class="field"><label>责任部门</label><select id="briefNewChapterOwner"><option>质量管理部 / 周勇</option><option>生产管理部 / 刘强</option><option>经营发展部 / 周敏</option></select></div><div class="field"><label>数据来源</label><input id="briefNewChapterSource" value="QMS · 质量台账"></div></div><div class="context-tip">新增章节在保存模板后纳入下一期简报；本期已发布版本不会被改写。</div>', '<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="confirmAddBriefChapter()">加入模板</button>');
}
function confirmAddBriefChapter() {
  const name = ($('#briefNewChapterName') ? $('#briefNewChapterName').value : '').trim();
  const owner = $('#briefNewChapterOwner') ? $('#briefNewChapterOwner').value : '质量管理部 / 周勇';
  const source = ($('#briefNewChapterSource') ? $('#briefNewChapterSource').value : '').trim() || 'QMS · 质量台账';
  if (!name) { toast('请填写章节名称'); return; }
  const no = String(state.briefChapters.length + 1).padStart(2, '0');
  state.briefChapters.push({ no: no, name: name, owner: owner, source: source, updated: briefNow(), status: '待补充', target: 'overview', included: true });
  closeModal();
  render();
  toast('章节已加入模板；保存模板版本后纳入下一期简报。');
}
function briefPreviewChapter(target) {
  if (target === 'meeting') { go('meeting'); return; }
  if (target.indexOf('topics:') === 0) { state.briefTab = 'topics'; state.briefTopic = target.split(':')[1]; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  setBriefTab('overview');
}
function addBriefToMeeting() {
  const m = db.starCenter && db.starCenter.meeting;
  if (m) {
    const exists = m.agenda.some(function (a) { return a.id === 'AGD-04'; });
    if (!exists) {
      m.agenda.push({ id: 'AGD-04', org: '经营发展部', title: '8月经营简报：收入缺口与存货周转', finding: '营业收入低于目标 274 万元；存货周转 42.6 天，环比 +4.8 天。', decision: '纳入 8 月经营分析会审议，明确责任部门和压降目标。', status: '待讨论' });
      m.audit.unshift({ time: briefNow(), actor: currentRole().name, action: '加入会议议题', result: '经营简报异常已加入 8 月经营分析会，待会议决策。' });
    }
  }
  state.page = 'meeting';
  state.meetingTab = 'agenda';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('经营简报异常已加入 8 月经营分析会议题。');
}

/* ---------- 观星台全景入口：把经营简报作为首个落地场景 ---------- */

const starOverviewBeforeBrief = starOverviewPage;
starOverviewPage = function () {
  const html = starOverviewBeforeBrief();
  if (html.indexOf('brief-entry') >= 0) return html;
  const entry = '<div class="brief-entry"><div><span class="eyebrow">月度经营简报 · 首个落地场景</span><h3>' + briefPeriodData().label + '经营简报 · ' + briefStateLabel() + '</h3><p>8 项核心指标 · 7 个重点专题 · 2 项待补原因 · 关联 ' + briefPeriodData().meeting + '</p></div><button class="primary" onclick="go(\'brief\')">打开经营简报 →</button></div>';
  return html.replace('<div class="star-boundary">', entry + '<div class="star-boundary">');
};

/* ---------- 最后接管 render，保留全部原有页面 ---------- */

const renderBeforeStarBrief = render;
render = function () {
  if (state.page === 'brief') {
    $('#app').innerHTML = briefPage();
    return;
  }
  return renderBeforeStarBrief();
};
