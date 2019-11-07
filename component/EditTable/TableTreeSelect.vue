<template>
  <div class="table-tree-select">
    <el-tree-select
      style="widht: 100%"
      size="mini"
      :styles="styles"
      v-model="timeData"
      :treeParams="treeParams"
      :disabled="field && field.disabled ? field.disabled : false"
      :selectParams="selectParams"
      ref="treeSelect"
      @node-click="valueChange"
      placeholder=""
    />
  </div>
</template>

<script>
export default {
  name: "tableTreeSelect",
  props: {
    valueDefault: String,
    editRow: Number,
    editCol: Number,
    propRuls: String,
    treeParams: Object,
    selectParams: Object,
    field: Object,
    rowData: Object
  },
  inject: ["edit"],

  data() {
    return {
      styles: {
        width: "260px"
      },
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
        this.timeData = val;
      }
    }
  },

  methods: {
    valueChange() {}
  }
};
</script>

<style lang="scss">
.table-tree-select {
  .el-input__inner {
    height: 29px;
  }
  .el-popover__reference {
    width: 100% !important;
    .el-input--suffix {
      height: 28px !important;
      input {
        height: 28px !important;
      }
      .el-input__suffix {
        height: 28px !important;
      }
      .el-input__icon {
        line-height: 28px;
      }
    }
  }
}
</style>
