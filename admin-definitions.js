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
];
