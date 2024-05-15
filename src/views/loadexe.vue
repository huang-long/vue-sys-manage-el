<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://blog.csdn.net/huanglgln/article/details/138860969" target="_blank">jar打包成exe操作步骤</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">唤醒websockettest.exe</el-divider>

    <el-row :gutter="24">
      <el-button :loading="loading" type="primary" size="small" @click="loadexe()">唤醒exe</el-button>
    </el-row>
  </div>
</template>
<script lang="ts" setup name="LoadexeI18n">
import customProtocolCheck from "custom-protocol-check";
import { ElMessageBox } from "element-plus";
import { ref } from "vue";

const loading = ref(false);
const loadexe = () => {
  loading.value = true
  customProtocolCheck(
    "websockettest://params",
    () => {
      loading.value = false
      ElMessageBox.confirm("检测到未安装客户端，请确认是否下载?")
        .then(() => {
          window.location.href = "/software/mysetup.exe"
        })
        .catch(() => { });
    },
    () => {
      loading.value = false
      console.log("Custom protocol found and opened the file successfully.");
    }, 5000
  );
};
</script>

<style lang="less" scoped></style>
