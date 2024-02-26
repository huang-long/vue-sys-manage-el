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
import { onMounted, nextTick, ref, onBeforeUnmount, watch } from "vue";

const refChart = ref();
let myChart: echarts.EChartsType;
const initChart = () => {
  if (refChart.value) {
    //初始化echarts实例
    myChart = echarts.init(refChart.value);
    // 指定图表的配置项和数据
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      grid: { right: 100 },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      legend: {
        data: ["蒸发", "降水", "温度", "降水同比"],
      },
      xAxis: [
        {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "蒸发降水",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value} ml",
          },
          nameTextStyle: {
            align: "right",
            padding: 0,
          },
          axisPointer: {
            label: {
              formatter: function ({ value }: { value: number }) {
                return Math.ceil(value) + "ml";
              },
            },
          },
        },
        {
          type: "value",
          name: "温度",
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: "{value} °C",
          },
          nameTextStyle: {
            align: "left",
            padding: 0,
          },
          axisPointer: {
            label: {
              formatter: function ({ value }: { value: number }) {
                return Math.ceil(value) + "°C";
              },
            },
          },
        },
        {
          type: "value",
          name: "降水同比",
          min: 0,
          max: 200,
          interval: 40,
          axisLabel: {
            formatter: "{value} %",
            margin: 50,
          },
          nameTextStyle: {
            align: "left",
            padding: [0, 0, 0, 50],
          },
          axisPointer: {
            label: {
              margin: 50,
              formatter: function ({ value }: { value: number }) {
                return Math.ceil(value) + "%";
              },
            },
          },
        },
      ],
      series: [
        {
          name: "蒸发",
          type: "bar",
          yAxisIndex: 0,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + " ml";
            },
          },
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        },
        {
          name: "降水",
          type: "bar",
          yAxisIndex: 0,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + " ml";
            },
          },
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: "温度",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + " °C";
            },
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        },
        {
          name: "降水同比",
          type: "line",
          yAxisIndex: 2,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + " %";
            },
          },
          data: [90, 70, 80, 60, 110, 100, 130, 150, 70, 85, 86, 89],
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};

//重新渲染图表
const resizeChart = () => {
  // 折叠板延迟时间
  setTimeout(() => {
    myChart?.resize();
  }, 400);
};

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
});
</script>
<style lang="less" scoped></style>
