<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://element-plus.gitee.io/zh-CN/component/config-provider.html#i18n-%E9%85%8D%E7%BD%AE" target="_blank">element-plus i18n配置</a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://vue-i18n.intlify.dev/guide/migration/vue3.html#how-to-migration" target="_blank">vue3 vue-i18n配置</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">i18n</el-divider>

    <el-row :gutter="24">
      通过切换语言按钮，来改变当前内容的语言。
      <el-button type="primary" @click="changeLang()" size="small">切换语言</el-button>
    </el-row>

    <el-divider content-position="left">vue3 vue-i18n</el-divider>

    <el-row>
      <el-descriptions :title="t('oldManAndSea.title')" :column="1" size="small">
        <el-descriptions-item label="1.">{{t('oldManAndSea.famous[0]')}}</el-descriptions-item>
        <el-descriptions-item label="2.">{{t('oldManAndSea.famous[1]')}}</el-descriptions-item>
        <el-descriptions-item label="3.">{{t('oldManAndSea.famous[2]')}}</el-descriptions-item>
        <el-descriptions-item label="5.">{{t('oldManAndSea.famous[3]')}}</el-descriptions-item>
        <el-descriptions-item label="5.">{{t('oldManAndSea.famous[4]')}}</el-descriptions-item>
      </el-descriptions>
    </el-row>

    <el-divider content-position="left">element-plus i18n</el-divider>

    <el-config-provider :locale="locale">
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup name="DemoI18n">
import { useI18n } from "vue-i18n";
import type { ComponentInternalInstance } from "vue";
import { getCurrentInstance, computed } from "vue";
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// @ts-ignore
import en from "element-plus/dist/locale/en.mjs";

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const locale = computed(() => (proxy.$i18n.locale === "zh-CN" ? zhCn : en));
const changeLang = () => {
  if (proxy) {
    if (proxy.$i18n.locale == "zh-CN") {
      proxy.$i18n.locale = "en-US";
    } else {
      proxy.$i18n.locale = "zh-CN";
    }
  }
};
</script>
