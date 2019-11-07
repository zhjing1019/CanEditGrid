<!--可编辑表格input输入框组件-->
<template>
  <div>
    <el-date-picker
      size="mini"
      style="width:100%"
      v-model="timeData"
      type="month"
      format="yyyy-MM"
      :disabled="field && field.disabled ? field.disabled : false"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DatePickerMonth",
  props: {
    valueDefault: String,
    editRow: Number,
    editCol: Number,
    field: Object,
    rowData: Object,
    propRuls: String
  },
  inject: ["edit"],
  data() {
    return {
      timeData: this.valueDefault
    };
  },
  watch: {
    timeData(val) {
      this.edit.data[this.editRow][this.edit.headers[this.editCol].name] = val;
      let data = val;
      data = this.edit.dateTimeChang(data);
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
  }
};
</script>

<style scoped></style>
