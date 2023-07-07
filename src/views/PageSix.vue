<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column width="55">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selected"
            @change="handleRowSelectChange(scope.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // 添加一个 selected 属性用于控制 checkbox 的状态
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          selected: false,
        },
        {
          date: "2016-05-03",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1518 弄",
          selected: false,
        },
        // 其他行数据...
      ],
    };
  },

  methods: {
    handleRowSelectChange(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    handleSelect(selection, row) {
      row.selected = selection.includes(row);
    },

    handleSelectAll(selection) {
      for (let row of this.tableData) {
        row.selected = selection.includes(row);
      }
    },
  },
};
</script>
