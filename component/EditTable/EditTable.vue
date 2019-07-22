<template>
  <div class="editTableWrapper" ref="editTableWrapper">
    <div v-if="errDetail && errDetail.message" class="err-div" :style="errDivStyle">{{ errDetail.message }}</div>
    <div class="editTable" @wheel="wheel" :style="isAdd ? {} : { height: '100%' }">
      <drag-span
        v-if="currentColIndex != -1 && currentRowIndex != -1"
        :drag="drag"
        ref="dragSpan"
        :dragSpanShow="dragSpanShow"
        :style="dragSpanStyle"
        @data-change="dataChange"
        @editDragEnd="editDragEnd"
      ></drag-span>
      <!-- 主体表格 -->
      <edit-sub
        class="activity__table"
        ref="editGridSub"
        :allRow="true"
        :style="allStyle"
        @inputNumberBlur="inputNumberBlur"
        @inputBlur="inputBlur"
        @data-change="dataChange"
      >
        <template v-for="(item, index) in headers" :slot="item.name" slot-scope="field">
          <div :key="index">
            <slot :name="field.field.name" :field="field"></slot>
          </div>
        </template>
      </edit-sub>
      <!-- 固定表头表格 东北方向 -->
      <edit-sub class="fix north__east" :allRow="false" v-if="scrollY > 0" :style="northEastStyle"></edit-sub>
      <!-- 固定列头表格 西南方向 -->
      <edit-sub
        class="fix south__west"
        :onlyFix="true"
        :allRow="true"
        v-if="scrollX > 0 && fixCols > 0"
        :style="southWestStyle"
      >
        <template v-for="(item, index) in headers" :slot="item.name" slot-scope="field">
          <div :key="index">
            <slot :name="field.field.name" :field="field"></slot>
          </div>
        </template>
      </edit-sub>
      <!-- 固定列头部表格 西北方向 -->
      <edit-sub
        class="fix north__west"
        :onlyFix="true"
        :allRow="false"
        v-if="(scrollX > 0 || scrollY > 0) && allTableWidth < actualWidth && fixCols > 0"
        :style="northWestStyle"
      ></edit-sub>
      <scroll-bar
        v-if="vBarSize > 0 && vBarSize < 100"
        :vertical="true"
        :size="vBarSize"
        :move="vMove"
        @scroll="vScroll"
      />
      <scroll-bar v-if="hBarSize > 0 && hBarSize < 100" :size="hBarSize" :move="hMove" @scroll="hScroll" />
    </div>
    <div class="edit-table-add" v-if="isAdd" @click="editTableAdd">
      <svg-icon name="icon-plus" :width="12" :height="12"></svg-icon>
      添加
    </div>
  </div>
</template>
<script>

import SvgIcon from "../SvgIcon.vue";
import ScrollBar from "./../ScrollBar.vue";
import EditSub from "./EditSub.vue";
import scrollable from "./../scrollable.js";
import DragSpan from "./DragSpan.vue";
import AsyncValidator from "async-validator";

export default {
  name: "EditTable",
  mixins: [scrollable],
  components: { ScrollBar, EditSub, DragSpan, SvgIcon },
  data() {
    return {
      //初始化数据
      initTable: [],
      //错误所存储的数组
      errArr: [],
      //错误信息
      errDetail: "",
      startRow: -1,
      startCol: -1,
      endRow: -1,

      //当前选中的元素
      currentSelect: "",
      //当前点击的元素
      currentRowIndex: -1,
      currentColIndex: -1,

      //拖拽的位置信息
      drag: {
        clientX: 0,
        clientY: 0,
        width: 0,
        height: 0,
        maxWidth: 0,
        cirLeft: 0,
        cirTop: 0
      },
      dragSpanShow: false,
      //外框的高度
      allTableHeight: 0,
      //外框的宽度
      allTableWidth: 0,
      dragSelect: 1,
      //是否是可编辑状态
      isEdit: true,
      //记录点击的次数
      editClickCount: 0,
      //进入当前tr的行数
      hoverEnterTr: -1,
      serialWidth: 52,
      scrollX: 0,
      scrollY: 0,
      clientWidth: 0,
      clientHeight: 0,
      tableTdHeight: 40,
      tdHeight: new Array(this.data.length),
      realHeight: 0,
      //选择的格子
      selectArr: [this.currentRowIndex],
      tableClientX: 0,
      tableClientY: 0,
      hoverDiv: {
        top: 0,
        left: 0,
        width: 0,
        rowIndex: -1,
        colIndex: -1
      },
      isFirst: 0,
      isVal: false
    };
  },
  provide() {
    return {
      edit: this
    };
  },
  computed: {
    errDivStyle() {
      return {
        display: this.hoverDiv.rowIndex == -1 && this.hoverDiv.colIndex == -1 ? "none" : "block",
        width: this.hoverDiv.width + "px",
        top: this.hoverDiv.top - 20 - this.scrollY + "px",
        left: this.hoverDiv.left - this.scrollX + "px"
      };
    },
    dragSpanStyle() {
      return {
        left: this.drag.clientX - this.scrollX + "px",
        top: this.drag.clientY - this.scrollY + "px",
        width:
          this.currentRowIndex && this.currentRowIndex != -1
            ? this.headers[this.currentRowIndex].width + "px"
            : 0 + "px",
        height:
          this.currentColIndex && this.currentColIndex != -1 ? this.tdHeight[this.currentColIndex] + "px" : 0 + "px",
        zIndex: 100
      };
    },
    actualWidth() {
      let result = 0;
      result += this.serialWidth;
      this.headers.forEach(header => {
        result += header.width;
      });
      return result;
    },

    actualHeight() {
      this.heightAdaption();
      let height = this.realHeight;
      return height;
    },
    fixColWidth() {
      let result = 0;
      result += this.serialWidth;
      for (let i = 0; i < this.fixCols; i++) result += this.headers[i].width;
      return result;
    },
    //整体表格样式
    allStyle() {
      return {
        top: -this.scrollY + "px",
        left: -this.scrollX + "px",
        width: this.actualWidth + "px",
        minWidth: "100%"
      };
    },
    northWestStyle() {
      return {
        width: this.fixColWidth + "px",
        height: this.tableHeaderHeight + "px"
      };
    },

    southWestStyle() {
      return { top: -this.scrollY + "px", width: this.fixColWidth + "px", left: "0px" };
    },
    northEastStyle() {
      return {
        left: -this.scrollX + "px",
        width: this.actualWidth + "px"
      };
    }
  },
  props: {
    isHasData: {
      type: Number,
      default: 0
    },
    isEditTable: {
      type: Boolean,
      default: true
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    fixCols: {
      type: Number,
      default: 0
    },
    tableHeaderHeight: {
      type: Number,
      default: 40
    },
    editTable: {
      type: Object,
      required: true
    },
    isZebra: {
      type: Boolean,
      default: true
    },
    generalDates: {
      type: Array,
      default: null
    }
  },
  watch: {
    hoverDiv: {
      deep: true,
      immediate: true,
      handler(val) {
        this.isShowErr(val);
      }
    },
    // currentColIndex: {
    //   immediate: true,
    //   deep: true,
    //   handler: function(val) {
    //     console.log("currentColIndex值发生改变");
    //     console.log(val);
    //   }
    // },
    currentRowIndex: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.selectArr = [val];
      }
    },
    tdHeight: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.$nextTick(() => {
          let realHeight = 0;
          val.forEach(x => {
            realHeight += x;
          });
          realHeight += this.tableHeaderHeight + 10;
          this.realHeight = realHeight;
        });
      }
    },
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        this.data = val;
        if (val && this.isFirst == 0) {
          this.initTable = JSON.parse(JSON.stringify(val));
          this.isFirst++;
        }
        this.tdHeight = new Array(this.data.length);
        this.$nextTick(() => {
          this.$refs.editGridSub.tdHeightGet();
          this.tableClientY = this.$refs.editTableWrapper.offsetTop;
          this.tableClientX = this.$refs.editTableWrapper.offsetLeft;
        });
        this.$emit("updata:data", val);
        this.$emit("change", val);
      }
    },
    errArr: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.errArr = val;
      }
    },
    errDetail: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.errDetail = val;
      }
    }
  },
  mounted() {
    let self = this;
    this.heightAdaption();
    window.onresize = () => {
      if (self.currentSelect) {
        let parentTarget = "";
        if (self.currentSelect.target.nodeName == "TD") {
          parentTarget = self.currentSelect.target;
        } else {
          parentTarget = self.getParentTag(self.currentSelect.target);
        }
        self.drag.width = parentTarget.offsetWidth;
        self.drag.cirLeft = self.drag.width - 4;
        self.drag.cirTop = self.drag.height - 4;
        self.drag.clientX = parentTarget.offsetLeft;
        self.drag.clientY = parentTarget.offsetTop;
      }
      this.heightAdaption();
    };
    if (this.isHasData > 0) {
      for (let i = 0; i < this.isHasData; i++) {
        this.editTableAdd();
      }
    }
  },
  methods: {
    editDragEnd(currentColIndex, selectArr, name, value) {
      this.$emit("editDragEnd", currentColIndex, selectArr, name, value);
    },
    dataChange(val, editRow, editCol, rowData, field, ruls) {
      this.$emit("data-change", val, editRow, editCol, rowData, field, ruls);
    },
    dotClick(e, rowIndex, colIndex) {
      this.$refs.editGridSub.dragDot(event, rowIndex, colIndex);
    },
    isShowErr(val) {
      let detail = {};
      this.errArr.forEach(x => {
        if (x.editRow == val.rowIndex && x.editCol == val.colIndex) {
          detail = x.errors[0] ? x.errors[0] : {};
        }
      });
      this.errDetail = detail;
    },
    inputNumberBlur(editRowData, editKey, editVal) {
      this.$emit("inputNumberBlur", editRowData, editKey, editVal);
    },
    inputBlur(editRowData, editKey, editVal, rowIndex) {
      this.$emit("inputBlur", editRowData, editKey, editVal, rowIndex);
    },
    heightAdaption() {
      this.$nextTick(() => {
        this.allTableHeight =
          this.$refs.editTableWrapper && this.$refs.editTableWrapper.offsetHeight
            ? this.$refs.editTableWrapper.offsetHeight
            : 0;
        this.allTableWidth =
          this.$refs.editTableWrapper && this.$refs.editTableWrapper.offsetWidth
            ? this.$refs.editTableWrapper.offsetWidth
            : 0;
      });
    },
    editTableAdd() {
      // let sourceData = this.data;
      let newData = {};
      this.headers.forEach(x => {
        newData[x.name] = "";
      });
      this.data.push(newData);
    },
    getParentTag(startTag) {
      var self = this;
      // 传入标签是否是DOM对象
      if (!(startTag instanceof HTMLElement)) return console.error("receive only HTMLElement");
      // 父级标签是否是body,是着停止返回集合,反之继续
      if ("BODY" !== startTag.parentElement.nodeName) {
        if (startTag.parentElement.nodeName == "TD") {
          return startTag.parentElement;
        } else {
          if (startTag.parentElement.parentElement) {
            return self.getParentTag(startTag.parentElement);
          } else {
            return false;
          }
        }
        // 再上一层寻找
      }
    },
    /*
     * 表格校验
     * value: 传入的值
     * field: 传入的字段名，
     * titleIndex: 字段所对应的index
     * type: 表格校验的类型，0：校验单个输入框。 1：校验整个输入框
     * */
    tableValidate(field, value, editCol, editRow, type) {
      let self = this;
      let descriptor = {};
      // 根据校验规则构造一个 validator
      let validator = "";
      let data = {};
      let newArr = [...self.errArr];
      self.errArr.forEach((x, index) => {
        if (x.editCol == editCol && x.editRow == editRow && x.field == field) {
          newArr.splice(index, 1);
        }
      });
      self.errArr = [...newArr];
      if (type == 0) {
        if (self.editTable.rules[field]) {
          //校验单个输入框
          data[field] = value;
          descriptor[field] = self.editTable.rules[field];
          validator = new AsyncValidator(descriptor);
          validator.validate(data, (errors, fields) => {
            if (errors) {
              let title = self.headers[editCol].title;
              self.errDetail = title + fields[field][0].message;
              let errArr = {
                editCol: editCol,
                editRow: editRow,
                field: field,
                title: title,
                value: value,
                errors: errors
              };
              self.errArr.push(errArr);
            } else {
              self.errDetail = "";
            }
          });
        } else {
          return;
        }
      }
    },
    //时间转换函数
    dateTimeChang(data) {
      let timestamp = "";
      if (data && data !== "" && data != null && data !== undefined) {
        if (data.substring) {
          data = data.substring(0, 19);
          data = data.replace(/-/g, "/");
          timestamp = new Date(data).getTime();
        } else {
          return;
        }
      } else {
        data = "";
      }
      return timestamp;
    },
    //提交表单
    // submitForm() {
    //   let self = this;
    //   self.isVal = false;
    //   this.open();

    //   // console.log(self.tableAllVal());
    //   // if (self.tableAllVal()) {
    //   //   return true;
    //   // } else {
    //   //   console.log("可编辑表格没有填写完毕");
    //   //   return false;
    //   // }
    // },
    clearAll() {
      let self = this;
      let type = [];
      self.headers.forEach(header => {
        if (header.editType !== "none") {
          type.push(header.name);
        }
      });
      self.data.forEach((y, index) => {
        type.forEach(x => {
          self.data[index][x] = "";
        });
      });
    },
    resetAll() {
      // self.initTable.forEach((x, index) => {
      //   self.$set(self.data, index, x);
      // });
      this.$emit("update:data", this.initTable);
    },
    isDataChange() {
      //判断是否有某一行数据没有发生变化或者某一行数据没有任何数据
      let self = this;
      let newData = [];
      self.data.forEach((x, index) => {
        if (typeof x === "object") {
          let count = 0;
          let arr = [];
          Object.keys(x).forEach(function(key) {
            arr.push(key);
            if (x[key] == "" || x[key] == undefined || x[key] == null) {
              count++;
            }
          });
          if (count == arr.length) newData.push(index);
        } else if (x == "" || x == undefined || x == null) {
          newData.push(index);
        }
      });
      return newData;
    },
    submitForm() {
      let newData = this.isDataChange();
      if (newData.length > 0) {
        let data = this.comfirVal(newData);
        return data;
        //todo: 这里暂时不要删除，后续功能可能会添加
        // let data = newData.map(x => {
        //   return x + 1;
        // });
        // data = data.join(",");
        // this.$confirm(`第${data}行未做任何操作, 是否继续?`, "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        //     let data = this.comfirVal(newData);
        //     isVal = data;
        //     return data;
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type: "info",
        //       message: "已取消提交"
        //     });
        //     isVal = false;
        //     // this.$emit('submitEdit', isVal, )
        //     return false;
        //   });
      } else {
        let data = this.comfirVal([]);
        return data;
      }
    },

    /*
     * 表格整个进行表格校验
     * value: 传入的值
     * field: 传入的字段名，
     * titleIndex: 字段所对应的index
     * type: 表格校验的类型，0：校验单个输入框。 1：校验整个输入框
     * */
    tableAllVal() {
      this.submitForm();
    },
    comfirVal(newData) {
      let self = this;
      let value = "";
      self.errArr = [];
      // self.data.forEach((row, index) => {
      for (let index = 0; index < self.data.length; index++) {
        let row = self.data[index];
        let count = 0;
        newData.forEach(x => {
          if (x == index) count++;
        });
        if (count > 0) {
          break;
        } else {
          self.headers.forEach((header, colIndex) => {
            if (header.editType == "date" || header.editType == "dateMonth" || header.editType == "dateYear") {
              value = self.dateTimeChang(row[header.name]);
              self.tableValidate(header.name, value, colIndex, index, 0);
            } else if (header.editType == "dateMonthRange" || header.editType == "dateRange") {
              if (row[header.name] && row[header.name] !== null && row[header.name].length > 1) {
                row[header.name].forEach(x => {
                  value = self.dateTimeChang(x);
                  self.tableValidate(header.name, value, colIndex, index, 0);
                });
              } else {
                value = "";
                self.tableValidate(header.name, value, colIndex, index, 0);
              }
            } else if (header.editType == "selectPerson") {
              value = row[header.name] ? row[header.name].id : "";
              self.tableValidate(header.name, value, colIndex, index, 0);
            } else {
              value = row[header.name];
              self.tableValidate(header.name, value, colIndex, index, 0);
            }
          });
          // });
        }
      }
      if (self.errArr.length > 0) {
        self.errDetail = self.errArr[0].errors[0].message;
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="scss">
.editTableWrapper {
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .err-div {
    position: absolute;
    top: 10px;
    height: 20px !important;
    line-height: 20px !important;
    background: rgba(245, 108, 108, 0.1);
    border: 1px solid rgba(245, 108, 108, 0.4);
    font-size: 12px;
    color: #f56c6c;
    z-index: 1000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  table {
    table-layout: fixed;
  }
}

.editTable {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: -webkit-calc(100% - 50px);
  height: -moz-calc(100% - 50px);
  height: calc(100% - 50px);
  border: 1px solid #dcdfe6;
  border-top: 0;
  background: #fff;
  .th-div {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    div {
      height: 100%;
      .el-input {
        height: 100%;
        width: 100%;
      }
      .el-select {
        width: 100%;
      }
    }
    .el-input__inner {
      height: 100%;
      line-height: 100%;
      border: 0;
      outline: 0;
      background: transparent;
    }
    .el-range-separator {
      visibility: hidden;
    }
    .el-range-input {
      background: transparent;
    }
  }
}
.edit-table-add {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border: 1px dashed #dcdfe6;
  color: #303133;
  margin-top: 10px;
  cursor: pointer;
  svg {
    fill: #333333;
    vertical-align: middle;
    margin-right: 6px;
  }
}
.north__west {
  left: 0px;
  top: 0px;
  background: #f0f2f5;
  font-size: 14px;
  color: #606266;
  z-index: 113;
}
.south__west {
  background: #f0f2f5;
  z-index: 111;
  left: 0px;
  th {
    background: #f0f2f5;
    font-size: 14px;
    color: #606266;
    z-index: 112;
  }
  td {
    font-size: 12px;
    color: #606266;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // font-size: 11px;
    color: #6a6a6a;
    svg {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
}
.north__east {
  top: 0px;
  min-width: 100%;
  background: #f0f2f5;
  z-index: 110;
  font-size: 14px;
  color: #606266;
  th {
    background: #f0f2f5;
    font-size: 14px;
    color: #606266;
  }
}
.activity__table {
  min-width: 100%;
  th {
    background: #f0f2f5;
    font-size: 14px;
    color: #606266;
  }
  td {
    font-size: 12px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // font-size: 11px;
    color: #6a6a6a;
  }
}

.editTable__block {
  user-select: none;
  position: absolute;
  border-collapse: collapse;
  padding: 0;

  & th,
  td {
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    font-size: 11px;
    color: #6a6a6a;
  }
}
.editTableWrapper {
  .el-input--small {
    .el-input__inner {
      border-color: transparent;
      background: transparent;
      font-size: 12px;
      color: #606266;
      outline: 0;
    }
  }
}

// .editTableWrapper {
//   .el-input--small {
//     .el-input__inner {
//       height: 100%;
//       line-height: 100%;
//     }
//   }
// }
.icon-ser {
  cursor: pointer;
}
.editTableWrapper .editTable .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
.editTableWrapper .el-form-item--small .el-form-item__error {
  z-index: 100;
}
</style>
