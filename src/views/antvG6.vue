<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        相关文档：
        <a href="https://g6.antv.antgroup.com/api/Graph" target="_blank">antv g6官方文档</a>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-button type="primary" @click="resetGraph">重置</el-button>
      </el-col>
    </el-row>

    <el-divider content-position="left">antv g6</el-divider>

    <div class="my-relation-graph">
      <div id="mountNode"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="AntvG6Graph">
import { data } from "../data/graph";
import G6, { Graph, type EdgeConfig, type IGroup, type INode } from "@antv/g6";
import { nextTick, onMounted } from "vue";

let graph: Graph;
const edgeCount = new Map(); // 两个节点边的数量

/**
 * 初始化插件（Tooltip、EdgeTooltip）
 * @return [tooltip, edgeTooltip]
 */
const initPlugins = () => {
  // 节点Tooltip插件
  const tooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 20,
    getContent(e) {
      const name = e?.item?.getModel().name as string;
      return name ? name : "";
    },
    itemTypes: ["node"],
    shouldBegin(e) {
      const states = e?.item?.getStates();
      if (states && states.indexOf("dark") >= 0) {
        return false;
      } else {
        return true;
      }
    },
  });
  // 连线Tooltip插件
  const edgeTooltip = new G6.Tooltip({
    offsetX: 10,
    offsetY: 20,
    getContent(e) {
      const prop = e?.item?.getModel().properties;
      if (prop instanceof Object) {
        const { role } = prop as { role?: string };
        return "关系：" + role;
      } else {
        return "关系：无";
      }
    },
    itemTypes: ["edge"],
    shouldBegin(e) {
      const states = e?.item?.getStates();
      if (states && states.indexOf("dark") >= 0) {
        return false;
      } else {
        return true;
      }
    },
  });

  // 操作
  const toolbar = new G6.ToolBar({
    zoomSensitivity: 120,
    minZoom: 120,
    maxZoom: 240,
    className: "g6-component-toolbar",
    // getContent: () => {
    //   return `<ul>
    //         <li code='zoomIn' title='放大'>
    //           <i class="el-icon-zoom-in"></i>
    //         </li>
    //         <li code='zoomOut' title='缩小'>
    //           <i class="el-icon-zoom-out"></i>
    //         </li>
    //         <li code='realZoom' title='还原'>
    //           <i class="el-icon-rank"></i>
    //         </li>
    //         <li code='autoZoom' title='居中'>
    //           <i class="el-icon-aim"></i>
    //         </li>
    //       </ul>`;
    // },
    handleClick: (code, graph) => {
      switch (code) {
        case "zoomIn":
          graph.zoomTo(graph.getZoom() * 1.1);
          break;
        case "zoomOut":
          graph.zoomTo(graph.getZoom() * 0.9);
          break;
        default:
          toolbar.handleDefaultOperator(code);
          break;
      }
    },
  });
  return [tooltip, edgeTooltip, toolbar];
};

/**
 * 清除所有节点，连线状态
 */
const clearAllStats = () => {
  graph.setAutoPaint(false);
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
  });
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge);
  });
  graph.paint();
  graph.setAutoPaint(true);
};
/**
 * 设置选中数据状态
 * @param {*} e 元素
 */
const lightNode = (e: { item: INode }) => {
  const item = e.item;
  graph.setAutoPaint(false);
  const nodeIds: Array<string> = [];
  // 所有节点置灰
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
    graph.setItemState(node, "dark", true);
  });
  // 当前节点点亮
  nodeIds.push(item.getID());
  graph.setItemState(item, "dark", false);
  graph.setItemState(item, "highlight", true);
  // 点亮关联节点
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge);
    if (edge.getSource() === item) {
      // 指向节点
      nodeIds.push(edge.getTarget().getID());
      graph.setItemState(edge.getTarget(), "dark", false);
      graph.setItemState(edge.getTarget(), "highlight", true);
      graph.setItemState(edge, "highlight", true);
      edge.toFront();
    } else if (edge.getTarget() === item) {
      // 指入节点
      nodeIds.push(edge.getSource().getID());
      graph.setItemState(edge.getSource(), "dark", false);
      graph.setItemState(edge.getSource(), "highlight", true);
      graph.setItemState(edge, "highlight", true);
      edge.toFront();
    } else {
      graph.setItemState(edge, "dark", true);
    }
  });
  // 选中的节点展示在最上层
  const group = graph.getGroup().getChildByIndex(2) as IGroup;
  group.getChildren().forEach((item) => {
    if (nodeIds.indexOf(item.cfg.id) >= 0) {
      item.cfg.zIndex = 1;
    } else {
      item.cfg.zIndex = 0;
    }
  });
  group.sort();
  graph.paint();
  graph.setAutoPaint(true);
};

/**
 * 计算边的曲线偏移量，控制点距离两端点连线的距离，可理解为控制边的弯曲程度
 * @param {object} edge 边数据
 *
 * @return {integer}
 */
const computeCurveOffset = (edge: EdgeConfig) => {
  if (edge.source && edge.target) {
    const tempCode = edge.source > edge.target ? edge.source + edge.target : edge.target + edge.source;
    const tempIndex = edgeCount.get(tempCode) === undefined ? 0 : edgeCount.get(tempCode) + 1;
    edgeCount.set(tempCode, tempIndex);
    return Math.pow(-1, tempIndex) * Math.round(tempIndex / 2) * 20;
  } else {
    return 0;
  }
};

/**
 * 初始化AntvG6Graph
 */
const initAntvG6Graph = () => {
  graph = new G6.Graph({
    container: "mountNode",
    width: window.innerWidth,
    height: window.innerHeight,
    plugins: initPlugins(), // 配置 Tooltip 插件
    // fitView: true,
    layout: {
      type: "forceAtlas2", // 建议（force2, forceAtlas2），值：random, radial, mds, circular, fruchterman, force, gForce, force2, forceAtlas2, dagre, concentric, grid
      preventOverlap: true, // 防止节点重叠
      prune: false,
      kr: 30,
      // nodeSize: 30,         // 节点大小，用于算法中防止节点重叠时的碰撞检测
      // linkDistance: (d: { source: { id: string; }; }) => {
      //   if (d.source.id.indexOf("278")>=0) {
      //     return 500;
      //   }
      //   return 300;
      // },
      // nodeStrength: (d: { isLeaf: any; }) => {
      //   if (d.isLeaf) {
      //     return -50;
      //   }
      //   return -10;
      // },
      // edgeStrength: (d: { source: { id: string; }; }) => {
      //   if (d.source.id.indexOf("278")>=0) {
      //     return 0.7;
      //   }
      //   return 0.1;
      // },
    },
    modes: {
      default: ["drag-canvas", "drag-node", "zoom-canvas"],
    },
    defaultNode: {
      // 节点配置
      size: [40, 40],
      style: {
        fill: "steelblue", // 节点填充色
        // stroke: '#666', // 节点描边色
        opacity: 1, // 设置绘图的当前 alpha 或透明值
        lineWidth: 2, // 节点描边粗细
      },
      labelCfg: {
        // 节点上的标签文本配置
        style: {
          // 节点上的标签文本样式配置
          fill: "#fff", // 节点标签文字颜色
          opacity: 1,
        },
      },
    },
    defaultEdge: {
      // 连线配置
      type: "quadratic",
      size: 1,
      style: {
        stroke: "#e2e2e2",
        lineAppendWidth: 2,
        opacity: 1,
        endArrow: {
          // 连线箭头
          path: "M 0,0 L 4,2 L 3,0 L 4,-2 Z",
          fill: "#e2e2e2",
        },
      },
      labelCfg: {
        // 节点上的标签文本配置
        style: {
          // 节点上的标签文本样式配置
          opacity: 1,
        },
      },
    },
    nodeStateStyles: {
      // 不同状态节点样式
      highlight: {
        opacity: 1,
        fill: "steelblue", // 节点填充色
      },
      dark: {
        opacity: 0.2,
        "text-shape": {
          opacity: 0,
        },
      },
    },
    edgeStateStyles: {
      // 不同状态连线样式
      highlight: {
        stroke: "#999",
      },
      dark: {
        opacity: 0.2,
        "text-shape": {
          opacity: 0,
        },
      },
    },
  });

  // 事件（点击、移动）
  // graph.on('node:mouseenter', lightNode);
  // graph.on('node:mouseleave', clearAllStats);
  graph.on("node:click", lightNode);
  graph.on("canvas:click", clearAllStats);

  //处理数据并渲染
  resetGraph();
};

const resetGraph = () => {
  const graphData = {
    nodes: data.nodes.map(function (node) {
      if (node.name && typeof node.name == "string") {
        node.label = node.name.length > 3 ? node.name.substring(0, 2) + "..." : node.name;
      }
      return Object.assign({}, node);
    }),
    edges: data.edges.map(function (edge, i) {
      edge.id = "edge" + i;
      edge.curveOffset = computeCurveOffset(edge);
      if (edge.properties instanceof Object) {
        const { role } = edge.properties as { role?: string };
        edge.label = role ? (role.length > 2 ? role.substring(0, 2) + "..." : "") : "";
      }
      return Object.assign({}, edge);
    }),
  };
  //处理数据并渲染
  graph.clear();
  graph.data(graphData);
  graph.render();
};

onMounted(() => {
  nextTick(() => {
    initAntvG6Graph();
  });
});
</script>
<style lang="less" scoped>
.my-relation-graph {
  position: relative;

  .query-form {
    position: absolute;
    right: 0;
    top: -14px;

    .reference {
      background: transparent;
      display: inline-block;
      width: 40px;
      height: 1px;
    }
  }

  :deep(.g6-component-toolbar) {
    right: 0;
    top: 0;
    left: auto;
    display: flex;
    flex-direction: column;

    li {
      width: 36px;
      height: 36px;
      padding: 6px;
      color: #606266;

      i {
        font-size: 24px;
      }
    }
  }
}
</style>
