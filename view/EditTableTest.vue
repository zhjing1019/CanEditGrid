<template>
  <div class="edit-table-test">
    <h3>可编辑表格</h3>
    <edit-table
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
      <template slot="zzry" slot-scope="field" class="fl-td">
        <div class="zzry-detail">
          <div class="zzry-p">
            <p class="zzry-first-p">
              {{ `${field.field.rowData.zzry.name || 
              ''} (${field.field.rowData.zzry.num || 
              ''}) ${field.field.rowData.zzry.sex || 
              ''}` }}
            </p>
            <p>
              {{
                `${field.field.rowData.zzry.bus || 
              ''}_${field.field.rowData.zzry.emp || 
              ''}_${field.field.rowData.zzry.pos}_${
                  field.field.rowData.zzry.auth || 
              ''
                }`
              }}
            </p>
          </div>
        </div>
      </template>
      <template slot="sfz" slot-scope="field" class="fl-td">
        <el-input
          v-model="field.field.rowData.sfz"
          @change="
            sfzChange(field.field.field.name, field.field.rowData.sfz, field.field.colIndex, field.field.rowIndex)
          "
        ></el-input>
      </template>
    </edit-table>
    <br />
    <el-row>
      <el-button type="primary" @click="getValue(empEditData.data)">获取表格数据</el-button>
      <el-button type="success" @click="submit('empTable1')">提交表单</el-button>
      <el-button type="info" @click="clearTable('empTable1')">清空可编辑表格的值</el-button>
      <el-button type="info" @click="resetTable('empTable1')">重置编辑表格的值</el-button>
    </el-row>
    <br />
    <h3>可编辑表格</h3>
    <edit-table
      ref="editTable1"
      :headers="data1"
      :data.sync="data2"
      @change="change"
      :isAdd="false"
      :fixCols="editTableJson.fixCols"
      :tableHeaderHeight="editTableJson.tableHeaderHeight"
      :tableTdHeight="editTableJson.tableTdHeight"
      :editTable="editTableJson.editTable"
      style="height: 300px;"
    >
      <template slot="fixedCol" slot-scope="field" class="fl-td">
        <div>
          <span>自定义插槽</span>
          <div>{{ field.field.rowData[field.field.field.name] }}</div>
          <div>可自定义td</div>
        </div>
      </template>
      <template slot="selectPerson" slot-scope="field" class="fl-td">
        <div>
          {{ field.field.rowData[field.field.field.name] }}
        </div>
      </template>
    </edit-table>
    <br />
    <el-row>
      <el-button type="primary" @click="getValue(editTableJson.data)">获取表格数据</el-button>
      <el-button type="success" @click="submit('editTable1')">提交表单</el-button>
      <el-button type="info" @click="clearTable('editTable1')">清空可编辑表格的值</el-button>
      <el-button type="info" @click="resetTable('editTable1')">重置编辑表格的值</el-button>
    </el-row>
  </div>
</template>

<script>
import EditTable from "./../component/EditTable/EditTable.vue";
import editTableJson from "./EditTableJson.js";
import empEditData from "./empEditData.js";
export default {
  name: "EditTableTest",
  components: { EditTable },
  data() {
    return {
      editTableJson: editTableJson,
      data1: [],
      data2: [],
      empEditData: empEditData
    };
  },
  mounted() {
    setTimeout(() => {
      this.data1 = this.editTableJson.headers;
      this.data2 = this.editTableJson.data;
    }, 1000);
  },
  methods: {
    editDragEnd(currentColIndex, selectArr, name, value) {
      console.log(currentColIndex);
      console.log(selectArr);
      console.log(name);
      console.log(value);
    },
    personClick(e, rowIndex, colIndex) {
      this.$refs.editTable1.dotClick(e, rowIndex, colIndex);
    },
    //身份证发生变化的时候
    sfzChange(field, val, colIndex, rowIndex) {
      // console.log(val);
      this.$refs.empTable1.tableValidate(field, val, colIndex, rowIndex, 0);
    },
    dataChange(val, editRow, editCol, rowData, field, ruls) {
      // 当每个值发生变化时候的回调函数
      console.log(val);
      console.log(editRow);
      console.log(editCol);
      console.log(rowData);
      console.log(field);
      console.log(ruls);
    },
    change(val) {
      console.log(val);
    },
    inputNumberBlur(editRowData, editKey, editVal) {
      console.log(editRowData);
      console.log(editKey);
      console.log(editVal);
    },
    inputBlur(editRowData, editKey, editVal, rowIndex) {
      console.log(editRowData);
      console.log(editKey);
      console.log(editVal);
      console.log(rowIndex);
    },
    getValue(val) {
      console.log(val);
    },
    submit(ref) {
      console.log(this.$refs[ref].submitForm());
    },
    clearTable(ref) {
      this.$refs[ref].clearAll();
    },
    resetTable(ref) {
      this.$refs[ref].resetAll();
    }
  }
};
</script>

<style lang="scss">
.edit-table-test {
  width: 100%;
  padding: 20px 40px;
  h5 {
    margin-bottom: 20px;
  }
}
.zzry-detail {
  height: 60px !important;
  position: relative;
  .zzry-p {
    width: 100%;
    padding: 10px;
    p {
      font-size: 14px;
      color: #303133;
      line-height: 1;
    }
    .zzry-first-p {
      margin-bottom: 8px;
    }
  }
}
</style>
