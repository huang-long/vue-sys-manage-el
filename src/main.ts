import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import print from 'vue3-print-nb'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VXETable)
// element plus Icons
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, comp);
}
// element plus
app.use(ElementPlus)
app.use(print);
app.mount('#app')
