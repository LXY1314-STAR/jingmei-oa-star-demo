/* Audit demo enhancement: keep three representative contract-template records visible by default. */
(() => {
  if (typeof AuditWorkspace === 'undefined') return;

  const rows = AuditWorkspace.store?.records?.contractTemplate;
  if (!Array.isArray(rows)) return;

  const company = AuditWorkspace.config?.company || '五粮液精美印务';
  const project = AuditWorkspace.config?.project || '包装材料年度采购';
  const common = {
    kind: 'contractTemplate',
    company,
    project,
    files: [],
    history: [],
    plan: [],
    feedback: [],
    reviews: [],
    progress: 100,
  };

  const defaults = [
    {
      id: 'CTM-2026-005',
      flowId: 'WF-CTM-2026-005',
      title: '信息系统运维服务合同模板',
      department: '信息工程部',
      owner: '尚椿琳',
      due: '2026-08-28',
      status: '已生效',
      operation: '新增',
      contractType: '服务合同',
      partyRole: '甲方',
      direction: '付款',
      scope: '信息系统运维及技术服务',
      version: 'V1.4',
      effective: '2026-07-15',
      body: '第一条：服务方按约定范围提供运维与技术支持。\n第二条：服务验收合格后按合同约定办理付款。\n第三条：重大故障及数据安全事项按约定时限响应。',
      clauses: [
        { name: '服务范围', basis: '信息化服务管理要求', requirement: '明确服务边界、响应级别及交付成果' },
        { name: '验收与付款', basis: '合同及财务管理要求', requirement: '验收结果与付款条件保持一致' },
      ],
      audit: [
        { time: '2026-07-15 10:00', actor: '审计监督部', role: 'audit', action: '模板生效', result: 'V1.4 进入有效模板库' },
      ],
    },
    {
      id: 'CTM-2026-004',
      flowId: 'WF-CTM-2026-004',
      title: '印刷产品销售标准合同模板',
      department: '经营发展部',
      owner: '周敏',
      due: '2026-08-20',
      status: '已停用',
      operation: '停用',
      contractType: '销售合同',
      partyRole: '乙方',
      direction: '收款',
      scope: '印刷产品销售及交付',
      version: 'V1.2',
      effective: '2026-03-01',
      body: '第一条：双方按订单及技术要求确认产品规格与交付计划。\n第二条：客户按约定节点完成验收与付款。\n第三条：质量异议及违约责任按合同约定处理。',
      clauses: [
        { name: '交付条件', basis: '销售业务管理要求', requirement: '明确订单、交付及验收依据' },
        { name: '收款条件', basis: '财务管理要求', requirement: '明确收款节点及逾期处理规则' },
      ],
      audit: [
        { time: '2026-08-20 16:30', actor: '审计监督部', role: 'audit', action: '模板停用', result: 'V1.2 停止用于新合同，历史合同继续保留版本引用' },
      ],
    },
  ];

  for (const item of defaults) {
    if (rows.some(row => row.id === item.id)) continue;
    rows.push({ ...common, ...item });
  }
})();
