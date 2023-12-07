<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://github.com/huang-long/vue3-print-ts" target="_blank">vue3-print-ts</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">print</el-divider>

    <el-row :gutter="24">
      <el-button type="primary" size="small" icon="Printer" v-print="printObj">打印</el-button>
      <div id="loading" v-show="printLoading"></div>
    </el-row>
    <el-divider content-position="center">打印区域</el-divider>
    <div id="printMe" class="print-area">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <el-divider content-position="center">打印区域</el-divider>
  </div>
</template>

<script lang="ts" setup name="DemoPrint" directives="print">
import { ref } from 'vue';
import type { PrintConf } from 'vue3-print-ts';

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

let printLoading = ref(true);
let printObj= ref<PrintConf>({
  ids: "printMe",
  printTitle: '打印测试',
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  showBackground: true,
  beforePrint() {
    console.log('打印之前')
  },
  afterPrint() {
    console.log('打印之后')
  }
})
</script>
<style lang="less" scoped>
.print-area {
  max-width: 800px;
}
</style>