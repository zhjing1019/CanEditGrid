##   启动
1、使用此组件
`npm install can-edit-table` 
2、启动项目
`npm install` 
`vue serve`  
##   项目概览
![图片名称](https://github.com/zhjing1019/CanEditGrid/blob/master/img/editGif.gif)  
基于vue和element的可拖拽赋值的可编辑表格，支持表格实时校验，联动校验。
![图片名称](https://github.com/zhjing1019/CanEditGrid/blob/master/img/canEditGrid%402x.png)  
支持input、datepicker、select、selctTree等等。可以自定义td的内容，支持slot插槽。

![图片名称](https://github.com/zhjing1019/CanEditGrid/blob/master/img/canEdit2.png)

![图片名称](https://github.com/zhjing1019/CanEditGrid/blob/master/img/canedit3.png)
支持拖拽赋值，类似于excel的拖拽赋值功能

![图片名称](https://github.com/zhjing1019/CanEditGrid/blob/master/img/canEdit4.png)
支持表格的实时校验
##   组件的使用
###1、组件
```<edit-table
      ref="empTable1"
      :headers="empEditData.headers"
      :data.sync="empEditData.data"
      @change="change"
      :isAdd="true"
      :fixCols="empEditData.fixCols"
      :tableHeaderHeight="empEditData.tableHeaderHeight"
      :tableTdHeight="empEditData.tableTdHeight"
      :editTable="empEditData.editTable"
      @data-change="dataChange"
      @editDragEnd="editDragEnd"
      style="height: 400px; width: 100%"
    >
</edit-table>```
###2、表头的数据
```[
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
  ]``` 
###4、data数据 
```data: [
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
  ]``` 
###5、校验规则 
```
editTable: {
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
  }
  ```
###6、表头配置 
1、width, 表示此列的宽度 
2、name，表示此列的id
3、title, 表示此列的字段名 
4、slot, 表示此列是否自定义 
5、editType, 表示此列的编辑类型（ 
    1、editType = "treeSelect" 选择机构树 
    ```{
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
    },``` 
    2、editType: "input", input输入框 
    3、editType: "select", select选择框 
    ```{
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
    },``` 
    4、editType: "date",年月日时间选择框 
    5、editType: "dateRange",年月日时间范围 
    6、editType: "none",显示文本值 
）






