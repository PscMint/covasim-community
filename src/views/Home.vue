<template>
    <el-card>
        <div ref="cum_echart" style="height:300px;"></div>
        
    </el-card>
    <el-card style="margin-top:20px">
        <div ref="new_echart" style="height:300px;"></div>
    </el-card>
</template>
<script>
import * as Echart from "echarts"
import { getCurrentInstance,onMounted,reactive,ref } from 'vue'
export default {
setup(){
    const {proxy}=getCurrentInstance()
    let xOptions=reactive({
                 title:{
                    text:"",
                    textStyle: {
                        fontFamily:"宋体",
                        fontWeight: 'bold',
                        color: '#17b3a3'
                        
                    }
                 },
                 legend:{
                        bottom:10,
                        textStyle:{
                        color:"#17b3a3",
                        },
                        data:[],
                    },
                tooltip:{
                    trigger:'axis'
                },

                xAxis: {
                       
                        data: [],
                        axisLine:{
                            lineStyle:{
                                color:"#17b3a3"
                            }
                        }
                        },
                yAxis: {
                   
                    axisLine:{
                        lineStyle:{
                            color:"#17b3a3"
                        }
                        }
                    
                }, 
                series:[],
            })
    //自定义时间处理函数
    function formatDate(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;

                return year + '-' + month + '-' + day;
    }




            

    onMounted(()=>{
        proxy.$api.getSimRes().then((res)=>{
            //后台获取表格数据
            console.log(res);
            //处理后台传入的数据，赋值给echart的对象
            const {date,cumData,newData}=res;
            
           //保存时间序列
            xOptions.xAxis.data=date.map((item)=>{
                return formatDate(new Date(item))
            });
            //保存cum数据序列
            xOptions.series=cumData.map((item)=>{
                return{ 
                type:"line",
                name:item.name,
                data:item.values,
                //color:item.color
                }
            });
            //保存cum的legend信息
            xOptions.legend.data=cumData.map((item)=>{
                return item.name
            })
            //添加cum的标题
            xOptions.title.text="日累计数量"
            //创建并渲染累计图
            const cumChart=Echart.init(proxy.$refs["cum_echart"]);
            cumChart.setOption(xOptions);
            //创建新增图
            const newChart=Echart.init(proxy.$refs["new_echart"]);
            //替换为new数据序列
            xOptions.series=newData.map((item)=>{
                return{ 
                type:"line",
                name:item.name,
                data:item.values,
                //color:item.color
                
                }
            });
            //替换为new的legend信息
            //保存图例legend信息
            xOptions.legend.data=newData.map((item)=>{
                return item.name
            })
            //添加cum的标题
            xOptions.title.text="日新增数量"
            //渲染新增图
            newChart.setOption(xOptions);
        })
    })
    return{

    }

}
}
</script>