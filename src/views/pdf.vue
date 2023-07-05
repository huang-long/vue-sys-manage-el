<style lang="less" scoped></style>
<template>
  <!-- 文档： https://www.npmjs.com/package/vue-pdf-embed -->
  <!-- 文档： https://www.npmjs.com/package/vue3-pdfjs -->
  <div>
    <PDFView :pdfUrl="jsPdf" />
  </div>
</template>
<script lang="ts" setup name="pdfView">
import PDFView from "../components/pdfPreview.vue"
const jsPdf = "/pdf/test.pdf"

</script>
