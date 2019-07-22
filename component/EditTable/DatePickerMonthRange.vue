<!--可编辑表格input输入框组件-->
<template>
  <div class="date-picker-month-range">
    <el-date-picker
      size="mini"
      style="width:100%"
      v-model="timeData"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM"
      :disabled="field && field.disabled ? field.disabled : false"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DatePickerMonthRange",
  props: {
    valueDefault: Array,
    editRow: Number,
    editCol: Number,
    field: Object,
    rowData: Object,
    propRuls: String
  },
  data() {
    return {
      timeData: this.valueDefault
    };
  },
  watch: {
    timeData(val) {
      this.$parent.$parent.data[this.editRow][this.$parent.$parent.headers[this.editCol].name] = val;
      let data = val || "";
      if (data && data.length > 1) {
        data.forEach(x => {
          let time = this.$parent.$parent.dateTimeChang(x);
          this.$parent.$parent.tableValidate(this.propRuls, time, this.editCol, this.editRow, 0);
        });
      } else {
        let empty = this.$parent.$parent.dateTimeChang(data);
        this.$parent.$parent.tableValidate(this.propRuls, empty, this.editCol, this.editRow, 0);
      }
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
