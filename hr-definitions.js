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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "公司名称",
        "label": "公司名称",
        "type": "text",
        "value": "宜宾精美印务有限公司"
      },
      {
        "key": "所属行业",
        "label": "所属行业",
        "type": "text",
        "value": "印刷包装"
      },
      {
        "key": "下属子公司名称",
        "label": "下属子公司名称",
        "type": "text",
        "value": "无",
        "required": false
      },
      {
        "key": "公司注册地",
        "label": "公司注册地",
        "type": "text",
        "value": "四川宜宾",
        "required": false
      },
      {
        "key": "单位简介",
        "label": "单位简介",
        "type": "textarea",
        "value": "从事包装装潢印刷品印刷及智能制造服务。",
        "full": true,
        "required": false
      },
      {
        "key": "年度招聘计划",
        "label": "年度招聘计划",
        "type": "text",
        "value": ""
      },
      {
        "key": "招聘组织方式",
        "label": "招聘组织方式",
        "type": "select",
        "options": [
          "集中统一招聘",
          "申请授权自主招聘"
        ],
        "value": "集中统一招聘"
      },
      {
        "key": "招聘来源",
        "label": "招聘来源",
        "type": "select",
        "options": [
          "校园招聘",
          "社会招聘",
          "五粮液集团内部招聘",
          "公司内部招聘"
        ],
        "value": "校园招聘"
      },
      {
        "key": "经办人",
        "label": "经办人",
        "type": "text",
        "value": "吴欣"
      },
      {
        "key": "联系电话",
        "label": "联系电话",
        "type": "text",
        "value": "13800001234"
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟依据",
        "full": true,
        "required": false
      },
      {
        "key": "招聘方式",
        "label": "招聘方式",
        "type": "select",
        "value": "公开招聘",
        "options": [
          "公开招聘",
          "内部竞聘"
        ],
        "hidden": true
      },
      {
        "key": "招聘原因",
        "label": "招聘原因",
        "type": "textarea",
        "value": "旺季质量检验产能补充",
        "full": true,
        "hidden": true
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
    "self": false,
    "detail": [
      {
        "key": "所属部门/车间",
        "label": "所属部门/车间",
        "type": "text"
      },
      {
        "key": "招聘岗位",
        "label": "招聘岗位",
        "type": "text"
      },
      {
        "key": "岗位类别",
        "label": "岗位类别",
        "type": "select",
        "options": [
          "职能管理类",
          "市场营销类",
          "技术研发类",
          "生产操作与支持保障类"
        ]
      },
      {
        "key": "岗位级别",
        "label": "岗位级别",
        "type": "text",
        "required": false
      },
      {
        "key": "招聘岗位定编人数",
        "label": "招聘岗位定编人数",
        "type": "number",
        "required": false
      },
      {
        "key": "招聘岗位现有人员",
        "label": "招聘岗位现有人员",
        "type": "number",
        "required": false
      },
      {
        "key": "可用编制余额",
        "label": "可用编制余额",
        "type": "number",
        "required": false
      },
      {
        "key": "需求人数",
        "label": "需求人数",
        "type": "number"
      },
      {
        "key": "是否超编",
        "label": "是否超编",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "required": false
      },
      {
        "key": "超编报批编号",
        "label": "超编报批编号",
        "type": "text",
        "required": false
      },
      {
        "key": "已录用人数",
        "label": "已录用人数",
        "type": "number",
        "required": false
      },
      {
        "key": "年龄",
        "label": "年龄",
        "type": "text",
        "required": false
      },
      {
        "key": "毕业院校要求",
        "label": "毕业院校要求",
        "type": "text",
        "required": false
      },
      {
        "key": "是否全日制",
        "label": "是否全日制",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "required": false
      },
      {
        "key": "学历",
        "label": "学历",
        "type": "select",
        "options": [
          "博士",
          "硕士",
          "本科",
          "大专",
          "中专及以下"
        ],
        "required": false
      },
      {
        "key": "专业方向",
        "label": "专业方向",
        "type": "text",
        "required": false
      },
      {
        "key": "资格条件",
        "label": "资格条件",
        "type": "select",
        "options": [
          "专业技术人员职业资格",
          "技能人员职业资格",
          "其他资格条件"
        ],
        "required": false
      },
      {
        "key": "工作经验要求",
        "label": "工作经验要求",
        "type": "text",
        "required": false
      },
      {
        "key": "岗位招聘原因",
        "label": "岗位招聘原因",
        "type": "textarea"
      },
      {
        "key": "岗位职责",
        "label": "岗位职责",
        "type": "textarea",
        "required": false
      },
      {
        "key": "工作地点",
        "label": "工作地点",
        "type": "text",
        "required": false
      }
    ]
  },
  {
    "key": "02",
    "code": "OA-L3-070102",
    "name": "拟录用人员审批流程",
    "scope": "对拟录用人员基本信息、资格材料、招聘岗位、用工类型、薪酬建议和面试结果进行审批，形成录用结论。",
    "short": "拟录用",
    "domain": "recruit",
    "fields": [
      {
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "姓名",
        "label": "姓名",
        "type": "text",
        "value": ""
      },
      {
        "key": "性别",
        "label": "性别",
        "type": "select",
        "value": "男",
        "options": [
          "男",
          "女"
        ]
      },
      {
        "key": "年龄",
        "label": "年龄",
        "type": "number",
        "value": "28"
      },
      {
        "key": "出生年月",
        "label": "出生年月",
        "type": "month",
        "value": "1990-01"
      },
      {
        "key": "民族",
        "label": "民族",
        "type": "text",
        "value": "汉族",
        "required": false
      },
      {
        "key": "籍贯",
        "label": "籍贯",
        "type": "text",
        "value": "四川宜宾",
        "required": false
      },
      {
        "key": "身份证号",
        "label": "身份证号",
        "type": "text",
        "value": "5115**********0028"
      },
      {
        "key": "政治面貌",
        "label": "政治面貌",
        "type": "select",
        "value": "群众",
        "options": [
          "中共党员",
          "中共预备党员",
          "共青团员",
          "群众"
        ]
      },
      {
        "key": "联系电话",
        "label": "联系电话",
        "type": "text",
        "value": "138****6621"
      },
      {
        "key": "电子邮箱",
        "label": "电子邮箱",
        "type": "email",
        "value": "zhaoning@jingmei.example"
      },
      {
        "key": "全日制学历",
        "label": "全日制学历",
        "type": "select",
        "options": [
          "博士",
          "硕士",
          "本科",
          "大专",
          "中专及以下"
        ],
        "value": "本科"
      },
      {
        "key": "在职学历",
        "label": "在职学历",
        "type": "select",
        "options": [
          "博士",
          "硕士",
          "本科",
          "大专",
          "中专及以下"
        ],
        "value": "本科",
        "required": false
      },
      {
        "key": "最高学历毕业院校",
        "label": "最高学历毕业院校",
        "type": "text",
        "value": ""
      },
      {
        "key": "专业",
        "label": "专业",
        "type": "text",
        "value": ""
      },
      {
        "key": "招聘形式",
        "label": "招聘形式",
        "type": "select",
        "options": [
          "校园招聘",
          "社会招聘",
          "内部招聘"
        ],
        "value": "校园招聘"
      },
      {
        "key": "招聘组织方式",
        "label": "招聘组织方式",
        "type": "select",
        "options": [
          "集中统一招聘",
          "申请授权自主招聘"
        ],
        "value": "集中统一招聘"
      },
      {
        "key": "招聘岗位",
        "label": "招聘岗位",
        "type": "text",
        "value": "质量检验员"
      },
      {
        "key": "岗位类别",
        "label": "岗位类别",
        "type": "select",
        "options": [
          "职能管理类",
          "市场营销类",
          "技术研发类",
          "生产操作与支持保障类"
        ],
        "value": "职能管理类"
      },
      {
        "key": "岗位资格",
        "label": "岗位资格",
        "type": "text",
        "value": "岗位安全资格证（模拟）"
      },
      {
        "key": "资格证书",
        "label": "资格证书",
        "type": "text",
        "value": ""
      },
      {
        "key": "用工类型",
        "label": "用工类型",
        "type": "select",
        "value": "正式",
        "options": [
          "正式",
          "实习"
        ]
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "工作地点",
        "label": "工作地点",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "笔试成绩",
        "label": "笔试成绩",
        "type": "number",
        "value": "0"
      },
      {
        "key": "面试成绩",
        "label": "面试成绩",
        "type": "number",
        "value": "0"
      },
      {
        "key": "综合成绩",
        "label": "综合成绩",
        "type": "number",
        "value": "0"
      },
      {
        "key": "综合排名",
        "label": "综合排名",
        "type": "number",
        "value": "0"
      },
      {
        "key": "面试评价",
        "label": "面试评价",
        "type": "textarea",
        "value": "专业知识及操作考核通过",
        "full": true
      },
      {
        "key": "面试资料",
        "label": "面试资料",
        "type": "attachment",
        "value": "已附模拟面试资料",
        "full": true,
        "required": false
      },
      {
        "key": "体检结果",
        "label": "体检结果",
        "type": "select",
        "options": [
          "合格",
          "不合格"
        ],
        "value": "合格"
      },
      {
        "key": "体检医院",
        "label": "体检医院",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "背景调查结论",
        "label": "背景调查结论",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "无犯罪记录",
        "label": "无犯罪记录",
        "type": "select",
        "options": [
          "有",
          "无"
        ],
        "value": "无"
      },
      {
        "key": "信用记录",
        "label": "信用记录",
        "type": "select",
        "options": [
          "正常",
          "异常"
        ],
        "value": "正常",
        "required": false
      },
      {
        "key": "原单位表现",
        "label": "原单位表现",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "公示起止时间",
        "label": "公示起止时间",
        "type": "text",
        "value": ""
      },
      {
        "key": "公示反馈函编号",
        "label": "公示反馈函编号",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "异议处理结论",
        "label": "异议处理结论",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "是否五粮液集团员工亲属",
        "label": "是否五粮液集团员工亲属",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "是否涉及回避",
        "label": "是否涉及回避",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "内部员工工作年限核验结果",
        "label": "内部员工工作年限核验结果",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "是否属于不得招聘情形",
        "label": "是否属于不得招聘情形",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "薪酬建议",
        "label": "薪酬建议",
        "type": "text",
        "value": "按核准薪档（模拟）",
        "required": false
      },
      {
        "key": "岗位定级",
        "label": "岗位定级",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "录用条件",
        "label": "录用条件",
        "type": "textarea",
        "value": "",
        "full": true
      },
      {
        "key": "年度招聘计划",
        "label": "年度招聘计划",
        "type": "text",
        "value": ""
      },
      {
        "key": "编制人数",
        "label": "编制人数",
        "type": "number",
        "value": "0",
        "readonly": true,
        "required": false
      },
      {
        "key": "现有人员",
        "label": "现有人员",
        "type": "number",
        "value": "0",
        "readonly": true,
        "required": false
      },
      {
        "key": "可招聘人数",
        "label": "可招聘人数",
        "type": "number",
        "value": "0",
        "readonly": true,
        "required": false
      },
      {
        "key": "本年度已招聘录用人数",
        "label": "本年度已招聘录用人数",
        "type": "number",
        "value": "0",
        "readonly": true,
        "required": false
      },
      {
        "key": "本次校招拟录用人数",
        "label": "本次校招拟录用人数",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "本次社招拟录用人数",
        "label": "本次社招拟录用人数",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "本次内招拟录用人数",
        "label": "本次内招拟录用人数",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "本次拟录用人数",
        "label": "本次拟录用人数",
        "type": "number",
        "value": "0"
      },
      {
        "key": "编制使用情况",
        "label": "编制使用情况",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "录用人员",
        "label": "录用人员",
        "type": "text",
        "value": "赵宁",
        "hidden": true
      },
      {
        "key": "学历",
        "label": "学历",
        "type": "select",
        "value": "本科",
        "options": [
          "博士",
          "硕士",
          "本科",
          "大专",
          "中专及以下"
        ],
        "hidden": true
      },
      {
        "key": "相关证书",
        "label": "相关证书",
        "type": "text",
        "value": "质量检验员资格证（模拟）",
        "hidden": true
      },
      {
        "key": "面试结果",
        "label": "面试结果",
        "type": "select",
        "value": "通过",
        "options": [
          "通过",
          "待定",
          "不通过"
        ],
        "hidden": true
      }
    ],
    "steps": [
      {
        "name": "资格与面试核验",
        "role": "hr"
      },
      {
        "name": "录用结果审批",
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-10",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "张薇",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "生产管理部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "设备操作员"
      },
      {
        "key": "用工类型",
        "label": "用工类型",
        "type": "select",
        "value": "正式",
        "options": [
          "正式",
          "实习"
        ]
      },
      {
        "key": "招聘类型",
        "label": "招聘类型",
        "type": "select",
        "options": [
          "校园招聘",
          "社会招聘",
          "政策性安置",
          "其他类型"
        ],
        "value": "校园招聘"
      },
      {
        "key": "人员类别",
        "label": "人员类别",
        "type": "select",
        "value": "技术研发类",
        "options": [
          "技术研发类",
          "生产操作与支持保障类",
          "市场营销类",
          "职能管理类",
          "其他"
        ]
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2026-09-10"
      },
      {
        "key": "考勤起始日期",
        "label": "考勤起始日期",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "考勤终止日期",
        "label": "考勤终止日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "三方协议",
        "label": "三方协议",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "现实表现证明",
        "label": "现实表现证明",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "解除劳动关系证明",
        "label": "解除劳动关系证明",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "其他相关附件",
        "label": "其他相关附件",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "附件",
        "label": "附件",
        "type": "attachment",
        "value": "已附模拟入职资料",
        "full": true,
        "hidden": true
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
    "self": false,
    "detail": [
      {
        "key": "协同任务类型",
        "label": "协同任务类型",
        "type": "select",
        "options": [
          "入职资料",
          "宿舍",
          "OA开通",
          "车辆信息录入",
          "指纹/人脸录入",
          "工作服/物资",
          "培训",
          "劳动合同",
          "节假日慰问品",
          "购物卡",
          "季度劳保"
        ]
      },
      {
        "key": "办理责任",
        "label": "办理责任",
        "type": "text"
      },
      {
        "key": "办理状态",
        "label": "办理状态",
        "type": "select",
        "options": [
          "待办理",
          "进行中",
          "已完成",
          "不适用"
        ]
      },
      {
        "key": "完成时间",
        "label": "完成时间",
        "type": "datetime-local",
        "required": false
      }
    ]
  },
  {
    "key": "04",
    "code": "OA-L3-070104",
    "name": "试用期考核及转正流程",
    "scope": "在试用期到期前下发考核任务，完成考核结果、部门评价、人事复核及转正审批；按人员类别和适用条件下发工会会员、企业年金、五粮液家园、购物卡及季度劳保等协同任务，并登记办理结果。",
    "short": "试用期转正",
    "domain": "recruit",
    "fields": [
      {
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明"
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "人员类别",
        "label": "人员类别",
        "type": "select",
        "value": "技术研发类",
        "options": [
          "技术研发类",
          "生产操作与支持保障类",
          "市场营销类",
          "职能管理类",
          "其他"
        ]
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2025-03-18"
      },
      {
        "key": "负责人",
        "label": "负责人",
        "type": "text",
        "value": "周敏"
      },
      {
        "key": "负责部门",
        "label": "负责部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "带教老师",
        "label": "带教老师",
        "type": "select",
        "value": "吴欣",
        "options": [
          "吴欣",
          "何静",
          "刘强",
          "李明",
          "张薇"
        ]
      },
      {
        "key": "带教协议编号",
        "label": "带教协议编号",
        "type": "text",
        "value": "BETA-2026-018"
      },
      {
        "key": "带教需求表",
        "label": "带教需求表",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "带教培养计划",
        "label": "带教培养计划",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "考核日期",
        "label": "考核日期",
        "type": "date",
        "value": "2026-09-30"
      },
      {
        "key": "考核结果",
        "label": "考核结果",
        "type": "text",
        "value": "已完成试用期工作任务"
      },
      {
        "key": "月度考核结果",
        "label": "月度考核结果",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "试用期考核汇总表",
        "label": "试用期考核汇总表",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "录用条件确认函编号",
        "label": "录用条件确认函编号",
        "type": "text",
        "value": ""
      },
      {
        "key": "提前转正条件确认",
        "label": "提前转正条件确认",
        "type": "select",
        "options": [
          "满足",
          "不满足"
        ],
        "value": "满足",
        "required": false
      },
      {
        "key": "试用结束日期",
        "label": "试用结束日期",
        "type": "date",
        "value": "2026-09-30"
      },
      {
        "key": "转正意见",
        "label": "转正意见",
        "type": "select",
        "value": "同意转正",
        "options": [
          "同意转正",
          "提前转正",
          "调整岗位",
          "不予转正"
        ]
      },
      {
        "key": "员工总结",
        "label": "员工总结",
        "type": "textarea",
        "value": "试用期工作总结（模拟）",
        "full": true
      },
      {
        "key": "部门评价",
        "label": "部门评价",
        "type": "textarea",
        "value": "具备岗位任职能力",
        "full": true
      }
    ],
    "steps": [
      {
        "name": "考核结果",
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2026-09-07"
      },
      {
        "key": "异动类型",
        "label": "异动类型",
        "type": "select",
        "value": "跨部门调动",
        "options": [
          "部门内调动",
          "跨部门调动",
          "跨单位调动",
          "调整岗位",
          "机构调整",
          "调配池转入",
          "调配池转出"
        ]
      },
      {
        "key": "调整岗位类别",
        "label": "调整岗位类别",
        "type": "select",
        "options": [
          "计件岗位调整",
          "其他岗位调整-提级",
          "其他岗位调整-平级/降级"
        ],
        "value": "计件岗位调整",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调整岗位"
          ]
        }
      },
      {
        "key": "是否批量",
        "label": "是否批量",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "调配池转入方式",
        "label": "调配池转入方式",
        "type": "select",
        "options": [
          "自动",
          "强制"
        ],
        "value": "自动",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "调配池转出方式",
        "label": "调配池转出方式",
        "type": "select",
        "options": [
          "岗位竞聘",
          "公司安置"
        ],
        "value": "岗位竞聘",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转出"
          ]
        }
      },
      {
        "key": "进入调配池日期",
        "label": "进入调配池日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "累计进入次数",
        "label": "累计进入次数",
        "type": "number",
        "value": "0",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "转出调配池日期",
        "label": "转出调配池日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转出"
          ]
        }
      },
      {
        "key": "待岗培训内容",
        "label": "待岗培训内容",
        "type": "text",
        "value": "",
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "待岗培训时间",
        "label": "待岗培训时间",
        "type": "text",
        "value": "",
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "临时工作内容",
        "label": "临时工作内容",
        "type": "text",
        "value": "",
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "考核评价结果",
        "label": "考核评价结果",
        "type": "select",
        "options": [
          "优秀",
          "合格",
          "不合格"
        ],
        "value": "合格",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "调配池薪酬标准",
        "label": "调配池薪酬标准",
        "type": "text",
        "value": "",
        "required": false,
        "showWhen": {
          "field": "异动类型",
          "in": [
            "调配池转入"
          ]
        }
      },
      {
        "key": "主负责人",
        "label": "主负责人",
        "type": "text",
        "value": "周敏"
      },
      {
        "key": "协办人",
        "label": "协办人",
        "type": "multiselect",
        "value": "",
        "required": false
      },
      {
        "key": "异动原因",
        "label": "异动原因",
        "type": "textarea",
        "value": "",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟调动资料",
        "full": true,
        "required": false
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
    "self": false,
    "detail": [
      {
        "key": "调动人员",
        "label": "调动人员",
        "type": "text"
      },
      {
        "key": "调出公司",
        "label": "调出公司",
        "type": "select",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ]
      },
      {
        "key": "调出部门",
        "label": "调出部门",
        "type": "text"
      },
      {
        "key": "调出岗位",
        "label": "调出岗位",
        "type": "text"
      },
      {
        "key": "调入公司",
        "label": "调入公司",
        "type": "select",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ]
      },
      {
        "key": "调入部门",
        "label": "调入部门",
        "type": "text"
      },
      {
        "key": "调入岗位",
        "label": "调入岗位",
        "type": "text"
      },
      {
        "key": "调整岗位类别",
        "label": "调整岗位类别",
        "type": "select",
        "options": [
          "计件岗位调整",
          "其他岗位调整-提级",
          "其他岗位调整-平级/降级"
        ],
        "required": false
      },
      {
        "key": "岗位资格",
        "label": "岗位资格",
        "type": "select",
        "options": [
          "有效资格",
          "无特殊资格"
        ]
      },
      {
        "key": "调配池方式",
        "label": "调配池方式",
        "type": "select",
        "options": [
          "主动转入",
          "强制转入",
          "岗位竞聘",
          "公司安置"
        ],
        "required": false
      },
      {
        "key": "到岗日期",
        "label": "到岗日期",
        "type": "date"
      }
    ]
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "员工状态",
        "label": "员工状态",
        "type": "text",
        "value": "在职",
        "readonly": true,
        "required": false
      },
      {
        "key": "合同编号",
        "label": "合同编号",
        "type": "text",
        "value": "LD-2026-018"
      },
      {
        "key": "合同台账编号",
        "label": "合同台账编号",
        "type": "text",
        "value": "TZ-2026-018"
      },
      {
        "key": "合同类型",
        "label": "合同类型",
        "type": "select",
        "options": [
          "固定期限",
          "无固定期限",
          "以完成一定工作任务为期限"
        ],
        "value": "固定期限"
      },
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
        "key": "合同开始日期",
        "label": "合同开始日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "合同结束日期",
        "label": "合同结束日期",
        "type": "date",
        "value": "2029-09-30"
      },
      {
        "key": "续签考核得分",
        "label": "续签考核得分",
        "type": "number",
        "value": "0",
        "required": false,
        "showWhen": {
          "field": "办理类型",
          "in": [
            "续签"
          ]
        }
      },
      {
        "key": "通知书编号",
        "label": "通知书编号",
        "type": "text",
        "value": "TZ-2026-112",
        "required": false
      },
      {
        "key": "员工签收日期",
        "label": "员工签收日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "textarea",
        "value": "按最新版本签署",
        "required": false,
        "full": true
      },
      {
        "key": "附件",
        "label": "附件",
        "type": "attachment",
        "value": "已附模拟合同资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "用工性质",
        "label": "用工性质",
        "type": "select",
        "options": [
          "正式员工",
          "试用期员工",
          "实习生"
        ],
        "value": "正式员工"
      },
      {
        "key": "身份证号",
        "label": "身份证号",
        "type": "text",
        "value": "511500199001011234"
      },
      {
        "key": "劳动合同开始日期",
        "label": "劳动合同开始日期",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "劳动合同终止日期",
        "label": "劳动合同终止日期",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "入职日期",
        "label": "入职日期",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "参保情况",
        "label": "参保情况",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "离职日期",
        "label": "离职日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "离职原因",
        "label": "离职原因",
        "type": "textarea",
        "value": "个人职业发展",
        "full": true
      },
      {
        "key": "工作交接对象",
        "label": "工作交接对象",
        "type": "text",
        "value": "部门负责人"
      },
      {
        "key": "负责人",
        "label": "负责人",
        "type": "text",
        "value": "周敏"
      },
      {
        "key": "是否完成交接",
        "label": "是否完成交接",
        "type": "select",
        "value": "是",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "交接内容",
        "label": "交接内容",
        "type": "textarea",
        "value": "工作、资产、账号、结算分项办理",
        "full": true
      },
      {
        "key": "离职结算单编号",
        "label": "离职结算单编号",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟离职资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "劳动合同编号",
        "label": "劳动合同编号",
        "type": "text",
        "value": "LD-2025-0318"
      },
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "协商解除",
        "options": [
          "协商解除",
          "过失性辞退",
          "非过失性辞退",
          "劳动合同到期不续签",
          "退休"
        ]
      },
      {
        "key": "具体原因",
        "label": "具体原因",
        "type": "select",
        "options": [
          "协商一致解除",
          "不能胜任工作",
          "医疗期满",
          "客观情况发生重大变化",
          "试用期不符合录用条件",
          "严重违反规章制度",
          "劳动合同到期不续签",
          "达到法定退休年龄"
        ],
        "value": "协商一致解除"
      },
      {
        "key": "合同到期日期",
        "label": "合同到期日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "是否试用期内",
        "label": "是否试用期内",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "是否涉及补偿金",
        "label": "是否涉及补偿金",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "补偿金金额",
        "label": "补偿金金额",
        "type": "number",
        "value": "0",
        "showWhen": {
          "field": "是否涉及补偿金",
          "in": [
            "是"
          ]
        }
      },
      {
        "key": "代通知金",
        "label": "代通知金",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "是否涉及经济性裁员",
        "label": "是否涉及经济性裁员",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "补偿金计算依据",
        "label": "补偿金计算依据",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false,
        "showWhen": {
          "field": "是否涉及补偿金",
          "in": [
            "是"
          ]
        }
      },
      {
        "key": "送达方式",
        "label": "送达方式",
        "type": "select",
        "options": [
          "当面送达",
          "邮寄送达",
          "飞书送达",
          "微信送达",
          "QQ邮箱送达",
          "公告送达"
        ],
        "value": "当面送达",
        "required": false
      },
      {
        "key": "预计办理日期",
        "label": "预计办理日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "实际办理日期",
        "label": "实际办理日期",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "办理说明",
        "label": "办理说明",
        "type": "textarea",
        "value": "按制度办理",
        "full": true
      },
      {
        "key": "人社局办理结果",
        "label": "人社局办理结果",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "医保清算状态",
        "label": "医保清算状态",
        "type": "select",
        "options": [
          "未办理",
          "办理中",
          "已办结"
        ],
        "value": "未办理",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟解除资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
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
        "key": "投诉渠道",
        "label": "投诉渠道",
        "type": "select",
        "options": [
          "书面",
          "邮件",
          "匿名信箱",
          "外部转办"
        ],
        "value": "书面"
      },
      {
        "key": "是否匿名",
        "label": "是否匿名",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否"
      },
      {
        "key": "事项性质",
        "label": "事项性质",
        "type": "select",
        "options": [
          "一般事项",
          "重大事项"
        ],
        "value": "一般事项"
      },
      {
        "key": "外部投诉来源",
        "label": "外部投诉来源",
        "type": "select",
        "options": [
          "劳动仲裁",
          "信访",
          "12345热线",
          "上级转办",
          "其他"
        ],
        "value": "劳动仲裁",
        "required": false
      },
      {
        "key": "事项发生日期",
        "label": "事项发生日期",
        "type": "date",
        "value": "2026-09-20"
      },
      {
        "key": "涉及对象",
        "label": "涉及对象",
        "type": "text",
        "value": "质量管理部"
      },
      {
        "key": "事项详情",
        "label": "事项详情",
        "type": "textarea",
        "value": "对考核结果有异议，申请复核。",
        "full": true
      },
      {
        "key": "台账编号",
        "label": "台账编号",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "受理时限",
        "label": "受理时限",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "反馈时限",
        "label": "反馈时限",
        "type": "date",
        "value": "2026-09-07",
        "required": false
      },
      {
        "key": "相关证据",
        "label": "相关证据",
        "type": "attachment",
        "value": "已附模拟证据资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "options": [
          "离岗休养",
          "因病离岗休息"
        ],
        "value": "离岗休养"
      },
      {
        "key": "性别",
        "label": "性别",
        "type": "select",
        "options": [
          "男",
          "女"
        ],
        "value": "男"
      },
      {
        "key": "身份证号码",
        "label": "身份证号码",
        "type": "text",
        "value": "511500199001011234"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "出生时间",
        "label": "出生时间",
        "type": "date",
        "value": "1990-01-01",
        "readonly": true,
        "required": false
      },
      {
        "key": "年龄",
        "label": "年龄",
        "type": "number",
        "value": "36",
        "readonly": true,
        "required": false
      },
      {
        "key": "联系电话",
        "label": "联系电话",
        "type": "text",
        "value": "13800001234"
      },
      {
        "key": "家庭地址",
        "label": "家庭地址",
        "type": "text",
        "value": "宜宾市翠屏区",
        "required": false
      },
      {
        "key": "个人申请原因",
        "label": "个人申请原因",
        "type": "textarea",
        "value": "",
        "full": true
      },
      {
        "key": "离岗开始日期",
        "label": "离岗开始日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "离岗结束日期",
        "label": "离岗结束日期",
        "type": "date",
        "value": "2026-10-15"
      },
      {
        "key": "离岗周期",
        "label": "离岗周期",
        "type": "text",
        "value": "15天",
        "readonly": true,
        "required": false
      },
      {
        "key": "三级甲等医院确诊病种",
        "label": "三级甲等医院确诊病种",
        "type": "text",
        "value": "",
        "required": false,
        "showWhen": {
          "field": "办理类型",
          "in": [
            "因病离岗休息"
          ]
        }
      },
      {
        "key": "病情类型",
        "label": "病情类型",
        "type": "select",
        "options": [
          "重大",
          "非重大"
        ],
        "value": "重大",
        "required": false,
        "showWhen": {
          "field": "办理类型",
          "in": [
            "因病离岗休息"
          ]
        }
      },
      {
        "key": "本公司工龄",
        "label": "本公司工龄",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "实发工资",
        "label": "实发工资",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "上一年度月平均收入",
        "label": "上一年度月平均收入",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "标准比例",
        "label": "标准比例",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "待遇金额",
        "label": "待遇金额",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "协议书编号",
        "label": "协议书编号",
        "type": "text",
        "value": "XY-2026-006",
        "required": false
      },
      {
        "key": "员工确认",
        "label": "员工确认",
        "type": "select",
        "options": [
          "已签字确认",
          "未确认"
        ],
        "value": "已签字确认",
        "required": false
      },
      {
        "key": "经办人",
        "label": "经办人",
        "type": "text",
        "value": "吴欣",
        "required": false
      },
      {
        "key": "三级甲等医院诊断证明",
        "label": "三级甲等医院诊断证明",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false,
        "showWhen": {
          "field": "办理类型",
          "in": [
            "因病离岗休息"
          ]
        }
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟休养资料",
        "full": true,
        "required": false
      },
      {
        "key": "休养原因",
        "label": "休养原因",
        "type": "textarea",
        "value": "依据证明申请离岗休养（模拟）",
        "full": true,
        "hidden": true
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "档案编号",
        "label": "档案编号",
        "type": "text",
        "value": "DA-2026-018",
        "required": false
      },
      {
        "key": "信息来源流程",
        "label": "信息来源流程",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "员工信息登记表",
        "label": "员工信息登记表",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "补充说明",
        "label": "补充说明",
        "type": "textarea",
        "value": "",
        "required": false,
        "full": true
      },
      {
        "key": "其他附件",
        "label": "其他附件",
        "type": "attachment",
        "value": "已附模拟资料",
        "full": true,
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟档案资料",
        "full": true,
        "hidden": true
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
    "self": true,
    "detail": [
      {
        "key": "变更前信息",
        "label": "变更前信息",
        "type": "text"
      },
      {
        "key": "变更后信息",
        "label": "变更后信息",
        "type": "text"
      },
      {
        "key": "变更原因",
        "label": "变更原因",
        "type": "text"
      }
    ]
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "流程编号",
        "label": "流程编号",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "假别",
        "label": "请假类型",
        "type": "select",
        "value": "年休假",
        "options": [
          "年休假",
          "事假",
          "病假",
          "补休（换休假）",
          "婚假",
          "产假",
          "护理假",
          "丧假",
          "工伤假",
          "法定假",
          "工勤假"
        ]
      },
      {
        "key": "请假单位",
        "label": "请假单位",
        "type": "select",
        "options": [
          "天",
          "小时"
        ],
        "value": "天"
      },
      {
        "key": "可调休时长",
        "label": "可调休时长",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "年假可申请天数",
        "label": "年假可申请天数",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "开始日期",
        "label": "请假开始日期",
        "type": "date",
        "value": "2026-10-08"
      },
      {
        "key": "结束日期",
        "label": "请假结束日期",
        "type": "date",
        "value": "2026-10-08"
      },
      {
        "key": "天数",
        "label": "请假时长",
        "type": "number",
        "value": "1",
        "readonly": true,
        "required": false
      },
      {
        "key": "车间审核人员",
        "label": "请选择车间审核人员",
        "type": "select",
        "value": "刘强",
        "options": [
          "刘强",
          "周敏",
          "何静",
          "吴欣"
        ]
      },
      {
        "key": "二级审核人员",
        "label": "请选择二级审核人员",
        "type": "select",
        "value": "周敏",
        "options": [
          "刘强",
          "周敏",
          "何静",
          "吴欣"
        ]
      },
      {
        "key": "工作交接人",
        "label": "工作交接人",
        "type": "select",
        "value": "李明",
        "options": [
          "李明",
          "张薇",
          "王晓雨",
          "陈杰"
        ]
      },
      {
        "key": "事由",
        "label": "请假事由",
        "type": "textarea",
        "value": "个人事务",
        "full": true
      },
      {
        "key": "补录原因",
        "label": "补录原因",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟请假资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "原单编号",
        "label": "原请假单编号",
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
        "key": "原结束日期",
        "label": "原结束日期",
        "type": "text",
        "value": "2026-08-11",
        "readonly": true,
        "required": false
      },
      {
        "key": "开始日期",
        "label": "变更后开始日期",
        "type": "date",
        "value": "2026-08-10",
        "required": false
      },
      {
        "key": "结束日期",
        "label": "变更后结束日期",
        "type": "date",
        "value": "2026-08-10",
        "required": false
      },
      {
        "key": "新天数",
        "label": "变更后天数",
        "type": "number",
        "value": "1",
        "required": false
      },
      {
        "key": "现结束日期",
        "label": "现结束日期",
        "type": "date",
        "value": "2026-08-10"
      },
      {
        "key": "原因",
        "label": "变更原因",
        "type": "textarea",
        "value": "提前返岗",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟销假资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "标题",
        "label": "标题",
        "type": "text",
        "value": "生产支持加班申请（演示）"
      },
      {
        "key": "附件",
        "label": "附件",
        "type": "attachment",
        "value": "已附模拟加班资料",
        "full": true,
        "required": false
      },
      {
        "key": "部门审核人员",
        "label": "请选择相关部门审核人员（仅发起多部门加班时选择此项）",
        "type": "multiselect",
        "options": [
          "刘强",
          "周敏",
          "何静",
          "吴欣"
        ],
        "value": "",
        "required": false,
        "full": true
      }
    ],
    "detail": [
      {
        "key": "姓名",
        "label": "姓名",
        "type": "text",
        "required": false
      },
      {
        "key": "加班类型",
        "label": "加班类型",
        "type": "select",
        "options": [
          "平时",
          "周末",
          "节假日"
        ],
        "required": false
      },
      {
        "key": "加班事由",
        "label": "加班事由",
        "type": "text",
        "required": false
      },
      {
        "key": "加班开始日期时间",
        "label": "加班开始日期时间",
        "type": "datetime-local",
        "required": false
      },
      {
        "key": "加班结束日期时间",
        "label": "加班结束日期时间",
        "type": "datetime-local",
        "required": false
      },
      {
        "key": "加班时长",
        "label": "加班时长",
        "type": "number",
        "required": false
      },
      {
        "key": "加班处置",
        "label": "加班处置",
        "type": "select",
        "options": [
          "换补休",
          "申报加班工资"
        ],
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "来源类别",
        "label": "调休来源",
        "type": "select",
        "value": "平时",
        "options": [
          "平时",
          "周末",
          "节假日"
        ]
      },
      {
        "key": "可调休时长",
        "label": "可调休时长",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "开始日期",
        "label": "调休开始日期",
        "type": "date",
        "value": "2026-10-12"
      },
      {
        "key": "结束日期",
        "label": "调休结束日期",
        "type": "date",
        "value": "2026-10-12"
      },
      {
        "key": "小时数",
        "label": "调休时长（小时）",
        "type": "number",
        "value": "1"
      },
      {
        "key": "是否已交接工作",
        "label": "是否已交接工作",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "负责人（监交人）",
        "label": "负责人（监交人）",
        "type": "select",
        "value": "周敏",
        "options": [
          "刘强",
          "周敏",
          "何静",
          "吴欣"
        ]
      },
      {
        "key": "工作交接人",
        "label": "工作交接人",
        "type": "select",
        "value": "张薇",
        "options": [
          "李明",
          "张薇",
          "王晓雨",
          "陈杰"
        ]
      },
      {
        "key": "事由",
        "label": "调休事由",
        "type": "textarea",
        "value": "使用加班补休",
        "full": true
      },
      {
        "key": "交接事项",
        "label": "交接事项",
        "type": "textarea",
        "value": "在手工作、待办事项及资料交接",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟调休资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
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
        "key": "出差起始地",
        "label": "出差起始地",
        "type": "text",
        "value": "宜宾"
      },
      {
        "key": "出差途径地点",
        "label": "出差途径地点",
        "type": "text",
        "value": "成都",
        "required": false
      },
      {
        "key": "地点",
        "label": "目的地",
        "type": "text",
        "value": "成都供应商现场"
      },
      {
        "key": "交通方式",
        "label": "交通方式",
        "type": "multiselect",
        "value": "可多选：公司公务车",
        "options": [
          "可多选：公司公务车",
          "大巴",
          "火车",
          "飞机",
          "轮船",
          "自驾",
          "其他"
        ],
        "required": false
      },
      {
        "key": "同行人员",
        "label": "同行人员",
        "type": "text",
        "value": "无"
      },
      {
        "key": "出差人员是否包含中层（正、副）职",
        "label": "出差人员是否包含中层（正、副）职",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "出差人员是否有中层正职（含主持工作的副职）",
        "label": "出差人员是否有中层正职（含主持工作的副职）",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "是否盖电子章",
        "label": "是否盖电子章",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "部门用印负责人",
        "label": "部门用印负责人",
        "type": "select",
        "value": "何静",
        "options": [
          "何静",
          "周敏",
          "刘强",
          "吴欣"
        ]
      },
      {
        "key": "是否需预订票务住宿",
        "label": "是否需预订票务住宿",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ]
      },
      {
        "key": "是否定位打卡",
        "label": "是否定位打卡",
        "type": "select",
        "options": [
          "是",
          "否"
        ],
        "value": "否",
        "required": false
      },
      {
        "key": "定位打卡时间",
        "label": "定位打卡时间",
        "type": "datetime-local",
        "value": "2026-10-10T18:00",
        "required": false
      },
      {
        "key": "定位打卡地点",
        "label": "定位打卡地点",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "事由",
        "label": "出差/外出事由",
        "type": "textarea",
        "value": "现场质量核验",
        "full": true
      },
      {
        "key": "补录原因",
        "label": "补录原因",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "未打卡说明",
        "label": "未打卡说明",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟出差资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
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
        "key": "班组",
        "label": "班组",
        "type": "text",
        "value": "印刷一班"
      },
      {
        "key": "开始日期",
        "label": "排班开始日期",
        "type": "date",
        "value": "2026-10-14"
      },
      {
        "key": "结束日期",
        "label": "排班结束日期",
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
        "key": "排班人员",
        "label": "排班人员",
        "type": "multiselect",
        "value": "",
        "required": false
      },
      {
        "key": "补录原因",
        "label": "补录原因",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "排班说明",
        "label": "排班说明",
        "type": "textarea",
        "value": "按周排班，遇调班另行申请",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟排班资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
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
        "label": "异常日期",
        "type": "date",
        "value": "2026-09-06"
      },
      {
        "key": "异常时刻",
        "label": "异常时间",
        "type": "text",
        "value": "08:30"
      },
      {
        "key": "更正结果",
        "label": "申请更正结果",
        "type": "select",
        "value": "正常",
        "options": [
          "正常",
          "请假",
          "外勤"
        ]
      },
      {
        "key": "车间审核人员",
        "label": "请选择部门内勤员",
        "type": "select",
        "value": "刘强",
        "options": [
          "刘强",
          "周敏",
          "何静",
          "吴欣"
        ]
      },
      {
        "key": "说明",
        "label": "补卡/异常说明",
        "type": "textarea",
        "value": "已核对原打卡和证明记录",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟补卡资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明"
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "考勤年度",
        "label": "考勤年度",
        "type": "text",
        "value": "2026"
      },
      {
        "key": "月份",
        "label": "考勤月份",
        "type": "text",
        "value": "2026-09"
      },
      {
        "key": "应出勤天数",
        "label": "应出勤天数",
        "type": "number",
        "value": "22"
      },
      {
        "key": "实际出勤天数",
        "label": "实际出勤天数",
        "type": "number",
        "value": "22"
      },
      {
        "key": "请假类型",
        "label": "请假类型（多选）",
        "type": "multiselect",
        "options": [
          "年休假",
          "事假",
          "病假",
          "补休（换休假）",
          "婚假",
          "产假",
          "护理假",
          "丧假",
          "工伤假",
          "法定假",
          "工勤假"
        ],
        "value": "",
        "required": false
      },
      {
        "key": "请假天数",
        "label": "请假天数",
        "type": "number",
        "value": "0"
      },
      {
        "key": "缺勤天数",
        "label": "缺勤天数",
        "type": "number",
        "value": "1"
      },
      {
        "key": "加班类型",
        "label": "加班类型",
        "type": "select",
        "value": "平时",
        "options": [
          "平时",
          "周末",
          "节假日"
        ]
      },
      {
        "key": "加班时长",
        "label": "加班时长（小时）",
        "type": "number",
        "value": 0
      },
      {
        "key": "加班处置方式",
        "label": "加班处置方式",
        "type": "select",
        "value": "换补休",
        "options": [
          "换补休",
          "申报加班工资"
        ]
      },
      {
        "key": "调休时长",
        "label": "调休时长（小时）",
        "type": "number",
        "value": 0,
        "required": false
      },
      {
        "key": "出差天数",
        "label": "出差天数",
        "type": "number",
        "value": 0
      },
      {
        "key": "外出天数",
        "label": "外出天数",
        "type": "number",
        "value": 0
      },
      {
        "key": "外勤天数",
        "label": "外勤天数",
        "type": "number",
        "value": 0
      },
      {
        "key": "工时合计",
        "label": "工时合计",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "textarea",
        "value": "",
        "required": false,
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟考勤资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "年度",
        "label": "查询年度",
        "type": "number",
        "value": "2026"
      },
      {
        "key": "查询部门",
        "label": "查询部门",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "查询员工",
        "label": "查询员工",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "输出类型",
        "label": "输出类型",
        "type": "select",
        "value": "年度汇总",
        "options": [
          "年度汇总",
          "考勤明细"
        ]
      },
      {
        "key": "输出格式",
        "label": "输出格式",
        "type": "select",
        "value": "Excel",
        "options": [
          "Excel",
          "PDF"
        ]
      },
      {
        "key": "数据来源版本",
        "label": "数据来源版本",
        "type": "text",
        "value": "",
        "readonly": true,
        "required": false
      },
      {
        "key": "用途说明",
        "label": "用途说明",
        "type": "textarea",
        "value": "年度考勤核对",
        "full": true
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "计划类型",
        "label": "计划类型",
        "type": "select",
        "value": "新制定",
        "options": [
          "新制定",
          "调整"
        ]
      },
      {
        "key": "新计划名称",
        "label": "新计划名称",
        "type": "text",
        "value": "2026年第四季度个人绩效考核计划"
      },
      {
        "key": "新计划编号",
        "label": "新计划编号",
        "type": "text",
        "value": "HR-PLAN-2026Q4-001"
      },
      {
        "key": "考核周期类型",
        "label": "考核周期类型",
        "type": "select",
        "value": "季度",
        "options": [
          "季度",
          "年度"
        ]
      },
      {
        "key": "考核开始日期",
        "label": "考核开始日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "考核结束日期",
        "label": "考核结束日期",
        "type": "date",
        "value": "2026-12-31"
      },
      {
        "key": "考核周期（天）",
        "label": "考核周期（天）",
        "type": "number",
        "value": "92",
        "readonly": true,
        "required": false
      },
      {
        "key": "考核内容",
        "label": "考核内容",
        "type": "textarea",
        "value": "重点工作任务 80%、工作能力与态度 20%，加减分项按制度加减。",
        "full": true
      },
      {
        "key": "绩效类别",
        "label": "绩效类别",
        "type": "select",
        "value": "个人绩效",
        "options": [
          "组织绩效",
          "个人绩效"
        ]
      },
      {
        "key": "考核对象",
        "label": "考核对象",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "岗位类别",
        "label": "岗位类别",
        "type": "select",
        "value": "员工",
        "options": [
          "单位负责人",
          "其他管理人员（含组长、主管）",
          "员工"
        ],
        "required": false
      },
      {
        "key": "原计划编号",
        "label": "原计划编号",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "调整原因",
        "label": "调整原因",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "指标权重合计（%）",
        "label": "指标权重合计（%）",
        "type": "number",
        "value": "100",
        "readonly": true,
        "required": false
      },
      {
        "key": "审批依据",
        "label": "审批依据",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附季度绩效指标考核表（模拟）",
        "full": true,
        "required": false
      }
    ],
    "detail": [
      {
        "key": "指标类型",
        "label": "指标类型",
        "type": "select",
        "options": [
          "团队建设与管理",
          "重点工作任务",
          "关键业绩指标（KPI）",
          "工作能力与态度",
          "工作满意度",
          "加减分项"
        ],
        "required": false
      },
      {
        "key": "指标",
        "label": "指标",
        "type": "text",
        "required": false
      },
      {
        "key": "目标",
        "label": "目标",
        "type": "text",
        "required": false
      },
      {
        "key": "评价标准",
        "label": "评价标准",
        "type": "text",
        "required": false
      },
      {
        "key": "权重",
        "label": "权重%",
        "type": "number",
        "required": false
      }
    ],
    "steps": [
      {
        "name": "指标与权重核验",
        "role": "hr"
      },
      {
        "name": "审批（分管领导/领导小组）",
        "role": "hrHead"
      },
      {
        "name": "生效备案",
        "role": "hr"
      }
    ],
    "self": true,
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "考核周期",
        "label": "考核周期",
        "type": "text",
        "value": "2026年第四季度"
      },
      {
        "key": "计划编号",
        "label": "计划编号",
        "type": "text",
        "value": "HR-PLAN-2026Q4-001"
      },
      {
        "key": "计划名称",
        "label": "计划名称",
        "type": "text",
        "value": "2026年第四季度个人绩效考核计划"
      },
      {
        "key": "考核分数",
        "label": "考核分数",
        "type": "number",
        "value": "86",
        "required": false
      },
      {
        "key": "校准分",
        "label": "校准分",
        "type": "number",
        "value": "88",
        "required": false
      },
      {
        "key": "考核等级",
        "label": "考核等级",
        "type": "text",
        "value": "B（良好/称职）",
        "readonly": true,
        "required": false
      },
      {
        "key": "组织绩效等级",
        "label": "组织绩效等级",
        "type": "select",
        "value": "A",
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "required": false
      },
      {
        "key": "校准记录",
        "label": "校准记录",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "面谈记录",
        "label": "面谈记录",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "结果应用",
        "label": "结果应用",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "确认结果",
        "label": "确认结果",
        "type": "select",
        "value": "确认",
        "options": [
          "确认",
          "有异议"
        ]
      },
      {
        "key": "绩效类别",
        "label": "绩效类别",
        "type": "select",
        "value": "个人绩效",
        "options": [
          "组织绩效",
          "个人绩效"
        ]
      },
      {
        "key": "申诉提交时间",
        "label": "申诉提交时间",
        "type": "datetime-local",
        "value": "",
        "required": false,
        "showWhen": {
          "field": "确认结果",
          "in": [
            "有异议"
          ]
        }
      },
      {
        "key": "是否受理",
        "label": "是否受理",
        "type": "select",
        "value": "受理",
        "options": [
          "受理",
          "不予受理（逾期）"
        ],
        "required": false,
        "showWhen": {
          "field": "确认结果",
          "in": [
            "有异议"
          ]
        }
      },
      {
        "key": "初步调查意见",
        "label": "初步调查意见",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false,
        "showWhen": {
          "field": "确认结果",
          "in": [
            "有异议"
          ]
        }
      },
      {
        "key": "仲裁意见",
        "label": "仲裁意见",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false,
        "showWhen": {
          "field": "确认结果",
          "in": [
            "有异议"
          ]
        }
      },
      {
        "key": "是否提请最终仲裁",
        "label": "是否提请最终仲裁",
        "type": "select",
        "value": "否",
        "options": [
          "是",
          "否"
        ],
        "required": false,
        "showWhen": {
          "field": "确认结果",
          "in": [
            "有异议"
          ]
        }
      },
      {
        "key": "最终仲裁结果",
        "label": "最终仲裁结果",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false,
        "showWhen": {
          "field": "确认结果",
          "in": [
            "有异议"
          ]
        }
      },
      {
        "key": "参评人数（人）",
        "label": "参评人数（人）",
        "type": "number",
        "value": "2",
        "readonly": true,
        "required": false
      },
      {
        "key": "各等级人数上限",
        "label": "各等级人数上限",
        "type": "text",
        "value": "A≤30%、B≤40%、C≥30%",
        "readonly": true,
        "required": false
      },
      {
        "key": "强制分布校验",
        "label": "强制分布校验",
        "type": "select",
        "value": "符合",
        "options": [
          "符合",
          "超比例"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "组织绩效定级依据",
        "label": "组织绩效定级依据",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟绩效结果资料",
        "full": true,
        "required": false
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
    "self": true,
    "detail": [
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "required": false
      },
      {
        "key": "职级",
        "label": "职级",
        "type": "select",
        "options": [
          "领导",
          "组长",
          "主管",
          "员工"
        ],
        "required": false
      },
      {
        "key": "考核分数",
        "label": "考核分数",
        "type": "number",
        "required": false
      },
      {
        "key": "绩效等级",
        "label": "绩效等级",
        "type": "select",
        "options": [
          "A",
          "B",
          "C",
          "D"
        ],
        "required": false
      },
      {
        "key": "等级校验",
        "label": "等级校验",
        "type": "select",
        "options": [
          "符合",
          "超比例"
        ],
        "required": false
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "text",
        "required": false
      }
    ]
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
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
        "key": "奖惩金额",
        "label": "奖惩金额",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "生效日期",
        "label": "生效日期",
        "type": "date",
        "value": "2026-10-01"
      },
      {
        "key": "依据",
        "label": "奖惩事由",
        "type": "textarea",
        "value": "安全生产表彰决定（模拟）",
        "full": true
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "textarea",
        "value": "",
        "required": false,
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟奖惩资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "月份",
        "label": "工资年月",
        "type": "month",
        "value": "2026-09"
      },
      {
        "key": "导入批次",
        "label": "发布批次",
        "type": "text",
        "value": "ERP-PAY-202609-001"
      },
      {
        "key": "发布公司",
        "label": "发布公司",
        "type": "select",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "value": "精美"
      },
      {
        "key": "模板版本",
        "label": "工资条模板",
        "type": "select",
        "value": "默认模板",
        "options": [
          "默认模板",
          "部门模板"
        ]
      },
      {
        "key": "确认状态",
        "label": "确认状态",
        "type": "select",
        "options": [
          "待确认",
          "已确认",
          "有异议"
        ],
        "value": "待确认",
        "required": false
      },
      {
        "key": "异议关联编号",
        "label": "异议关联编号",
        "type": "text",
        "value": "",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟工资条资料",
        "full": true,
        "required": false
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
    "self": true,
    "detail": [
      {
        "key": "员工编号",
        "label": "员工编号",
        "type": "text",
        "required": false
      },
      {
        "key": "姓名",
        "label": "姓名",
        "type": "text"
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "required": false
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "required": false
      },
      {
        "key": "工资年月",
        "label": "工资年月",
        "type": "month"
      },
      {
        "key": "岗位工资",
        "label": "岗位工资",
        "type": "number"
      },
      {
        "key": "保留工资",
        "label": "保留工资",
        "type": "number"
      },
      {
        "key": "月度绩效",
        "label": "月度绩效",
        "type": "number"
      },
      {
        "key": "年资补贴",
        "label": "年资补贴",
        "type": "number"
      },
      {
        "key": "技能津贴",
        "label": "技能津贴",
        "type": "number"
      },
      {
        "key": "中夜班津贴",
        "label": "中夜班津贴",
        "type": "number"
      },
      {
        "key": "交通补贴",
        "label": "交通补贴",
        "type": "number"
      },
      {
        "key": "其他补贴",
        "label": "其他补贴",
        "type": "number"
      },
      {
        "key": "加班工资",
        "label": "加班工资",
        "type": "number"
      },
      {
        "key": "缺勤",
        "label": "缺勤",
        "type": "number"
      },
      {
        "key": "应发工资",
        "label": "应发工资",
        "type": "number"
      },
      {
        "key": "养老",
        "label": "养老",
        "type": "number"
      },
      {
        "key": "医疗",
        "label": "医疗",
        "type": "number"
      },
      {
        "key": "失业",
        "label": "失业",
        "type": "number"
      },
      {
        "key": "公积金",
        "label": "公积金",
        "type": "number"
      },
      {
        "key": "年金",
        "label": "年金",
        "type": "number"
      },
      {
        "key": "住宿",
        "label": "住宿",
        "type": "number"
      },
      {
        "key": "所得税",
        "label": "所得税",
        "type": "number"
      },
      {
        "key": "会费",
        "label": "会费",
        "type": "number"
      },
      {
        "key": "补扣保险",
        "label": "补扣保险",
        "type": "number"
      },
      {
        "key": "稳岗返还",
        "label": "稳岗返还",
        "type": "number"
      },
      {
        "key": "实发工资",
        "label": "实发工资",
        "type": "number"
      }
    ]
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "原单编号",
        "label": "原工资条编号",
        "type": "text",
        "value": "HR-PAYSLIP-001"
      },
      {
        "key": "异议说明",
        "label": "异议说明",
        "type": "textarea",
        "value": "请核对加班时长",
        "full": true
      },
      {
        "key": "处理结论",
        "label": "处理结论",
        "type": "select",
        "options": [
          "需修订",
          "无需修订",
          "异议不成立"
        ],
        "value": "需修订"
      },
      {
        "key": "修订金额",
        "label": "修订金额",
        "type": "number",
        "value": "0",
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟异议资料",
        "full": true,
        "required": false
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
    "self": true,
    "detail": [
      {
        "key": "异议类型",
        "label": "异议类型",
        "type": "text"
      },
      {
        "key": "原金额",
        "label": "原金额",
        "type": "number"
      },
      {
        "key": "现金额",
        "label": "现金额",
        "type": "number"
      }
    ]
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
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
        "label": "办理月份",
        "type": "text",
        "value": "2026-09"
      },
      {
        "key": "金额",
        "label": "缴费金额",
        "type": "number",
        "value": "2000"
      },
      {
        "key": "办理说明",
        "label": "办理说明",
        "type": "textarea",
        "value": "按本月参保人员及缴费基数办理",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟社保资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "李明",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "经营发展部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
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
        "key": "发生日期",
        "label": "发生日期",
        "type": "date",
        "value": "2026-09-15"
      },
      {
        "key": "就医或事故机构",
        "label": "就医/事故机构",
        "type": "text",
        "value": "宜宾市第一人民医院"
      },
      {
        "key": "费用",
        "label": "费用金额",
        "type": "number",
        "value": "1000"
      },
      {
        "key": "申请说明",
        "label": "申请说明",
        "type": "textarea",
        "value": "按证明及费用材料申请（模拟）",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟理赔资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "计划类型",
        "label": "计划类型",
        "type": "select",
        "options": [
          "年度计划",
          "具体实施"
        ],
        "value": "年度计划"
      },
      {
        "key": "课程",
        "label": "培训课程",
        "type": "text",
        "value": "岗位安全与质量基础"
      },
      {
        "key": "培训方式",
        "label": "培训方式",
        "type": "select",
        "value": "内部培训",
        "options": [
          "内部培训",
          "外部培训",
          "线上学习"
        ]
      },
      {
        "key": "考核方式",
        "label": "考核方式",
        "type": "select",
        "options": [
          "理论+实操",
          "实操",
          "业务模拟",
          "答辩",
          "笔试",
          "在线考试"
        ],
        "value": "理论+实操"
      },
      {
        "key": "参训人数",
        "label": "参训人数",
        "type": "number",
        "value": 1
      },
      {
        "key": "培训机构",
        "label": "培训机构/讲师",
        "type": "text",
        "value": "公司内部讲师"
      },
      {
        "key": "培训学时",
        "label": "培训学时",
        "type": "number",
        "value": "8"
      },
      {
        "key": "计划月份",
        "label": "计划",
        "type": "month",
        "value": "2026-09"
      },
      {
        "key": "培训地点",
        "label": "培训地点",
        "type": "text",
        "value": "公司培训室"
      },
      {
        "key": "需求",
        "label": "培训",
        "type": "textarea",
        "value": "岗位技能提升",
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟培训资料",
        "full": true,
        "required": false
      },
      {
        "key": "年度计划",
        "label": "年度计划",
        "type": "text",
        "value": "2026年度培训计划",
        "hidden": true
      },
      {
        "key": "实施日期",
        "label": "实施日期",
        "type": "date",
        "value": "2026-10-01",
        "hidden": true
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "关联培训",
        "label": "关联培训",
        "type": "text",
        "value": "HR-TRAIN-001"
      },
      {
        "key": "组织部门",
        "label": "组织部门",
        "type": "text",
        "value": ""
      },
      {
        "key": "考试名称",
        "label": "考试名称",
        "type": "text",
        "value": "岗位安全与质量考试"
      },
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
        "key": "考试日期",
        "label": "考试日期",
        "type": "date",
        "value": "2026-09-30"
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
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "textarea",
        "value": "",
        "required": false,
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟考试成绩资料",
        "full": true,
        "required": false
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
      {
        "key": "办理类型",
        "label": "办理类型",
        "type": "select",
        "value": "新增",
        "options": [
          "新增",
          "更新",
          "电子版导出"
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
        "key": "证照编号",
        "label": "证照编号",
        "type": "text",
        "value": "CERT-2026-018"
      },
      {
        "key": "发证机构",
        "label": "发证机构",
        "type": "text",
        "value": "宜宾市应急管理局"
      },
      {
        "key": "发证日期",
        "label": "发证日期",
        "type": "date",
        "value": "2024-09-30"
      },
      {
        "key": "到期日期",
        "label": "到期日期",
        "type": "date",
        "value": "2027-09-30",
        "required": false
      },
      {
        "key": "电子版导出日期",
        "label": "电子版导出日期",
        "type": "date",
        "value": "",
        "required": false
      },
      {
        "key": "申请用途",
        "label": "申请用途",
        "type": "textarea",
        "value": "",
        "full": true,
        "required": false
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟证照资料",
        "full": true,
        "required": false
      },
      {
        "key": "借阅用途",
        "label": "借阅用途",
        "type": "textarea",
        "value": "资格核验",
        "required": false,
        "full": true,
        "hidden": true
      },
      {
        "key": "归还日期",
        "label": "归还日期",
        "type": "date",
        "value": "2026-10-15",
        "hidden": true
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
        "key": "发起人",
        "label": "发起人",
        "type": "text",
        "value": "吴欣",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起时间",
        "label": "发起时间",
        "type": "date",
        "value": "2026-09-07",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起部门",
        "label": "发起部门",
        "type": "text",
        "value": "人力资源部",
        "readonly": true,
        "required": false
      },
      {
        "key": "发起公司",
        "label": "发起公司",
        "type": "select",
        "value": "精美",
        "options": [
          "精美",
          "丽彩",
          "五彩",
          "欣兴",
          "嘉美"
        ],
        "readonly": true,
        "required": false
      },
      {
        "key": "员工姓名",
        "label": "员工姓名",
        "type": "text",
        "value": "李明",
        "required": false
      },
      {
        "key": "所属部门",
        "label": "所属部门",
        "type": "text",
        "value": "经营发展部"
      },
      {
        "key": "岗位",
        "label": "岗位",
        "type": "text",
        "value": "经营分析专员"
      },
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
        "key": "考试类别",
        "label": "考试类别",
        "type": "select",
        "value": "生产操作",
        "options": [
          "生产操作",
          "专业技术",
          "职能管理",
          "特种作业"
        ]
      },
      {
        "key": "考核方式",
        "label": "考核方式",
        "type": "select",
        "value": "理论+实操",
        "options": [
          "理论+实操",
          "实操",
          "业务模拟",
          "答辩",
          "笔试"
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
      },
      {
        "key": "备注",
        "label": "备注",
        "type": "textarea",
        "value": "",
        "required": false,
        "full": true
      },
      {
        "key": "相关附件",
        "label": "相关附件",
        "type": "attachment",
        "value": "已附模拟资格资料",
        "full": true,
        "required": false
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
