<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <el-calendar v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
// defineExpose无需导入，直接使用
// defineExpose({ value });
</script>
