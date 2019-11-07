<!--可编辑表格input输入框组件-->
<template>
  <div>
    <el-date-picker
      size="mini"
      style="width:100%"
      v-model="timeData"
      type="date"
      format="yyyy-MM-dd"
      :disabled="field && field.disabled ? field.disabled : false"
      value-format="yyyy-MM-dd"
      :picker-options="dateValue"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "datePicker",
  props: {
    valueDefault: String,
    editRow: Number,
    editCol: Number,
    field: Object,
    rowData: Object,
    propRuls: String,
    generalDate: {
      type: String,
      default: null
    }
  },
  inject: ["edit"],
  data() {
    return {
      timeData: this.valueDefault,
      dateValue: {
        disabledDate: this.disabledDate
      }
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
  },
  methods: {
    disabledDate(time) {
      if (time && this.generalDate) {
        return time.getTime() < new Date(this.generalDate).getTime() - 8.64e7;
      }
    }
  }
};
</script>

<style scoped></style>
