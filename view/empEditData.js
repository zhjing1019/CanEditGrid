
export default {
  //表格类型
  fixCols: 1,
  tableHeaderHeight: 40,
  tableTdHeight: 40,
  ref: "tableEdit2",
  editTable: {
    editTableType: "del",
    rules: {
      zzsj: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
      zzlb: [{ required: true, message: "请选择类别", trigger: "change" }],
    }
  },
  //表头数据
  headers: [
    {
      name: "zzry",
      title: "测试1",
      width: 350,
      slot: true
    },
    {
      name: "zzsj",
      width: 200,
      title: "测试时间",
      editType: "date",
      pickerOptions: true,
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
      title: "测试类别",
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
      title: "测试（只展示数据）",
      editType: "none"
    },
    {
      name: "zzsm",
      title: "测试三",
      width: 200,
      editType: "input"
    }
  ],
  data: [
    {
      zzry: {
        name: "测试",
        sex: "男",
        bus: "测试部门",
        pos: "测试",
        emp: "测试",
        auth: "测试",
        num: "测试"
      },
      zzsj: "",
      zzlb: "",
      khqk: "测试",
      zzsm: "测试",
      sfz: ""
    },
    {
      zzry: {
        name: "测试",
        sex: "测试",
        bus: "测试",
        pos: "测试",
        emp: "测试",
        auth: "测试",
        num: "测试"
      },
      zzsj: "",
      zzlb: "",
      khqk: "测试",
      zzsm: "测试",
      sfz: ""
    }
  ]
};
