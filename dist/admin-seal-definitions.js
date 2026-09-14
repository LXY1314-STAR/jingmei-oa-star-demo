/* SOW 2.1.5 — 印章证照 4 条流程深化。正式审批权限、章种和证照目录以客户确认制度为准。 */
(() => {
  if (typeof ADMIN_DEFINITIONS === 'undefined') return;

  const definitions = [
    {
      key:'sealUse', code:'OA-L3-030101', name:'用印申请流程', group:'印章证照',
      fields:[
        {key:'文件类别',label:'文件类别',type:'select',value:'证明材料',options:['证明材料','授权委托书','对外报送材料','其他非合同文件']},
        {key:'文件名称',label:'最终版文件名称',type:'text',value:'银行资信证明材料_V3最终版.pdf'},
        {key:'文件版本',label:'送审文件版本',type:'text',value:'V3'},
        {key:'最终版确认',label:'是否最终版',type:'select',value:'是',options:['是','否']},
        {key:'印章编号',label:'使用印章',type:'select',value:'SEAL-001 公司公章',options:['SEAL-001 公司公章','SEAL-002 法定代表人章','SEAL-003 财务专用章']},
        {key:'用印份数',label:'用印份数',type:'number',value:'3'},
        {key:'骑缝章',label:'是否加盖骑缝章',type:'select',value:'是',options:['是','否']},
        {key:'密级',label:'文件密级',type:'select',value:'普通',options:['普通','内部']},
        {key:'用途说明',label:'用印用途',type:'textarea',value:'用于银行资信材料对外提交；非合同类文件。'}
      ],
      columns:[
        {key:'文件名称',type:'text',options:null},
        {key:'送审版本',type:'text',options:null},
        {key:'最终版校验',type:'select',options:['待校验','一致']},
        {key:'实际用印份数',type:'number',options:null},
        {key:'执行结果',type:'select',options:['待用印','已用印']}
      ],
      rows:[{'文件名称':'银行资信证明材料_V3最终版.pdf','送审版本':'V3','最终版校验':'一致','实际用印份数':3,'执行结果':'待用印'}],
      steps:['最终版文件与印章核验','授权审批','实际用印登记','盖章文件归档'],
      roles:['admin','manager','admin','admin'],
      initial:'银行资信证明材料用印'
    },
    {
      key:'sealOut', code:'OA-L3-030102', name:'印章外出使用流程', group:'印章证照',
      fields:[
        {key:'印章编号',label:'外出印章',type:'select',value:'SEAL-001 公司公章',options:['SEAL-001 公司公章','SEAL-002 法定代表人章','SEAL-003 财务专用章']},
        {key:'外出事由',label:'外出事由',type:'textarea',value:'现场办理政府窗口材料，需要携章现场核验。'},
        {key:'使用地点',label:'使用地点',type:'text',value:'宜宾市政务服务中心'},
        {key:'计划领出时间',label:'计划领出时间',type:'datetime-local',value:'2026-09-18T09:00'},
        {key:'计划归还时间',label:'计划归还时间',type:'datetime-local',value:'2026-09-18T17:00'},
        {key:'使用人',label:'使用人',type:'text',value:'周敏'},
        {key:'陪同人',label:'陪同人',type:'text',value:'何静'},
        {key:'风险说明',label:'现场保管与风险说明',type:'textarea',value:'印章全程由专人保管，现场使用后当日归还。'}
      ],
      columns:[
        {key:'使用事项',type:'text',options:null},
        {key:'现场文件',type:'text',options:null},
        {key:'领出登记',type:'select',options:['待登记','已领出']},
        {key:'归还结果',type:'select',options:['待归还','完好归还','异常']},
        {key:'核验说明',type:'text',options:null}
      ],
      rows:[{'使用事项':'政府窗口材料现场核验','现场文件':'资质申报材料_V2.pdf','领出登记':'待登记','归还结果':'待归还','核验说明':'待领出后登记'}],
      steps:['外出申请核验','专项授权审批','确认领出','归还核验','归档外出使用记录'],
      roles:['admin','manager','admin','admin','admin'],
      initial:'公司公章外出使用'
    },
    {
      key:'sealLifecycle', code:'OA-L3-030103', name:'印章刻制、启用、停用及销毁流程', group:'印章证照',
      fields:[
        {key:'办理类型',label:'办理类型',type:'select',value:'启用',options:['刻制','启用','停用','销毁']},
        {key:'印章编号',label:'印章编号',type:'select',value:'SEAL-004 业务专用章',options:['SEAL-004 业务专用章','SEAL-001 公司公章','SEAL-002 法定代表人章','SEAL-003 财务专用章']},
        {key:'印章名称',label:'印章名称',type:'text',value:'业务专用章'},
        {key:'印章类型',label:'印章类型',type:'select',value:'业务专用章',options:['公司公章','合同专用章','财务专用章','法定代表人章','业务专用章','其他']},
        {key:'保管部门',label:'保管部门',type:'text',value:'党政综合办'},
        {key:'保管人',label:'保管人',type:'text',value:'何静'},
        {key:'计划生效日期',label:'计划生效/停用日期',type:'date',value:'2026-09-20'},
        {key:'办理依据',label:'刻制、启停或销毁依据',type:'textarea',value:'根据公司授权及印章管理要求办理，审批依据以正式制度为准。'}
      ],
      columns:[
        {key:'生命周期节点',type:'select',options:['刻制','启用','停用','销毁']},
        {key:'计划日期',type:'date',options:null},
        {key:'实际日期',type:'date',options:null},
        {key:'凭证编号',type:'text',options:null},
        {key:'核验结论',type:'select',options:['待核验','通过']}
      ],
      rows:[{'生命周期节点':'启用','计划日期':'2026-09-20','实际日期':'2026-09-20','凭证编号':'SEAL-CERT-202609-004','核验结论':'待核验'}],
      steps:['生命周期事项申请','授权审批','更新印章台账状态','归档处置证据'],
      roles:['admin','manager','admin','admin'],
      initial:'业务专用章启用'
    },
    {
      key:'licenseLoan', code:'OA-L3-030104', name:'证照借用及归还流程', group:'印章证照',
      fields:[
        {key:'办理类型',label:'办理类型',type:'select',value:'借用',options:['借用','提前归还','延期','实际归还']},
        {key:'证照编号',label:'证照',type:'select',value:'LIC-001 营业执照',options:['LIC-001 营业执照','LIC-002 印刷经营许可证','LIC-003 排污许可证']},
        {key:'借用形式',label:'借用形式',type:'select',value:'原件',options:['原件','复印件']},
        {key:'借用事由',label:'借用事由',type:'textarea',value:'办理银行资信材料，需要核验营业执照原件。'},
        {key:'借用人',label:'借用人',type:'text',value:'王晓雨'},
        {key:'计划借出日期',label:'计划借出日期',type:'date',value:'2026-09-18'},
        {key:'计划归还日期',label:'计划归还日期',type:'date',value:'2026-09-19'},
        {key:'延期至',label:'延期至（延期时适用）',type:'date',value:'2026-09-22'},
        {key:'实际归还日期',label:'实际归还日期',type:'date',value:'2026-09-19'}
      ],
      columns:[
        {key:'证照/材料',type:'text',options:null},
        {key:'数量',type:'number',options:null},
        {key:'借出登记',type:'select',options:['待借出','已借出']},
        {key:'归还状态',type:'select',options:['待归还','已归还','延期中']},
        {key:'归还核验',type:'text',options:null}
      ],
      rows:[{'证照/材料':'营业执照原件','数量':1,'借出登记':'待借出','归还状态':'待归还','归还核验':'待实际归还后核验'}],
      steps:['借用条件与库存核验','授权审批','借出登记','归还/延期登记','归档借还记录'],
      roles:['admin','manager','admin','admin','admin'],
      initial:'营业执照原件借用'
    }
  ];

  const existing = new Set(ADMIN_DEFINITIONS.map(item => item.key));
  for (const definition of definitions) if (!existing.has(definition.key)) ADMIN_DEFINITIONS.push(definition);
})();
