<template>
    <div v-show="isShow" id="gantt-chart" style={width:90%} ></div>
    <!-- <el-button @click="fresh">fresh</el-button> -->
</template>
<script setup>
import Plotly from 'plotly.js/dist/plotly';
import { reactive,watch,ref} from 'vue';
        //定义gantt属性
        const props=defineProps({
           tasks:Array,//记录每一条任务start，end时间，执行的value
           totalDay:Number,//模拟的天数上限制

        })
        //控制页面是否显示的变量，无数据不显示
        const isShow=ref(false)
        // //测试子组件
        // const props_example={
        //     tasks:[
        //         {start:0,end:10,value:0.5},
        //         {start:11,end:30,value:0.7},
        //         {start:31,end:35,value:0.7},
        //         {start:36,end:40,value:0.8}
        //     ],
        //     totalDay:40
        // }
        //记录将tasks转变为plotly.js所需要的配置信息
        let data=[]
        //任务颜色列表
        let colorList=['#00CD00','#4266BE','#FE0302','#FF7204','#019899'];
        let colorMap=new Map();
        const addFigData=()=>{
             //data数组需要清空，否则上一轮的删除数据只在task中消失，data则没做任何操作

            data.length=0
            if(props.tasks.length===0){
                return;
            }

            //data=[]不可以
            props.tasks.map(({start,end,value})=>{
                const item= {
                    type: 'gantt',
                    //起止点
                    x:[],
                    y:[],
                    //默认xy是数字xy轴
                    xref: 'x',
                    yref: 'y',
                    //任务条样式

                    mode: 'lines+markers',
                    //标记点
                    marker: {
                        color: '',
                        size: 8
                    },
                    //线段
                    line: {
                        color: '',
                        width: 2
                    },
                    //悬停文字提示
                    text:[],
                    //计划名
                    name:''
                }
                item.x.push(start);
                item.x.push(end);
                item.y.push(value,value);
                item.text.push(`从第${start}天开始,${value}`)
                item.text.push(`到第${end}天结束，${value}`)
                item.name=`${start}-${end}-${value}`
                if(colorMap.get(value)){
                    item.line.color=colorMap.get(value)
                    item.marker.color=colorMap.get(value)
                }
                else{
                    if(colorList.length==0){
                        colorList=['#00CD00','#4266BE','#FE0302','#FF7204','#019899'];
                    }
                    const color=colorList.pop();
                    item.line.color=color;
                    item.marker.color=color;
                    colorMap.set(value,color);
                }
                data.push(item);
            })
        }


        const layout = {
          width:420,
          height:'80%',
          xaxis: {
            range: [0, props.totalDay],
            title:"Day",
          },
          yaxis: {
            title:"beta_change",
            range: [0, 1],
            tickvals: [0,0.2,0.40,0.60,0.80,1],
            //dtick:0.2,
            ticktext: ['0%', '20%','40%','60%', '80%','100%']
          },

      };

      const config={responsive:true}
      const fresh=()=>{
        addFigData()

        //数据为0，需要不显示，否则上一轮渲染的图片不变
        if(data.length==0){
            isShow.value=false;
        }
        else{

        Plotly.newPlot('gantt-chart', data, layout,config);
        isShow.value=true;
        }
        console.log("当前任务",props.tasks)
        console.log("当前任务对应的data",data)
      }

      watch(props.tasks,fresh)



</script>
