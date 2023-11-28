

<style lang="less" scoped></style>
<template>
  <div ref="chartPage" class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://echarts.apache.org/zh/index.html" target="_blank">echarts官方文档</a>
      </el-col>
    </el-row>

    <el-divider content-position="left">echarts</el-divider>

    <div ref="refChart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts" setup name="DemoCharts">
import { useElementSize } from "@vueuse/core";
import * as echarts from "echarts";
import { onMounted, nextTick, ref, onBeforeUnmount, computed, watch } from 'vue';

let refChart = ref();
let myChart: echarts.EChartsType;
let initChart = () => {
  if (refChart.value) {
    //初始化echarts实例
    myChart = echarts.init(refChart.value);
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: "echarts 示例",
        textStyle: {
          fontSize: 16,
          fontWeight: "normal",
          lineHeight: 50,
        },
        padding: [0, 0, 0, 20],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "电力",
            "水泥",
            "煤炭",
            "化工",
            "电解",
            "机械",
            "橡胶",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          name: "单位（度）",
          nameTextStyle: {
            align: "left",
            verticalAlign: "top",
          },
          type: "value",
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: "吨",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
          itemStyle: { normal: { color: "#2C6D9D" } },
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
}

//重新渲染图表
const resizeChart = () => {
  // 折叠板延迟时间
  setTimeout(() => {
    myChart?.resize();
  }, 400);
}

// 监听页面大小变化
const chartPage = ref();
const { width: pageWidth } = useElementSize(chartPage);
watch(pageWidth, () => {
  resizeChart();
});
// 样式变化重新渲染
// const store = userStore();
// const collapse = computed(() => store.meunIsCollapsed);
// watch(collapse, () => {
//   resizeChart();
// });

// 初始化渲染
onMounted(() => {
  nextTick(() => {
    initChart();
    window.addEventListener("resize", resizeChart);
  });
});

//销毁
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
})

</script>
