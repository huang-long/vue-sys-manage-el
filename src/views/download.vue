<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">文件下载</el-col>
    </el-row>

    <div>
      <el-divider content-position="left">链接下载</el-divider>
      <a href="/sys-api/file/test1.xlsx" :download="fileName">下载</a>
      <el-divider content-position="left">Blob下载（处理一些特殊情况）</el-divider>
      <a href="javascript:void(0)" @click="download">下载</a>
      <el-divider content-position="left">Blob图片展示（处理一些特殊情况）</el-divider>
      <img style="width: 100px; height: 100px" :src="imageUrl" />
    </div>
  </div>
</template>
<script lang="ts" setup name="DemoDownload">
import { onBeforeMount, onUnmounted, ref } from "vue";
import { downloadFile, downFile } from "../api/manage";

const fileName = ref("表格.xlsx");
const imageUrl = ref("");

let tempUrl = "";

onBeforeMount(() => {
  downFile("/image/test.jpg").then((data) => {
    tempUrl = window.URL.createObjectURL(data);
    imageUrl.value = tempUrl;
  });
});

onUnmounted(() => {
  window.URL.revokeObjectURL(tempUrl); // 释放掉blob对象
});

const download = function () {
  downloadFile("/file/test1.xlsx", "表格.xlsx", {});
};
</script>

<style lang="less" scoped></style>
