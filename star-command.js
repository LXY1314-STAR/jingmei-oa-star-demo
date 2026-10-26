/* ===== 观星台 · 指挥看板（SOW STAR-F-021 / STAR-F-022 / STAR-O-004） ===== */
/* 分层看板：公司层、业务域、车间、产线/精益单元；任务/质量/存货/合同/安全五类看板。 */

DEMO_RELEASE.version = 'V1.7.2-COMMAND-dev';
DEMO_RELEASE.scope = '在 V1.7.1 经营简报基础上，新增观星台指挥看板：公司/业务域/车间/产线四层视图、任务/质量/存货/合同/安全五类看板、异常视图与责任筛选、异常升级和运行留痕；其余范围不变。';

state.commandLayer = state.commandLayer || 'company';
state.commandTab = state.commandTab || 'board';
state.commandType = state.commandType || '全部类型';
state.commandStatus = state.commandStatus || '全部状态';
state.commandOwner = state.commandOwner || '全部责任部门';
state.commandBoard = state.commandBoard || '全部板块';
state.commandQuery = state.commandQuery || '';

const COMMAND_LAYERS = {
  company: {
    key: 'company',
    label: '公司层',
    path: '五粮液精美印务',
    owner: '公司管理层',
    batch: 'STAR-BATCH-20260820-01',
    updatedAt: '2026-08-20 08:30',
    summary: '公司级任务、质量、存货、合同与安全态势，异常可直接进入问题闭环。',
    kpis: [
      { label: '任务完成率', value: '94.2', unit: '%', target: '96.0%', status: '预警', note: '重点订单交付偏慢' },
      { label: '一次质量合格率', value: '97.6', unit: '%', target: '98.5%', status: '关注', note: '后加工返工上升' },
      { label: '存货周转天数', value: '42.6', unit: '天', target: '38.0天', status: '预警', note: '成品库存上升' },
      { label: '合同履约率', value: '91.8', unit: '%', target: '95.0%', status: '预警', note: '2份合同待交付' },
      { label: '安全运行', value: '128', unit: '天', target: '≥120天', status: '正常', note: '无重大安全事故' }
    ],
    boards: [
      { key: 'task', label: '任务', value: '94.2', unit: '%', target: '96.0%', status: '预警', note: '在制订单 38 个 · 逾期 3 个', spark: [92, 93, 94, 95, 94, 93, 94, 94.2], metricId: 'MET-002', items: ['后加工车间 3 个订单延期', '包装业务 2 个订单待排产'] },
      { key: 'quality', label: '质量', value: '97.6', unit: '%', target: '98.5%', status: '关注', note: '一次合格率 · 返工率 2.4%', spark: [98.1, 98.0, 97.9, 97.8, 97.7, 97.6, 97.6, 97.6], items: ['后加工车间返工率 3.6%', '标签业务客诉 1 起'] },
      { key: 'inventory', label: '存货', value: '42.6', unit: '天', target: '38.0天', status: '预警', note: '成品与在制品库存上升', spark: [36.1, 36.8, 37.5, 38.2, 39.6, 40.1, 41.8, 42.6], metricId: 'MET-003', items: ['成品库存周转 48.2 天', '在制品库存 8.4 天'] },
      { key: 'contract', label: '合同', value: '91.8', unit: '%', target: '95.0%', status: '预警', note: '2份合同待交付 · 1份用印超时', spark: [94, 93.5, 93, 92.8, 92.5, 92.2, 92, 91.8], items: ['HT-202608-024 用印超时', 'HT-202608-028 交付节点临近'] },
      { key: 'safety', label: '安全', value: '128', unit: '天', target: '≥120天', status: '正常', note: '隐患整改率 96.8%', spark: [120, 121, 122, 123, 124, 125, 126, 128], items: ['未闭环隐患 1 项', '特种作业证临期 2 人'] }
    ],
    exceptions: [
      { id: 'CE-001', board: 'task', type: '未达目标', title: '产值完成率低于计划 6.2%', scope: '生产管理部', owner: '刘强', level: '高', status: '整改中', current: '93.8%', target: '100%', source: 'MES / STAR-M-006', metricId: 'MET-002', problemId: 'WT-202608-021', time: '2026-08-20 08:30', overdue: true, note: '后加工车间设备停机与重点订单换版增加。' },
      { id: 'CE-002', board: 'inventory', type: '超阈值', title: '存货周转天数环比上升 4.8 天', scope: '供应链管理部', owner: '杨林', level: '中', status: '待反馈', current: '42.6天', target: '38.0天', source: 'ERP 存货 / STAR-M-011', metricId: 'MET-003', problemId: 'WT-202608-018', time: '2026-08-20 08:30', overdue: false, note: '成品库存与在制品库存同步上升。' },
      { id: 'CE-003', board: 'task', type: '超阈值', title: '制造费用率超预算 0.4 个百分点', scope: '财务部', owner: '李敏', level: '高', status: '待复核', current: '12.4%', target: '12.0%', source: 'ERP 财务', metricId: '', problemId: 'WT-202608-013', time: '2026-08-20 08:30', overdue: false, note: '设备集中维保及临时外协费用增加。' },
      { id: 'CE-004', board: 'task', type: '趋势突变', title: '重点客户交付准时率连续两周下降', scope: '生产管理部', owner: '刘强', level: '中', status: '待反馈', current: '92.1%', target: '95.0%', source: 'ERP 订单', metricId: '', problemId: 'WT-202608-009', time: '2026-08-20 08:30', overdue: true, note: '包装材料订单排产延迟，影响重点客户交付。' },
      { id: 'CE-005', board: 'contract', type: '未关闭问题', title: '运维合同用印及正式文本回传超时', scope: '信息工程部', owner: '尚椿琳', level: '中', status: '整改中', current: '3天', target: '1天', source: 'OA 合同台账', metricId: '', problemId: '', time: '2026-08-20 08:30', overdue: true, note: '用印审批已完成，正式文本尚未回传归档。' },
      { id: 'CE-006', board: 'quality', type: '未达目标', title: '后加工一次合格率低于目标 2.1pp', scope: '质量管理部', owner: '周勇', level: '高', status: '待反馈', current: '96.4%', target: '98.5%', source: 'QMS 质量台账', metricId: '', problemId: '', time: '2026-08-20 08:30', overdue: false, note: '模切工序返工率上升，需确认设备参数与来料质量。' }
    ],
    trace: [
      { time: '2026-08-20 08:30', actor: '系统动作流', action: '刷新公司层看板', result: '同步 ERP/MES/QMS/OA，更新任务、质量、存货、合同、安全 5 类看板。' },
      { time: '2026-08-20 09:12', actor: '刘强', action: '产值异常升级', result: '后加工车间 → 生产管理部 → 公司管理层，已生成 OA 责任待办。' },
      { time: '2026-08-20 09:20', actor: '杨林', action: '存货异常加入会议', result: '已关联 8 月经营分析会 AGD-02。' }
    ]
  },
  domain: {
    key: 'domain',
    label: '业务域',
    path: '印刷主业 / 包装业务 / 标签业务',
    owner: '经营发展部',
    batch: 'STAR-BATCH-20260820-01',
    updatedAt: '2026-08-20 08:35',
    summary: '按业务域查看任务、质量、存货、合同与安全状态，定位域内差异。',
    kpis: [
      { label: '任务完成率', value: '95.1', unit: '%', target: '96.5%', status: '关注', note: '包装业务排产偏慢' },
      { label: '一次质量合格率', value: '98.2', unit: '%', target: '98.5%', status: '正常', note: '标签业务质量稳定' },
      { label: '存货周转天数', value: '39.4', unit: '天', target: '38.0天', status: '关注', note: '包装材料库存偏高' },
      { label: '合同履约率', value: '94.6', unit: '%', target: '95.0%', status: '关注', note: '2份框架合同待交付' },
      { label: '安全运行', value: '128', unit: '天', target: '≥120天', status: '正常', note: '业务域无安全事故' }
    ],
    boards: [
      { key: 'task', label: '任务', value: '95.1', unit: '%', target: '96.5%', status: '关注', note: '在制订单 16 个 · 逾期 1 个', spark: [93, 93.8, 94.5, 95.2, 95.0, 94.8, 95.0, 95.1], metricId: 'MET-002', items: ['印刷二车间 1 个订单延期', '包装业务 2 单待排产'] },
      { key: 'quality', label: '质量', value: '98.2', unit: '%', target: '98.5%', status: '正常', note: '一次合格率 · 返工率 1.8%', spark: [97.8, 97.9, 98.0, 98.1, 98.2, 98.2, 98.2, 98.2], items: ['包装业务客诉 1 起', '标签业务返工 0.6%'] },
      { key: 'inventory', label: '存货', value: '39.4', unit: '天', target: '38.0天', status: '关注', note: '包装材料库存偏高', spark: [37.2, 37.6, 38.0, 38.4, 38.8, 39.0, 39.2, 39.4], metricId: 'MET-003', items: ['包装材料 12.6 天', '成品 26.8 天'] },
      { key: 'contract', label: '合同', value: '94.6', unit: '%', target: '95.0%', status: '关注', note: '2份框架合同待交付', spark: [95, 94.8, 94.6, 94.5, 94.6, 94.5, 94.6, 94.6], items: ['包装年度框架 9月交付', '纸张季度框架 9月交付'] },
      { key: 'safety', label: '安全', value: '128', unit: '天', target: '≥120天', status: '正常', note: '隐患整改率 97.2%', spark: [120, 121, 122, 123, 124, 125, 126, 128], items: ['未闭环隐患 0 项', '特种作业证临期 1 人'] }
    ],
    exceptions: [
      { id: 'CE-D01', board: 'task', type: '未达目标', title: '印刷二车间产值缺口 7.5%', scope: '印刷二车间', owner: '王磊', level: '高', status: '整改中', current: '92.5%', target: '100%', source: 'MES 报工', metricId: 'MET-002', problemId: '', time: '2026-08-20 08:35', overdue: true, note: '设备换版时间超出标准，影响有效产出。' },
      { id: 'CE-D02', board: 'task', type: '趋势突变', title: '包装业务订单排产延迟 2 单', scope: '包装业务', owner: '赵倩', level: '中', status: '待处理', current: '2单', target: '0单', source: 'ERP 订单', metricId: '', problemId: '', time: '2026-08-20 08:35', overdue: false, note: '重点客户包装材料订单交期临近。' },
      { id: 'CE-D03', board: 'quality', type: '未达目标', title: '标签业务毛利率低于目标 1.2pp', scope: '标签业务', owner: '周敏', level: '中', status: '待反馈', current: '21.2%', target: '22.4%', source: 'ERP 财务', metricId: '', problemId: '', time: '2026-08-20 08:35', overdue: false, note: '小批量订单占比上升，摊薄毛利。' },
      { id: 'CE-D04', board: 'inventory', type: '超阈值', title: '包装材料库存周转 12.6 天', scope: '供应链管理部', owner: '杨林', level: '低', status: '待处理', current: '12.6天', target: '10.0天', source: 'ERP 存货', metricId: 'MET-003', problemId: '', time: '2026-08-20 08:35', overdue: false, note: '季度框架到货集中，短期库存上升。' },
      { id: 'CE-D05', board: 'contract', type: '未关闭问题', title: '包装年度框架合同交付节点临近', scope: '采购部', owner: '赵倩', level: '中', status: '整改中', current: '9天', target: '≥15天', source: 'OA 合同台账', metricId: '', problemId: '', time: '2026-08-20 08:35', overdue: false, note: '首批交付节点为 2026-09-30，需确认产能。' }
    ],
    trace: [
      { time: '2026-08-20 08:35', actor: '系统动作流', action: '刷新业务域看板', result: '按印刷主业、包装业务、标签业务汇总任务、质量、存货、合同与安全状态。' },
      { time: '2026-08-20 09:15', actor: '周敏', action: '包装订单延迟纳入域内跟踪', result: '已通知包装业务负责人确认排产与交付节点。' }
    ]
  },
  workshop: {
    key: 'workshop',
    label: '车间',
    path: '印刷一车间 / 印刷二车间 / 后加工车间',
    owner: '生产管理部',
    batch: 'STAR-BATCH-20260820-02',
    updatedAt: '2026-08-20 08:40',
    summary: '按车间查看任务、质量、存货、合同与安全状态，直接定位现场异常。',
    kpis: [
      { label: '任务完成率', value: '89.1', unit: '%', target: '96.0%', status: '预警', note: '后加工车间缺口 203 万元' },
      { label: '一次质量合格率', value: '96.4', unit: '%', target: '98.5%', status: '预警', note: '模切返工率上升' },
      { label: '存货周转天数', value: '46.2', unit: '天', target: '38.0天', status: '预警', note: '在制品库存偏高' },
      { label: '合同履约率', value: '88.5', unit: '%', target: '95.0%', status: '预警', note: '2 个订单交付风险' },
      { label: '安全运行', value: '96', unit: '天', target: '≥120天', status: '预警', note: '隐患 1 项未闭环' }
    ],
    boards: [
      { key: 'task', label: '任务', value: '89.1', unit: '%', target: '96.0%', status: '预警', note: '计划 1,860 万 / 实际 1,657 万', spark: [94, 93, 92, 91, 90, 89.5, 89.2, 89.1], metricId: 'MET-002', items: ['后加工车间缺口 203 万元', '3 个订单延期'] },
      { key: 'quality', label: '质量', value: '96.4', unit: '%', target: '98.5%', status: '预警', note: '返工率 3.6%', spark: [98.2, 97.8, 97.2, 96.9, 96.7, 96.5, 96.4, 96.4], items: ['模切返工 2 批', '糊盒尺寸偏差 1 批'] },
      { key: 'inventory', label: '存货', value: '46.2', unit: '天', target: '38.0天', status: '预警', note: '在制品库存 12.8 天', spark: [38.6, 39.4, 40.2, 41.0, 42.4, 43.8, 45.1, 46.2], metricId: 'MET-003', items: ['在制品 12.8 天', '待检品 3.2 天'] },
      { key: 'contract', label: '合同', value: '88.5', unit: '%', target: '95.0%', status: '预警', note: '2 个订单交付风险', spark: [94, 93, 92, 91, 90, 89.5, 89, 88.5], items: ['重点客户 A 订单延期', '包装材料订单待交付'] },
      { key: 'safety', label: '安全', value: '96', unit: '天', target: '≥120天', status: '预警', note: '隐患整改率 92.0%', spark: [112, 110, 108, 106, 104, 101, 98, 96], items: ['模切区隐患 1 项', '安全点检逾期 1 次'] }
    ],
    exceptions: [
      { id: 'CE-W01', board: 'task', type: '未达目标', title: '后加工车间产值完成率 89.1%', scope: '后加工车间', owner: '刘强', level: '高', status: '整改中', current: '89.1%', target: '96.0%', source: 'MES 报工 / STAR-M-006', metricId: 'MET-002', problemId: 'WT-202608-021', time: '2026-08-20 08:40', overdue: true, note: '两台模切设备停机，重点订单换版次数增加。' },
      { id: 'CE-W02', board: 'task', type: '超阈值', title: '模切设备停机 2 台', scope: '设备动力部', owner: '李超', level: '高', status: '整改中', current: '2台', target: '0台', source: 'MES 设备状态', metricId: '', problemId: '', time: '2026-08-20 08:40', overdue: true, note: '二号模切机主轴故障，备件预计 8月22日到货。' },
      { id: 'CE-W03', board: 'quality', type: '未达目标', title: '一次合格率 96.4%，低于目标 2.1pp', scope: '质量管理部', owner: '周勇', level: '高', status: '待反馈', current: '96.4%', target: '98.5%', source: 'QMS 质量台账', metricId: '', problemId: '', time: '2026-08-20 08:40', overdue: false, note: '模切工序返工率上升，需确认设备参数与来料质量。' },
      { id: 'CE-W04', board: 'inventory', type: '超阈值', title: '在制品库存 46.2 天', scope: '后加工车间', owner: '刘强', level: '中', status: '待处理', current: '46.2天', target: '38.0天', source: 'ERP 存货', metricId: 'MET-003', problemId: '', time: '2026-08-20 08:40', overdue: false, note: '停机导致在制品滞留，需同步调整排产。' },
      { id: 'CE-W05', board: 'safety', type: '未关闭问题', title: '模切区安全隐患 1 项未闭环', scope: '安全环保部', owner: '周勇', level: '中', status: '待复核', current: '1项', target: '0项', source: 'EHS 隐患台账', metricId: '', problemId: '', time: '2026-08-20 08:40', overdue: true, note: '防护罩联锁整改完成，等待安全复核。' }
    ],
    trace: [
      { time: '2026-08-20 08:40', actor: '系统动作流', action: '刷新车间看板', result: '汇总后加工车间任务、质量、存货、合同与安全状态。' },
      { time: '2026-08-20 09:18', actor: '刘强', action: '设备停机异常升级', result: '已通知设备动力部，备件到货前调整排产。' }
    ]
  },
  line: {
    key: 'line',
    label: '产线 / 精益单元',
    path: '模切线 / 糊盒线 / 贴标线',
    owner: '生产管理部',
    batch: 'STAR-BATCH-20260820-03',
    updatedAt: '2026-08-20 08:45',
    summary: '按产线和精益单元查看任务、质量、存货、合同与安全状态，聚焦现场执行。',
    kpis: [
      { label: '任务完成率', value: '91.2', unit: '%', target: '96.0%', status: '预警', note: '换版时间超标 18%' },
      { label: '一次质量合格率', value: '97.1', unit: '%', target: '98.5%', status: '关注', note: '糊盒线良率下降' },
      { label: '存货周转天数', value: '44.8', unit: '天', target: '38.0天', status: '预警', note: '线边库存偏高' },
      { label: '合同履约率', value: '90.3', unit: '%', target: '95.0%', status: '预警', note: '1 个订单待交付' },
      { label: '安全运行', value: '96', unit: '天', target: '≥120天', status: '预警', note: '安全点检逾期 1 次' }
    ],
    boards: [
      { key: 'task', label: '任务', value: '91.2', unit: '%', target: '96.0%', status: '预警', note: '换版时间超标 · 待料 2 小时', spark: [95, 94, 93.5, 92.8, 92, 91.6, 91.3, 91.2], metricId: 'MET-002', items: ['模切线换版超标 18%', '贴标线待料 2 小时'] },
      { key: 'quality', label: '质量', value: '97.1', unit: '%', target: '98.5%', status: '关注', note: '糊盒线良率下降 1.8pp', spark: [98.4, 98.1, 97.8, 97.6, 97.4, 97.3, 97.2, 97.1], items: ['糊盒线良率下降', '模切线首件确认 1 次超时'] },
      { key: 'inventory', label: '存货', value: '44.8', unit: '天', target: '38.0天', status: '预警', note: '线边库存 8.2 天', spark: [38.2, 39.0, 40.1, 41.2, 42.0, 43.1, 44.0, 44.8], metricId: 'MET-003', items: ['线边库存 8.2 天', '待检品 2.4 天'] },
      { key: 'contract', label: '合同', value: '90.3', unit: '%', target: '95.0%', status: '预警', note: '1 个订单待交付', spark: [94.5, 93.8, 93.0, 92.4, 91.8, 91.2, 90.8, 90.3], items: ['重点客户 A 标签订单', '交付节点 9月5日'] },
      { key: 'safety', label: '安全', value: '96', unit: '天', target: '≥120天', status: '预警', note: '安全点检逾期 1 次', spark: [112, 110, 108, 106, 104, 101, 98, 96], items: ['模切线点检逾期', '防护罩联锁待复核'] }
    ],
    exceptions: [
      { id: 'CE-L01', board: 'task', type: '超阈值', title: '模切线换版时间超标 18%', scope: '模切精益单元', owner: '张伟', level: '高', status: '整改中', current: '2.36h', target: '2.00h', source: 'MES 换版记录', metricId: '', problemId: '', time: '2026-08-20 08:45', overdue: true, note: '重点订单换版频繁，需优化换版作业标准。' },
      { id: 'CE-L02', board: 'quality', type: '趋势突变', title: '糊盒线良率下降 1.8pp', scope: '糊盒精益单元', owner: '李娜', level: '中', status: '待反馈', current: '97.1%', target: '98.9%', source: 'QMS 质量台账', metricId: '', problemId: '', time: '2026-08-20 08:45', overdue: false, note: '糊盒胶量波动，需确认设备参数与来料批次。' },
      { id: 'CE-L03', board: 'task', type: '未关闭问题', title: '贴标线待料 2 小时', scope: '贴标精益单元', owner: '王芳', level: '中', status: '待处理', current: '2h', target: '0h', source: 'MES 停线记录', metricId: '', problemId: '', time: '2026-08-20 08:45', overdue: false, note: '标签材料未按时配送到线边。' },
      { id: 'CE-L04', board: 'safety', type: '未关闭问题', title: '模切线安全点检逾期 1 次', scope: '模切精益单元', owner: '张伟', level: '低', status: '待复核', current: '1次', target: '0次', source: 'EHS 点检台账', metricId: '', problemId: '', time: '2026-08-20 08:45', overdue: true, note: '已完成补检，等待安全复核。' }
    ],
    trace: [
      { time: '2026-08-20 08:45', actor: '系统动作流', action: '刷新产线看板', result: '汇总模切线、糊盒线、贴标线的任务、质量、存货、合同与安全状态。' },
      { time: '2026-08-20 09:22', actor: '张伟', action: '换版超标异常升级', result: '已通知工艺与设备人员，优化换版作业标准。' }
    ]
  }
};

/* ---------- 辅助 ---------- */

function commandLayer() { return COMMAND_LAYERS[state.commandLayer] || COMMAND_LAYERS.company; }
function commandNow() { return '2026-08-25 10:20'; }
function commandTone(value) {
  const text = String(value);
  if (/预警|高|未达标|超期|重点关注/.test(text)) return 'warning';
  if (/关注|中|待处理|待反馈|待复核|整改中/.test(text)) return 'watch';
  return 'normal';
}
function commandBadge(value) {
  return '<span class="command-status ' + commandTone(value) + '">' + value + '</span>';
}
function commandTypeBadge(type) {
  const cls = { '超阈值': 'danger', '未达目标': 'warn', '趋势突变': 'info', '未关闭问题': 'purple' }[type] || 'info';
  return '<span class="command-type ' + cls + '">' + type + '</span>';
}
function commandSpark(values) {
  const max = Math.max.apply(null, values), min = Math.min.apply(null, values);
  return '<div class="command-spark">' + values.map(function (v) {
    const h = 18 + ((v - min) / (max - min || 1)) * 82;
    return '<i style="height:' + h + '%"></i>';
  }).join('') + '</div>';
}
function commandExceptionCount(boardKey) {
  return commandLayer().exceptions.filter(function (e) { return e.board === boardKey; }).length;
}
function commandOwnerOptions() {
  return ['全部责任部门'].concat(Array.from(new Set(commandLayer().exceptions.map(function (e) { return e.scope; }))));
}
function commandFilteredExceptions() {
  const q = state.commandQuery.trim().toLowerCase();
  return commandLayer().exceptions.filter(function (e) {
    return (state.commandType === '全部类型' || e.type === state.commandType) &&
      (state.commandStatus === '全部状态' || e.status === state.commandStatus) &&
      (state.commandOwner === '全部责任部门' || e.scope === state.commandOwner) &&
      (state.commandBoard === '全部板块' || e.board === state.commandBoard) &&
      (!q || [e.id, e.title, e.scope, e.owner, e.source].join(' ').toLowerCase().indexOf(q) >= 0);
  });
}

/* ---------- 页面区块 ---------- */

function commandHero() {
  const layer = commandLayer();
  return '<div class="command-hero"><div><span class="eyebrow">观星台 · 指挥层看板</span><h2>' + layer.path + '</h2><p>' + layer.summary + '</p><div class="command-hero-chips"><span>' + layer.label + '</span><span>数据批次 ' + layer.batch + '</span><span>更新 ' + layer.updatedAt + '</span></div></div><div class="session-note">当前：' + currentRole().label + '<br>数据为 Demo 模拟，刷新后恢复基线。<br><b>' + layer.owner + '</b></div></div>';
}
function commandLayerTabs() {
  const labels = { company: '公司层', domain: '业务域', workshop: '车间', line: '产线 / 精益单元' };
  return '<div class="command-layer-tabs">' + Object.keys(COMMAND_LAYERS).map(function (key) {
    return '<button class="command-layer-tab ' + (state.commandLayer === key ? 'active' : '') + '" onclick="switchCommandLayer(\'' + key + '\')"><b>' + labels[key] + '</b><span>' + COMMAND_LAYERS[key].path + '</span></button>';
  }).join('') + '</div>';
}
function commandKpis() {
  const layer = commandLayer();
  return '<div class="command-kpi-grid">' + layer.kpis.map(function (k) {
    return '<article class="command-kpi ' + commandTone(k.status) + '"><div class="command-kpi-head"><span>' + k.label + '</span>' + commandBadge(k.status) + '</div><strong>' + k.value + '<small>' + k.unit + '</small></strong><div class="command-kpi-meta"><span>目标 ' + k.target + '</span><span>' + k.note + '</span></div></article>';
  }).join('') + '</div>';
}
function commandTabs() {
  const tabs = [['board', '分层看板'], ['exceptions', '异常视图'], ['trace', '运行留痕']];
  return '<div class="tabs command-tabs">' + tabs.map(function (x) {
    return '<button class="' + (state.commandTab === x[0] ? 'active' : '') + '" onclick="setCommandTab(\'' + x[0] + '\')">' + x[1] + (x[0] === 'exceptions' ? '<i class="tab-count">' + commandLayer().exceptions.filter(function (e) { return e.status !== '已关闭'; }).length + '</i>' : '') + '</button>';
  }).join('') + '</div>';
}

function commandBoardView() {
  const layer = commandLayer();
  const cards = layer.boards.map(function (b) {
    const n = commandExceptionCount(b.key);
    return '<article class="command-board-card ' + commandTone(b.status) + '"><div class="command-board-head"><div><span>' + b.label + '</span>' + commandBadge(b.status) + '</div><small>近 8 期</small></div><div class="command-board-value">' + b.value + '<small>' + b.unit + '</small></div><div class="command-board-target">目标 ' + b.target + ' · ' + b.note + '</div>' + commandSpark(b.spark) + '<ul class="command-board-items">' + b.items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul><div class="command-board-footer"><button class="link" onclick="commandBoardDetail(\'' + b.key + '\')">查看明细</button><button class="link" onclick="commandShowBoardExceptions(\'' + b.key + '\')">异常 ' + n + ' 条 →</button></div></article>';
  }).join('');
  return '<div class="command-board-grid">' + cards + '</div><div class="command-context-tip"><b>看板口径：</b>任务取 MES/ERP 计划与实际；质量取 QMS；存货取 ERP；合同取 OA 合同台账；安全取 EHS 隐患台账。看板只读汇聚，异常通过问题闭环进入 OA 责任协同。</div>';
}
function commandExceptionSummary() {
  const all = commandLayer().exceptions;
  const high = all.filter(function (e) { return e.level === '高'; }).length;
  const open = all.filter(function (e) { return e.status !== '已关闭'; }).length;
  const overdue = all.filter(function (e) { return e.overdue && e.status !== '已关闭'; }).length;
  return '<div class="command-exception-summary"><button class="command-summary-card active"><b>' + all.length + '</b><span>全部异常</span></button><button class="command-summary-card danger"><b>' + high + '</b><span>高优先级</span></button><button class="command-summary-card warning"><b>' + open + '</b><span>未关闭</span></button><button class="command-summary-card watch"><b>' + overdue + '</b><span>超期</span></button></div>';
}
function commandExceptionView() {
  const layer = commandLayer();
  const filtered = commandFilteredExceptions();
  const boardLabel = layer.boards.find(function (b) { return b.key === state.commandBoard; });
  const ownerOptions = commandOwnerOptions();
  const rows = filtered.map(function (e, i) {
    const action = (e.metricId ? '<button class="link" onclick="commandOpenMetric(\'' + e.id + '\')">指标</button>' : '') + (e.problemId ? '<button class="link" onclick="commandOpenProblem(\'' + e.id + '\')">问题</button>' : '') + '<button class="link" onclick="commandExceptionDetail(\'' + e.id + '\')">详情</button>';
    return '<tr><td>' + (i + 1) + '</td><td>' + commandTypeBadge(e.type) + '</td><td><button class="table-link" onclick="commandExceptionDetail(\'' + e.id + '\')">' + e.title + '</button><small class="command-row-sub">' + e.source + ' · ' + e.time + '</small></td><td><b>' + e.scope + '</b><small class="command-row-sub">' + e.owner + ' · ' + e.level + '优先级</small></td><td>' + e.current + '<small class="command-row-sub">目标 ' + e.target + '</small></td><td>' + commandBadge(e.status) + (e.escalated ? '<span class="command-escalated">已升级</span>' : '') + '</td><td class="command-row-actions">' + action + '</td></tr>';
  }).join('');
  return commandExceptionSummary() +
    '<div class="toolbar command-filters"><select id="commandType" onchange="applyCommandFilters()">' + ['全部类型', '超阈值', '未达目标', '趋势突变', '未关闭问题'].map(function (x) { return '<option ' + (state.commandType === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' +
    '<select id="commandStatus" onchange="applyCommandFilters()">' + ['全部状态', '待处理', '待反馈', '整改中', '待复核', '已关闭'].map(function (x) { return '<option ' + (state.commandStatus === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' +
    '<select id="commandOwner" onchange="applyCommandFilters()">' + ownerOptions.map(function (x) { return '<option ' + (state.commandOwner === x ? 'selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' +
    '<input id="commandQuery" value="' + state.commandQuery + '" placeholder="异常名称、责任部门或来源" onkeydown="if(event.key===\'Enter\')applyCommandFilters()">' +
    '<button class="secondary" onclick="applyCommandFilters()">查询</button><button class="secondary" onclick="resetCommandFilters()">重置</button>' +
    (boardLabel ? '<span class="command-board-chip">板块：' + boardLabel.label + '<button onclick="clearCommandBoardFilter()">×</button></span>' : '') + '</div>' +
    '<div class="table-card command-table"><table><thead><tr><th>序号</th><th>类型</th><th>异常事项 / 来源</th><th>层级 / 责任</th><th>当前值 / 目标</th><th>状态</th><th>操作</th></tr></thead><tbody>' + (rows || '<tr><td colspan="7"><div class="empty compact">当前筛选条件下没有异常。</div></td></tr>') + '</tbody></table></div><div class="command-context-tip"><b>责任筛选：</b>异常按责任部门聚合并保留责任人；高优先级、超期和未关闭问题可直接升级至公司管理层，升级记录写入运行留痕。</div>';
}
function commandTraceView() {
  const layer = commandLayer();
  const timeline = layer.trace.map(function (x) {
    return '<div class="command-trace-item"><span>' + x.time + '</span><i></i><div><b>' + x.actor + ' · ' + x.action + '</b><p>' + x.result + '</p></div></div>';
  }).join('');
  return '<div class="split top-gap"><section class="card"><div class="card-h"><h2>看板刷新与异常升级留痕</h2><span class="meta">' + layer.label + '</span></div><div class="command-trace">' + (timeline || '<div class="empty compact">当前层级暂无运行记录。</div>') + '</div></section><section class="card"><div class="card-h"><h2>数据来源与责任</h2><span class="meta">只读汇聚</span></div><div class="info-grid command-source-grid">' + info('数据批次', layer.batch) + info('更新频率', '每 30 分钟 / 事件触发') + info('任务数据', 'MES 报工 · ERP 订单') + info('质量数据', 'QMS 质量台账') + info('存货数据', 'ERP 存货') + info('合同数据', 'OA 合同台账') + info('安全数据', 'EHS 隐患台账') + info('责任部门', layer.owner) + '</div><div class="command-context-tip">看板展示汇聚结果；指标口径变更需走指标版本审批，异常升级需保留原责任人及升级依据。</div></section></div>';
}

function commandPage() {
  let body = commandBoardView();
  if (state.commandTab === 'exceptions') body = commandExceptionView();
  if (state.commandTab === 'trace') body = commandTraceView();
  const content = commandHero() + commandLayerTabs() + commandKpis() + commandTabs() + body;
  const actions = '<button class="secondary" onclick="refreshCommandBoard()">刷新看板</button><button class="secondary" onclick="exportCommandBoard()">导出 / 打印</button><button class="primary" onclick="setCommandTab(\'exceptions\')">查看异常</button>';
  return shell(content, '指挥看板', '分层指挥视图 · 任务 / 质量 / 存货 / 合同 / 安全', actions);
}

/* ---------- 交互 ---------- */

function switchCommandLayer(key) {
  if (!COMMAND_LAYERS[key]) return;
  state.commandLayer = key;
  state.commandTab = 'board';
  state.commandType = '全部类型';
  state.commandStatus = '全部状态';
  state.commandOwner = '全部责任部门';
  state.commandBoard = '全部板块';
  state.commandQuery = '';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('已切换至' + COMMAND_LAYERS[key].label + '：' + COMMAND_LAYERS[key].path);
}
function setCommandTab(tab) {
  if (['board', 'exceptions', 'trace'].indexOf(tab) < 0) return;
  state.commandTab = tab;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function applyCommandFilters() {
  state.commandType = $('#commandType') ? $('#commandType').value : state.commandType;
  state.commandStatus = $('#commandStatus') ? $('#commandStatus').value : state.commandStatus;
  state.commandOwner = $('#commandOwner') ? $('#commandOwner').value : state.commandOwner;
  state.commandQuery = $('#commandQuery') ? $('#commandQuery').value : state.commandQuery;
  render();
}
function resetCommandFilters() {
  state.commandType = '全部类型';
  state.commandStatus = '全部状态';
  state.commandOwner = '全部责任部门';
  state.commandBoard = '全部板块';
  state.commandQuery = '';
  render();
  toast('已重置异常筛选条件。');
}
function commandShowBoardExceptions(boardKey) {
  state.commandBoard = boardKey;
  state.commandTab = 'exceptions';
  state.commandType = '全部类型';
  state.commandStatus = '全部状态';
  state.commandOwner = '全部责任部门';
  state.commandQuery = '';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function clearCommandBoardFilter() {
  state.commandBoard = '全部板块';
  render();
}
function commandException(id) { return commandLayer().exceptions.find(function (e) { return e.id === id; }); }
function commandBoardDetail(key) {
  const layer = commandLayer(), b = layer.boards.find(function (x) { return x.key === key; });
  if (!b) return;
  const rows = layer.exceptions.filter(function (e) { return e.board === key; }).map(function (e) {
    return '<div class="command-detail-row"><div><b>' + e.title + '</b><small>' + e.scope + ' / ' + e.owner + ' · ' + e.source + '</small></div>' + commandBadge(e.status) + '</div>';
  }).join('') || '<div class="empty compact">当前看板暂无异常。</div>';
  openModal(layer.label + ' · ' + b.label + '看板', '<div class="command-board-detail"><div class="command-detail-head"><div><span>' + layer.path + '</span><h2>' + b.label + ' · ' + b.value + b.unit + '</h2><p>目标 ' + b.target + ' · ' + b.note + '</p></div>' + commandBadge(b.status) + '</div>' + commandSpark(b.spark) + '<div class="info-grid">' + info('看板层级', layer.label) + info('责任部门', layer.owner) + info('数据批次', layer.batch) + info('更新时间', layer.updatedAt) + '</div><h3>异常明细</h3><div class="command-detail-list">' + rows + '</div></div>', '<button class="secondary" onclick="closeModal()">关闭</button>' + (b.metricId ? '<button class="secondary" onclick="closeModal();showMetric(\'' + b.metricId + '\')">查看指标</button>' : '') + '<button class="primary" onclick="closeModal();commandShowBoardExceptions(\'' + key + '\')">查看异常 ' + commandExceptionCount(key) + ' 条</button>', true);
}
function commandExceptionDetail(id) {
  const e = commandException(id);
  if (!e) return;
  const action = (e.metricId ? '<button class="secondary" onclick="closeModal();showMetric(\'' + e.metricId + '\')">查看指标</button>' : '') + (e.problemId ? '<button class="secondary" onclick="closeModal();showProblem(\'' + e.problemId + '\')">查看问题</button>' : '') + (e.metricId ? '<button class="secondary" onclick="closeModal();openProblemForm(\'' + e.metricId + '\')">发起问题</button>' : '') + '<button class="primary" onclick="commandEscalate(\'' + id + '\')">升级至管理层</button>';
  openModal(e.id + ' · ' + e.title, '<div class="command-detail-head"><div><span>' + e.type + ' · ' + e.source + '</span><h2>' + e.title + '</h2><p>' + e.scope + ' / ' + e.owner + ' · ' + e.time + '</p></div>' + commandBadge(e.status) + '</div><div class="info-grid">' + info('异常类型', e.type) + info('风险等级', e.level) + info('当前值', e.current) + info('目标值', e.target) + info('责任部门', e.scope) + info('责任人', e.owner) + info('数据来源', e.source) + info('是否超期', e.overdue ? '是' : '否') + '</div><div class="command-detail-note">' + e.note + '</div>', '<button class="secondary" onclick="closeModal()">关闭</button>' + action, true);
}
function commandOpenMetric(id) {
  const e = commandException(id);
  if (!e || !e.metricId) { toast('该异常未关联指标下钻。'); return; }
  showMetric(e.metricId);
}
function commandOpenProblem(id) {
  const e = commandException(id);
  if (!e) return;
  if (e.problemId) { showProblem(e.problemId); return; }
  if (e.metricId) { openProblemForm(e.metricId); return; }
  toast('该异常尚未生成问题，可在详情中升级或进入问题台账。');
}
function commandEscalate(id) {
  const e = commandException(id);
  if (!e) return;
  if (e.escalated) { toast('该异常已升级至公司管理层。'); return; }
  if (!['operations', 'manager', 'audit'].includes(state.role)) {
    toast('仅经营发展部、审计监督部或公司管理层可升级异常。');
    return;
  }
  e.escalated = true;
  if (e.status === '待处理' || e.status === '待反馈') e.status = '整改中';
  const layer = commandLayer();
  layer.trace.unshift({ time: commandNow(), actor: currentRole().name, action: '异常升级 · ' + e.id, result: e.title + ' 已升级至公司管理层协调，保留原责任人 ' + e.owner + '；升级依据和原责任链已留痕。' });
  closeModal();
  render();
  toast('异常已升级至公司管理层，运行留痕已更新。');
}
function refreshCommandBoard() {
  if (!['operations', 'manager', 'audit'].includes(state.role)) {
    toast('仅经营发展部、审计监督部或公司管理层可刷新指挥看板。');
    return;
  }
  const layer = commandLayer();
  layer.updatedAt = commandNow();
  layer.trace.unshift({ time: commandNow(), actor: currentRole().name, action: '刷新' + layer.label + '看板', result: '重新汇聚 MES / ERP / QMS / OA / EHS 数据，更新 5 类看板与异常视图。' });
  render();
  toast(layer.label + '看板已刷新；异常、责任和升级状态保留。');
}
function exportCommandBoard() {
  toast('已打开打印预览；可在浏览器中选择“另存为 PDF”。');
  setTimeout(function () { window.print(); }, 260);
}

/* ---------- 观星台全景入口 ---------- */

const starOverviewBeforeCommand = starOverviewPage;
starOverviewPage = function () {
  const html = starOverviewBeforeCommand();
  if (html.indexOf('command-entry') >= 0) return html;
  const entry = '<div class="command-entry"><div><span class="eyebrow">指挥层看板 · 分层运营</span><h3>公司 / 业务域 / 车间 / 产线一屏统览</h3><p>任务、质量、存货、合同、安全 5 类看板 · 异常可直接转问题闭环</p></div><button class="primary" onclick="go(\'command\')">打开指挥看板 →</button></div>';
  return html.replace('<div class="star-boundary">', entry + '<div class="star-boundary">');
};

/* ---------- 接管 render，保留经营简报与所有原有页面 ---------- */

const renderBeforeStarCommand = render;
render = function () {
  if (state.page === 'command') {
    $('#app').innerHTML = commandPage();
    return;
  }
  return renderBeforeStarCommand();
};
