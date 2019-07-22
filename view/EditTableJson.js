export default {
  //表格类型
  //(editTableType: 'del'表示可以删除的表格，'clear'表示可以清空的表格)
  //typeIcon: 序号处hover之后icon的名字
  fixCols: 1,
  tableHeaderHeight: 40,
  tableTdHeight: 40,
  ref: "tableEdit1",
  editTable: {
    editTableType: "del",
    iconName: "icon-delete",
    rules: {
      input: [
        { required: true, message: "请输入活动名称ceshi", trigger: "change" },
        { min: 1, max: 3, message: "长度在 1 到 3 个字符", trigger: "change" }
      ],
      newPost: [
        { required: true, message: "请输入活动名称", trigger: "change" },
        { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "change" }
      ],
      time: {
        type: "date",
        required: true,
        message: "请选择日期",
        trigger: "change"
      },
      newDepartment: [{ required: true, message: "请选择部门", trigger: "change" }],
      treeSelect: [{ required: true, message: "请选择部门", trigger: "change" }],
      timeRange: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
      dateMonth: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
      dateYear: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
      dateMonthRange: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
      inputNumber: [{ type: "number", required: true, message: "请输入数字输入框", trigger: "change" }],
      inputNumber1: [{ type: "number", required: true, message: "请输入数字输入框", trigger: "change" }],
      selectPerson1: [{ type: "string", required: true, message: "请选择人", trigger: "change" }],
      select: [{ type: "string", required: true, message: "请选择code", trigger: "change" }]
    }
  },

  //表头数据
  headers: [
    {
      name: "fixedCol",
      title: "固定的列",
      width: 100,
      slot: true
    },
    {
      name: "selectPerson",
      width: 200,
      title: "测试选择组织机构组件",
      slot: true
    },
    {
      name: "selectPerson1",
      width: 200,
      editType: "selectPerson",
      disabled: false,
      multiple: false,
      title: "测试选择人组件",
      placeholder: "请选择人",
      clearable: true,
      treeType: "orgTree",
      val: ""
    },
    {
      name: "treeSelect",
      title: "选择树机构",
      width: 200,
      // slot: true,
      editType: "treeSelect",
      disabled: false,
      treeParams: {
        clickParent: true,
        filterable: false,
        "check-strictly": true,
        "default-expand-all": false,
        "expand-on-click-node": false,
        data: [
          {
            id: "1",
            name: "哎哎哎",
            children: [{ id: "3", name: "啊啊啊啊" }]
          },
          {
            id: "2",
            name: "发生的"
          }
        ],
        props: {
          children: "children",
          label: "name",
          value: "id"
        }
      },
      selectParams: {
        multiple: false,
        clearable: true,
        placeholder: "请输入内容"
      },
      list: []
    },
    {
      name: "input",
      title: "input输入框",
      width: 100,
      editType: "input",
      list: []
    },
    {
      name: "select",
      title: "select选择框",
      width: 100,
      multiple: true,
      editType: "select",
      label: "code",
      value: "id",
      list: [
        {
          code: "测试code1",
          id: "1"
        },
        {
          code: "测试code2",
          id: "2"
        },
        {
          code: "测试code3",
          id: "3"
        },
        {
          code: "测试code4",
          id: "4"
        }
      ]
    },
    {
      name: "time",
      title: "年月日时间选择框",
      width: 150,
      editType: "date",
      // generalDate: "2019-06-03",
      list: []
    },
    {
      name: "dateRange",
      title: "年月日时间范围",
      width: 300,
      editType: "dateRange",
      list: []
    },
    {
      name: "dateMonth",
      title: "年月时间选择框",
      width: 150,
      editType: "dateMonth",
      list: []
    },
    {
      name: "dateMonthRange",
      title: "年月时间选择框",
      width: 300,
      editType: "dateMonthRange",
      list: []
    },
    {
      name: "dateYear",
      title: "年度选择框",
      width: 150,
      editType: "dateYear",
      list: []
    },
    {
      name: "inputNumber",
      title: "数字输入框",
      width: 150,
      editType: "inputNumber",
      list: []
    },
    {
      name: "inputNumber1",
      title: "数字输入框",
      width: 150,
      editType: "inputNumber",
      list: []
    },

    {
      name: "text",
      title: "显示文本值",
      width: 100,
      editType: "none",
      list: []
    }
  ],
  data: [
    {
      fixedCol: "第一列",
      selectPerson: "",
      selectPerson1: {
        id: "",
        name: ""
      },
      treeSelect: "",
      input: "",
      select: [],
      newPost: "",
      time: "",
      timeRange: [],
      dateMonth: "",
      dateMonthRange: [],
      dateYear: "",
      inputNumber: "",
      inputNumber1: "",
      text: "测试测试"
    }
  ]
};
