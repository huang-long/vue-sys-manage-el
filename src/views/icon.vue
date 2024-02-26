<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://element-plus.gitee.io/zh-CN/component/icon.html" target="_blank">element-plus icon</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">icon</el-divider>

    <div>
      <el-icon>
        <Edit />
      </el-icon>
      <Edit style="width: 16px; height: 16px" />
    </div>

    <pre><code><span class="token comment">&lt;!-- 使用 el-icon 为 SVG 图标提供属性 --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-icon</span> <span class="token attr-name">:size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>size<span class="token punctuation">"</span></span> <span class="token attr-name">:color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>color<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Edit</span> <span class="token punctuation">/&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-icon</span><span class="token punctuation">&gt;</span></span>
          <span class="token comment">&lt;!-- 或者独立使用它，不从父级获取属性 --&gt;</span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Edit</span> <span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    </code></pre>
  </div>
</template>
<script lang="ts" setup name="DemoIcon"></script>

<style lang="less" scoped></style>
