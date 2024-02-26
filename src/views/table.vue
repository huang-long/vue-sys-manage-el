<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://element-plus.gitee.io/zh-CN/component/table.html" target="_blank">element-plus table配置</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">table</el-divider>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="age" label="Age" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>
<script lang="ts" setup name="DemoTable">
import { reactive } from "vue";
import { tableDataList } from "../data/tableList";
const tableData = reactive(tableDataList);
</script>

<style lang="less" scoped>
.page {
  padding: 10px 0;
  display: flex;
  justify-content: right;
}
</style>
