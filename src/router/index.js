import {createRouter,createWebHashHistory} from "vue-router"
const routes=[

    {
        name:"home",
        path:"/",
        component:()=>import("../views/Home.vue"),

    },
    {

        name:"gantt",
        path:"/gantt",
        component:()=>import("../components/TinyGantt.vue")

    }


]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router
