const DEMO_RELEASE = {
  version: 'V1.4.0-IT',
  baseline: 'demo-v1.3.0-audit',
  releasedAt: '2026-09-06',
  scope: 'SOW 2.1.7 信息工程部10条专属流程；保留审计15条及观星台能力'
};

const state = {
  page: 'home',
  role: 'audit',
  contractId: 'HT-202608-029',
  metricId: 'MET-002',
  problemId: 'WT-202608-021',
  contractTab: 'overview',
  metricTab: 'analysis',
  problemTab: 'context',
  clauseId: 'CL-02',
  contractFilter: '全部状态',
  contractQuery: '',
  contractPage: 1,
  problemFilter: '全部状态',
  problemQuery: '',
  problemPage: 1,
  employeeId: 'EMP-2026-018',
  onboardingId: 'ONB-202608-006',
  leaveId: 'LV-202608-042',
  employeeTab: 'overview',
  onboardingTab: 'tasks',
  leaveTab: 'form',
  employeeFilter: '全部状态',
  employeeQuery: '',
  employeePage: 1,
  onboardingFilter: '全部状态',
  qualificationFilter: '全部状态',
  blueprintLine: 'metric'
};

const roles = {
  admin: { label: '党政综合办', name: '何静', short: '何', scope: '公文会议、督办验收、用印与归档管理' },
  audit: { label: '审计监督部', name: '陈欣悦', short: '陈', scope: '合同AI复核、风险定级与闭环复核' },
  operations: { label: '经营发展部', name: '周敏', short: '周', scope: '指标分析、会议场景与问题发起' },
  owner: { label: '生产管理部', name: '刘强', short: '刘', scope: '责任事项反馈、措施提交与进度维护' },
  manager: { label: '公司管理层', name: '王总', short: '王', scope: '经营驾驶舱、风险态势与决策跟踪' },
  hr: { label: '人力资源部', name: '吴欣', short: '吴', scope: '入职协同、员工档案、假勤审批与岗位资格管理' },
  it: { label: '信息工程部', name: '尚椿琳', short: '尚', scope: '权限服务、接口运行、发布变更与异常补偿' },
  employee: { label: '员工本人', name: '李明', short: '李', scope: '查看本人档案、发起请假并跟踪个人事项' }
};

const db = {
  contracts: [
    {
      id: 'HT-202608-029', title: '华东区域包装材料年度采购合同', party: '四川华彩包装材料有限公司',
      amount: 1280000, owner: '采购部', manager: '赵倩', type: '采购合同', template: '非标准模板',
      status: 'AI预审中', risk: '高', currentNode: 'AI辅助审核', version: 'V0.9送审稿',
      createdAt: '2026-08-20 09:32',
      clauses: [
        { id: 'CL-01', no: '第4.2条', title: '验收与质量异议', risk: '中', decision: '已采纳',
          text: '甲方应在货物到达后3个工作日内完成验收，逾期视为验收合格。',
          issue: '默认验收期限偏短，未区分隐蔽瑕疵。',
          suggestion: '增加隐蔽瑕疵追索期，并将常规验收期限调整为7个工作日。',
          revised: '甲方应在货物到达后7个工作日内完成外观与数量验收；隐蔽瑕疵不受该期限限制。',
          basis: '采购合同合规清单2026版 / 第18项', reviewer: '曹怀月', reviewedAt: '2026-08-20 10:06' },
        { id: 'CL-02', no: '第8.1条', title: '违约责任上限', risk: '高', decision: '待复核',
          text: '乙方承担的全部违约责任累计不超过本合同已付款金额的5%。',
          issue: '责任上限过低，且以已付款金额为基数，可能无法覆盖质量和交付损失。',
          suggestion: '责任上限调整为合同含税总额的20%，并排除故意、重大过失和知识产权侵权。',
          revised: '', basis: '合同风险规则CR-024 / RISK-RULE-2026.08.3', reviewer: '', reviewedAt: '' },
        { id: 'CL-03', no: '第10.3条', title: '付款前置条件', risk: '低', decision: '保留原文',
          text: '甲方收到乙方开具的增值税专用发票后30日内付款。',
          issue: '未明确验收合格与付款资料完整为付款前提。',
          suggestion: '补充验收合格、对账确认和付款资料完整三个前置条件。',
          revised: '甲方内部付款流程另行控制，合同条款保留。', basis: '付款控制清单PC-006',
          reviewer: '曹怀月', reviewedAt: '2026-08-20 10:12' }
      ],
      workflow: [
        { name: '业务发起', handler: '赵倩', status: '已完成', time: '08-20 09:32', opinion: '合同资料已提交' },
        { name: 'AI辅助审核', handler: '审计监督部', status: '处理中', time: '08-20 09:34', opinion: '识别3项风险，1项待人工复核' },
        { name: '部门会签', handler: '采购部/财务部', status: '待办理', time: '—', opinion: '等待AI审核完成' },
        { name: '授权审批', handler: '分管领导', status: '待办理', time: '—', opinion: '—' },
        { name: '用印签署', handler: '党政综合办', status: '待办理', time: '—', opinion: '—' }
      ],
      payments: [
        { phase: '首批交付验收', ratio: '30%', amount: 384000, date: '2026-09-30', status: '待付款条件' },
        { phase: '年度供货过半', ratio: '40%', amount: 512000, date: '2027-02-28', status: '未到期' },
        { phase: '合同期满结算', ratio: '30%', amount: 384000, date: '2027-08-31', status: '未到期' }
      ],
      files: [
        { id: 'ATT-03', name: '华东区域包装材料年度采购合同_V0.9.docx', category: '送审稿', version: 'V0.9', uploader: '赵倩', time: '2026-08-20 09:31', size: '2.8MB' },
        { id: 'ATT-02', name: '供应商资质及授权文件.pdf', category: '支撑材料', version: 'V1.0', uploader: '赵倩', time: '2026-08-20 09:20', size: '4.1MB' },
        { id: 'ATT-01', name: '采购立项审批单.pdf', category: '前置审批', version: 'V1.0', uploader: '系统归集', time: '2026-08-20 09:18', size: '1.2MB' }
      ],
      audit: [
        { time: '2026-08-20 10:12', actor: '曹怀月', action: '复核第10.3条', result: '保留原文并补充内部付款控制说明' },
        { time: '2026-08-20 10:06', actor: '曹怀月', action: '采纳第4.2条建议', result: '生成V0.9审阅修订内容' },
        { time: '2026-08-20 09:34', actor: 'AI合同审核任务', action: '完成条款扫描', result: '高风险1项、中风险1项、低风险1项' },
        { time: '2026-08-20 09:32', actor: '赵倩', action: '发起合同评审', result: '生成合同台账及评审流程' }
      ]
    },
    { id: 'HT-202608-028', title: '纸张原料季度框架采购协议', party: '成都恒丰纸业有限公司', amount: 860000, owner: '采购部', manager: '何峰', type: '采购合同', template: '标准模板', status: '部门评审中', risk: '中', currentNode: '部门会签', version: 'V1.0评审稿', createdAt: '2026-08-19 14:20', clauses: [], workflow: [], payments: [], files: [], audit: [] },
    { id: 'HT-202608-027', title: '印刷设备维保服务合同', party: '宜宾智造设备服务有限公司', amount: 486000, owner: '设备动力部', manager: '李超', type: '服务合同', template: '标准模板', status: '履约中', risk: '中', currentNode: '履约跟踪', version: 'V1.0签署版', createdAt: '2026-08-16 11:08', clauses: [], workflow: [], payments: [], files: [], audit: [] },
    { id: 'HT-202608-024', title: '信息系统运维服务合同', party: '四川数字协同科技有限公司', amount: 720000, owner: '信息工程部', manager: '尚椿琳', type: '服务合同', template: '非标准模板', status: '待签署', risk: '低', currentNode: '用印签署', version: 'V1.2定稿', createdAt: '2026-08-13 16:18', clauses: [], workflow: [], payments: [], files: [], audit: [] },
    { id: 'HT-202608-019', title: '原材料运输服务框架协议', party: '五粮液物流有限公司', amount: 2100000, owner: '供应链管理部', manager: '杨林', type: '运输服务', template: '标准模板', status: '已归档', risk: '低', currentNode: '已归档', version: 'V1.0签署版', createdAt: '2026-08-05 10:10', clauses: [], workflow: [], payments: [], files: [], audit: [] }
  ],
  metrics: [
    { id: 'MET-001', code: 'STAR-M-001', name: '营业收入', value: '8,426万元', achievement: 96.8, trend: '+5.4%', state: '正常', unit: '万元', owner: '财务部', period: '2026年8月', version: 'V2.1', updatedAt: '2026-08-20 08:30', definition: '当期主营业务收入汇总。', actual: [7210,7480,7650,7890,8030,8180,8350,8426], target: [7300,7500,7750,8000,8200,8400,8550,8700], ranking: [], lineage: ['ERP财务','销售收入明细表','本期收入字段','收入主题模型V2.4','营业收入指标','经营简报/驾驶舱'], sourceRows: [] },
    { id: 'MET-002', code: 'STAR-M-006', name: '产值完成率', value: '93.8%', achievement: 93.8, trend: '-3.1%', state: '预警', unit: '%', owner: '生产管理部', period: '2026年8月', version: 'V1.6', updatedAt: '2026-08-20 08:30', definition: '当期合格完工产值 ÷ 当期计划产值 × 100%', actual: [98.1,96.8,97.6,95.4,96.2,94.8,95.1,93.8], target: [100,100,100,100,100,100,100,100],
      ranking: [{name:'印刷一车间',value:'97.2%',state:'正常'},{name:'印刷二车间',value:'94.6%',state:'预警'},{name:'后加工车间',value:'89.1%',state:'重点关注'}],
      lineage: ['MES生产系统','完工报工明细','合格数量/标准产值','生产经营主题V3.2','产值完成率','经营简报/驾驶舱/8月经营会'],
      sourceRows: [{id:'MES-20260819-031',org:'后加工车间',date:'2026-08-19',plan:'186万元',actual:'151万元',deviation:'-18.8%',quality:'已对账'},{id:'MES-20260819-018',org:'印刷二车间',date:'2026-08-19',plan:'224万元',actual:'207万元',deviation:'-7.6%',quality:'已对账'},{id:'MES-20260818-026',org:'后加工车间',date:'2026-08-18',plan:'178万元',actual:'159万元',deviation:'-10.7%',quality:'已对账'}] },
    { id: 'MET-003', code: 'STAR-M-011', name: '库存周转天数', value: '42.6天', achievement: 89.2, trend: '+4.8天', state: '预警', unit: '天', owner: '供应链管理部', period: '2026年8月', version: 'V1.3', updatedAt: '2026-08-20 08:30', definition: '期末库存与出库成本折算周转天数。', actual: [36.1,36.8,37.5,38.2,39.6,40.1,41.8,42.6], target: [38,38,38,38,38,38,38,38], ranking: [], lineage: ['ERP库存','存货收发存','期末库存/出库成本','供应链主题V2.0','库存周转天数','经营简报'], sourceRows: [] }
  ],
  problems: [
    { id: 'WT-202608-021', title: '8月产值完成率低于计划6.2%', metricId: 'MET-002', source: '公司驾驶舱', sourceRef: 'STAR-SNAPSHOT-202608-01', org: '生产管理部', owner: '刘强', collaborators: '设备动力部、质量管理部', priority: '高', due: '2026-08-25', status: '整改中', progress: 60, reason: '后加工车间两台模切设备停机，重点订单换版次数增加，造成有效产出下降。', measure: '已调整订单排产并安排设备专项点检，8月22日前恢复二号模切机。', result: '预计追回产值82万元，完成率提升至96.1%。', createdAt: '2026-08-20 09:10', files: [{name:'设备点检及排产调整计划.xlsx',uploader:'刘强',time:'2026-08-20 14:20'}], audit: [{time:'2026-08-20 14:20',actor:'刘强',action:'提交阶段措施',result:'进度更新为60%，上传排产调整计划'},{time:'2026-08-20 09:11',actor:'系统动作流',action:'生成OA责任待办',result:'任务WF-WT-202608-021已发送责任人'},{time:'2026-08-20 09:10',actor:'周敏',action:'从指标异常发起问题',result:'自动带入指标、组织、期间和来源快照'}] },
    { id: 'WT-202608-018', title: '库存周转天数环比上升4.8天', metricId: 'MET-003', source: '月度经营简报', sourceRef: 'STAR-SNAPSHOT-202608-01', org: '供应链管理部', owner: '杨林', collaborators: '采购部', priority: '中', due: '2026-08-26', status: '待反馈', progress: 20, reason: '', measure: '', result: '', createdAt: '2026-08-20 09:18', files: [], audit: [] },
    { id: 'WT-202608-013', title: '制造费用超预算预警', metricId: 'MET-001', source: '8月经营分析会', sourceRef: 'MEETING-202608-01', org: '财务部', owner: '李敏', collaborators: '生产管理部', priority: '高', due: '2026-08-22', status: '待复核', progress: 100, reason: '设备集中维保及临时外协费用增加。', measure: '已完成费用归类复核与预算调整说明。', result: '超预算影响降至1.8%。', createdAt: '2026-08-18 16:00', files: [], audit: [] },
    { id: 'WT-202608-009', title: '重点客户交付准时率下降', metricId: 'MET-002', source: '指挥层看板', sourceRef: 'STAR-ALERT-202608-009', org: '生产管理部', owner: '刘强', collaborators: '营销中心', priority: '中', due: '2026-08-28', status: '待反馈', progress: 10, reason: '', measure: '', result: '', createdAt: '2026-08-17 10:20', files: [], audit: [] },
    { id: 'WT-202608-006', title: '纸张安全库存低于阈值', metricId: 'MET-003', source: '供应链专题', sourceRef: 'STAR-ALERT-202608-006', org: '供应链管理部', owner: '杨林', collaborators: '采购部', priority: '高', due: '2026-08-21', status: '已关闭', progress: 100, reason: '临时订单占用安全库存。', measure: '完成紧急采购并重算安全库存。', result: '库存恢复至12天。', createdAt: '2026-08-15 11:12', files: [], audit: [] }
  ],
  todos: [
    { id:'WF-LV-202608-042',objectId:'LV-202608-042',type:'请假审批',title:'李明—3天年休假申请',role:'hr',due:'今日16:30',status:'待处理' },
    { id:'WF-ONB-202608-006',objectId:'ONB-202608-006',type:'入职异常',title:'张薇—OA及ERP账号开通失败待补偿',role:'hr',due:'今日17:00',status:'待处理' },
    { id:'WF-HT-202608-029',objectId:'HT-202608-029',type:'合同AI复核',title:'华东区域包装材料年度采购合同—高风险条款待复核',role:'audit',due:'今日16:00',status:'待处理' },
    { id:'WF-WT-202608-021',objectId:'WT-202608-021',type:'问题整改',title:'8月产值完成率低于计划6.2%—提交整改进展',role:'owner',due:'今日17:30',status:'处理中' },
    { id:'WF-WT-202608-013',objectId:'WT-202608-013',type:'问题复核',title:'制造费用超预算预警—复核关闭',role:'audit',due:'明日',status:'待处理' }
  ],
  messages: [
    {id:'MSG-HR-01',title:'张薇入职任务发生账号开通异常',time:'09:28',read:false,objectId:'ONB-202608-006'},
    {id:'MSG-HR-02',title:'李明提交3天年休假申请',time:'10:35',read:false,objectId:'LV-202608-042'},
    {id:'MSG-01',title:'合同HT-202608-029识别出1项高风险条款',time:'10:12',read:false,objectId:'HT-202608-029'},
    {id:'MSG-02',title:'问题WT-202608-021收到责任部门措施反馈',time:'14:20',read:false,objectId:'WT-202608-021'},
    {id:'MSG-03',title:'产值完成率数据批次已完成对账',time:'08:30',read:true,objectId:'MET-002'}
  ]
};

db.employees = [
  { id:'EMP-2026-018', name:'李明', gender:'男', mobile:'138****6218', org:'经营发展部', position:'经营分析专员', level:'专业序列P5', status:'在职', hireDate:'2025-03-18', manager:'周敏', location:'宜宾总部', contractNo:'LD-2025-0318', contractEnd:'2028-03-17', annualBalance:8, source:'HR主数据', avatar:'李',
    qualifications:[{id:'QF-2026-081',name:'经营分析岗位资格',category:'岗位任职',issued:'2026-05-31',expires:'2027-05-31',status:'有效',source:'学习平台'}],
    attendance:[{date:'2026-08-19',shift:'行政班',result:'正常',source:'考勤机'},{date:'2026-08-18',shift:'行政班',result:'正常',source:'考勤机'}],
    audit:[{time:'2026-08-20 08:05',actor:'HR主数据同步',action:'更新组织岗位',result:'经营发展部 / 经营分析专员'},{time:'2026-08-01 06:00',actor:'考勤动作流',action:'初始化年度余额',result:'年休假可用8天'}] },
  { id:'EMP-2026-026', name:'张薇', gender:'女', mobile:'187****0936', org:'生产管理部', position:'设备操作员', level:'技能序列S3', status:'入职办理中', hireDate:'2026-08-25', manager:'刘强', location:'生产园区', contractNo:'待生成', contractEnd:'—', annualBalance:0, source:'招聘录用单', avatar:'张',
    qualifications:[{id:'QF-2026-099',name:'印刷设备上岗资格',category:'特定岗位',issued:'—',expires:'—',status:'待培训',source:'入职任务'}],
    attendance:[], audit:[{time:'2026-08-20 09:20',actor:'吴欣',action:'确认录用入职',result:'生成员工预档案与6项入职任务'}] },
  { id:'EMP-2025-089', name:'王晓雨', gender:'女', mobile:'159****7712', org:'信息工程部', position:'应用开发工程师', level:'专业序列P6', status:'在职', hireDate:'2025-07-08', manager:'尚椿琳', location:'宜宾总部', contractNo:'LD-2025-0708', contractEnd:'2028-07-07', annualBalance:6, source:'HR主数据', avatar:'王',
    qualifications:[{id:'QF-2025-166',name:'信息安全保密资格',category:'专项资格',issued:'2025-09-01',expires:'2026-09-30',status:'临期',source:'资质台账'}],
    attendance:[{date:'2026-08-19',shift:'行政班',result:'外出',source:'OA外出单'}], audit:[] },
  { id:'EMP-2024-133', name:'陈杰', gender:'男', mobile:'136****5501', org:'设备动力部', position:'设备维修工', level:'技能序列S5', status:'在职', hireDate:'2024-04-12', manager:'李超', location:'生产园区', contractNo:'LD-2024-0412', contractEnd:'2027-04-11', annualBalance:3, source:'HR主数据', avatar:'陈',
    qualifications:[{id:'QF-2025-051',name:'低压电工作业证',category:'特种作业',issued:'2023-09-11',expires:'2026-09-10',status:'临期',source:'资质台账'}],
    attendance:[{date:'2026-08-19',shift:'早班',result:'正常',source:'考勤机'}], audit:[] }
];

db.onboardings = [
  { id:'ONB-202608-006', employeeId:'EMP-2026-026', employee:'张薇', org:'生产管理部', position:'设备操作员', hireDate:'2026-08-25', coordinator:'吴欣', status:'办理中', risk:'账号开通失败', createdAt:'2026-08-20 09:20',
    tasks:[
      {id:'ONB-T01',name:'资料与身份核验',owner:'人力资源部 / 吴欣',due:'08-20 12:00',status:'已完成',result:'身份证、学历与体检资料核验通过',source:'招聘录用单'},
      {id:'ONB-T02',name:'OA及ERP账号开通',owner:'信息工程部 / 尚椿琳',due:'08-21 17:00',status:'失败待补偿',result:'ERP组织编码未同步，接口返回E102',source:'动作流AF-ONB-02'},
      {id:'ONB-T03',name:'门禁卡与员工工牌',owner:'党政综合办 / 何静',due:'08-24 12:00',status:'已完成',result:'工牌JM026已制作，门禁权限待入职日生效',source:'行政协同'},
      {id:'ONB-T04',name:'劳保物资领用',owner:'安全环保部 / 周勇',due:'08-24 17:00',status:'处理中',result:'尺码已确认，等待仓库配发',source:'物资领用'},
      {id:'ONB-T05',name:'安全与上岗培训',owner:'生产管理部 / 刘强',due:'08-25 15:00',status:'待办理',result:'完成后自动写入岗位资格',source:'培训计划'},
      {id:'ONB-T06',name:'劳动合同签署',owner:'人力资源部 / 吴欣',due:'08-25 17:00',status:'待办理',result:'电子合同模板已生成',source:'电子签'}
    ],
    audit:[{time:'2026-08-20 09:28',actor:'动作流AF-ONB-02',action:'执行账号开通',result:'ERP组织编码缺失，已进入补偿队列'},{time:'2026-08-20 09:20',actor:'吴欣',action:'发起入职协同',result:'生成员工预档案和6项跨部门任务'}] },
  { id:'ONB-202608-005', employeeId:'EMP-2026-018', employee:'李明', org:'经营发展部', position:'经营分析专员', hireDate:'2025-03-18', coordinator:'吴欣', status:'已完成', risk:'无', createdAt:'2025-03-12 10:10',
    tasks:[{id:'ONB-OLD-01',name:'入职资料归集',owner:'人力资源部',due:'2025-03-18',status:'已完成',result:'资料归档完成',source:'历史迁移'}],
    audit:[{time:'2025-03-18 17:30',actor:'系统',action:'完成入职协同',result:'员工状态转为在职'}] },
  { id:'ONB-202608-007', employeeId:'EMP-2025-089', employee:'王晓雨', org:'信息工程部', position:'应用开发工程师', hireDate:'2025-07-08', coordinator:'吴欣', status:'已完成', risk:'无', createdAt:'2025-07-02 14:00',
    tasks:[{id:'ONB-OLD-02',name:'入职资料归集',owner:'人力资源部',due:'2025-07-08',status:'已完成',result:'资料归档完成',source:'历史迁移'}], audit:[] }
];

db.leaves = [
  { id:'LV-202608-042', employeeId:'EMP-2026-018', employee:'李明', org:'经营发展部', type:'年休假', start:'2026-08-24 08:30', end:'2026-08-26 17:30', days:3, reason:'家庭事务', status:'待审批', currentNode:'部门负责人审批', balanceBefore:8, balanceAfter:5, conflict:'校验通过', approver:'周敏', createdAt:'2026-08-20 10:35',
    workflow:[{name:'员工提交',handler:'李明',status:'已完成',opinion:'申请3天年休假'},{name:'部门负责人审批',handler:'周敏',status:'处理中',opinion:'待审批'},{name:'人力资源备案',handler:'吴欣',status:'待办理',opinion:'—'},{name:'考勤结果回写',handler:'系统动作流',status:'待办理',opinion:'—'}],
    audit:[{time:'2026-08-20 10:35',actor:'李明',action:'提交请假申请',result:'余额充足、无排班冲突，进入部门负责人审批'}] },
  { id:'LV-202608-044', employeeId:'EMP-2025-089', employee:'王晓雨', org:'信息工程部', type:'调休', start:'2026-08-27 13:30', end:'2026-08-27 17:30', days:0.5, reason:'个人事务', status:'冲突待调整', currentNode:'提交校验', balanceBefore:2, balanceAfter:1.5, conflict:'与信息安全复训任务冲突', approver:'尚椿琳', createdAt:'2026-08-20 11:12', workflow:[], audit:[] },
  { id:'LV-202608-038', employeeId:'EMP-2024-133', employee:'陈杰', org:'设备动力部', type:'年休假', start:'2026-08-14 08:30', end:'2026-08-14 17:30', days:1, reason:'个人事务', status:'已通过', currentNode:'已归档', balanceBefore:4, balanceAfter:3, conflict:'校验通过', approver:'李超', createdAt:'2026-08-10 09:15', workflow:[], audit:[] }
];

const batches = [
  { no:'共享底座', title:'角色、待办、消息、审计与演示重置', status:'已实现', items:['统一业务对象','角色差异与数据范围','状态回写与审计轨迹','刷新恢复演示基线'] },
  { no:'八条主线', title:'SOW覆盖与Demo闭环', status:'已实现', items:['D01合同与履约','D02/D03人事全生命周期','D04督办、D05风险、D06服务','D07问题、D08数据质量'] }
];

const $ = function (selector) { return document.querySelector(selector); };
const currentRole = function () { return roles[state.role]; };
const contract = function (id) { return db.contracts.find(function (x) { return x.id === (id || state.contractId); }); };
const metric = function (id) { return db.metrics.find(function (x) { return x.id === (id || state.metricId); }); };
const problem = function (id) { return db.problems.find(function (x) { return x.id === (id || state.problemId); }); };
const employee = function (id) { return db.employees.find(function (x) { return x.id === (id || state.employeeId); }); };
const onboarding = function (id) { return db.onboardings.find(function (x) { return x.id === (id || state.onboardingId); }); };
const leave = function (id) { return db.leaves.find(function (x) { return x.id === (id || state.leaveId); }); };
const money = function (value) { return '¥' + Number(value).toLocaleString('zh-CN'); };
const unread = function () { return db.messages.filter(function (x) { return !x.read; }).length; };
const metricProblems = function (id) { return db.problems.filter(function (x) { return x.metricId === id; }); };

function statusClass(value) {
  if (String(value).includes('失败') || String(value).includes('冲突')) return 'red';
  if (['已完成','已关闭','已归档','已采纳','正常','已对账','已生效','有效','在职','已通过','校验通过','无'].includes(value)) return 'green';
  if (['AI预审中','部门评审中','履约中','整改中','处理中','办理中','入职办理中'].includes(value)) return 'blue';
  if (['高风险','高优先级','已退回','重点关注','失败待补偿','冲突待调整'].includes(value)) return 'red';
  if (['中风险','待处理','待复核','待反馈','待办理','待签署','待审批','预警','临期','待培训'].includes(value)) return 'amber';
  return 'purple';
}
function badge(value) { return `<span class="status ${statusClass(value)}">${value}</span>`; }
function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  setTimeout(function () { node.classList.remove('show'); }, 2400);
}
function audit(target, action, result) {
  target.audit = target.audit || [];
  target.audit.unshift({ time:'2026-08-20 ' + new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}), actor:currentRole().name, action:action, result:result });
}
function info(label, value) { return `<div class="info"><div class="label">${label}</div><div class="value">${value}</div></div>`; }
function navButton(page, label) { return `<button class="nav-item ${state.page===page?'active':''}" onclick="go('${page}')"><i class="dot"></i>${label}</button>`; }
function renderNav() {
  return '<div class="nav-label">首页</div>' + navButton('home','管理工作台') + navButton('p0','分批建设总览') +
    '<div class="nav-label">合同 · 风险 · 审计</div>' + navButton('contract','合同管理中心') + navButton('contractDetail','合同AI审核') +
    '<div class="nav-label">观星台</div>' + navButton('star','经营驾驶舱') + navButton('metric','指标下钻与血缘') + navButton('problem','问题闭环中心') +
    '<div class="nav-label">人力资源</div>' + navButton('hr','人力资源工作台') + navButton('onboarding','入职协同') + navButton('employee','员工360档案') + navButton('leave','请假考勤') + navButton('qualification','岗位资格中心') +
    '<div class="nav-label">后续建设</div>' + navButton('later','党政 · IT · 风险');
}
function shell(content, title, subtitle, actions) {
  if(typeof ItWorkspace!=='undefined' && ItWorkspace.ui.returnId && !state.page.startsWith('it')) content='<div class="iw-return"><button class="link" onclick="ItWorkspace.open(ItWorkspace.ui.returnId)">← 返回原信息化申请</button></div>'+content;
  const profile = currentRole();
  const roleOptions = Object.keys(roles).map(function (key) { return `<option value="${key}" ${state.role===key?'selected':''}>${roles[key].label}</option>`; }).join('');
  return `
  <div class="shell">
    <header class="global-top">
      <div class="global-brand"><b>精美印务</b><span>协同与经营管理平台</span></div>
      ${typeof renderPrimaryNav==='function' ? renderPrimaryNav() : ''}
      <div class="global-actions">
        <button class="release-chip" onclick="openReleaseInfo()" aria-label="查看Demo版本信息">${DEMO_RELEASE.version}</button>
        <button class="icon-btn" onclick="openTodos()">待办 <i class="badge-num">${typeof AuditWorkspace!=='undefined'?AuditWorkspace.todoCount():db.todos.length}</i></button>
        <button class="icon-btn" onclick="openMessages()">消息 <i class="badge-num">${unread()}</i></button>
        <select class="role-switch" aria-label="切换演示角色" onchange="setRole(this.value)">${roleOptions}</select>
        <div class="avatar">${profile.short}</div>
      </div>
    </header>
    <aside class="side">
      <div class="brand side-brand"><b>业务导航</b><span>当前一级菜单对应的业务域与流程</span></div>
      ${renderNav()}
    </aside>
    <main class="main">
      <header class="top">
        <div class="crumb">五粮液精美印务 / <b>${title}</b></div>
      </header>
      <section class="content">
        <div class="page-title"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="page-actions">${actions||''}</div></div>
        ${content}
      </section>
    </main>
  </div>`;
}
function render() {
  const pages = { home:homePage, p0:p0Page, contract:contractPage, contractDetail:contractDetailPage, star:starPage, metric:metricPage, problem:problemPage, problemDetail:problemDetailPage, hr:hrPage, onboarding:onboardingPage, onboardingDetail:onboardingDetailPage, employee:employeePage, employeeDetail:employeeDetailPage, leave:leavePage, leaveDetail:leaveDetailPage, qualification:qualificationPage, later:laterPage };
  $('#app').innerHTML = (pages[state.page] || homePage)();
}
function go(page) { state.page=page; render(); window.scrollTo({top:0,behavior:'smooth'}); }
function setRole(value) { state.role=value; render(); toast('已切换为' + currentRole().label + '视角'); }
function openObject(id) {
  if(typeof ItWorkspace!=='undefined' && ItWorkspace.resolve(id)) return;
  if(typeof AuditWorkspace!=='undefined' && AuditWorkspace.resolve(id)) return;
  if (id.indexOf('HT-')===0) return showContract(id);
  if (id.indexOf('WT-')===0) return showProblem(id);
  if (id.indexOf('MET-')===0) return showMetric(id);
  if (id.indexOf('EMP-')===0) return showEmployee(id);
  if (id.indexOf('ONB-')===0) return showOnboarding(id);
  if (id.indexOf('LV-')===0) return showLeave(id);
}
function canAction(action){
  const grants={adminRegister:['admin','manager'],adminComplete:['admin','manager'],adminArchive:['admin','manager'],riskStart:['audit','manager'],riskVerify:['audit','manager'],riskClose:['audit','manager'],serviceCreate:['it','manager'],serviceRetry:['it'],servicePublish:['it','manager'],qualityCreate:['it','manager'],qualityRepair:['it','manager'],qualityRerun:['it','manager']};
  return (grants[action]||[]).includes(state.role);
}
function denied(action){toast('当前为'+currentRole().label+'视角，无权执行该操作；请切换至'+({adminRegister:'党政综合办/公司管理层',adminComplete:'党政综合办/公司管理层',adminArchive:'党政综合办/公司管理层',riskStart:'审计监督部/公司管理层',riskVerify:'审计监督部/公司管理层',riskClose:'审计监督部/公司管理层',serviceCreate:'信息工程部/公司管理层',serviceRetry:'信息工程部',servicePublish:'信息工程部/公司管理层',qualityCreate:'信息工程部/公司管理层',qualityRepair:'信息工程部/公司管理层',qualityRerun:'信息工程部/公司管理层'}[action]||'对应处理角色'));}
function openModal(title, body, footer, wide) {
  $('#modal-root').innerHTML = `<div class="modal-mask" role="dialog" aria-modal="true"><div class="modal ${wide?'wide':''}"><div class="modal-h"><h2>${title}</h2><button class="x" aria-label="关闭" onclick="closeModal()">×</button></div><div class="modal-b">${body}</div><div class="modal-f">${footer||'<button class="primary" onclick="closeModal()">关闭</button>'}</div></div></div>`;
}
function closeModal() { $('#modal-root').innerHTML=''; }

function pendingClauses(c) { return (c||contract()).clauses.filter(function (x) { return x.decision==='待复核'; }).length; }
function todoRow(t) {
  return `<div class="todo-row"><span class="type">${t.type}</span><button class="name as-link" onclick="openObject('${t.objectId}')">${t.title}</button><span class="meta">${t.due}</span>${badge(t.status)}</div>`;
}
function baseHomePage() {
  const activeProblems = db.problems.filter(function (x) { return x.status!=='已关闭'; });
  const myTodos = db.todos.filter(function (x) { return x.role===state.role || state.role==='manager'; });
  const profile = currentRole();
  const content = `
    <div class="role-banner"><div><span class="eyebrow">当前演示角色</span><h2>${profile.label} · ${profile.name}</h2><p>${profile.scope}</p></div><div class="session-note">本批次操作在当前会话内回写，刷新后恢复演示基线</div></div>
    <div class="kpis">
      <button class="kpi" onclick="go('contract')"><span class="label">合同评审进行中</span><strong class="val">${db.contracts.filter(function(x){return ['AI预审中','部门评审中'].includes(x.status);}).length}</strong><span class="hint">台账、条款、流程、附件同源</span></button>
      <button class="kpi alert" onclick="showContract('HT-202608-029')"><span class="label">AI待人工复核</span><strong class="val">${pendingClauses(contract('HT-202608-029'))}</strong><span class="hint">重点合同高风险条款</span></button>
      <button class="kpi" onclick="go('problem')"><span class="label">经营问题未关闭</span><strong class="val">${activeProblems.length}</strong><span class="hint">待反馈${activeProblems.filter(function(x){return x.status==='待反馈';}).length}项 · 待复核${activeProblems.filter(function(x){return x.status==='待复核';}).length}项</span></button>
      <button class="kpi warning" onclick="showMetric('MET-002')"><span class="label">产值完成率</span><strong class="val">93.8%</strong><span class="hint">低于计划6.2%，关联${metricProblems('MET-002').length}个问题</span></button>
    </div>
    <div class="story-grid">
      <article class="story-card"><div class="story-head"><div><span class="story-no">母版场景01</span><h2>合同AI审核与履约主线</h2></div>${badge(contract('HT-202608-029').status)}</div><p>从送审稿定位高风险条款，完成人工采纳和版本留痕，再进入部门会签、用印签署及履约计划。</p><div class="story-flow"><span class="done">合同发起</span><i>→</i><span class="current">AI条款复核</span><i>→</i><span>部门会签</span><i>→</i><span>用印签署</span><i>→</i><span>履约付款</span></div><div class="story-evidence"><b>可回看证据</b><span>3项AI识别</span><span>1项待复核</span><span>3份附件</span><span>完整日志</span></div><button class="primary" onclick="showContract('HT-202608-029')">进入合同主线</button></article>
      <article class="story-card"><div class="story-head"><div><span class="story-no">母版场景02</span><h2>指标异常到OA问题闭环</h2></div>${badge(metric('MET-002').state)}</div><p>从产值完成率下钻趋势、组织排行和MES来源明细，发起责任问题，形成OA待办并回写整改和复核结果。</p><div class="story-flow"><span class="done">指标预警</span><i>→</i><span class="done">问题快发</span><i>→</i><span class="current">整改反馈</span><i>→</i><span>复核关闭</span><i>→</i><span>结果回写</span></div><div class="story-evidence"><b>可回看证据</b><span>指标V1.6</span><span>MES来源3条</span><span>OA待办</span><span>措施附件</span></div><button class="primary" onclick="showMetric('MET-002')">进入指标主线</button></article>
      <article class="story-card hr-story"><div class="story-head"><div><span class="story-no">母版场景03</span><h2>员工入职、假勤与岗位资格联动</h2></div>${badge(onboarding('ONB-202608-006').status)}</div><p>录用确认后生成员工预档案和跨部门任务；异常任务进入补偿队列。请假审批实时校验余额与冲突，审批后同步员工档案和考勤结果。</p><div class="story-flow"><span class="done">员工预档案</span><i>→</i><span class="current">入职任务</span><i>→</i><span>员工360</span><i>→</i><span>假勤审批</span><i>→</i><span>资格预警</span></div><div class="story-evidence"><b>可回看证据</b><span>6项入职任务</span><span>1项失败补偿</span><span>余额8天</span><span>2项资格临期</span></div><button class="primary" onclick="go('hr')">进入人事主线</button></article>
    </div>
    <div class="split top-gap">
      <section class="card"><div class="card-h"><h2>我的待办</h2><button class="link" onclick="openTodos()">全部待办 →</button></div><div class="todo">${myTodos.length?myTodos.map(todoRow).join(''):'<div class="empty compact">当前角色暂无待办，可切换角色查看。</div>'}</div></section>
      <section class="card"><div class="card-h"><h2>共享对象关联健康度</h2><span class="meta">第一、二批</span></div><div class="health-list"><div><b>合同—条款—流程—附件</b><span class="health-ok">已贯通</span></div><div><b>指标—来源—问题—OA待办</b><span class="health-ok">已贯通</span></div><div><b>员工—入职—假勤—资格</b><span class="health-ok">已贯通</span></div><div><b>党政 / IT / 双源风险</b><span class="health-wait">后续批次</span></div></div></section>
    </div>`;
  return shell(content,'管理工作台','从业务对象进入连续演示，不再以功能说明页作为主要画面。');
}
function openTodos() {
  if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.todos();
  const rows = db.todos.map(function (t,i) { return `<tr><td>${i+1}</td><td><a onclick="closeModal();openObject('${t.objectId}')">${t.id}</a></td><td>${t.type}</td><td>${t.title}</td><td>${roles[t.role].label}</td><td>${t.due}</td><td>${badge(t.status)}</td></tr>`; }).join('');
  openModal('统一待办中心',`<div class="context-tip">待办与合同、问题对象共用同一状态；完成处理后数量和对象状态同步变化。</div><div class="table-card inline-table"><table><thead><tr><th>序号</th><th>任务编号</th><th>类型</th><th>任务名称</th><th>处理角色</th><th>截止</th><th>状态</th></tr></thead><tbody>${rows}</tbody></table></div>`,'<button class="primary" onclick="closeModal()">关闭</button>',true);
}
function openMessages() {
  const body = '<div class="message-list">' + db.messages.map(function (m) { return `<button class="message-row ${m.read?'':'unread'}" onclick="readMessage('${m.id}')"><i></i><span><b>${m.title}</b><small>${m.time} · ${m.read?'已读':'未读'}</small></span></button>`; }).join('') + '</div>';
  openModal('消息中心',body,'<button class="secondary" onclick="markAllRead()">全部已读</button><button class="primary" onclick="closeModal()">关闭</button>');
}
function readMessage(id) { const m=db.messages.find(function(x){return x.id===id;}); m.read=true; closeModal(); render(); openObject(m.objectId); }
function markAllRead() { db.messages.forEach(function(x){x.read=true;}); closeModal(); render(); toast('全部消息已读，顶栏数量已同步'); }

function p0Page() {
  const content = '<div class="batch-summary"><div><span class="eyebrow">分批实施看板</span><h2>第一、二批已进入可操作验收</h2><p>完成以“业务对象—状态—关联—证据”为口径；已实现批次均可进入连续业务画面验收。</p></div><div class="batch-progress"><b>40%</b><span>P0核心场景完成度</span></div></div><div class="later-grid">' +
    batches.map(function (b,i) { return `<article class="batch-tile ${b.status==='已实现'?'implemented':''}"><div><span>${b.no}</span>${badge(b.status)}</div><h2>${b.title}</h2><ul>${b.items.map(function(x){return '<li>'+x+'</li>';}).join('')}</ul>${b.status==='已实现'?'<button class="primary" onclick="go(\''+(i===1?'hr':'home')+'\')">进入本批成果</button>':'<button class="secondary" disabled>待后续建设</button>'}</article>`; }).join('') + '</div>';
  return shell(content,'P0分批建设总览','明确真实完成度、批次边界和下一阶段复用方向。');
}
function laterPage() {
  return shell('<div class="batch-summary"><div><span class="eyebrow">后续建设原则</span><h2>沿用前两批的共享对象与回写标准</h2><p>每条主线至少包含正常流程、异常流程、角色差异、附件版本、操作日志和跨页面回写。</p></div></div><div class="later-grid">' + batches.slice(2).map(function(b){return '<article><span>'+b.no+'</span><h2>'+b.title+'</h2><ul>'+b.items.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></article>';}).join('') + '</div>','后续批次规划','第一、二批母版确认后逐批实施。');
}

function contractResults() {
  const q=state.contractQuery.trim().toLowerCase();
  return db.contracts.filter(function(c){
    const queryOk=!q || [c.id,c.title,c.party,c.owner].join(' ').toLowerCase().includes(q);
    const statusOk=state.contractFilter==='全部状态' || c.status===state.contractFilter;
    return queryOk && statusOk;
  });
}
function contractPage() {
  const results=contractResults(), size=2, pages=Math.max(1,Math.ceil(results.length/size));
  state.contractPage=Math.min(state.contractPage,pages);
  const rows=results.slice((state.contractPage-1)*size,state.contractPage*size);
  const stats=[['全部合同',db.contracts.length,'全部状态'],['AI预审中',db.contracts.filter(function(x){return x.status==='AI预审中';}).length,'AI预审中'],['部门评审中',db.contracts.filter(function(x){return x.status==='部门评审中';}).length,'部门评审中'],['履约中',db.contracts.filter(function(x){return x.status==='履约中';}).length,'履约中']];
  const content=`
    <div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.contractFilter===x[2]?'active':'')+'" onclick="filterContracts(\''+x[2]+'\')"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div>
    <div class="toolbar"><input id="contractQuery" value="${state.contractQuery}" placeholder="合同编号、名称、相对方或责任部门"><select id="contractStatus">${['全部状态','AI预审中','部门评审中','待签署','履约中','已归档'].map(function(x){return '<option '+(state.contractFilter===x?'selected':'')+'>'+x+'</option>';}).join('')}</select><button class="secondary" onclick="applyContractFilter()">查询</button><button class="secondary" onclick="resetContractFilter()">重置</button><span class="spacer"></span><button class="primary" onclick="openContractForm()">+ 发起合同评审</button></div>
    <div class="table-card"><table><colgroup><col class="col-seq"><col class="col-id"><col class="col-title"><col class="col-party"><col class="col-money"><col class="col-owner"><col class="col-risk"><col class="col-status"></colgroup><thead><tr><th>序号</th><th>合同编号</th><th>合同名称</th><th>相对方</th><th>含税金额</th><th>责任部门</th><th>AI风险</th><th>状态</th></tr></thead><tbody>
      ${rows.length?rows.map(function(c,i){return '<tr><td>'+((state.contractPage-1)*size+i+1)+'</td><td><a onclick="showContract(\''+c.id+'\')">'+c.id+'</a></td><td><button class="table-link" onclick="showContract(\''+c.id+'\')">'+c.title+'</button></td><td>'+c.party+'</td><td>'+money(c.amount)+'</td><td>'+c.owner+'</td><td>'+badge(c.risk+'风险')+'</td><td>'+badge(c.status)+'</td></tr>';}).join(''):'<tr><td colspan="8"><div class="empty compact">没有符合条件的合同。</div></td></tr>'}
    </tbody></table><div class="pager"><span>共${results.length}条 · 第${state.contractPage}/${pages}页</span><span class="spacer"></span><button ${state.contractPage===1?'disabled':''} onclick="setContractPage(${state.contractPage-1})">‹ 上一页</button><button ${state.contractPage===pages?'disabled':''} onclick="setContractPage(${state.contractPage+1})">下一页 ›</button></div></div>`;
  return shell(content,'合同管理中心','合同台账、AI条款复核、流程、附件版本及履约计划使用同一业务对象。','<button class="secondary" onclick="showContract(\'HT-202608-029\')">打开重点合同</button>');
}
function filterContracts(value){state.contractFilter=value;state.contractPage=1;render();}
function applyContractFilter(){state.contractQuery=$('#contractQuery').value;state.contractFilter=$('#contractStatus').value;state.contractPage=1;render();}
function resetContractFilter(){state.contractQuery='';state.contractFilter='全部状态';state.contractPage=1;render();}
function setContractPage(page){state.contractPage=page;render();window.scrollTo({top:0,behavior:'smooth'});}
function openContractForm() {if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.create('contractReview');
  const body=`<div class="form-grid"><div class="field full"><label>合同名称 <em>*</em></label><input id="newContractTitle" value="华南区域包装材料补充采购合同"></div><div class="field"><label>合同类型</label><select id="newContractType"><option>采购合同</option><option>服务合同</option></select></div><div class="field"><label>模板标识</label><select id="newContractTemplate"><option>非标准模板</option><option>标准模板</option></select></div><div class="field"><label>相对方 <em>*</em></label><input id="newContractParty" value="成都华源包装有限公司"></div><div class="field"><label>含税金额 <em>*</em></label><input id="newContractAmount" type="number" value="680000"></div><div class="field full"><label>送审附件 <em>*</em></label><div class="upload-box">华南区域包装材料补充采购合同_V0.8.docx<span>已选择 · 2.4MB</span></div></div><div class="field full"><label>动态审批路径</label><div class="readonly-box">采购部发起 → AI辅助审核 → 采购部/财务部会签 → 分管领导审批 → 用印签署</div></div></div>`;
  openModal('发起合同评审',body,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="submitContract()">提交并启动AI预审</button>');
}
function submitContract() {
  const title=$('#newContractTitle').value.trim(),party=$('#newContractParty').value.trim(),amount=Number($('#newContractAmount').value);
  if(!title||!party||!amount){toast('请完整填写合同名称、相对方和金额');return;}
  const c={id:'HT-202608-030',title:title,party:party,amount:amount,owner:'采购部',manager:currentRole().name,type:$('#newContractType').value,template:$('#newContractTemplate').value,status:'AI预审中',risk:'待识别',currentNode:'AI辅助审核',version:'V0.8送审稿',createdAt:'2026-08-20 15:30',clauses:[],workflow:[{name:'业务发起',handler:currentRole().name,status:'已完成',time:'08-20 15:30',opinion:'合同资料已提交'},{name:'AI辅助审核',handler:'审计监督部',status:'处理中',time:'08-20 15:30',opinion:'任务已生成'}],payments:[],files:[{id:'ATT-030',name:'华南区域包装材料补充采购合同_V0.8.docx',category:'送审稿',version:'V0.8',uploader:currentRole().name,time:'2026-08-20 15:30',size:'2.4MB'}],audit:[{time:'2026-08-20 15:30',actor:currentRole().name,action:'发起合同评审',result:'生成合同台账、流程及AI预审任务'}]};
  db.contracts.unshift(c);db.todos.unshift({id:'WF-'+c.id,objectId:c.id,type:'合同AI复核',title:c.title+'—AI预审任务',role:'audit',due:'明日',status:'待处理'});
  closeModal();state.contractFilter='全部状态';state.contractPage=1;render();toast('合同已进入台账，并生成AI预审流程和审计待办');
}

function showContract(id){if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.open('contractReview',id);state.contractId=id;state.page='contractDetail';state.contractTab='overview';const c=contract();if(c.clauses.length)state.clauseId=(c.clauses.find(function(x){return x.decision==='待复核';})||c.clauses[0]).id;render();window.scrollTo({top:0,behavior:'smooth'});}
function setContractTab(tab){state.contractTab=tab;render();}
function contractDetailPage() {
  const c=contract()||db.contracts[0];
  const head=`<button class="back-link" onclick="go('contract')">← 返回合同台账</button><div class="detail-head contract-head"><div class="detail-kicker">${c.type} · ${c.id}</div><h1>${c.title}</h1><div class="detail-meta"><span>相对方：${c.party}</span><span>含税金额：${money(c.amount)}</span><span>责任部门：${c.owner}</span><span>当前节点：${c.currentNode}</span></div><div class="detail-badges">${badge(c.risk+'风险')}${badge(c.status)}<span class="version-chip">${c.version}</span></div></div>`;
  const tabs=[['overview','合同概览'],['ai','AI条款审核'],['workflow','流程轨迹'],['related','关联对象'],['files','附件与版本']];
  let body=contractOverview(c);
  if(state.contractTab==='ai')body=contractAI(c);
  if(state.contractTab==='workflow')body=contractWorkflow(c);
  if(state.contractTab==='related')body=contractRelated(c);
  if(state.contractTab==='files')body=contractFiles(c);
  const tabHtml='<div class="tabs">'+tabs.map(function(x){return '<button class="'+(state.contractTab===x[0]?'active':'')+'" onclick="setContractTab(\''+x[0]+'\')">'+x[1]+(x[0]==='ai'&&c.clauses.length?'<i class="tab-count">'+pendingClauses(c)+'</i>':'')+'</button>';}).join('')+'</div>';
  return shell(head+tabHtml+body,'合同详情','审批、AI复核、附件版本、履约和ERP付款结果保持同一业务主线。',c.clauses.length?'<button class="primary" onclick="setContractTab(\'ai\')">进入AI条款复核</button>':'');
}
function contractOverview(c) {
  const summary=c.clauses.length?`<section class="card"><div class="card-h"><h2>AI审核摘要</h2><button class="link" onclick="setContractTab('ai')">查看条款定位 →</button></div><div class="ai-summary"><div><b>${c.clauses.length}</b><span>识别条款</span></div><div class="danger-text"><b>${c.clauses.filter(function(x){return x.risk==='高';}).length}</b><span>高风险</span></div><div><b>${pendingClauses(c)}</b><span>待人工复核</span></div><div><b>${c.clauses.length-pendingClauses(c)}</b><span>已形成结论</span></div></div></section>`:'<section class="card"><div class="empty">该合同正在等待AI预审返回，完整场景请查看HT-202608-029。</div></section>';
  const plans=c.payments.length?c.payments.map(function(p,i){return '<div class="mini-row"><b>'+(i+1)+'. '+p.phase+'</b><span>'+p.ratio+' · '+money(p.amount)+'</span><span>'+p.date+'</span>'+badge(p.status)+'</div>';}).join(''):'<div class="empty compact">合同签署后自动生成履约及付款计划。</div>';
  return `<div class="split"><section class="card"><div class="card-h"><h2>合同基本信息</h2><span class="meta">业务主表</span></div><div class="info-grid">${info('合同编号',c.id)}${info('合同类型',c.type)}${info('模板标识',c.template)}${info('相对方',c.party)}${info('含税金额',money(c.amount))}${info('合同负责人',c.manager)}${info('责任部门',c.owner)}${info('送审版本',c.version)}${info('创建时间',c.createdAt)}</div></section>${summary}</div><div class="split top-gap"><section class="card"><div class="card-h"><h2>履约与付款计划</h2><span class="meta">ERP结果回写</span></div><div class="mini-table">${plans}</div></section><section class="card"><div class="card-h"><h2>最近操作证据</h2><button class="link" onclick="setContractTab('workflow')">全部轨迹 →</button></div>${auditList(c.audit.slice(0,3))}</section></div>`;
}
function auditList(items){return '<div class="audit-list">'+(items.length?items.map(function(a){return '<div class="audit-row"><time>'+a.time+'</time><span><b>'+a.action+'</b><small>'+a.actor+' · '+a.result+'</small></span></div>';}).join(''):'<div class="empty compact">暂无操作记录。</div>')+'</div>';}

function contractAI(c) {
  if(!c.clauses.length)return '<section class="card"><div class="empty">AI识别任务尚未返回；重点合同HT-202608-029提供完整条款复核。</div></section>';
  const selected=c.clauses.find(function(x){return x.id===state.clauseId;})||c.clauses[0];
  const canReview=['audit','manager'].includes(state.role),complete=pendingClauses(c)===0;
  const clauseNav=c.clauses.map(function(x){return `<button class="clause-item ${x.id===selected.id?'active':''}" onclick="selectClause('${x.id}')"><span>${x.no}</span><b>${x.title}</b><small>${badge(x.risk+'风险')}${badge(x.decision)}</small></button>`;}).join('');
  const actions=canReview?'<div class="decision-actions"><button class="primary" onclick="decideClause(\'accept\')">采纳AI建议</button><button class="secondary" onclick="openModifyClause()">人工修改</button><button class="secondary" onclick="decideClause(\'keep\')">保留原文</button></div>':'<div class="context-tip">当前角色仅查看，审计监督部可形成复核结论。</div>';
  return `
    <div class="ai-workbench">
      <aside class="clause-nav"><div class="panel-title"><h2>识别条款</h2><span>${c.clauses.length}项</span></div>${clauseNav}</aside>
      <section class="clause-document"><div class="panel-title"><div><span class="eyebrow">合同原文定位</span><h2>${selected.no} · ${selected.title}</h2></div>${badge(selected.risk+'风险')}</div><div class="document-block original"><span>当前送审稿</span><p>${selected.text}</p></div><div class="document-block revised"><span>拟修订内容 / 人工结论</span><p>${selected.revised||selected.suggestion}</p></div><div class="version-line"><span>来源版本：${c.version}</span><span>规则版本：RISK-RULE-2026.08.3</span><span>定位：条款语义+合规清单</span></div></section>
      <aside class="review-panel"><div class="panel-title"><h2>AI提示与人工结论</h2></div><div class="review-section"><label>风险说明</label><p>${selected.issue}</p></div><div class="review-section"><label>修改建议</label><p>${selected.suggestion}</p></div><div class="review-section"><label>识别依据</label><p>${selected.basis}</p></div><div class="review-section decision"><label>当前人工结论</label><p>${selected.decision}${selected.reviewer?' · '+selected.reviewer+' '+selected.reviewedAt:''}</p></div>${actions}</aside>
    </div>
    <div class="action-dock"><div><b>人工复核进度 ${c.clauses.length-pendingClauses(c)}/${c.clauses.length}</b><span>${complete?'全部条款已形成结论，可提交部门会签。':'仍有'+pendingClauses(c)+'项待复核。'}</span></div><button class="secondary" onclick="openRuleVersion()">查看规则版本</button><button class="primary" ${!complete||!canReview?'disabled':''} onclick="submitContractReview()">提交AI复核并进入部门会签</button></div>`;
}
function selectClause(id){state.clauseId=id;render();}
function decideClause(type){const c=contract(),x=c.clauses.find(function(y){return y.id===state.clauseId;});if(type==='accept'){x.decision='已采纳';x.revised=x.suggestion;}else{x.decision='保留原文';x.revised='经人工复核保留原条款，并在履约控制中增加专项检查。';}x.reviewer=currentRole().name;x.reviewedAt='2026-08-20 15:36';audit(c,'复核'+x.no,x.decision+'：'+x.title);render();toast('人工结论、审核进度和操作日志已同步');}
function openModifyClause(){const x=contract().clauses.find(function(y){return y.id===state.clauseId;});openModal('人工修改条款 · '+x.no,'<div class="field"><label>修订内容 <em>*</em></label><textarea id="manualClause">'+(x.revised||x.suggestion)+'</textarea></div><div class="context-tip">保存后记录审核人、时间和版本轨迹。</div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="saveManualClause()">保存人工结论</button>');}
function saveManualClause(){const value=$('#manualClause').value.trim();if(!value){toast('请填写修订内容');return;}const c=contract(),x=c.clauses.find(function(y){return y.id===state.clauseId;});x.decision='人工修改';x.revised=value;x.reviewer=currentRole().name;x.reviewedAt='2026-08-20 15:38';audit(c,'人工修改'+x.no,'保存修订内容并形成审核结论');closeModal();render();toast('人工修改已写入合同审核轨迹');}
function submitContractReview(){const c=contract();if(pendingClauses(c)){toast('仍有条款未完成复核');return;}c.status='部门评审中';c.currentNode='部门会签';c.risk='中';c.workflow[1].status='已完成';c.workflow[1].opinion='人工复核完成，形成3项结论';c.workflow[2].status='处理中';c.workflow[2].time='08-20 15:40';c.workflow[2].opinion='采购部、财务部会签中';db.todos=db.todos.filter(function(t){return t.objectId!==c.id;});db.todos.unshift({id:'WF-'+c.id+'-SIGN',objectId:c.id,type:'合同会签',title:c.title+'—部门会签',role:'owner',due:'明日12:00',status:'待处理'});audit(c,'提交AI复核结论','合同进入部门会签并生成业务部门待办');state.contractTab='workflow';render();toast('合同状态、流程节点和待办已同步');}
function openRuleVersion(){openModal('合同风险规则版本','<div class="info-grid">'+info('规则版本','RISK-RULE-2026.08.3')+info('生效日期','2026-08-01')+info('适用合同','采购/服务/框架合同')+info('发布状态','已生效')+info('回测样例','186份合同')+info('人工确认率','88.6%')+'</div><div class="audit-note"><b>版本控制</b><p>历史识别依据与人工结论不会被新版本覆盖。</p></div>');}

function contractWorkflow(c) {
  const flow=c.workflow.length?c.workflow:[{name:'业务发起',handler:c.manager,status:'已完成',time:c.createdAt,opinion:'已提交'},{name:c.currentNode,handler:c.owner,status:'处理中',time:'—',opinion:'当前节点'},{name:'归档',handler:'党政综合办',status:'待办理',time:'—',opinion:'—'}];
  return `<section class="card"><div class="card-h"><h2>合同审批与履约流程</h2><span class="meta">当前节点：${c.currentNode}</span></div><div class="flow detailed">${flow.map(function(n,i){return '<div class="node '+(n.status==='已完成'?'done':n.status==='处理中'?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+n.name+'</p><b>'+n.handler+'</b><span>'+n.status+'</span></div>';}).join('')}</div></section><div class="split top-gap"><section class="card"><div class="card-h"><h2>节点处理记录</h2><span class="meta">WF-${c.id}</span></div><div class="timeline">${flow.map(function(n){return '<div class="time"><span class="when">'+n.time+'</span><i class="circle '+(n.status==='待办理'?'muted':'')+'"></i><div class="event"><b>'+n.name+' · '+n.handler+'</b><span>'+n.opinion+'</span></div></div>';}).join('')}</div></section><section class="card"><div class="card-h"><h2>操作审计日志</h2><span class="meta">${c.audit.length}条</span></div>${auditList(c.audit)}</section></div>`;
}
function contractRelated(c) {
  return `<div class="relation-map"><div class="relation-core"><span>合同主对象</span><b>${c.id}</b><small>${c.title}</small></div><div class="relation-lines"><button onclick="setContractTab('ai')"><span>AI审核</span><b>${c.clauses.length}项识别</b><small>${pendingClauses(c)}项待复核</small></button><button onclick="setContractTab('files')"><span>附件版本</span><b>${c.files.length}份</b><small>${c.version}</small></button><button><span>用印签署</span><b>尚未到达</b><small>关联正式签署版</small></button><button><span>履约付款</span><b>${c.payments.length}个计划</b><small>ERP结果回写</small></button></div></div><section class="card top-gap"><div class="card-h"><h2>跨对象关联清单</h2><span class="meta">可返回对应上下文</span></div><div class="mini-table"><div class="mini-row"><b>采购立项</b><a>CG-LX-202608-014</a><span>已审批</span>${badge('已完成')}</div><div class="mini-row"><b>AI规则版本</b><a onclick="openRuleVersion()">RISK-RULE-2026.08.3</a><span>合同条款审核</span>${badge('已生效')}</div><div class="mini-row"><b>流程实例</b><a onclick="setContractTab('workflow')">WF-${c.id}</a><span>${c.currentNode}</span>${badge(c.status)}</div></div></section>`;
}
function contractFiles(c) {
  const rows=c.files.map(function(f,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="previewFile(\''+f.id+'\')">'+f.name+'</a></td><td>'+f.category+'</td><td>'+f.version+'</td><td>'+f.uploader+'</td><td>'+f.time+'</td><td>'+f.size+'</td><td><button class="link" onclick="previewFile(\''+f.id+'\')">预览</button></td></tr>';}).join('');
  return `<div class="toolbar"><span class="context-label">文件按合同主对象归集，版本和上传人可追溯。</span><span class="spacer"></span><button class="primary" onclick="openUploadFile()">+ 上传新版本</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>文件名称</th><th>分类</th><th>版本</th><th>上传人</th><th>上传时间</th><th>大小</th><th>操作</th></tr></thead><tbody>${rows||'<tr><td colspan="8"><div class="empty compact">暂无附件。</div></td></tr>'}</tbody></table></div>`;
}
function previewFile(id){const f=contract().files.find(function(x){return x.id===id;});openModal('附件预览 · '+f.version,'<div class="file-preview"><div class="file-icon">DOC</div><div><h3>'+f.name+'</h3><p>分类：'+f.category+'　上传人：'+f.uploader+'</p><p>蓝图原型展示文件属性；生产环境提供正文预览、权限、水印和下载审计。</p></div></div>');}
function openUploadFile(){openModal('上传合同新版本','<div class="form-grid"><div class="field"><label>文件分类</label><select id="fileCategory"><option>修订稿</option><option>正式签署版</option></select></div><div class="field"><label>版本号 <em>*</em></label><input id="fileVersion" value="V1.0"></div><div class="field full"><label>文件</label><div class="upload-box">华东区域包装材料年度采购合同_V1.0.docx<span>已选择 · 2.9MB</span></div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="saveContractFile()">上传并归集</button>');}
function saveContractFile(){const c=contract(),v=$('#fileVersion').value.trim();if(!v){toast('请填写版本号');return;}c.files.unshift({id:'ATT-NEW',name:c.title+'_'+v+'.docx',category:$('#fileCategory').value,version:v,uploader:currentRole().name,time:'2026-08-20 15:45',size:'2.9MB'});c.version=v+'修订稿';audit(c,'上传合同新版本',v+'已归集并关联AI复核结论');closeModal();render();toast('附件台账、合同当前版本和日志已同步');}

function trendChart(m) {
  const max=Math.max.apply(null,m.target.concat(m.actual));
  return `<div class="trend-chart">${m.actual.map(function(v,i){const ah=Math.max(16,v/max*100),th=Math.max(16,m.target[i]/max*100);return '<div class="trend-group"><div class="trend-bars"><i class="target" style="height:'+th+'%"></i><i class="actual '+(v<m.target[i]?'low':'')+'" style="height:'+ah+'%"></i></div><b>'+(i+1)+'月</b><span>'+v+(m.unit==='%'?'%':'')+'</span></div>';}).join('')}</div><div class="chart-legend"><span><i class="legend-target"></i>计划</span><span><i class="legend-actual"></i>实际</span></div>`;
}
function starPage() {
  const active=db.problems.filter(function(x){return x.status!=='已关闭';});
  const metricCards=db.metrics.map(function(m){return `<button class="metric-card ${m.state==='预警'?'warning':''}" onclick="showMetric('${m.id}')"><div><span>${m.code}</span>${badge(m.state)}</div><h2>${m.name}</h2><strong>${m.value}</strong><p>目标达成${m.achievement}% · ${m.trend}</p><small>${m.period} · ${m.updatedAt}</small></button>`;}).join('');
  const issueRows=active.slice(0,4).map(function(p){return `<div class="issue-row"><span class="priority ${p.priority}">${p.priority}</span><button onclick="showProblem('${p.id}')"><b>${p.title}</b><small>${p.org} · ${p.owner} · 截止${p.due}</small></button><div class="progress-mini"><i style="width:${p.progress}%"></i></div>${badge(p.status)}</div>`;}).join('');
  const content=`
    <div class="period-bar"><div><span class="eyebrow">公司经营驾驶舱</span><b>数据期间：2026年8月</b><small>批次STAR-BATCH-20260820-01 · 更新于08:30</small></div><div><button class="secondary" onclick="openMeeting()">打开8月经营会快照</button><button class="primary" onclick="showMetric('MET-002')">查看重点异常</button></div></div>
    <div class="metric-grid">${metricCards}</div>
    <div class="split top-gap"><section class="card"><div class="card-h"><h2>产值完成率月度趋势</h2><button class="link" onclick="showMetric('MET-002')">趋势、结构与来源 →</button></div>${trendChart(metric('MET-002'))}</section><section class="card"><div class="card-h"><h2>经营问题闭环</h2><span class="meta">未关闭${active.length}项</span></div><div class="issue-list">${issueRows}</div><div class="card-footer"><button class="secondary" onclick="go('problem')">查看问题台账</button><button class="primary" onclick="openProblemForm('MET-002')">从异常发起问题</button></div></section></div>
    <section class="card top-gap"><div class="card-h"><h2>本期关联链路</h2><span class="meta">指标、问题与OA状态同源</span></div><div class="linkage-strip"><button onclick="showMetric('MET-002')"><span>指标异常</span><b>产值完成率93.8%</b><small>STAR-M-006</small></button><i>→</i><button onclick="showProblem('WT-202608-021')"><span>经营问题</span><b>WT-202608-021</b><small>整改中 · 60%</small></button><i>→</i><button onclick="openTodos()"><span>OA责任待办</span><b>WF-WT-202608-021</b><small>生产管理部</small></button><i>→</i><button onclick="showProblem('WT-202608-021')"><span>结果回写</span><b>措施与复核</b><small>观星台持续跟踪</small></button></div></section>`;
  return shell(content,'观星台经营驾驶舱','经营指标、来源数据、会议问题和OA责任事项保持同一上下文。','<button class="secondary" onclick="go(\'problem\')">问题闭环中心</button>');
}
function openMeeting() {
  openModal('2026年8月经营分析会 · 数据快照',`<div class="context-tip">快照版本STAR-SNAPSHOT-202608-01 · 冻结于2026-08-20 09:00，与实时驾驶舱区分。</div><div class="meeting-grid"><div><label>核心异常</label><b>产值完成率93.8%</b><span>低于计划6.2%</span></div><div><label>责任部门补充</label><b>完成率83%</b><span>2项待补充原因</span></div><div><label>会议责任事项</label><b>3项</b><span>已生成OA问题2项</span></div></div><div class="mini-table"><div class="mini-row"><b>产值完成率偏差</b><span>生产管理部</span><span>设备停机与换版增加</span>${badge('整改中')}</div><div class="mini-row"><b>库存周转天数上升</b><span>供应链管理部</span><span>待补充原因</span>${badge('待反馈')}</div></div>`,'<button class="secondary" onclick="closeModal()">关闭</button><button class="primary" onclick="closeModal();openProblemForm(\'MET-002\')">将异常转为问题</button>',true);
}
function showMetric(id){state.metricId=id;state.page='metric';state.metricTab='analysis';render();window.scrollTo({top:0,behavior:'smooth'});}
function setMetricTab(tab){state.metricTab=tab;render();}
function metricPage() {
  const m=metric()||db.metrics[1];
  const head=`<button class="back-link" onclick="go('star')">← 返回经营驾驶舱</button><div class="detail-head metric-head"><div class="detail-kicker">${m.code} · ${m.version}</div><h1>${m.name} <strong>${m.value}</strong></h1><div class="detail-meta"><span>数据期间：${m.period}</span><span>责任部门：${m.owner}</span><span>目标达成：${m.achievement}%</span><span>更新时间：${m.updatedAt}</span></div><div class="detail-badges">${badge(m.state)}<span class="version-chip">来源可追溯</span></div></div>`;
  const tabs=[['analysis','趋势与结构'],['lineage','指标血缘'],['source','来源明细'],['issues','关联问题']];
  let body=metricAnalysis(m);
  if(state.metricTab==='lineage')body=metricLineage(m);
  if(state.metricTab==='source')body=metricSource(m);
  if(state.metricTab==='issues')body=metricIssues(m);
  const tabHtml='<div class="tabs">'+tabs.map(function(x){return '<button class="'+(state.metricTab===x[0]?'active':'')+'" onclick="setMetricTab(\''+x[0]+'\')">'+x[1]+(x[0]==='issues'?'<i class="tab-count">'+metricProblems(m.id).length+'</i>':'')+'</button>';}).join('')+'</div>';
  return shell(head+tabHtml+body,'指标下钻分析','从指标趋势进入组织结构、来源明细、血缘影响及责任问题。','<button class="primary" onclick="openProblemForm(\''+m.id+'\')">从当前异常发起问题</button>');
}
function metricAnalysis(m) {
  const rankings=m.ranking.length?m.ranking.map(function(r,i){return '<div class="ranking-row"><span>'+(i+1)+'</span><b>'+r.name+'</b><strong>'+r.value+'</strong>'+badge(r.state)+'<button class="link" onclick="setMetricTab(\'source\')">来源明细</button></div>';}).join(''):'<div class="empty compact">当前指标未配置组织排行演示数据。</div>';
  return `<div class="split"><section class="card"><div class="card-h"><h2>8个月趋势</h2><span class="meta">实际 vs 计划</span></div>${trendChart(m)}</section><section class="card"><div class="card-h"><h2>指标口径</h2><button class="link" onclick="setMetricTab('lineage')">查看来源与影响 →</button></div><div class="definition-box"><label>业务定义</label><p>${m.definition}</p><div>${info('指标版本',m.version)}${info('统计周期','月度')}${info('责任部门',m.owner)}${info('数据状态','已对账')}</div></div></section></div><section class="card top-gap"><div class="card-h"><h2>组织排行与异常定位</h2><span class="meta">来源明细核验业务记录</span></div><div class="ranking-list">${rankings}</div></section>`;
}
function metricLineage(m) {
  const types=['源系统','源表','源字段','主题模型','指标','下游应用'];
  return `<section class="card"><div class="card-h"><h2>指标血缘与影响分析</h2><span class="meta">来源系统 → 字段 → 主题加工 → 指标 → 使用场景</span></div><div class="lineage-canvas">${m.lineage.map(function(n,i){return '<div class="lineage-node n'+i+'"><span>'+types[i]+'</span><b>'+n+'</b><small>'+(i<4?'批次STAR-BATCH-20260820-01':i===4?m.version+' · 已生效':'3个下游引用')+'</small></div>'+(i<m.lineage.length-1?'<i class="lineage-arrow">→</i>':'');}).join('')}</div></section><div class="split top-gap"><section class="card"><div class="card-h"><h2>计算与同步过程</h2><span class="meta">数据采集动作流</span></div><div class="timeline"><div class="time"><span class="when">08:00</span><i class="circle"></i><div class="event"><b>MES增量采集</b><span>批次3,286条，业务键和时间戳校验通过。</span></div></div><div class="time"><span class="when">08:12</span><i class="circle"></i><div class="event"><b>质量校验与主题加工</b><span>完整性99.8%，3条异常进入质量问题池。</span></div></div><div class="time"><span class="when">08:30</span><i class="circle"></i><div class="event"><b>指标发布</b><span>产值完成率93.8%，触发预警并更新驾驶舱。</span></div></div></div></section><section class="card"><div class="card-h"><h2>下游影响对象</h2><span class="meta">变更前需确认</span></div><div class="impact-list"><button onclick="go('star')"><b>公司经营驾驶舱</b><span>指标卡、趋势图、预警</span></button><button onclick="openMeeting()"><b>2026年8月经营分析会</b><span>会议快照、异常说明</span></button><button onclick="setMetricTab('issues')"><b>经营问题闭环</b><span>${metricProblems(m.id).length}个关联问题</span></button></div></section></div>`;
}
function metricSource(m) {
  const rows=m.sourceRows.map(function(r,i){return '<tr><td>'+(i+1)+'</td><td><a>'+r.id+'</a></td><td>'+r.org+'</td><td>'+r.date+'</td><td>'+r.plan+'</td><td>'+r.actual+'</td><td class="danger-text">'+r.deviation+'</td><td>'+badge(r.quality)+'</td></tr>';}).join('');
  return `<div class="context-tip"><b>当前下钻上下文：</b>${m.name} / ${m.period} / 偏差记录 / 已授权MES来源明细。</div><div class="table-card"><table><thead><tr><th>序号</th><th>源记录编号</th><th>组织</th><th>业务日期</th><th>计划产值</th><th>实际产值</th><th>偏差</th><th>对账状态</th></tr></thead><tbody>${rows||'<tr><td colspan="8"><div class="empty compact">当前指标无来源明细演示数据。</div></td></tr>'}</tbody></table></div>`;
}
function metricIssues(m) {
  const issues=metricProblems(m.id);
  return `<div class="toolbar"><span class="context-label">问题发起时自动带入指标、组织、期间、来源快照和异常明细。</span><span class="spacer"></span><button class="primary" onclick="openProblemForm('${m.id}')">+ 问题快发</button></div><div class="issue-ledger">${issues.length?issues.map(function(p){return '<article><div><span class="priority '+p.priority+'">'+p.priority+'</span><b>'+p.id+'</b>'+badge(p.status)+'</div><button onclick="showProblem(\''+p.id+'\')">'+p.title+'</button><p>'+p.org+' · '+p.owner+' · 截止'+p.due+'</p><div class="progress-line"><i style="width:'+p.progress+'%"></i></div><small>整改进度 '+p.progress+'%</small></article>';}).join(''):'<div class="empty">当前指标暂无关联问题。</div>'}</div>`;
}
function openProblemForm(metricId) {
  const m=metric(metricId)||db.metrics[1];
  const body=`<div class="source-context"><span>来源指标</span><b>${m.code} · ${m.name}</b><strong>${m.value}</strong><small>${m.period} · ${m.version} · ${m.updatedAt}</small></div><div class="form-grid"><div class="field full"><label>问题名称 <em>*</em></label><input id="newProblemTitle" value="${m.period}${m.name}异常跟踪"></div><div class="field"><label>责任部门</label><select id="newProblemOrg"><option>生产管理部</option><option>供应链管理部</option><option>财务部</option></select></div><div class="field"><label>责任人 <em>*</em></label><input id="newProblemOwner" value="刘强"></div><div class="field"><label>优先级</label><select id="newProblemPriority"><option>高</option><option>中</option><option>低</option></select></div><div class="field"><label>完成时间 <em>*</em></label><input id="newProblemDue" type="date" value="2026-08-27"></div><div class="field full"><label>异常说明</label><textarea>当前${m.name}为${m.value}，目标达成${m.achievement}%，需责任部门补充原因和整改措施。</textarea></div><div class="field full"><label>自动生成内容</label><div class="readonly-box">观星台问题台账 + OA责任待办 + 动作流提醒 + 来源快照关联</div></div></div>`;
  openModal('问题快发 · 自动带入指标上下文',body,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="submitProblem(\''+m.id+'\')">提交并生成OA责任事项</button>');
}
function submitProblem(metricId) {
  const title=$('#newProblemTitle').value.trim(),owner=$('#newProblemOwner').value.trim(),due=$('#newProblemDue').value;
  if(!title||!owner||!due){toast('请完整填写问题名称、责任人和完成时间');return;}
  let seq=22;while(db.problems.some(function(x){return x.id==='WT-202608-'+String(seq).padStart(3,'0');}))seq++;
  const id='WT-202608-'+String(seq).padStart(3,'0'),m=metric(metricId);
  const p={id:id,title:title,metricId:metricId,source:'指标下钻分析',sourceRef:'STAR-'+metricId+'-202608',org:$('#newProblemOrg').value,owner:owner,collaborators:'经营发展部',priority:$('#newProblemPriority').value,due:due,status:'待反馈',progress:0,reason:'',measure:'',result:'',createdAt:'2026-08-20 15:50',files:[],audit:[{time:'2026-08-20 15:50',actor:currentRole().name,action:'从指标异常发起问题',result:'带入'+m.name+'、'+m.period+'和来源快照'},{time:'2026-08-20 15:50',actor:'系统动作流',action:'生成OA责任待办',result:'任务WF-'+id+'已发送给'+owner}]};
  db.problems.unshift(p);db.todos.unshift({id:'WF-'+id,objectId:id,type:'问题整改',title:title+'—提交原因和措施',role:'owner',due:due,status:'待处理'});db.messages.unshift({id:'MSG-'+id,title:'新问题'+id+'已生成OA责任待办',time:'15:50',read:false,objectId:id});
  closeModal();showProblem(id);toast('问题、OA待办、消息和来源关联已同步生成');
}

function problemResults() {
  const q=state.problemQuery.trim().toLowerCase();
  return db.problems.filter(function(p){return (!q||[p.id,p.title,p.org,p.owner].join(' ').toLowerCase().includes(q))&&(state.problemFilter==='全部状态'||p.status===state.problemFilter);});
}
function problemPage() {
  const results=problemResults(),size=2,pages=Math.max(1,Math.ceil(results.length/size));
  state.problemPage=Math.min(state.problemPage,pages);
  const rows=results.slice((state.problemPage-1)*size,state.problemPage*size);
  const content=`
    <div class="stat-row"><button class="stat" onclick="filterProblems('全部状态')"><b>${db.problems.length}</b><span>问题总数</span></button><button class="stat" onclick="filterProblems('待反馈')"><b>${db.problems.filter(function(x){return x.status==='待反馈';}).length}</b><span>待反馈</span></button><button class="stat" onclick="filterProblems('待复核')"><b>${db.problems.filter(function(x){return x.status==='待复核';}).length}</b><span>待复核</span></button><button class="stat" onclick="filterProblems('已关闭')"><b>${db.problems.filter(function(x){return x.status==='已关闭';}).length}</b><span>已关闭</span></button></div>
    <div class="toolbar"><input id="problemQuery" value="${state.problemQuery}" placeholder="问题编号、名称、责任部门或责任人"><select id="problemStatus">${['全部状态','待反馈','整改中','待复核','已关闭'].map(function(x){return '<option '+(state.problemFilter===x?'selected':'')+'>'+x+'</option>';}).join('')}</select><button class="secondary" onclick="applyProblemFilter()">查询</button><button class="secondary" onclick="resetProblemFilter()">重置</button><span class="spacer"></span><button class="primary" onclick="openProblemForm('MET-002')">+ 问题快发</button></div>
    <div class="table-card"><table><thead><tr><th>序号</th><th>问题编号</th><th>问题名称</th><th>来源指标</th><th>责任部门/责任人</th><th>截止时间</th><th>进度</th><th>状态</th></tr></thead><tbody>${rows.length?rows.map(function(p,i){const m=metric(p.metricId);return '<tr><td>'+((state.problemPage-1)*size+i+1)+'</td><td><a onclick="showProblem(\''+p.id+'\')">'+p.id+'</a></td><td><button class="table-link" onclick="showProblem(\''+p.id+'\')">'+p.title+'</button></td><td><a onclick="showMetric(\''+p.metricId+'\')">'+(m?m.name:'其他来源')+'</a></td><td>'+p.org+' / '+p.owner+'</td><td>'+p.due+'</td><td><div class="progress-cell"><i style="width:'+p.progress+'%"></i><span>'+p.progress+'%</span></div></td><td>'+badge(p.status)+'</td></tr>';}).join(''):'<tr><td colspan="8"><div class="empty compact">没有符合条件的问题。</div></td></tr>'}</tbody></table><div class="pager"><span>共${results.length}条 · 第${state.problemPage}/${pages}页</span><span class="spacer"></span><button ${state.problemPage===1?'disabled':''} onclick="setProblemPage(${state.problemPage-1})">‹ 上一页</button><button ${state.problemPage===pages?'disabled':''} onclick="setProblemPage(${state.problemPage+1})">下一页 ›</button></div></div>`;
  return shell(content,'经营问题闭环中心','问题与指标上下文、OA待办、措施附件、提醒升级和复核结论保持同源。','<button class="secondary" onclick="showProblem(\'WT-202608-021\')">打开重点问题</button>');
}
function filterProblems(value){state.problemFilter=value;state.problemPage=1;render();}
function applyProblemFilter(){state.problemQuery=$('#problemQuery').value;state.problemFilter=$('#problemStatus').value;state.problemPage=1;render();}
function resetProblemFilter(){state.problemQuery='';state.problemFilter='全部状态';state.problemPage=1;render();}
function setProblemPage(page){state.problemPage=page;render();window.scrollTo({top:0,behavior:'smooth'});}
function showProblem(id){state.problemId=id;state.page='problemDetail';state.problemTab='context';render();window.scrollTo({top:0,behavior:'smooth'});}
function setProblemTab(tab){state.problemTab=tab;render();}
function problemActions(p) {
  if(p.status==='已关闭')return '<button class="secondary" onclick="reopenProblem()">重新打开</button>';
  if(['待反馈','整改中'].includes(p.status))return ['owner','manager'].includes(state.role)?'<button class="primary" onclick="openFeedback()">提交整改反馈</button>':'<button class="secondary" disabled>仅责任部门可提交整改反馈</button>';
  if(p.status==='待复核')return ['audit','manager'].includes(state.role)?'<button class="primary" onclick="openCloseProblem()">复核并关闭</button>':'<button class="secondary" disabled>仅审计监督部可复核关闭</button>';
  return '';
}
function problemDetailPage() {
  const p=problem()||db.problems[0],m=metric(p.metricId);
  const head=`<button class="back-link" onclick="go('problem')">← 返回问题台账</button><div class="detail-head problem-head"><div class="detail-kicker">${p.source} · ${p.id}</div><h1>${p.title}</h1><div class="detail-meta"><span>责任部门：${p.org}</span><span>责任人：${p.owner}</span><span>要求完成：${p.due}</span><span>来源指标：${m?m.name:'其他'}</span></div><div class="detail-badges">${badge(p.priority+'优先级')}${badge(p.status)}<span class="version-chip">整改进度${p.progress}%</span></div></div>`;
  const tabs=[['context','问题与来源'],['measure','原因与措施'],['workflow','OA流程轨迹'],['evidence','附件与审计']];
  let body=problemContext(p,m);
  if(state.problemTab==='measure')body=problemMeasure(p);
  if(state.problemTab==='workflow')body=problemWorkflow(p);
  if(state.problemTab==='evidence')body=problemEvidence(p);
  const tabHtml='<div class="tabs">'+tabs.map(function(x){return '<button class="'+(state.problemTab===x[0]?'active':'')+'" onclick="setProblemTab(\''+x[0]+'\')">'+x[1]+'</button>';}).join('')+'</div>';
  return shell(head+tabHtml+body,'问题详情','来源快照、责任待办、措施反馈、附件与复核结果全过程可追溯。',problemActions(p));
}
function problemContext(p,m) {
  return `<div class="split"><section class="card"><div class="card-h"><h2>来源上下文</h2><button class="link" onclick="showMetric('${p.metricId}')">返回指标下钻 →</button></div><div class="source-snapshot"><div><span>来源指标</span><b>${m?m.code+' · '+m.name:'其他来源'}</b><strong>${m?m.value:'—'}</strong></div><div><span>数据期间</span><b>${m?m.period:'—'}</b><small>${p.sourceRef}</small></div><div><span>指标版本</span><b>${m?m.version:'—'}</b><small>${m?m.updatedAt:''}</small></div></div><div class="context-tip">问题发起时已冻结以上上下文；实时指标变化不会覆盖问题创建依据。</div></section><section class="card"><div class="card-h"><h2>责任与时限</h2><span class="meta">OA责任事项</span></div><div class="info-grid">${info('责任部门',p.org)}${info('责任人',p.owner)}${info('协同人/部门',p.collaborators)}${info('要求完成',p.due)}${info('优先级',p.priority)}${info('当前状态',p.status)}</div><div class="progress-panel"><div><b>整改进度</b><span>${p.progress}%</span></div><i><em style="width:${p.progress}%"></em></i></div></section></div><section class="card top-gap"><div class="card-h"><h2>跨系统联动</h2><span class="meta">观星台 → OA → 观星台</span></div><div class="linkage-strip compact-strip"><button onclick="showMetric('${p.metricId}')"><span>观星台异常</span><b>${m?m.name:p.source}</b><small>${p.sourceRef}</small></button><i>→</i><button onclick="setProblemTab('workflow')"><span>OA责任待办</span><b>WF-${p.id}</b><small>${p.org} / ${p.owner}</small></button><i>→</i><button onclick="setProblemTab('measure')"><span>整改反馈</span><b>${p.measure||'等待提交措施'}</b><small>进度${p.progress}%</small></button><i>→</i><button onclick="setProblemTab('evidence')"><span>复核与回写</span><b>${p.status}</b><small>审计日志${p.audit.length}条</small></button></div></section>`;
}
function problemMeasure(p) {
  return `<div class="split"><section class="card"><div class="card-h"><h2>原因分析</h2><span class="meta">责任部门反馈</span></div><div class="narrative-box ${p.reason?'':'empty-value'}">${p.reason||'尚未提交原因分析。'}</div></section><section class="card"><div class="card-h"><h2>纠正与改进措施</h2><span class="meta">最新反馈</span></div><div class="narrative-box ${p.measure?'':'empty-value'}">${p.measure||'尚未提交整改措施。'}</div></section></div><section class="card top-gap"><div class="card-h"><h2>预期/实际结果</h2><span class="meta">复核关闭依据</span></div><div class="narrative-box ${p.result?'':'empty-value'}">${p.result||'等待责任部门补充结果数据。'}</div><div class="card-footer">${problemActions(p)}</div></section>`;
}
function problemWorkflow(p) {
  const nodes=[{name:'问题发起',actor:'经营发展部',status:'已完成'},{name:'责任分派',actor:p.org,status:'已完成'},{name:'原因与措施',actor:p.owner,status:['待反馈','整改中'].includes(p.status)?'处理中':'已完成'},{name:'复核关闭',actor:'审计监督部',status:p.status==='待复核'?'处理中':p.status==='已关闭'?'已完成':'待办理'},{name:'观星台回写',actor:'系统动作流',status:p.status==='已关闭'?'已完成':'待办理'}];
  return `<section class="card"><div class="card-h"><h2>OA问题闭环流程</h2><span class="meta">WF-${p.id}</span></div><div class="flow detailed">${nodes.map(function(n,i){return '<div class="node '+(n.status==='已完成'?'done':n.status==='处理中'?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+n.name+'</p><b>'+n.actor+'</b><span>'+n.status+'</span></div>';}).join('')}</div></section><div class="split top-gap"><section class="card"><div class="card-h"><h2>动作流执行结果</h2><button class="link" onclick="openActionLog('${p.id}')">查看原始入参与输出 →</button></div><div class="mini-table"><div class="mini-row"><b>AF-${p.id}-01</b><span>问题创建后生成OA待办</span><span>1.2s</span>${badge('已完成')}</div><div class="mini-row"><b>AF-${p.id}-02</b><span>超期提醒与升级</span><span>每日08:30</span>${badge(p.status==='已关闭'?'已完成':'待办理')}</div><div class="mini-row"><b>AF-${p.id}-03</b><span>关闭后回写观星台</span><span>事件触发</span>${badge(p.status==='已关闭'?'已完成':'待办理')}</div></div></section><section class="card"><div class="card-h"><h2>当前可执行动作</h2><span class="meta">${currentRole().label}</span></div><div class="action-card"><p>当前状态：${badge(p.status)}</p><p>${p.status==='待复核'?'核验措施、结果和附件后关闭或退回。':'责任部门补充原因、措施、进度和结果附件。'}</p>${problemActions(p)}</div></section></div>`;
}
function openActionLog(id) {
  openModal('动作流实例日志 · '+id,`<div class="log-grid"><div><label>实例编号</label><b>AF-${id}-01</b></div><div><label>执行版本</label><b>PROBLEM-FLOW-V1.3</b></div><div><label>触发方式</label><b>问题表单提交后</b></div><div><label>执行状态</label><b>成功 · 1.2s</b></div></div><div class="code-block"><b>触发入参</b><pre>{ "problemId": "${id}", "source": "STAR", "action": "CREATE_OA_TODO" }</pre></div><div class="code-block"><b>组件输出</b><pre>{ "todoId": "WF-${id}", "writeback": true, "retryCount": 0 }</pre></div><div class="context-tip">失败实例应保留原始请求/响应、失败组件和补偿入口；本实例执行成功。</div>`,'',true);
}
function problemEvidence(p) {
  const files=p.files.length?p.files.map(function(f){return '<button><span class="file-type">XLS</span><b>'+f.name+'</b><small>'+f.uploader+' · '+f.time+'</small></button>';}).join(''):'<div class="empty compact">暂无附件，提交整改反馈时可补充佐证。</div>';
  return `<div class="split"><section class="card"><div class="card-h"><h2>措施附件</h2><span class="meta">${p.files.length}份</span></div><div class="file-list">${files}</div></section><section class="card"><div class="card-h"><h2>操作审计</h2><span class="meta">${p.audit.length}条</span></div>${auditList(p.audit)}</section></div>`;
}
function openFeedback() {
  const p=problem();
  const body=`<div class="form-grid"><div class="field full"><label>原因分析 <em>*</em></label><textarea id="feedbackReason">${p.reason||'后加工车间关键设备停机与订单频繁换版，影响有效生产时长。'}</textarea></div><div class="field full"><label>整改措施 <em>*</em></label><textarea id="feedbackMeasure">${p.measure||'调整订单排产，完成关键设备专项点检，并每日跟踪追回产值。'}</textarea></div><div class="field"><label>当前进度 <em>*</em></label><input id="feedbackProgress" type="number" min="0" max="100" value="${Math.max(p.progress,100)}"></div><div class="field"><label>预计/实际结果</label><input id="feedbackResult" value="${p.result||'预计完成率提升至96%以上。'}"></div><div class="field full"><label>佐证附件</label><div class="upload-box">设备点检与产值追回记录.xlsx<span>已选择 · 860KB</span></div></div></div>`;
  openModal('提交整改反馈 · '+p.id,body,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="submitFeedback()">提交并进入复核</button>');
}
function submitFeedback() {
  const reason=$('#feedbackReason').value.trim(),measure=$('#feedbackMeasure').value.trim(),progress=Number($('#feedbackProgress').value);
  if(!reason||!measure||progress<0||progress>100){toast('请填写原因、措施，并输入0至100的进度');return;}
  const p=problem();p.reason=reason;p.measure=measure;p.progress=progress;p.result=$('#feedbackResult').value.trim();p.status=progress>=100?'待复核':'整改中';p.files.unshift({name:'设备点检与产值追回记录.xlsx',uploader:currentRole().name,time:'2026-08-20 16:05'});
  db.todos=db.todos.filter(function(t){return t.objectId!==p.id;});db.todos.unshift({id:'WF-'+p.id+'-REVIEW',objectId:p.id,type:'问题复核',title:p.title+'—复核整改结果',role:'audit',due:'明日12:00',status:'待处理'});audit(p,'提交整改反馈','进度更新为'+progress+'%，上传佐证附件');closeModal();state.problemTab='workflow';render();toast('措施、附件、OA待办和流程节点已同步');
}
function openCloseProblem(){const p=problem();openModal('复核关闭 · '+p.id,'<div class="review-checks"><label><input type="checkbox" checked> 已核验原因和整改措施</label><label><input type="checkbox" checked> 已核验结果数据与佐证附件</label><label><input type="checkbox" checked> 同意回写观星台并关闭问题</label></div><div class="field"><label>复核意见 <em>*</em></label><textarea id="closeOpinion">整改措施有效，结果数据与佐证完整，同意关闭并回写观星台。</textarea></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="closeProblem()">确认关闭并回写</button>');}
function closeProblem(){const opinion=$('#closeOpinion').value.trim();if(!opinion){toast('请填写复核意见');return;}const p=problem();p.status='已关闭';p.progress=100;db.todos=db.todos.filter(function(t){return t.objectId!==p.id;});audit(p,'复核关闭并回写观星台',opinion);db.messages.unshift({id:'MSG-CLOSE-'+p.id,title:'问题'+p.id+'已关闭并回写观星台',time:'16:12',read:false,objectId:p.id});closeModal();state.problemTab='evidence';render();toast('问题已关闭，OA待办、观星台统计和消息已同步');}
function reopenProblem(){const p=problem();p.status='待反馈';p.progress=80;db.todos.unshift({id:'WF-'+p.id+'-REOPEN',objectId:p.id,type:'问题重新整改',title:p.title+'—补充整改',role:'owner',due:p.due,status:'待处理'});audit(p,'重新打开问题','要求责任部门补充整改');render();toast('问题已重新打开并生成责任部门待办');}

function hrPage() {
  const pendingOnboarding=db.onboardings.filter(function(x){return x.status!=='已完成';});
  const pendingLeave=db.leaves.filter(function(x){return x.status==='待审批';});
  const expiring=db.employees.reduce(function(n,e){return n+e.qualifications.filter(function(q){return q.status==='临期';}).length;},0);
  const failedTasks=db.onboardings.reduce(function(n,o){return n+o.tasks.filter(function(t){return t.status==='失败待补偿';}).length;},0);
  const content=`
    <div class="role-banner hr-banner"><div><span class="eyebrow">员工全生命周期</span><h2>从录用确认到在职服务的一体化协同</h2><p>所有画面围绕员工编号共享入职、合同、假勤、培训、资格与操作轨迹。</p></div><div class="session-note">当前会话支持真实状态回写，刷新后恢复演示基线</div></div>
    <div class="kpis">
      <button class="kpi" onclick="go('employee')"><span class="label">在册及预入职员工</span><strong class="val">${db.employees.length}</strong><span class="hint">在职${db.employees.filter(function(x){return x.status==='在职';}).length}人 · 入职办理中${pendingOnboarding.length}人</span></button>
      <button class="kpi alert" onclick="showOnboarding('ONB-202608-006')"><span class="label">入职异常待补偿</span><strong class="val">${failedTasks}</strong><span class="hint">账号开通异常，可查看错误与重试轨迹</span></button>
      <button class="kpi warning" onclick="go('leave')"><span class="label">请假待审批</span><strong class="val">${pendingLeave.length}</strong><span class="hint">含余额、排班和培训冲突校验</span></button>
      <button class="kpi warning" onclick="go('qualification')"><span class="label">60天内资格到期</span><strong class="val">${expiring}</strong><span class="hint">关联员工、岗位与续期动作</span></button>
    </div>
    <div class="hr-journey">
      <button onclick="go('onboarding')"><span>01 · 录用确认</span><b>生成员工预档案</b><small>EMP-2026-026</small></button><i>→</i>
      <button class="current" onclick="showOnboarding('ONB-202608-006')"><span>02 · 跨部门协同</span><b>6项入职任务</b><small>1项失败待补偿</small></button><i>→</i>
      <button onclick="showEmployee('EMP-2026-026')"><span>03 · 员工360</span><b>来源轨迹汇总</b><small>招聘、合同、培训、资格</small></button><i>→</i>
      <button onclick="showLeave('LV-202608-042')"><span>04 · 在职服务</span><b>请假审批回写</b><small>余额8天 → 审批后5天</small></button><i>→</i>
      <button onclick="go('qualification')"><span>05 · 任职保障</span><b>资格到期预警</b><small>到人、到岗、到证书</small></button>
    </div>
    <div class="split top-gap">
      <section class="card"><div class="card-h"><h2>入职协同进度</h2><button class="link" onclick="go('onboarding')">全部入职单 →</button></div>
        <div class="case-list">${db.onboardings.map(function(o){const done=o.tasks.filter(function(t){return t.status==='已完成';}).length, pct=Math.round(done/o.tasks.length*100);return '<button onclick="showOnboarding(\''+o.id+'\')"><span class="person-avatar">'+o.employee.slice(0,1)+'</span><span><b>'+o.employee+' · '+o.position+'</b><small>'+o.id+' · '+o.org+' · 入职'+o.hireDate+'</small><i class="progress-line"><em style="width:'+pct+'%"></em></i></span><strong>'+pct+'%</strong>'+badge(o.status)+'</button>';}).join('')}</div>
      </section>
      <section class="card"><div class="card-h"><h2>今日人事联动</h2><span class="meta">按员工对象归集</span></div><div class="timeline">
        <div class="time"><span class="when">10:35</span><i class="circle"></i><div class="event"><b>李明提交3天年休假</b><span>余额与冲突校验通过，已生成审批待办</span></div></div>
        <div class="time"><span class="when">09:28</span><i class="circle"></i><div class="event"><b>张薇账号开通进入补偿队列</b><span>保留接口错误码E102和原始执行参数</span></div></div>
        <div class="time"><span class="when">08:05</span><i class="circle"></i><div class="event"><b>员工组织岗位同步完成</b><span>HR主数据同步4人，变更0人，失败0人</span></div></div>
      </div></section>
    </div>`;
  return shell(content,'人力资源工作台','通过同一员工主数据呈现入职、档案、假勤与岗位资格的关联联动。','<button class="secondary" onclick="setRole(\'hr\')">切换人力资源视角</button><button class="primary" onclick="openLeaveForm()">+ 发起请假</button>');
}

function onboardingProgress(o) { return Math.round(o.tasks.filter(function(t){return t.status==='已完成';}).length/o.tasks.length*100); }
function setOnboardingFilter(value){state.onboardingFilter=value;render();}
function onboardingPage() {
  const results=db.onboardings.filter(function(o){return state.onboardingFilter==='全部状态'||o.status===state.onboardingFilter;});
  const failed=db.onboardings.reduce(function(n,o){return n+o.tasks.filter(function(t){return t.status==='失败待补偿';}).length;},0);
  const stats=[['全部入职单',db.onboardings.length,'全部状态'],['办理中',db.onboardings.filter(function(x){return x.status==='办理中';}).length,'办理中'],['已完成',db.onboardings.filter(function(x){return x.status==='已完成';}).length,'已完成'],['失败任务',failed,'办理中']];
  const rows=results.map(function(o,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="showOnboarding(\''+o.id+'\')">'+o.id+'</a></td><td><button class="table-link" onclick="showEmployee(\''+o.employeeId+'\')">'+o.employee+'</button></td><td>'+o.org+'</td><td>'+o.position+'</td><td>'+o.hireDate+'</td><td><div class="progress-cell"><i style="width:'+onboardingProgress(o)+'%"></i><span>'+onboardingProgress(o)+'%</span></div></td><td>'+badge(o.status)+'</td><td>'+badge(o.risk)+'</td></tr>';}).join('');
  const content=`<div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.onboardingFilter===x[2]?'active':'')+'" onclick="setOnboardingFilter(\''+x[2]+'\')"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div>
    <div class="toolbar"><span class="context-label">口径：录用确认后生成且未撤销的入职协同单</span><span class="spacer"></span><button class="secondary" onclick="showOnboarding('ONB-202608-006')">查看异常任务</button><button class="primary" onclick="openOnboardingForm()">+ 发起入职协同</button></div>
    <div class="table-card"><table><thead><tr><th>序号</th><th>协同单号</th><th>员工</th><th>入职部门</th><th>岗位</th><th>入职日期</th><th>任务进度</th><th>状态</th><th>异常</th></tr></thead><tbody>${rows||'<tr><td colspan="9"><div class="empty compact">当前状态暂无入职单。</div></td></tr>'}</tbody></table><div class="pager"><span>共${results.length}条 · 数据与员工预档案同源</span></div></div>`;
  return shell(content,'入职协同','从录用确认生成预档案、跨部门任务、失败补偿与在职状态回写。','<button class="secondary" onclick="go(\'hr\')">返回人力工作台</button>');
}
function openOnboardingForm(){
  openModal('发起入职协同',`<div class="context-tip">演示发起将创建员工预档案，并按岗位规则自动生成资料、账号、门禁、物资、培训和合同任务。</div><div class="form-grid"><div class="field"><label><em>*</em> 姓名</label><input id="onbName" value="赵宁"></div><div class="field"><label><em>*</em> 入职日期</label><input value="2026-09-01"></div><div class="field"><label>部门</label><select><option>质量管理部</option></select></div><div class="field"><label>岗位</label><select><option>质量检验员</option></select></div><div class="field full"><label>岗位资格预检</label><div class="readonly-box">需完成：质量检验岗位培训；无特种作业证前置要求</div></div></div>`,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createOnboarding()">确认并生成任务</button>');
}
function createOnboarding(){
  const name=$('#onbName').value.trim();if(!name){toast('请填写员工姓名');return;}
  const empId='EMP-2026-027', id='ONB-202609-001';
  db.employees.unshift({id:empId,name:name,gender:'—',mobile:'待补充',org:'质量管理部',position:'质量检验员',level:'待定级',status:'入职办理中',hireDate:'2026-09-01',manager:'质量部负责人',location:'生产园区',contractNo:'待生成',contractEnd:'—',annualBalance:0,source:'招聘录用单',avatar:name.slice(0,1),qualifications:[{id:'QF-NEW-001',name:'质量检验岗位资格',category:'岗位任职',issued:'—',expires:'—',status:'待培训',source:'入职任务'}],attendance:[],audit:[]});
  db.onboardings.unshift({id:id,employeeId:empId,employee:name,org:'质量管理部',position:'质量检验员',hireDate:'2026-09-01',coordinator:currentRole().name,status:'办理中',risk:'无',createdAt:'2026-08-20 16:20',tasks:['资料与身份核验','OA及ERP账号开通','门禁卡与员工工牌','劳保物资领用','质量检验岗位培训','劳动合同签署'].map(function(n,i){return{id:'ONB-NEW-0'+(i+1),name:n,owner:i===0||i===5?'人力资源部':'责任协同部门',due:'09-01',status:'待办理',result:'等待办理',source:'岗位任务模板'};}),audit:[]});
  closeModal();showOnboarding(id);toast('员工预档案、6项入职任务和协同单已同步生成');
}
function showOnboarding(id){state.onboardingId=id;state.page='onboardingDetail';state.onboardingTab='tasks';render();window.scrollTo({top:0,behavior:'smooth'});}
function setOnboardingTab(tab){state.onboardingTab=tab;render();}
function onboardingDetailPage(){
  const o=onboarding(), e=employee(o.employeeId), pct=onboardingProgress(o);
  const tabs=[['tasks','任务协同'],['source','员工预档案'],['audit','执行与补偿日志']];
  let body='';
  if(state.onboardingTab==='tasks') body=`<div class="onboarding-board">${o.tasks.map(function(t,i){const actionable=['待办理','处理中'].includes(t.status)&&['hr','manager'].includes(state.role);const retry=t.status==='失败待补偿'&&['hr','manager'].includes(state.role);return '<article class="task-card '+(t.status==='失败待补偿'?'failed':'')+'"><div class="task-seq">'+String(i+1).padStart(2,'0')+'</div><div><span>'+t.source+'</span><h3>'+t.name+'</h3><p>'+t.result+'</p><small>责任人：'+t.owner+' · 截止：'+t.due+'</small></div><div class="task-action">'+badge(t.status)+(retry?'<button class="danger" onclick="retryOnboardingTask(\''+t.id+'\')">查看错误并重试</button>':actionable?'<button class="secondary" onclick="completeOnboardingTask(\''+t.id+'\')">办理完成</button>':'')+'</div></article>';}).join('')}</div>`;
  if(state.onboardingTab==='source') body=`<div class="split"><section class="card"><div class="card-h"><h2>员工预档案</h2><button class="link" onclick="showEmployee('${e.id}')">打开员工360 →</button></div><div class="info-grid">${info('员工编号',e.id)}${info('姓名',e.name)}${info('状态',badge(e.status))}${info('入职部门',e.org)}${info('岗位',e.position)}${info('入职日期',e.hireDate)}${info('直属上级',e.manager)}${info('合同编号',e.contractNo)}${info('数据来源',e.source)}</div></section><section class="card"><div class="card-h"><h2>岗位规则命中</h2></div><div class="action-card"><b>设备操作员入职模板 V2.3</b><p>自动生成6项任务；其中安全与上岗培训完成后，将岗位资格写回员工档案。</p><div class="review-checks"><label>✓ 已命中生产岗位劳保物资规则</label><label>✓ 已命中生产园区门禁规则</label><label>✓ 已命中设备上岗培训规则</label></div></div></section></div>`;
  if(state.onboardingTab==='audit') body=`<div class="split"><section class="card"><div class="card-h"><h2>执行轨迹</h2><span class="meta">原始事件不可覆盖</span></div><div class="audit-list">${o.audit.map(function(a){return '<div class="audit-row"><time>'+a.time+'</time><div><b>'+a.actor+' · '+a.action+'</b><small>'+a.result+'</small></div></div>';}).join('')}</div></section><section class="card"><div class="card-h"><h2>动作流诊断</h2>${badge(o.risk)}</div><div class="log-grid"><div><label>动作流</label><b>AF-ONB-02 账号开通</b></div><div><label>最近运行</label><b>RUN-20260820-0928</b></div><div><label>错误码</label><b>E102</b></div><div><label>补偿策略</label><b>修复组织编码后幂等重试</b></div></div><div class="code-block"><b>可见错误上下文</b><pre>employee=EMP-2026-026\norgCode=JM-PROD\nERP response: organization mapping not found</pre></div></section></div>`;
  const content=`<button class="back-link" onclick="go('onboarding')">← 返回入职协同</button><div class="detail-head hr-detail"><span class="detail-kicker">入职协同单 · ${o.id}</span><h1>${o.employee} · ${o.position}</h1><div class="detail-meta"><span>${o.org}</span><span>入职日期 ${o.hireDate}</span><span>协调人 ${o.coordinator}</span><span>员工编号 ${o.employeeId}</span></div><div class="detail-badges">${badge(o.status)}${badge(o.risk)}</div></div><div class="progress-overview"><div><b>整体完成 ${pct}%</b><span>${o.tasks.filter(function(t){return t.status==='已完成';}).length}/${o.tasks.length}项已完成</span></div><i><em style="width:${pct}%"></em></i><small>完成全部任务后，员工状态自动由“入职办理中”转为“在职”。</small></div><div class="tabs">${tabs.map(function(t){return '<button class="'+(state.onboardingTab===t[0]?'active':'')+'" onclick="setOnboardingTab(\''+t[0]+'\')">'+t[1]+'</button>';}).join('')}</div>${body}`;
  return shell(content,'入职协同详情','任务状态、动作流异常、员工预档案及补偿轨迹共用同一入职单。');
}
function refreshOnboardingState(o){
  const failed=o.tasks.filter(function(t){return t.status==='失败待补偿';}).length;
  o.risk=failed?'账号开通失败':'无';
  if(o.tasks.every(function(t){return t.status==='已完成';})){
    o.status='已完成';const e=employee(o.employeeId);e.status='在职';if(e.contractNo==='待生成')e.contractNo='LD-2026-'+e.id.slice(-3);audit(e,'完成入职协同','员工状态转为在职，合同与资格结果归入360档案');
  }
}
function retryOnboardingTask(id){
  const o=onboarding(),t=o.tasks.find(function(x){return x.id===id;});
  openModal('失败任务补偿',`<div class="context-tip">原始失败日志将保留；本次补偿按员工编号进行幂等校验，避免重复创建账号。</div><div class="log-grid"><div><label>错误码</label><b>E102</b></div><div><label>失败原因</label><b>ERP组织映射缺失</b></div><div><label>修复结果</label><b>JM-PROD映射已补齐</b></div><div><label>重试策略</label><b>从失败节点继续</b></div></div>`,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="confirmRetryOnboarding(\''+id+'\')">执行补偿重试</button>');
}
function confirmRetryOnboarding(id){
  const o=onboarding(),t=o.tasks.find(function(x){return x.id===id;});t.status='已完成';t.result='补偿重试成功，OA与ERP账号已创建并关联员工编号';audit(o,'补偿重试'+t.name,'保留原错误码E102，本次运行RUN-20260820-1632成功');db.todos=db.todos.filter(function(x){return x.objectId!==o.id;});db.messages.unshift({id:'MSG-ONB-OK',title:o.employee+'账号开通补偿成功',time:'16:32',read:false,objectId:o.id});refreshOnboardingState(o);closeModal();render();toast('任务状态、异常数量、待办和补偿日志已同步');
}
function completeOnboardingTask(id){
  const o=onboarding(),t=o.tasks.find(function(x){return x.id===id;});t.status='已完成';t.result=t.name.indexOf('培训')>=0?'培训考核通过，岗位资格已写入员工档案':'责任部门已确认完成并提交办理结果';audit(o,'完成入职任务',t.name+'已办结');
  if(t.name.indexOf('培训')>=0){const q=employee(o.employeeId).qualifications[0];q.status='有效';q.issued='2026-08-25';q.expires='2027-08-24';q.source='入职培训任务 '+t.id;}
  refreshOnboardingState(o);render();toast('任务进度、员工档案及关联资格已同步');
}

function visibleEmployees(){return state.role==='employee'?db.employees.filter(function(e){return e.id==='EMP-2026-018';}):db.employees;}
function employeeResults(){const q=state.employeeQuery.trim().toLowerCase();return visibleEmployees().filter(function(e){return(!q||[e.id,e.name,e.org,e.position].join(' ').toLowerCase().includes(q))&&(state.employeeFilter==='全部状态'||e.status===state.employeeFilter);});}
function applyEmployeeFilter(){state.employeeQuery=$('#employeeQuery').value;state.employeeFilter=$('#employeeStatus').value;state.employeePage=1;render();}
function resetEmployeeFilter(){state.employeeQuery='';state.employeeFilter='全部状态';state.employeePage=1;render();}
function setEmployeePage(p){state.employeePage=p;render();}
function employeePage(){
  const results=employeeResults(),size=3,pages=Math.max(1,Math.ceil(results.length/size));state.employeePage=Math.min(state.employeePage,pages);const rows=results.slice((state.employeePage-1)*size,state.employeePage*size);
  const content=`<div class="stat-row"><button class="stat active"><b>${visibleEmployees().length}</b><span>当前权限可见员工</span></button><button class="stat"><b>${visibleEmployees().filter(function(e){return e.status==='在职';}).length}</b><span>在职</span></button><button class="stat"><b>${visibleEmployees().filter(function(e){return e.status==='入职办理中';}).length}</b><span>入职办理中</span></button><button class="stat"><b>${visibleEmployees().reduce(function(n,e){return n+e.qualifications.filter(function(q){return q.status==='临期';}).length;},0)}</b><span>资格临期</span></button></div><div class="toolbar"><input id="employeeQuery" value="${state.employeeQuery}" placeholder="员工编号、姓名、部门或岗位"><select id="employeeStatus">${['全部状态','在职','入职办理中'].map(function(x){return '<option '+(state.employeeFilter===x?'selected':'')+'>'+x+'</option>';}).join('')}</select><button class="secondary" onclick="applyEmployeeFilter()">查询</button><button class="secondary" onclick="resetEmployeeFilter()">重置</button><span class="spacer"></span><span class="context-label">${state.role==='employee'?'仅显示本人档案':'按人事数据权限显示'}</span></div><div class="table-card"><table><thead><tr><th>序号</th><th>员工编号</th><th>姓名</th><th>组织</th><th>岗位</th><th>入职日期</th><th>直属上级</th><th>资格状态</th><th>员工状态</th></tr></thead><tbody>${rows.map(function(e,i){const qs=e.qualifications.some(function(q){return q.status==='临期';})?'临期':e.qualifications.some(function(q){return q.status==='待培训';})?'待培训':'有效';return '<tr><td>'+((state.employeePage-1)*size+i+1)+'</td><td><a onclick="showEmployee(\''+e.id+'\')">'+e.id+'</a></td><td><button class="table-link" onclick="showEmployee(\''+e.id+'\')">'+e.name+'</button></td><td>'+e.org+'</td><td>'+e.position+'</td><td>'+e.hireDate+'</td><td>'+e.manager+'</td><td>'+badge(qs)+'</td><td>'+badge(e.status)+'</td></tr>';}).join('')||'<tr><td colspan="9"><div class="empty compact">没有符合条件的员工。</div></td></tr>'}</tbody></table><div class="pager"><span>共${results.length}条 · 第${state.employeePage}/${pages}页</span><span class="spacer"></span><button ${state.employeePage===1?'disabled':''} onclick="setEmployeePage(${state.employeePage-1})">‹ 上一页</button><button ${state.employeePage===pages?'disabled':''} onclick="setEmployeePage(${state.employeePage+1})">下一页 ›</button></div></div>`;
  return shell(content,'员工360档案','个人主数据、入职、合同、假勤、培训资格与来源轨迹按员工编号汇总。');
}
function showEmployee(id){if(state.role==='employee'&&id!=='EMP-2026-018'){toast('员工本人仅可查看自己的档案');return;}state.employeeId=id;state.page='employeeDetail';state.employeeTab='overview';render();window.scrollTo({top:0,behavior:'smooth'});}
function setEmployeeTab(tab){state.employeeTab=tab;render();}
function employeeDetailPage(){
  const e=employee(), leaves=db.leaves.filter(function(l){return l.employeeId===e.id;}), onb=db.onboardings.find(function(o){return o.employeeId===e.id;});
  const tabs=[['overview','档案总览'],['employment','任职与合同'],['attendance','假勤记录'],['qualification','培训与资格'],['source','来源与变更轨迹']];
  let body='';
  if(state.employeeTab==='overview') body=`<div class="split"><section class="card"><div class="card-h"><h2>基本信息</h2><span class="meta">敏感字段已脱敏</span></div><div class="info-grid">${info('员工编号',e.id)}${info('姓名',e.name)}${info('性别',e.gender)}${info('手机',e.mobile)}${info('所属组织',e.org)}${info('岗位',e.position)}${info('职级',e.level)}${info('直属上级',e.manager)}${info('工作地点',e.location)}</div></section><section class="card"><div class="card-h"><h2>在职服务概览</h2></div><div class="profile-metrics"><button onclick="setEmployeeTab('attendance')"><b>${e.annualBalance}天</b><span>年休假可用余额</span></button><button onclick="setEmployeeTab('qualification')"><b>${e.qualifications.length}</b><span>岗位资格</span></button><button onclick="setEmployeeTab('attendance')"><b>${leaves.length}</b><span>请假申请</span></button><button onclick="${onb?"showOnboarding(\'"+onb.id+"\')":'void(0)'}"><b>${onb?onboardingProgress(onb):'—'}%</b><span>入职协同完成度</span></button></div></section></div>`;
  if(state.employeeTab==='employment') body=`<div class="split"><section class="card"><div class="card-h"><h2>任职信息</h2></div><div class="info-grid">${info('员工状态',badge(e.status))}${info('入职日期',e.hireDate)}${info('所属组织',e.org)}${info('岗位',e.position)}${info('职级',e.level)}${info('直属上级',e.manager)}</div></section><section class="card"><div class="card-h"><h2>劳动合同</h2></div><div class="info-grid">${info('合同编号',e.contractNo)}${info('合同类型','固定期限劳动合同')}${info('合同到期日',e.contractEnd)}${info('签署方式',e.contractNo==='待生成'?'待入职日电子签署':'电子签署')}${info('合同状态',e.contractNo==='待生成'?badge('待办理'):badge('已生效'))}${info('归档来源','电子合同平台')}</div></section></div>`;
  if(state.employeeTab==='attendance') body=`<div class="split"><section class="card"><div class="card-h"><h2>假期余额</h2><button class="primary" onclick="openLeaveForm('${e.id}')">发起请假</button></div><div class="balance-panel"><strong>${e.annualBalance}</strong><span>天 · 年休假可用</span><small>审批通过后即时扣减；撤销或驳回自动返还。</small></div><div class="mini-table">${leaves.map(function(l){return '<div class="mini-row"><a onclick="showLeave(\''+l.id+'\')">'+l.id+'</a><span>'+l.type+' '+l.days+'天</span><span>'+l.start.slice(0,10)+'</span>'+badge(l.status)+'</div>';}).join('')||'<div class="empty compact">暂无请假记录。</div>'}</div></section><section class="card"><div class="card-h"><h2>最近考勤结果</h2><span class="meta">考勤机 / OA单据融合</span></div><div class="mini-table">${e.attendance.map(function(a){return '<div class="mini-row"><b>'+a.date+'</b><span>'+a.shift+'</span><span>'+a.source+'</span>'+badge(a.result)+'</div>';}).join('')||'<div class="empty compact">入职后生成考勤记录。</div>'}</div></section></div>`;
  if(state.employeeTab==='qualification') body=`<section class="card"><div class="card-h"><h2>岗位资格与培训结果</h2><button class="link" onclick="go('qualification')">进入资格中心 →</button></div><div class="qualification-list">${e.qualifications.map(function(q){return '<article><div class="qual-icon">证</div><div><span>'+q.category+'</span><h3>'+q.name+'</h3><p>发证/生效：'+q.issued+' · 到期：'+q.expires+'</p><small>来源：'+q.source+'</small></div>'+badge(q.status)+'</article>';}).join('')}</div></section>`;
  if(state.employeeTab==='source') body=`<div class="split"><section class="card"><div class="card-h"><h2>字段来源</h2><span class="meta">可追到系统与业务单据</span></div><div class="source-chain"><div><b>招聘录用单</b><span>姓名、入职部门、岗位、入职日期</span></div><i>→</i><div><b>HR主数据</b><span>员工编号、组织岗位、任职状态</span></div><i>→</i><div><b>业务单据</b><span>合同、假勤、培训、岗位资格</span></div></div></section><section class="card"><div class="card-h"><h2>变更轨迹</h2><span class="meta">保留修改前后值</span></div><div class="audit-list">${(e.audit||[]).map(function(a){return '<div class="audit-row"><time>'+a.time+'</time><div><b>'+a.actor+' · '+a.action+'</b><small>'+a.result+'</small></div></div>';}).join('')||'<div class="empty compact">暂无变更记录。</div>'}</div></section></div>`;
  const content=`<button class="back-link" onclick="go('employee')">← 返回员工档案</button><div class="employee-hero"><div class="employee-avatar">${e.avatar}</div><div><span>${e.id} · ${e.source}</span><h1>${e.name}</h1><p>${e.org} / ${e.position} / ${e.level}</p></div><div class="employee-state">${badge(e.status)}<small>入职 ${e.hireDate}</small></div></div><div class="tabs">${tabs.map(function(t){return '<button class="'+(state.employeeTab===t[0]?'active':'')+'" onclick="setEmployeeTab(\''+t[0]+'\')">'+t[1]+'</button>';}).join('')}</div>${body}`;
  return shell(content,'员工360档案详情','同一员工编号下完整呈现个人信息、任职关系、业务记录与来源轨迹。');
}

function visibleLeaves(){return state.role==='employee'?db.leaves.filter(function(l){return l.employeeId==='EMP-2026-018';}):db.leaves;}
function leavePage(){
  const list=visibleLeaves();
  const content=`<div class="stat-row"><button class="stat active"><b>${list.length}</b><span>当前可见申请</span></button><button class="stat"><b>${list.filter(function(l){return l.status==='待审批';}).length}</b><span>待审批</span></button><button class="stat"><b>${list.filter(function(l){return l.status==='冲突待调整';}).length}</b><span>冲突待调整</span></button><button class="stat"><b>${list.reduce(function(n,l){return n+(l.status==='已通过'?l.days:0);},0)}</b><span>本期已通过天数</span></button></div><div class="toolbar"><span class="context-label">提交校验：余额 → 排班 → 培训/会议冲突 → 动态审批路径</span><span class="spacer"></span><button class="primary" onclick="openLeaveForm()">+ 发起请假</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>申请单号</th><th>申请人</th><th>部门</th><th>假别</th><th>起止时间</th><th>天数</th><th>冲突校验</th><th>当前节点</th><th>状态</th></tr></thead><tbody>${list.map(function(l,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="showLeave(\''+l.id+'\')">'+l.id+'</a></td><td><button class="table-link" onclick="showEmployee(\''+l.employeeId+'\')">'+l.employee+'</button></td><td>'+l.org+'</td><td>'+l.type+'</td><td>'+l.start.slice(5,16)+' 至 '+l.end.slice(5,16)+'</td><td>'+l.days+'</td><td>'+badge(l.conflict)+'</td><td>'+l.currentNode+'</td><td>'+badge(l.status)+'</td></tr>';}).join('')}</tbody></table><div class="pager"><span>共${list.length}条 · 审批结果与员工余额、考勤记录同源</span></div></div>`;
  return shell(content,'请假与考勤','请假申请完成余额、排班和业务冲突校验，审批后回写员工档案与考勤结果。');
}
function openLeaveForm(employeeId){
  const e=employee(employeeId||(state.role==='employee'?'EMP-2026-018':'EMP-2026-018'));
  openModal('发起请假申请',`<div class="form-grid"><div class="field"><label>申请人</label><div class="readonly-box">${e.name} · ${e.id} · ${e.org}</div></div><div class="field"><label>当前年休假余额</label><div class="readonly-box"><b>${e.annualBalance}天</b></div></div><div class="field"><label><em>*</em> 假别</label><select id="leaveType"><option>年休假</option><option>事假</option><option>调休</option></select></div><div class="field"><label><em>*</em> 请假天数</label><input id="leaveDays" type="number" min="0.5" step="0.5" value="1"></div><div class="field"><label>开始日期</label><input id="leaveStart" type="date" value="2026-08-28"></div><div class="field"><label>结束日期</label><input type="date" value="2026-08-28"></div><div class="field full"><label><em>*</em> 请假事由</label><textarea id="leaveReason">个人事务</textarea></div><div class="field full"><label>提交前联动校验</label><div class="validation-stack"><span class="ok">✓ 余额充足：${e.annualBalance}天可用</span><span class="ok">✓ 排班正常：行政班</span><span class="ok">✓ 无培训、会议和入职任务冲突</span><span>审批路径：部门负责人 → 人力资源备案 → 考勤回写</span></div></div></div>`,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="submitLeave(\''+e.id+'\')">提交申请</button>');
}
function submitLeave(employeeId){
  const e=employee(employeeId),days=Number($('#leaveDays').value),reason=$('#leaveReason').value.trim();if(!days||days<=0||!reason){toast('请完整填写请假天数和事由');return;}if($('#leaveType').value==='年休假'&&days>e.annualBalance){toast('年休假余额不足，请调整天数');return;}
  const id='LV-202608-045';db.leaves.unshift({id:id,employeeId:e.id,employee:e.name,org:e.org,type:$('#leaveType').value,start:$('#leaveStart').value+' 08:30',end:$('#leaveStart').value+' 17:30',days:days,reason:reason,status:'待审批',currentNode:'部门负责人审批',balanceBefore:e.annualBalance,balanceAfter:e.annualBalance-days,conflict:'校验通过',approver:e.manager,createdAt:'2026-08-20 16:40',workflow:[{name:'员工提交',handler:e.name,status:'已完成',opinion:'已提交'},{name:'部门负责人审批',handler:e.manager,status:'处理中',opinion:'待审批'},{name:'人力资源备案',handler:'吴欣',status:'待办理',opinion:'—'},{name:'考勤结果回写',handler:'系统动作流',status:'待办理',opinion:'—'}],audit:[{time:'2026-08-20 16:40',actor:currentRole().name,action:'提交请假申请',result:'余额、排班与业务冲突校验通过'}]});db.todos.unshift({id:'WF-'+id,objectId:id,type:'请假审批',title:e.name+'—'+days+'天'+$('#leaveType').value+'申请',role:'hr',due:'明日12:00',status:'待处理'});closeModal();showLeave(id);toast('请假单、审批待办和员工关联记录已同步生成');
}
function showLeave(id){state.leaveId=id;state.page='leaveDetail';state.leaveTab='form';render();window.scrollTo({top:0,behavior:'smooth'});}
function setLeaveTab(tab){state.leaveTab=tab;render();}
function leaveDetailPage(){
  const l=leave(),e=employee(l.employeeId),tabs=[['form','申请信息'],['workflow','审批流程'],['writeback','余额与考勤回写'],['audit','操作轨迹']];let body='';
  if(state.leaveTab==='form') body=`<div class="split"><section class="card"><div class="card-h"><h2>请假信息</h2>${badge(l.status)}</div><div class="info-grid">${info('申请人',l.employee+' · '+e.id)}${info('所属部门',l.org)}${info('假别',l.type)}${info('开始时间',l.start)}${info('结束时间',l.end)}${info('请假天数',l.days+'天')}${info('请假事由',l.reason)}${info('提交时间',l.createdAt)}${info('当前节点',l.currentNode)}</div></section><section class="card"><div class="card-h"><h2>提交校验结果</h2></div><div class="validation-stack standalone"><span class="ok">✓ 假期余额：审批前${l.balanceBefore}天，审批后${l.balanceAfter}天</span><span class="${l.conflict==='校验通过'?'ok':'error'}">${l.conflict==='校验通过'?'✓':'!'} ${l.conflict}</span><span class="ok">✓ 排班校验：无跨班次异常</span><span>审批路径：部门负责人 → 人力资源备案 → 考勤回写</span></div></section></div>`;
  if(state.leaveTab==='workflow') body=l.workflow.length?`<section class="card"><div class="flow">${l.workflow.map(function(w,i){return '<div class="node '+(w.status==='已完成'?'done':w.status==='处理中'?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+w.name+'</p><b>'+w.handler+'</b><span>'+w.status+'</span></div>';}).join('')}</div><div class="timeline">${l.workflow.map(function(w){return '<div class="time"><span class="when">'+w.status+'</span><i class="circle '+(w.status==='待办理'?'muted':'')+'"></i><div class="event"><b>'+w.name+' · '+w.handler+'</b><span>'+w.opinion+'</span></div></div>';}).join('')}</div></section>`:'<div class="empty">当前申请未进入流程。</div>';
  if(state.leaveTab==='writeback') body=`<div class="relation-map leave-map"><div class="relation-core"><span>请假申请</span><b>${l.id}</b><small>${l.employee} · ${l.type}${l.days}天 · ${l.status}</small></div><div class="relation-lines"><button onclick="showEmployee('${e.id}')"><span>员工360档案</span><b>余额 ${e.annualBalance}天</b><small>审批通过后由${l.balanceBefore}天扣减至${l.balanceAfter}天</small></button><button onclick="showEmployee('${e.id}');setEmployeeTab('attendance')"><span>考勤日结果</span><b>${l.status==='已通过'?'请假已写入':'等待审批完成'}</b><small>来源保留OA请假单${l.id}</small></button><button><span>统一待办</span><b>${db.todos.some(function(t){return t.objectId===l.id;})?'审批待办有效':'审批待办已办结'}</b><small>对象状态变化后自动同步</small></button><button><span>审计轨迹</span><b>${l.audit.length}条业务事件</b><small>保留申请、审批与回写结果</small></button></div></div>`;
  if(state.leaveTab==='audit') body=`<section class="card"><div class="card-h"><h2>请假业务轨迹</h2><span class="meta">审批与回写均留痕</span></div><div class="audit-list">${l.audit.map(function(a){return '<div class="audit-row"><time>'+a.time+'</time><div><b>'+a.actor+' · '+a.action+'</b><small>'+a.result+'</small></div></div>';}).join('')}</div></section>`;
  const canApprove=l.status==='待审批'&&['hr','manager','operations'].includes(state.role);
  const content=`<button class="back-link" onclick="go('leave')">← 返回请假与考勤</button><div class="detail-head leave-head"><span class="detail-kicker">请假申请 · ${l.id}</span><h1>${l.employee} · ${l.type} ${l.days}天</h1><div class="detail-meta"><span>${l.org}</span><span>${l.start} 至 ${l.end}</span><span>审批人 ${l.approver}</span></div><div class="detail-badges">${badge(l.conflict)}${badge(l.status)}</div></div><div class="tabs">${tabs.map(function(t){return '<button class="'+(state.leaveTab===t[0]?'active':'')+'" onclick="setLeaveTab(\''+t[0]+'\')">'+t[1]+'</button>';}).join('')}</div>${body}${l.status==='待审批'?'<div class="action-dock"><div><b>当前节点：'+l.currentNode+'</b><span>'+(canApprove?'当前角色可执行审批，结果将同步余额、考勤和待办。':'请切换“人力资源部 / 经营发展部 / 公司管理层”角色处理。')+'</span></div><button class="secondary" '+(canApprove?'':'disabled')+' onclick="rejectLeave()">退回调整</button><button class="primary" '+(canApprove?'':'disabled')+' onclick="approveLeave()">同意并完成备案</button></div>':''}`;
  return shell(content,'请假申请详情','审批过程、假期余额、考勤结果和统一待办实时联动。');
}
function approveLeave(){
  const l=leave(),e=employee(l.employeeId);l.status='已通过';l.currentNode='已归档';e.annualBalance=l.balanceAfter;e.attendance.unshift({date:l.start.slice(0,10),shift:'行政班',result:l.type,source:'OA请假单 '+l.id});if(l.workflow.length)l.workflow.forEach(function(w){w.status='已完成';w.opinion=w.name==='部门负责人审批'?'同意请假':w.name==='人力资源备案'?'余额与制度校验完成':w.name==='考勤结果回写'?'已写入考勤日结果':w.opinion;});audit(l,'审批通过并完成备案','余额'+l.balanceBefore+'天→'+l.balanceAfter+'天，考勤结果已写入');audit(e,'请假审批结果回写',l.id+'通过，年休假余额更新为'+e.annualBalance+'天');db.todos=db.todos.filter(function(t){return t.objectId!==l.id;});db.messages.unshift({id:'MSG-LV-OK-'+l.id,title:l.employee+'的'+l.type+'申请已通过并回写考勤',time:'16:48',read:false,objectId:l.id});state.leaveTab='writeback';render();toast('审批状态、余额、考勤、待办和员工档案已同步');
}
function rejectLeave(){const l=leave();l.status='冲突待调整';l.currentNode='申请人调整';l.conflict='审批人要求补充工作交接';audit(l,'退回调整','需补充工作交接后重新提交');db.todos=db.todos.filter(function(t){return t.objectId!==l.id;});render();toast('申请已退回，未扣减余额且未写入考勤');}

function qualificationRows(){
  const rows=[];visibleEmployees().forEach(function(e){e.qualifications.forEach(function(q){rows.push({employee:e,q:q});});});return rows.filter(function(x){return state.qualificationFilter==='全部状态'||x.q.status===state.qualificationFilter;});
}
function setQualificationFilter(v){state.qualificationFilter=v;render();}
function qualificationPage(){
  const rows=qualificationRows(),all=[];visibleEmployees().forEach(function(e){e.qualifications.forEach(function(q){all.push({employee:e,q:q});});});
  const content=`<div class="stat-row"><button class="stat ${state.qualificationFilter==='全部状态'?'active':''}" onclick="setQualificationFilter('全部状态')"><b>${all.length}</b><span>全部岗位资格</span></button><button class="stat ${state.qualificationFilter==='有效'?'active':''}" onclick="setQualificationFilter('有效')"><b>${all.filter(function(x){return x.q.status==='有效';}).length}</b><span>有效</span></button><button class="stat ${state.qualificationFilter==='临期'?'active':''}" onclick="setQualificationFilter('临期')"><b>${all.filter(function(x){return x.q.status==='临期';}).length}</b><span>60天内到期</span></button><button class="stat ${state.qualificationFilter==='待培训'?'active':''}" onclick="setQualificationFilter('待培训')"><b>${all.filter(function(x){return x.q.status==='待培训';}).length}</b><span>待培训取证</span></button></div><div class="qualification-layout"><aside class="card qual-rules"><div class="card-h"><h2>岗位资格规则</h2></div><button class="active"><b>特种作业岗位</b><span>证书有效方可排班</span></button><button><b>生产操作岗位</b><span>入职培训后生效</span></button><button><b>信息安全岗位</b><span>每年复训一次</span></button><div class="audit-note">规则命中后，可在入职、调岗和排班前进行资格预检。</div></aside><section><div class="context-tip">资格临期预警已定位到员工、岗位和证书；续期后员工360和本页状态同步更新。</div><div class="table-card"><table><thead><tr><th>序号</th><th>资格编号</th><th>员工</th><th>部门 / 岗位</th><th>资格名称</th><th>类别</th><th>生效日期</th><th>到期日期</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td>'+x.q.id+'</td><td><a onclick="showEmployee(\''+x.employee.id+'\')">'+x.employee.name+'</a></td><td>'+x.employee.org+' / '+x.employee.position+'</td><td>'+x.q.name+'</td><td>'+x.q.category+'</td><td>'+x.q.issued+'</td><td>'+x.q.expires+'</td><td>'+badge(x.q.status)+'</td><td>'+(x.q.status==='临期'?'<button class="link" onclick="renewQualification(\''+x.employee.id+'\',\''+x.q.id+'\')">办理续期</button>':'<button class="link" onclick="showEmployee(\''+x.employee.id+'\');setEmployeeTab(\'qualification\')">查看档案</button>')+'</td></tr>';}).join('')||'<tr><td colspan="10"><div class="empty compact">当前状态暂无资格记录。</div></td></tr>'}</tbody></table><div class="pager"><span>共${rows.length}条 · 统计与当前筛选结果同步</span></div></div></section></div>`;
  return shell(content,'岗位资格中心','按岗位规则管理任职资格、到期预警、培训取证与员工档案回写。');
}
function renewQualification(employeeId,qid){
  if(!['hr','manager'].includes(state.role)){toast('请切换人力资源部或公司管理层角色办理续期');return;}
  const e=employee(employeeId),q=e.qualifications.find(function(x){return x.id===qid;});openModal('办理资格续期',`<div class="form-grid"><div class="field"><label>员工</label><div class="readonly-box">${e.name} · ${e.org} · ${e.position}</div></div><div class="field"><label>资格</label><div class="readonly-box">${q.name}</div></div><div class="field"><label>原到期日期</label><div class="readonly-box">${q.expires}</div></div><div class="field"><label>新到期日期</label><input id="qualNewDate" type="date" value="2027-09-30"></div><div class="field full"><label>续期依据</label><div class="upload-box">复训合格证明_2026.pdf<span>已上传 · 1.2MB · 当前会话可见</span></div></div></div>`,'<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="confirmRenewQualification(\''+employeeId+'\',\''+qid+'\')">确认续期</button>');
}
function confirmRenewQualification(employeeId,qid){const e=employee(employeeId),q=e.qualifications.find(function(x){return x.id===qid;}),old=q.expires;q.expires=$('#qualNewDate').value;q.status='有效';q.source='复训续期单 TR-202608-018';audit(e,'岗位资格续期',q.name+'到期日 '+old+' → '+q.expires);closeModal();render();toast('资格状态、到期预警和员工360档案已同步');}

/* ===== V1.0 P0 重构：新增四条端到端主线与统一追溯 ===== */
state.adminFilter = '全部状态';
state.riskFilter = '全部状态';
state.serviceFilter = '全部状态';
state.qualityFilter = '全部状态';
state.navOpen = 'workbench';

db.adminDocs = [
  {id:'DOC-202608-018', title:'关于开展印刷包装旺季生产保障专项督办的通知', type:'收文', source:'集团OA来文', owner:'党政综合办 / 何静', status:'办理中', deadline:'2026-08-26', meetingId:'MTG-202608-012', tasks:[{id:'SUP-202608-031',name:'提交生产保障方案',owner:'生产管理部 / 刘强',due:'08-22 17:00',status:'处理中'},{id:'SUP-202608-032',name:'核验物资储备情况',owner:'供应链管理部 / 杨林',due:'08-23 17:00',status:'待办理'}], files:[{name:'集团专项督办通知.pdf',version:'V1.0',time:'2026-08-20 09:10'}],audit:[{time:'2026-08-20 09:12',actor:'何静',action:'收文登记',result:'已分办至生产管理部、供应链管理部'}]},
  {id:'DOC-202608-016', title:'8月经营分析会会议纪要', type:'纪要', source:'经营分析会', owner:'经营发展部 / 周敏', status:'待销号', deadline:'2026-08-25', meetingId:'MTG-202608-011', tasks:[{id:'SUP-202608-027',name:'关闭产值完成率整改问题',owner:'生产管理部 / 刘强',due:'08-25 12:00',status:'处理中'}],files:[{name:'8月经营分析会会议纪要_V1.0.docx',version:'V1.0',time:'2026-08-20 15:20'}],audit:[]},
  {id:'DOC-202608-011', title:'办公区消防安全专项检查通报', type:'发文', source:'党政综合办', owner:'安全环保部 / 周勇', status:'已归档', deadline:'2026-08-18', meetingId:'—', tasks:[],files:[{name:'消防安全专项检查通报.pdf',version:'V1.0',time:'2026-08-18 17:00'}],audit:[]}
];
db.risks = [
  {id:'RSK-202608-014', title:'包装材料供应商交付波动风险', sourceA:'人工季度风险上报', sourceB:'AI采购舆情采集批次 BATCH-0820', relation:'命中同一供应商与交付主题', level:'高', owner:'采购部 / 赵倩', status:'待核实', measure:'', files:[],audit:[{time:'2026-08-20 10:20',actor:'AI风险识别',action:'完成去重候选匹配',result:'与人工风险 RSK-M-019 相似度 92%'}]},
  {id:'RSK-202608-012', title:'关键模切设备停机影响交付风险', sourceA:'人工重大风险报告', sourceB:'AI设备告警采集批次 BATCH-0819', relation:'已合并', level:'高', owner:'生产管理部 / 刘强', status:'整改中', measure:'已安排专项点检与备件采购，关联问题WT-202608-021。', files:[{name:'关键设备风险处置单.xlsx',time:'2026-08-20 14:20'}],audit:[]},
  {id:'RSK-202608-009', title:'信息系统变更窗口冲突风险', sourceA:'变更评审记录', sourceB:'AI发布日志识别', relation:'已核实', level:'中', owner:'信息工程部 / 尚椿琳', status:'已关闭', measure:'已调整发布窗口并完成回归验证。', files:[],audit:[]}
];
db.services = [
  {id:'ITSM-202608-038', title:'ERP组织编码同步失败补偿', type:'接口异常补偿', requester:'人力资源部 / 吴欣', owner:'信息工程部 / 尚椿琳', status:'待补偿', priority:'高', related:'ONB-202608-006', run:'RUN-20260820-0928', error:'E102 · ERP组织编码缺失', audit:[{time:'2026-08-20 09:28',actor:'动作流AF-ONB-02',action:'接口调用失败',result:'写入运行日志并生成补偿服务单'}]},
  {id:'ITSM-202608-035', title:'经营驾驶舱指标模型V1.7发布', type:'发布变更', requester:'经营发展部 / 周敏', owner:'信息工程部 / 王晓雨', status:'待发布', priority:'中', related:'MET-002', run:'RUN-20260820-1510', error:'—', audit:[]},
  {id:'ITSM-202608-029', title:'采购部合同评审权限申请', type:'权限申请', requester:'采购部 / 赵倩', owner:'信息工程部 / 尚椿琳', status:'已完成', priority:'低', related:'HT-202608-029', run:'RUN-20260819-1620', error:'—', audit:[]}
];
db.qualityRules = [
  {id:'DQ-202608-006', name:'MES完工报工完整性校验', asset:'生产经营主题 / 完工报工明细', owner:'生产管理部 / 刘强', status:'异常待修复', score:86, version:'V1.3', impact:'MET-002 产值完成率', batch:'BATCH-20260820-03', audit:[{time:'2026-08-20 08:30',actor:'数据质量动作流',action:'规则校验',result:'发现3条组织编码缺失记录'}]},
  {id:'DQ-202608-004', name:'供应商主数据统一社会信用代码唯一性', asset:'供应商主数据', owner:'采购部 / 赵倩', status:'正常', score:100, version:'V2.1', impact:'合同、采购风险', batch:'BATCH-20260820-01', audit:[]},
  {id:'DQ-202608-002', name:'员工组织岗位有效性校验', asset:'HR员工主数据', owner:'人力资源部 / 吴欣', status:'已修复待复跑', score:94, version:'V1.8', impact:'入职、权限、考勤', batch:'BATCH-20260820-02', audit:[]}
];

function statusClass(value) {
  if (String(value).includes('失败') || String(value).includes('冲突') || String(value).includes('异常')) return 'red';
  if (['已完成','已关闭','已归档','已采纳','正常','已对账','已生效','有效','在职','已通过','校验通过','无','已核实'].includes(value)) return 'green';
  if (['AI预审中','部门评审中','履约中','整改中','处理中','办理中','入职办理中','待发布','已修复待复跑'].includes(value)) return 'blue';
  if (['高风险','高优先级','已退回','重点关注','失败待补偿','冲突待调整','待核实','待补偿','待销号','待办理','待反馈','待复核','待发布'].includes(value)) return 'amber';
  return 'purple';
}
function openObject(id) {
  if(typeof ItWorkspace!=='undefined' && ItWorkspace.resolve(id)) return;
  if (id.indexOf('HT-')===0) return showContract(id);
  if (id.indexOf('WT-')===0) return showProblem(id);
  if (id.indexOf('MET-')===0) return showMetric(id);
  if (id.indexOf('EMP-')===0) return showEmployee(id);
  if (id.indexOf('ONB-')===0) return showOnboarding(id);
  if (id.indexOf('LV-')===0) return showLeave(id);
  if (id.indexOf('DOC-')===0) return openAdminDetail(id);
  if (id.indexOf('RSK-')===0) return openRiskDetail(id);
  if (id.indexOf('ITSM-')===0) return openServiceDetail(id);
  if (id.indexOf('DQ-')===0) return openQualityDetail(id);
}
function groupForPage(page){
  if(['home','p0'].includes(page)) return 'workbench';
  if(['contract','contractDetail','risk'].includes(page)) return 'risk';
  if(page==='admin') return 'admin';
  if(['star','metric','problem','problemDetail','quality'].includes(page)) return 'star';
  if(['hr','onboarding','onboardingDetail','employee','employeeDetail','leave','leaveDetail','qualification'].includes(page)) return 'hr';
  return 'service';
}
function navGroup(key,label,items){
  const open=state.navOpen===key;
  return '<div class="nav-group"><button class="nav-group-title '+(open?'open':'')+'" onclick="toggleNavGroup(\''+key+'\')"><span>'+label+'</span><i>'+ (open?'⌄':'›') +'</i></button><div class="nav-group-items '+(open?'open':'')+'">'+items+'</div></div>';
}
function toggleNavGroup(key){state.navOpen=state.navOpen===key?'':key;render();}
function renderNav() {
  return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+
    navGroup('risk','合同 · 风险 · 审计',navButton('contract','合同管理中心')+navButton('risk','双源风险与审计'))+
    navGroup('admin','党政行政',navButton('admin','公文会议与督办'))+
    navGroup('star','观星台',navButton('star','经营驾驶舱')+navButton('metric','指标下钻与血缘')+navButton('problem','问题闭环中心')+navButton('quality','指标与数据质量'))+
    navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+
    navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));
}
function render() {
  const pages = {home:homePage,p0:p0Page,contract:contractPage,contractDetail:contractDetailPage,risk:riskPage,admin:adminPage,star:starPage,metric:metricPage,problem:problemPage,problemDetail:problemDetailPage,quality:qualityPage,service:servicePage,hr:hrPage,onboarding:onboardingPage,onboardingDetail:onboardingDetailPage,employee:employeePage,employeeDetail:employeeDetailPage,leave:leavePage,leaveDetail:leaveDetailPage,qualification:qualificationPage};
  $('#app').innerHTML = (pages[state.page] || homePage)();
}
function go(page) { state.page=page; state.navOpen=groupForPage(page); render(); window.scrollTo({top:0,behavior:'smooth'}); }

function p0Page() {
  const lines=[
    ['D01','合同AI审核—用印签署—履约协同','合同/条款/签署/履约','contract','已实现','P0'],
    ['D02','员工入职—失败补偿—员工360','员工/入职任务/资格/合同','hr','已实现','P0'],
    ['D03','请假—审批—考勤年度汇总','请假/余额/考勤/待办','leave','已实现','P0'],
    ['D04','公文/会议—督办—销号—归档','公文/会议/督办/附件','admin','本次重构','P0'],
    ['D05','双源风险—AI去重—审计定级—整改销账','风险/采集批次/整改/审计','risk','本次重构','P0'],
    ['D06','信息化服务—发布变更—失败补偿','服务单/运行批次/错误码/对账','service','本次重构','P0'],
    ['D07','指标异常—OA问题—会议快照—关闭回写','指标/来源/问题/会议','problem','已实现','P0'],
    ['D08','指标与数据质量全生命周期','指标/数据资产/质量规则/批次','quality','本次重构','P1']
  ];
  const content=`<div class="batch-summary"><div><span class="eyebrow">SOW 追溯与 Demo 建设看板</span><h2>8 条端到端主线，统一落到对象、状态、证据与回写</h2><p>86 项 OA 流程采用 23 类复用模板覆盖；观星台 50 条功能记录及 18 项接口在本页按主线和模拟边界管理。</p></div><div class="batch-progress"><b>8</b><span>演示主线</span></div></div><div class="trace-grid">${lines.map(function(x){return '<article class="trace-card"><div><span>'+x[0]+'</span>'+badge(x[4])+'</div><h2>'+x[1]+'</h2><p>'+x[2]+'</p><footer><b>'+x[5]+'</b><button class="link" onclick="go(\''+x[3]+'\')">进入场景 →</button></footer></article>';}).join('')}</div><section class="card top-gap"><div class="card-h"><h2>SOW 覆盖与模拟边界</h2><span class="meta">刷新页面后恢复演示基线</span></div><div class="info-grid">${info('OA流程追溯','86项 / 23类复用模板 / 8条主线')}${info('观星台功能','50条记录；STAR-F-043保留来源编号并用别名追溯')}${info('接口策略','18项；真实联调前使用接口契约、批次与运行日志模拟')}</div></section>`;
  return shell(content,'建设与追溯总览','每一条主线均以动作—结果—证据—回看作为当前 Demo 验收口径。');
}

function adminPage() {
  const rows=db.adminDocs.filter(function(x){return state.adminFilter==='全部状态'||x.status===state.adminFilter;});
  const stats=[['全部事项',db.adminDocs.length,'全部状态'],['办理中',db.adminDocs.filter(function(x){return x.status==='办理中';}).length,'办理中'],['待销号',db.adminDocs.filter(function(x){return x.status==='待销号';}).length,'待销号'],['已归档',db.adminDocs.filter(function(x){return x.status==='已归档';}).length,'已归档']];
  const content=`<div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.adminFilter===x[2]?'active':'')+'" onclick="state.adminFilter=\''+x[2]+'\';render()"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div><div class="toolbar"><span class="context-label">收文/会议纪要生成督办事项；完成验收后才能销号归档。</span><span class="spacer"></span><button class="primary" onclick="openAdminForm()">+ 登记公文/会议事项</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>编号</th><th>事项名称</th><th>类型 / 来源</th><th>责任部门</th><th>督办事项</th><th>期限</th><th>状态</th></tr></thead><tbody>${rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openAdminDetail(\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="openAdminDetail(\''+x.id+'\')">'+x.title+'</button></td><td>'+x.type+' / '+x.source+'</td><td>'+x.owner+'</td><td>'+x.tasks.length+'项</td><td>'+x.deadline+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')}</tbody></table></div>`;
  return shell(content,'公文会议与督办','从来文或会议纪要生成责任事项；反馈、验收、销号和归档共用同一编号与附件证据。');
}
function adminDoc(id){return db.adminDocs.find(function(x){return x.id===id;});}
function openAdminDetail(id){const x=adminDoc(id);const tasks=x.tasks.map(function(t){return '<div class="task-card"><div class="task-seq">督</div><div><span>'+t.id+'</span><h3>'+t.name+'</h3><p>责任人：'+t.owner+' · 截止：'+t.due+'</p></div><div class="task-action">'+badge(t.status)+(t.status!=='已完成'?'<button class="secondary" '+(!canAction('adminComplete')?'disabled':'')+' onclick="completeAdminTask(\''+x.id+'\',\''+t.id+'\')">提交验收证据</button>':'')+'</div></div>';}).join('')||'<div class="empty">该事项无待办督办任务。</div>';openModal(x.id+' · '+x.title,'<div class="detail-head admin-detail"><div class="detail-kicker">'+x.type+' / '+x.source+'</div><h2>'+x.title+'</h2><div class="detail-meta"><span>'+x.owner+'</span><span>办结期限 '+x.deadline+'</span><span>关联会议 '+x.meetingId+'</span></div><div class="detail-badges">'+badge(x.status)+'</div></div><div class="tabs"><button class="active">督办事项</button><button>来源附件 '+x.files.length+'</button><button>操作轨迹 '+x.audit.length+'</button></div><div class="onboarding-board">'+tasks+'</div>','<button class="secondary" onclick="closeModal()">关闭</button>'+(x.status!=='已归档'?'<button class="primary" '+(!canAction('adminArchive')?'disabled':'')+' onclick="archiveAdminDoc(\''+x.id+'\')">验收销号并归档</button>':''),true);}
function completeAdminTask(docId,taskId){if(!canAction('adminComplete')){denied('adminComplete');return;}const x=adminDoc(docId),t=x.tasks.find(function(y){return y.id===taskId;});t.status='已完成';x.files.unshift({name:t.name+'验收佐证.pdf',version:'V1.0',time:'2026-08-25 10:20'});audit(x,'督办事项验收',t.id+'已完成，佐证附件已归集');x.status=x.tasks.every(function(y){return y.status==='已完成';})?'待销号':'办理中';closeModal();render();toast('督办状态、附件、审计轨迹和销号条件已同步');}
function archiveAdminDoc(id){if(!canAction('adminArchive')){denied('adminArchive');return;}const x=adminDoc(id);if(x.tasks.some(function(t){return t.status!=='已完成';})){toast('仍有督办事项未验收，不能销号归档');return;}x.status='已归档';audit(x,'验收销号并归档','归档目录、会议纪要与督办结果已关联');closeModal();render();toast('事项已销号归档，关联附件和审计记录可回看');}
function openAdminForm(){if(!canAction('adminRegister')){denied('adminRegister');return;}openModal('登记公文/会议事项','<div class="form-grid"><div class="field full"><label>事项名称 <em>*</em></label><input id="adminTitle" value="生产保障专项会议纪要"></div><div class="field"><label>事项类型</label><select id="adminType"><option>会议纪要</option><option>收文</option><option>发文</option></select></div><div class="field"><label>责任部门</label><select id="adminOwner"><option>生产管理部 / 刘强</option><option>经营发展部 / 周敏</option></select></div><div class="field full"><label>自动生成</label><div class="readonly-box">来源文档 + 会议快照 + 督办事项 + 统一待办 + 归档目录</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createAdminDoc()">登记并生成督办</button>');}
function createAdminDoc(){if(!canAction('adminRegister')){denied('adminRegister');return;}const title=$('#adminTitle').value.trim();if(!title){toast('请填写事项名称');return;}const x={id:'DOC-202608-021',title:title,type:$('#adminType').value,source:'当前会话登记',owner:$('#adminOwner').value,status:'办理中',deadline:'2026-08-29',meetingId:'MTG-202608-014',tasks:[{id:'SUP-202608-039',name:'提交会议议定事项反馈',owner:$('#adminOwner').value,due:'08-28 17:00',status:'待办理'}],files:[{name:title+'_V1.0.docx',version:'V1.0',time:'2026-08-25 10:30'}],audit:[]};audit(x,'登记事项并生成督办','创建会议快照、责任事项和统一待办');db.adminDocs.unshift(x);db.todos.unshift({id:'WF-'+x.id,objectId:x.id,type:'督办事项',title:title+'—提交反馈',role:'owner',due:'08-28 17:00',status:'待处理'});closeModal();render();toast('公文事项、督办任务、附件和统一待办已同步生成');}

function riskPage(){const rows=db.risks.filter(function(x){return state.riskFilter==='全部状态'||x.status===state.riskFilter;});const stats=[['全部风险',db.risks.length,'全部状态'],['待核实',db.risks.filter(function(x){return x.status==='待核实';}).length,'待核实'],['整改中',db.risks.filter(function(x){return x.status==='整改中';}).length,'整改中'],['已关闭',db.risks.filter(function(x){return x.status==='已关闭';}).length,'已关闭']];const content=`<div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.riskFilter===x[2]?'active':'')+'" onclick="state.riskFilter=\''+x[2]+'\';render()"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div><div class="toolbar"><span class="context-label">人工风险与 AI 采集批次先保留来源差异，再核实、合并、定级、整改与销账。</span><span class="spacer"></span><button class="primary" onclick="openRiskForm()">+ 启动AI采集批次</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>风险编号</th><th>风险名称</th><th>双源关系</th><th>风险等级</th><th>责任人</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openRiskDetail(\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="openRiskDetail(\''+x.id+'\')">'+x.title+'</button></td><td>'+x.relation+'</td><td>'+badge(x.level+'风险')+'</td><td>'+x.owner+'</td><td>'+badge(x.status)+'</td><td><button class="link" onclick="openRiskDetail(\''+x.id+'\')">核实/整改</button></td></tr>';}).join('')}</tbody></table></div>`;return shell(content,'双源风险与审计','保留人工季报与 AI 常态采集的来源差异，核实后才进入正式风险台账和整改销账。');}
function risk(id){return db.risks.find(function(x){return x.id===id;});}
function openRiskDetail(id){if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.openRisk(id);const x=risk(id);const action=x.status==='待核实'?'<button class="primary" '+(!canAction('riskVerify')?'disabled':'')+' onclick="verifyRisk(\''+id+'\')">核实合并并发起整改</button>':x.status==='整改中'?'<button class="primary" '+(!canAction('riskClose')?'disabled':'')+' onclick="closeRisk(\''+id+'\')">复核销账</button>':'';openModal(x.id+' · '+x.title,'<div class="relation-map"><div class="relation-core"><span>双源风险对象</span><b>'+x.id+'</b><small>'+x.level+'风险 · '+x.status+'</small></div><div class="relation-lines"><button><span>人工来源</span><b>'+x.sourceA+'</b><small>保留来源编号与提报时间</small></button><button><span>AI来源</span><b>'+x.sourceB+'</b><small>保留采集批次、规则版本和相似度</small></button><button><span>处置状态</span><b>'+x.relation+'</b><small>'+x.measure+'</small></button><button><span>审计证据</span><b>'+x.audit.length+'条轨迹 / '+x.files.length+'份附件</b><small>操作结果可回看</small></button></div></div>','<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);}
function verifyRisk(id){if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.openRisk(id);if(!canAction('riskVerify')){denied('riskVerify');return;}const x=risk(id);x.status='整改中';x.relation='已核实并合并';x.measure='已生成风险整改单并关联责任部门、期限及复核人。';x.files.unshift({name:x.id+'_双源核实记录.pdf',time:'2026-08-25 10:45'});audit(x,'核实双源风险并定级','保留人工/AI来源，合并后定级为'+x.level+'风险');db.todos.unshift({id:'WF-'+x.id,objectId:x.id,type:'风险整改',title:x.title+'—提交整改措施',role:'owner',due:'08-28 17:00',status:'待处理'});closeModal();render();toast('风险定级、整改单、待办、附件和审计轨迹已同步');}
function closeRisk(id){if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.openRisk(id);if(!canAction('riskClose')){denied('riskClose');return;}const x=risk(id);x.status='已关闭';x.files.unshift({name:x.id+'_整改复核结论.pdf',time:'2026-08-25 10:50'});audit(x,'审计复核销账','整改结果与双源证据完整，已关闭风险台账');db.todos=db.todos.filter(function(t){return t.objectId!==id;});closeModal();render();toast('风险已销账，待办和风险统计已同步回写');}
function openRiskForm(){if(!canAction('riskStart')){denied('riskStart');return;}openModal('启动AI风险采集批次','<div class="form-grid"><div class="field"><label>采集主题</label><select><option>供应商交付与合规风险</option><option>设备运行风险</option></select></div><div class="field"><label>规则版本</label><div class="readonly-box">RISK-RULE-2026.08.3</div></div><div class="field full"><label>模拟运行范围</label><div class="readonly-box">当前会话仅生成采集批次、候选风险、去重结果与运行日志；不调用真实 AI 服务。</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createRiskBatch()">运行采集并生成候选</button>');}
function createRiskBatch(){if(!canAction('riskStart')){denied('riskStart');return;}const x={id:'RSK-202608-017',title:'供应商材料质量舆情风险',sourceA:'无人工提报',sourceB:'AI采购舆情采集批次 BATCH-0825',relation:'待人工核实',level:'中',owner:'采购部 / 赵倩',status:'待核实',measure:'',files:[],audit:[]};audit(x,'启动AI风险采集','生成候选风险、规则版本与批次运行记录');db.risks.unshift(x);closeModal();render();toast('已生成AI采集候选；需人工核实后才会进入整改流程');}

function servicePage(){const rows=db.services.filter(function(x){return state.serviceFilter==='全部状态'||x.status===state.serviceFilter;});const stats=[['全部服务单',db.services.length,'全部状态'],['待补偿',db.services.filter(function(x){return x.status==='待补偿';}).length,'待补偿'],['待发布',db.services.filter(function(x){return x.status==='待发布';}).length,'待发布'],['已完成',db.services.filter(function(x){return x.status==='已完成';}).length,'已完成']];const content=`<div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.serviceFilter===x[2]?'active':'')+'" onclick="state.serviceFilter=\''+x[2]+'\';render()"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div><div class="toolbar"><span class="context-label">权限、接口、发布与主数据异常统一落到服务单、运行批次、错误码、补偿和对账。</span><span class="spacer"></span><button class="primary" onclick="openServiceForm()">+ 发起服务申请</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>服务单号</th><th>服务事项</th><th>类型</th><th>关联对象</th><th>运行批次 / 错误码</th><th>责任人</th><th>状态</th></tr></thead><tbody>${rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openServiceDetail(\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="openServiceDetail(\''+x.id+'\')">'+x.title+'</button></td><td>'+x.type+'</td><td><button class="link" onclick="openObject(\''+x.related+'\')">'+x.related+'</button></td><td>'+x.run+' / '+x.error+'</td><td>'+x.owner+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')}</tbody></table></div>`;return shell(content,'服务、发布与补偿','以服务单承接权限、接口和发布异常，保留请求、响应、错误码、重试和对账证据。');}
function service(id){return db.services.find(function(x){return x.id===id;});}
function openServiceDetail(id){if(typeof ItWorkspace!=='undefined' && ItWorkspace.resolve(id))return;const x=service(id);const action=x.status==='待补偿'?'<button class="primary" '+(!canAction('serviceRetry')?'disabled':'')+' onclick="retryService(\''+id+'\')">查看错误并补偿重试</button>':x.status==='待发布'?'<button class="primary" '+(!canAction('servicePublish')?'disabled':'')+' onclick="publishService(\''+id+'\')">验证并发布</button>':'';openModal(x.id+' · '+x.title,'<div class="info-grid">'+info('服务类型',x.type)+info('申请人',x.requester)+info('处理责任人',x.owner)+info('关联对象','<button class="link" onclick="closeModal();openObject(\''+x.related+'\')">'+x.related+'</button>')+info('运行批次',x.run)+info('错误码 / 响应',x.error)+info('当前状态',badge(x.status))+info('审计轨迹',x.audit.length+'条')+'</div><div class="context-tip">真实接口、电子签署及生产环境发布需具备接口规范、授权和联调环境；当前 Demo 仅模拟运行记录与可回看结果。</div>','<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);}
function retryService(id){if(typeof ItWorkspace!=='undefined' && ItWorkspace.sourceRetry(id))return;if(!canAction('serviceRetry')){denied('serviceRetry');return;}const x=service(id);x.status='已完成';x.error='补偿成功 · 响应200';x.run='RUN-20260825-1105';audit(x,'补偿重试','保留原错误E102；本次运行成功并完成组织编码对账');const o=onboarding('ONB-202608-006');if(o){const t=o.tasks.find(function(a){return a.id==='ONB-T02';});if(t&&t.status==='失败待补偿'){t.status='已完成';t.result='补偿重试成功，OA与ERP账号已创建并关联员工编号';refreshOnboardingState(o);}}closeModal();render();toast('补偿运行、关联入职任务、服务状态和审计日志已同步');}
function publishService(id){if(typeof ItWorkspace!=='undefined' && ItWorkspace.sourceRetry(id))return;if(!canAction('servicePublish')){denied('servicePublish');return;}const x=service(id);x.status='已完成';audit(x,'发布变更','发布验证通过，生成版本、运行批次与回退点');closeModal();render();toast('发布状态、运行批次和审计结果已同步');}
function openServiceForm(){if(typeof ItWorkspace!=='undefined')return ItWorkspace.create('repair');if(!canAction('serviceCreate')){denied('serviceCreate');return;}openModal('发起信息化服务申请','<div class="form-grid"><div class="field full"><label>服务事项 <em>*</em></label><input id="serviceTitle" value="生产报工接口字段映射调整"></div><div class="field"><label>服务类型</label><select id="serviceType"><option>接口配置变更</option><option>权限申请</option><option>故障报修</option></select></div><div class="field"><label>关联对象</label><select id="serviceRelated"><option>MET-002</option><option>ONB-202608-006</option></select></div><div class="field full"><label>模拟边界</label><div class="readonly-box">提交后生成服务单、待评估状态和运行日志；不触发生产系统。</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createService()">提交服务申请</button>');}
function createService(){if(!canAction('serviceCreate')){denied('serviceCreate');return;}const title=$('#serviceTitle').value.trim();if(!title){toast('请填写服务事项');return;}const x={id:'ITSM-202608-041',title:title,type:$('#serviceType').value,requester:currentRole().label+' / '+currentRole().name,owner:'信息工程部 / 尚椿琳',status:'待评估',priority:'中',related:$('#serviceRelated').value,run:'—',error:'—',audit:[]};audit(x,'提交服务申请','生成服务单、评估待办和接口运行台账占位');db.services.unshift(x);closeModal();render();toast('服务申请已进入台账，等待评估与发布/补偿处理');}

function qualityPage(){const rows=db.qualityRules.filter(function(x){return state.qualityFilter==='全部状态'||x.status===state.qualityFilter;});const stats=[['全部质量规则',db.qualityRules.length,'全部状态'],['异常待修复',db.qualityRules.filter(function(x){return x.status==='异常待修复';}).length,'异常待修复'],['已修复待复跑',db.qualityRules.filter(function(x){return x.status==='已修复待复跑';}).length,'已修复待复跑'],['正常',db.qualityRules.filter(function(x){return x.status==='正常';}).length,'正常']];const content=`<div class="period-bar"><div><span class="eyebrow">观星台数据治理</span><b>指标口径、来源血缘、质量规则与采集批次共用同一数据资产链</b><small>当前会话模拟修复与复跑，刷新后恢复基线。</small></div><div>${badge('规则版本可回看')}</div></div><div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.qualityFilter===x[2]?'active':'')+'" onclick="state.qualityFilter=\''+x[2]+'\';render()"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div><div class="toolbar"><span class="context-label">指标异常先确认口径与来源，再修复数据质量、复跑批次，并回看受影响指标。</span><span class="spacer"></span><button class="primary" onclick="openQualityForm()">+ 新增质量规则</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>规则编号</th><th>质量规则</th><th>数据资产</th><th>影响对象</th><th>质量得分</th><th>版本 / 批次</th><th>状态</th></tr></thead><tbody>${rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openQualityDetail(\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="openQualityDetail(\''+x.id+'\')">'+x.name+'</button></td><td>'+x.asset+'</td><td><button class="link" onclick="openObject(\''+(x.impact.indexOf('MET-002')>=0?'MET-002':'HT-202608-029')+'\')">'+x.impact+'</button></td><td><div class="progress-cell"><i style="width:'+x.score+'%"></i><span>'+x.score+'分</span></div></td><td>'+x.version+' / '+x.batch+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')}</tbody></table></div>`;return shell(content,'指标与数据质量','以指标目录、数据资产、质量规则、异常分派、修复复跑和影响回看完成数据治理闭环。');}
function quality(id){return db.qualityRules.find(function(x){return x.id===id;});}
function openQualityDetail(id){const x=quality(id);const action=x.status==='异常待修复'?'<button class="primary" '+(!canAction('qualityRepair')?'disabled':'')+' onclick="repairQuality(\''+id+'\')">分派修复并复跑</button>':x.status==='已修复待复跑'?'<button class="primary" '+(!canAction('qualityRerun')?'disabled':'')+' onclick="rerunQuality(\''+id+'\')">确认复跑结果</button>':'';openModal(x.id+' · '+x.name,'<div class="relation-map"><div class="relation-core"><span>数据质量规则</span><b>'+x.score+'分</b><small>'+x.status+' · '+x.version+'</small></div><div class="relation-lines"><button><span>数据资产</span><b>'+x.asset+'</b><small>责任人：'+x.owner+'</small></button><button><span>采集批次</span><b>'+x.batch+'</b><small>规则版本 '+x.version+'</small></button><button><span>影响对象</span><b>'+x.impact+'</b><small>异常、修复及复跑过程需可回看</small></button><button><span>审计证据</span><b>'+x.audit.length+'条操作轨迹</b><small>保留前后状态与结果</small></button></div></div>','<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);}
function repairQuality(id){if(!canAction('qualityRepair')){denied('qualityRepair');return;}const x=quality(id);x.status='已修复待复跑';x.score=96;audit(x,'分派数据修复','已补充3条缺失组织编码，等待复跑验证');closeModal();render();toast('修复任务、质量得分和审计轨迹已同步更新');}
function rerunQuality(id){if(!canAction('qualityRerun')){denied('qualityRerun');return;}const x=quality(id);x.status='正常';x.score=100;x.batch='BATCH-20260825-01';audit(x,'完成质量复跑','规则校验通过，受影响指标已解除数据质量预警');closeModal();render();toast('质量状态、复跑批次和受影响指标已同步回写');}
function openQualityForm(){if(!canAction('qualityCreate')){denied('qualityCreate');return;}openModal('新增数据质量规则','<div class="form-grid"><div class="field full"><label>规则名称 <em>*</em></label><input id="qualityName" value="生产报工组织编码完整性校验"></div><div class="field"><label>数据资产</label><input id="qualityAsset" value="生产经营主题 / 完工报工明细"></div><div class="field"><label>影响对象</label><select id="qualityImpact"><option>MET-002 产值完成率</option><option>合同、采购风险</option></select></div><div class="field full"><label>发布行为</label><div class="readonly-box">提交后生成规则草稿和审批待办；不影响真实数据资产。</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createQualityRule()">保存规则草稿</button>');}
function createQualityRule(){if(!canAction('qualityCreate')){denied('qualityCreate');return;}const name=$('#qualityName').value.trim();if(!name){toast('请填写规则名称');return;}const x={id:'DQ-202608-008',name:name,asset:$('#qualityAsset').value,owner:'信息工程部 / 王晓雨',status:'待发布',score:0,version:'V0.1草稿',impact:$('#qualityImpact').value,batch:'—',audit:[]};audit(x,'创建质量规则草稿','生成规则版本和待发布审批记录');db.qualityRules.unshift(x);closeModal();render();toast('质量规则草稿已生成，等待发布后参与采集批次校验');}

function homePage(){const base=baseHomePage();return base.replace('</div>\n    <div class="split top-gap">','</div><div class="story-grid full-story-grid"><article class="story-card"><div class="story-head"><div><span class="story-no">新增主线04</span><h2>公文、会议、督办、销号与归档</h2></div>'+badge('办理中')+'</div><p>从来文与会议纪要生成督办事项，提交验收证据后销号归档。</p><button class="primary" onclick="go(\'admin\')">进入党政督办主线</button></article><article class="story-card"><div class="story-head"><div><span class="story-no">新增主线05/06</span><h2>双源风险与信息化服务补偿</h2></div>'+badge('待核实')+'</div><p>AI采集与人工上报保留双源证据；接口失败以服务单、错误码和补偿记录闭环。</p><button class="primary" onclick="go(\'risk\')">进入风险审计主线</button></article><article class="story-card"><div class="story-head"><div><span class="story-no">新增主线08</span><h2>指标与数据质量治理</h2></div>'+badge('异常待修复')+'</div><p>指标口径、数据资产、质量规则、修复复跑和影响回看统一追溯。</p><button class="primary" onclick="go(\'quality\')">进入数据质量主线</button></article></div>\n    <div class="split top-gap">').replace('党政 / IT / 双源风险</b><span class="health-wait">后续批次</span>','党政 / IT / 双源风险 / 数据质量</b><span class="health-ok">本次重构已纳入</span>');}

function openScopeLedger(){
  const rows=[
    ['OA 流程范围','86 项','按 23 类复用模板、8 条主线组织演示','本次 Demo 通过主链展示，不逐条复刻 86 个表单'],
    ['观星台功能','50 条记录','经营指标、风险、服务、数据质量等对象可追溯','STAR-F-043 为签字来源重复编号，按内部别名区分追溯'],
    ['接口范围','18 项','以接口契约、运行批次、错误码和补偿记录模拟','不代表已连通客户生产系统'],
    ['能源分析','7 项待确认','能源日报、去向、成本、电耗、单件能耗、质量、预警','待确认后再纳入独立可点击主线']
  ];
  openModal('SOW 范围与 Demo 追溯台账','<div class="context-tip">本台账用于区分：签字范围、当前 Demo 可见行为和真实环境联调边界。</div><div class="table-card inline-table"><table><thead><tr><th>范围</th><th>签字基数</th><th>当前 Demo 处理方式</th><th>边界说明</th></tr></thead><tbody>'+rows.map(function(x){return '<tr><td><b>'+x[0]+'</b></td><td>'+x[1]+'</td><td>'+x[2]+'</td><td>'+x[3]+'</td></tr>';}).join('')+'</tbody></table></div>','<button class="primary" onclick="closeModal()">我已知悉</button>',true);
}
const shellBeforeScopeNotice=shell;
shell=function(content,title,description){
  if(state.page==='quality') content='<div class="context-tip"><b>范围边界：</b>能源分析 7 项在签字 SOW 中标记为待确认；本 Demo 仅保留追溯占位，未展示为已实现功能或真实接口能力。</div>'+content;
  if(state.page==='p0') content+='<section class="card top-gap"><div class="card-h"><div><h2>SOW 范围与 Demo 追溯台账</h2><span class="meta">用于演示前说明签字范围与真实联调边界</span></div><button class="secondary" onclick="openScopeLedger()">查看台账</button></div><p class="context-label">将 86 项 OA、50 条观星台功能、18 项接口和 7 项待确认能源能力分开管理，避免把 Demo 模拟效果等同于生产系统能力。</p></section>';
  return shellBeforeScopeNotice(content,title,description);
};
/* ===== 审计监督部工作域：15项流程 + ERP/SRM 只读协同 ===== */
state.auditPage = 1;
state.auditFilter = '全部状态';
state.auditQuery = '';
state.auditCurrent = '';
state.auditNavOpen = 'audit-home';

const auditModules = {
  contractTemplate:{group:'合同与履约',label:'模板维护',title:'合同模板维护',subtitle:'维护合同模板、适用范围、必备条款与生效版本。',prefix:'CTM',columns:['模板编号','模板名称','适用合同','版本 / 状态','维护人'],action:'发布版本'},
  contractReview:{group:'合同与履约',label:'合同评审',title:'合同评审',subtitle:'合同评审以人工结论为准；AI 仅提供条款风险提示与建议。',prefix:'CTR',columns:['合同编号','合同名称','相对方','AI提示','当前节点'],action:'进入人工复核'},
  contractSeal:{group:'合同与履约',label:'用印签署回传',title:'用印签署回传',subtitle:'登记 OA 用印和签署回传证据，不替代电子签章平台。',prefix:'CTS',columns:['申请编号','关联合同','用印类型','签署回传','状态'],action:'登记回传'},
  contractChange:{group:'合同与履约',label:'变更补充',title:'合同变更与补充协议',subtitle:'关联原合同、变更事项、审查意见与补充协议版本。',prefix:'CTC',columns:['变更编号','原合同','变更事项','责任部门','状态'],action:'提交评审'},
  contractTermination:{group:'合同与履约',label:'解除终止',title:'合同解除与终止',subtitle:'以解除依据、结算影响、审批意见和归档材料形成闭环。',prefix:'CTT',columns:['申请编号','关联合同','终止原因','结算影响','状态'],action:'提交终止审查'},
  contractPerformance:{group:'合同与履约',label:'履约台账协同',title:'合同履约台账协同',subtitle:'OA 关注履约监督和证据；付款及结算仍由 ERP 闭环。',prefix:'CTP',columns:['合同编号','履约事项','履约节点','ERP回传状态','监督状态'],action:'查看ERP回传'},
  compliance:{group:'合规与法律',label:'合规清单维护及版本审批',title:'合规清单与版本审批',subtitle:'按版本管理合规条目；合同审查固定引用已生效版本。',prefix:'CMP',columns:['清单编号','清单名称','适用范围','版本','审批状态'],action:'提交版本审批'},
  legal:{group:'合规与法律',label:'法律案件及纠纷',title:'法律案件及纠纷登记结案',subtitle:'围绕案件、对方、影响、责任、处置阶段、结案结论与证据留痕。',prefix:'LEG',columns:['案件编号','案件 / 纠纷事项','相对方','处置阶段','状态'],action:'登记案件'},
  riskQuarter:{group:'风险管理',label:'季度风险上报评估',title:'季度风险上报与评估',subtitle:'业务部门上报，AI/规则给出建议，审计监督部人工确认最终风险等级。',prefix:'RSQ',columns:['风险编号','风险事项','建议等级','人工评估','状态'],action:'发起风险上报'},
  riskRectify:{group:'风险管理',label:'整改单下发',title:'风险整改单下发',subtitle:'将经人工确认的风险分派至责任部门、责任人和完成时限。',prefix:'RSR',columns:['整改单号','关联风险','责任部门','完成期限','状态'],action:'下发整改单'},
  riskFeedback:{group:'风险管理',label:'整改反馈 / 延期 / 关闭',title:'风险整改反馈、延期与关闭',subtitle:'责任部门提交措施与佐证；延期须审批，关闭须审计复核。',prefix:'RSF',columns:['整改单号','整改事项','责任人','整改进度','状态'],action:'提交整改反馈'},
  riskEvent:{group:'风险管理',label:'重大风险事件报告',title:'重大风险事件报告',subtitle:'独立记录事件等级、影响范围、上报对象、处置时限与持续跟踪。',prefix:'RSE',columns:['事件编号','重大风险事件','事件等级','上报对象','状态'],action:'报告重大事件'},
  auditRectify:{group:'审计整改',label:'审计问题整改及销账',title:'审计问题整改及销账',subtitle:'审计问题、整改责任、佐证材料、复核意见和销账结论保持同一编号。',prefix:'AUD',columns:['问题编号','审计问题','责任部门','要求完成','状态'],action:'发起整改'},
  procurement:{group:'招采监督',label:'招采监督管理',title:'招采监督管理',subtitle:'监督 SRM 招采节点、监督意见与回传证据；专业招采流程仍在 SRM 完成。',prefix:'PSM',columns:['监督编号','SRM单号','监督节点','监督意见','状态'],action:'查看SRM流程'},
  procurementRectify:{group:'招采监督',label:'招采异常整改及销账',title:'招采异常整改及销账',subtitle:'异常发现、责任整改、证据复核与销账在 OA 留痕闭环。',prefix:'PSR',columns:['异常编号','招采异常','责任部门','整改期限','状态'],action:'发起异常整改'}
};

function auditRecord(id,title,owner,status,extra){
  return Object.assign({id:id,title:title,owner:owner,status:status, due:'2026-08-29', progress:status==='已关闭'||status==='已销账'||status==='已生效'?100:status==='整改中'||status==='反馈中'?60:20, files:[{name:title+'_支撑材料.pdf',version:'V1.0',uploader:'系统归集',time:'2026-08-25 10:10'}], audit:[{time:'2026-08-25 10:10',actor:'陈欣悦',action:'登记台账',result:'已生成流程、附件与可回看操作轨迹'}]},extra||{});
}
db.auditCenter = {
  contractTemplate:[auditRecord('CTM-2026-006','采购合同标准模板','审计监督部 / 陈欣悦','已生效',{scope:'采购合同',version:'V2.3'}),auditRecord('CTM-2026-007','非标准合同审查要点模板','审计监督部 / 陈欣悦','审批中',{scope:'服务合同',version:'V1.0'})],
  contractReview:[auditRecord('CTR-202608-029','华东区域包装材料年度采购合同','采购部 / 赵倩','待人工复核',{contractId:'HT-202608-029',party:'四川华彩包装材料有限公司',ai:'高风险条款 1 项'}),auditRecord('CTR-202608-028','纸张原料季度框架采购协议','采购部 / 何峰','部门会签中',{contractId:'HT-202608-028',party:'成都恒丰纸业有限公司',ai:'中风险条款 2 项'})],
  contractSeal:[auditRecord('CTS-202608-024','信息系统运维服务合同用印','党政综合办 / 何静','待回传',{contractId:'HT-202608-024',seal:'合同专用章',signed:'等待签署版回传'}),auditRecord('CTS-202608-019','原材料运输服务框架协议用印','党政综合办 / 何静','已回传',{contractId:'HT-202608-019',seal:'合同专用章',signed:'签署版 V1.0 已归集'})],
  contractChange:[auditRecord('CTC-202608-006','包装材料采购数量调整补充协议','采购部 / 赵倩','评审中',{contractId:'HT-202608-029',reason:'年度预测调整，数量增加12%'})],
  contractTermination:[auditRecord('CTT-202608-003','印刷设备维保服务合同解除申请','设备动力部 / 李超','待审查',{contractId:'HT-202608-027',reason:'服务商连续两次未按期响应'})],
  contractPerformance:[auditRecord('CTP-202608-029','华东区域包装材料年度采购合同','采购部 / 赵倩','履约监督中',{contractId:'HT-202608-029',milestone:'首批交付验收',erp:'ERP-PO-202608-144 · 待付款条件'})],
  compliance:[auditRecord('CMP-2026-018','采购合同合规清单','审计监督部 / 陈欣悦','已生效',{scope:'采购 / 框架合同',version:'2026版'}),auditRecord('CMP-2026-021','关联交易合规核查清单','法务合规岗 / 周倩','审批中',{scope:'关联交易',version:'V1.0'})],
  legal:[auditRecord('LEG-202608-004','供应商质量赔偿争议','四川华彩包装材料有限公司','处理中',{stage:'协商取证',impact:'预计影响 18 万元'}),auditRecord('LEG-202608-002','运输服务违约纠纷','五粮液物流有限公司','待结案',{stage:'结案审批',impact:'已达成和解'})],
  riskQuarter:[auditRecord('RSQ-2026Q3-012','包装材料供应商交付波动风险','采购部 / 赵倩','待人工评估',{suggestion:'高',level:'待确认',source:'2026年第三季度风险上报'}),auditRecord('RSQ-2026Q3-009','关键模切设备停机影响交付风险','生产管理部 / 刘强','已评估',{suggestion:'高',level:'高',source:'2026年第三季度风险上报'})],
  riskRectify:[auditRecord('RSR-202608-012','关键模切设备停机风险整改单','生产管理部 / 刘强','已下发',{riskId:'RSQ-2026Q3-009',due:'2026-08-30'})],
  riskFeedback:[auditRecord('RSF-202608-012','关键模切设备停机风险整改','生产管理部 / 刘强','整改中',{rectifyId:'RSR-202608-012',progress:60,due:'2026-08-30'}),auditRecord('RSF-202608-007','供应商准入资料完整性整改','采购部 / 赵倩','待复核',{rectifyId:'RSR-202608-007',progress:100,due:'2026-08-27'})],
  riskEvent:[auditRecord('RSE-202608-001','关键设备突发停机重大风险事件','生产管理部 / 刘强','持续跟踪',{level:'一级',reportTo:'总经理 / 分管领导',due:'2小时内完成首报'})],
  auditRectify:[auditRecord('AUD-202608-006','采购合同履约验收证据不完整','采购部 / 赵倩','待复核',{due:'2026-08-28',progress:100}),auditRecord('AUD-202608-003','授权审批资料归档不及时','党政综合办 / 何静','整改中',{due:'2026-08-30',progress:50})],
  procurement:[auditRecord('PSM-202608-016','包装材料年度招采监督','采购部 / 赵倩','监督中',{srm:'SRM-RFQ-202608-016',node:'评标定标',opinion:'资格文件需补充核验记录'})],
  procurementRectify:[auditRecord('PSR-202608-005','供应商资质文件过期异常','采购部 / 赵倩','待反馈',{srm:'SRM-RFQ-202608-016',due:'2026-08-28',progress:20}),auditRecord('PSR-202608-002','评标记录签字不完整异常','采购部 / 赵倩','待复核',{srm:'SRM-RFQ-202608-011',due:'2026-08-26',progress:100})]
};

function auditRows(key){
  const rows=db.auditCenter[key]||[], q=(state.auditQuery||'').trim();
  return rows.filter(function(x){return (state.auditFilter==='全部状态'||x.status===state.auditFilter)&&(!q||[x.id,x.title,x.owner,x.status].join('|').includes(q));});
}
function auditModule(key){return auditModules[key];}
function auditCan(action){return action==='反馈'?['owner','audit','manager'].includes(state.role):['audit','manager'].includes(state.role);}
function auditNavItems(group){return Object.keys(auditModules).filter(function(k){return auditModules[k].group===group;}).map(function(k){return navButton('audit-'+k,auditModules[k].label);}).join('');}
function auditGroupForPage(page){if(page==='audit-home')return 'audit-home';if(page.indexOf('audit-')===0)return auditModules[page.slice(6)]?auditModules[page.slice(6)].group:'audit-home';if(page==='erp')return 'audit-contract';if(page==='srm')return 'audit-procurement';return '';}
function renderNav(){
  return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+
    navGroup('audit-home','审计监督部',navButton('audit-home','审计监督部工作台'))+
    navGroup('合同与履约','合同与履约',auditNavItems('合同与履约'))+
    navGroup('合规与法律','合规与法律',auditNavItems('合规与法律'))+
    navGroup('风险管理','风险管理',auditNavItems('风险管理'))+
    navGroup('审计整改','审计整改',auditNavItems('审计整改'))+
    navGroup('招采监督','招采监督',auditNavItems('招采监督'))+
    navGroup('audit-contract','ERP 模拟系统',navButton('erp','合同履约与付款状态'))+
    navGroup('audit-procurement','SRM 模拟系统',navButton('srm','招采流程与异常'))+
    navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+
    navGroup('star','观星台',navButton('star','经营驾驶舱')+navButton('metric','指标下钻与血缘')+navButton('problem','问题闭环中心')+navButton('quality','指标与数据质量'))+
    navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+
    navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));
}
function groupForPage(page){return auditGroupForPage(page)||({home:'workbench',p0:'workbench',contract:'合同与履约',contractDetail:'合同与履约',risk:'风险管理',admin:'admin',star:'star',metric:'star',problem:'star',problemDetail:'star',quality:'star',hr:'hr',onboarding:'hr',onboardingDetail:'hr',employee:'hr',employeeDetail:'hr',leave:'hr',leaveDetail:'hr',qualification:'hr',service:'service'}[page]||'workbench');}
function go(page){state.page=page;state.navOpen=groupForPage(page);state.auditFilter='全部状态';state.auditQuery='';render();window.scrollTo({top:0,behavior:'smooth'});}

function auditHomePage(){
  const all=Object.keys(db.auditCenter).reduce(function(a,k){return a.concat(db.auditCenter[k]);},[]);
  const cards=[['待人工复核',all.filter(function(x){return /待人工复核|待人工评估|待复核/.test(x.status);}).length,'audit-contractReview'],['临期整改',all.filter(function(x){return /整改中|待反馈/.test(x.status);}).length,'audit-riskFeedback'],['重大风险',db.auditCenter.riskEvent.length,'audit-riskEvent'],['招采异常',db.auditCenter.procurementRectify.filter(function(x){return x.status!=='已销账';}).length,'audit-procurementRectify']];
  const content='<div class="role-banner"><div><span class="eyebrow">审计监督部 · 15项业务闭环</span><h2>监督、评审、整改和销账的统一工作台</h2><p>AI 仅给出风险提示或等级建议；人工复核结论、监督意见与销账结论是唯一有效结论。</p></div><div class="session-note">OA 仅承接评审、监督、台账和整改闭环；ERP/SRM 主流程保持外部系统边界。</div></div><div class="kpis">'+cards.map(function(c){return '<button class="kpi '+(c[0]==='重大风险'?'alert':'')+'" onclick="go(\''+c[2]+'\')"><span class="label">'+c[0]+'</span><strong class="val">'+c[1]+'</strong><span class="hint">点击进入对应台账</span></button>';}).join('')+'</div><div class="story-grid"><article class="story-card"><div class="story-head"><div><span class="story-no">主讲解路径</span><h2>合同风险到履约协同</h2></div>'+badge('待人工复核')+'</div><div class="story-flow"><span class="done">模板与评审</span><i>→</i><span class="current">AI提示</span><i>→</i><span>人工结论</span><i>→</i><span>用印回传</span><i>→</i><span>ERP履约回看</span></div><button class="primary" onclick="go(\'audit-contractReview\')">开始合同评审演示</button></article><article class="story-card"><div class="story-head"><div><span class="story-no">责任事项</span><h2>整改、延期、复核与销账</h2></div>'+badge('整改中')+'</div><p>风险、审计问题和招采异常均采用同一证据规则：反馈与附件 → 延期审批（如需）→ 审计复核 → 关闭/销账。</p><button class="secondary" onclick="go(\'audit-riskFeedback\')">查看整改闭环</button></article></div><section class="card top-gap"><div class="card-h"><h2>审计监督部待办</h2><button class="link" onclick="openTodos()">查看全部待办 →</button></div><div class="todo">'+db.todos.filter(function(t){return t.role==='audit'||/合同|风险|问题/.test(t.type);}).slice(0,5).map(function(t){return '<div class="todo-row"><span class="type">'+t.type+'</span><button class="name as-link" onclick="openObject(\''+t.objectId+'\')">'+t.title+'</button><span class="meta">'+t.due+'</span></div>';}).join('')+'</div></section>';
  return shell(content,'审计监督部工作台','聚焦人工复核、风险监督、整改销账和跨系统回传证据。');
}

function auditPage(key){
  const m=auditModule(key),rows=auditRows(key), statuses=['全部状态'].concat(Array.from(new Set((db.auditCenter[key]||[]).map(function(x){return x.status;}))));
  const stats=statuses.slice(0,4).map(function(s){return '<button class="stat '+(state.auditFilter===s?'active':'')+'" onclick="state.auditFilter=\''+s+'\';render()"><b>'+((db.auditCenter[key]||[]).filter(function(x){return s==='全部状态'||x.status===s;}).length)+'</b><span>'+s+'</span></button>';}).join('');
  const cols=m.columns.map(function(c){return '<th>'+c+'</th>';}).join('');
  const body=rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openAuditDetail(\''+key+'\',\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="openAuditDetail(\''+key+'\',\''+x.id+'\')">'+x.title+'</button></td><td>'+auditColumn(key,x,0)+'</td><td>'+auditColumn(key,x,1)+'</td><td>'+badge(x.status)+'</td><td><button class="link" onclick="openAuditDetail(\''+key+'\',\''+x.id+'\')">'+m.action+'</button></td></tr>';}).join('')||'<tr><td colspan="8"><div class="empty compact">当前筛选条件下暂无记录。</div></td></tr>';
  const content='<div class="stat-row">'+stats+'</div><div class="toolbar"><input value="'+state.auditQuery+'" oninput="state.auditQuery=this.value;state.auditPage=1;render()" placeholder="搜索编号、事项、责任人或状态"><span class="context-label">'+m.subtitle+'</span><span class="spacer"></span><button class="primary" onclick="openAuditCreate(\''+key+'\')">+ '+m.action+'</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>'+m.columns[0]+'</th><th>'+m.columns[1]+'</th><th>'+m.columns[2]+'</th><th>'+m.columns[3]+'</th><th>状态</th><th>操作</th></tr></thead><tbody>'+body+'</tbody></table><div class="pager"><span>共 '+rows.length+' 条 · 查询、统计、操作轨迹与当前结果同步</span></div></div>';
  return shell(content,m.title,m.subtitle);
}
function auditColumn(key,x,i){
  const special={contractReview:[x.party||'—',x.ai||'AI提示待返回'],contractSeal:[x.contractId||'—',x.signed||'—'],contractChange:[x.contractId||'—',x.reason||'—'],contractTermination:[x.contractId||'—',x.reason||'—'],contractPerformance:[x.milestone||'—',x.erp||'—'],compliance:[x.scope||'—',x.version||'—'],legal:[x.owner||'—',x.stage||'—'],riskQuarter:[x.suggestion||'—',x.level||'待确认'],riskRectify:[x.riskId||'—',x.owner||'—'],riskFeedback:[x.owner||'—',(x.progress||0)+'%'],riskEvent:[x.level||'—',x.reportTo||'—'],auditRectify:[x.owner||'—',x.due||'—'],procurement:[x.srm||'—',x.node||'—'],procurementRectify:[x.owner||'—',x.due||'—']};
  if(key==='contractTemplate')return i===0?(x.scope||'—'):(x.version||'—');
  return (special[key]||[x.owner||'—',x.due||'—'])[i];
}
function getAuditItem(key,id){return (db.auditCenter[key]||[]).find(function(x){return x.id===id;});}
function openAuditDetail(key,id){
  if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.open(key,id);
  const m=auditModule(key),x=getAuditItem(key,id),isFeedback=/riskFeedback|auditRectify|procurementRectify/.test(key),isRisk=key==='riskQuarter',external=key==='contractPerformance'||key==='procurement';
  const flow=['发起/登记',isRisk?'人工评估':'责任处理',isFeedback?'反馈与佐证':'审核确认',isFeedback?'审计复核':'归档/回传'].map(function(n,i){let s=i===0?'已完成':i===1&&x.status!=='已关闭'&&x.status!=='已销账'?'处理中':'待办理';if(x.status==='待复核'&&i===2)s='处理中';if(x.status==='已关闭'||x.status==='已销账')s='已完成';return '<div class="node '+(s==='已完成'?'done':s==='处理中'?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+n+'</p><span>'+s+'</span></div>';}).join('');
  const infoHtml=info('责任部门/人',x.owner)+info('当前状态',badge(x.status))+info('完成时限',x.due||'—')+info('关联对象',x.contractId||x.riskId||x.rectifyId||x.srm||'—')+info('附件证据',x.files.length+' 份')+info('操作轨迹',x.audit.length+' 条');
  const evidence='<section class="card top-gap"><div class="card-h"><h2>附件与操作审计</h2><span class="meta">刷新后恢复演示基线</span></div><div class="split"><div class="file-list">'+x.files.map(function(f){return '<div class="file-row"><b>'+f.name+'</b><span>'+f.version+' · '+f.time+'</span></div>';}).join('')+'</div>'+auditList(x.audit)+'</div></section>';
  let action='<button class="primary" onclick="advanceAuditItem(\''+key+'\',\''+id+'\')">'+m.action+'</button>';
  if(key==='contractReview')action='<button class="primary" onclick="openContractReviewFromAudit(\''+id+'\')">打开AI人工复核</button>';
  if(isRisk&&x.status==='待人工评估')action='<button class="primary" onclick="advanceAuditItem(\''+key+'\',\''+id+'\')">人工确认等级并下发整改</button>';
  if(isFeedback||key==='auditRectify'||key==='procurementRectify')action='<button class="secondary" onclick="auditFeedback(\''+key+'\',\''+id+'\')">提交反馈 / 延期</button><button class="primary" onclick="auditClose(\''+key+'\',\''+id+'\')">审计复核关闭</button>';
  if(external)action='<button class="primary" onclick="go(\''+(key==='contractPerformance'?'erp':'srm')+'\');closeModal()">查看外部系统回传</button>';
  openModal(x.id+' · '+x.title,'<div class="detail-head"><div class="detail-kicker">'+m.group+' / '+m.label+'</div><h2>'+x.title+'</h2><div class="detail-badges">'+badge(x.status)+'</div></div><div class="info-grid">'+infoHtml+'</div><section class="card top-gap"><div class="card-h"><h2>流程轨迹</h2><span class="meta">OA流程模拟</span></div><div class="flow detailed">'+flow+'</div></section>'+evidence,'<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);
}
function openAuditCreate(key){if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.create(key);const m=auditModule(key);openModal('发起 '+m.label,'<div class="form-grid"><div class="field full"><label>事项主题 <em>*</em></label><input id="auditTitle" value="'+m.label+'示例事项"></div><div class="field"><label>责任部门/人</label><select id="auditOwner"><option>审计监督部 / 陈欣悦</option><option>采购部 / 赵倩</option><option>生产管理部 / 刘强</option></select></div><div class="field"><label>完成期限</label><input id="auditDue" type="date" value="2026-08-31"></div><div class="field full"><label>说明</label><textarea id="auditNote">当前会话创建，提交后生成台账、附件和操作审计；刷新恢复演示基线。</textarea></div><div class="field full"><label>附件</label><div class="upload-box">'+m.label+'_材料.pdf<span>已模拟上传 · 当前会话可见</span></div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="saveAuditCreate(\''+key+'\')">提交并生成台账</button>');}
function saveAuditCreate(key){const title=$('#auditTitle').value.trim();if(!title){toast('请填写事项主题');return;}const m=auditModule(key),rows=db.auditCenter[key],x=auditRecord(m.prefix+'-N'+String(rows.length+1).padStart(3,'0'),title,$('#auditOwner').value,'待办理',{due:$('#auditDue').value});audit(x,'发起'+m.label,$('#auditNote').value);rows.unshift(x);closeModal();render();toast('已生成台账、附件和操作轨迹');}
function openContractReviewFromAudit(id){const x=getAuditItem('contractReview',id);closeModal();if(x.contractId){showContract(x.contractId);setContractTab('ai');}else{toast('该合同评审记录未关联合同详情');}}
function advanceAuditItem(key,id){if(typeof AuditWorkspace!=='undefined')return AuditWorkspace.open(key,id);const x=getAuditItem(key,id);if(!auditCan('处理')){toast('请切换至审计监督部或公司管理层视角办理');return;}if(key==='riskQuarter'){x.status='已评估';x.level=x.suggestion||'中';audit(x,'人工确认风险等级','审计监督部确认最终等级为'+x.level+'风险，并生成风险整改单');const target=db.auditCenter.riskRectify[0];target.status='已下发';}else if(key==='contractSeal'){x.status='已回传';x.signed='签署版 V1.0 已归集';}else{x.status='已办理';}x.files.unshift({name:x.title+'_办理结果.pdf',version:'V1.0',uploader:currentRole().name,time:'2026-08-25 16:45'});audit(x,'提交办理结果','状态、附件与审计轨迹已同步更新');closeModal();render();toast('处理结果已回写台账');}
function auditFeedback(key,id){if(typeof AuditWorkspace!=='undefined'){AuditWorkspace.open(key,id);return AuditWorkspace.feedback();}const x=getAuditItem(key,id);if(!auditCan('反馈')&&!['owner','audit','manager'].includes(state.role)){toast('当前角色无权提交整改反馈');return;}openModal('提交整改反馈 / 延期申请','<div class="form-grid"><div class="field"><label>整改进度 <em>*</em></label><input id="auditProgress" type="number" min="0" max="100" value="'+(x.progress||60)+'"></div><div class="field"><label>处理方式</label><select id="auditFeedbackType"><option>提交整改反馈</option><option>申请延期</option></select></div><div class="field full"><label>措施与说明 <em>*</em></label><textarea id="auditFeedbackNote">已完成资料补充与责任核验，提交佐证材料供审计复核。</textarea></div><div class="field full"><label>佐证附件</label><div class="upload-box">整改佐证材料.pdf<span>已模拟上传 · 当前会话可见</span></div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="saveAuditFeedback(\''+key+'\',\''+id+'\')">提交反馈</button>');}
function saveAuditFeedback(key,id){const x=getAuditItem(key,id),p=Number($('#auditProgress').value),note=$('#auditFeedbackNote').value.trim(),type=$('#auditFeedbackType').value;if(!note||p<0||p>100){toast('请填写有效的整改进度与说明');return;}x.progress=p;x.status=type==='申请延期'?'延期待审批':p===100?'待复核':'整改中';x.files.unshift({name:x.title+'_整改佐证.pdf',version:'V1.0',uploader:currentRole().name,time:'2026-08-25 16:50'});audit(x,type,note);closeModal();render();toast('整改进度、状态、附件和审计轨迹已同步');}
function auditClose(key,id){if(typeof AuditWorkspace!=='undefined'){AuditWorkspace.open(key,id);return AuditWorkspace.act('close');}const x=getAuditItem(key,id);if(!['audit','manager'].includes(state.role)){toast('仅审计监督部或公司管理层可复核关闭');return;}if(x.status!=='待复核'||!x.files.length){toast('需先提交完整佐证并进入待复核状态，才能关闭/销账');return;}x.status=key==='auditRectify'||key==='procurementRectify'?'已销账':'已关闭';x.progress=100;x.files.unshift({name:x.title+'_复核结论.pdf',version:'V1.0',uploader:currentRole().name,time:'2026-08-25 16:55'});audit(x,'审计复核关闭','佐证完整，已形成最终复核结论并关闭台账');closeModal();render();toast('已完成审计复核与销账回写');}

function erpPage(){const rows=db.auditCenter.contractPerformance;const content='<div class="role-banner"><div><span class="eyebrow">ERP 模拟系统 · 只读</span><h2>合同履约与付款状态</h2><p>模拟 ERP 回传的合同、履约与付款条件状态；本页不提供付款、结算或凭证操作。</p></div><div class="session-note">数据为 Demo 模拟回传，不代表已连通 ERP。</div></div><div class="table-card"><table><thead><tr><th>序号</th><th>ERP采购订单</th><th>合同编号</th><th>履约里程碑</th><th>付款状态</th><th>同步时间</th><th>OA监督</th></tr></thead><tbody>'+rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td>ERP-PO-202608-144</td><td><button class="link" onclick="go(\'audit-contractPerformance\')">'+x.contractId+'</button></td><td>'+x.milestone+'</td><td>'+badge('待付款条件')+'</td><td>2026-08-25 08:30</td><td><button class="link" onclick="go(\'audit-contractPerformance\')">查看OA台账</button></td></tr>';}).join('')+'</tbody></table></div><section class="card top-gap"><div class="card-h"><h2>回传证据</h2><span class="meta">只读模拟</span></div><div class="info-grid">'+info('来源系统','ERP 合同履约模块')+info('回传单号','ERP-PO-202608-144')+info('最近同步','2026-08-25 08:30')+info('付款处理边界','仅 ERP 财务流程可办理')+'</div></section>';return shell(content,'ERP · 合同履约与付款状态','用于演示跨系统查询和证据回传，不替代 ERP 专业流程。');}
function srmPage(){const rows=db.auditCenter.procurement.concat(db.auditCenter.procurementRectify);const content='<div class="role-banner"><div><span class="eyebrow">SRM 模拟系统 · 只读</span><h2>招采流程与异常状态</h2><p>模拟 SRM 招采节点和异常回传；OA 仅承接监督意见、整改和销账。</p></div><div class="session-note">不提供采购申请、询比价、定标或订单操作。</div></div><div class="table-card"><table><thead><tr><th>序号</th><th>SRM单号</th><th>招采事项</th><th>当前节点 / 异常</th><th>状态</th><th>回传时间</th><th>OA动作</th></tr></thead><tbody>'+rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td>'+ (x.srm||'SRM-RFQ-202608-016')+'</td><td>'+x.title+'</td><td>'+ (x.node||'资质文件异常')+'</td><td>'+badge(x.status)+'</td><td>2026-08-25 09:10</td><td><button class="link" onclick="go(\''+(x.id.indexOf('PSR')===0?'audit-procurementRectify':'audit-procurement')+'\')">查看OA闭环</button></td></tr>';}).join('')+'</tbody></table></div><section class="card top-gap"><div class="card-h"><h2>系统边界</h2><span class="meta">只读模拟</span></div><div class="info-grid">'+info('来源系统','SRM 招采管理模块')+info('专业流程','采购申请、询比价、定标、订单')+info('OA职责','监督意见、整改、复核、销账')+info('回传证据','单号、节点、异常、同步时间')+'</div></section>';return shell(content,'SRM · 招采流程与异常','用于演示招采监督与异常整改的跨系统证据链。');}

function render(){
  const pages={home:homePage,p0:p0Page,contract:contractPage,contractDetail:contractDetailPage,risk:riskPage,admin:adminPage,star:starPage,metric:metricPage,problem:problemPage,problemDetail:problemDetailPage,quality:qualityPage,service:servicePage,hr:hrPage,onboarding:onboardingPage,onboardingDetail:onboardingDetailPage,employee:employeePage,employeeDetail:employeeDetailPage,leave:leavePage,leaveDetail:leaveDetailPage,qualification:qualificationPage,'audit-home':auditHomePage,erp:erpPage,srm:srmPage};
  Object.keys(auditModules).forEach(function(key){pages['audit-'+key]=function(){return auditPage(key);};});
  $('#app').innerHTML=(pages[state.page]||homePage)();
}

/* ===== V1.1 HR 31项功能样例：六域台账、员工自助与脱敏边界 ===== */
state.hrDomain='recruit';
state.hrSampleId='HR-REC-01';
state.hrSampleFilter='全部状态';

const hrDomains=[
  {id:'recruit',name:'招聘、入职与异动',count:5,kicker:'人才进入与组织流动',desc:'从编制需求、拟录用到入职、转正与岗位异动。',tone:'blue'},
  {id:'relation',name:'劳动关系与员工档案',count:6,kicker:'劳动关系全周期',desc:'合同、离职、争议、休养及档案变更归集。',tone:'violet'},
  {id:'attendance',name:'假勤考勤',count:9,kicker:'时间与出勤管理',desc:'假期、加班、调休、出差、排班与考勤确认。',tone:'green'},
  {id:'performance',name:'绩效管理',count:3,kicker:'目标、结果与激励',desc:'绩效计划、结果确认申诉及奖惩回写。',tone:'amber'},
  {id:'compensation',name:'薪酬福利',count:4,kicker:'发放、保障与理赔',desc:'工资条、异议、社保公积金年金与保险理赔。',tone:'rose'},
  {id:'learning',name:'培训与资格',count:4,kicker:'成长与岗位准入',desc:'培训、考试、证照与岗位资格复审。',tone:'teal'}
];
function hrEmployee(id){return db.employees.find(function(x){return x.id===id;});}
function hrCase(id,domain,name,title,employeeId,status,due,fields,selfService,action){
  const e=hrEmployee(employeeId)||{id:'—',name:'待入职候选人',org:'人力资源部',position:'—',manager:'吴欣'};
  return {id:id,domain:domain,name:name,title:title,employeeId:e.id,employee:e.name,org:e.org,position:e.position,owner:'人力资源部 / 吴欣',applicant:selfService?e.name:'吴欣',status:status,due:due,fields:fields,selfService:!!selfService,action:action||'确认处理',files:[{name:title+'_材料清单.pdf',version:'V1.0',uploader:'HR服务台',time:'2026-08-25 09:30'}],audit:[{time:'2026-08-25 09:30',actor:'HR服务台',action:'生成Demo样例',result:'已按本次人力资源蓝图建立业务对象与字段口径'}]};
}
db.hrSamples=[
  hrCase('HR-REC-01','recruit','招聘需求','质量检验员招聘需求申请','EMP-2026-026','待审批','2026-08-28',[['招聘岗位','质量检验员'],['计划编制','2人 / 生产管理部'],['拟到岗日期','2026-09-15'],['需求原因','旺季质量检验产能补充']],false,'提交编制审批'),
  hrCase('HR-REC-02','recruit','拟录用','赵宁拟录用审批','EMP-2026-026','待确认','2026-08-29',[['候选人','赵宁（模拟）'],['拟录用岗位','质量检验员'],['拟定薪档','P3档 · 模拟脱敏'],['背调结论','通过，待发录用通知']],false,'确认拟录用'),
  hrCase('HR-REC-03','recruit','入职协同','张薇入职协同单','EMP-2026-026','处理中','2026-08-25',[['入职日期','2026-08-25'],['岗位资格预检','设备上岗培训待完成'],['协同任务','账号、门禁、劳保、培训、合同'],['异常提示','ERP组织编码补偿已关联IT服务单']],false,'查看入职任务'),
  hrCase('HR-REC-04','recruit','转正','李明试用期转正评估','EMP-2026-018','待审批','2026-09-10',[['试用期限','2025-03-18 至 2025-09-17'],['岗位','经营分析专员'],['评估结论','建议按期转正'],['生效日期','2025-09-18']],false,'确认转正结论'),
  hrCase('HR-REC-05','recruit','人员调配/岗位异动','王晓雨岗位异动申请','EMP-2025-089','待审批','2026-09-01',[['异动类型','岗位调整'],['调出组织','信息工程部 / 应用开发组'],['调入岗位','数据治理工程师'],['任职生效日','2026-09-01']],false,'确认异动'),
  hrCase('HR-LAB-01','relation','劳动合同','李明劳动合同续签管理','EMP-2026-018','待确认','2028-01-17',[['合同编号','LD-2025-0318'],['合同期限','2025-03-18 至 2028-03-17'],['签署方式','电子签署（Demo模拟）'],['归档状态','已归集员工档案']],true,'确认合同信息'),
  hrCase('HR-LAB-02','relation','主动离职','陈杰主动离职申请','EMP-2024-133','待审批','2026-09-05',[['离职日期','2026-09-15'],['离职原因','个人职业发展（模拟）'],['交接清单','设备、工具、现场资料'],['离职面谈','待人力资源确认']],false,'确认离职交接'),
  hrCase('HR-LAB-03','relation','解除/终止','劳动合同到期终止核验','EMP-2024-133','待确认','2027-04-07',[['终止类型','固定期限届满'],['合同到期日','2027-04-07'],['通知状态','提前30日提醒'],['档案影响','待办理离职与社保减员']],false,'确认终止方案'),
  hrCase('HR-LAB-04','relation','投诉申诉与劳动争议','员工关系申诉登记单','EMP-2026-018','处理中','2026-08-30',[['事项类别','绩效结果申诉'],['受理编号','ER-202608-006'],['受理状态','材料核验中'],['处理边界','Demo仅展示登记与处理状态，不构成裁决']],true,'补充申诉材料'),
  hrCase('HR-LAB-05','relation','离岗休养','离岗休养申请及跟踪','EMP-2024-133','待审批','2026-09-03',[['休养类型','病休观察（模拟）'],['起止期间','2026-09-01 至 2026-10-31'],['岗位安排','临时替岗已登记'],['复岗条件','复查结论与岗位适配确认']],false,'确认休养安排'),
  hrCase('HR-LAB-06','relation','档案变更归集','王晓雨员工档案变更归集','EMP-2025-089','已归档','2026-08-24',[['变更事项','紧急联系人、学历证明'],['来源单据','档案变更申请 HRF-202608-018'],['归集目录','员工360 / 来源与变更轨迹'],['核验结论','材料齐全，已归档']],true,'查看归集结果'),
  hrCase('HR-ATT-01','attendance','请假','李明年休假申请','EMP-2026-018','待审批','2026-08-26',[['假别','年休假'],['申请期间','2026-08-24 至 2026-08-26'],['请假时长','3天'],['校验结果','余额、排班和培训冲突校验通过']],true,'提交请假申请'),
  hrCase('HR-ATT-02','attendance','销假','李明销假申请','EMP-2026-018','待确认','2026-08-27',[['原请假单','LV-202608-042'],['实际返岗时间','2026-08-26 09:00'],['需销假时长','1天'],['余额影响','待确认后返还1天年休假']],true,'确认销假'),
  hrCase('HR-ATT-03','attendance','加班','生产旺季加班申请','EMP-2024-133','待审批','2026-08-28',[['加班日期','2026-08-27'],['预计时长','4小时'],['加班事由','设备抢修与试机'],['补偿方式','优先调休']],false,'确认加班'),
  hrCase('HR-ATT-04','attendance','调休','王晓雨调休申请','EMP-2025-089','冲突待调整','2026-08-27',[['调休来源','加班单 OT-202608-011'],['申请时长','0.5天'],['冲突提示','与信息安全复训时间冲突'],['建议处理','调整至复训结束后']],true,'调整调休时间'),
  hrCase('HR-ATT-05','attendance','出差/外出/外勤','供应商现场质量核验外勤申请','EMP-2026-018','待审批','2026-08-29',[['事项类型','外勤'],['外勤地点','成都供应商现场'],['期间','2026-08-29 09:00 至 18:00'],['考勤处理','关联外勤考勤结果']],true,'提交外勤申请'),
  hrCase('HR-ATT-06','attendance','排班调班','印刷一车间调班申请','EMP-2024-133','待确认','2026-08-30',[['原班次','早班'],['调整后班次','中班'],['调整日期','2026-08-30'],['影响校验','岗位资格有效，排班人数满足']],false,'确认调班'),
  hrCase('HR-ATT-07','attendance','补卡','李明考勤补卡申请','EMP-2026-018','待审批','2026-08-21',[['异常日期','2026-08-20'],['异常类型','上班漏卡'],['证明材料','会议签到记录（模拟）'],['考勤影响','待审批后更新日结果']],true,'提交补卡'),
  hrCase('HR-ATT-08','attendance','月度确认','2026年8月考勤月度确认','EMP-2026-018','待确认','2026-08-31',[['考勤周期','2026-08-01 至 2026-08-31'],['异常条数','2条待确认'],['确认人','李明'],['下游影响','薪酬核算取数前置校验']],true,'确认月度考勤'),
  hrCase('HR-ATT-09','attendance','年度查询','李明2026年度假勤查询','EMP-2026-018','已归档','2026-12-31',[['年度年休假','8天可用'],['已休假期','3天'],['加班调休','6小时待使用'],['查询范围','个人年度假勤汇总']],true,'查看年度汇总'),
  hrCase('HR-PER-01','performance','绩效计划','2026年下半年绩效计划','EMP-2026-018','待确认','2026-09-05',[['考核周期','2026年下半年'],['关键目标','经营分析及时性、问题闭环率'],['权重配置','结果70% / 过程30%'],['确认人','周敏 / 李明']],true,'确认绩效计划'),
  hrCase('HR-PER-02','performance','结果确认申诉','李明绩效结果确认与申诉','EMP-2026-018','待确认','2026-12-25',[['绩效周期','2026年上半年'],['结果等级','B+（模拟）'],['确认状态','待员工确认'],['申诉入口','确认后可发起，保留处理轨迹']],true,'确认绩效结果'),
  hrCase('HR-PER-03','performance','奖惩与档案联动','安全生产表彰档案联动','EMP-2024-133','已归档','2026-08-20',[['奖惩类型','安全生产表彰'],['生效日期','2026-08-20'],['档案影响','写入员工360 / 任职与发展轨迹'],['附件','表彰决定.pdf（模拟）']],false,'查看档案联动'),
  hrCase('HR-PAY-01','compensation','工资条发布确认','2026年8月工资条发布确认','EMP-2026-018','待确认','2026-08-31',[['薪酬期间','2026年8月'],['实发金额','¥**，***.**（模拟脱敏）'],['发布状态','已发布，待本人确认'],['保密提示','仅员工本人可查看明细']],true,'确认工资条'),
  hrCase('HR-PAY-02','compensation','薪酬异议','李明薪酬异议申请','EMP-2026-018','处理中','2026-09-03',[['异议类别','加班时长核对'],['涉及期间','2026年8月'],['处理状态','HR核验考勤与薪酬取数中'],['隐私边界','Demo仅展示状态与脱敏金额']],true,'补充异议说明'),
  hrCase('HR-PAY-03','compensation','社保公积金年金','2026年8月社保公积金年金台账','EMP-2025-089','已归档','2026-08-31',[['缴纳期间','2026年8月'],['缴纳状态','已申报（模拟）'],['基数展示','区间脱敏'],['关联档案','员工360 / 福利记录']],true,'查看缴纳记录'),
  hrCase('HR-PAY-04','compensation','生育/工伤/保险理赔','员工保险理赔申请','EMP-2024-133','待审批','2026-09-08',[['理赔类型','意外伤害保险（模拟）'],['申请日期','2026-08-25'],['材料状态','医疗证明待补齐'],['处理边界','Demo不展示医学和真实理赔信息']],false,'核验理赔材料'),
  hrCase('HR-LRN-01','learning','培训实施','质量检验岗位培训实施','EMP-2026-026','处理中','2026-08-25',[['培训课程','印刷包装质量检验基础'],['培训期间','2026-08-22 至 2026-08-25'],['参训对象','张薇 / 新入职'],['结果影响','完成后写入岗位资格']],false,'登记培训完成'),
  hrCase('HR-LRN-02','learning','考试成绩','质量检验上岗考试成绩','EMP-2026-026','待确认','2026-08-25',[['考试名称','质量检验上岗考试'],['成绩','88分（模拟）'],['合格标准','80分'],['关联培训','TR-202608-021']],false,'确认考试成绩'),
  hrCase('HR-LRN-03','learning','证照','陈杰低压电工作业证续期','EMP-2024-133','预警','2026-09-10',[['证照名称','低压电工作业证'],['到期日期','2026-09-10'],['复训状态','待报名'],['岗位影响','证照失效不可安排相关作业']],false,'发起证照续期'),
  hrCase('HR-LRN-04','learning','岗位资格准入/复审','设备操作员岗位资格复审','EMP-2024-133','待复审','2026-09-05',[['岗位','设备维修工'],['准入规则','有效证照 + 安全培训'],['复审结论','待复审'],['关联档案','员工360 / 培训与资格']],false,'完成资格复审')
];

function hrDomain(id){return hrDomains.find(function(x){return x.id===id;});}
function hrSample(id){return db.hrSamples.find(function(x){return x.id===id||x.id===state.hrSampleId;});}
function visibleHrSamples(){return db.hrSamples.filter(function(x){return state.role!=='employee'||(x.selfService&&x.employeeId==='EMP-2026-018');});}
function hrDomainSamples(id){return visibleHrSamples().filter(function(x){return x.domain===id&&(state.hrSampleFilter==='全部状态'||x.status===state.hrSampleFilter);});}
function canHandleHrSample(x){return state.role==='hr'||state.role==='manager'||(state.role==='employee'&&x.selfService&&x.employeeId==='EMP-2026-018');}
function showHrDomain(id){state.hrDomain=id;state.hrSampleFilter='全部状态';go('hrDomain');}
function showHrSample(id){state.hrSampleId=id;go('hrSample');}
function hrStatuses(rows){return [['全部状态',rows.length],['待审批',rows.filter(function(x){return x.status==='待审批';}).length],['处理中',rows.filter(function(x){return x.status==='处理中';}).length],['预警',rows.filter(function(x){return x.status==='预警'||x.status==='待复审';}).length],['已归档',rows.filter(function(x){return x.status==='已归档';}).length]];}
function hrDomainCards(active){return '<div class="hr-domain-grid">'+hrDomains.map(function(d){const count=visibleHrSamples().filter(function(x){return x.domain===d.id;}).length;return '<button class="hr-domain-card '+(active===d.id?'active':'')+' '+d.tone+'" onclick="showHrDomain(\''+d.id+'\')"><span>'+d.kicker+'</span><strong>'+count+'</strong><h2>'+d.name+'</h2><p>'+d.desc+'</p><small>进入业务工作台 →</small></button>';}).join('')+'</div>';}
function hrSampleTable(rows){return '<div class="table-card hr-sample-table"><table><thead><tr><th>序号</th><th>功能编号</th><th>功能项</th><th>样例单据</th><th>关联员工</th><th>责任人</th><th>期限</th><th>状态</th></tr></thead><tbody>'+rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="showHrSample(\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="showHrSample(\''+x.id+'\')">'+x.name+'</button></td><td>'+x.title+'</td><td>'+(x.employeeId==='—'?x.employee:'<button class="link" onclick="showEmployee(\''+x.employeeId+'\')">'+x.employee+'</button>')+'</td><td>'+x.owner+'</td><td>'+x.due+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')+'</tbody></table><div class="pager"><span>共'+rows.length+'项 · 当前角色可见范围内的功能样例</span></div></div>';}
function hrPage(){const visible=visibleHrSamples(),pending=visible.filter(function(x){return ['待审批','待确认','处理中','待复审','预警'].includes(x.status);}).length;const selfHint=state.role==='employee'?'当前仅显示本人可办理的自助事项':'当前为'+currentRole().label+'视角，可查看31项人力资源功能样例';const content='<div class="role-banner hr-banner"><div><span class="eyebrow">人力资源中心 · 31项功能样例</span><h2>员工全生命周期与六大业务域统一呈现</h2><p>招聘、劳动关系、假勤、绩效、薪酬福利、培训资格均围绕员工编号、状态、证据与归档组织。</p></div><div class="session-note">'+selfHint+'<br>所有数据为Demo模拟，刷新后恢复基线。</div></div><div class="stat-row"><button class="stat active" onclick="go(\'hrCatalog\')"><b>'+visible.length+'</b><span>当前可见功能项</span></button><button class="stat" onclick="go(\'hrCatalog\')"><b>6</b><span>业务域</span></button><button class="stat" onclick="go(\'hrCatalog\')"><b>'+pending+'</b><span>待处理 / 预警</span></button><button class="stat" onclick="go(\'employee\')"><b>'+db.employees.length+'</b><span>关联员工档案</span></button></div>'+hrDomainCards('')+'<section class="card top-gap"><div class="card-h"><div><h2>演示口径与历史字段参考</h2><span class="meta">以蓝图设计为主，老OA仅用于补充通用单据字段习惯</span></div><button class="secondary" onclick="go(\'hrCatalog\')">查看31项台账</button></div><div class="info-grid">'+info('可复用字段','编号、申请人、部门、经办人、日期、责任人、附件与归档')+info('本次补强','员工关联、状态、时限、来源、审计轨迹与跨模块回看')+info('敏感数据','薪酬、社保、争议及证件均采用模拟或脱敏展示')+'</div></section>';return shell(content,'人力资源工作台','以业务对象而非老OA表单堆叠方式呈现31项功能样例。');}
function hrCatalogPage(){const rows=visibleHrSamples();const content='<div class="period-bar"><div><span class="eyebrow">人力资源功能目录</span><b>六大业务域 · '+rows.length+'项当前可见功能样例</b><small>点击业务域进入独立工作台；点击功能项查看字段、流程、关联对象与操作轨迹。</small></div><div>'+badge('Demo模拟边界')+'</div></div>'+hrDomainCards('')+hrSampleTable(rows);return shell(content,'31项人力资源功能样例','以统一配置维护功能编号、角色范围、样例单据、字段、流程和证据。');}
function hrDomainPage(){const d=hrDomain(state.hrDomain)||hrDomains[0],all=visibleHrSamples().filter(function(x){return x.domain===d.id;}),rows=hrDomainSamples(d.id),stats=hrStatuses(all);const content='<div class="domain-hero '+d.tone+'"><span>'+d.kicker+'</span><h2>'+d.name+'</h2><p>'+d.desc+'</p><small>本域共 '+all.length+' 项功能样例 · 当前展示 '+rows.length+' 项</small></div>'+hrDomainCards(d.id)+'<div class="stat-row">'+stats.map(function(x){return '<button class="stat '+(state.hrSampleFilter===x[0]?'active':'')+'" onclick="state.hrSampleFilter=\''+x[0]+'\';render()"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')+'</div><div class="toolbar"><span class="context-label">台账字段引用老OA常用的编号、申请人、部门、经办人、日期、附件和归档信息，并补齐关联员工、状态、时限及审计。</span><span class="spacer"></span><button class="secondary" onclick="go(\'hrCatalog\')">返回31项目录</button></div>'+hrSampleTable(rows);return shell(content,d.name,'本业务域页面采用台账—详情—关联对象—审计轨迹的统一演示结构。');}
function hrFlow(x){const current=x.status==='已归档'?3:x.status==='处理中'?2:x.status==='待审批'||x.status==='待确认'||x.status==='待复审'||x.status==='预警'?1:2;const nodes=[['发起登记',x.applicant],['业务核验',x.owner],['HR处理',x.owner],['归集回写','HR服务台']];return '<section class="card"><div class="card-h"><h2>处理流程</h2><span class="meta">当前节点与处理人可回看</span></div><div class="flow detailed">'+nodes.map(function(n,i){const s=i<current?'已完成':i===current?'处理中':'待办理';return '<div class="node '+(s==='已完成'?'done':s==='处理中'?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+n[0]+'</p><b>'+n[1]+'</b><span>'+s+'</span></div>';}).join('')+'</div></section>';}
function hrSamplePage(){const x=hrSample();if(!x){state.hrSampleId='HR-REC-01';x=hrSample();}const e=hrEmployee(x.employeeId),can=canHandleHrSample(x);const common=[['单据编号',x.id],['申请人',x.applicant],['所属部门',x.org],['经办人',x.owner],['当前状态',badge(x.status)],['处理期限',x.due]].concat(x.fields);const related=e?'<button class="link" onclick="showEmployee(\''+e.id+'\')">'+e.id+' · '+e.name+' / '+e.org+' / '+e.position+'</button>':'候选人信息将在拟录用确认后建立员工预档案';const auditRows=x.audit.map(function(a){return '<div class="audit-row"><time>'+a.time+'</time><div><b>'+a.actor+' · '+a.action+'</b><small>'+a.result+'</small></div></div>';}).join('');const content='<button class="back-link" onclick="showHrDomain(\''+x.domain+'\')">← 返回'+hrDomain(x.domain).name+'</button><div class="detail-head hr-sample-head"><div class="detail-kicker">'+x.id+' · '+hrDomain(x.domain).kicker+'</div><h1>'+x.name+' <strong>'+x.title+'</strong></h1><div class="detail-meta"><span>关联员工：'+x.employee+'</span><span>责任人：'+x.owner+'</span><span>到期：'+x.due+'</span></div><div class="detail-badges">'+badge(x.status)+'<span class="version-chip">Demo模拟数据</span></div></div><div class="context-tip"><b>数据边界：</b>本页使用模拟与脱敏数据；老OA仅参考通用单据字段，当前状态、关联员工、时限、来源、审计和归档口径以本次蓝图设计为准。</div><div class="split"><section class="card"><div class="card-h"><h2>业务信息</h2><span class="meta">字段按场景选择，不复刻老OA大表单</span></div><div class="info-grid">'+common.map(function(f){return info(f[0],f[1]);}).join('')+'</div></section><section class="card"><div class="card-h"><h2>关联档案 / 台账</h2><span class="meta">同一员工编号下可回看</span></div><div class="sample-relation"><div><span>员工对象</span><b>'+related+'</b></div><div><span>附件证据</span><b>'+x.files[0].name+'</b><small>'+x.files[0].version+' · '+x.files[0].uploader+' · '+x.files[0].time+'</small></div><div><span>模拟边界</span><b>刷新后恢复基线</b><small>不触发真实薪酬、电子签、社保或外部人社接口</small></div></div></section></div>'+hrFlow(x)+'<section class="card top-gap"><div class="card-h"><h2>操作轨迹</h2><span class="meta">'+x.audit.length+'条</span></div><div class="audit-list">'+auditRows+'</div></section>';const action='<button class="secondary" onclick="showHrDomain(\''+x.domain+'\')">返回台账</button><button class="primary" '+(!can?'disabled':'')+' onclick="processHrSample(\''+x.id+'\')">'+x.action+'</button>';return shell(content,x.name,'业务信息、流程、关联档案与审计轨迹统一呈现。',action);}
function processHrSample(id){const x=hrSample(id);if(!canHandleHrSample(x)){toast('当前角色无权处理该样例；请切换至人力资源部、公司管理层或关联员工视角。');return;}const before=x.status;if(['待审批','待确认','待复审','预警'].includes(x.status))x.status='已确认';else if(x.status==='处理中')x.status='已归档';else x.status='已归档';audit(x,x.action,'状态 '+before+' → '+x.status+'；已保留处理人、时间、附件和关联员工编号。');db.todos=db.todos.filter(function(t){return t.objectId!==x.id;});db.messages.unshift({id:'MSG-'+x.id,title:x.name+'样例已'+x.status,time:'10:45',read:false,objectId:x.id});closeModal();render();toast('样例状态、审计轨迹和消息提醒已同步更新；刷新后恢复Demo基线。');}

const groupForPageBeforeHr31=groupForPage;
groupForPage=function(page){if(['hr','hrCatalog','hrDomain','hrSample'].includes(page))return 'hr';return groupForPageBeforeHr31(page);};
renderNav=function(){return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+navGroup('risk','合同 · 风险 · 审计',navButton('contract','合同管理中心')+navButton('risk','双源风险与审计'))+navGroup('admin','党政行政',navButton('admin','公文会议与督办'))+navGroup('star','观星台',navButton('star','经营驾驶舱')+navButton('metric','指标下钻与血缘')+navButton('problem','问题闭环中心')+navButton('quality','指标与数据质量'))+navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('hrCatalog','31项功能样例')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));};
render=function(){const pages={home:homePage,p0:p0Page,contract:contractPage,contractDetail:contractDetailPage,risk:riskPage,admin:adminPage,star:starPage,metric:metricPage,problem:problemPage,problemDetail:problemDetailPage,quality:qualityPage,service:servicePage,hr:hrPage,hrCatalog:hrCatalogPage,hrDomain:hrDomainPage,hrSample:hrSamplePage,onboarding:onboardingPage,onboardingDetail:onboardingDetailPage,employee:employeePage,employeeDetail:employeeDetailPage,leave:leavePage,leaveDetail:leaveDetailPage,qualification:qualificationPage};$('#app').innerHTML=(pages[state.page]||homePage)();};
go=function(page){state.page=page;state.navOpen=groupForPage(page);render();window.scrollTo({top:0,behavior:'smooth'});};
const openObjectBeforeHr31=openObject;
openObject=function(id){if(String(id).indexOf('HR-')===0){showHrSample(id);return;}return openObjectBeforeHr31(id);};
render();

/* P1 蓝图设计基线：将现有可点击页面转换为可确认的流程、字段、规则和页面映射。 */
const blueprintCatalog = [
  {
    id:'metric', no:'01', name:'指标全生命周期', owner:'经营发展部', mode:'独立主场景', target:'metric', object:'经营指标 / MET-002',
    flow:['指标提出','口径评审','来源绑定','质量校验','版本发布','预警监测','影响回看'],
    states:['草稿','评审中','待发布','已生效','已停用'],
    rules:['指标编码和版本必须唯一；历史会议及问题继续引用原版本。','发布前必须完成责任人、统计周期、来源血缘和质量规则校验。','口径或来源变更时，必须提示驾驶舱、会议快照及关联问题的下游影响。'],
    fields:[
      ['基本信息','指标编码','只读文本','可见/必填','唯一；发布后不可修改','观星台指标目录','经营部维护，全部角色可见'],
      ['基本信息','指标名称','单行文本','必填','2—40字；同层级不重名','业务提出','经营部编辑，管理层可见'],
      ['口径定义','计算公式','公式/多行文本','必填','引用已注册字段；禁止空分母','业务口径评审','经营部与数据责任人协同'],
      ['责任信息','责任部门/责任人','组织/人员选择','必填','人员须属于责任部门','组织主数据','经营部设置，责任部门确认'],
      ['来源血缘','源系统/表/字段','血缘选择','必填','ERP/MES/QMS已注册资产','数据资产目录','信息工程部维护，只读展示'],
      ['发布信息','指标版本','系统生成','可见','V主版本.次版本；不可重复','观星台版本服务','发布审批后生成'],
      ['预警配置','阈值与方向','数字+枚举','条件必填','百分比0—100；支持高/低阈值','业务规则配置','经营部配置，管理层审批']
    ],
    pages:[['PAGE-STAR-01','指标目录','列表','指标状态、责任人和版本同源','metric'],['PAGE-STAR-02','指标详情','详情','①口径 ②血缘 ③质量 ④版本 ⑤下游影响','metric'],['PAGE-STAR-03','指标发布','流程','发布审批与历史版本留痕','metric']]
  },
  {
    id:'collection', no:'02', name:'数据采集与发布', owner:'信息工程部', mode:'独立主场景', target:'collection', object:'采集批次 / BATCH-20260820-03',
    flow:['采集配置','批次执行','记录对账','质量校验','异常处置','数据发布','消费确认'],
    states:['待执行','采集中','校验中','待发布','已发布','执行失败'],
    rules:['每次采集必须保留批次号、来源系统、时间范围、记录数和校验结果。','质量校验未通过的批次不得发布；允许形成影响说明后走例外审批。','发布只改变观星台消费版本，不修改 ERP/MES/QMS 权威业务记录。'],
    fields:[
      ['批次信息','采集批次号','系统生成','可见/必填','BATCH-日期-序号；唯一','采集调度服务','信息工程部可见可执行'],
      ['来源配置','来源系统','枚举','必填','ERP/MES/QMS','接口目录','信息工程部维护'],
      ['来源配置','数据资产','资产选择','必填','仅选择已发布资产','数据资产目录','数据责任人确认'],
      ['执行参数','采集方式','枚举','必填','全量/增量/补采','采集配置','信息工程部维护'],
      ['执行结果','源端/落地记录数','数字','只读','非负整数；差异须解释','采集运行日志','系统回写'],
      ['质量结果','校验得分','百分比','只读','0—100；低于阈值阻断','质量规则引擎','系统回写，可下钻'],
      ['发布信息','发布版本','系统生成','发布后可见','同一资产版本递增','观星台发布服务','审批后生成']
    ],
    pages:[['PAGE-COL-01','采集批次台账','列表','批次、来源、质量和发布状态','collection'],['PAGE-COL-02','批次运行详情','详情','①输入 ②执行 ③校验 ④异常 ⑤输出','collection'],['PAGE-COL-03','发布确认','流程','阻断规则、例外说明和消费对象','collection']]
  },
  {
    id:'meeting', no:'03', name:'会议场景运行', owner:'经营发展部', mode:'独立会议工作区', target:'meeting', object:'经营分析会 / MTG-202608-011',
    flow:['会议建档','冻结快照','议题归集','会议研判','形成决议','生成责任事项','会后跟踪'],
    states:['筹备中','快照已冻结','进行中','待纪要确认','跟踪中','已归档'],
    rules:['会议开始前冻结数据快照，后续实时数据不得覆盖会议依据。','每项决议必须明确责任部门、责任人、期限和是否生成OA任务。','会议决议可发起或关联问题，关闭后回写会议责任事项状态。'],
    fields:[
      ['会议基本信息','会议编号/名称','只读+文本','必填','编号唯一；名称2—60字','会议建档','经营部维护'],
      ['会议基本信息','主持人/参会范围','人员/组织多选','必填','主持人唯一；参会范围非空','组织主数据','经营部维护'],
      ['数据快照','快照编号','系统生成','冻结后必填','一个会议一个主快照','观星台快照服务','冻结后只读'],
      ['议题信息','议题名称/异常说明','文本','必填','议题须关联指标、质量或风险对象','观星台对象中心','议题发起人维护'],
      ['会议决议','决议内容','多行文本','必填','不少于10字','会议研判','主持人确认'],
      ['责任事项','责任部门/人/期限','组织+人员+日期','条件必填','生成OA任务时全部必填','会议决议','经营部设置，责任部门接收'],
      ['联动状态','OA任务编号/同步状态','只读文本','生成后可见','任务编号唯一','OA任务中心','观星台只读跟踪']
    ],
    pages:[['PAGE-MTG-01','会议工作区','工作区','①冻结快照 ②议题池 ③决议 ④责任事项','meeting'],['PAGE-MTG-02','议题研判','详情','异常证据、部门说明和关联对象','meeting'],['PAGE-MTG-03','责任事项跟踪','列表','OA编号、责任人、期限和闭环状态','meeting']]
  },
  {
    id:'problem', no:'04', name:'问题快发闭环', owner:'经营发展部 / OA', mode:'独立闭环主场景', target:'problem', object:'经营问题 / WT-202608-021',
    flow:['异常识别','问题发起','OA分派','原因与措施','进度反馈','复核验收','关闭回写'],
    states:['待分派','待反馈','整改中','待复核','已关闭','已退回'],
    rules:['问题创建必须冻结来源指标、期间、组织、版本和异常证据。','OA承载责任任务表单与协同；观星台仅保存OA编号、状态和结果摘要。','复核关闭必须具备措施、结果、附件和复核意见，关闭后同步更新待办与统计。'],
    fields:[
      ['来源上下文','来源对象/快照','只读关联','可见/必填','必须定位到稳定编号和版本','观星台异常对象','系统带入，不可覆盖'],
      ['问题信息','问题名称/描述','文本','必填','名称2—80字；描述不少于10字','问题发起','发起人维护'],
      ['责任信息','责任部门/责任人','组织+人员','必填','人员须属于责任部门','OA组织主数据','经营部设置，OA同步'],
      ['时限信息','要求完成日期','日期','必填','不得早于发起日','会议决议/人工填写','经营部设置'],
      ['整改反馈','原因/措施/进度','文本+数字','整改时必填','进度0—100；提交复核须为100','OA责任任务','责任部门维护'],
      ['证据材料','整改附件','附件','复核前必传','格式和大小由OA策略控制','OA附件中心','责任部门上传，复核人可见'],
      ['复核信息','结论/意见/归档状态','枚举+文本','关闭时必填','通过/退回；意见不少于5字','OA流程','审计复核，观星台回写']
    ],
    pages:[['PAGE-ISS-01','问题台账','列表','来源、责任、期限、进度和状态','problem'],['PAGE-ISS-02','问题详情','详情','①来源 ②措施 ③OA轨迹 ④附件审计','problem'],['PAGE-ISS-03','整改反馈','表单','责任部门填写并提交复核','problemDetail']]
  },
  {
    id:'quality', no:'05', name:'数据质量闭环', owner:'信息工程部', mode:'独立治理主场景', target:'quality', object:'质量规则 / DQ-202608-006',
    flow:['异常发现','影响分析','分派修复','源端处理','复跑验证','指标恢复','证据归档'],
    states:['异常待修复','修复中','已修复待复跑','复跑失败','正常','例外放行'],
    rules:['质量异常必须关联资产、采集批次、规则版本和受影响指标。','源系统责任部门修复权威数据，观星台触发复跑并保留前后得分。','复跑通过后更新新批次并恢复指标；失败则保留影响说明和再次分派记录。'],
    fields:[
      ['规则信息','规则编号/名称/版本','只读+文本','必填','编号和版本组合唯一','质量规则库','信息工程部维护'],
      ['对象信息','数据资产/字段','资产选择','必填','必须是已登记资产','数据资产目录','信息工程部维护'],
      ['异常上下文','采集批次/异常记录数','只读','可见/必填','批次可追溯；数量非负','采集运行日志','系统回写'],
      ['影响分析','受影响指标/页面','关联多选','必填','至少一个影响对象或无影响说明','血缘分析','系统建议，人工确认'],
      ['修复分派','责任部门/人/期限','组织+人员+日期','必填','责任人与资产责任一致','OA任务中心','信息工程部发起'],
      ['复跑结果','新批次/质量得分','只读','复跑后必填','得分0—100；达到阈值才正常','质量引擎','系统回写'],
      ['归档证据','处理说明/附件','文本+附件','关闭时必填','保留修复前后结果','OA/观星台审计','责任部门提交，信息部确认']
    ],
    pages:[['PAGE-DQ-01','质量规则台账','列表','规则、资产、影响、得分、版本和状态','quality'],['PAGE-DQ-02','异常处理详情','弹窗/详情','①资产 ②批次 ③影响 ④审计','quality'],['PAGE-DQ-03','复跑验证','操作链','修复前后得分、批次和指标恢复','quality']]
  },
  {
    id:'risk', no:'06', name:'双源风险采集与闭环', owner:'审计监督部', mode:'独立审计主场景', target:'risk', object:'风险台账 / RSK-202608-014',
    flow:['人工上报/AI候选','相似度匹配','人工核实','去重合并','风险定级','OA整改','复核销账'],
    states:['待核实','已驳回','整改中','待复核','已关闭'],
    rules:['人工上报与AI候选分别保留来源编号、时间、批次、规则版本和原始证据。','去重合并必须由审计人员核实，历史来源记录不得删除。','定级后生成OA整改任务；销账必须保留措施、附件、复核意见和原规则版本。'],
    fields:[
      ['风险信息','风险编号/名称','系统生成+文本','必填','编号唯一；名称2—80字','风险对象中心','审计维护'],
      ['人工来源','上报编号/部门/日期','只读关联','人工来源可见','稳定编号可追溯','人工风险上报','原样保留'],
      ['AI来源','批次/规则版本/证据','只读关联','AI来源可见','批次与版本组合可追溯','AI风险识别','原样保留'],
      ['核实信息','相似度/合并结论','百分比+枚举','必填','0—100；合并/独立/误报','风险核实','审计确认'],
      ['定级信息','风险等级/影响说明','枚举+文本','必填','高/中/低；高风险说明必填','风险评估','审计维护'],
      ['整改任务','OA编号/责任人/期限','只读+关联','定级后必填','OA任务编号唯一','OA任务中心','OA承载，观星台跟踪'],
      ['销账信息','结论/证据/归档','文本+附件','关闭时必填','复核意见和附件齐全','OA流程/审计日志','审计复核']
    ],
    pages:[['PAGE-RSK-01','双源风险台账','列表','人工/AI来源关系、等级、责任和状态','risk'],['PAGE-RSK-02','风险核实','详情','①双源证据 ②去重结论 ③定级 ④审计','risk'],['PAGE-RSK-03','整改销账','流程','OA任务、措施、证据和复核结论','risk']]
  },
  {
    id:'ruleLab', no:'07', name:'AI风险规则优化', owner:'审计监督部 / 信息工程部', mode:'独立规则工作台', target:'ruleLab', object:'风险规则 / RISK-RULE-2026.08.3',
    flow:['命中取样','人工标注','反馈归集','生成草案','样本回测','审批发布','版本监控'],
    states:['草稿','待回测','回测中','待审批','已生效','历史版本'],
    rules:['确认、误报和漏报反馈必须关联命中证据、标注人和原规则版本。','新规则发布前必须完成固定样本回测，并展示命中率与确认率前后对比。','发布新版本不重算历史风险；历史风险继续引用创建时规则版本。'],
    fields:[
      ['规则信息','规则编号/名称/版本','只读+文本','必填','编号稳定；版本递增','AI规则库','审计与信息部协同'],
      ['规则内容','适用对象/条件/阈值','枚举+规则编辑器','必填','对象已登记；阈值在有效范围','规则配置','信息工程部维护'],
      ['命中证据','对象/证据片段/得分','只读','反馈时可见','必须关联稳定业务对象','AI识别结果','不可覆盖'],
      ['人工反馈','确认结论/原因','枚举+文本','必填','确认/误报/漏报；原因不少于5字','人工标注','审计维护'],
      ['回测结果','样本数/命中率/确认率','只读数字','回测后必填','样本数大于0；百分比0—100','回测引擎','系统回写'],
      ['审批信息','审批人/意见/时间','只读流程','发布前必填','通过后才能生效','OA审批','授权角色审批'],
      ['版本信息','生效日期/替代版本','日期+关联','发布后可见','生效日期不早于审批日','AI规则库','历史引用保持不变']
    ],
    pages:[['PAGE-AIR-01','风险规则工作台','工作台','版本、状态、命中和确认率','ruleLab'],['PAGE-AIR-02','人工反馈池','列表','命中证据、确认/误报标注','ruleLab'],['PAGE-AIR-03','回测与发布','流程','前后指标对比、审批和版本留痕','ruleLab']]
  }
];

function blueprintItem(){return blueprintCatalog.find(function(x){return x.id===state.blueprintLine;})||blueprintCatalog[0];}
function setBlueprintLine(id){state.blueprintLine=id;state.page='blueprint';render();window.scrollTo({top:0,behavior:'smooth'});}
function openReleaseInfo(){
  openModal('Demo 版本信息 · '+DEMO_RELEASE.version,
    '<div class="release-panel"><div>'+info('当前版本',DEMO_RELEASE.version)+info('已保留基线','demo-v1.2.0-p1 / '+DEMO_RELEASE.baseline)+info('发布日期',DEMO_RELEASE.releasedAt)+info('本版范围',DEMO_RELEASE.scope)+'</div><div class="audit-note"><b>演示数据边界</b><p>全部业务数据和接口动作均为静态 Demo 模拟；会话内操作可见，刷新后恢复基线，不代表生产系统已经联通。</p></div><div class="version-timeline"><div><b>V1.4.0-IT</b><span>SOW 2.1.7：10条原文流程名称、专属字段与工作页、审批执行验证闭环、授权、补偿及同源结果；仅本地验收。</span></div><div><b>V1.3.0-AUDIT</b><span>SOW 2.1.6：15条专属流程、11项控制、统一合同与风险关联、PDF及模拟回传；本轮仅本地验收。</span></div><div><b>V1.2.0-P1</b><span>新增蓝图映射、字段规格、规则状态、权限矩阵和模板复用声明。</span></div><div><b>V1.1.0-P0</b><span>发布目录同步，并通过核心闭环浏览器验收。</span></div></div></div>',
    '<button class="primary" onclick="closeModal()">知道了</button>',true);
}
function blueprintPage(){
  const x=blueprintItem();
  const lineButtons=blueprintCatalog.map(function(a){return '<button class="blueprint-line '+(a.id===x.id?'active':'')+'" onclick="setBlueprintLine(\''+a.id+'\')"><span>'+a.no+'</span><b>'+a.name+'</b><small>'+a.object+'</small></button>';}).join('');
  const flow=x.flow.map(function(s,i){return '<div class="blueprint-step"><span>'+(i+1)+'</span><b>'+s+'</b></div>'+(i<x.flow.length-1?'<i>→</i>':'');}).join('');
  const fields=x.fields.map(function(f,i){return '<tr><td>'+(i+1)+'</td>'+f.map(function(v){return '<td>'+v+'</td>';}).join('')+'</tr>';}).join('');
  const rules=x.rules.map(function(r,i){return '<li><b>BR-'+x.no+'-'+String(i+1).padStart(2,'0')+'</b><span>'+r+'</span></li>';}).join('');
  const states=x.states.map(function(s,i){return '<span class="blueprint-state '+(i===0?'start':i===x.states.length-1?'end':'')+'">'+s+'</span>'+(i<x.states.length-1?'<i>→</i>':'');}).join('');
  const pages=x.pages.map(function(p,i){return '<article><span>'+p[0]+'</span><h3>'+p[1]+'</h3><b>'+p[2]+' · '+x.mode+'</b><p>'+p[3]+'</p><button class="secondary" onclick="go(\''+p[4]+'\')">打开对应页面</button></article>';}).join('');
  const content=`
    <div class="blueprint-hero"><div><span class="eyebrow">${DEMO_RELEASE.version} · 蓝图设计基线</span><h2>从可点击 Demo 到可确认的详细设计</h2><p>每条主线统一沉淀流程、字段、业务规则、状态、权限和页面编号；技术表名、接口地址及生产权限仍在详细设计阶段确认。</p></div><button class="secondary" onclick="openReleaseInfo()">版本与基线</button></div>
    <div class="blueprint-boundary"><b>跨系统权威边界</b><span>ERP / MES / QMS：专业业务与权威数据</span><i>→</i><span>观星台：汇聚、分析、识别与跟踪</span><i>→</i><span>OA：责任协同、整改、验收与归档</span></div>
    <div class="blueprint-layout"><aside class="blueprint-lines">${lineButtons}</aside><div class="blueprint-main">
      <section class="card blueprint-summary"><div><span>${x.no} · ${x.owner}</span><h2>${x.name}</h2><p>主对象：${x.object}　·　页面实现：${x.mode}</p></div><button class="primary" onclick="go('${x.target}')">进入演示页面</button></section>
      <section class="card top-gap"><div class="card-h"><h2>业务流程</h2><span class="meta">正常主流程；退回、失败和例外在规则中明确</span></div><div class="blueprint-flow">${flow}</div></section>
      <section class="card top-gap"><div class="card-h"><h2>字段规格明细</h2><span class="meta">详细设计确认口径</span></div><div class="table-card blueprint-field-table"><table><thead><tr><th>序号</th><th>页面区域</th><th>字段名称</th><th>控件/类型</th><th>必填/可见</th><th>值域/校验规则</th><th>数据来源</th><th>联动/权限</th></tr></thead><tbody>${fields}</tbody></table></div></section>
      <div class="split top-gap"><section class="card"><div class="card-h"><h2>重点业务规则</h2><span class="meta">稳定编号便于评审追踪</span></div><ol class="blueprint-rules">${rules}</ol></section><section class="card"><div class="card-h"><h2>状态流与角色权限</h2><span class="meta">状态决定可执行动作</span></div><div class="blueprint-states">${states}</div><div class="role-matrix"><div><b>公司管理层</b><span>查看态势、决策与审批</span></div><div><b>经营发展部</b><span>组织分析、会议与问题发起</span></div><div><b>责任部门</b><span>确认数据、提交措施与证据</span></div><div><b>审计监督部</b><span>风险核实、复核与销账</span></div><div><b>信息工程部</b><span>采集、质量、版本与运行保障</span></div></div></section></div>
      <section class="card top-gap"><div class="card-h"><h2>页面编号与讲解标注</h2><span class="meta">编号用于蓝图截图和评审意见定位</span></div><div class="blueprint-pages">${pages}</div></section>
      <section class="card top-gap template-disclosure"><div class="card-h"><h2>模板复用声明</h2><span class="meta">避免把覆盖性 Demo 误认为全部完成个性化详细设计</span></div><div><p><b>人力资源部 31 项：</b>共用“台账—详情—流程—附件”页面骨架，具体字段与校验按子模块确认。</p><p><b>审计监督部 15 项：</b>共用审计事项模板，合同、风险、整改等代表性主线已做独立页面。</p><p><b>党政综合办 29 项：</b>共用工作中心模板，会议督办与销号归档作为代表性闭环。</p></div></section>
    </div></div>`;
  return shell(content,'蓝图设计基线','按流程、字段、业务逻辑和页面四个维度核对当前 Demo。','<button class="secondary" onclick="go(\'starOverview\')">返回观星台全景</button>');
}

/* ===== 观星台 V2：七条主线、经营分析会与规则优化 ===== */
state.meetingTab='agenda';
state.starBatchFilter='全部';

db.starCenter={
  batches:[
    {id:'COL-20260820-01',name:'8月经营主题增量采集',sources:'ERP / MES / QMS',time:'08:00–08:20',records:'12,486 条',quality:'99.8%',status:'已发布',version:'PUB-20260820-01',note:'完成主数据匹配、质量校验和指标计算。'},
    {id:'COL-20260825-01',name:'生产报工质量复跑',sources:'MES / QMS',time:'10:30–10:42',records:'3,286 条',quality:'100%',status:'已发布',version:'PUB-20260825-01',note:'组织编码缺失修复后复跑，已解除受影响指标的数据质量提示。'},
    {id:'COL-20260826-01',name:'供应链风险候选采集',sources:'ERP / SRM / AI',time:'待运行',records:'—',quality:'待校验',status:'待发布',version:'—',note:'仅生成候选风险与批次日志，需人工核实后进入风险台账。'}
  ],
  meeting:{id:'MTG-202608-011',title:'2026年8月经营分析会',period:'2026年8月',snapshot:'STAR-SNAPSHOT-202608-01',status:'进行中',host:'经营发展部 / 周敏',heldAt:'2026-08-20 09:00',agenda:[
    {id:'AGD-01',title:'产值完成率低于计划 6.2%',metricId:'MET-002',org:'生产管理部',finding:'两台模切设备停机，重点订单换版次数增加。',decision:'调整排产并完成二号模切机专项点检。',status:'已形成决议',problemId:'WT-202608-021'},
    {id:'AGD-02',title:'生产报工组织编码缺失',metricId:'MET-002',org:'信息工程部',finding:'3 条报工记录未匹配组织编码，影响产值归集。',decision:'完成数据修复后复跑质量校验。',status:'已闭环',problemId:'DQ-202608-003'},
    {id:'AGD-03',title:'供应商交付波动风险',metricId:'MET-003',org:'采购部',finding:'供应商交付预警与人工风险上报存在同一业务键。',decision:'合并双源证据，审计监督部人工定级。',status:'待分派',riskId:'RSK-202608-014'}
  ],actions:[
    {id:'ACT-01',title:'提交产值追回进展',owner:'生产管理部 / 刘强',due:'2026-08-25',status:'整改中',objectId:'WT-202608-021',type:'问题整改'},
    {id:'ACT-02',title:'复跑生产报工组织编码质量校验',owner:'信息工程部 / 王晓雨',due:'2026-08-22',status:'已完成',objectId:'DQ-202608-003',type:'数据质量'},
    {id:'ACT-03',title:'核实供应商交付双源风险',owner:'采购部 / 赵倩',due:'2026-08-26',status:'待分派',objectId:'RSK-202608-014',type:'风险核实'}
  ],audit:[{time:'2026-08-20 09:00',actor:'经营发展部 / 周敏',action:'冻结会议数据快照',result:'引用 STAR-SNAPSHOT-202608-01，实时驾驶舱不覆盖会议依据。'}]},
  ruleVersions:[
    {id:'RISK-RULE-2026.08.3',name:'供应商交付与合规风险规则',scope:'采购 / 供应商 / 生产经营',status:'已生效',hit:28,confirmed:'88.6%',effective:'2026-08-01',feedback:12},
    {id:'RISK-RULE-2026.08.4-D',name:'供应商交付波动识别优化草案',scope:'供应商交付延迟 + 质量异常组合',status:'待回测',hit:'—',confirmed:'—',effective:'—',feedback:3}
  ],
  feedback:[
    {id:'FB-001',risk:'RSK-202608-014',signal:'连续两批到货延期 + 质量异常',result:'人工确认',owner:'审计监督部 / 陈欣悦',note:'保留为高风险候选，并纳入组合规则回测。'},
    {id:'FB-002',risk:'RSK-202608-009',signal:'单次交期波动',result:'误报',owner:'采购部 / 赵倩',note:'已确认属已批准的计划调整，不计入风险命中。'},
    {id:'FB-003',risk:'RSK-202608-006',signal:'供应商舆情关键词',result:'待标注',owner:'审计监督部 / 陈欣悦',note:'等待业务核实与证据补充。'}
  ]
};

function starManageable(){return ['operations','audit','manager'].includes(state.role);}
function starOverviewPage(){
  const s=db.starCenter,open=s.meeting.actions.filter(function(x){return x.status!=='已完成';}).length;
  const lines=[
    ['指标全生命周期','metric','3 个指标 · 1 项预警','口径、血缘、质量、发布与下游影响'],
    ['数据采集与发布','collection','3 个采集批次 · 1 个待发布','ERP、MES、QMS 的权威数据汇聚'],
    ['会议场景运行','meeting','1 场经营分析会 · '+open+' 项待办','冻结快照、议题、决议与责任事项'],
    ['问题快发闭环','problem','2 项未关闭','观星台识别，OA 承接整改与验收'],
    ['数据质量闭环','quality','1 项待修复','异常、分派、复跑与指标恢复'],
    ['双源风险采集与闭环','risk','3 条风险台账','人工上报与 AI 候选合并核实'],
    ['AI 风险规则优化','ruleLab','2 个规则版本 · 3 条反馈','人工标注、回测、审批和版本留痕']
  ];
  const content='<div class="star-hero"><div><span class="eyebrow">观星台 · 跨系统经营洞察</span><h2>数据汇聚、指标分析、风险识别与责任闭环</h2><p>ERP、MES、QMS 保持专业与权威数据职责；OA 仅承接责任事项协同、整改、验收和归档。</p></div><div class="session-note">当前：'+currentRole().label+'<br>数据为 Demo 模拟，刷新后恢复基线。</div></div><div class="star-boundary"><b>数据边界</b><span>ERP / MES / QMS：数据权威来源</span><i>→</i><span>观星台：汇聚、分析、识别与跟踪</span><i>→</i><span>OA：责任协同、整改、验收与归档</span></div><div class="star-line-grid">'+lines.map(function(x,i){return '<button class="star-line '+(i===2?'featured':'')+'" onclick="go(\''+x[1]+'\')"><span>0'+(i+1)+'</span><h3>'+x[0]+'</h3><b>'+x[2]+'</b><small>'+x[3]+'</small><em>进入主线 →</em></button>';}).join('')+'</div>';
  return shell(content,'观星台全景','以七条可回看的业务主线组织跨系统经营管理演示。','<button class="secondary" onclick="go(\'blueprint\')">查看蓝图设计基线</button><button class="primary" onclick="go(\'meeting\')">进入经营分析会主线</button>');
}

function collectionPage(){
  const rows=db.starCenter.batches.filter(function(x){return state.starBatchFilter==='全部'||x.status===state.starBatchFilter;});
  const stats=['全部','已发布','待发布'].map(function(s){return '<button class="stat '+(state.starBatchFilter===s?'active':'')+'" onclick="state.starBatchFilter=\''+s+'\';render()"><b>'+db.starCenter.batches.filter(function(x){return s==='全部'||x.status===s;}).length+'</b><span>'+s+'批次</span></button>';}).join('');
  const table=rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><b>'+x.id+'</b><small>'+x.name+'</small></td><td>'+x.sources+'</td><td>'+x.records+'</td><td>'+x.quality+'</td><td>'+x.version+'</td><td>'+badge(x.status)+'</td><td><button class="link" onclick="openBatch(\''+x.id+'\')">查看过程</button></td></tr>';}).join('');
  const content='<div class="period-bar"><div><span class="eyebrow">观星台数据运行</span><b>从采集、校验到发布，保留批次与影响对象</b><small>源系统继续负责业务处理和权威数据；观星台不修改源系统记录。</small></div><div>'+badge('模拟运行')+'</div></div><div class="stat-row">'+stats+'</div><div class="toolbar"><span class="context-label">每次发布均绑定采集范围、质量结果、指标版本和下游使用场景。</span><span class="spacer"></span><button class="primary" onclick="runCollectionBatch()">运行供应链风险采集</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>采集批次</th><th>来源系统</th><th>记录数</th><th>质量结果</th><th>发布版本</th><th>状态</th><th>操作</th></tr></thead><tbody>'+table+'</tbody></table></div>';
  return shell(content,'数据采集与发布','采集批次、质量校验、发布版本和下游影响在同一台账中可追溯。');
}
function openBatch(id){const x=db.starCenter.batches.find(function(b){return b.id===id;});openModal(x.id+' · '+x.name,'<div class="info-grid">'+info('来源系统',x.sources)+info('运行时间',x.time)+info('采集记录',x.records)+info('质量结果',x.quality)+info('发布版本',x.version)+info('当前状态',badge(x.status))+'</div><div class="context-tip"><b>批次说明：</b>'+x.note+'</div><div class="source-chain"><div><b>源系统</b><span>'+x.sources+'</span></div><i>→</i><div><b>质量校验</b><span>完整性、唯一性、业务键匹配</span></div><i>→</i><div><b>主题加工</b><span>经营主题模型 V2.4</span></div><i>→</i><div><b>观星台发布</b><span>'+x.version+'</span></div></div>','<button class="primary" onclick="closeModal()">关闭</button>',true);}
function runCollectionBatch(){if(!starManageable()){toast('仅经营发展部、审计监督部或公司管理层可运行模拟采集。');return;}const x=db.starCenter.batches[2];x.time='2026-08-25 14:00–14:08';x.records='486 条';x.quality='99.6%';x.status='已发布';x.version='PUB-20260825-02';x.note='生成供应商交付风险候选 2 条，等待人工核实，不改变 ERP/SRM 原始数据。';db.messages.unshift({id:'MSG-COL-01',title:'供应链风险采集批次已发布，生成2条待核实候选',time:'14:08',read:false,objectId:x.id});render();toast('采集批次、发布版本和候选风险提示已同步更新。');}

function meetingPage(){
  const m=db.starCenter.meeting,agenda=m.agenda.map(function(a){return '<article class="meeting-agenda"><div><span>'+a.id+' · '+a.org+'</span><h3>'+a.title+'</h3><p>'+a.finding+'</p><b>会议决议：'+a.decision+'</b></div><aside>'+badge(a.status)+'<button class="link" onclick="openMeetingObject(\''+(a.problemId||a.riskId)+'\')">查看关联对象 →</button></aside></article>';}).join('');
  const tasks=m.actions.map(function(a){return '<div class="meeting-task"><div><span>'+a.type+' · OA 联动任务</span><b>'+a.title+'</b><small>'+a.owner+' · 完成期限 '+a.due+'</small></div><div>'+badge(a.status)+'<button class="link" onclick="openMeetingObject(\''+a.objectId+'\')">查看处理</button></div></div>';}).join('');
  const tabs='<div class="tabs"><button class="'+(state.meetingTab==='agenda'?'active':'')+'" onclick="state.meetingTab=\'agenda\';render()">会议议题 <i class="tab-count">'+m.agenda.length+'</i></button><button class="'+(state.meetingTab==='tasks'?'active':'')+'" onclick="state.meetingTab=\'tasks\';render()">责任事项 <i class="tab-count">'+m.actions.length+'</i></button><button class="'+(state.meetingTab==='audit'?'active':'')+'" onclick="state.meetingTab=\'audit\';render()">运行留痕</button></div>';
  let body=state.meetingTab==='agenda'?'<section class="meeting-board">'+agenda+'</section>':state.meetingTab==='tasks'?'<section class="card"><div class="card-h"><h2>OA 联动责任任务</h2><span class="meta">观星台保留上下文，OA 承接协同闭环</span></div><div class="meeting-task-list">'+tasks+'</div></section>':'<section class="card"><div class="card-h"><h2>会议运行与数据快照</h2><span class="meta">'+m.snapshot+'</span></div>'+auditList(m.audit)+'<div class="context-tip"><b>快照规则：</b>会议决策引用冻结快照；驾驶舱实时指标可更新，但不会改写本次会议的原始判断依据。</div></section>';
  const head='<button class="back-link" onclick="go(\'starOverview\')">← 返回观星台全景</button><div class="meeting-hero"><span>'+m.id+' · '+m.period+'</span><h1>'+m.title+'</h1><p>主持：'+m.host+'　·　召开时间：'+m.heldAt+'　·　数据快照：'+m.snapshot+'</p><div>'+badge(m.status)+' <span class="version-chip">冻结依据可回看</span></div></div>';
  return shell(head+tabs+body,'会议场景运行','围绕冻结经营快照形成议题、决议和 OA 联动责任事项。','<button class="primary" onclick="createMeetingAction()">生成会议责任事项</button>');
}
function openMeetingObject(id){if(String(id).indexOf('WT-')===0){showProblem(id);return;}if(String(id).indexOf('DQ-')===0){go('quality');return;}if(String(id).indexOf('RSK-')===0){go('risk');return;}toast('该对象已在对应专业台账中保留。');}
function createMeetingAction(){if(!starManageable()){toast('仅经营发展部、审计监督部或公司管理层可生成会议责任事项。');return;}const m=db.starCenter.meeting,a=m.actions.find(function(x){return x.id==='ACT-03';});if(a.status!=='待分派'){toast('该会议责任事项已生成，可查看关联风险处理。');return;}a.status='待核实';m.agenda[2].status='已分派';m.audit.unshift({time:'2026-08-20 09:35',actor:currentRole().name,action:'生成会议责任事项',result:'已向 OA 推送供应商交付双源风险核实任务 OA-RSK-202608-014。'});db.todos.unshift({id:'OA-RSK-202608-014',objectId:'RSK-202608-014',type:'风险核实',title:'供应商交付波动风险—提交双源核实意见',role:'owner',due:'2026-08-26',status:'待处理'});state.meetingTab='tasks';render();toast('会议决议、OA 责任任务、待办和运行留痕已同步。');}

function ruleLabPage(){
  const rules=db.starCenter.ruleVersions.map(function(r){return '<article class="rule-card '+(r.status==='已生效'?'active':'')+'"><div><span>'+r.id+'</span>'+badge(r.status)+'</div><h3>'+r.name+'</h3><p>'+r.scope+'</p><footer><b>命中 '+r.hit+'</b><b>人工确认率 '+r.confirmed+'</b><small>'+r.feedback+' 条反馈</small></footer></article>';}).join('');
  const feedback=db.starCenter.feedback.map(function(x){return '<div class="feedback-row"><div><b>'+x.risk+' · '+x.signal+'</b><small>'+x.owner+' · '+x.note+'</small></div><div>'+badge(x.result)+(x.result==='待标注'?'<button class="link" onclick="openRuleFeedback(\''+x.id+'\')">完成标注</button>':'')+'</div></div>';}).join('');
  const content='<div class="rule-hero"><div><span class="eyebrow">AI 风险规则治理</span><h2>人工结论驱动规则迭代，历史依据不可覆盖</h2><p>AI 提供候选与命中证据；审计监督部确认结论，规则草案通过回测和审批后才可发布。</p></div><div class="session-note">当前有效规则<br><b>RISK-RULE-2026.08.3</b></div></div><section class="rule-grid">'+rules+'</section><div class="split top-gap"><section class="card"><div class="card-h"><h2>人工反馈池</h2><span class="meta">确认 / 误报 / 待标注</span></div><div class="feedback-list">'+feedback+'</div></section><section class="card"><div class="card-h"><h2>优化闭环</h2><span class="meta">规则版本可追溯</span></div><div class="rule-flow"><span class="done">命中证据</span><i>→</i><span class="done">人工标注</span><i>→</i><span class="current">规则草案</span><i>→</i><span>回测对比</span><i>→</i><span>审批发布</span></div><div class="context-tip">草案回测：预期将供应商交付组合风险的人工确认率由 <b>88.6%</b> 提升至 <b>93.1%</b>，历史风险仍保留原始规则版本。</div></section></div>';
  return shell(content,'AI 风险规则优化','通过人工反馈、规则草案、回测和审批，形成可追溯的 AI 风险治理闭环。','<button class="primary" onclick="advanceRuleDraft()">生成草案并回测</button>');
}
function openRuleFeedback(id){const x=db.starCenter.feedback.find(function(f){return f.id===id;});openModal('人工标注 · '+x.risk,'<div class="info-grid">'+info('风险信号',x.signal)+info('当前状态',badge(x.result))+info('责任人',x.owner)+info('关联规则','RISK-RULE-2026.08.3')+'</div><div class="field"><label>人工结论</label><select id="ruleFeedbackResult"><option>人工确认</option><option>误报</option></select></div><div class="field"><label>结论说明</label><textarea id="ruleFeedbackNote">已核验供应商交付明细与质量异常证据。</textarea></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="saveRuleFeedback(\''+id+'\')">保存人工结论</button>');}
function saveRuleFeedback(id){if(!['audit','manager'].includes(state.role)){toast('仅审计监督部或公司管理层可确认 AI 风险反馈。');return;}const x=db.starCenter.feedback.find(function(f){return f.id===id;});x.result=$('#ruleFeedbackResult').value;x.note=$('#ruleFeedbackNote').value.trim()||'已完成核实。';closeModal();render();toast('人工结论已归入反馈池，可用于下一版规则回测。');}
function advanceRuleDraft(){if(!['audit','manager'].includes(state.role)){toast('仅审计监督部或公司管理层可生成和审批规则草案。');return;}const r=db.starCenter.ruleVersions[1];if(r.status==='待回测'){r.status='待审批';r.hit=31;r.confirmed='93.1%';r.effective='拟于 2026-09-01 生效';render();toast('已完成模拟回测：31 个样例，人工确认率 93.1%，等待审批发布。');return;}if(r.status==='待审批'){r.status='已生效';r.id='RISK-RULE-2026.08.4';r.effective='2026-09-01';db.starCenter.ruleVersions[0].status='历史版本';render();toast('新规则版本已发布；历史风险仍保留原版本依据。');return;}toast('当前最新规则已生效，可继续查看历史版本与人工反馈。');}

const starV2GroupForPage=groupForPage;
groupForPage=function(page){if(['starOverview','collection','meeting','ruleLab'].includes(page))return 'star';return starV2GroupForPage(page);};
renderNav=function(){return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+navGroup('risk','合同 · 风险 · 审计',navButton('contract','合同管理中心')+navButton('risk','双源风险与审计'))+navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+navGroup('star','观星台 · 七条主线',navButton('starOverview','观星台全景')+navButton('star','经营驾驶舱')+navButton('metric','① 指标全生命周期')+navButton('collection','② 数据采集与发布')+navButton('meeting','③ 会议场景运行')+navButton('problem','④ 问题快发闭环')+navButton('quality','⑤ 数据质量闭环')+navButton('risk','⑥ 双源风险闭环')+navButton('ruleLab','⑦ AI风险规则优化'))+navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('hrCatalog','31项功能样例')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));};
render=function(){const pages={home:homePage,p0:p0Page,contract:contractPage,contractDetail:contractDetailPage,risk:riskPage,admin:adminPage,starOverview:starOverviewPage,star:starPage,metric:metricPage,collection:collectionPage,meeting:meetingPage,problem:problemPage,problemDetail:problemDetailPage,quality:qualityPage,ruleLab:ruleLabPage,service:servicePage,hr:hrPage,hrCatalog:hrCatalogPage,hrDomain:hrDomainPage,hrSample:hrSamplePage,onboarding:onboardingPage,onboardingDetail:onboardingDetailPage,employee:employeePage,employeeDetail:employeeDetailPage,leave:leavePage,leaveDetail:leaveDetailPage,qualification:qualificationPage};$('#app').innerHTML=(pages[state.page]||homePage)();};
render();

/* ===== 信息工程部工作台：10 条流程目录与重点闭环 ===== */
state.itFilter = '全部状态';
state.itModule = 'all';

const itModules = [
  {key:'account',group:'权限治理',name:'账号权限',prefix:'IAM',risk:'中',action:'审批并授权'},
  {key:'delegate',group:'权限治理',name:'临时授权 / 流程代理',prefix:'DGT',risk:'低',action:'查看授权范围'},
  {key:'process',group:'流程治理',name:'流程配置变更',prefix:'WFC',risk:'中',action:'查看变更评估'},
  {key:'sso',group:'集成服务',name:'系统接入及单点登录',prefix:'SSO',risk:'中',action:'查看接入方案'},
  {key:'interface',group:'集成服务',name:'接口变更',prefix:'API',risk:'高',action:'评估并发布'},
  {key:'report',group:'权限治理',name:'报表授权',prefix:'RPT',risk:'低',action:'查看授权范围'},
  {key:'repair',group:'运行服务',name:'报修服务',prefix:'REP',risk:'中',action:'查看处置记录'},
  {key:'release',group:'运行服务',name:'发布变更',prefix:'REL',risk:'高',action:'验证并发布'},
  {key:'master',group:'数据治理',name:'主数据管理',prefix:'MDM',risk:'中',action:'查看维护版本'},
  {key:'masterException',group:'数据治理',name:'主数据异常处理',prefix:'MDE',risk:'高',action:'分派修复'}
];
function itAudit(actor,action,result){return {time:'2026-08-25 14:20',actor:actor,action:action,result:result};}
function itItem(data){return Object.assign({owner:'信息工程部 / 尚椿琳',requester:'业务部门 / 申请人',risk:'中',status:'处理中',window:'2026-08-28 20:00–21:00',system:'OA及观星台',related:'MET-002',version:'V1.0',run:'—',rollback:'已定义回退点',files:[{name:'申请与评估材料.pdf',version:'V1.0',uploader:'系统归集',time:'2026-08-25 14:20'}],audit:[itAudit('系统动作流','登记台账','已关联申请人、业务对象、责任人和审批规则')]},data);}
db.itCenter = {
  account:[itItem({id:'IAM-202608-031',title:'采购部合同评审账号权限申请',requester:'采购部 / 赵倩',risk:'中',status:'待审批',system:'OA合同管理',related:'HT-202608-029',scope:'合同评审与附件查看',window:'授权期限：长期',version:'角色包 V2.4'})],
  delegate:[itItem({id:'DGT-202608-008',title:'生产保障期间流程代理申请',requester:'生产管理部 / 刘强',risk:'低',status:'已生效',system:'OA流程中心',related:'WT-202608-021',scope:'生产管理部审批代理',window:'2026-08-26 至 2026-08-30',version:'代理规则 V1.0'})],
  process:[itItem({id:'WFC-202608-012',title:'合同会签节点与时限配置变更',requester:'党政综合办 / 何静',risk:'中',status:'评审中',system:'OA流程引擎',related:'HT-202608-029',scope:'会签节点、处理时限与提醒规则',version:'流程版本 V2.2'})],
  sso:[itItem({id:'SSO-202608-004',title:'SRM 系统接入与单点登录申请',requester:'采购部 / 赵倩',risk:'中',status:'待联调',system:'OA ↔ SRM',related:'PSM-202608-016',scope:'SSO、组织与账号映射',version:'接入方案 V1.1',run:'RUN-SSO-20260825-01'})],
  interface:[itItem({id:'API-202608-016',title:'ERP 组织编码同步接口字段变更',requester:'人力资源部 / 吴欣',risk:'高',status:'待评估',system:'OA ↔ ERP',related:'ONB-202608-006',scope:'组织编码、岗位编码、失败补偿',version:'接口契约 V1.7',run:'RUN-API-20260825-01',rollback:'回退至接口契约 V1.6'})],
  report:[itItem({id:'RPT-202608-009',title:'经营驾驶舱指标明细报表授权',requester:'经营发展部 / 周敏',risk:'低',status:'已生效',system:'观星台',related:'MET-002',scope:'指标下钻、来源明细与导出',window:'授权期限：2026年12月31日',version:'报表权限 V1.0'})],
  repair:[itItem({id:'REP-202608-021',title:'生产报工页面无法提交报修',requester:'生产管理部 / 刘强',risk:'中',status:'处理中',system:'MES 报工门户',related:'WT-202608-021',scope:'页面报错与会话日志',run:'RUN-REP-20260825-03',version:'工单处置 V1.0'})],
  release:[itItem({id:'REL-202608-014',title:'经营驾驶舱指标模型 V1.7 发布变更',requester:'经营发展部 / 周敏',risk:'高',status:'待发布',system:'观星台',related:'MET-002',scope:'指标模型、血缘与数据质量规则',version:'发布包 V1.7',run:'RUN-REL-20260825-01',rollback:'回退至指标模型 V1.6'})],
  master:[itItem({id:'MDM-202608-010',title:'供应商主数据维护申请',requester:'采购部 / 赵倩',risk:'中',status:'待数据确认',system:'主数据管理',related:'HT-202608-029',scope:'供应商名称、统一社会信用代码、结算属性',version:'主数据版本 V3.2'})],
  masterException:[itItem({id:'MDE-202608-006',title:'员工组织编码缺失异常处理',requester:'人力资源部 / 吴欣',risk:'高',status:'异常待修复',system:'HR 主数据 ↔ ERP',related:'ONB-202608-006',scope:'组织编码完整性、同步补偿与数据对账',version:'质量规则 DQ-202608-002',run:'BATCH-20260825-02',rollback:'保留修复前快照'})]
};
function itModule(key){return itModules.find(function(x){return x.key===key;});}
function itRecords(){return itModules.reduce(function(rows,m){return rows.concat((db.itCenter[m.key]||[]).map(function(x){return Object.assign({module:m.key,moduleName:m.name,group:m.group},x);}));},[]);}
function itRecord(id){
  for(var i=0;i<itModules.length;i++){
    var m=itModules[i],rows=db.itCenter[m.key]||[],x=rows.find(function(row){return row.id===id;});
    if(x){x.module=m.key;x.moduleName=m.name;x.group=m.group;return x;}
  }
}
function itMayAct(){return ['it','manager'].includes(state.role);}
function itStatusCount(status){return itRecords().filter(function(x){return status==='全部状态'||x.status===status;}).length;}
function itFlow(x){
  const high=x.risk==='高';
  const current=x.status==='已生效'||x.status==='已发布'||x.status==='已关闭'?4:x.status==='待审批'||x.status==='待评估'||x.status==='评审中'?1:x.status==='已修复待核验'||x.status==='待发布'?3:2;
  const steps=['申请与风险识别',high?'业务/数据负责人审核':'信息工程部评估',high?'管理层变更审批':'执行与验证','生效 / 回退 / 归档'];
  return '<section class="card top-gap"><div class="card-h"><h2>处理流程</h2><span class="meta">'+(high?'高风险：增加业务负责人及管理层审批':'低/中风险：信息工程部闭环')+'</span></div><div class="flow detailed">'+steps.map(function(s,i){var st=i<current?'已完成':i===current?'处理中':'待办理';return '<div class="node '+(st==='已完成'?'done':st==='处理中'?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+s+'</p><b>'+([x.requester,x.owner,high?'公司管理层 / 王总':x.owner,'系统动作流'][i])+'</b><span>'+st+'</span></div>';}).join('')+'</div></section>';
}
function itHomePage(){
  const all=itRecords(), groups=Array.from(new Set(itModules.map(function(x){return x.group;})));
  const cards=[['待处理',all.filter(function(x){return !['已生效','已发布','已关闭'].includes(x.status);}).length,'全部状态'],['待审批 / 评审',all.filter(function(x){return /待审批|待评估|评审中/.test(x.status);}).length,'待审批'],['高风险变更',all.filter(function(x){return x.risk==='高'&&!['已发布','已关闭'].includes(x.status);}).length,'高风险'],['主数据异常',all.filter(function(x){return x.module==='masterException'&&x.status!=='已关闭';}).length,'主数据异常']];
  const content='<div class="role-banner it-banner"><div><span class="eyebrow">信息工程部 · 10 条流程</span><h2>权限、变更、运行与主数据治理统一工作台</h2><p>以申请事项、审批规则、版本、运行证据、回退点和审计轨迹组织演示，不复刻老 OA 大表单。</p></div><div class="session-note">Demo 使用模拟账号、接口和主数据；不触发真实生产系统、SSO 或发布操作。</div></div><div class="kpis">'+cards.map(function(c){return '<button class="kpi '+(c[0]==='高风险变更'?'alert':'')+'" onclick="itQuickFilter(\''+c[2]+'\')"><span class="label">'+c[0]+'</span><strong class="val">'+c[1]+'</strong><span class="hint">点击查看对应台账</span></button>';}).join('')+'</div><section class="card top-gap"><div class="card-h"><div><h2>信息工程部流程目录</h2><span class="meta">10 条流程 · '+groups.join(' / ')+'</span></div><button class="secondary" onclick="go(\'itCatalog\')">查看统一台账</button></div><div class="it-module-grid">'+itModules.map(function(m){var x=(db.itCenter[m.key]||[])[0];return '<button class="it-module-card" onclick="showItModule(\''+m.key+'\')"><span>'+m.group+'</span><b>'+m.name+'</b><small>'+x.id+' · '+badge(x.status)+'</small><i>风险：'+m.risk+' · 进入台账 →</i></button>';}).join('')+'</div></section><div class="story-grid top-gap"><article class="story-card"><div class="story-head"><div><span class="story-no">重点闭环 01</span><h2>权限申请到授权生效</h2></div>'+badge('待审批')+'</div><p>申请、范围、审批、角色包版本和授权审计同源可回看。</p><button class="primary" onclick="openItDetail(\'IAM-202608-031\')">进入权限链路</button></article><article class="story-card"><div class="story-head"><div><span class="story-no">重点闭环 02</span><h2>接口 / 发布变更</h2></div>'+badge('待评估')+'</div><p>高风险接口变更保留评估、审批、发布批次和回退点。</p><button class="primary" onclick="openItDetail(\'API-202608-016\')">进入接口链路</button></article><article class="story-card"><div class="story-head"><div><span class="story-no">重点闭环 03</span><h2>主数据异常修复</h2></div>'+badge('异常待修复')+'</div><p>异常分派、修复、复跑、核验和影响对象回看形成闭环。</p><button class="primary" onclick="openItDetail(\'MDE-202608-006\')">进入异常链路</button></article></div>';
  return shell(content,'信息工程部工作台','以统一对象台账承接权限、集成、变更、运行服务和主数据治理。');
}
function itQuickFilter(filter){if(typeof ItWorkspace!=='undefined')return ItWorkspace.list('all',filter);state.itFilter=filter==='高风险'?'全部状态':filter;state.itModule=filter==='主数据异常'?'masterException':'all';go('itCatalog');}
function showItModule(key){if(typeof ItWorkspace!=='undefined')return ItWorkspace.list(key);state.itModule=key;state.itFilter='全部状态';go('itCatalog');}
function itCatalogPage(){
  const modules=state.itModule==='all'?itModules:[itModule(state.itModule)], rows=itRecords().filter(function(x){return (state.itModule==='all'||x.module===state.itModule)&&(state.itFilter==='全部状态'||x.status===state.itFilter);});
  const statuses=['全部状态','待审批','待评估','待发布','异常待修复','已生效','已发布','已关闭'];
  const content='<div class="period-bar it-period"><div><span class="eyebrow">信息工程部流程台账</span><b>'+modules.length+' 类流程 · '+rows.length+' 条当前记录</b><small>选择流程查看字段、审批链、版本、运行批次、回退点和审计轨迹。</small></div><div>'+badge('模拟运行边界')+'</div></div><div class="it-module-tabs">'+[{key:'all',name:'全部流程'}].concat(itModules).map(function(m){return '<button class="'+(state.itModule===m.key?'active':'')+'" onclick="showItModule(\''+m.key+'\')">'+m.name+'</button>';}).join('')+'</div><div class="stat-row">'+statuses.slice(0,4).map(function(s){return '<button class="stat '+(state.itFilter===s?'active':'')+'" onclick="state.itFilter=\''+s+'\';render()"><b>'+itStatusCount(s)+'</b><span>'+s+'</span></button>';}).join('')+'</div><div class="toolbar"><span class="context-label">高风险变更必须经过业务负责人、数据责任人或管理层审批；详情保留审批依据与回退点。</span><span class="spacer"></span><button class="primary" onclick="openItCreate()">+ 发起信息化申请</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>编号</th><th>流程类型</th><th>事项名称</th><th>关联对象</th><th>风险</th><th>版本 / 批次</th><th>状态</th></tr></thead><tbody>'+rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openItDetail(\''+x.id+'\')">'+x.id+'</a></td><td>'+x.moduleName+'</td><td><button class="table-link" onclick="openItDetail(\''+x.id+'\')">'+x.title+'</button></td><td><button class="link" onclick="openObject(\''+x.related+'\')">'+x.related+'</button></td><td>'+badge(x.risk+'风险')+'</td><td>'+x.version+' / '+x.run+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')+'</tbody></table><div class="pager"><span>共 '+rows.length+' 条 · 与服务、发布、数据质量及业务对象关联展示</span></div></div>';
  return shell(content,'信息工程部流程目录','十类流程统一采用台账—详情—流程—证据的演示结构。');
}
function openItDetail(id){
  if(typeof ItWorkspace!=='undefined')return ItWorkspace.open(id);
  const x=itRecord(id); if(!x){toast('未找到信息工程部流程记录');return;} const m=itModule(x.module);
  let action='';
  if(x.module==='account'&&x.status==='待审批') action='<button class="primary" '+(!itMayAct()?'disabled':'')+' onclick="approveItAccess(\''+id+'\')">审批并授权生效</button>';
  if(['interface','release'].includes(x.module)&&['待评估','待发布'].includes(x.status)) action='<button class="primary" '+(!itMayAct()?'disabled':'')+' onclick="advanceItChange(\''+id+'\')">'+(x.status==='待评估'?'完成评估并进入发布':'验证并发布')+'</button>';
  if(x.module==='masterException'&&['异常待修复','已修复待核验'].includes(x.status)) action='<button class="primary" '+(!itMayAct()?'disabled':'')+' onclick="advanceItMasterException(\''+id+'\')">'+(x.status==='异常待修复'?'分派修复并复跑':'核验结果并关闭')+'</button>';
  const fields=[['流程类型',m.name],['申请部门 / 人',x.requester],['处理责任人',x.owner],['风险等级',badge(x.risk+'风险')],['业务对象','<button class="link" onclick="closeModal();openObject(\''+x.related+'\')">'+x.related+'</button>'],['关联系统',x.system],['处理范围',x.scope],['计划窗口',x.window],['版本 / 运行批次',x.version+' / '+x.run],['回退策略',x.rollback],['当前状态',badge(x.status)],['证据数量',x.files.length+' 份附件 / '+x.audit.length+' 条轨迹']];
  const auditRows=x.audit.map(function(a){return '<div class="audit-row"><time>'+a.time+'</time><div><b>'+a.actor+' · '+a.action+'</b><small>'+a.result+'</small></div></div>';}).join('');
  openModal(x.id+' · '+x.title,'<div class="detail-head it-detail-head"><div class="detail-kicker">'+m.group+' / '+m.name+'</div><h2>'+x.title+'</h2><div class="detail-meta"><span>'+x.system+'</span><span>关联：'+x.related+'</span><span>'+x.window+'</span></div><div class="detail-badges">'+badge(x.status)+'<span class="version-chip">'+x.version+'</span></div></div><div class="context-tip"><b>演示边界：</b>不触发真实账号、SSO、接口或生产发布；仅模拟审批、运行证据、回退点和状态回写。</div><section class="card"><div class="card-h"><h2>业务与运行信息</h2><span class="meta">字段按流程选择，不复刻老 OA 大表单</span></div><div class="info-grid">'+fields.map(function(f){return info(f[0],f[1]);}).join('')+'</div></section>'+itFlow(x)+'<section class="card top-gap"><div class="card-h"><h2>附件与操作轨迹</h2><span class="meta">'+x.files.length+' 份附件 / '+x.audit.length+' 条</span></div><div class="sample-relation"><div><span>最新附件</span><b>'+x.files[0].name+'</b><small>'+x.files[0].version+' · '+x.files[0].uploader+' · '+x.files[0].time+'</small></div></div><div class="audit-list">'+auditRows+'</div></section>','<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);
}
function approveItAccess(id){if(typeof ItWorkspace!=='undefined')return ItWorkspace.open(id);const x=itRecord(id);if(!itMayAct()){denied('servicePublish');return;}x.status='已生效';x.version='角色包 V2.5';x.files.unshift({name:'授权生效确认单.pdf',version:'V1.0',uploader:currentRole().name,time:'2026-08-25 14:35'});x.audit.push(itAudit(currentRole().name,'审批并授权生效','已授予合同评审角色；授权范围、角色包版本和审批依据已留痕'));db.todos.unshift({id:'WF-'+x.id,objectId:x.related,type:'权限授权通知',title:x.title+'—已生效',role:'operations',due:'今日',status:'已完成'});closeModal();render();toast('权限状态、角色包版本、授权证据和待办通知已同步更新');}
function advanceItChange(id){if(typeof ItWorkspace!=='undefined')return ItWorkspace.open(id);const x=itRecord(id);if(!itMayAct()){denied('servicePublish');return;}if(x.status==='待评估'){x.status='待发布';x.audit.push(itAudit(currentRole().name,'完成变更评估','高风险变更已完成业务与数据影响评估，生成发布审批依据和回退点'));}else{x.status='已发布';x.run='RUN-'+x.module.toUpperCase()+'-20260825-02';x.files.unshift({name:'发布验证与回退记录.pdf',version:'V1.0',uploader:currentRole().name,time:'2026-08-25 14:42'});x.audit.push(itAudit(currentRole().name,'验证并发布','验证通过，已保留发布批次、版本、回退点与结果证据'));}closeModal();render();toast('变更状态、版本、运行批次、回退点和审计轨迹已同步更新');}
function advanceItMasterException(id){if(typeof ItWorkspace!=='undefined')return ItWorkspace.open(id);const x=itRecord(id);if(!itMayAct()){denied('qualityRepair');return;}if(x.status==='异常待修复'){x.status='已修复待核验';x.run='BATCH-20260825-03';x.audit.push(itAudit(currentRole().name,'分派修复并复跑','已补齐缺失组织编码，生成复跑批次并等待数据责任人核验'));}else{x.status='已关闭';x.files.unshift({name:'主数据异常核验结论.pdf',version:'V1.0',uploader:currentRole().name,time:'2026-08-25 14:48'});x.audit.push(itAudit(currentRole().name,'核验结果并关闭','复跑通过，已完成 HR 主数据与 ERP 组织编码对账并关闭异常'));}closeModal();render();toast('异常状态、复跑批次、核验证据和关联对象影响已同步更新');}
function openItCreate(){if(typeof ItWorkspace!=='undefined')return ItWorkspace.create(state.itModule);if(!itMayAct()){toast('请切换至信息工程部或公司管理层视角发起服务申请');return;}openModal('发起信息工程部申请','<div class="form-grid"><div class="field full"><label>申请事项 <em>*</em></label><input id="itTitle" value="临时项目成员报表授权申请"></div><div class="field"><label>流程类型</label><select id="itType">'+itModules.map(function(m){return '<option value="'+m.key+'">'+m.name+'</option>';}).join('')+'</select></div><div class="field"><label>关联对象</label><select id="itRelated"><option>MET-002</option><option>HT-202608-029</option><option>ONB-202608-006</option></select></div><div class="field full"><label>模拟边界</label><div class="readonly-box">提交后生成申请台账、风险等级、审批节点与审计轨迹；不影响真实账号、接口、报表或主数据。</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createItRequest()">提交申请</button>');}
function createItRequest(){if(typeof ItWorkspace!=='undefined')return ItWorkspace.save();const title=$('#itTitle').value.trim(),key=$('#itType').value,m=itModule(key);if(!title){toast('请填写申请事项');return;}const id=m.prefix+'-N'+String((db.itCenter[key]||[]).length+1).padStart(3,'0');const x=itItem({id:id,title:title,requester:currentRole().label+' / '+currentRole().name,risk:m.risk,status:'待审批',system:'当前会话模拟系统',related:$('#itRelated').value,scope:'待信息工程部评估',version:'V0.1草稿'});db.itCenter[key].unshift(x);closeModal();state.itModule=key;render();toast('申请台账、审批节点和审计轨迹已生成；刷新后恢复 Demo 基线');}

const renderNavBeforeIT10 = renderNav;
renderNav = function(){return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+navGroup('it','信息工程部',navButton('itHome','信息工程部工作台')+navButton('itCatalog','10条流程目录'))+navGroup('risk','合同 · 风险 · 审计',navButton('contract','合同管理中心')+navButton('risk','双源风险与审计'))+navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+navGroup('star','观星台',navButton('star','经营驾驶舱')+navButton('metric','指标下钻与血缘')+navButton('problem','问题闭环中心')+navButton('quality','指标与数据质量'))+navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('hrCatalog','31项功能样例')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));};
const groupForPageBeforeIT10 = groupForPage;
groupForPage = function(page){if(['itHome','itCatalog'].includes(page))return 'it';return groupForPageBeforeIT10(page);};
const renderBeforeIT10 = render;
render = function(){const pages={home:homePage,p0:p0Page,contract:contractPage,contractDetail:contractDetailPage,risk:riskPage,admin:adminPage,star:starPage,metric:metricPage,problem:problemPage,problemDetail:problemDetailPage,quality:qualityPage,service:servicePage,itHome:itHomePage,itCatalog:itCatalogPage,hr:hrPage,hrCatalog:hrCatalogPage,hrDomain:hrDomainPage,hrSample:hrSamplePage,onboarding:onboardingPage,onboardingDetail:onboardingDetailPage,employee:employeePage,employeeDetail:employeeDetailPage,leave:leavePage,leaveDetail:leaveDetailPage,qualification:qualificationPage};$('#app').innerHTML=(pages[state.page]||homePage)();};
const homePageBeforeIT10 = homePage;
homePage = function(){const base=homePageBeforeIT10();return base.replace('</div>\n    <div class="split top-gap">','</div><div class="story-grid full-story-grid"><article class="story-card it-story"><div class="story-head"><div><span class="story-no">信息工程部 · 10条流程</span><h2>权限、变更、运行与主数据治理</h2></div>'+badge('3条重点闭环')+'</div><p>10条SOW流程采用独立工作页面，审批、执行、验证及关联结果在会话内同步。</p><div class="story-evidence"><b>'+itRecords().length+' 条流程样例</b><span>风险分级</span><span>版本/批次</span><span>回退点</span><span>审计轨迹</span></div><button class="primary" onclick="go(\'itHome\')">进入信息工程部工作台</button></article></div>\n    <div class="split top-gap">');};
const p0PageBeforeIT10 = p0Page;
p0Page = function(){const base=p0PageBeforeIT10();return base.replace('8 条端到端主线','9 条端到端主线').replace('8</b><span>演示主线','9</b><span>演示主线').replace('</div><section class="card top-gap">','</div><article class="trace-card"><div><span>D09</span>'+badge('本次新增')+'</div><h2>信息工程部 10 条流程治理</h2><p>权限、变更、运行服务与主数据异常统一追溯</p><footer><b>P0</b><button class="link" onclick="go(\'itHome\')">进入场景 →</button></footer></article></div><section class="card top-gap">');};
render();

/* 审计监督部导航在既有业务域初始化完成后作为最终入口覆盖。 */
function renderNav(){
  return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+
    navGroup('audit-home','审计监督部',navButton('audit-home','审计监督部工作台'))+
    navGroup('合同与履约','合同与履约',auditNavItems('合同与履约'))+
    navGroup('合规与法律','合规与法律',auditNavItems('合规与法律'))+
    navGroup('风险管理','风险管理',auditNavItems('风险管理'))+
    navGroup('审计整改','审计整改',auditNavItems('审计整改'))+
    navGroup('招采监督','招采监督',auditNavItems('招采监督'))+
    navGroup('audit-contract','ERP 模拟系统',navButton('erp','合同履约与付款状态'))+
    navGroup('audit-procurement','SRM 模拟系统',navButton('srm','招采流程与异常'))+
    navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+
    navGroup('star','观星台',navButton('star','经营驾驶舱')+navButton('metric','指标下钻与血缘')+navButton('problem','问题闭环中心')+navButton('quality','指标与数据质量'))+
    navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+
    navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));
}
function groupForPage(page){return auditGroupForPage(page)||({home:'workbench',p0:'workbench',contract:'合同与履约',contractDetail:'合同与履约',risk:'风险管理',admin:'admin',star:'star',metric:'star',problem:'star',problemDetail:'star',quality:'star',hr:'hr',onboarding:'hr',onboardingDetail:'hr',employee:'hr',employeeDetail:'hr',leave:'hr',leaveDetail:'hr',qualification:'hr',service:'service'}[page]||'workbench');}
function go(page){state.page=page;state.navOpen=groupForPage(page);state.auditFilter='全部状态';state.auditQuery='';render();window.scrollTo({top:0,behavior:'smooth'});}
const renderBeforeAuditCenter = render;
render = function(){
  const key=state.page.indexOf('audit-')===0?state.page.slice(6):'';
  if(state.page==='audit-home') return $('#app').innerHTML=auditHomePage();
  if(key&&auditModules[key]) return $('#app').innerHTML=auditPage(key);
  if(state.page==='erp') return $('#app').innerHTML=erpPage();
  if(state.page==='srm') return $('#app').innerHTML=srmPage();
  return renderBeforeAuditCenter();
};
render();

/* ===== 党政综合办工作中心：29 条可演示事项 ===== */
state.adminTab='公文';
state.adminQuery='';
const adminCatalog=[
  ['公文','收文','收文办理'],['公文','发文','公司发文'],['公文','文件评审','文件评审'],['公文','对外报送','公文对外报送'],['公文','清理修订废止','公文清理、修订及废止'],
  ['印章证照','用印','用印申请'],['印章证照','印章外出','印章外出使用'],['印章证照','印章全生命周期','刻制、启用、停用及销毁'],['印章证照','证照借还','证照借用及归还'],
  ['会议督办','会议申请','会议及会议室申请'],['会议督办','会议回执','参会回执'],['会议督办','会议变更','会议变更'],['会议督办','会议取消','会议取消'],['会议督办','会议纪要','会议纪要审核及发布'],['会议督办','督办立项','督办事项立项'],['会议督办','督办变更','督办延期、变更及取消'],['会议督办','验收销号','督办验收及销号'],
  ['行政档案','任务台账','综合任务管理'],['行政档案','费用标准审核','办公费/交通费合规审核'],['行政档案','档案移交','档案移交及延期归档'],['行政档案','档案查借阅','档案查阅、借阅及复制'],['行政档案','鉴定销毁','档案鉴定及销毁'],['行政档案','外部检查整改','外部检查登记及整改'],
  ['治理中心','董事会','董事会事项管理'],['治理中心','党建','党建事项管理'],['治理中心','团委','团委事项管理'],['治理中心','工会','工会事项管理'],['治理中心','会前评审','会前评审'],['治理中心','上会请示','上会请示']
];
const adminProfiles={
  '收文':{title:'集团关于开展安全生产专项检查的通知',source:'集团OA来文',owner:'党政综合办 / 何静',due:'2026-08-28',status:'办理中',relation:'督办 SUP-202608-031'},
  '用印':{title:'年度采购框架协议用印申请',source:'合同 HT-202608-029',owner:'党政综合办 / 何静',due:'2026-08-26',status:'待核验',relation:'印章：合同专用章'},
  '印章外出':{title:'成都供应商现场签约携章申请',source:'采购部申请',owner:'党政综合办 / 何静',due:'2026-08-27',status:'待归还',relation:'外出登记 SEAL-OUT-012'},
  '证照借还':{title:'质量体系认证证书借用',source:'客户审厂准备',owner:'质量管理部 / 周勇',due:'2026-08-27',status:'待归还',relation:'证照 LIC-ISO-001'},
  '会议申请':{title:'八月经营分析会会议申请',source:'经营发展部',owner:'经营发展部 / 周敏',due:'2026-08-26',status:'已确认',relation:'会议室：第一会议室'},
  '会议纪要':{title:'八月经营分析会会议纪要',source:'会议 MTG-202608-011',owner:'经营发展部 / 周敏',due:'2026-08-25',status:'待发布',relation:'督办 1 项'},
  '督办立项':{title:'旺季生产保障专项督办',source:'收文 DOC-202608-018',owner:'党政综合办 / 何静',due:'2026-08-26',status:'办理中',relation:'责任事项 2 项'},
  '验收销号':{title:'产值完成率整改事项验收',source:'会议纪要 DOC-202608-016',owner:'生产管理部 / 刘强',due:'2026-08-25',status:'待验收',relation:'佐证 1 份'},
  '档案查借阅':{title:'2025年度经营分析会纪要借阅',source:'经营发展部申请',owner:'档案室 / 何静',due:'2026-08-29',status:'待归还',relation:'档案 ARC-2025-019'},
  '外部检查整改':{title:'消防安全专项检查整改',source:'外部检查 INS-202608-004',owner:'安全环保部 / 周勇',due:'2026-08-30',status:'整改中',relation:'问题 3 项'},
  '董事会':{title:'第三届董事会第八次会议议案',source:'董事会办公室',owner:'党政综合办 / 何静',due:'2026-08-29',status:'待上会',relation:'议案 2 项'},
  '党建':{title:'第三季度党委理论学习计划',source:'党委办公室',owner:'党委办公室 / 梁瑶',due:'2026-08-31',status:'待审批',relation:'年度计划'},
  '工会':{title:'高温慰问活动立项',source:'工会委员会',owner:'工会 / 陈颖',due:'2026-08-27',status:'待审批',relation:'预算 2.8 万元'},
  '会前评审':{title:'设备更新项目会前评审',source:'设备动力部',owner:'党政综合办 / 何静',due:'2026-08-26',status:'评审中',relation:'拟上会事项 GOV-202608-028'},
  '上会请示':{title:'设备更新项目上会请示',source:'会前评审 GOV-202608-028',owner:'设备动力部 / 李超',due:'2026-08-28',status:'待上会',relation:'会议：董事会专题会'}
};
function adminItem(i){const c=adminCatalog[i],p=adminProfiles[c[1]]||{};return {id:'ADM-'+String(i+1).padStart(2,'0'),group:c[0],type:c[1],process:c[2],title:p.title||c[2]+'事项',source:p.source||'党政综合办发起',owner:p.owner||'党政综合办 / 何静',due:p.due||'2026-08-'+String(26+i%6).padStart(2,'0'),status:p.status||(i%4===0?'待审批':i%4===1?'办理中':i%4===2?'待归档':'已完成'),relation:p.relation||'附件与办理轨迹',files:[{name:c[2]+'_材料_V1.0.pdf',version:'V1.0',time:'2026-08-25 09:30'}],audit:[{time:'2026-08-25 09:30',actor:'何静',action:'登记事项',result:'已生成'+c[2]+'台账及流程'}],tasks:[]};}
db.adminCenter=adminCatalog.map(function(_,i){return adminItem(i);});
function adminTabs(){return ['公文','印章证照','会议督办','行政档案','治理中心'];}
function adminRows(){const q=state.adminQuery.trim();return db.adminCenter.filter(function(x){return x.group===state.adminTab&&(!q||[x.id,x.type,x.title,x.source,x.owner].join('|').includes(q));});}
function setAdminTab(tab){state.adminTab=tab;state.adminQuery='';render();}
function adminPage(){const rows=adminRows(),all=db.adminCenter,late=all.filter(function(x){return x.status==='待归还'||x.status==='待验收'||x.status==='待归档';}).length;const tabs=adminTabs().map(function(t){return '<button class="'+(state.adminTab===t?'active':'')+'" onclick="setAdminTab(\''+t+'\')">'+t+' <i class="tab-count">'+all.filter(function(x){return x.group===t;}).length+'</i></button>';}).join('');const content='<div class="admin-hero"><div><span class="eyebrow">29条流程 · 统一工作中心</span><h2>事项、流程、证据与归档在同一编号下可追溯</h2><p>当前为静态 Demo，会话内回写可见；不代表真实集团 OA、电子印章或 ERP 已连通。</p></div><button class="primary" onclick="openAdminCenterForm()">+ 发起当前事项</button></div><div class="stat-row"><button class="stat active" onclick="setAdminTab(\''+state.adminTab+'\')"><b>'+rows.length+'</b><span>当前工作区事项</span></button><button class="stat" onclick="setAdminTab(&apos;会议督办&apos;)"><b>'+all.filter(function(x){return x.group==='会议督办'&&x.status!=='已完成';}).length+'</b><span>会议督办待处理</span></button><button class="stat" onclick="setAdminTab(&apos;印章证照&apos;)"><b>'+all.filter(function(x){return x.status==='待归还';}).length+'</b><span>待归还印章/证照</span></button><button class="stat"><b>'+late+'</b><span>待验收/待归档</span></button></div><div class="tabs admin-tabs">'+tabs+'</div><div class="toolbar"><input value="'+state.adminQuery+'" oninput="state.adminQuery=this.value;render()" placeholder="搜索编号、事项、来源或责任人"><span class="context-label">'+(state.adminTab==='治理中心'?'按治理事项类型呈现组织权限、议题材料、决议与执行归档。':'点击事项查看表单、流程、附件和操作轨迹。')+'</span><span class="spacer"></span><button class="secondary" onclick="openAdminCenterForm()">新建事项</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>编号</th><th>流程</th><th>事项名称</th><th>来源 / 关联</th><th>责任人</th><th>期限</th><th>状态</th></tr></thead><tbody>'+rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openAdminCenterDetail(\''+x.id+'\')">'+x.id+'</a></td><td>'+x.type+'</td><td><button class="table-link" onclick="openAdminCenterDetail(\''+x.id+'\')">'+x.title+'</button></td><td>'+x.source+' / '+x.relation+'</td><td>'+x.owner+'</td><td>'+x.due+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')+'</tbody></table><div class="pager"><span>共 '+rows.length+' 条 · 状态、附件与审计轨迹同源</span></div></div>';return shell(content,'党政综合办工作中心','覆盖党政公文、印章证照、会议督办、行政档案与治理事项的 29 条可演示流程。');}
function centerItem(id){return db.adminCenter.find(function(x){return x.id===id;});}
function workflowFor(x){const base=['发起登记','部门审核','党政综合办确认','办结归档'];if(x.group==='会议督办')return ['发起/来源关联','责任分派','反馈与催办','验收销号','归档'];if(x.group==='印章证照')return ['申请核验','授权审批','领用/使用登记','归还核验','归档'];if(x.group==='治理中心')return ['材料准备','会前审核','审议/批复','执行跟踪','归档'];return base;}
function openAdminCenterDetail(id){const x=centerItem(id),steps=workflowFor(x).map(function(s,i){return '<div class="node '+(i<2?'done':i===2?'current':'')+'"><div class="n">'+(i+1)+'</div><p>'+s+'</p><span>'+ (i<2?'已完成':i===2?'当前节点':'待办理')+'</span></div>';}).join(''), task=x.tasks.map(function(t){return '<div class="task-card"><div class="task-seq">督</div><div><span>'+t.id+'</span><h3>'+t.name+'</h3><p>'+t.owner+' · '+t.due+'</p></div><div class="task-action">'+badge(t.status)+(t.status!=='已完成'?'<button class="secondary" onclick="completeCenterTask(\''+x.id+'\',\''+t.id+'\')">提交验收佐证</button>':'')+'</div></div>';}).join('');openModal(x.id+' · '+x.title,'<div class="detail-head admin-detail"><div class="detail-kicker">'+x.group+' / '+x.type+' / '+x.process+'</div><h2>'+x.title+'</h2><div class="detail-meta"><span>来源：'+x.source+'</span><span>责任：'+x.owner+'</span><span>期限：'+x.due+'</span></div><div class="detail-badges">'+badge(x.status)+'</div></div><div class="tabs"><button class="active">基本信息</button><button>附件 '+x.files.length+'</button><button>轨迹 '+x.audit.length+'</button></div><div class="info-grid">'+info('关联对象',x.relation)+info('办理组织',x.owner)+info('事项类型',x.type)+info('材料状态','已归集 '+x.files.length+' 份附件')+info('保密边界','仅非涉密资料在线流转')+info('刷新边界','刷新后恢复演示基线')+'</div><div class="flow">'+steps+'</div>'+(task?'<div class="onboarding-board">'+task+'</div>':'')+'<div class="audit-note"><b>操作轨迹：</b>'+x.audit.map(function(a){return a.time+' · '+a.action+'（'+a.result+'）';}).join('；')+'</div>','<button class="secondary" onclick="closeModal()">关闭</button><button class="primary" onclick="advanceAdminItem(\''+x.id+'\')">'+(x.status==='待验收'?'验收销号并归档':'提交办理结果')+'</button>',true);}
function advanceAdminItem(id){const x=centerItem(id);if(x.status==='待验收'){x.status='已归档';x.files.unshift({name:x.title+'_验收归档凭证.pdf',version:'V1.0',time:'2026-08-25 16:20'});audit(x,'验收销号并归档','验收佐证完整，事项已归档');}else{x.status=x.status==='待归还'?'已归还':x.status==='待归档'?'已归档':'办理中';x.files.unshift({name:x.title+'_办理佐证.pdf',version:'V1.0',time:'2026-08-25 16:20'});audit(x,'提交办理结果','状态、附件与审计轨迹已同步');}closeModal();render();toast('事项台账、附件、状态和操作轨迹已同步更新');}
function completeCenterTask(id,taskId){const x=centerItem(id),t=x.tasks.find(function(a){return a.id===taskId;});t.status='已完成';x.files.unshift({name:t.name+'_验收佐证.pdf',version:'V1.0',time:'2026-08-25 16:18'});x.status=x.tasks.every(function(a){return a.status==='已完成';})?'待验收':'办理中';audit(x,'督办事项验收',t.name+'已完成并归集佐证');closeModal();render();toast('督办验收结果、附件和销号条件已同步');}
function openAdminCenterForm(){const types=db.adminCenter.filter(function(x){return x.group===state.adminTab;}).map(function(x){return '<option value="'+x.type+'">'+x.type+'</option>';}).join('');openModal('发起 '+state.adminTab+' 事项','<div class="form-grid"><div class="field full"><label>事项主题 <em>*</em></label><input id="centerTitle" value="'+state.adminTab+'示例事项"></div><div class="field"><label>流程类型</label><select id="centerType">'+types+'</select></div><div class="field"><label>责任部门</label><select id="centerOwner"><option>党政综合办 / 何静</option><option>生产管理部 / 刘强</option><option>经营发展部 / 周敏</option></select></div><div class="field"><label>计划完成日期</label><input id="centerDue" type="date" value="2026-08-31"></div><div class="field"><label>关联来源</label><input id="centerSource" value="当前会话发起"></div><div class="field full"><label>办理说明 <em>*</em></label><textarea id="centerNote">请按流程完成材料核验、审批办理和归档。</textarea></div><div class="field full"><label>附件</label><div class="upload-box">示例材料.pdf<span>已模拟上传 · 当前会话可见</span></div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createAdminCenterItem()">提交并生成台账</button>');}
function createAdminCenterItem(){const title=$('#centerTitle').value.trim(),type=$('#centerType').value;if(!title){toast('请填写事项主题');return;}const base=db.adminCenter.find(function(x){return x.type===type;});const x={id:'ADM-N'+String(db.adminCenter.length+1).padStart(2,'0'),group:state.adminTab,type:type,process:base.process,title:title,source:$('#centerSource').value,owner:$('#centerOwner').value,due:$('#centerDue').value,status:'待审批',relation:'当前会话发起',files:[{name:'示例材料.pdf',version:'V1.0',time:'2026-08-25 16:30'}],audit:[],tasks:[]};if(type==='收文'||type==='会议纪要'||type==='督办立项'){x.tasks=[{id:'SUP-N'+String(db.adminCenter.length+1),name:'提交办理反馈',owner:x.owner,due:'08-30 17:00',status:'待办理'}];x.relation='自动生成督办事项';db.todos.unshift({id:'WF-'+x.id,objectId:x.id,type:'督办事项',title:title+'—提交反馈',role:'owner',due:'08-30 17:00',status:'待处理'});}audit(x,'发起事项',($('#centerNote').value||'已提交')+'；生成台账、附件'+(x.tasks.length?'与督办待办':'')+'。');db.adminCenter.unshift(x);closeModal();render();toast('已生成事项台账、附件和'+(x.tasks.length?'督办待办':'办理轨迹'));}
function renderNavAdminLegacy(){return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+navGroup('risk','合同 · 风险 · 审计',navButton('contract','合同管理中心')+navButton('risk','双源风险与审计'))+navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+navGroup('star','观星台',navButton('star','经营驾驶舱')+navButton('metric','指标下钻与血缘')+navButton('problem','问题闭环中心')+navButton('quality','指标与数据质量'))+navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));}
function homePage(){const base=baseHomePage(),adminCount=db.adminCenter?db.adminCenter.filter(function(x){return x.group==='会议督办'&&x.status!=='已完成';}).length:0;return base.replace('</div>\n    <div class="split top-gap">','</div><div class="story-grid full-story-grid"><article class="story-card"><div class="story-head"><div><span class="story-no">党政综合办 · 29条流程</span><h2>公文、会议、督办、销号与归档</h2></div>'+badge('办理中')+'</div><p>重点演示：收文或会议纪要生成督办，提交验收佐证后销号归档。</p><div class="story-evidence"><b>'+adminCount+' 项会议督办待处理</b><span>公文</span><span>印章证照</span><span>行政档案</span><span>治理事项</span></div><button class="primary" onclick="go(\'admin\')">进入党政综合办工作中心</button></article></div>\n    <div class="split top-gap">');}
render();

/* 观星台 V2 最终入口：置于既有业务域扩展之后，避免覆盖其他模块导航。 */
const finalGroupForPage=groupForPage;
groupForPage=function(page){if(['starOverview','blueprint','collection','meeting','ruleLab'].includes(page))return 'star';return finalGroupForPage(page);};
renderNav=function(){return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+navGroup('it','信息工程部',navButton('itHome','信息工程部工作台')+navButton('itCatalog','10条流程目录'))+navGroup('risk','合同 · 风险 · 审计',navButton('contract','合同管理中心')+navButton('risk','双源风险与审计'))+navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+navGroup('star','观星台 · 七条主线',navButton('starOverview','观星台全景')+navButton('star','经营驾驶舱')+navButton('metric','① 指标全生命周期')+navButton('collection','② 数据采集与发布')+navButton('meeting','③ 会议场景运行')+navButton('problem','④ 问题快发闭环')+navButton('quality','⑤ 数据质量闭环')+navButton('risk','⑥ 双源风险闭环')+navButton('ruleLab','⑦ AI风险规则优化'))+navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('hrCatalog','31项功能样例')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));};
const renderBeforeAuditFinal = render;
render=function(){
  if(typeof ItWorkspace!=='undefined'){const page=ItWorkspace.view();if(page!==null)return $('#app').innerHTML=page;}
  if(typeof AuditWorkspace!=='undefined'){const page=AuditWorkspace.view();if(page!==null)return $('#app').innerHTML=page;}
  const key=state.page.indexOf('audit-')===0?state.page.slice(6):'';
  if(state.page==='audit-home') return $('#app').innerHTML=auditHomePage();
  if(key&&auditModules[key]) return $('#app').innerHTML=auditPage(key);
  if(state.page==='erp') return $('#app').innerHTML=erpPage();
  if(state.page==='srm') return $('#app').innerHTML=srmPage();
  const pages={home:homePage,p0:p0Page,itHome:itHomePage,itCatalog:itCatalogPage,contract:contractPage,contractDetail:contractDetailPage,risk:riskPage,admin:adminPage,starOverview:starOverviewPage,star:starPage,metric:metricPage,collection:collectionPage,meeting:meetingPage,problem:problemPage,problemDetail:problemDetailPage,quality:qualityPage,ruleLab:ruleLabPage,service:servicePage,hr:hrPage,hrCatalog:hrCatalogPage,hrDomain:hrDomainPage,hrSample:hrSamplePage,onboarding:onboardingPage,onboardingDetail:onboardingDetailPage,employee:employeePage,employeeDetail:employeeDetailPage,leave:leavePage,leaveDetail:leaveDetailPage,qualification:qualificationPage};
  return $('#app').innerHTML=(pages[state.page]||homePage)();
};
render();
renderNav=function(){
  return navGroup('workbench','工作台',navButton('home','管理工作台')+navButton('p0','建设与追溯总览'))+
    navGroup('audit-home','审计监督部',navButton('audit-home','审计监督部工作台'))+
    navGroup('合同与履约','合同与履约',auditNavItems('合同与履约'))+
    navGroup('合规与法律','合规与法律',auditNavItems('合规与法律'))+
    navGroup('风险管理','风险管理',auditNavItems('风险管理'))+
    navGroup('审计整改','审计整改',auditNavItems('审计整改'))+
    navGroup('招采监督','招采监督',auditNavItems('招采监督'))+
    navGroup('audit-contract','ERP 模拟系统',navButton('erp','合同履约与付款状态'))+
    navGroup('audit-procurement','SRM 模拟系统',navButton('srm','招采流程与异常'))+
    navGroup('it','信息工程部',navButton('itHome','信息工程部工作台')+navButton('itCatalog','10条流程目录'))+
    navGroup('admin','党政行政',navButton('admin','党政综合办工作中心'))+
    navGroup('star','观星台 · 七条主线',navButton('starOverview','观星台全景')+navButton('star','经营驾驶舱')+navButton('metric','① 指标全生命周期')+navButton('collection','② 数据采集与发布')+navButton('meeting','③ 会议场景运行')+navButton('problem','④ 问题快发闭环')+navButton('quality','⑤ 数据质量闭环')+navButton('risk','⑥ 双源风险闭环')+navButton('ruleLab','⑦ AI风险规则优化'))+
    navGroup('hr','人力资源',navButton('hr','人力资源工作台')+navButton('hrCatalog','31项功能样例')+navButton('onboarding','入职协同')+navButton('employee','员工360档案')+navButton('leave','请假考勤')+navButton('qualification','岗位资格中心'))+
    navGroup('service','信息化服务',navButton('service','服务、发布与补偿'));
};
render();

/* 保证 P1 页面在所有后续模块增强完成后仍由最终渲染器接管。 */
const renderBeforeBlueprintFinal=render;
render=function(){if(state.page==='blueprint')return $('#app').innerHTML=blueprintPage();return renderBeforeBlueprintFinal();};
render();
