<template>
  <div class="container">
    <el-divider>环境变量</el-divider>
    <el-row>
      <el-descriptions :title="'环境变量'" :column="1">
        <el-descriptions-item label="VITE_PARAM:">
          {{ VITE_PARAM }}
        </el-descriptions-item>
        <el-descriptions-item label="VITE_BASE_URL:">
          {{ VITE_BASE_URL }}
        </el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-divider>环境变量</el-divider>

    <el-divider>配置文件</el-divider>
    <el-row>
      <el-descriptions :title="'配置文件'" :column="1">
        <el-descriptions-item label="1:">.env通用环境参数</el-descriptions-item>
        <el-descriptions-item label="2:">.env.development测试环境参数</el-descriptions-item>
        <el-descriptions-item label="3:">.env.product生产环境参数</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-divider>配置文件</el-divider>
  </div>
</template>
<script lang="ts" setup name="DemoEnv">
const VITE_PARAM = import.meta.env.VITE_PARAM;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
</script>

<style lang="less" scoped></style>
