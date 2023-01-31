import { createApp } from 'vue'
import './myStyle.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"
import api from "./api/api"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//import './api/mock'

const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$api=api
app.mount('#app')
