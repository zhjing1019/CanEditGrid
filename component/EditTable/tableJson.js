export default {
  //表格类型
  //(editTableType: 'del'表示可以删除的表格，'clear'表示可以清空的表格)
  //typeIcon: 序号处hover之后icon的名字
  editTable: {
    ref: "tableEdit",
    editTableType: "del",
    iconName: "icon-delete",
    fixCols: 1,
    tableHeaderHeight: 40,
    tableTdHeight: 32,
    rules: {
      oldPost: [
        { required: true, message: "请输入活动名称ceshi", trigger: "change" },
        { min: 1, max: 3, message: "长度在 1 到 3 个字符", trigger: "change" }
      ],
      newPost: [
        { required: true, message: "请输入活动名称", trigger: "change" },
        { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "change" }
      ],
      time: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change"
        }
      ],
      newDepartment: [{ required: true, message: "请选择部门", trigger: "change" }]
    }
  },

  //表头数据
  headers: [
    {
      name: "name",
      title: "姓名",
      width: 100,
      editType: "none",
      list: []
    },
    {
      name: "oldDepartment",
      title: "原部门",
      width: 100,
      editType: "none",
      list: []
    },
    {
      name: "oldPost",
      title: "原岗位",
      width: 100,
      editType: "input",
      list: []
    },
    {
      name: "newDepartment",
      title: "新部门",
      width: 100,
      editType: "select",
      list: [
        {
          label: "测试1",
          value: "1"
        },
        {
          label: "测试2",
          value: "2"
        },
        {
          label: "测试3",
          value: "3"
        },
        {
          label: "测试4",
          value: "4"
        }
      ]
    },
    {
      name: "newPost",
      title: "新岗位",
      width: 100,
      editType: "input",
      list: []
    },
    {
      name: "time",
      title: "时间",
      width: 150,
      editType: "date",
      list: []
    },
    {
      name: "test",
      title: "测试",
      width: 100,
      editType: "none",
      list: []
    }
  ],
  data: [
    {
      key: "0",
      name: "李四",
      oldDepartment: "产品部",
      oldPost: "",
      newDepartment: "2",
      newPost: "测试岗位",
      time: "2018-10-26",
      test: "测试测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    },
    {
      key: "0",
      name: "张三",
      oldDepartment: "研发部",
      oldPost: "",
      newDepartment: "1",
      newPost: "UI",
      time: "2018-10-22",
      test: "测试"
    }
  ]
};
