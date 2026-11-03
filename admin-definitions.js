/* SOW 2.1.5: first batch, 13 workflows. Remaining 16 retain baseline pending page gate. */
const ADMIN_DEFINITIONS = [
  {
    "key": "receipt",
    "code": "OA-L3-020101",
    "name": "收文办理",
    "group": "公文",
    "fields": [
      {
        "key": "收文编号",
        "label": "收文编号",
        "type": "text",
        "value": "精印收〔2026〕18号",
        "options": null
      },
      {
        "key": "来文单位",
        "label": "来文单位",
        "type": "text",
        "value": "集团办公室",
        "options": null
      },
      {
        "key": "来文字号",
        "label": "来文字号",
        "type": "text",
        "value": "集团办〔2026〕示例18号",
        "options": null
      },
      {
        "key": "来文日期",
        "label": "来文日期",
        "type": "date",
        "value": "2026-09-07",
        "options": null
      },
      {
        "key": "密级",
        "label": "密级",
        "type": "select",
        "value": "内部",
        "options": [
          "公开",
          "内部",
          "秘密"
        ]
      },
      {
        "key": "份数",
        "label": "份数",
        "type": "number",
        "value": 1,
        "options": null
      },
      {
        "key": "办理分类",
        "label": "办理分类",
        "type": "select",
        "value": "承办",
        "options": [
          "传阅",
          "承办",
          "阅办"
        ]
      },
      {
        "key": "承办部门",
        "label": "承办部门",
        "type": "select",
        "value": "生产管理部",
        "options": [
          "生产管理部",
          "党政综合办",
          "质量管理部",
          "经营发展部",
          "财务部"
        ]
      },
      {
        "key": "办结日期",
        "label": "要求办结日期",
        "type": "date",
        "value": "2026-09-15",
        "options": null
      },
      {
        "key": "办理要求",
        "label": "办理要求",
        "type": "textarea",
        "value": "完成安全生产检查，提交问题和整改依据。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "接收人",
        "type": "select",
        "options": [
          "何静",
          "刘强",
          "李明"
        ]
      },
      {
        "key": "办理方式",
        "type": "select",
        "options": [
          "承办",
          "阅知"
        ]
      },
      {
        "key": "反馈",
        "type": "text",
        "options": null
      },
      {
        "key": "阅知状态",
        "type": "select",
        "options": [
          "未阅",
          "已阅"
        ]
      }
    ],
    "rows": [
      {
        "接收人": "刘强",
        "办理方式": "承办",
        "反馈": "",
        "阅知状态": "未阅"
      }
    ],
    "steps": [
      "登记分类并分派",
      "提交承办反馈",
      "审核办结",
      "归档来文"
    ],
    "roles": [
      "admin",
      "owner",
      "admin",
      "admin"
    ],
    "initial": "安全生产专项检查通知"
  },
  {
    "key": "issue",
    "code": "OA-L3-020102",
    "name": "公司发文",
    "group": "公文",
    "fields": [
      {
        "key": "发文分类",
        "label": "发文分类",
        "type": "select",
        "value": "下行文",
        "options": [
          "上行文",
          "平行文",
          "下行文"
        ]
      },
      {
        "key": "发文文种",
        "label": "发文文种",
        "type": "select",
        "value": "通知",
        "options": [
          "决定",
          "通知",
          "通报",
          "请示",
          "报告",
          "批复",
          "意见",
          "函",
          "纪要"
        ]
      },
      {
        "key": "发文标题",
        "label": "发文标题",
        "type": "text",
        "value": "关于开展九月安全生产检查的通知",
        "options": null
      },
      {
        "key": "发文编号",
        "label": "发文编号",
        "type": "text",
        "value": "精印〔2026〕18号",
        "options": null
      },
      {
        "key": "紧急程度",
        "label": "紧急程度",
        "type": "select",
        "value": "普通",
        "options": [
          "普通",
          "急件",
          "特急"
        ]
      },
      {
        "key": "密级",
        "label": "密级",
        "type": "select",
        "value": "内部",
        "options": [
          "公开",
          "内部",
          "秘密"
        ]
      },
      {
        "key": "主送单位",
        "label": "主送单位",
        "type": "text",
        "value": "生产管理部",
        "options": null
      },
      {
        "key": "抄送单位",
        "label": "抄送单位",
        "type": "text",
        "value": "质量管理部",
        "options": null
      },
      {
        "key": "正文",
        "label": "正文",
        "type": "textarea",
        "value": "关于开展九月安全生产检查的通知\n请相关部门按计划落实检查并提交报告。",
        "options": null
      },
      {
        "key": "签发依据",
        "label": "签发依据",
        "type": "textarea",
        "value": "年度安全工作安排",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "发送公司",
        "type": "select",
        "options": [
          "五粮液精美印务",
          "演示子公司"
        ]
      },
      {
        "key": "接收部门",
        "type": "text",
        "options": null
      },
      {
        "key": "会签意见",
        "type": "text",
        "options": null
      },
      {
        "key": "发布状态",
        "type": "select",
        "options": [
          "未发布",
          "已发布"
        ]
      }
    ],
    "rows": [
      {
        "发送公司": "五粮液精美印务",
        "接收部门": "生产管理部",
        "会签意见": "",
        "发布状态": "未发布"
      }
    ],
    "steps": [
      "提交拟稿会签",
      "完成部门会签",
      "签发公文",
      "套红编号并发布",
      "归档发文"
    ],
    "roles": [
      "admin",
      "owner",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "九月安全生产检查通知"
  },
  {
    "key": "review",
    "code": "OA-L3-020103",
    "name": "文件评审",
    "group": "公文",
    "fields": [
      {
        "key": "文件名称",
        "label": "文件名称",
        "type": "text",
        "value": "安全生产检查实施方案",
        "options": null
      },
      {
        "key": "文件类型",
        "label": "文件类型",
        "type": "select",
        "value": "方案",
        "options": [
          "制度",
          "方案",
          "业务文件",
          "对外函件",
          "其他"
        ]
      },
      {
        "key": "评审类型",
        "label": "评审类型",
        "type": "select",
        "value": "首次评审",
        "options": [
          "首次评审",
          "修订评审",
          "复审"
        ]
      },
      {
        "key": "文件版本",
        "label": "文件版本",
        "type": "text",
        "value": "V1.0",
        "options": null
      },
      {
        "key": "会签部门",
        "label": "会签部门",
        "type": "text",
        "value": "生产管理部、质量管理部",
        "options": null
      },
      {
        "key": "计划生效日期",
        "label": "计划生效日期",
        "type": "date",
        "value": "2026-09-20",
        "options": null
      },
      {
        "key": "评审说明",
        "label": "评审说明",
        "type": "textarea",
        "value": "安全生产检查实施方案，重点检查设备、消防和培训记录。",
        "options": null
      },
      {
        "key": "评审依据",
        "label": "评审依据",
        "type": "textarea",
        "value": "年度安全生产工作计划及现行制度要求。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "评审部门",
        "type": "text",
        "options": null
      },
      {
        "key": "评审意见",
        "type": "text",
        "options": null
      },
      {
        "key": "结论",
        "type": "select",
        "options": [
          "待评审",
          "同意",
          "修改后再审"
        ]
      }
    ],
    "rows": [
      {
        "评审部门": "生产管理部",
        "评审意见": "",
        "结论": "待评审"
      }
    ],
    "steps": [
      "发起部门评审",
      "汇总会签意见",
      "最终确认",
      "归档评审版本"
    ],
    "roles": [
      "admin",
      "owner",
      "admin",
      "admin"
    ],
    "initial": "安全检查实施方案评审"
  },
  {
    "key": "report",
    "code": "OA-L3-020104",
    "name": "公文对外报送",
    "group": "公文",
    "fields": [
      {
        "key": "报送材料名称",
        "label": "报送材料名称",
        "type": "text",
        "value": "安全检查通知签发版",
        "options": null
      },
      {
        "key": "报送对象",
        "label": "报送对象",
        "type": "text",
        "value": "集团办公室",
        "options": null
      },
      {
        "key": "文件版本",
        "label": "文件版本",
        "type": "text",
        "value": "V1",
        "options": null
      },
      {
        "key": "报送格式",
        "label": "报送格式",
        "type": "select",
        "value": "PDF",
        "options": [
          "PDF",
          "电子正文",
          "纸质原件"
        ]
      },
      {
        "key": "授权范围",
        "label": "授权范围",
        "type": "text",
        "value": "集团办公室",
        "options": null
      },
      {
        "key": "密级",
        "label": "密级",
        "type": "select",
        "value": "内部",
        "options": [
          "公开",
          "内部",
          "秘密"
        ]
      },
      {
        "key": "报送份数",
        "label": "报送份数",
        "type": "number",
        "value": 1,
        "options": null
      },
      {
        "key": "报送时限",
        "label": "报送时限",
        "type": "date",
        "value": "2026-09-18",
        "options": null
      },
      {
        "key": "报送方式",
        "label": "报送方式",
        "type": "select",
        "value": "集团OA模拟",
        "options": [
          "集团OA模拟",
          "邮件模拟",
          "线下送达登记"
        ]
      },
      {
        "key": "报送说明",
        "label": "报送说明",
        "type": "textarea",
        "value": "按集团办公室要求报送签发版及盖章扫描件，注意版本一致性。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "材料名称",
        "type": "text",
        "options": null
      },
      {
        "key": "版本",
        "type": "text",
        "options": null
      },
      {
        "key": "核验结论",
        "type": "select",
        "options": [
          "待核验",
          "一致"
        ]
      }
    ],
    "rows": [
      {
        "材料名称": "安全检查通知签发版",
        "版本": "V1",
        "核验结论": "待核验"
      }
    ],
    "steps": [
      "核验已签发来源",
      "审批报送范围",
      "登记报送结果",
      "归档报送证据"
    ],
    "roles": [
      "admin",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "安全检查文件对外报送"
  },
  {
    "key": "cleanup",
    "code": "OA-L3-020105",
    "name": "公文清理、修订及废止",
    "group": "公文",
    "fields": [
      {
        "key": "清理类型",
        "label": "清理类型",
        "type": "select",
        "value": "定期清理",
        "options": [
          "定期清理",
          "专项清理",
          "即时清理"
        ]
      },
      {
        "key": "清理周期",
        "label": "清理周期",
        "type": "text",
        "value": "2026年第三季度",
        "options": null
      },
      {
        "key": "清理范围",
        "label": "清理范围",
        "type": "text",
        "value": "公司现行制度、方案及业务文件",
        "options": null
      },
      {
        "key": "清理依据",
        "label": "清理依据",
        "type": "textarea",
        "value": "制度定期复核安排及上级文件清理要求。",
        "options": null
      },
      {
        "key": "处置说明",
        "label": "处置说明",
        "type": "textarea",
        "value": "逐项判断有效性，需修订的同步提交修订正文，废止文件注明替代文件。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "文件编号",
        "type": "text",
        "options": null
      },
      {
        "key": "处置",
        "type": "select",
        "options": [
          "有效",
          "修订",
          "废止",
          "失效"
        ]
      },
      {
        "key": "处置原因",
        "type": "text",
        "options": null
      },
      {
        "key": "修订正文",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "文件编号": "ADM-DOC-BASE",
        "处置": "修订",
        "处置原因": "补充检查责任",
        "修订正文": "修订后按责任清单开展检查"
      }
    ],
    "steps": [
      "提交清理清单",
      "审批分类处置",
      "发布目录版本",
      "归档清理结果"
    ],
    "roles": [
      "admin",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "第三季度公文清理"
  },
  {
    "key": "meeting",
    "code": "OA-L3-030105",
    "name": "会议及会议室申请",
    "group": "会议督办",
    "fields": [
      {
        "key": "会议类型",
        "label": "会议类型",
        "type": "select",
        "value": "经营分析会",
        "options": [
          "经营分析会",
          "专题会",
          "党委会",
          "部门例会",
          "外部会议"
        ]
      },
      {
        "key": "会议形式",
        "label": "会议形式",
        "type": "select",
        "value": "现场",
        "options": [
          "现场",
          "视频",
          "混合"
        ]
      },
      {
        "key": "会议开始",
        "label": "会议开始",
        "type": "datetime-local",
        "value": "2026-09-15T09:00",
        "options": null
      },
      {
        "key": "会议结束",
        "label": "会议结束",
        "type": "datetime-local",
        "value": "2026-09-15T11:00",
        "options": null
      },
      {
        "key": "会议室",
        "label": "会议室",
        "type": "select",
        "value": "第一会议室",
        "options": [
          "第一会议室",
          "第二会议室"
        ]
      },
      {
        "key": "参会人数",
        "label": "参会人数",
        "type": "number",
        "value": 8,
        "options": null
      },
      {
        "key": "资源",
        "label": "资源需求",
        "type": "text",
        "value": "投影、视频终端",
        "options": null
      },
      {
        "key": "会议议程",
        "label": "会议议程",
        "type": "textarea",
        "value": "1. 通报月度经营指标；2. 分析偏差原因；3. 明确下月措施。",
        "options": null
      },
      {
        "key": "申请依据",
        "label": "申请依据",
        "type": "select",
        "value": "允许直接申请",
        "options": [
          "允许直接申请",
          "已通过评审/请示"
        ]
      },
      {
        "key": "直接申请依据",
        "label": "直接申请依据",
        "type": "textarea",
        "value": "日常经营例会；演示规则待确认",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "参会人",
        "type": "select",
        "options": [
          "何静",
          "刘强",
          "李明"
        ]
      },
      {
        "key": "回执",
        "type": "select",
        "options": [
          "未回复",
          "参加",
          "请假",
          "委托"
        ]
      },
      {
        "key": "委托人",
        "type": "text",
        "options": null
      },
      {
        "key": "说明",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "参会人": "刘强",
        "回执": "未回复",
        "委托人": "",
        "说明": ""
      },
      {
        "参会人": "李明",
        "回执": "未回复",
        "委托人": "",
        "说明": ""
      }
    ],
    "steps": [
      "核验资源并提交",
      "批准并预约会议",
      "通知参会人员",
      "归档会议申请"
    ],
    "roles": [
      "admin",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "九月经营分析会"
  },
  {
    "key": "rsvp",
    "code": "OA-L3-030106",
    "name": "参会回执",
    "group": "会议督办",
    "fields": [
      {
        "key": "会议说明",
        "label": "会议说明",
        "type": "textarea",
        "value": "请参会人确认参加方式；如需请假或委托，请在回执中说明。",
        "options": null
      },
      {
        "key": "参会方式",
        "label": "参会方式",
        "type": "select",
        "value": "现场",
        "options": [
          "现场",
          "视频",
          "委托"
        ]
      },
      {
        "key": "回执截止时间",
        "label": "回执截止时间",
        "type": "date",
        "value": "2026-09-13",
        "options": null
      },
      {
        "key": "回执备注",
        "label": "回执备注",
        "type": "textarea",
        "value": "",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "参会人",
        "type": "select",
        "options": [
          "何静",
          "刘强",
          "李明"
        ]
      },
      {
        "key": "回执",
        "type": "select",
        "options": [
          "未回复",
          "参加",
          "请假",
          "委托"
        ]
      },
      {
        "key": "委托人",
        "type": "text",
        "options": null
      },
      {
        "key": "说明",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "参会人": "李明",
        "回执": "未回复",
        "委托人": "",
        "说明": ""
      }
    ],
    "steps": [
      "提交个人参会回执",
      "汇总回执并归档"
    ],
    "roles": [
      "employee",
      "admin"
    ],
    "initial": "九月经营分析会回执"
  },
  {
    "key": "meetingChange",
    "code": "OA-L3-030107",
    "name": "会议变更",
    "group": "会议督办",
    "fields": [
      {
        "key": "变更类型",
        "label": "变更类型",
        "type": "select",
        "value": "时间变更",
        "options": [
          "时间变更",
          "地点变更",
          "参会范围变更",
          "议程变更",
          "综合变更"
        ]
      },
      {
        "key": "会议开始",
        "label": "调整后会议开始",
        "type": "datetime-local",
        "value": "2026-09-15T09:00",
        "options": null
      },
      {
        "key": "会议结束",
        "label": "调整后会议结束",
        "type": "datetime-local",
        "value": "2026-09-15T11:00",
        "options": null
      },
      {
        "key": "会议室",
        "label": "调整后会议室",
        "type": "select",
        "value": "第一会议室",
        "options": [
          "第一会议室",
          "第二会议室"
        ]
      },
      {
        "key": "资源",
        "label": "资源需求",
        "type": "text",
        "value": "投影、视频终端",
        "options": null
      },
      {
        "key": "变更原因",
        "label": "变更原因",
        "type": "textarea",
        "value": "调整会议时段以配合生产安排",
        "options": null
      },
      {
        "key": "变更说明",
        "label": "变更说明",
        "type": "textarea",
        "value": "请参会人按调整后的时间地点参会，原回执继续有效。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "参会人",
        "type": "select",
        "options": [
          "何静",
          "刘强",
          "李明"
        ]
      },
      {
        "key": "回执",
        "type": "select",
        "options": [
          "未回复",
          "参加",
          "请假",
          "委托"
        ]
      },
      {
        "key": "委托人",
        "type": "text",
        "options": null
      },
      {
        "key": "说明",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "参会人": "刘强",
        "回执": "未回复",
        "委托人": "",
        "说明": ""
      }
    ],
    "steps": [
      "提交会议变更",
      "审批并重排资源",
      "发送变更通知",
      "归档变更版本"
    ],
    "roles": [
      "admin",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "经营分析会时间调整"
  },
  {
    "key": "meetingCancel",
    "code": "OA-L3-030108",
    "name": "会议取消",
    "group": "会议督办",
    "fields": [
      {
        "key": "取消类型",
        "label": "取消类型",
        "type": "select",
        "value": "全部取消",
        "options": [
          "全部取消",
          "部分取消"
        ]
      },
      {
        "key": "取消原因",
        "label": "取消原因",
        "type": "textarea",
        "value": "会议调整为书面沟通",
        "options": null
      },
      {
        "key": "取消后安排",
        "label": "取消后安排",
        "type": "textarea",
        "value": "改为书面征求意见，原定议题顺延至下次经营分析会。",
        "options": null
      },
      {
        "key": "资源释放",
        "label": "会议室及资源释放",
        "type": "select",
        "value": "是",
        "options": [
          "是",
          "否"
        ]
      }
    ],
    "columns": [
      {
        "key": "通知对象",
        "type": "text",
        "options": null
      },
      {
        "key": "送达说明",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "通知对象": "原会议全部参会人",
        "送达说明": "通过本地消息通知"
      }
    ],
    "steps": [
      "提交取消申请",
      "批准取消并释放资源",
      "发送取消通知",
      "归档取消结果"
    ],
    "roles": [
      "admin",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "经营分析会取消"
  },
  {
    "key": "minutes",
    "code": "OA-L3-030109",
    "name": "会议纪要审核及发布",
    "group": "会议督办",
    "fields": [
      {
        "key": "纪要编号",
        "label": "纪要编号",
        "type": "text",
        "value": "精印纪〔2026〕9号",
        "options": null
      },
      {
        "key": "会议名称",
        "label": "会议名称",
        "type": "text",
        "value": "九月经营分析会",
        "options": null
      },
      {
        "key": "会议日期",
        "label": "会议日期",
        "type": "date",
        "value": "2026-09-15",
        "options": null
      },
      {
        "key": "主持人",
        "label": "主持人",
        "type": "text",
        "value": "公司管理层",
        "options": null
      },
      {
        "key": "记录人",
        "label": "记录人",
        "type": "text",
        "value": "何静",
        "options": null
      },
      {
        "key": "密级",
        "label": "密级",
        "type": "select",
        "value": "内部",
        "options": [
          "公开",
          "内部",
          "秘密"
        ]
      },
      {
        "key": "发布范围",
        "label": "发布范围",
        "type": "text",
        "value": "生产管理部、党政综合办",
        "options": null
      },
      {
        "key": "纪要正文",
        "label": "纪要正文",
        "type": "textarea",
        "value": "会议要求完成设备安全复核与操作培训。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "议定事项",
        "type": "text",
        "options": null
      },
      {
        "key": "责任人",
        "type": "select",
        "options": [
          "刘强",
          "何静"
        ]
      },
      {
        "key": "期限",
        "type": "date",
        "options": null
      },
      {
        "key": "转督办",
        "type": "select",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "目标",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "议定事项": "设备安全复核",
        "责任人": "刘强",
        "期限": "2026-09-25",
        "转督办": "是",
        "目标": "完成设备清单检查并提交报告"
      },
      {
        "议定事项": "传达会议要求",
        "责任人": "何静",
        "期限": "2026-09-20",
        "转督办": "否",
        "目标": "完成部门传达"
      }
    ],
    "steps": [
      "提交纪要审核",
      "审核纪要版本",
      "发布并按项转督办",
      "归档纪要"
    ],
    "roles": [
      "admin",
      "manager",
      "admin",
      "admin"
    ],
    "initial": "九月经营分析会纪要"
  },
  {
    "key": "supervision",
    "code": "OA-L3-030110",
    "name": "督办事项立项",
    "group": "会议督办",
    "fields": [
      {
        "key": "来源类型",
        "label": "来源类型",
        "type": "select",
        "value": "领导批示",
        "options": [
          "会议纪要",
          "领导批示",
          "重大决策",
          "外部检查",
          "专项任务",
          "人工登记"
        ]
      },
      {
        "key": "来源文号",
        "label": "来源文号／会议",
        "type": "text",
        "value": "精印纪〔2026〕9号",
        "options": null
      },
      {
        "key": "紧急程度",
        "label": "紧急程度",
        "type": "select",
        "value": "普通",
        "options": [
          "普通",
          "紧急"
        ]
      },
      {
        "key": "业务标签",
        "label": "业务标签",
        "type": "select",
        "value": "安全生产",
        "options": [
          "安全生产",
          "经营管理",
          "制度建设",
          "专项任务"
        ]
      },
      {
        "key": "牵头部门",
        "label": "牵头部门",
        "type": "select",
        "value": "生产管理部",
        "options": [
          "生产管理部",
          "质量管理部",
          "经营发展部",
          "党政综合办",
          "财务部"
        ]
      },
      {
        "key": "责任领导",
        "label": "责任领导",
        "type": "text",
        "value": "公司管理层",
        "options": null
      },
      {
        "key": "纳入考核",
        "label": "是否纳入考核",
        "type": "select",
        "value": "是",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "督办要求",
        "label": "督办要求",
        "type": "textarea",
        "value": "按节点提交进展，完成后提交成果及佐证材料。",
        "options": null
      },
      {
        "key": "立项依据",
        "label": "立项依据",
        "type": "textarea",
        "value": "按年度工作安排开展设备复核",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "任务",
        "type": "text",
        "options": null
      },
      {
        "key": "责任人",
        "type": "select",
        "options": [
          "刘强",
          "何静"
        ]
      },
      {
        "key": "目标",
        "type": "text",
        "options": null
      },
      {
        "key": "期限",
        "type": "date",
        "options": null
      },
      {
        "key": "进度",
        "type": "number",
        "options": null
      },
      {
        "key": "反馈",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "任务": "设备安全复核",
        "责任人": "刘强",
        "目标": "完成检查并提交报告",
        "期限": "2026-09-25",
        "进度": 0,
        "反馈": ""
      }
    ],
    "steps": [
      "分派责任任务",
      "提交成果及验收材料",
      "验收销号",
      "归档督办结果"
    ],
    "roles": [
      "admin",
      "owner",
      "admin",
      "admin"
    ],
    "initial": "设备安全复核督办"
  },
  {
    "key": "supervisionChange",
    "code": "OA-L3-030111",
    "name": "督办延期、变更及取消",
    "group": "会议督办",
    "fields": [
      {
        "key": "调整类型",
        "label": "调整类型",
        "type": "select",
        "value": "延期",
        "options": [
          "延期",
          "变更",
          "取消"
        ]
      },
      {
        "key": "原完成期限",
        "label": "原完成期限",
        "type": "date",
        "value": "2026-09-25",
        "options": null
      },
      {
        "key": "调整后期限",
        "label": "调整后期限",
        "type": "date",
        "value": "2026-09-28",
        "options": null
      },
      {
        "key": "重新分派",
        "label": "是否重新分派责任人",
        "type": "select",
        "value": "否",
        "options": [
          "否",
          "是"
        ]
      },
      {
        "key": "调整原因",
        "label": "调整原因",
        "type": "textarea",
        "value": "新增设备需要补充复核",
        "options": null
      },
      {
        "key": "影响说明",
        "label": "影响说明",
        "type": "textarea",
        "value": "调整后完成时限顺延，原定验收安排同步后移。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "任务",
        "type": "text",
        "options": null
      },
      {
        "key": "责任人",
        "type": "select",
        "options": [
          "刘强",
          "何静"
        ]
      },
      {
        "key": "目标",
        "type": "text",
        "options": null
      },
      {
        "key": "期限",
        "type": "date",
        "options": null
      },
      {
        "key": "进度",
        "type": "number",
        "options": null
      },
      {
        "key": "反馈",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "任务": "设备安全复核",
        "责任人": "刘强",
        "目标": "补充新增设备检查",
        "期限": "2026-09-28",
        "进度": 0,
        "反馈": ""
      }
    ],
    "steps": [
      "提交督办调整",
      "审批并更新原督办",
      "归档调整依据"
    ],
    "roles": [
      "owner",
      "admin",
      "admin"
    ],
    "initial": "设备复核督办延期"
  },
  {
    "key": "acceptance",
    "code": "OA-L3-030112",
    "name": "督办验收及销号",
    "group": "会议督办",
    "fields": [
      {
        "key": "成果说明",
        "label": "成果说明",
        "type": "textarea",
        "value": "设备已完成安全检查，报告待验收",
        "options": null
      },
      {
        "key": "完成情况",
        "label": "完成情况",
        "type": "select",
        "value": "全部完成",
        "options": [
          "全部完成",
          "部分完成"
        ]
      },
      {
        "key": "佐证清单",
        "label": "佐证清单",
        "type": "textarea",
        "value": "设备检查报告、隐患整改照片、复查记录。",
        "options": null
      },
      {
        "key": "验收申请说明",
        "label": "验收申请说明",
        "type": "textarea",
        "value": "请按任务目标逐项核验成果及佐证材料。",
        "options": null
      }
    ],
    "columns": [
      {
        "key": "验收项",
        "type": "text",
        "options": null
      },
      {
        "key": "佐证说明",
        "type": "text",
        "options": null
      }
    ],
    "rows": [
      {
        "验收项": "设备清单及检查报告",
        "佐证说明": "检查报告已上传，覆盖全部设备"
      }
    ],
    "steps": [
      "提交成果和佐证",
      "复核验收结论",
      "销号并归档"
    ],
    "roles": [
      "owner",
      "admin",
      "admin"
    ],
    "initial": "设备复核督办验收"
  }
,
{
  "key": "taskLedger",
  "code": "OA-L3-030113",
  "name": "工作任务台账管理",
  "group": "行政档案",
  "fields": [
    {
      "key": "任务类型",
      "label": "任务类型",
      "type": "select",
      "value": "重点工作",
      "options": [
        "重点工作",
        "日常任务",
        "专项任务"
      ]
    },
    {
      "key": "任务来源",
      "label": "任务来源",
      "type": "text",
      "value": "年度工作安排",
      "options": null
    },
    {
      "key": "责任部门",
      "label": "责任部门",
      "type": "select",
      "value": "生产管理部",
      "options": [
        "生产管理部",
        "党政综合办",
        "质量管理部",
        "经营发展部",
        "财务部"
      ]
    },
    {
      "key": "责任人",
      "label": "责任人",
      "type": "text",
      "value": "刘强",
      "options": null
    },
    {
      "key": "计划开始日期",
      "label": "计划开始日期",
      "type": "date",
      "value": "2026-09-10",
      "options": null
    },
    {
      "key": "计划完成日期",
      "label": "计划完成日期",
      "type": "date",
      "value": "2026-09-30",
      "options": null
    },
    {
      "key": "任务目标",
      "label": "任务目标",
      "type": "textarea",
      "value": "按期完成专项任务并形成成果。",
      "options": null,
      "full": true
    },
    {
      "key": "工作内容",
      "label": "工作内容",
      "type": "textarea",
      "value": "明确任务步骤、协同部门、节点成果和检查要求。",
      "options": null,
      "full": true
    },
    {
      "key": "成果要求",
      "label": "成果要求",
      "type": "textarea",
      "value": "提交成果报告及佐证材料。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "节点",
      "type": "text",
      "options": null
    },
    {
      "key": "责任人",
      "type": "text",
      "options": null
    },
    {
      "key": "计划完成",
      "type": "date",
      "options": null
    },
    {
      "key": "进度",
      "type": "number",
      "options": null
    },
    {
      "key": "成果",
      "type": "text",
      "options": null
    },
    {
      "key": "状态",
      "type": "select",
      "options": [
        "待办理",
        "进行中",
        "已完成"
      ]
    }
  ],
  "rows": [
    {
      "节点": "制定任务方案",
      "责任人": "刘强",
      "计划完成": "2026-09-12",
      "进度": 0,
      "成果": "",
      "状态": "待办理"
    },
    {
      "节点": "完成现场检查",
      "责任人": "刘强",
      "计划完成": "2026-09-25",
      "进度": 0,
      "成果": "",
      "状态": "待办理"
    }
  ],
  "steps": [
    "登记任务",
    "部门执行",
    "进度反馈",
    "检查验收",
    "归档"
  ],
  "roles": [
    "admin",
    "owner",
    "owner",
    "admin",
    "admin"
  ],
  "initial": "专项工作任务台账"
},
{
  "key": "expenseAudit",
  "code": "OA-L3-030114",
  "name": "办公费及交通费合规审核",
  "group": "行政档案",
  "fields": [
    {
      "key": "费用类型",
      "label": "费用类型",
      "type": "select",
      "value": "办公费",
      "options": [
        "办公费",
        "交通费",
        "通讯费"
      ]
    },
    {
      "key": "申报月份",
      "label": "申报月份",
      "type": "text",
      "value": "2026-09",
      "options": null
    },
    {
      "key": "申报部门",
      "label": "申报部门",
      "type": "select",
      "value": "生产管理部",
      "options": [
        "生产管理部",
        "党政综合办",
        "质量管理部",
        "经营发展部",
        "财务部"
      ]
    },
    {
      "key": "申报金额",
      "label": "申报金额",
      "type": "number",
      "value": 3200,
      "options": null
    },
    {
      "key": "申报人数",
      "label": "申报人数",
      "type": "number",
      "value": 8,
      "options": null
    },
    {
      "key": "费用标准依据",
      "label": "费用标准依据",
      "type": "text",
      "value": "公司办公费及交通费标准（模拟）",
      "options": null
    },
    {
      "key": "是否超标准",
      "label": "是否超标准",
      "type": "select",
      "value": "否",
      "options": [
        "否",
        "是"
      ]
    },
    {
      "key": "费用明细说明",
      "label": "费用明细说明",
      "type": "textarea",
      "value": "按部门月度实际发生费用汇总申报。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "人员",
      "type": "text",
      "options": null
    },
    {
      "key": "费用项目",
      "type": "text",
      "options": null
    },
    {
      "key": "金额",
      "type": "number",
      "options": null
    },
    {
      "key": "标准",
      "type": "number",
      "options": null
    },
    {
      "key": "是否合规",
      "type": "select",
      "options": [
        "待核验",
        "合规",
        "不合规"
      ]
    }
  ],
  "rows": [
    {
      "人员": "刘强",
      "费用项目": "办公用品",
      "金额": 1200,
      "标准": 1500,
      "是否合规": "待核验"
    }
  ],
  "steps": [
    "部门申报",
    "标准预校验",
    "党政综合办审核",
    "转ERP财务流程",
    "归档"
  ],
  "roles": [
    "owner",
    "admin",
    "admin",
    "admin",
    "admin"
  ],
  "initial": "九月办公费合规审核"
},
{
  "key": "archiveTransfer",
  "code": "OA-L3-030119",
  "name": "档案移交及延期归档",
  "group": "行政档案",
  "fields": [
    {
      "key": "移交类型",
      "label": "移交类型",
      "type": "select",
      "value": "按期归档",
      "options": [
        "按期归档",
        "延期归档"
      ]
    },
    {
      "key": "关联事项/文号",
      "label": "关联事项/文号",
      "type": "text",
      "value": "精印〔2026〕18号",
      "options": null
    },
    {
      "key": "档案类别",
      "label": "档案类别",
      "type": "select",
      "value": "公文档案",
      "options": [
        "公文档案",
        "会议档案",
        "合同档案",
        "财务档案",
        "人事档案",
        "其他"
      ]
    },
    {
      "key": "档案数量",
      "label": "档案数量",
      "type": "number",
      "value": 3,
      "options": null
    },
    {
      "key": "保管期限",
      "label": "保管期限",
      "type": "select",
      "value": "10年",
      "options": [
        "5年",
        "10年",
        "30年",
        "永久"
      ]
    },
    {
      "key": "原定归档日期",
      "label": "原定归档日期",
      "type": "date",
      "value": "2026-09-20",
      "options": null
    },
    {
      "key": "申请延期至",
      "label": "申请延期至",
      "type": "date",
      "value": "2026-10-15",
      "options": null
    },
    {
      "key": "移交部门",
      "label": "移交部门",
      "type": "select",
      "value": "生产管理部",
      "options": [
        "生产管理部",
        "党政综合办",
        "质量管理部",
        "经营发展部",
        "财务部"
      ]
    },
    {
      "key": "接收部门",
      "label": "接收部门",
      "type": "text",
      "value": "党政综合办档案室",
      "options": null
    },
    {
      "key": "移交说明",
      "label": "移交说明",
      "type": "textarea",
      "value": "按档案目录移交纸质及电子材料。",
      "options": null,
      "full": true
    },
    {
      "key": "延期原因",
      "label": "延期原因",
      "type": "textarea",
      "value": "材料补充未完成，申请延期归档。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "档案目录",
      "type": "text",
      "options": null
    },
    {
      "key": "份数",
      "type": "number",
      "options": null
    },
    {
      "key": "载体",
      "type": "select",
      "options": [
        "纸质",
        "电子",
        "纸质+电子"
      ]
    },
    {
      "key": "密级",
      "type": "select",
      "options": [
        "公开",
        "内部",
        "秘密"
      ]
    },
    {
      "key": "备注",
      "type": "text",
      "options": null
    }
  ],
  "rows": [
    {
      "档案目录": "发文审批单及正文",
      "份数": 1,
      "载体": "纸质+电子",
      "密级": "内部",
      "备注": ""
    }
  ],
  "steps": [
    "提交档案目录",
    "部门审核",
    "档案接收",
    "归档或延期登记",
    "归档"
  ],
  "roles": [
    "owner",
    "admin",
    "admin",
    "admin",
    "admin"
  ],
  "initial": "九月公文档案移交"
},
{
  "key": "archiveAccess",
  "code": "OA-L3-030120",
  "name": "档案查阅、借阅及复制",
  "group": "行政档案",
  "fields": [
    {
      "key": "办理类型",
      "label": "办理类型",
      "type": "select",
      "value": "查阅",
      "options": [
        "查阅",
        "借阅",
        "复制"
      ]
    },
    {
      "key": "档案名称",
      "label": "档案名称",
      "type": "text",
      "value": "九月经营分析会纪要",
      "options": null
    },
    {
      "key": "档案编号",
      "label": "档案编号",
      "type": "text",
      "value": "ARC-2026-09-001",
      "options": null
    },
    {
      "key": "档案类别",
      "label": "档案类别",
      "type": "select",
      "value": "会议档案",
      "options": [
        "公文档案",
        "会议档案",
        "合同档案",
        "财务档案",
        "人事档案",
        "其他"
      ]
    },
    {
      "key": "利用目的",
      "label": "利用目的",
      "type": "textarea",
      "value": "核对会议议定事项及责任分工。",
      "options": null,
      "full": true
    },
    {
      "key": "借阅期限",
      "label": "借阅期限",
      "type": "date",
      "value": "2026-09-20",
      "options": null
    },
    {
      "key": "复制份数",
      "label": "复制份数",
      "type": "number",
      "value": 1,
      "options": null
    },
    {
      "key": "是否涉及密级",
      "label": "是否涉及密级",
      "type": "select",
      "value": "否",
      "options": [
        "否",
        "是"
      ]
    },
    {
      "key": "归还日期",
      "label": "归还日期",
      "type": "date",
      "value": "",
      "options": null
    }
  ],
  "columns": [
    {
      "key": "档案条目",
      "type": "text",
      "options": null
    },
    {
      "key": "载体",
      "type": "select",
      "options": [
        "纸质",
        "电子"
      ]
    },
    {
      "key": "份数",
      "type": "number",
      "options": null
    },
    {
      "key": "密级",
      "type": "select",
      "options": [
        "公开",
        "内部",
        "秘密"
      ]
    },
    {
      "key": "用途",
      "type": "text",
      "options": null
    }
  ],
  "rows": [
    {
      "档案条目": "会议纪要正文",
      "载体": "纸质",
      "份数": 1,
      "密级": "内部",
      "用途": "事项核对"
    }
  ],
  "steps": [
    "提交申请",
    "部门审核",
    "档案管理员审批",
    "借出或复制",
    "归还归档"
  ],
  "roles": [
    "owner",
    "admin",
    "admin",
    "admin",
    "admin"
  ],
  "initial": "会议纪要查阅申请"
},
{
  "key": "archiveDestroy",
  "code": "OA-L3-030121",
  "name": "档案鉴定及销毁",
  "group": "行政档案",
  "fields": [
    {
      "key": "鉴定批次",
      "label": "鉴定批次",
      "type": "text",
      "value": "2026年档案鉴定第一批",
      "options": null
    },
    {
      "key": "鉴定范围",
      "label": "鉴定范围",
      "type": "text",
      "value": "2016年度行政档案",
      "options": null
    },
    {
      "key": "保管期限",
      "label": "保管期限",
      "type": "select",
      "value": "10年",
      "options": [
        "5年",
        "10年",
        "30年",
        "永久"
      ]
    },
    {
      "key": "鉴定日期",
      "label": "鉴定日期",
      "type": "date",
      "value": "2026-09-18",
      "options": null
    },
    {
      "key": "处置方式",
      "label": "处置方式",
      "type": "select",
      "value": "继续保存",
      "options": [
        "继续保存",
        "延期保存",
        "销毁"
      ]
    },
    {
      "key": "监销人",
      "label": "监销人",
      "type": "text",
      "value": "何静",
      "options": null
    },
    {
      "key": "销毁依据",
      "label": "销毁依据",
      "type": "textarea",
      "value": "依据档案保管期限及鉴定结果处置。",
      "options": null,
      "full": true
    },
    {
      "key": "鉴定意见",
      "label": "鉴定意见",
      "type": "textarea",
      "value": "逐卷鉴定，形成继续保存或销毁意见。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "档案编号",
      "type": "text",
      "options": null
    },
    {
      "key": "档案名称",
      "type": "text",
      "options": null
    },
    {
      "key": "形成日期",
      "type": "date",
      "options": null
    },
    {
      "key": "保管期限",
      "type": "text",
      "options": null
    },
    {
      "key": "鉴定结论",
      "type": "select",
      "options": [
        "继续保存",
        "延期保存",
        "销毁"
      ]
    }
  ],
  "rows": [
    {
      "档案编号": "ARC-2016-001",
      "档案名称": "2016年度行政文件",
      "形成日期": "2016-12-31",
      "保管期限": "10年",
      "鉴定结论": "销毁"
    }
  ],
  "steps": [
    "编制鉴定清单",
    "鉴定小组鉴定",
    "销毁审批",
    "销毁处置",
    "归档"
  ],
  "roles": [
    "admin",
    "admin",
    "manager",
    "admin",
    "admin"
  ],
  "initial": "2016年度档案鉴定"
},
{
  "key": "externalInspection",
  "code": "OA-L3-030124",
  "name": "外部检查登记及整改",
  "group": "行政档案",
  "fields": [
    {
      "key": "检查类型",
      "label": "检查类型",
      "type": "select",
      "value": "安全生产检查",
      "options": [
        "安全生产检查",
        "环保检查",
        "质量检查",
        "消防检查",
        "其他"
      ]
    },
    {
      "key": "检查单位",
      "label": "检查单位",
      "type": "text",
      "value": "宜宾市应急管理局",
      "options": null
    },
    {
      "key": "检查日期",
      "label": "检查日期",
      "type": "date",
      "value": "2026-09-12",
      "options": null
    },
    {
      "key": "检查事项",
      "label": "检查事项",
      "type": "text",
      "value": "生产现场安全管理及消防设施",
      "options": null
    },
    {
      "key": "责任部门",
      "label": "责任部门",
      "type": "select",
      "value": "生产管理部",
      "options": [
        "生产管理部",
        "党政综合办",
        "质量管理部",
        "经营发展部",
        "财务部"
      ]
    },
    {
      "key": "整改期限",
      "label": "整改期限",
      "type": "date",
      "value": "2026-09-30",
      "options": null
    },
    {
      "key": "发现问题",
      "label": "发现问题",
      "type": "textarea",
      "value": "现场部分消防通道标识不清晰。",
      "options": null,
      "full": true
    },
    {
      "key": "整改要求",
      "label": "整改要求",
      "type": "textarea",
      "value": "补充标识并完成现场复查。",
      "options": null,
      "full": true
    },
    {
      "key": "迎检准备说明",
      "label": "迎检准备说明",
      "type": "textarea",
      "value": "已完成资料准备和现场自查。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "问题",
      "type": "text",
      "options": null
    },
    {
      "key": "整改措施",
      "type": "text",
      "options": null
    },
    {
      "key": "责任人",
      "type": "text",
      "options": null
    },
    {
      "key": "期限",
      "type": "date",
      "options": null
    },
    {
      "key": "状态",
      "type": "select",
      "options": [
        "待整改",
        "整改中",
        "待复核",
        "已关闭"
      ]
    }
  ],
  "rows": [
    {
      "问题": "消防通道标识不清晰",
      "整改措施": "补充标识并复查",
      "责任人": "刘强",
      "期限": "2026-09-25",
      "状态": "待整改"
    }
  ],
  "steps": [
    "登记检查",
    "分派整改",
    "责任部门反馈",
    "复核",
    "关闭归档"
  ],
  "roles": [
    "admin",
    "admin",
    "owner",
    "admin",
    "admin"
  ],
  "initial": "外部安全检查登记"
},
{
  "key": "boardMatter",
  "code": "OA-L3-030126",
  "name": "董事会事项管理",
  "group": "治理中心",
  "fields": [
    {
      "key": "事项类型",
      "label": "事项类型",
      "type": "select",
      "value": "董事会议案",
      "options": [
        "董事会议案",
        "关联交易",
        "子公司董事会",
        "外派董事事项"
      ]
    },
    {
      "key": "会议届次",
      "label": "会议届次",
      "type": "text",
      "value": "2026年第三次董事会",
      "options": null
    },
    {
      "key": "议案名称",
      "label": "议案名称",
      "type": "text",
      "value": "年度投资计划调整议案",
      "options": null
    },
    {
      "key": "议案编号",
      "label": "议案编号",
      "type": "text",
      "value": "BOARD-2026-003",
      "options": null
    },
    {
      "key": "提案部门",
      "label": "提案部门",
      "type": "select",
      "value": "经营发展部",
      "options": [
        "生产管理部",
        "党政综合办",
        "质量管理部",
        "经营发展部",
        "财务部"
      ]
    },
    {
      "key": "汇报人",
      "label": "汇报人",
      "type": "text",
      "value": "周敏",
      "options": null
    },
    {
      "key": "是否需法律审核",
      "label": "是否需法律审核",
      "type": "select",
      "value": "是",
      "options": [
        "是",
        "否"
      ]
    },
    {
      "key": "审议依据",
      "label": "审议依据",
      "type": "textarea",
      "value": "依据公司章程及董事会议事规则。",
      "options": null,
      "full": true
    },
    {
      "key": "议案内容",
      "label": "议案内容",
      "type": "textarea",
      "value": "说明投资计划调整背景、金额及实施安排。",
      "options": null,
      "full": true
    },
    {
      "key": "拟决议事项",
      "label": "拟决议事项",
      "type": "textarea",
      "value": "提请董事会审议并形成决议。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "议题",
      "type": "text",
      "options": null
    },
    {
      "key": "汇报人",
      "type": "text",
      "options": null
    },
    {
      "key": "审议意见",
      "type": "text",
      "options": null
    },
    {
      "key": "决议结果",
      "type": "select",
      "options": [
        "待审议",
        "通过",
        "不通过",
        "暂缓"
      ]
    }
  ],
  "rows": [
    {
      "议题": "年度投资计划调整",
      "汇报人": "周敏",
      "审议意见": "",
      "决议结果": "待审议"
    }
  ],
  "steps": [
    "提交议案",
    "部门审核",
    "法务审核",
    "董事会审议",
    "决议归档"
  ],
  "roles": [
    "admin",
    "manager",
    "manager",
    "manager",
    "admin"
  ],
  "initial": "年度投资计划调整议案"
},
{
  "key": "partyMatter",
  "code": "OA-L3-030127",
  "name": "党建事项管理",
  "group": "治理中心",
  "fields": [
    {
      "key": "事项类型",
      "label": "事项类型",
      "type": "select",
      "value": "理论学习",
      "options": [
        "年度计划考核",
        "理论学习",
        "党员发展",
        "关系转接",
        "党费用款",
        "党建活动",
        "廉政责任"
      ]
    },
    {
      "key": "事项名称",
      "label": "事项名称",
      "type": "text",
      "value": "第三季度理论学习",
      "options": null
    },
    {
      "key": "所属党组织",
      "label": "所属党组织",
      "type": "text",
      "value": "精美印务党支部",
      "options": null
    },
    {
      "key": "办理日期",
      "label": "办理日期",
      "type": "date",
      "value": "2026-09-20",
      "options": null
    },
    {
      "key": "参与人数",
      "label": "参与人数",
      "type": "number",
      "value": 30,
      "options": null
    },
    {
      "key": "经费金额",
      "label": "经费金额",
      "type": "number",
      "value": 0,
      "options": null
    },
    {
      "key": "事项内容",
      "label": "事项内容",
      "type": "textarea",
      "value": "组织专题学习并形成学习记录。",
      "options": null,
      "full": true
    },
    {
      "key": "申请依据",
      "label": "申请依据",
      "type": "textarea",
      "value": "依据年度党建工作计划。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "事项",
      "type": "text",
      "options": null
    },
    {
      "key": "责任人",
      "type": "text",
      "options": null
    },
    {
      "key": "完成日期",
      "type": "date",
      "options": null
    },
    {
      "key": "结果",
      "type": "text",
      "options": null
    }
  ],
  "rows": [
    {
      "事项": "专题理论学习",
      "责任人": "何静",
      "完成日期": "2026-09-20",
      "结果": ""
    }
  ],
  "steps": [
    "支部提交",
    "党建审核",
    "审批",
    "组织实施",
    "归档"
  ],
  "roles": [
    "admin",
    "admin",
    "manager",
    "admin",
    "admin"
  ],
  "initial": "第三季度党建活动"
},
{
  "key": "youthMatter",
  "code": "OA-L3-030128",
  "name": "团委事项管理",
  "group": "治理中心",
  "fields": [
    {
      "key": "事项类型",
      "label": "事项类型",
      "type": "select",
      "value": "团建活动",
      "options": [
        "年度计划考核",
        "理论学习",
        "团员发展",
        "关系转接",
        "团费用款",
        "团建活动",
        "廉政责任"
      ]
    },
    {
      "key": "事项名称",
      "label": "事项名称",
      "type": "text",
      "value": "青年员工技能交流活动",
      "options": null
    },
    {
      "key": "所属团组织",
      "label": "所属团组织",
      "type": "text",
      "value": "精美印务团支部",
      "options": null
    },
    {
      "key": "办理日期",
      "label": "办理日期",
      "type": "date",
      "value": "2026-09-25",
      "options": null
    },
    {
      "key": "参与人数",
      "label": "参与人数",
      "type": "number",
      "value": 20,
      "options": null
    },
    {
      "key": "经费金额",
      "label": "经费金额",
      "type": "number",
      "value": 1500,
      "options": null
    },
    {
      "key": "事项内容",
      "label": "事项内容",
      "type": "textarea",
      "value": "组织青年员工技能交流与团建活动。",
      "options": null,
      "full": true
    },
    {
      "key": "申请依据",
      "label": "申请依据",
      "type": "textarea",
      "value": "依据年度团委工作计划。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "事项",
      "type": "text",
      "options": null
    },
    {
      "key": "责任人",
      "type": "text",
      "options": null
    },
    {
      "key": "完成日期",
      "type": "date",
      "options": null
    },
    {
      "key": "结果",
      "type": "text",
      "options": null
    }
  ],
  "rows": [
    {
      "事项": "技能交流活动",
      "责任人": "李明",
      "完成日期": "2026-09-25",
      "结果": ""
    }
  ],
  "steps": [
    "团支部提交",
    "团委审核",
    "审批",
    "组织实施",
    "归档"
  ],
  "roles": [
    "admin",
    "admin",
    "manager",
    "admin",
    "admin"
  ],
  "initial": "青年员工团建活动"
},
{
  "key": "unionMatter",
  "code": "OA-L3-030129",
  "name": "工会事项管理",
  "group": "治理中心",
  "fields": [
    {
      "key": "事项类型",
      "label": "事项类型",
      "type": "select",
      "value": "活动立项",
      "options": [
        "会员变更",
        "活动立项",
        "慰问",
        "预算决算",
        "职代会提案"
      ]
    },
    {
      "key": "事项名称",
      "label": "事项名称",
      "type": "text",
      "value": "中秋慰问活动",
      "options": null
    },
    {
      "key": "会员/对象",
      "label": "会员/对象",
      "type": "text",
      "value": "全体工会会员",
      "options": null
    },
    {
      "key": "活动日期",
      "label": "活动日期",
      "type": "date",
      "value": "2026-09-28",
      "options": null
    },
    {
      "key": "预算金额",
      "label": "预算金额",
      "type": "number",
      "value": 20000,
      "options": null
    },
    {
      "key": "事项说明",
      "label": "事项说明",
      "type": "textarea",
      "value": "按工会年度计划开展会员慰问。",
      "options": null,
      "full": true
    },
    {
      "key": "申请依据",
      "label": "申请依据",
      "type": "textarea",
      "value": "依据工会经费管理办法。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "项目",
      "type": "text",
      "options": null
    },
    {
      "key": "金额",
      "type": "number",
      "options": null
    },
    {
      "key": "负责人",
      "type": "text",
      "options": null
    },
    {
      "key": "完成情况",
      "type": "text",
      "options": null
    }
  ],
  "rows": [
    {
      "项目": "会员慰问品",
      "金额": 20000,
      "负责人": "何静",
      "完成情况": "待采购"
    }
  ],
  "steps": [
    "工会提交",
    "工会审核",
    "审批",
    "组织实施",
    "归档"
  ],
  "roles": [
    "admin",
    "admin",
    "manager",
    "admin",
    "admin"
  ],
  "initial": "中秋工会慰问"
},
{
  "key": "preReview",
  "code": "OA-L3-030130",
  "name": "会前评审",
  "group": "治理中心",
  "fields": [
    {
      "key": "评审类型",
      "label": "评审类型",
      "type": "select",
      "value": "议题评审",
      "options": [
        "议题评审",
        "方案评审",
        "材料评审"
      ]
    },
    {
      "key": "关联会议/议题",
      "label": "关联会议/议题",
      "type": "text",
      "value": "2026年第三次董事会",
      "options": null
    },
    {
      "key": "议题名称",
      "label": "议题名称",
      "type": "text",
      "value": "年度投资计划调整",
      "options": null
    },
    {
      "key": "汇报部门",
      "label": "汇报部门",
      "type": "select",
      "value": "经营发展部",
      "options": [
        "生产管理部",
        "党政综合办",
        "质量管理部",
        "经营发展部",
        "财务部"
      ]
    },
    {
      "key": "汇报人",
      "label": "汇报人",
      "type": "text",
      "value": "周敏",
      "options": null
    },
    {
      "key": "会签部门",
      "label": "会签部门",
      "type": "text",
      "value": "财务部、审计监督部",
      "options": null
    },
    {
      "key": "材料清单",
      "label": "材料清单",
      "type": "textarea",
      "value": "议案正文、测算依据、风险评估材料。",
      "options": null,
      "full": true
    },
    {
      "key": "评审要点",
      "label": "评审要点",
      "type": "textarea",
      "value": "核验材料完整性、数据一致性和决策依据。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "评审部门",
      "type": "text",
      "options": null
    },
    {
      "key": "评审意见",
      "type": "text",
      "options": null
    },
    {
      "key": "结论",
      "type": "select",
      "options": [
        "待评审",
        "同意",
        "修改后再审"
      ]
    }
  ],
  "rows": [
    {
      "评审部门": "财务部",
      "评审意见": "",
      "结论": "待评审"
    }
  ],
  "steps": [
    "提交评审材料",
    "材料完整性校验",
    "部门会签",
    "形成评审结论",
    "归档"
  ],
  "roles": [
    "admin",
    "admin",
    "manager",
    "admin",
    "admin"
  ],
  "initial": "投资计划议题会前评审"
},
{
  "key": "meetingRequest",
  "code": "OA-L3-030131",
  "name": "上会请示",
  "group": "治理中心",
  "fields": [
    {
      "key": "会议类型",
      "label": "会议类型",
      "type": "select",
      "value": "董事会",
      "options": [
        "董事会",
        "党委会",
        "经营分析会",
        "专题会"
      ]
    },
    {
      "key": "议题名称",
      "label": "议题名称",
      "type": "text",
      "value": "年度投资计划调整",
      "options": null
    },
    {
      "key": "汇报人",
      "label": "汇报人",
      "type": "text",
      "value": "周敏",
      "options": null
    },
    {
      "key": "拟参会范围",
      "label": "拟参会范围",
      "type": "text",
      "value": "董事、监事、经营班子",
      "options": null
    },
    {
      "key": "列席部门",
      "label": "列席部门",
      "type": "text",
      "value": "财务部、审计监督部",
      "options": null
    },
    {
      "key": "是否已会前评审",
      "label": "是否已会前评审",
      "type": "select",
      "value": "是",
      "options": [
        "是",
        "否"
      ]
    },
    {
      "key": "上会依据",
      "label": "上会依据",
      "type": "textarea",
      "value": "依据董事会议事规则及年度会议安排。",
      "options": null,
      "full": true
    },
    {
      "key": "汇报材料",
      "label": "汇报材料",
      "type": "textarea",
      "value": "议案正文、投资测算及风险说明。",
      "options": null,
      "full": true
    },
    {
      "key": "审议事项",
      "label": "审议事项",
      "type": "textarea",
      "value": "提请审议投资计划调整方案。",
      "options": null,
      "full": true
    }
  ],
  "columns": [
    {
      "key": "议题",
      "type": "text",
      "options": null
    },
    {
      "key": "汇报人",
      "type": "text",
      "options": null
    },
    {
      "key": "审议事项",
      "type": "text",
      "options": null
    },
    {
      "key": "结论",
      "type": "select",
      "options": [
        "待审议",
        "通过",
        "不通过"
      ]
    }
  ],
  "rows": [
    {
      "议题": "年度投资计划调整",
      "汇报人": "周敏",
      "审议事项": "投资计划调整方案",
      "结论": "待审议"
    }
  ],
  "steps": [
    "提交请示",
    "部门审核",
    "会前评审核验",
    "领导审批",
    "关联会议归档"
  ],
  "roles": [
    "admin",
    "manager",
    "admin",
    "manager",
    "admin"
  ],
  "initial": "投资计划上会请示"
}
];
