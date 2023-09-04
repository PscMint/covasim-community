import {createStore} from 'vuex';
import {nextTick,shallowRef} from 'vue'

export default createStore({
    state: {
        //控制参数面板上的drawer
        drawer:false,
        //初始化累计和新增折线图
        cumChart:shallowRef(null),
        newChart:shallowRef(null),
        panel:{
            cum_infections:{
                label:"累计感染",
                num:0,
                color:"#4266BE",
            },
            cum_severe:{
                label:"累计重症",
                num:0,
                color:"#c1981d",
            },
            cum_critical:{
                label:"累计危重症",
                num:0,
                color:"#FE0302",
            },
            cum_recoveries:{
                label:"累计康复",
                num:0,
                color:"#00CD00",
            },
            cum_deaths:{
                label:"累计死亡",
                num:0,
                color:"#000000",
            },
        }
    },
    getters: {
        getCumChart(state) {
            return state.cumChart;
        },
        getNewChart(state){
            return state.newChart;
        },
    },
    mutations: {
        setDrawer(state, isShow){
            state.drawer = isShow
        },
        // mutation 用于更新 state 中的数据
        setCumChart(state, instance) {
            state.cumChart = instance;
        },
        setNewChart(state, instance) {
            state.newChart = instance;
        },
        setPanelNum(state, {key,num}){
            state.panel[key].num=num
        },
        dataRenderChart(state,{options,chartId}){
            if(chartId === 'cum' && state.cumChart) {
                state.cumChart.setOption(options)
            }
            else if(chartId === 'new' && state.newChart) {
                state.newChart.setOption(options)
            }
        }

    },
    actions: {
        async resizeChart({getters}){
            const cumc = getters.getCumChart
            const newc = getters.getNewChart
            console.log(2,newc)
            await nextTick(()=>{
                if(cumc){
                    console.log(3)
                    cumc.resize()
                }
                if(newc){
                    newc.resize()
                }
            })

        }
    },
});
