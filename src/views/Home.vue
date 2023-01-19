<template>
    <el-row>
        <el-col :span="8">
            <el-collapse  >
                <el-collapse-item title="sim参数" >
                    
                        
                            <el-form v-model="simPars" label-position="top">
                                <el-divider  >人口设置</el-divider>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="人口总数">
                                            <el-input v-model.number="simPars.pop_size" />
                                            </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="初始感染人数">
                                            <el-input v-model.number="simPars.pop_infected" />
                                            </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-divider >网络设置</el-divider>
                                <el-row>
                                    <el-form-item label="网络模型选择">
                                            <el-select v-model="simPars.pop_type" placeholder="请选择网络模型">
                                                <el-option label="社区网络模型" value="pro_hybrid" />
                                                <el-option label="网络模型" value="hybrid" />
                                            </el-select>
                                        </el-form-item>
                                </el-row>
                                <el-divider >时间设置</el-divider>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="开始时间">
                                            <el-date-picker
                                            v-model="simPars.start_day"
                                            placeholder="请选择模拟开始时间"
                                            
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="结束时间">
                                            <el-date-picker
                                            v-model="simPars.end_day"
                                            placeholder="请选择模拟结束时间"
                                            
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-divider >外来输入设置</el-divider>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="外来输入时间">
                                            <el-date-picker
                                            v-model="simPars.variant_start_day"
                                            placeholder="请选择输入日期"
                                            
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="外来输入数量">
                                            <el-input v-model.number="simPars.n_import" />
                                        
                                        
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                                <el-divider >连接数设置</el-divider>
                                <el-row>
                                    <el-col :span="6">
                                    <el-form-item label="家庭平均连接">
                                        <el-input v-model.number="simPars.contacts.h"></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="校园平均连接">
                                            <el-input v-model.number="simPars.contacts.s"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="社区平均连接">
                                            <el-input v-model.number="simPars.contacts.c"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="工作平均连接">
                                            <el-input v-model.number="simPars.contacts.w"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        
                    
                
                    
                </el-collapse-item>
                <el-collapse-item title="流行病学参数" name="2">
                    <el-form :model="simPars" label-position="top">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="初始感染人数">
                                        <el-input v-model="simPars.pop_infected" />
                                        </el-form-item>
                                        <el-form-item label="开始时间">
                                        
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="社区总人数">
                                        <el-input v-model="simPars.pop_size" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="网络模型">
                                        <el-input v-model="simPars.pop_type" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                                
                            </el-form>
                </el-collapse-item>
                <el-collapse-item title="防疫措施参数" name="3">
                    <el-form :model="simPars" label-position="top">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="初始感染人数">
                                        <el-input v-model="simPars.pop_infected" />
                                        </el-form-item>
                                        <el-form-item label="初始感染人数">
                                        <el-input v-model="simPars.pop_infected" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="社区总人数">
                                        <el-input v-model="simPars.pop_size" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="网络模型">
                                        <el-input v-model="simPars.pop_type" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                                
                            </el-form>
                </el-collapse-item>
            </el-collapse>
            <div class="button-group">
                <el-button type="success" plain @click="onRun">运行</el-button>
                <!-- <el-button type="primary" plain>取消</el-button> -->
            </div>
            
        
        </el-col>
        <el-col :span="16">
            <el-card shadow="hover" v-loading="loading" element-loading-text="运行中...">
                <div ref="cum_echart" style="height:300px;">
                    <!-- <el-skeleton :rows="8" animated :loading="loading" :throttle="500">
                        <template #template>
                            <el-skeleton-item variant="caption" style="width:200px ;" />
                            <el-skeleton-item variant="image" style="width:400px;height: 250px;margin: auto;" />
                        </template>   
                    </el-skeleton> -->
                </div>
            </el-card>
            <el-card shadow="hover" v-loading="loading" element-loading-text="运行中...">
                <div ref="new_echart" style="height:300px;">
                    <!-- <el-skeleton :rows="8" animated :loading="loading" :throttle="500">
                        <template #template>
                            <el-skeleton-item variant="caption" style="width:200px ;" />
                            <el-skeleton-item variant="image" style="width:400px;height: 250px;margin: auto;" />
                        </template>   
                    </el-skeleton> -->
                </div>
            </el-card>
            <el-card shadow="hover" v-loading="loading" element-loading-text="运行中...">
                
            </el-card>
        </el-col>
    </el-row>
    
        
    <!-- v-model="activeNames" @change="handleChange" -->
   
 
            
   
    
</template>
<script>
import * as Echart from "echarts"

import { getCurrentInstance,onMounted,reactive,ref } from 'vue'
export default {
setup(){
    const {proxy}=getCurrentInstance()
   
    //sim_pars
    const simPars = reactive({
    start_day: '2022-01-01',
    end_day: '2022-02-20',
    pop_infected: 10,
    pop_size: 5000,
    pop_type: 'hybrid',
    contacts: {
        h: 3, 
        c: 36, 
        s: 50, 
        w: 20
    },
    variant_start_day: '2022-02-05',
    n_import: 3
    })

    
    //折线图的配置参数
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
                    trigger:'axis',
                    // formatter:(params)=>{
                    //     return `${xOptions.xAxis.data[params.dataIndex]}: ${params.data}`
                    // }
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
            if(date instanceof Date){
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;

                return year + '-' + month + '-' + day;
            }
            else{
                return date;
            }
                
    }
     //初始化累计和新增折线图
    let cumChart=null
    let newChart=null
    onMounted(()=>{
        cumChart=Echart.init(proxy.$refs["cum_echart"]);
        newChart=Echart.init(proxy.$refs["new_echart"]);
    })
     //图标加载参数
     let loading=ref(false)
    //处理点击运行后的事件
    const onRun=()=>{
        //清空上一轮页面渲染的内容
        if(cumChart)
            cumChart.clear();
        if(newChart)
            newChart.clear();
       
        //打开加载页面动画，保证用户体验
         loading.value=true
         
         //运行提交的执行函数，在提交之前处理日期格式
         simPars.start_day=formatDate(simPars.start_day)
         simPars.end_day=formatDate(simPars.end_day)
         simPars.variant_start_day=formatDate(simPars.variant_start_day)
         console.log(simPars)
         let all_pars={
            sim_pars:simPars,
            epi_pars:"",
            int_pars:""
         }
         proxy.$api.addNewRun(all_pars).then((res)=>{
            //后台获取表格数据
            //console.log(res);
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
            //渲染累计图
           
        //    let cumChart=Echart.init(proxy.$refs["cum_echart"]);
       
            
            cumChart.setOption(xOptions);
            
            
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
            
            // let newChart=Echart.init(proxy.$refs["new_echart"]);
            
            newChart.setOption(xOptions);
            //渲染结束后取消加载动画
            loading.value=false;

         }
         )


         
    }



            

    onMounted(()=>{
        
    })
    return{
        simPars,
        onRun,
        loading
    }

}
}
</script>
<style lang="less" scoped>
.el-card{
    margin:20px;
}
.button-group{
 display: flex;
 justify-content: space-around;
 margin-top: 10px;
 .el-button{
    width: 20%;
    height: 50px;
    font-weight: bold;
    font-size: 16px;
 }
}
.el-form{
    margin:10px 20px;
    
    .el-form-item{
    
    font-weight: bold;
    //width:80px;
    }
}

:deep(.el-collapse-item__header){
    // background-color: #e0e0e0;
    padding-left: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid  #409EFF;
    color:#337ecc;
    background-color: #ecf5ff;
    
}
.el-divider{
    font-size:15px;
}
</style>