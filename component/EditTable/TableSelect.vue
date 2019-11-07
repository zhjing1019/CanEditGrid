<template>
  <div>
    <el-select
      :disabled="field && field.disabled ? field.disabled : false"
      :multiple="field && field.multiple ? field.multiple : false"
      collapse-tags
      size="mini"
      ref="table-edit-select"
      v-model="timeData"
      @click.native="selectClick($event)"
    >
      <el-option v-for="item in selectOption" :key="item[value]" :label="item[label]" :value="item[value]"> </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "tableSelect",
  inject: ["edit"],
  props: {
    valueDefault: [String, Array],
    editRow: Number,
    editCol: Number,
    field: Object,
    rowData: Object,
    selectOption: Array,
    propRuls: String,
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      timeData: this.valueDefault
    };
  },
  watch: {
    timeData(val) {
      this.edit.data[this.editRow][this.edit.headers[this.editCol].name] = val;
      let data = val;
      this.edit.tableValidate(this.propRuls, data, this.editCol, this.editRow, 0);
      this.$emit("data-change", val, this.editRow, this.editCol, this.rowData, this.field, this.propRuls);
    },
    valueDefault: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!this.field.multiple && this.field.multiple !== true) {
          this.timeData = val;
        }
      }
    }
  },

  methods: {
    selectClick(e) {
      this.$parent.dragDot(e, this.editRow, this.editCol);
    }
  }
};
</script>

<style scoped></style>
