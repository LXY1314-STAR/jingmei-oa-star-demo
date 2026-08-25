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
  qualificationFilter: '全部状态'
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
  const profile = currentRole();
  const roleOptions = Object.keys(roles).map(function (key) { return `<option value="${key}" ${state.role===key?'selected':''}>${roles[key].label}</option>`; }).join('');
  return `
  <div class="shell">
    <aside class="side">
      <div class="brand"><b>精美印务</b><span>OA及观星台 · 蓝图确认DEMO</span></div>
      ${renderNav()}
    </aside>
    <main class="main">
      <header class="top">
        <div class="crumb">五粮液精美印务 / <b>${title}</b></div>
        <div class="top-actions">
          <button class="icon-btn" onclick="openTodos()">待办 <i class="badge-num">${db.todos.length}</i></button>
          <button class="icon-btn" onclick="openMessages()">消息 <i class="badge-num">${unread()}</i></button>
          <select class="role-switch" aria-label="切换演示角色" onchange="setRole(this.value)">${roleOptions}</select>
          <div class="avatar">${profile.short}</div>
        </div>
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
function openContractForm() {
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

function showContract(id){state.contractId=id;state.page='contractDetail';state.contractTab='overview';const c=contract();if(c.clauses.length)state.clauseId=(c.clauses.find(function(x){return x.decision==='待复核';})||c.clauses[0]).id;render();window.scrollTo({top:0,behavior:'smooth'});}
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
function openRiskDetail(id){const x=risk(id);const action=x.status==='待核实'?'<button class="primary" '+(!canAction('riskVerify')?'disabled':'')+' onclick="verifyRisk(\''+id+'\')">核实合并并发起整改</button>':x.status==='整改中'?'<button class="primary" '+(!canAction('riskClose')?'disabled':'')+' onclick="closeRisk(\''+id+'\')">复核销账</button>':'';openModal(x.id+' · '+x.title,'<div class="relation-map"><div class="relation-core"><span>双源风险对象</span><b>'+x.id+'</b><small>'+x.level+'风险 · '+x.status+'</small></div><div class="relation-lines"><button><span>人工来源</span><b>'+x.sourceA+'</b><small>保留来源编号与提报时间</small></button><button><span>AI来源</span><b>'+x.sourceB+'</b><small>保留采集批次、规则版本和相似度</small></button><button><span>处置状态</span><b>'+x.relation+'</b><small>'+x.measure+'</small></button><button><span>审计证据</span><b>'+x.audit.length+'条轨迹 / '+x.files.length+'份附件</b><small>操作结果可回看</small></button></div></div>','<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);}
function verifyRisk(id){if(!canAction('riskVerify')){denied('riskVerify');return;}const x=risk(id);x.status='整改中';x.relation='已核实并合并';x.measure='已生成风险整改单并关联责任部门、期限及复核人。';x.files.unshift({name:x.id+'_双源核实记录.pdf',time:'2026-08-25 10:45'});audit(x,'核实双源风险并定级','保留人工/AI来源，合并后定级为'+x.level+'风险');db.todos.unshift({id:'WF-'+x.id,objectId:x.id,type:'风险整改',title:x.title+'—提交整改措施',role:'owner',due:'08-28 17:00',status:'待处理'});closeModal();render();toast('风险定级、整改单、待办、附件和审计轨迹已同步');}
function closeRisk(id){if(!canAction('riskClose')){denied('riskClose');return;}const x=risk(id);x.status='已关闭';x.files.unshift({name:x.id+'_整改复核结论.pdf',time:'2026-08-25 10:50'});audit(x,'审计复核销账','整改结果与双源证据完整，已关闭风险台账');db.todos=db.todos.filter(function(t){return t.objectId!==id;});closeModal();render();toast('风险已销账，待办和风险统计已同步回写');}
function openRiskForm(){if(!canAction('riskStart')){denied('riskStart');return;}openModal('启动AI风险采集批次','<div class="form-grid"><div class="field"><label>采集主题</label><select><option>供应商交付与合规风险</option><option>设备运行风险</option></select></div><div class="field"><label>规则版本</label><div class="readonly-box">RISK-RULE-2026.08.3</div></div><div class="field full"><label>模拟运行范围</label><div class="readonly-box">当前会话仅生成采集批次、候选风险、去重结果与运行日志；不调用真实 AI 服务。</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createRiskBatch()">运行采集并生成候选</button>');}
function createRiskBatch(){if(!canAction('riskStart')){denied('riskStart');return;}const x={id:'RSK-202608-017',title:'供应商材料质量舆情风险',sourceA:'无人工提报',sourceB:'AI采购舆情采集批次 BATCH-0825',relation:'待人工核实',level:'中',owner:'采购部 / 赵倩',status:'待核实',measure:'',files:[],audit:[]};audit(x,'启动AI风险采集','生成候选风险、规则版本与批次运行记录');db.risks.unshift(x);closeModal();render();toast('已生成AI采集候选；需人工核实后才会进入整改流程');}

function servicePage(){const rows=db.services.filter(function(x){return state.serviceFilter==='全部状态'||x.status===state.serviceFilter;});const stats=[['全部服务单',db.services.length,'全部状态'],['待补偿',db.services.filter(function(x){return x.status==='待补偿';}).length,'待补偿'],['待发布',db.services.filter(function(x){return x.status==='待发布';}).length,'待发布'],['已完成',db.services.filter(function(x){return x.status==='已完成';}).length,'已完成']];const content=`<div class="stat-row">${stats.map(function(x){return '<button class="stat '+(state.serviceFilter===x[2]?'active':'')+'" onclick="state.serviceFilter=\''+x[2]+'\';render()"><b>'+x[1]+'</b><span>'+x[0]+'</span></button>';}).join('')}</div><div class="toolbar"><span class="context-label">权限、接口、发布与主数据异常统一落到服务单、运行批次、错误码、补偿和对账。</span><span class="spacer"></span><button class="primary" onclick="openServiceForm()">+ 发起服务申请</button></div><div class="table-card"><table><thead><tr><th>序号</th><th>服务单号</th><th>服务事项</th><th>类型</th><th>关联对象</th><th>运行批次 / 错误码</th><th>责任人</th><th>状态</th></tr></thead><tbody>${rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td><a onclick="openServiceDetail(\''+x.id+'\')">'+x.id+'</a></td><td><button class="table-link" onclick="openServiceDetail(\''+x.id+'\')">'+x.title+'</button></td><td>'+x.type+'</td><td><button class="link" onclick="openObject(\''+x.related+'\')">'+x.related+'</button></td><td>'+x.run+' / '+x.error+'</td><td>'+x.owner+'</td><td>'+badge(x.status)+'</td></tr>';}).join('')}</tbody></table></div>`;return shell(content,'服务、发布与补偿','以服务单承接权限、接口和发布异常，保留请求、响应、错误码、重试和对账证据。');}
function service(id){return db.services.find(function(x){return x.id===id;});}
function openServiceDetail(id){const x=service(id);const action=x.status==='待补偿'?'<button class="primary" '+(!canAction('serviceRetry')?'disabled':'')+' onclick="retryService(\''+id+'\')">查看错误并补偿重试</button>':x.status==='待发布'?'<button class="primary" '+(!canAction('servicePublish')?'disabled':'')+' onclick="publishService(\''+id+'\')">验证并发布</button>':'';openModal(x.id+' · '+x.title,'<div class="info-grid">'+info('服务类型',x.type)+info('申请人',x.requester)+info('处理责任人',x.owner)+info('关联对象','<button class="link" onclick="closeModal();openObject(\''+x.related+'\')">'+x.related+'</button>')+info('运行批次',x.run)+info('错误码 / 响应',x.error)+info('当前状态',badge(x.status))+info('审计轨迹',x.audit.length+'条')+'</div><div class="context-tip">真实接口、电子签署及生产环境发布需具备接口规范、授权和联调环境；当前 Demo 仅模拟运行记录与可回看结果。</div>','<button class="secondary" onclick="closeModal()">关闭</button>'+action,true);}
function retryService(id){if(!canAction('serviceRetry')){denied('serviceRetry');return;}const x=service(id);x.status='已完成';x.error='补偿成功 · 响应200';x.run='RUN-20260825-1105';audit(x,'补偿重试','保留原错误E102；本次运行成功并完成组织编码对账');const o=onboarding('ONB-202608-006');if(o){const t=o.tasks.find(function(a){return a.id==='ONB-T02';});if(t&&t.status==='失败待补偿'){t.status='已完成';t.result='补偿重试成功，OA与ERP账号已创建并关联员工编号';refreshOnboardingState(o);}}closeModal();render();toast('补偿运行、关联入职任务、服务状态和审计日志已同步');}
function publishService(id){if(!canAction('servicePublish')){denied('servicePublish');return;}const x=service(id);x.status='已完成';audit(x,'发布变更','发布验证通过，生成版本、运行批次与回退点');closeModal();render();toast('发布状态、运行批次和审计结果已同步');}
function openServiceForm(){if(!canAction('serviceCreate')){denied('serviceCreate');return;}openModal('发起信息化服务申请','<div class="form-grid"><div class="field full"><label>服务事项 <em>*</em></label><input id="serviceTitle" value="生产报工接口字段映射调整"></div><div class="field"><label>服务类型</label><select id="serviceType"><option>接口配置变更</option><option>权限申请</option><option>故障报修</option></select></div><div class="field"><label>关联对象</label><select id="serviceRelated"><option>MET-002</option><option>ONB-202608-006</option></select></div><div class="field full"><label>模拟边界</label><div class="readonly-box">提交后生成服务单、待评估状态和运行日志；不触发生产系统。</div></div></div>','<button class="secondary" onclick="closeModal()">取消</button><button class="primary" onclick="createService()">提交服务申请</button>');}
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
render();
