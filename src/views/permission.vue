

<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <el-divider>测试登录</el-divider>
    <el-row>
      <el-descriptions :title="'不同用户登录'" :column="1">
        <el-descriptions-item label="">使用<router-link to="/login">admin/123456</router-link>登录</el-descriptions-item>
        <el-descriptions-item label="">使用<router-link to="/login">other/123456</router-link>登录</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script lang="ts" setup name="DemoPermission">
</script>
