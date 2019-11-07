<script type="text/jsx">
import TableInput from "./TableInput.vue";
import InputNumber from "./InputNumber.vue";
import TableSelect from "./TableSelect.vue";
import DatePicker from "./DatePicker.vue";
import DatePickerMonth from "./DatePickerMonth.vue";
import DatePickerYear from "./DatePickerYear.vue";
import DatePickerRange from "./DatePickerRange.vue";
import DatePickerMonthRange from "./DatePickerMonthRange.vue";
import TableTreeSelect from "./TableTreeSelect.vue";
import SvgIcon from "../SvgIcon.vue";

export default {
  data() {
    return {};
  },
  inject: ["edit"],
  components: {
    TableInput,
    TableSelect,
    DatePicker,
    SvgIcon,
    TableTreeSelect,
    DatePickerRange,
    DatePickerMonth,
    DatePickerMonthRange,
    DatePickerYear,
    InputNumber,
  },
  props: {
    allRow: {
      type: Boolean,
      default: false
    },
    onlyFix: {
      type: Boolean,
      default: false
    },
    hoverRow: {
      type: Number
    }
  },
  render(h) {

    let items = [];
    items.push(this.createHead(h));
    if (this.allRow) items.push(this.createBody(h));

    return (<table class="editTable__block">{items}</table>)
  },
  mounted() {
    this.tdHeightGet();
  },
  methods: {
    tdHeightGet() {
        this.$nextTick(() => {
          if (
            this.$refs.allDataTbody &&
            this.$refs.allDataTbody.childNodes &&
            this.$refs.allDataTbody.childNodes.length > 0
          ) {
              this.$refs.allDataTbody.childNodes.forEach((x, index) => {
                if(this.allRow) this.$set(this.edit.tdHeight, index, x.offsetHeight);

                x.childNodes[0].style.height = this.edit.tdHeight[index] ? this.edit.tdHeight[index] + "px" : "";
              });
          }
        });
      },
    //创建头部tr
    createHead(h) {
      let cells = [];
      cells.push(
        h(
          "th",
          {
            style: { width: this.edit.serialWidth + "px", color: "#606266" }
          },
          ["序号"]
        )
      );
      let count = this.onlyFix && this.edit.fixCols > 0 ? this.edit.fixCols : this.edit.headers.length;
      for (let i = 0; i < count; i++) cells.push(this.createHeadCell(h, this.edit.headers[i]));
      let tr = (<tr>{cells}</tr>)
      return (<thead>{tr}</thead>)
    },
    // 判断头部是否是必填
    isRequire(fields) {
      let isRequire = false;
      if (this.edit.editTable.rules && this.edit.editTable.rules[fields.name]) {
        let rule = this.edit.editTable.rules[fields.name];
        if (rule instanceof Array) {
          rule.forEach(x => {
            if (x.required && (x.required == "true" || x.required == true)) {
              isRequire = true;
            }
          });
        } else if (rule instanceof Object) {
          if (rule.required && (rule.required == "true" || rule.required == true)) {
            isRequire = true;
          }
        } else {
          isRequire = false;
        }
      }
      return isRequire;
    },
    //创建头部th
    createHeadCell(h, fields) {
      let isRequire = this.isRequire(fields);
      let span = "";
      if (isRequire) {
        span=(<span style={{color: 'red', fontSize: '14px', marginRight: '5px'}}>*</span>)
      }
      return h(
        "th",
        {
          style: {
            width: fields.width + "px",
            height: this.edit.tableHeaderHeight + "px",
            textAlign: "left"
          }
        },
        [span, fields.title]
      );
    },
    //创建表格主体
    createBody(h) {
      let rows = this.edit.data.map((r, index) => this.createRow(h, r, index));
      return(<tbody ref="allDataTbody">{rows}</tbody>);
    },
    //创建序号
    createSerial(h, rowData, index) {
      let serial = index + 1 < 10 ? "0" + (index + 1) : index + 1;
      let detailSpan = "";
      detailSpan = h("span", {}, [serial]);
      return detailSpan;
    },
    //创建表格行 (index 为 rowIndex)
    createRow(h, rowData, index) {
      let cells = [];
      let detailSpan = this.createSerial(h, rowData, index);
      cells.push(
        h(
          "td",
          {
            style: {
              width: this.edit.serialWidth + "px",
              background: this.mouseEnterColor(index),
              textAlign: "center"
            }
          },
          [detailSpan]
        )
      );
      let count = this.onlyFix ? this.edit.fixCols : this.edit.headers.length;
      for (let i = 0; i < count; i++) {
        // i为colIndex
        let field = this.edit.headers[i];
        cells.push(this.createBodyCell(h, rowData, field, index, i));
      }
      return h(
        "tr",
        {
          on: {
            mouseenter: () => {
              this.trMouseenter(index);
            },
            mouseleave: () => {
              this.editTableLeave;
            }
          }
        },
        cells
      );
    },
    // 创建表格具体td
    createBodyCell(h, rowData, field, rowIndex, colIndex) {
      let divCell = this.createTdDiv(h, rowData, field, rowIndex, colIndex);
      return (<td
          style={{
            width: field.width + "px",
            overflow: "hidden",
            height: this.edit.tdHeight[rowIndex] + "px" ,
            minHeight: this.edit.tableTdHeight + 'px',
            background: this.mouseEnterColor(rowIndex),
            color: "#303133"
          }}
          edit-index-row={rowIndex}
          edit-index-col={colIndex}
          onClick={event => {
            if(field.editType == 'none' || field.isDrag == false) {
              return
            } else {
              this.dragDot(event, rowIndex, colIndex);
            }

          }}
          >{divCell}</td>)
    },
    // 创建主体表格td下的div
    createTdDiv(h, rowData, field, rowIndex, colIndex) {
      let self = this;
      if (field.slot && Object.keys(this.$scopedSlots).length > 0) {
        return h(
          "div",
          {
            class: {'th-div': true},
            // 作用域插槽格式
            // { name: props => VNode | Array<VNode> }
            scopedSlots: this.$scopedSlots[field.name],
            // 如果组件是其他组件的子组件，需为插槽指定名称
            slot: field.name,
            style: {
              minHight: this.edit.tableTdHeight-2 + 'px',
              height: this.edit.tdHeight[rowIndex] -2 + "px" ,
              width: '100%',
              border: this.modelData(field.name, rowIndex)
            },
            on: {
              mouseenter(e){
                let div = {
                  top: e.target.offsetTop,
                  left: e.target.offsetLeft,
                  width: e.target.offsetWidth,
                  rowIndex: rowIndex,
                  colIndex: colIndex,
                };
                self.edit.hoverDiv = div;
                self.$emit('td-mouseenter', {rowData, field, rowIndex, colIndex});
              },
              mouseLeave() {
                let div = {
                  top: 0,
                  left: 0,
                  width: 0,
                  rowIndex: -1,
                  colIndex: -1,
                };
                self.edit.hoverDiv = div;
                self.$emit('td-mouseleave', {rowData, field, rowIndex, colIndex});
              }
            }
          },
          this.$scopedSlots[field.name]({
            field: field,
            rowData: rowData,
            rowIndex: rowIndex,
            colIndex: colIndex,
          })
        );
      } else {
        let detail = this.createDetailItem(h, rowData, field, rowIndex, colIndex);
        let divCell = (<div class="th-div"
         onMouseenter={e => {
           let div = {
              top: e.target.offsetTop,
              left: e.target.offsetLeft,
              width: e.target.offsetWidth,
              rowIndex: rowIndex,
              colIndex: colIndex,
            };
            this.edit.hoverDiv = div;
            this.$emit('td-mouseenter', {rowData, field, rowIndex, colIndex});
         }}
         onMouseleave={() => {
           let div = {
              top: 0,
              left: 0,
              width: 0,
              rowIndex: -1,
              colIndex: -1,
            };
            this.edit.hoverDiv = div;
            this.$emit('td-mouseleave', {rowData, field, rowIndex, colIndex});
         }}
         style={{
              minHight: this.edit.tableTdHeight-2 + 'px',
              height: this.edit.tdHeight[rowIndex] -2 + "px",
              lineHeight: this.edit.tdHeight[rowIndex] -2 + "px",
              width: '100%',
              border: this.modelData(field.name, rowIndex)
        }}>{[detail]}</div>);
        return divCell;
      }

    },


    //获取选择人的数据
    getSelectPersonName(id) {
      const emp = this.ajaxPersonName(id);
      if (emp) {
        emp.then(res => {
          let name = res;
          return name;
        });
      } else {
        return "";
      }
    },

    //创建主体表格td下的div的具体条目
    createDetailItem(h, rowData, field, rowIndex, colIndex) {
      let detail = "";
      if (
        field.editType == "input"
      ) {
        detail = (<table-input
          onInputBlur={(editRowData, editKey, editVal, rowIndex) => {this.$emit('inputBlur', editRowData, editKey, editVal, rowIndex)}}
          valueDefault={rowData[field.name]}
          rowData={rowData}
          field={field}
          propRuls={field.name}
          editRow={rowIndex}
          editCol={colIndex}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
          style= {{width: '100%'}}
        ></table-input>);
      } else if (
        field.editType == "inputNumber"
      ) {
        detail = (<input-number
        valueDefault={Number(rowData[field.name] ? rowData[field.name] : 0)}
        propRuls={field.name}
        rowData={rowData}
        field={field}
        editRow={rowIndex}
        editCol={colIndex}
        style={{width:'100%'}}
        onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        onInputNumberBlur={(editRowData, editKey, editVal) => {this.$emit('inputNumberBlur', editRowData, editKey, editVal)}}
        ></input-number>)
      }else if (
        field.editType == "treeSelect"
      ) {
        detail = (<table-tree-select
          valueDefault={rowData[field.name]}
          treeParams={field.treeParams}
          disabled={field.disabled}
          selectParams={field.selectParams}
          propRuls={field.name}
          rowData={rowData}
          field={field}
          editRow={rowIndex}
          editCol={colIndex}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></table-tree-select>)
      } else if (
        field.editType == "select"
      ) {
        detail = (<table-select
          valueDefault={rowData[field.name]}
          selectOption={field.list}
          propRuls={field.name}
          editRow={rowIndex}
          editCol={colIndex}
          label={field.label ? field.label : ""}
          value={field.value ? field.value : (field.multiple ? [] : "")}
          rowData={rowData}
          field={field}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></table-select>)

      } else if (
        field.editType === "date"
      ) {
        detail = (<date-picker
          selectOption = {field.list}
          propRuls = {field.name}
          editRow = {rowIndex}
          editCol = {colIndex}
          valueDefault = {rowData[field.name]}
          generalDate = {field.pickerOptions && this.$parent.generalDates ? this.$parent.generalDates[rowIndex] : null}
          rowData={rowData}
          field={field}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></date-picker>)


      } else if (
        field.editType === "dateMonth"
      ) {
        detail = (<date-picker-month
          valueDefault={rowData[field.name]}
          selectOption={field.list}
          propRuls={field.name}
          editRow={rowIndex}
          editCol={colIndex}
          rowData={rowData}
          field={field}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></date-picker-month>)
      } else if (
        field.editType === "dateRange"
      ) {
        detail = (<date-picker-range
          valueDefault={rowData[field.name] || []}
          selectOption={field.list}
          propRuls={field.name}
          editRow={rowIndex}
          editCol={colIndex}
          rowData={rowData}
          field={field}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></date-picker-range>)
      } else if (
        field.editType === "dateMonthRange"
      ) {
        detail = (<date-picker-month-range
          valueDefault={rowData[field.name] || []}
          selectOption={field.list}
          propRuls={field.name}
          editRow={rowIndex}
          editCol={colIndex}
          rowData={rowData}
          field={field}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></date-picker-month-range>)

      } else if (
        field.editType === "dateYear"
      ) {
        detail = (<date-picker-year
          valueDefault={rowData[field.name]}
          selectOption={field.list}
          propRuls={field.name}
          editRow={rowIndex}
          editCol={colIndex}
          rowData={rowData}
          field={field}
          style={{width: "100%"}}
          onData-change={(val, editRow, editCol, rowData, field, ruls) => {
            this.$emit("data-change", val, editRow, editCol, rowData,field, ruls );
          }}
        ></date-picker-year>)

      } else {
        detail = (<span>{[rowData[field.name]]}</span>)
      }
      return detail;
    },
    dateTransition(data) {
      let dateStr = data ? data : [];
      let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      let Arr = dateStr.match ? dateStr.match(reg) : [];
      return Arr;
    },
    editTableLeave() {
      this.edit.hoverEnterTr = -1;
    },
    //鼠标进入tr
    trMouseenter(index) {
      this.edit.hoverEnterTr = index;
    },

    /*
     * 表格点击事件，出现可拖动的小点
     * */
    dragDot(e, rowIndex, colIndex) {
      this.edit.currentRowIndex = -1;
      this.edit.currentColIndex = -1;
      let self = this;
      this.edit.currentRowIndex = rowIndex;
      this.edit.currentColIndex = colIndex;
      if (colIndex >= self.edit.fixCols) {
        //获得父级td元素
        let tdTarget = "";
        if (e.target.nodeName == "TD") {
          tdTarget = e.target;
        } else {
          if (self.edit.getParentTag(e.target)) {
            tdTarget = self.edit.getParentTag(e.target);
          } else {
            return;
          }
        }
        this.edit.dragSelect = 1;
        // 目标元素的宽高
        this.edit.drag.width = tdTarget.offsetWidth;
        this.edit.drag.height = tdTarget.offsetHeight;

        this.edit.drag.cirLeft = this.edit.drag.width - 4;
        this.edit.drag.cirTop = this.edit.drag.height - 4;
        //目标元素距离左侧和上部的位置
        this.edit.drag.clientX = tdTarget.offsetLeft;
        this.edit.drag.clientY = tdTarget.offsetTop;
        //目标元素初始化的距离左侧和顶部的位置
        this.edit.initX = tdTarget.offsetLeft;
        this.edit.initY = tdTarget.offsetTop;
        //当前目标元素
        this.edit.currentSelect = e;
      } else {
        return;
      }
    },
    //list表格中获取值
    getListValue(list, value, field) {
      let label = "";
      list.forEach(x => {
        if (x[field.value] == value) {
          label = x[field.label];
        }
      });
      return label;
    },
    //鼠标进入tr颜色的变换
    mouseEnterColor(index) {
      let self = this;
      let color = "";
      if (index == self.edit.hoverEnterTr) {
        color = "#F2F6FC";
      } else {
        index % 2 != 0 && self.edit.isZebra ? (color = "#FAFBFC") : (color = "#fff");
      }
      return color;
    },
    //动态校验表格
    modelData(field, editRow) {
      let self = this;
      let border = "1px solid transparent";
      self.edit.errArr.forEach(x => {
        if (x.field == field && x.editRow == editRow && x.errors) {
          border = "1px solid red";
        }
      });
      return border;
    }
  }
};
</script>
<style lang="scss">
.error-text {
  position: absolute;
  top: -26px;
}
.th-div {
  background: "transparent";
  box-sizing: "border-box";
  width: -webkit-calc(100% - 2px);
  width: -moz-calc(100% - 2px);
  width: calc(100% - 2px);
  text-align: left;
  margin-top: 1px;
  min-height: 40px;
  position: relative;
}
</style>
