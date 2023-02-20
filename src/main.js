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
app.directive('debounce', {
  beforeMount(el,binding){
    const {value:handler}=binding
    let timer=null;
    function debouceHandler(){
      //精简方法：如果只需要触发立即的效果，可以直接这样写
      let nowCall=!timer
      if(nowCall){
        handler();
        timer=setTimeout(()=>{timer=null},3000)
      }
    }
    el._debouceHandler=debouceHandler
  },
  mounted(el){
    el.addEventListener('click',el._debouceHandler)
  },
  unmounted(el) { 
    el.removeEventListener('click',el._debouceHandler)
  }
})
app.mount('#app')
