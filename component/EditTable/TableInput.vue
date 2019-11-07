<!--可编辑表格input输入框组件-->
<template>
  <div>
    <el-input
      size="mini"
      :style="tableInputStyle"
      v-model="timeData"
      :autofocus="true"
      @blur="inputBlur"
      @focus="focus"
      :disabled="field && field.disabled ? field.disabled : false"
      clearable
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "tableInput",
  props: {
    valueDefault: String,
    editRow: Number,
    editCol: Number,
    field: Object,
    rowData: Object,
    propRuls: String
  },
  inject: ["edit"],
  computed: {
    tableInputStyle() {
      return {
        height: this.$parent.tableTdHeight - 6 + "px"
      };
    }
  },
  data() {
    return {
      timeData: this.valueDefault
    };
  },
  watch: {
    timeData(val) {
      // this.$parent.$parent.data[this.editRow][this.$parent.$parent.headers[this.editCol].name] = val;
      // let data = val;
      // this.$parent.$parent.tableValidate(this.propRuls, data, this.editCol, this.editRow, 0);
      // this.$emit("data-change", val, this.editRow, this.editCol, this.rowData, this.field, this.propRuls);
      this.edit.data[this.editRow][this.edit.headers[this.editCol].name] = val;
      let data = val;
      this.edit.tableValidate(this.propRuls, data, this.editCol, this.editRow, 0);
      this.$emit("data-change", val, this.editRow, this.editCol, this.rowData, this.field, this.propRuls);
    },
    valueDefault: {
      deep: true,
      immediate: true,
      handler(val) {
        this.timeData = val;
      }
    }
  },
  methods: {
    inputBlur() {
      this.$emit(
        "inputBlur",
        this.edit.data[this.editRow],
        this.edit.headers[this.editCol].name,
        this.timeData,
        this.editRow
      );
    },
    focus() {
      this.edit.dragSpanShow = true;
    }
  }
};
</script>

<style scoped></style>
