/* SOW 2.1.4 — 31 workflow contracts. Values are demo configuration, not customer policy. */
const HR_DEFINITIONS = [
  {
    "key": "01",
    "code": "OA-L3-070101",
    "name": "招聘需求及计划审批流程",
    "scope": "部门提出招聘需求，校验编制、岗位及年度计划，完成招聘必要性、人数、到岗时间和招聘方式审批。",
    "short": "招聘需求",
    "domain": "recruit",
    "fields": [
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "质量检验员"
      },
      {
        "key": "年度计划",
        "label": "年度计划",
        "type": "text",
        "value": "2026年度招聘计划"
      },
      {
        "key": "编制余额",
        "label": "编制余额",
        "type": "number",
        "value": "2"
      },
      {
        "key": "需求人数",
        "label": "需求人数",
        "type": "number",
        "value": "1"
      },
      {
        "key": "招聘方式",
        "label": "招聘方式",
        "type": "select",
        "value": "公开招聘",
        "options": [
          "公开招聘",
          "内部竞聘"
        ]
      },
      {
        "key": "到岗日期",
        "label": "到岗日期",
        "type": "date",
        "value": "2026-10-01"
      }
    ],
    "steps": [
      {
        "name": "岗位编制核验",
        "role": "hr"
      },
      {
        "name": "必要性与人数审批",
        "role": "manager"
      },
      {
        "name": "招聘计划发布",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "02",
    "code": "OA-L3-070102",
    "name": "拟录用人员审批流程",
    "scope": "对候选人资格、面试评价、拟录用岗位、薪酬建议和录用条件进行审批，形成录用结论。",
    "short": "拟录用",
    "domain": "recruit",
    "fields": [
      {
        "key": "候选人",
        "label": "候选人",
        "type": "text",
        "value": "赵宁"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "质量检验员"
      },
      {
        "key": "面试评价",
        "label": "面试评价",
        "type": "text",
        "value": "专业知识及操作考核通过"
      },
      {
        "key": "薪酬建议",
        "label": "薪酬建议",
        "type": "text",
        "value": "按核准薪档（模拟）"
      },
      {
        "key": "录用条件",
        "label": "录用条件",
        "type": "text",
        "value": "体检与证明资料核验通过"
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2026-10-01"
      }
    ],
    "steps": [
      {
        "name": "资格与面试核验",
        "role": "hr"
      },
      {
        "name": "录用条件审批",
        "role": "manager"
      },
      {
        "name": "生成入职预档案",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "03",
    "code": "OA-L3-070103",
    "name": "员工入职协同流程",
    "scope": "采集入职资料并由人事审核，协同账号、卡证、物资、培训和劳动合同办理；按人员类别和适用条件下发宿舍、车辆信息录入、指纹/人脸录入、节假日慰问品、购物卡及季度劳保等协同任务，并登记完成结果。",
    "short": "入职协同",
    "domain": "recruit",
    "fields": [
      {
        "key": "人员类别",
        "label": "人员类别",
        "type": "select",
        "value": "生产员工",
        "options": [
          "生产员工",
          "管理人员"
        ]
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2026-09-10"
      },
      {
        "key": "资料核验",
        "label": "资料核验",
        "type": "select",
        "value": "通过",
        "options": [
          "通过",
          "待补齐"
        ]
      }
    ],
    "steps": [
      {
        "name": "入职资料审核",
        "role": "hr"
      },
      {
        "name": "协同任务办理",
        "role": "hr"
      },
      {
        "name": "入职结果归档",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "04",
    "code": "OA-L3-070104",
    "name": "试用期考核及转正流程",
    "scope": "在试用期到期前下发考核任务，完成员工总结、部门评价、人事复核及转正、延期或不予转正审批；按人员类别和适用条件下发工会会员、企业年金、五粮液家园、购物卡及季度劳保等协同任务，并登记办理结果。",
    "short": "试用期转正",
    "domain": "recruit",
    "fields": [
      {
        "key": "试用结束",
        "label": "试用结束",
        "type": "date",
        "value": "2026-09-30"
      },
      {
        "key": "员工总结",
        "label": "员工总结",
        "type": "text",
        "value": "已完成试用期工作任务"
      },
      {
        "key": "部门评价",
        "label": "部门评价",
        "type": "text",
        "value": "具备岗位任职能力"
      },
      {
        "key": "结论",
        "label": "结论",
        "type": "select",
        "value": "转正",
        "options": [
          "转正",
          "延期",
          "不予转正"
        ]
      },
      {
        "key": "生效日期",
        "label": "生效日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "人员类别",
        "label": "人员类别",
        "type": "select",
        "value": "生产员工",
        "options": [
          "生产员工",
          "管理人员"
        ]
      }
    ],
    "steps": [
      {
        "name": "员工总结",
        "role": "employee"
      },
      {
        "name": "部门评价",
        "role": "hrHead"
      },
      {
        "name": "人事复核",
        "role": "hr"
      },
      {
        "name": "转正审批",
        "role": "manager"
      },
      {
        "name": "条件事项办理",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "05",
    "code": "OA-L3-070105",
    "name": "人员调配及岗位异动流程",
    "scope": "覆盖部门内调动、跨部门调动、转岗、批量调动、机构调整及调配池转入转出；部门内调动在表单中单独呈现，审批后联动组织、岗位、权限及员工档案，并按目标岗位要求进行资格校验。",
    "short": "人员异动",
    "domain": "recruit",
    "fields": [
      {
        "key": "异动类型",
        "label": "异动类型",
        "type": "select",
        "value": "部门内调动",
        "options": [
          "部门内调动",
          "跨部门调动",
          "转岗",
          "批量调动",
          "机构调整",
          "调配池转入",
          "调配池转出"
        ]
      },
      {
        "key": "目标部门",
        "label": "目标部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "目标岗位",
        "label": "目标岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "生效日期",
        "label": "生效日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "人员明细",
        "label": "人员明细",
        "type": "text",
        "value": "EMP-2026-018"
      },
      {
        "key": "资格要求",
        "label": "资格要求",
        "type": "select",
        "value": "有效资格",
        "options": [
          "有效资格",
          "无需特殊资格"
        ]
      }
    ],
    "steps": [
      {
        "name": "目标岗位资格核验",
        "role": "hr"
      },
      {
        "name": "异动审批",
        "role": "manager"
      },
      {
        "name": "组织及权限协同",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "06",
    "code": "OA-L3-070106",
    "name": "劳动合同管理流程",
    "scope": "覆盖劳动合同签订、续签、变更、到期提醒、电子或线下签署、签署状态回传、签署版文件归档及员工劳动合同档案查询；电子签名服务商、实名认证、印章授权、签署位置及法律效力以双方确认方案为准。",
    "short": "劳动合同",
    "domain": "relation",
    "fields": [
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "签订",
        "options": [
          "签订",
          "续签",
          "变更"
        ]
      },
      {
        "key": "合同编号",
        "label": "合同编号",
        "type": "text",
        "value": "LD-2026-018"
      },
      {
        "key": "签署方式",
        "label": "签署方式",
        "type": "select",
        "value": "线下签署",
        "options": [
          "线下签署",
          "电子签模拟"
        ]
      },
      {
        "key": "到期日期",
        "label": "到期日期",
        "type": "date",
        "value": "2029-09-30"
      },
      {
        "key": "签署状态",
        "label": "签署状态",
        "type": "select",
        "value": "待签署",
        "options": [
          "待签署",
          "已签署"
        ]
      }
    ],
    "steps": [
      {
        "name": "合同内容核验",
        "role": "hr"
      },
      {
        "name": "合同审批",
        "role": "manager"
      },
      {
        "name": "签署结果登记",
        "role": "hr"
      },
      {
        "name": "签署版归档",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "07",
    "code": "OA-L3-070107",
    "name": "员工主动离职流程",
    "scope": "由员工提出离职申请，完成审批、工作和资产交接、账号停用、结算协同及资料归档。",
    "short": "主动离职",
    "domain": "relation",
    "fields": [
      {
        "key": "离职日期",
        "label": "离职日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "离职原因",
        "label": "离职原因",
        "type": "text",
        "value": "个人职业发展"
      },
      {
        "key": "交接说明",
        "label": "交接说明",
        "type": "text",
        "value": "工作、资产、账号、结算分项办理"
      }
    ],
    "steps": [
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "离职审核",
        "role": "hr"
      },
      {
        "name": "交接任务办理",
        "role": "hr"
      },
      {
        "name": "考勤结算及停用协同",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "08",
    "code": "OA-L3-070108",
    "name": "劳动关系解除或终止流程",
    "scope": "由人力资源部发起解除或终止事项，记录依据、审批意见、通知送达、交接和办理结果。",
    "short": "解除终止",
    "domain": "relation",
    "fields": [
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "解除",
        "options": [
          "解除",
          "终止"
        ]
      },
      {
        "key": "依据",
        "label": "依据",
        "type": "text",
        "value": "固定期限合同届满"
      },
      {
        "key": "通知送达",
        "label": "通知送达",
        "type": "select",
        "value": "待送达",
        "options": [
          "待送达",
          "已送达"
        ]
      },
      {
        "key": "终止日期",
        "label": "终止日期",
        "type": "date",
        "value": "2026-10-01"
      }
    ],
    "steps": [
      {
        "name": "依据审核",
        "role": "hr"
      },
      {
        "name": "审批",
        "role": "manager"
      },
      {
        "name": "通知送达",
        "role": "hr"
      },
      {
        "name": "交接与结算",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "09",
    "code": "OA-L3-070109",
    "name": "员工投诉、申诉及劳动争议处理流程",
    "scope": "受理员工投诉、申诉或劳动争议，完成登记、调查、处理、调解/仲裁跟踪、结果反馈和资料归集。",
    "short": "劳动争议",
    "domain": "relation",
    "fields": [
      {
        "key": "事项类型",
        "label": "事项类型",
        "type": "select",
        "value": "投诉",
        "options": [
          "投诉",
          "申诉",
          "劳动争议"
        ]
      },
      {
        "key": "诉求",
        "label": "诉求",
        "type": "text",
        "value": "申请核查相关办理结果"
      },
      {
        "key": "调查记录",
        "label": "调查记录",
        "type": "text",
        "value": "核对员工说明与原始材料"
      },
      {
        "key": "处理结论",
        "label": "处理结论",
        "type": "text",
        "value": "按复核结论反馈"
      },
      {
        "key": "关联案件",
        "label": "关联案件",
        "type": "text",
        "value": "无"
      }
    ],
    "steps": [
      {
        "name": "受理登记",
        "role": "hr"
      },
      {
        "name": "调查核实",
        "role": "hr"
      },
      {
        "name": "调解仲裁跟踪",
        "role": "hrArb"
      },
      {
        "name": "结果反馈",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "10",
    "code": "OA-L3-070110",
    "name": "离岗休养或因病离岗休息审批流程",
    "scope": "提交离岗原因、期限及证明材料，完成部门和人事审批，记录复岗、延期或终止结果。",
    "short": "离岗休养",
    "domain": "relation",
    "fields": [
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-10-15"
      },
      {
        "key": "休养原因",
        "label": "休养原因",
        "type": "text",
        "value": "依据证明申请离岗休养（模拟）"
      },
      {
        "key": "后续结果",
        "label": "后续结果",
        "type": "select",
        "value": "复岗",
        "options": [
          "复岗",
          "延期",
          "终止"
        ]
      },
      {
        "key": "后续日期",
        "label": "后续日期",
        "type": "date",
        "value": "2026-10-16"
      }
    ],
    "steps": [
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "人事复核",
        "role": "hr"
      },
      {
        "name": "后续结果登记",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "11",
    "code": "OA-L3-070111",
    "name": "员工档案填报、变更及归集流程",
    "scope": "员工可按授权填报或提交档案修改申请，人事审核后更新档案；调动、奖惩、绩效及岗位资格等结果按规则归集，保留来源流程、版本和修改轨迹。",
    "short": "档案变更",
    "domain": "relation",
    "fields": [
      {
        "key": "变更字段",
        "label": "变更字段",
        "type": "select",
        "value": "mobile",
        "options": [
          "mobile",
          "location"
        ]
      },
      {
        "key": "变更后值",
        "label": "变更后值",
        "type": "text",
        "value": "生产园区A区"
      },
      {
        "key": "变更原因",
        "label": "变更原因",
        "type": "text",
        "value": "员工申请更新档案资料"
      }
    ],
    "steps": [
      {
        "name": "人事审核",
        "role": "hr"
      },
      {
        "name": "档案版本更新",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "12",
    "code": "OA-L3-070201",
    "name": "请假申请流程",
    "scope": "员工按假别提交起止时间、时长及证明材料，系统按公司、假别和天数匹配审批并占用假期余额。",
    "short": "请假",
    "domain": "attendance",
    "fields": [
      {
        "key": "假别",
        "label": "假别",
        "type": "select",
        "value": "年休假",
        "options": [
          "年休假",
          "事假",
          "补休"
        ]
      },
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-10-08"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-10-08"
      },
      {
        "key": "开始时刻",
        "label": "开始时刻",
        "type": "text",
        "value": "08:30"
      },
      {
        "key": "结束时刻",
        "label": "结束时刻",
        "type": "text",
        "value": "17:30"
      },
      {
        "key": "天数",
        "label": "天数",
        "type": "number",
        "value": "1"
      },
      {
        "key": "事由",
        "label": "事由",
        "type": "text",
        "value": "个人事务"
      }
    ],
    "steps": [
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "人事备案",
        "role": "hr"
      },
      {
        "name": "考勤回写",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "13",
    "code": "OA-L3-070202",
    "name": "销假及假期变更流程",
    "scope": "关联已审批请假单办理提前销假、延期或时间变更，保留原记录并调整考勤和假期余额。",
    "short": "销假变更",
    "domain": "attendance",
    "fields": [
      {
        "key": "原单编号",
        "label": "原单编号",
        "type": "text",
        "value": "LV-202608-041"
      },
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "提前销假",
        "options": [
          "提前销假",
          "延期",
          "时间变更"
        ]
      },
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-08-10"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-08-10"
      },
      {
        "key": "新天数",
        "label": "新天数",
        "type": "number",
        "value": "1"
      },
      {
        "key": "原因",
        "label": "原因",
        "type": "text",
        "value": "提前返岗"
      }
    ],
    "steps": [
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "人事核定",
        "role": "hr"
      },
      {
        "name": "差额回写",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "14",
    "code": "OA-L3-070203",
    "name": "加班申请流程",
    "scope": "员工或部门内勤提交加班时段、事由和人员，完成核定时长审批并校验重复申报。",
    "short": "加班",
    "domain": "attendance",
    "fields": [
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-10-10"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-10-10"
      },
      {
        "key": "开始时刻",
        "label": "开始时刻",
        "type": "text",
        "value": "18:00"
      },
      {
        "key": "结束时刻",
        "label": "结束时刻",
        "type": "text",
        "value": "22:00"
      },
      {
        "key": "加班类别",
        "label": "加班类别",
        "type": "select",
        "value": "平时",
        "options": [
          "平时",
          "周末",
          "节假日"
        ]
      },
      {
        "key": "小时数",
        "label": "小时数",
        "type": "number",
        "value": "4"
      },
      {
        "key": "人员明细",
        "label": "人员明细",
        "type": "text",
        "value": "EMP-2026-018"
      },
      {
        "key": "事由",
        "label": "事由",
        "type": "text",
        "value": "生产支持"
      }
    ],
    "steps": [
      {
        "name": "部门核定",
        "role": "hrHead"
      },
      {
        "name": "人事审核",
        "role": "hr"
      },
      {
        "name": "加班来源归集",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "15",
    "code": "OA-L3-070204",
    "name": "调休申请流程",
    "scope": "员工基于可用调休余额申请调休，校验余额、时段冲突和有效期，审批后进入考勤。",
    "short": "调休",
    "domain": "attendance",
    "fields": [
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-10-12"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-10-12"
      },
      {
        "key": "开始时刻",
        "label": "开始时刻",
        "type": "text",
        "value": "08:30"
      },
      {
        "key": "结束时刻",
        "label": "结束时刻",
        "type": "text",
        "value": "12:30"
      },
      {
        "key": "天数",
        "label": "天数",
        "type": "number",
        "value": "0.5"
      },
      {
        "key": "来源类别",
        "label": "来源类别",
        "type": "select",
        "value": "平时",
        "options": [
          "平时",
          "周末",
          "节假日"
        ]
      },
      {
        "key": "事由",
        "label": "事由",
        "type": "text",
        "value": "使用加班补休"
      }
    ],
    "steps": [
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "余额与期限复核",
        "role": "hr"
      },
      {
        "name": "考勤回写",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "16",
    "code": "OA-L3-070205",
    "name": "出差、外出及外勤流程",
    "scope": "通过事项类型区分出差、临时外出和外勤任务，登记时间、地点和事由；审批结果进入考勤，差旅财务处理由ERP承接。",
    "short": "出差外勤",
    "domain": "attendance",
    "fields": [
      {
        "key": "事项类型",
        "label": "事项类型",
        "type": "select",
        "value": "出差",
        "options": [
          "出差",
          "临时外出",
          "外勤"
        ]
      },
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-10-13"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-10-13"
      },
      {
        "key": "开始时刻",
        "label": "开始时刻",
        "type": "text",
        "value": "08:30"
      },
      {
        "key": "结束时刻",
        "label": "结束时刻",
        "type": "text",
        "value": "17:30"
      },
      {
        "key": "地点",
        "label": "地点",
        "type": "text",
        "value": "成都供应商现场"
      },
      {
        "key": "事由",
        "label": "事由",
        "type": "text",
        "value": "现场质量核验"
      }
    ],
    "steps": [
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "人事备案",
        "role": "hr"
      },
      {
        "name": "考勤回写",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "17",
    "code": "OA-L3-070206",
    "name": "生产排班及调班流程",
    "scope": "按部门/班组发布排班，并关联原排班办理临时调班或换班，保留版本、冲突校验和实际班次。",
    "short": "排班调班",
    "domain": "attendance",
    "fields": [
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "排班发布",
        "options": [
          "排班发布",
          "调班",
          "换班"
        ]
      },
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-10-14"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-10-14"
      },
      {
        "key": "原班次",
        "label": "原班次",
        "type": "text",
        "value": "早班"
      },
      {
        "key": "目标班次",
        "label": "目标班次",
        "type": "select",
        "value": "早班",
        "options": [
          "早班",
          "中班",
          "晚班"
        ]
      },
      {
        "key": "班组",
        "label": "班组",
        "type": "text",
        "value": "印刷一班"
      },
      {
        "key": "人员明细",
        "label": "人员明细",
        "type": "text",
        "value": "EMP-2026-018"
      },
      {
        "key": "原版本",
        "label": "原版本",
        "type": "text",
        "value": "排班V1"
      }
    ],
    "steps": [
      {
        "name": "班次资格核验",
        "role": "hr"
      },
      {
        "name": "部门审批",
        "role": "hrHead"
      },
      {
        "name": "排班版本发布",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "18",
    "code": "OA-L3-070207",
    "name": "考勤异常及补卡处理流程",
    "scope": "处理缺卡、迟到、早退和班次冲突等异常，完成员工说明或补卡、部门审核和人事复核。",
    "short": "考勤异常",
    "domain": "attendance",
    "fields": [
      {
        "key": "异常类型",
        "label": "异常类型",
        "type": "select",
        "value": "缺卡",
        "options": [
          "缺卡",
          "迟到",
          "早退",
          "班次冲突"
        ]
      },
      {
        "key": "开始日期",
        "label": "开始日期",
        "type": "date",
        "value": "2026-09-06"
      },
      {
        "key": "结束日期",
        "label": "结束日期",
        "type": "date",
        "value": "2026-09-06"
      },
      {
        "key": "更正结果",
        "label": "更正结果",
        "type": "select",
        "value": "正常",
        "options": [
          "正常",
          "请假",
          "外勤"
        ]
      },
      {
        "key": "说明",
        "label": "说明",
        "type": "text",
        "value": "已核对原打卡和证明记录"
      }
    ],
    "steps": [
      {
        "name": "部门审核",
        "role": "hrHead"
      },
      {
        "name": "人事复核",
        "role": "hr"
      },
      {
        "name": "日结果更新",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "19",
    "code": "OA-L3-070208",
    "name": "月度考勤确认流程",
    "scope": "汇总排班、打卡、假勤和异常处理结果，生成月度明细并完成员工或部门确认、异议退回和锁定。",
    "short": "月度确认",
    "domain": "attendance",
    "fields": [
      {
        "key": "月份",
        "label": "月份",
        "type": "text",
        "value": "2026-09"
      },
      {
        "key": "确认意见",
        "label": "确认意见",
        "type": "select",
        "value": "无异议",
        "options": [
          "无异议",
          "退回核对"
        ]
      },
      {
        "key": "版本",
        "label": "版本",
        "type": "text",
        "value": "月度V1"
      }
    ],
    "steps": [
      {
        "name": "汇总校验",
        "role": "hr"
      },
      {
        "name": "员工确认",
        "role": "employee"
      },
      {
        "name": "锁定并输出",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "20",
    "code": "OA-L3-070209",
    "name": "年度个人考勤数据查询及输出流程",
    "scope": "按员工、年度、公司及组织查询或输出年度考勤汇总与明细；入职、离职时按制度形成考勤起止及离职结算协同结果。",
    "short": "年度查询",
    "domain": "attendance",
    "fields": [
      {
        "key": "年度",
        "label": "年度",
        "type": "number",
        "value": "2026"
      },
      {
        "key": "公司",
        "label": "公司",
        "type": "text",
        "value": "五粮液精美印务"
      },
      {
        "key": "组织",
        "label": "组织",
        "type": "text",
        "value": "经营发展部"
      }
    ],
    "steps": [
      {
        "name": "年度明细生成",
        "role": "hr"
      },
      {
        "name": "本人核对",
        "role": "employee"
      },
      {
        "name": "汇总输出",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "21",
    "code": "OA-L3-070301",
    "name": "绩效计划制定及调整流程",
    "scope": "制定考核周期、指标、权重和目标值；计划调整关联原计划，说明原因并保留调整前后版本。",
    "short": "绩效计划",
    "domain": "performance",
    "fields": [
      {
        "key": "周期",
        "label": "周期",
        "type": "text",
        "value": "2026年下半年"
      },
      {
        "key": "计划说明",
        "label": "计划说明",
        "type": "text",
        "value": "经营分析与改进目标"
      }
    ],
    "steps": [
      {
        "name": "指标与目标核验",
        "role": "hr"
      },
      {
        "name": "部门确认",
        "role": "hrHead"
      },
      {
        "name": "计划生效",
        "role": "hr"
      }
    ],
    "self": true
  },
  {
    "key": "22",
    "code": "OA-L3-070302",
    "name": "绩效结果确认及申诉流程",
    "scope": "完成评分、校准和结果发布；员工确认或提出申诉，受理后完成复核、仲裁和最终结果反馈。",
    "short": "绩效结果",
    "domain": "performance",
    "fields": [
      {
        "key": "周期",
        "label": "周期",
        "type": "text",
        "value": "2026年下半年"
      },
      {
        "key": "计划编号",
        "label": "计划编号",
        "type": "text",
        "value": "HR-PLAN-001"
      },
      {
        "key": "来源系统",
        "label": "来源系统",
        "type": "select",
        "value": "ERP模拟",
        "options": [
          "ERP模拟"
        ]
      },
      {
        "key": "来源批次",
        "label": "来源批次",
        "type": "text",
        "value": "ERP-PER-2026H2-001"
      },
      {
        "key": "原评分",
        "label": "原评分",
        "type": "number",
        "value": "86"
      },
      {
        "key": "校准分",
        "label": "校准分",
        "type": "number",
        "value": "88"
      },
      {
        "key": "校准依据",
        "label": "校准依据",
        "type": "text",
        "value": "依据已核实成果修正差异（演示）"
      },
      {
        "key": "结果等级",
        "label": "结果等级",
        "type": "text",
        "value": "B+（演示，制度待确认）"
      }
    ],
    "steps": [
      {
        "name": "评分来源核验",
        "role": "hr"
      },
      {
        "name": "校准记录核验",
        "role": "hrHead"
      },
      {
        "name": "结果发布",
        "role": "hr"
      },
      {
        "name": "员工确认或申诉",
        "role": "employee"
      }
    ],
    "self": true
  },
  {
    "key": "23",
    "code": "OA-L3-070303",
    "name": "员工奖惩及档案联动流程",
    "scope": "登记员工奖惩事项并完成审批或关联有效审批来源；按规则更新员工个人档案，保留奖惩依据、结果、来源流程、版本和修改轨迹。",
    "short": "员工奖惩",
    "domain": "performance",
    "fields": [
      {
        "key": "奖惩类型",
        "label": "奖惩类型",
        "type": "select",
        "value": "表彰",
        "options": [
          "表彰",
          "奖励",
          "处分"
        ]
      },
      {
        "key": "依据",
        "label": "依据",
        "type": "text",
        "value": "安全生产表彰决定（模拟）"
      },
      {
        "key": "审批来源",
        "label": "审批来源",
        "type": "text",
        "value": "本流程审批"
      },
      {
        "key": "生效日期",
        "label": "生效日期",
        "type": "date",
        "value": "2026-10-01"
      }
    ],
    "steps": [
      {
        "name": "奖惩依据核验",
        "role": "hr"
      },
      {
        "name": "审批",
        "role": "manager"
      },
      {
        "name": "档案归集",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "24",
    "code": "OA-L3-080101",
    "name": "工资条发布及员工确认流程",
    "scope": "按公司和月份导入工资条，校验模板、人员、金额和重复数据，经复核后定向发布并记录员工确认状态。",
    "short": "工资条",
    "domain": "compensation",
    "fields": [
      {
        "key": "公司",
        "label": "公司",
        "type": "text",
        "value": "五粮液精美印务"
      },
      {
        "key": "月份",
        "label": "月份",
        "type": "text",
        "value": "2026-09"
      },
      {
        "key": "模板版本",
        "label": "模板版本",
        "type": "text",
        "value": "PAY-V1"
      },
      {
        "key": "导入批次",
        "label": "导入批次",
        "type": "text",
        "value": "ERP-PAY-202609-001"
      }
    ],
    "steps": [
      {
        "name": "导入批次校验",
        "role": "hr"
      },
      {
        "name": "复核",
        "role": "hrHead"
      },
      {
        "name": "定向发布",
        "role": "hr"
      },
      {
        "name": "本人确认",
        "role": "employee"
      }
    ],
    "self": true
  },
  {
    "key": "25",
    "code": "OA-L3-080102",
    "name": "薪酬异议及修订确认流程",
    "scope": "员工提交薪酬异议，人事处理并记录结论；需要修订时重新发布并由员工再次确认。",
    "short": "薪酬异议",
    "domain": "compensation",
    "fields": [
      {
        "key": "原单编号",
        "label": "原单编号",
        "type": "text",
        "value": "HR-PAYSLIP-001"
      },
      {
        "key": "异议说明",
        "label": "异议说明",
        "type": "text",
        "value": "请核对加班时长"
      },
      {
        "key": "处理结论",
        "label": "处理结论",
        "type": "text",
        "value": "核对后更新演示金额"
      },
      {
        "key": "修订金额",
        "label": "修订金额",
        "type": "number",
        "value": "8100"
      }
    ],
    "steps": [
      {
        "name": "受理与核查",
        "role": "hr"
      },
      {
        "name": "修订复核",
        "role": "hrHead"
      },
      {
        "name": "修订重发",
        "role": "hr"
      },
      {
        "name": "再次确认",
        "role": "employee"
      }
    ],
    "self": true
  },
  {
    "key": "26",
    "code": "OA-L3-080103",
    "name": "社保、公积金及企业年金办理流程",
    "scope": "通过事项类型办理增减员、缴费审批和缴费基数调整，并记录办理期间、金额、结果和佐证材料。",
    "short": "社保福利",
    "domain": "compensation",
    "fields": [
      {
        "key": "事项类型",
        "label": "事项类型",
        "type": "select",
        "value": "增员",
        "options": [
          "增员",
          "减员",
          "缴费审批",
          "基数调整"
        ]
      },
      {
        "key": "险种",
        "label": "险种",
        "type": "select",
        "value": "社保",
        "options": [
          "社保",
          "公积金",
          "企业年金"
        ]
      },
      {
        "key": "月份",
        "label": "月份",
        "type": "text",
        "value": "2026-09"
      },
      {
        "key": "金额",
        "label": "金额",
        "type": "number",
        "value": "2000"
      },
      {
        "key": "办理结果",
        "label": "办理结果",
        "type": "text",
        "value": "办理完成（模拟）"
      }
    ],
    "steps": [
      {
        "name": "材料核验",
        "role": "hr"
      },
      {
        "name": "办理审批",
        "role": "manager"
      },
      {
        "name": "结果登记",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "27",
    "code": "OA-L3-080104",
    "name": "生育、工伤待遇及保险理赔申请流程",
    "scope": "提交待遇或理赔申请、证明和费用材料，跟踪审核、材料补充、办理结果和归档。",
    "short": "保险理赔",
    "domain": "compensation",
    "fields": [
      {
        "key": "事项类型",
        "label": "事项类型",
        "type": "select",
        "value": "生育待遇",
        "options": [
          "生育待遇",
          "工伤待遇",
          "保险理赔"
        ]
      },
      {
        "key": "费用",
        "label": "费用",
        "type": "number",
        "value": "1000"
      },
      {
        "key": "申请说明",
        "label": "申请说明",
        "type": "text",
        "value": "按证明及费用材料申请（模拟）"
      },
      {
        "key": "办理结果",
        "label": "办理结果",
        "type": "text",
        "value": "受理完成（模拟）"
      }
    ],
    "steps": [
      {
        "name": "材料核验",
        "role": "hr"
      },
      {
        "name": "待遇审核",
        "role": "hr"
      },
      {
        "name": "办理结果归档",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "28",
    "code": "OA-L3-090101",
    "name": "培训计划及实施管理流程",
    "scope": "覆盖培训需求收集、年度计划审批、具体培训项目实施审批、课程发布、学习任务和培训档案。",
    "short": "培训计划实施",
    "domain": "learning",
    "fields": [
      {
        "key": "年度计划",
        "label": "年度计划",
        "type": "text",
        "value": "2026年度培训计划"
      },
      {
        "key": "需求",
        "label": "需求",
        "type": "text",
        "value": "岗位技能提升"
      },
      {
        "key": "课程",
        "label": "课程",
        "type": "text",
        "value": "岗位安全与质量基础"
      },
      {
        "key": "实施日期",
        "label": "实施日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "参加人员",
        "label": "参加人员",
        "type": "text",
        "value": "EMP-2026-018"
      }
    ],
    "steps": [
      {
        "name": "需求归集",
        "role": "hr"
      },
      {
        "name": "年度计划审批",
        "role": "manager"
      },
      {
        "name": "项目实施审批",
        "role": "hrHead"
      },
      {
        "name": "课程与学习任务",
        "role": "hr"
      },
      {
        "name": "培训归档",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "29",
    "code": "OA-L3-090102",
    "name": "培训考试及成绩确认流程",
    "scope": "组织在线或线下考试，维护题库，录入或导入成绩，完成结果确认并归档考试记录。",
    "short": "考试成绩",
    "domain": "learning",
    "fields": [
      {
        "key": "考试方式",
        "label": "考试方式",
        "type": "select",
        "value": "线下考试",
        "options": [
          "线下考试",
          "在线考试"
        ]
      },
      {
        "key": "关联培训",
        "label": "关联培训",
        "type": "text",
        "value": "HR-TRAIN-001"
      },
      {
        "key": "考试名称",
        "label": "考试名称",
        "type": "text",
        "value": "岗位安全与质量考试"
      },
      {
        "key": "成绩",
        "label": "成绩",
        "type": "number",
        "value": "88"
      },
      {
        "key": "合格线",
        "label": "合格线",
        "type": "number",
        "value": "80"
      }
    ],
    "steps": [
      {
        "name": "考试组织",
        "role": "hr"
      },
      {
        "name": "成绩核验",
        "role": "hrHead"
      },
      {
        "name": "结果确认归档",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "30",
    "code": "OA-L3-090103",
    "name": "员工证照管理流程",
    "scope": "覆盖证书、职称和技能等级资料新增更新、权限查看、下载及原件借阅审批。",
    "short": "证照管理",
    "domain": "learning",
    "fields": [
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "新增",
        "options": [
          "新增",
          "更新",
          "原件借阅",
          "原件归还"
        ]
      },
      {
        "key": "证照名称",
        "label": "证照名称",
        "type": "text",
        "value": "岗位安全资格证"
      },
      {
        "key": "类别",
        "label": "类别",
        "type": "select",
        "value": "证书",
        "options": [
          "证书",
          "职称",
          "技能等级"
        ]
      },
      {
        "key": "到期日期",
        "label": "到期日期",
        "type": "date",
        "value": "2027-09-30"
      },
      {
        "key": "借阅用途",
        "label": "借阅用途",
        "type": "text",
        "value": "资格核验"
      },
      {
        "key": "归还日期",
        "label": "归还日期",
        "type": "date",
        "value": "2026-10-15"
      }
    ],
    "steps": [
      {
        "name": "资料核验",
        "role": "hr"
      },
      {
        "name": "证照或借阅审批",
        "role": "hrHead"
      },
      {
        "name": "结果归档",
        "role": "hr"
      }
    ],
    "self": false
  },
  {
    "key": "31",
    "code": "OA-L3-090104",
    "name": "岗位资格考试、准入及复审流程",
    "scope": "组织岗位资格考试，确认准入结论；审批通过后自动更新员工个人档案；对到期资格下发复审或再认证任务并更新有效期。",
    "short": "岗位资格",
    "domain": "learning",
    "fields": [
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "准入",
        "options": [
          "准入",
          "复审",
          "再认证"
        ]
      },
      {
        "key": "关联考试",
        "label": "关联考试",
        "type": "text",
        "value": "HR-EXAM-001"
      },
      {
        "key": "资格名称",
        "label": "资格名称",
        "type": "text",
        "value": "岗位安全资格"
      },
      {
        "key": "到期日期",
        "label": "到期日期",
        "type": "date",
        "value": "2027-09-30"
      }
    ],
    "steps": [
      {
        "name": "考试与证照核验",
        "role": "hr"
      },
      {
        "name": "准入复审审批",
        "role": "hrHead"
      },
      {
        "name": "资格档案更新",
        "role": "hr"
      }
    ],
    "self": false
  }
];
