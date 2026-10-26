/* ===== 观星台 · 主题数据（SOW STAR-F-009 ~ STAR-F-014 / STAR-A-004 / STAR-S-002） ===== */
/* 主题数据不是独立章节，属于“指标体系与业务主题”功能域；本页提供主题库、公共维度、主题模型、数据预览和版本血缘。 */

DEMO_RELEASE.version = 'V1.7.3-THEME-dev';
DEMO_RELEASE.scope = '在 V1.7.2 指挥看板基础上，新增观星台主题数据：业务主题库、公共维度、主题模型版本、主题数据预览、血缘与质量影响；其余范围不变。';

state.themeTab = state.themeTab || 'catalog';
state.themeKey = state.themeKey || 'operation';
state.themePreviewPeriod = state.themePreviewPeriod || '全部期间';
state.themePreviewCompany = state.themePreviewCompany || '全部';
state.themeUpdatedAt = state.themeUpdatedAt || '2026-08-20 08:30';

const THEME_CATALOG = {
  operation: {
    key: 'operation', code: 'TH-OP-001', name: '经营主题', short: '经营',
    owner: '经营发展部 / 周敏', source: 'ERP 财务 / 销售 / 库存',
    fact: 'fact_operation_month', grain: '公司 + 产品线 + 月份', businessKey: 'company_code + product_line + period',
    dims: ['公司', '组织', '客户', '产品', '期间'], metrics: 8, version: 'V2.4', status: '已发布', quality: '99.8%',
    history: '2024-01 至今', updated: '2026-08-20 08:30',
    description: '收入、利润、订单、产值、存货、应收、现金流和投资执行。',
    impact: ['经营驾驶舱', '经营简报', '指挥看板', '会议场景'],
    previewHeaders: ['期间', '公司', '营业收入（万元）', '利润总额（万元）', '产值完成率', '存货周转天数'],
    previewRows: [
      ['2026-08', '精美', '8,426', '1,286', '93.8%', '42.6'],
      ['2026-07', '精美', '8,350', '1,240', '95.1%', '41.8'],
      ['2026-06', '精美', '8,180', '1,200', '94.8%', '40.1'],
      ['2026-08', '丽彩', '1,260', '168', '96.2%', '38.4'],
      ['2026-08', '五彩', '980', '121', '97.1%', '36.8'],
      ['2026-08', '欣兴', '760', '92', '95.4%', '35.2'],
      ['2026-08', '嘉美', '620', '74', '94.8%', '34.6']
    ]
  },
  production: {
    key: 'production', code: 'TH-PR-002', name: '生产交付主题', short: '生产',
    owner: '生产管理部 / 刘强', source: 'MES / QMS / EHS',
    fact: 'fact_production_day', grain: '公司 + 车间 + 产线 + 日期', businessKey: 'company_code + workshop_code + line_code + date',
    dims: ['公司', '组织', '车间', '产线', '设备', '产品', '班次', '期间'], metrics: 12, version: 'V3.2', status: '已发布', quality: '99.6%',
    history: '2024-01 至今', updated: '2026-08-20 08:35',
    description: '计划、制造、工艺、质量、交付、安全、设备和工时。',
    impact: ['指挥看板', '生产协调会', '指标下钻', '数据质量闭环'],
    previewHeaders: ['期间', '车间', '计划产值（万元）', '实际产值（万元）', '完成率', '一次合格率', '设备停机小时'],
    previewRows: [
      ['2026-08', '印刷一车间', '2,980', '2,896', '97.2%', '98.6%', '12'],
      ['2026-08', '印刷二车间', '2,450', '2,318', '94.6%', '98.1%', '18'],
      ['2026-08', '后加工车间', '1,860', '1,657', '89.1%', '96.4%', '36'],
      ['2026-07', '印刷一车间', '2,940', '2,872', '97.7%', '98.4%', '10'],
      ['2026-07', '后加工车间', '1,820', '1,690', '92.9%', '97.6%', '24']
    ]
  },
  purchase: {
    key: 'purchase', code: 'TH-PC-003', name: '采购合同成本主题', short: '采购合同成本',
    owner: '供应链管理部 / 杨林', source: 'ERP / SRM / OA',
    fact: 'fact_purchase_contract_month', grain: '公司 + 供应商 + 合同 + 物料 + 月份', businessKey: 'company_code + supplier_code + contract_no + material_code + period',
    dims: ['公司', '供应商', '合同', '物料', '期间'], metrics: 9, version: 'V1.8', status: '试运行', quality: '99.2%',
    history: '2025-01 至今', updated: '2026-08-20 08:40',
    description: '采购、供应商、合同执行、制造费用和成本结构。',
    impact: ['双源风险', '招采监督', '指挥看板', '经营简报'],
    previewHeaders: ['期间', '供应商', '采购金额（万元）', '到货及时率', '质量合格率', '合同履约率'],
    previewRows: [
      ['2026-08', '四川华彩', '3,200', '96.2%', '98.4%', '94.5%'],
      ['2026-08', '成都恒丰', '1,860', '94.8%', '99.1%', '96.0%'],
      ['2026-08', '宜宾智造', '1,200', '91.5%', '97.6%', '90.2%'],
      ['2026-08', '重点客户 A', '860', '98.0%', '98.8%', '95.0%'],
      ['2026-07', '四川华彩', '3,050', '95.1%', '98.2%', '93.8%']
    ]
  },
  hr: {
    key: 'hr', code: 'TH-HR-004', name: '人员主题', short: '人员',
    owner: '人力资源部 / 吴欣', source: 'HR 主数据 / ERP 薪资',
    fact: 'fact_hr_month', grain: '公司 + 组织 + 岗位 + 人员类别 + 月份', businessKey: 'company_code + org_code + job_code + employee_type + period',
    dims: ['公司', '组织', '岗位', '人员类别', '期间'], metrics: 6, version: 'V1.2', status: '待发布', quality: '98.9%',
    history: '2025-01 至今', updated: '2026-08-20 08:45',
    description: '人员总量、结构、变化、计件工资和机构预警。',
    impact: ['经营简报', '人力工作台', '组织效能分析'],
    previewHeaders: ['期间', '公司', '在册人数', '离职率', '人均产值（万元）', '岗位资格达标率'],
    previewRows: [
      ['2026-08', '精美', '512', '1.8%', '16.5', '96.8%'],
      ['2026-07', '精美', '508', '1.6%', '16.4', '96.2%'],
      ['2026-08', '丽彩', '86', '2.1%', '14.7', '95.4%'],
      ['2026-08', '五彩', '74', '1.9%', '13.2', '94.8%'],
      ['2026-08', '欣兴', '58', '1.4%', '12.8', '96.0%'],
      ['2026-08', '嘉美', '42', '2.3%', '11.6', '93.5%']
    ]
  },
  energy: {
    key: 'energy', code: 'TH-EN-005', name: '能源主题', short: '能源',
    owner: '设备动力部 / 李超', source: '能源采集 / ERP',
    fact: 'fact_energy_day', grain: '公司 + 车间 + 设备 + 介质 + 日期', businessKey: '待确认',
    dims: ['公司', '车间', '设备', '介质', '期间'], metrics: 0, version: '—', status: '待确认', quality: '—',
    history: '待确认', updated: '2026-08-20 08:50',
    description: '能源日报、用能去向、成本、生产电耗、单件能耗、能源质量和能耗预警；采集点、计量层级和设备映射待确认。',
    impact: ['待确认'],
    previewHeaders: [], previewRows: [],
    note: 'SOW 将能源分析 7 项标记为待确认；本页仅保留主题占位，不展示为已实现能力。'
  }
};

const THEME_DIMENSIONS = [
  { code: 'DIM-COMPANY', name: '公司', hierarchy: '集团 → 公司 → 部门 → 车间 → 班组', source: 'OA 组织主数据', owner: '信息工程部 / 尚椿琳', freq: '每日', quality: '99.9%', used: '4 个主题', mapping: 'OA company_code ↔ ERP company_code', note: '统一精美、丽彩、五彩、欣兴、嘉美等公司主体。' },
  { code: 'DIM-ORG', name: '组织', hierarchy: '公司 → 部门 → 车间 → 班组', source: 'OA 组织主数据', owner: '人力资源部 / 吴欣', freq: '每日', quality: '99.7%', used: '经营 / 生产 / 人员', mapping: 'OA dept_code ↔ MES workshop_code', note: '组织调整保留历史版本，指标按业务发生期归属。' },
  { code: 'DIM-CUSTOMER', name: '客户', hierarchy: '客户集团 → 客户 → 收货方', source: 'ERP 客户主数据', owner: '营销中心 / 周敏', freq: '每日', quality: '99.4%', used: '经营主题', mapping: 'ERP customer_code ↔ SRM customer_code', note: '支持重点客户、区域和行业分组。' },
  { code: 'DIM-SUPPLIER', name: '供应商', hierarchy: '供应商集团 → 供应商 → 供方地点', source: 'ERP / SRM 供应商主数据', owner: '采购部 / 赵倩', freq: '每日', quality: '99.6%', used: '采购 / 经营', mapping: 'ERP supplier_code ↔ SRM supplier_id', note: '统一社会信用代码作为跨系统业务键。' },
  { code: 'DIM-PRODUCT', name: '产品', hierarchy: '产品线 → 产品 → 物料 → 工序', source: 'PLM / ERP 物料主数据', owner: '技术中心 / 李明', freq: '每日', quality: '99.3%', used: '经营 / 生产 / 采购', mapping: 'PLM material_code ↔ ERP item_code', note: '区分标准品、高毛利产品和新品/打样。' },
  { code: 'DIM-TIME', name: '时间', hierarchy: '年 → 季 → 月 → 日', source: '数据平台日历维', owner: '信息工程部', freq: '每日', quality: '100%', used: '全部主题', mapping: '自然日 + 业务期间 + 财年', note: '统一统计周期、同比/环比和累计口径。' },
  { code: 'DIM-EQUIPMENT', name: '设备', hierarchy: '设备类型 → 设备 → 部件', source: 'MES 设备台账', owner: '设备动力部 / 李超', freq: '每小时', quality: '98.8%', used: '生产主题', mapping: 'MES equipment_code ↔ EAM asset_code', note: '用于设备停机、维保和能耗分析。' },
  { code: 'DIM-REGION', name: '区域', hierarchy: '大区 → 省份 → 城市 → 地点', source: 'ERP 客户地址 / 组织区域', owner: '营销中心 / 周敏', freq: '每月', quality: '98.5%', used: '经营 / 人员', mapping: 'ERP region_code ↔ 行政区划编码', note: '支持区域销售、交付和人员分布分析。' }
];

const THEME_MODELS = [
  { version: 'V3.2', theme: '生产交付主题', themeKey: 'production', status: '已生效', effective: '2026-08-01', owner: '生产管理部 / 刘强', fact: 'fact_production_day', grain: '公司+车间+产线+日期', key: 'company_code+workshop_code+line_code+date', changes: '新增设备停机小时、工序良率字段；调整车间维度映射。', impact: '驾驶舱 / 简报 / 指挥看板' },
  { version: 'V2.4', theme: '经营主题', themeKey: 'operation', status: '已生效', effective: '2026-07-01', owner: '经营发展部 / 周敏', fact: 'fact_operation_month', grain: '公司+产品线+月份', key: 'company_code+product_line+period', changes: '新增订单蓄水、投资执行字段；收入口径与财务对齐。', impact: '驾驶舱 / 简报 / 会议' },
  { version: 'V1.8', theme: '采购合同成本主题', themeKey: 'purchase', status: '试运行', effective: '2026-08-15', owner: '供应链管理部 / 杨林', fact: 'fact_purchase_contract_month', grain: '公司+供应商+合同+物料+月份', key: 'company_code+supplier_code+contract_no+material_code+period', changes: '新增供应商交付及时率、合同履约率字段。', impact: '采购风险 / 指挥看板' },
  { version: 'V1.2', theme: '人员主题', themeKey: 'hr', status: '待发布', effective: '2026-09-01', owner: '人力资源部 / 吴欣', fact: 'fact_hr_month', grain: '公司+组织+岗位+人员类别+月份', key: 'company_code+org_code+job_code+employee_type+period', changes: '新增岗位资格达标率、计件工资字段。', impact: '人员分析 / 经营简报' }
];

const THEME_TRACE = [
  { time: '2026-08-20 08:10', actor: '系统动作流', action: '主题数据刷新', result: '完成 ERP/MES/QMS/SRM/OA/HR 数据汇聚与质量校验，更新 4 个主题。' },
  { time: '2026-08-20 08:30', actor: '周敏', action: '经营主题 V2.4 发布', result: '收入、利润、订单、存货等 8 个指标生效，驾驶舱与简报同步。' },
  { time: '2026-08-20 09:00', actor: '尚椿琳', action: '公共维度校验', result: '公司、组织、供应商、产品维度映射全部通过，时间维更新至 2026-08。' },
  { time: '2026-08-20 09:20', actor: '刘强', action: '生产交付主题 V3.2 生效', result: '新增设备停机小时、工序良率字段，指挥看板同步。' }
];

/* ---------- 辅助 ---------- */

function themeCurrent() { return THEME_CATALOG[state.themeKey] || THEME_CATALOG.operation; }
function themeNow() { return '2026-08-25 10:30'; }
function themeBadge(value) {
  const text = String(value);
  const cls = /已发布|已生效|正常|通过/.test(text) ? 'ok' : /试运行|待发布|关注|待补/.test(text) ? 'warn' : /待确认|草稿|未发布/.test(text) ? 'muted' : 'info';
  return '<span class="theme-status ' + cls + '">' + text + '</span>';
}
function themeTone(value) {
  return /试运行|待发布|关注|待补/.test(String(value)) ? 'watch' : /待确认/.test(String(value)) ? 'muted' : 'normal';
}
function themeKpi(label, value, unit, note, tone) {
  return '<article class="theme-kpi ' + (tone || 'normal') + '"><span>' + label + '</span><strong>' + value + '<small>' + unit + '</small></strong><p>' + note + '</p></article>';
}
function themePreviewRows(theme) {
  return theme.previewRows.filter(function (r) {
    return (state.themePreviewPeriod === '全部期间' || r[0] === state.themePreviewPeriod) &&
      (state.themePreviewCompany === '全部' || r[1] === state.themePreviewCompany);
  });
}
function themeSecondLabel() {
  const headers = themeCurrent().previewHeaders || [];
  return headers[1] || '组织';
}
function themePreviewOptions(index) {
  const values = index === 0
    ? Array.from(new Set(themeCurrent().previewRows.map(function (r) { return r[0]; })))
    : Array.from(new Set(themeCurrent().previewRows.map(function (r) { return r[1]; })));
  const all = index === 0
    ? { value: '全部期间', label: '全部期间' }
    : { value: '全部', label: '全部' + themeSecondLabel() };
  return [all].concat(values.map(function (v) { return { value: v, label: v }; }));
}
function themeSelector() {
  return '<div class="theme-selector">' + Object.keys(THEME_CATALOG).map(function (key) {
    const t = THEME_CATALOG[key];
    return '<button class="theme-selector-btn ' + (state.themeKey === key ? 'active' : '') + '" onclick="selectTheme(\'' + key + '\')"><b>' + t.short + '</b><span>' + t.status + '</span></button>';
  }).join('') + '</div>';
}

/* ---------- 页面区块 ---------- */

function themeHero() {
  const t = themeCurrent();
  return '<div class="theme-hero"><div><span class="eyebrow">观星台 · 主题数据</span><h2>业务主题库与主题模型</h2><p>统一公司、组织、客户、供应商、产品、时间、设备和区域等公共维度，按经营、生产交付、采购合同成本、人员组织主题数据。</p><div class="theme-hero-chips"><span>4 个业务主题</span><span>8 个公共维度</span><span>35 项主题指标</span><span>更新 ' + state.themeUpdatedAt + '</span></div></div><div class="session-note">当前：' + currentRole().label + '<br>数据为 Demo 模拟，刷新后恢复基线。<br><b>' + t.owner + '</b></div></div>';
}
function themeKpis() {
  const themes = Object.keys(THEME_CATALOG).map(function (k) { return THEME_CATALOG[k]; });
  const published = themes.filter(function (t) { return t.status === '已发布'; }).length;
  const trial = themes.filter(function (t) { return t.status === '试运行'; }).length;
  const pending = themes.filter(function (t) { return t.status === '待确认'; }).length;
  return '<div class="theme-kpi-grid">' +
    themeKpi('已发布主题', published, '个', '经营 / 生产' + (trial ? ' · 采购试运行' : ''), 'normal') +
    themeKpi('公共维度', '8', '个', '公司 / 组织 / 客户 / 供应商 / 产品 / 时间 / 设备 / 区域', 'normal') +
    themeKpi('主题指标', '35', '项', '经营 8 · 生产 12 · 采购 9 · 人员 6', 'normal') +
    themeKpi('主题模型版本', '4', '个', 'V3.2 / V2.4 / V1.8 / V1.2', 'normal') +
    themeKpi('待确认主题', pending, '个', '能源主题（SOW 待确认）', 'watch') +
    '</div>';
}
function themeTabs() {
  const tabs = [['catalog', '主题总览'], ['dimensions', '公共维度'], ['models', '主题模型'], ['preview', '数据预览'], ['lineage', '版本与血缘']];
  return '<div class="tabs theme-tabs">' + tabs.map(function (x) {
    return '<button class="' + (state.themeTab === x[0] ? 'active' : '') + '" onclick="setThemeTab(\'' + x[0] + '\')">' + x[1] + '</button>';
  }).join('') + '</div>';
}
function themeSowNote() {
  return '<div class="theme-sow-note"><b>SOW 位置：</b>主题数据不是独立章节，属于 <b>2.2.6 观星台功能清单“指标体系与业务主题”</b> 功能域（STAR-F-009 ~ STAR-F-014）；同时在 2.2.3 总体框架 STAR-A-004“主题模型层”、2.2.4 范围边界 STAR-S-002“指标体系与主题库基础”中出现。</div>';
}

function themeCatalogView() {
  const cards = Object.keys(THEME_CATALOG).map(function (key) {
    const t = THEME_CATALOG[key];
    const tone = themeTone(t.status);
    return '<article class="theme-card ' + tone + '"><div class="theme-card-head"><span>' + t.code + '</span>' + themeBadge(t.status) + '</div><h3>' + t.name + '</h3><p>' + t.description + '</p><div class="theme-card-meta"><div><span>事实表</span><b>' + t.fact + '</b></div><div><span>粒度</span><b>' + t.grain + '</b></div><div><span>公共维度</span><b>' + t.dims.length + ' 个</b></div><div><span>主题指标</span><b>' + t.metrics + ' 项</b></div><div><span>模型版本</span><b>' + t.version + '</b></div><div><span>质量</span><b>' + t.quality + '</b></div></div><div class="theme-card-footer"><button class="link" onclick="themeDetail(\'' + key + '\')">查看主题</button>' + (key === 'energy' ? '<button class="link" onclick="go(&#39;energy&#39;)">能源分析 →</button>' : '<button class="link" onclick="selectTheme(\'' + key + '\')">数据预览 →</button>') + '</div></article>';
  }).join('');
  return '<div class="theme-catalog-grid">' + cards + '</div>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>主题数据原则</h2><span class="meta">有源 · 有口径 · 有责任</span></div><div class="theme-principles"><div><b>统一公共维度</b><span>公司、组织、客户、供应商、产品、时间、设备和区域统一编码与层级。</span></div><div><b>主题有责任部门</b><span>每个主题明确业务责任人、数据责任人和质量责任人。</span></div><div><b>指标有来源与版本</b><span>主题指标必须绑定事实表、计算口径、指标版本和来源系统。</span></div><div><b>模型变更可回看</b><span>事实粒度、业务键和维度映射变更保留版本、影响对象和回退点。</span></div></div></section><section class="card"><div class="card-h"><h2>主题数据覆盖</h2><span class="meta">SOW STAR-F-009 ~ F-014</span></div><div class="info-grid theme-cover-grid">' + info('公共维度', '公司 / 组织 / 客户 / 供应商 / 产品 / 时间 / 设备 / 区域') + info('经营主题', '收入 / 利润 / 订单 / 产值 / 存货 / 应收 / 现金流 / 投资') + info('生产交付主题', '计划 / 制造 / 工艺 / 质量 / 交付 / 安全 / 设备 / 工时') + info('采购合同成本主题', '采购 / 供应商 / 合同执行 / 制造费用 / 成本结构') + info('人员主题', '总量 / 结构 / 变化 / 计件工资 / 机构预警') + info('主题模型版本', '事实粒度 / 业务键 / 维度映射 / 历史范围 / 版本') + '</div></section></div>' + themeSowNote();
}

function themeDimensionsView() {
  const rows = THEME_DIMENSIONS.map(function (d, i) {
    return '<tr><td>' + (i + 1) + '</td><td><b>' + d.name + '</b><small class="theme-row-sub">' + d.code + '</small></td><td>' + d.hierarchy + '</td><td>' + d.source + '</td><td>' + d.owner + '</td><td>' + d.freq + '</td><td>' + d.quality + '</td><td>' + d.used + '</td><td><button class="link" onclick="themeDimensionDetail(\'' + d.code + '\')">映射</button></td></tr>';
  }).join('');
  const mappings = [
    ['组织', 'OA dept_code', 'MES workshop_code', '组织调整保留历史版本'],
    ['供应商', 'ERP supplier_code', 'SRM supplier_id', '统一社会信用代码作为业务键'],
    ['产品', 'PLM material_code', 'ERP item_code', '区分标准品/高毛利/新品'],
    ['设备', 'MES equipment_code', 'EAM asset_code', '用于停机、维保和能耗分析'],
    ['时间', '自然日', '业务期间 / 财年', '统一同比/环比和累计口径']
  ];
  return '<section class="card"><div class="card-h"><h2>公共维度目录</h2><span class="meta">8 个公共维度 · 统一编码与层级</span></div><div class="table-card theme-table"><table><thead><tr><th>序号</th><th>维度</th><th>层级</th><th>来源系统</th><th>责任部门</th><th>更新频率</th><th>质量</th><th>引用主题</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>跨系统维度映射</h2><span class="meta">业务键与编码对齐</span></div><div class="table-card theme-table"><table><thead><tr><th>维度</th><th>源系统编码</th><th>目标编码</th><th>控制要求</th></tr></thead><tbody>' + mappings.map(function (m) { return '<tr><td>' + m[0] + '</td><td>' + m[1] + '</td><td>' + m[2] + '</td><td>' + m[3] + '</td></tr>'; }).join('') + '</tbody></table></div></section><section class="card"><div class="card-h"><h2>维度治理要求</h2><span class="meta">统一口径与责任</span></div><div class="theme-principles"><div><b>统一编码</b><span>同一业务对象在 ERP、MES、SRM、OA、HR 中使用可映射的唯一业务键。</span></div><div><b>历史归属</b><span>组织、岗位和客户归属变化保留生效区间，指标按业务发生期归属。</span></div><div><b>质量校验</b><span>维度进入主题前校验完整性、唯一性和映射完整性，异常进入质量问题池。</span></div><div><b>权限隔离</b><span>组织、客户和人员维度按角色授权，导出与下钻保留数据范围。</span></div></div></section></div>';
}

function themeModelsView() {
  const t = themeCurrent();
  const rows = THEME_MODELS.map(function (m) {
    return '<tr><td><b>' + m.version + '</b></td><td>' + m.theme + '</td><td>' + m.fact + '</td><td>' + m.grain + '</td><td>' + m.key + '</td><td>' + m.effective + '</td><td>' + themeBadge(m.status) + '</td><td><button class="link" onclick="themeModelDetail(\'' + m.version + '\')">查看</button></td></tr>';
  }).join('');
  return themeSelector() + '<section class="card"><div class="card-h"><h2>' + t.name + '模型</h2><span class="meta">' + t.version + ' · ' + t.status + '</span></div><div class="theme-model-head"><div><span>事实表</span><b>' + t.fact + '</b></div><div><span>粒度</span><b>' + t.grain + '</b></div><div><span>业务键</span><b>' + t.businessKey + '</b></div><div><span>历史范围</span><b>' + t.history + '</b></div><div><span>来源系统</span><b>' + t.source + '</b></div><div><span>质量结果</span><b>' + t.quality + '</b></div></div><div class="theme-impact"><b>影响对象</b>' + t.impact.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '<button class="link" onclick="themeOpenImpact()">查看下游 →</button></div><div class="card-footer"><button class="secondary" onclick="go(\'quality\')">查看质量规则</button><button class="primary" onclick="publishThemeModel()">发布模型</button></div></section>' +
    '<section class="card top-gap"><div class="card-h"><h2>主题模型版本</h2><span class="meta">版本、生效期与影响</span></div><div class="table-card theme-table theme-model-table"><table><thead><tr><th>版本</th><th>主题</th><th>事实表</th><th>事实粒度</th><th>业务键</th><th>生效日期</th><th>状态</th><th>操作</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
    '<div class="theme-sow-note"><b>模型治理：</b>事实粒度、业务键、维度映射和历史范围变更必须走版本审批；历史指标继续引用原版本，不覆盖历史结论。</div>';
}

function themePreviewView() {
  const t = themeCurrent();
  const periodOptions = themePreviewOptions(0), companyOptions = themePreviewOptions(1);
  const rows = themePreviewRows(t);
  const table = t.previewHeaders.length ? '<div class="table-card theme-table"><table><thead><tr>' + t.previewHeaders.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + (rows.length ? rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') : '<tr><td colspan="' + t.previewHeaders.length + '"><div class="empty compact">当前筛选条件下没有数据。</div></td></tr>') + '</tbody></table></div>' : '<div class="theme-empty">' + (t.note || '该主题暂无预览数据。') + (t.key === 'energy' ? '<div class="top-gap"><button class="primary" onclick="go(&#39;energy&#39;)">进入能源分析（Demo 预演）</button></div>' : '') + '</div>';
  return themeSelector() + '<section class="card"><div class="card-h"><h2>' + t.name + ' · 数据预览</h2><span class="meta">' + t.fact + ' · ' + t.version + '</span></div><div class="toolbar theme-preview-filters"><select onchange="state.themePreviewPeriod=this.value;render()">' + periodOptions.map(function (x) { return '<option value="' + x.value + '" ' + (state.themePreviewPeriod === x.value ? 'selected' : '') + '>' + x.label + '</option>'; }).join('') + '</select><select onchange="state.themePreviewCompany=this.value;render()">' + companyOptions.map(function (x) { return '<option value="' + x.value + '" ' + (state.themePreviewCompany === x.value ? 'selected' : '') + '>' + x.label + '</option>'; }).join('') + '</select><span class="context-label">当前角色授权范围：' + currentRole().label + ' · 脱敏演示数据</span><span class="spacer"></span><button class="secondary" onclick="refreshThemeData()">刷新数据</button><button class="secondary" onclick="exportThemeData()">导出 / 打印</button></div>' + table + '<div class="theme-preview-foot"><span>数据批次 STAR-BATCH-20260820-01 · 更新 ' + state.themeUpdatedAt + '</span><span>来源：' + t.source + ' · 责任部门：' + t.owner + '</span></div></section>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>主题元数据</h2><span class="meta">指标、维度与责任</span></div><div class="info-grid theme-cover-grid">' + info('主题编码', t.code) + info('事实表', t.fact) + info('事实粒度', t.grain) + info('业务键', t.businessKey) + info('公共维度', t.dims.join(' / ')) + info('主题指标', t.metrics + ' 项（' + t.version + '）') + info('质量结果', t.quality) + info('责任部门', t.owner) + '</div></section><section class="card"><div class="card-h"><h2>主题口径与边界</h2><span class="meta">只读汇聚</span></div><div class="theme-principles"><div><b>指标有源</b><span>主题指标必须绑定事实表、来源字段和指标版本，未确认来源不得作为正式经营结论。</span></div><div><b>只读汇聚</b><span>观星台不修改 ERP/MES/QMS/SRM/OA 原始记录，主题数据仅用于汇聚、分析和跟踪。</span></div><div><b>权限范围</b><span>按公司、组织、客户和角色授权；明细预览与导出保留审计记录。</span></div></div></section></div>';
}

function themeLineage(theme) {
  const nodes = [
    ['源系统', theme.source, '权威数据源'],
    ['贴源层', 'ODS 贴源', '批次 / 增量 / 业务键'],
    ['明细层', 'DWD 明细', '清洗 / 标准化 / 时间戳'],
    ['主题层', theme.fact, theme.grain],
    ['指标层', '主题指标 ' + theme.metrics + ' 项', theme.version],
    ['应用层', theme.impact.join(' / '), '按角色发布']
  ];
  return '<div class="lineage-canvas theme-lineage">' + nodes.map(function (n, i) {
    return '<div class="lineage-node n' + i + '"><span>' + n[0] + '</span><b>' + n[1] + '</b><small>' + n[2] + '</small></div>' + (i < nodes.length - 1 ? '<i class="lineage-arrow">→</i>' : '');
  }).join('') + '</div>';
}
function themeLineageView() {
  const t = themeCurrent();
  const versions = THEME_MODELS.map(function (m) {
    return '<div class="theme-version-row"><div><b>' + m.version + '</b><span>' + m.theme + ' · ' + m.effective + '</span></div><p>' + m.changes + '</p>' + themeBadge(m.status) + '</div>';
  }).join('');
  const trace = THEME_TRACE.map(function (x) {
    return '<div class="theme-trace-item"><span>' + x.time + '</span><i></i><div><b>' + x.actor + ' · ' + x.action + '</b><p>' + x.result + '</p></div></div>';
  }).join('');
  return themeSelector() + '<section class="card"><div class="card-h"><h2>' + t.name + ' · 数据血缘</h2><span class="meta">源系统 → 贴源 → 明细 → 主题 → 指标 → 应用</span></div>' + themeLineage(t) + '</section>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>模型版本与变更</h2><span class="meta">历史结论不被覆盖</span></div><div class="theme-version-list">' + versions + '</div></section><section class="card"><div class="card-h"><h2>运行留痕</h2><span class="meta">刷新、发布、维度校验</span></div><div class="theme-trace">' + trace + '</div></section></div>' +
    '<div class="split top-gap"><section class="card"><div class="card-h"><h2>质量与影响</h2><span class="meta">数据可信可追溯</span></div><div class="info-grid theme-cover-grid">' + info('质量规则', '完整性 / 唯一性 / 一致性 / 及时性 / 合理性') + info('质量结果', t.quality + ' · 已对账') + info('问题闭环', '异常进入质量问题池并分派责任部门') + info('影响对象', t.impact.join(' / ')) + '</div><div class="card-footer"><button class="secondary" onclick="go(\'quality\')">查看数据质量</button><button class="secondary" onclick="themeOpenImpact()">查看下游影响</button></div></section><section class="card"><div class="card-h"><h2>主题数据边界</h2><span class="meta">SOW STAR-S-002</span></div><div class="theme-principles"><div><b>本期范围</b><span>指标目录、版本流程、公共维度及主要业务主题框架。</span></div><div><b>边界</b><span>源系统业务闭环和标准报表仍由 ERP/MES/QMS/SRM/OA 负责。</span></div><div><b>待确认</b><span>能源主题的采集点、计量层级、设备和产线映射待确认。</span></div><div><b>后续</b><span>高级预测、自动归因、智能问答和数字孪生在数据稳定后另行规划。</span></div></div></section></div>';
}

function themePage() {
  let body = themeCatalogView();
  if (state.themeTab === 'dimensions') body = themeDimensionsView();
  if (state.themeTab === 'models') body = themeModelsView();
  if (state.themeTab === 'preview') body = themePreviewView();
  if (state.themeTab === 'lineage') body = themeLineageView();
  const content = themeHero() + themeKpis() + themeTabs() + body;
  const actions = '<button class="secondary" onclick="refreshThemeData()">刷新数据</button><button class="secondary" onclick="exportThemeData()">导出 / 打印</button><button class="primary" onclick="publishThemeModel()">发布模型</button>';
  return shell(content, '主题数据', '业务主题库 · 公共维度 · 主题模型与版本血缘', actions);
}

/* ---------- 交互 ---------- */

function setThemeTab(tab) {
  if (['catalog', 'dimensions', 'models', 'preview', 'lineage'].indexOf(tab) < 0) return;
  state.themeTab = tab;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function selectTheme(key) {
  if (!THEME_CATALOG[key]) return;
  state.themeKey = key;
  state.themePreviewPeriod = '全部期间';
  state.themePreviewCompany = '全部';
  if (state.themeTab === 'catalog') state.themeTab = 'preview';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('已选择' + THEME_CATALOG[key].name + '；主题模型、预览和血缘同步切换。');
}
function themeDetail(key) {
  const t = THEME_CATALOG[key];
  if (!t) return;
  openModal(t.code + ' · ' + t.name, '<div class="theme-detail-head"><div><span>' + t.code + '</span><h2>' + t.name + '</h2><p>' + t.description + '</p></div>' + themeBadge(t.status) + '</div><div class="info-grid">' + info('事实表', t.fact) + info('事实粒度', t.grain) + info('业务键', t.businessKey) + info('公共维度', t.dims.join(' / ')) + info('主题指标', t.metrics + ' 项') + info('模型版本', t.version) + info('来源系统', t.source) + info('责任部门', t.owner) + '</div><div class="theme-impact"><b>影响对象</b>' + t.impact.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' + (t.note ? '<div class="theme-sow-note">' + t.note + '</div>' : ''), '<button class="secondary" onclick="closeModal()">关闭</button>' + (key === 'energy' ? '<button class="secondary" onclick="closeModal();go(&#39;energy&#39;)">进入能源分析</button>' : '') + '<button class="primary" onclick="closeModal();selectTheme(\'' + key + '\')">打开主题数据</button>', true);
}
function themeDimensionDetail(code) {
  const d = THEME_DIMENSIONS.find(function (x) { return x.code === code; });
  if (!d) return;
  openModal(d.code + ' · ' + d.name + '维度', '<div class="theme-detail-head"><div><span>' + d.code + '</span><h2>' + d.name + '</h2><p>' + d.note + '</p></div></div><div class="info-grid">' + info('层级', d.hierarchy) + info('来源系统', d.source) + info('责任部门', d.owner) + info('更新频率', d.freq) + info('质量结果', d.quality) + info('引用主题', d.used) + info('编码映射', d.mapping) + '</div>', '<button class="primary" onclick="closeModal()">关闭</button>', true);
}
function themeModelDetail(version) {
  const m = THEME_MODELS.find(function (x) { return x.version === version; });
  if (!m) return;
  openModal(m.version + ' · ' + m.theme + '模型', '<div class="theme-detail-head"><div><span>' + m.version + ' · 生效 ' + m.effective + '</span><h2>' + m.theme + '主题模型</h2><p>' + m.changes + '</p></div>' + themeBadge(m.status) + '</div><div class="info-grid">' + info('事实表', m.fact) + info('事实粒度', m.grain) + info('业务键', m.key) + info('责任部门', m.owner) + info('影响对象', m.impact) + '</div>', '<button class="primary" onclick="closeModal()">关闭</button>', true);
}
function themeOpenImpact() {
  openModal('主题数据下游影响', '<div class="theme-principles"><div><b>经营驾驶舱</b><span>指标卡、趋势、组织排行和来源明细引用主题指标。</span></div><div><b>经营简报</b><span>月度简报按确认模板引用经营主题的 8 项核心指标。</span></div><div><b>指挥看板</b><span>任务、质量、存货、合同和安全看板引用生产、采购和经营主题。</span></div><div><b>会议场景</b><span>会议快照冻结主题数据版本，异常进入问题闭环。</span></div><div><b>数据质量</b><span>主题事实表和公共维度进入质量规则校验，异常分派责任部门。</span></div></div>', '<button class="primary" onclick="closeModal()">关闭</button>', true);
}
function refreshThemeData() {
  if (!['operations', 'it', 'manager'].includes(state.role)) {
    toast('仅经营发展部、信息工程部或公司管理层可刷新主题数据。');
    return;
  }
  state.themeUpdatedAt = themeNow();
  THEME_TRACE.unshift({ time: themeNow(), actor: currentRole().name, action: '主题数据刷新', result: '重新汇聚 ERP/MES/QMS/SRM/OA/HR 数据，更新公共维度和 4 个业务主题；质量结果与批次已留痕。' });
  render();
  toast('主题数据已刷新；模型版本、历史指标和已发布简报不受影响。');
}
function publishThemeModel() {
  if (!['operations', 'it', 'manager'].includes(state.role)) {
    toast('仅经营发展部、信息工程部或公司管理层可发布主题模型。');
    return;
  }
  const t = themeCurrent();
  if (t.status === '已发布' || t.status === '已生效') {
    toast(t.name + '当前已是发布状态；如需变更请走模型版本审批。');
    return;
  }
  if (t.status === '待确认') {
    toast(t.name + '仍处于待确认状态，需先确认采集点、映射和口径。');
    return;
  }
  t.status = '已发布';
  const model = THEME_MODELS.find(function (m) { return m.themeKey === t.key; });
  if (model) { model.status = '已生效'; model.effective = themeNow().slice(0, 10); }
  THEME_TRACE.unshift({ time: themeNow(), actor: currentRole().name, action: t.name + '模型发布', result: t.fact + ' ' + t.version + ' 已发布；公共维度、指标版本和影响对象同步生效，历史版本保留。' });
  render();
  toast(t.name + '模型已发布；版本、血缘和影响对象已同步。');
}
function exportThemeData() {
  toast('已打开打印预览；可在浏览器中选择“另存为 PDF”。');
  setTimeout(function () { window.print(); }, 260);
}

/* ---------- 接管 render，保留经营简报、指挥看板与所有原有页面 ---------- */

const renderBeforeStarTheme = render;
render = function () {
  if (state.page === 'theme') {
    $('#app').innerHTML = themePage();
    return;
  }
  return renderBeforeStarTheme();
};
