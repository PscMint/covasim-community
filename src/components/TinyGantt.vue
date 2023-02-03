<template>
    <div id="gantt-chart" ></div>
    <el-button @click="fresh">fresh</el-button>
</template>
<script setup>

import Plotly, { react } from 'plotly.js/dist/plotly';
import { onMounted,reactive,nextTick } from 'vue';

        const props=defineProps({
           tasks:Array,
           totalDay:Number
        })
        //测试子组件
        const props_example={
            tasks:[
                {start:0,end:10,value:0.5},
                {start:11,end:30,value:0.7},
                {start:31,end:35,value:0.7},
                {start:36,end:40,value:0.8}
            ],
            totalDay:40
        }
        let data=reactive([])
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
                    type: 'shape',
                    //起止点
                    x0: 0,
                    y0: 0,
                    x1: 0,
                    y1: 0,
                    //默认xy是数字xy轴
                    xref: 'x',
                    yref: 'y',
                    //任务条样式
                    line: {
                    width: 10,
                    color: '#4266BE'
                    }
                }
                item.x0=start;
                item.x1=end;
                item.y0=value;
                item.y1=value;
                if(colorMap.get(value)){
                    item.line.color=colorMap.get(value)
                }
                else{
                    if(colorList.length==0){
                        colorList=['#00CD00','#4266BE','#FE0302','#FF7204','#019899'];    
                    }
                    const color=colorList.pop();
                    item.line.color=color;
                    colorMap.set(value,color);
                }
                data.push(item);

            })
        }
       
        

        const layout = {
        xaxis: {
          range: [0, props.totalDay],
          title:"Day"
        },
        yaxis: {
          title:"beta_change",
          range: [0, 1],
          tickvals: [0,0.2,0.40,0.60,0.80,1],
          ticktext: ['0%', '20%','40%','60%', '80%','100%']
        },
        shapes: data,
        
      };
      const config={responsive:true}
      const fresh=()=>{
        addFigData()
        Plotly.newPlot('gantt-chart', data, layout,config);
        console.log("当前任务",props.tasks)
        console.log("当前任务对应的data",data)
      }
      
    onMounted(()=>{
        
    })



</script>