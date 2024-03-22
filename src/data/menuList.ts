export declare interface Menu {
  id: string;
  icon?: string;
  path?: string;
  name?: string;
  componentPath?: string;
  title: string;
  children?: Array<Menu>;
}

export const menuList1: Array<Menu> = [
  {
    id: "Home_M0001",
    icon: "HomeFilled",
    path: "/home",
    name: "DemoHome",
    componentPath: "home.vue",
    title: "系统首页",
  },
  {
    id: "Table_M0201",
    icon: "Grid",
    title: "表格相关",
    children: [
      {
        id: "Table_M0202",
        path: "/table",
        name: "DemoTable",
        componentPath: "table.vue",
        title: "基础表格",
      },
      {
        id: "Table_M0203",
        path: "/table1",
        name: "DemoTable1",
        componentPath: "table1.vue",
        title: "虚拟化表格",
      },
      {
        id: "Table_M0202",
        path: "/table2",
        name: "DemoTable2",
        componentPath: "table2.vue",
        title: "复杂表格",
      },
    ],
  },
  {
    id: "Tabs_M0003",
    icon: "List",
    path: "/tabs",
    name: "DemoTabs",
    componentPath: "tabs.vue",
    title: "tab选项卡",
  },
  {
    id: "Form_M0004",
    icon: "Tickets",
    title: "表单相关",
    children: [
      {
        id: "Form_M0005",
        path: "/form",
        name: "DemoForm",
        componentPath: "form.vue",
        title: "基本表单",
      },
      {
        id: "Form_M0006",
        path: "/editor",
        name: "DemoEditor",
        componentPath: "editor.vue",
        title: "富文本编辑器",
      },
      {
        id: "Form_M0010",
        path: "/formCreate",
        name: "DemoFormCreate",
        componentPath: "formCreate.vue",
        title: "表单构建",
      },
      {
        id: "Form_M0007",
        title: "文件上传下载",
        children: [
          {
            id: "Form_M7001",
            path: "/upload",
            name: "DemoUpload",
            componentPath: "upload.vue",
            title: "文件上传",
          },
          {
            id: "Form_M7002",
            path: "/download",
            name: "DemoDownload",
            componentPath: "download.vue",
            title: "文件下载",
          },
        ],
      },
      {
        id: "Form_M3001",
        title: "文件预览",
        path: "/filePreview",
        name: "DemoFilePreview",
        componentPath: "filePreview.vue",
      },
      {
        id: "Form_M0025",
        path: "/print",
        name: "DemoPrint",
        componentPath: "print.vue",
        title: "打印",
      },
    ],
  },
  {
    id: "Msg_M0091",
    icon: "SuitcaseLine",
    path: "/MessageBox",
    name: "DemoMessage",
    componentPath: "message.vue",
    title: "消息弹窗",
  },
  {
    id: "Icon_M0010",
    icon: "PictureRounded",
    path: "/icon",
    name: "DemoIcon",
    componentPath: "icon.vue",
    title: "自定义图标",
  },
  {
    id: "Img_M0012",
    icon: "TrendCharts",
    title: "图像图形",
    children: [
      {
        id: "Img_M00101",
        path: "/charts",
        name: "DemoEharts",
        componentPath: "charts.vue",
        title: "echarts图表",
      },
      {
        id: "Img_M00102",
        path: "/bpmnFlow",
        name: "DemoBpmnFlow",
        componentPath: "bpmnFlow.vue",
        title: "流程图",
      },
      {
        id: "Img_M00104",
        path: "/bpmnActiviti",
        name: "DemoBpmnActiviti",
        componentPath: "bpmnActiviti.vue",
        title: "工作流",
      },
      {
        id: "Img_M00103",
        path: "/antvG6",
        name: "AntvG6Graph",
        componentPath: "antvG6.vue",
        title: "关系图",
      },
      {
        id: "Img_M00105",
        path: "/video",
        name: "DemoVideo",
        componentPath: "video.vue",
        title: "视频处理",
      },
    ],
  },
  {
    id: "I18n_M0011",
    icon: "Orange",
    path: "/i18n",
    name: "DemoI18n",
    componentPath: "i18n.vue",
    title: "国际化功能",
  },
  {
    id: "Env_M0016",
    icon: "Setting",
    path: "/env",
    name: "DemoEnv",
    componentPath: "env.vue",
    title: "环境变量",
  },
  {
    id: "Auth_M0012",
    icon: "UserFilled",
    title: "安全处理",
    children: [
      {
        id: "Auth_M0013",
        path: "/permission",
        name: "DemoPermission",
        componentPath: "permission.vue",
        title: "权限测试",
      },
      {
        id: "Auth_M0045",
        path: "/guomi",
        name: "DemoGuomi",
        componentPath: "guomi.vue",
        title: "国密算法",
      },
      {
        id: "Auth_M0014",
        path: "/404",
        name: "DemoError404",
        componentPath: "error404.vue",
        title: "404页面",
      },
    ],
  },
  {
    id: "Donate_M0015",
    icon: "Avatar",
    path: "/donate",
    name: "DemoDonate",
    componentPath: "donate.vue",
    title: "支持作者",
  },
];

export const menuList2 = [
  {
    id: "Home_M0001",
    icon: "HomeFilled",
    path: "/home",
    name: "DemoHome",
    componentPath: "home.vue",
    title: "系统首页",
  },
  {
    id: "Auth_M0012",
    icon: "UserFilled",
    title: "安全处理",
    children: [
      {
        id: "Auth_M0013",
        path: "/permission",
        name: "DemoPermission",
        componentPath: "permission.vue",
        title: "权限测试",
      },
      {
        id: "Auth_M0014",
        path: "/404",
        name: "DemoError404",
        componentPath: "error404.vue",
        title: "404页面",
      },
    ],
  },
  {
    id: "Donate_M0015",
    icon: "Avatar",
    path: "/donate",
    name: "DemoDonate",
    componentPath: "donate.vue",
    title: "支持作者",
  },
];
