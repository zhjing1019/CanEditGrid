
export default {
  //表格类型
  fixCols: 1,
  tableHeaderHeight: 40,
  tableTdHeight: 40,
  ref: "tableEdit2",
  editTable: {
    editTableType: "del",
    rules: {
      zzsj: [{ type: "date", required: true, message: "请选择转正时间", trigger: "change" }],
      zzlb: [{ required: true, message: "请选择转正类别", trigger: "change" }],
    }
  },
  //表头数据
  headers: [
    {
      name: "zzry",
      title: "转正人员",
      width: 350,
      slot: true
    },
    {
      name: "zzsj",
      width: 200,
      title: "转正时间",
      editType: "date"
    },
    {
      name: "sfz",
      width: 200,
      title: "身份证(slot内容、自定义校验规则)",
      slot: true
    },
    {
      name: "zzlb",
      width: 200,
      title: "转正类别",
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
      name: "khqk",
      width: 200,
      title: "考核情况",
      editType: "none"
    },
    {
      name: "zzsm",
      title: "转正说明",
      width: 200,
      editType: "input"
    }
  ],
  data: [
    {
      zzry: {
        name: "王丽宣",
        sex: "男",
        bus: "北京分行",
        pos: "结算管理部",
        emp: "财务部",
        auth: "岗位/职位",
        num: "1001802"
      },
      zzsj: "",
      zzlb: "",
      khqk: "考核情况良好",
      zzsm: "这里是转正说明字段",
      sfz: ""
    },
    {
      zzry: {
        name: "王丽宣",
        sex: "男",
        bus: "北京分行",
        pos: "结算管理部",
        emp: "财务部",
        auth: "岗位/职位",
        num: "1001802"
      },
      zzsj: "",
      zzlb: "",
      khqk: "考核情况良好",
      zzsm: "这里是转正说明字段",
      sfz: ""
    }
  ]
};
