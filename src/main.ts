import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import Print from "vue3-print-ts";
import { i18n } from "./i18n";
import formCreate from "@form-create/element-ui";
import FcDesigner from "@form-create/designer";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VXETable);
// element plus Icons
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}
// element plus
app.use(i18n);
app.use(ElementPlus);
app.use(formCreate);
app.use(FcDesigner);
app.directive("print", Print);
app.mount("#app");
