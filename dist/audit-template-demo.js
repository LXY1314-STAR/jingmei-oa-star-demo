/* Audit demo enhancement: keep representative contract-template and compliance records visible by default. */
(() => {
  if (typeof AuditWorkspace === 'undefined') return;

  const company = AuditWorkspace.config?.company || '五粮液精美印务';
  const project = AuditWorkspace.config?.project || '包装材料年度采购';

  const templateRows = AuditWorkspace.store?.records?.contractTemplate;
  if (Array.isArray(templateRows)) {
    const commonTemplate = {
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
    const templateDefaults = [
      {
        id: 'CTM-2026-005', flowId: 'WF-CTM-2026-005', title: '信息系统运维服务合同模板',
        department: '信息工程部', owner: '尚椿琳', due: '2026-08-28', status: '已生效',
        operation: '新增', contractType: '服务合同', partyRole: '甲方', direction: '付款',
        scope: '信息系统运维及技术服务', version: 'V1.4', effective: '2026-07-15',
        body: '第一条：服务方按约定范围提供运维与技术支持。\n第二条：服务验收合格后按合同约定办理付款。\n第三条：重大故障及数据安全事项按约定时限响应。',
        clauses: [
          { name: '服务范围', basis: '信息化服务管理要求', requirement: '明确服务边界、响应级别及交付成果' },
          { name: '验收与付款', basis: '合同及财务管理要求', requirement: '验收结果与付款条件保持一致' },
        ],
        audit: [{ time: '2026-07-15 10:00', actor: '审计监督部', role: 'audit', action: '模板生效', result: 'V1.4 进入有效模板库' }],
      },
      {
        id: 'CTM-2026-004', flowId: 'WF-CTM-2026-004', title: '印刷产品销售标准合同模板',
        department: '经营发展部', owner: '周敏', due: '2026-08-20', status: '已停用',
        operation: '停用', contractType: '销售合同', partyRole: '乙方', direction: '收款',
        scope: '印刷产品销售及交付', version: 'V1.2', effective: '2026-03-01',
        body: '第一条：双方按订单及技术要求确认产品规格与交付计划。\n第二条：客户按约定节点完成验收与付款。\n第三条：质量异议及违约责任按合同约定处理。',
        clauses: [
          { name: '交付条件', basis: '销售业务管理要求', requirement: '明确订单、交付及验收依据' },
          { name: '收款条件', basis: '财务管理要求', requirement: '明确收款节点及逾期处理规则' },
        ],
        audit: [{ time: '2026-08-20 16:30', actor: '审计监督部', role: 'audit', action: '模板停用', result: 'V1.2 停止用于新合同，历史合同继续保留版本引用' }],
      },
    ];
    for (const item of templateDefaults) {
      const existing = templateRows.find(row => row.id === item.id);
      if (existing) Object.assign(existing, commonTemplate, item);
      else templateRows.push({ ...commonTemplate, ...item });
    }
  }

  const complianceRows = AuditWorkspace.store?.records?.compliance;
  if (Array.isArray(complianceRows)) {
    const commonCompliance = {
      kind: 'compliance', company, project, status: '已生效',
      files: [], audit: [], history: [], plan: [], feedback: [], reviews: [], progress: 100,
    };
    const complianceDefaults = [
      {
        id: 'CMP-2026-018', flowId: 'WF-CMP-2026-018', title: '采购合同合规清单',
        department: '采购部', owner: '赵倩', due: '2026-08-30', operation: '新增',
        scope: '采购/框架合同', version: '2026版', effective: '2026-08-01', reviewDate: '2026-11-01',
        basis: '公司采购及合同管理制度', clauses: [
          { name: '供应商资格', basis: '采购管理制度', requirement: '识别资质过期风险；评估履约影响；签约前复核有效期' },
          { name: '付款合规', basis: '财务付款制度', requirement: '验收和发票双重核验' },
        ],
      },
      {
        id: 'CMP-2026-019', flowId: 'WF-CMP-2026-019', title: '销售合同合规清单',
        department: '经营发展部', owner: '周敏', due: '2026-09-05', operation: '新增',
        scope: '销售/经销合同', version: '2026版', effective: '2026-08-05', reviewDate: '2026-11-05',
        basis: '销售合同及授权管理制度', clauses: [
          { name: '客户资信', basis: '销售管理制度', requirement: '签约前核验客户资信、授权与回款条件' },
          { name: '价格与账期', basis: '销售价格管理制度', requirement: '价格、账期和审批权限保持一致' },
        ],
      },
      {
        id: 'CMP-2026-020', flowId: 'WF-CMP-2026-020', title: '服务合同合规清单',
        department: '信息工程部', owner: '尚椿琳', due: '2026-09-10', operation: '修订',
        scope: '服务/维保合同', version: '2026版V1.1', effective: '2026-08-12', reviewDate: '2026-11-12',
        basis: '服务采购及合同管理制度', clauses: [
          { name: '服务范围', basis: '服务采购管理制度', requirement: '明确服务边界、交付物、响应时限与验收标准' },
          { name: '验收付款', basis: '财务付款制度', requirement: '验收结果、发票及付款条件保持一致' },
        ],
      },
    ];

    const defaultIds = new Set(complianceDefaults.map(item => item.id));
    for (let i = complianceRows.length - 1; i >= 0; i -= 1) {
      if (!defaultIds.has(complianceRows[i].id)) complianceRows.splice(i, 1);
    }
    for (const item of complianceDefaults) {
      const existing = complianceRows.find(row => row.id === item.id);
      if (existing) Object.assign(existing, commonCompliance, item);
      else complianceRows.push({ ...commonCompliance, ...item });
    }
    complianceRows.sort((a, b) => String(a.id).localeCompare(String(b.id), 'zh-CN'));
  }
})();
