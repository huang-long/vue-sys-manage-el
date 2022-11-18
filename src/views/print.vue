<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://github.com/Power-kxLee/vue-print-nb#vue3-version" target="_blank">vue-print-nb</a>
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
// @ts--ignore 
// import print from 'vue3-print-nb';

const tableData = [
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
]

let printLoading = ref(true);
let printObj = ref({
  id: "printMe",
  popTitle: 'good print',
  extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue: { printLoading: boolean; }) {
    vue.printLoading = true
    console.log('打开之前')
  },
  openCallback(vue: { printLoading: boolean; }) {
    vue.printLoading = false
    console.log('打开打印页面')
  },
  closeCallback(vue: any) {
    console.log('关闭了打印工具')
  }
})
let columns = ref([
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
])
let data = ref([
  {
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park',
    date: '2016-10-03'
  },
  {
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
    date: '2016-10-01'
  },
  {
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park',
    date: '2016-10-02'
  },
  {
    name: 'Jon Snow',
    age: 26,
    address: 'Ottawa No. 2 Lake Park',
    date: '2016-10-04'
  }
])

</script>
<style lang="less" scoped>
.print-area {
  max-width: 800px;
}
</style>