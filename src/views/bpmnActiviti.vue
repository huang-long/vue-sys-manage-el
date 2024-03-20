<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://bpmn.io/toolkit/bpmn-js/" target="_blank">bpmn-js官方文档</a>
        、
        <a href="https://gitee.com/huanglgln/ruoyi-web-vue3-ts" target="_blank">项目实践</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">bpmn-js</el-divider>

    <el-row class="mb-4">
      <el-button type="primary" @click="add">设计流程</el-button>
    </el-row>

    <div style="width: 100%; height: 400px">
      <process-viewer class="viewer" :instance-id="'viewer.instanceId'" :proc-def-id="'viewer.procDefId'"></process-viewer>
    </div>

    <!--bpmnjs在线流程设计器-->
    <bpmn-view v-model="bpmnViewVisible" :model-id="'modelId'" @close="handleClose"></bpmn-view>
  </div>
</template>

<script lang="ts" setup name="DemoBpmnActiviti">
import processViewer from "./activiti/processViewer/index.vue";
import bpmnView from "./activiti/modeler/bpmnView.vue";
import { ref } from "vue";

const bpmnViewVisible = ref(false);
const add = () => {
  bpmnViewVisible.value = true;
};
const handleClose = () => {
  console.log("关闭");
};
</script>
<style lang="less" scoped>
.viewer {
  width: 100%;
  height: 100%;
  min-width: 400px;
}
</style>
