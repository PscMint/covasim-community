<template>
    <el-row>
        <el-col :span="8">
          <el-drawer v-model="drawer">
            <el-collapse  >
                <!-- 左边：参数面板 -->
                <el-collapse-item title="基本模拟设定" >
                            <el-form v-model="simPars" label-position="top">
                                <el-tabs v-model="activeSim" class="demo-tabs" >
                                    <el-tab-pane label="人口" name="first">
                                        <el-row :gutter="20">
                                            <el-col :span="11">
                                                <el-form-item label="人口总数">
                                                    <el-input v-model.number="simPars.pop_size" />
                                                    </el-form-item>
                                            </el-col>

                                            <el-col :span="11">
                                                <el-form-item label="初始感染人数">
                                                    <el-input v-model.number="simPars.pop_infected" />
                                                    </el-form-item>
                                            </el-col>
                                    </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="网络" name="second">
                                        <el-row>
                                            <el-form-item label="网络模型选择" >
                                                    <el-select @change="handleCommunity" v-model="simPars.pop_type" placeholder="请选择网络模型">
                                                        <el-option label="社区网络模型" value="pro_hybrid" />
                                                        <el-option label="混合网络模型" value="hybrid" />
                                                    </el-select>
                                            </el-form-item>
                                            <el-form-item>

                                                <el-upload
                                                    v-show="showFileInput"

                                                    :http-request="handleUpload"

                                                    :limit="1"
                                                    :on-exceed="handleExceed"
                                                >

                                                    <el-button type="primary">上传居民信息</el-button>
                                                    <template #tip>
                                                    <div class="upload-tip">
                                                        <el-icon  color="#E6A23C"><Warning /></el-icon>
                                                    使用社区网络必须上传社区每一位居民的居住信息，并且模拟人数必须和文件中人数保持一致
                                                    </div>
                                                    </template>
                                                </el-upload>
                                            </el-form-item>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="时间" name="third">
                                        <el-row :gutter="20">
                                            <el-col :span="11">
                                                <el-form-item label="开始时间">
                                                    <el-date-picker
                                                    v-model="simPars.start_day"
                                                    placeholder="请选择模拟开始时间"
                                                    @change="checkTime"

                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="11">
                                                <el-form-item label="结束时间">
                                                    <el-date-picker
                                                    v-model="simPars.end_day"
                                                    placeholder="请选择模拟结束时间"
                                                    @change="checkTime"

                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="连接" name="fourth">
                                        <el-row :gutter="20">
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
                                    </el-tab-pane>
                                    <el-tab-pane label="模式" name="fifth">
                                        <el-row :gutter="20">
                                            <el-col :span="11">
                                                <el-tooltip content="模拟社区人群的自主防疫模式，如佩戴口罩等措施是否积极" placement="bottom-end" effect="dark">
                                                <el-form-item label="防疫模式选择">
                                                    <el-select v-model="simPars.interv_degree" placeholder="请选择防疫模式">

                                                        <el-option label="积极防疫模式" value="positive" />
                                                        <el-option label="消极防疫模式" value="negative" />
                                                    </el-select>
                                                </el-form-item>
                                            </el-tooltip>
                                            </el-col>

                                            <el-col :span="11">
                                                <el-tooltip content="改变病毒的传播率，重症概率等（悲观模式中的各项概率均高于乐观模式）"  placement="right-end"  effect="dark">
                                                <el-form-item label="病毒模式选择">
                                                    <el-select v-model="simPars.epi_degree" placeholder="请选择病毒模式">
                                                        <el-option label="默认模式" value="default" />
                                                        <el-option label="乐观模式" value="optimistic" />
                                                        <el-option label="悲观模式" value="pessimistic" />
                                                    </el-select>

                                                </el-form-item>
                                            </el-tooltip>
                                            </el-col>

                                        </el-row>
                                        <el-row>
                                            <el-col :span="11">
                                                <el-tooltip content="选择老龄化程度不同的人群" placement="right-end" effect="dark">
                                                <el-form-item label="老龄化程度选择">
                                                    <el-select v-model="simPars.old_degree" placeholder="请选择病毒模式">
                                                        <el-option label="默认人群" value="China" />
                                                        <el-option label="60%的60+人群" value="popOld60" />
                                                        <el-option label="70%的60+人群" value="popOld70" />
                                                    </el-select>

                                                </el-form-item>
                                            </el-tooltip>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                </el-tabs>
                                <!-- <el-divider >外来输入设置</el-divider>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="外来输入时间">
                                            <el-date-picker
                                            v-model="simPars.variant_start_day"
                                            placeholder="请选择输入日期"

                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="2"></el-col>
                                    <el-col :span="11">
                                        <el-form-item label="外来输入数量">
                                            <el-input v-model.number="simPars.n_import" />


                                        </el-form-item>
                                    </el-col>
                                </el-row> -->
                            </el-form>
                        </el-collapse-item>
                <el-collapse-item title="流行病学参数" name="2">
                    <el-form :model="epiPars" label-position="top">
                                <el-row :gutter="10">
                                    <el-col :span="11">
                                        <el-tooltip content="开启后以输入的数值模拟为准，若使用选择模式请勿开启">
                                            <el-form-item>
                                                <el-switch  v-model="epiPars.isUseful"
                                                active-text="关闭"
                                                inactive-text="开启"/>
                                            </el-form-item>
                                        </el-tooltip>
                                        <el-form-item  label="病毒传播率">
                                        <el-input  :disabled="!epiPars.isUseful" v-model="epiPars.beta"/>
                                        </el-form-item>
                                        <el-form-item label="相对有症状概率">
                                        <el-input :disabled="!epiPars.isUseful"  v-model="epiPars.symp" />
                                        </el-form-item>
                                        <el-form-item label="相对危重症率">
                                        <el-input :disabled="!epiPars.isUseful"  v-model="epiPars.crit" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">


                                        <el-form-item label="相对重症率">
                                        <el-input :disabled="!epiPars.isUseful" v-model="epiPars.severe" />
                                        </el-form-item>

                                        <el-form-item   label="相对死亡率">
                                        <el-input :disabled="!epiPars.isUseful" v-model="epiPars.death"  />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                </el-collapse-item>
                <el-collapse-item title="防疫措施参数" name="3">
                    <el-tabs style="margin:10px" v-model="activeInt" class="demo-tabs" >
                        <el-tab-pane label="社区传播率设置" name="first">
                            <!-- 添加防疫计划控件 -->
                            <el-form :model="cdisForm" label-position="top">
                                <el-row :gutter="10">
                                <el-col :span="6">
                                    <el-form-item label="开始时间">
                                        <el-input-number
                                        v-model="cdisForm.start"
                                        controls-position="right"
                                    />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="结束时间">
                                        <el-input-number
                                        v-model="cdisForm.end"
                                        controls-position="right"
                                    />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="相对传播率">
                                        <el-input-number
                                        v-model="cdisForm.value"
                                        controls-position="right"
                                        :precision="2"
                                        :step="0.01"
                                    />
                                    </el-form-item>
                                </el-col>
                                <el-tooltip content="开启数值模拟后,以数值模拟为准">
                                    <el-col :span="6" >
                                    <el-button  style="margin-top:30px" type="success" @click="addInterv" plain>添加</el-button>
                                </el-col>
                                </el-tooltip>

                            </el-row>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                    <el-divider border-style="dashed" ></el-divider>
                    <!-- 防疫计划展示表格 -->
                    <el-table :data="intPars.c_distance" style="width: 90%;margin: auto;" v-show="intPars.c_distance.length!=0">
                        <el-table-column prop="start" label="开始" width="90" />
                        <el-table-column prop="end" label="结束" width="90" />
                        <el-table-column prop="value" label="本时间段传播影响因子" width="180" />
                        <el-table-column label="操作">
                            <!-- 使用scope插槽拿到表格的row -->
                            <template #default="scope">
                                <el-button plain type="danger" @click="deleteInterv(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                   <!-- 防疫计划展示甘特图 -->
                    <tiny-gantt
                    :totalDay="days"
                    :tasks="intPars.c_distance"
                    ></tiny-gantt>
                </el-collapse-item>
            </el-collapse>

            <!-- 启动模型模拟 -->
            <div class="button-group">
                <el-button type="success" plain v-debounce="onRun">运行</el-button>
                <!-- <el-button type="primary" plain>取消</el-button> -->
            </div>
          </el-drawer>
        </el-col>
        <!-- 结果展示部分 -->
        <el-col :span="16">
            <!-- 核心数字看板 -->
            <el-card :body-style="{display:'flex'}"  shadow="hover" v-loading="loading" element-loading-text="运行中...">
                <!-- 累计 感染，重症，危重症，死亡 ，治愈-->
                <div  v-for="item in panel" class="panel-block">
                    <div >{{ item.label }}</div>
                    <div  :style="{color:item.color}">{{ item.num }}</div>
                </div>
            </el-card>
            <!-- 图表看板 -->
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
        </el-col>
    </el-row>
</template>

<script>
import * as Echart from "echarts"
import { getCurrentInstance,onMounted,reactive,ref,onUnmounted,defineComponent,defineAsyncComponent} from 'vue'
import { ElMessage } from "element-plus";
const TinyGantt=defineAsyncComponent(()=>import("../components/TinyGantt.vue"))
export default {
components:{
    TinyGantt
},
setup(){
    const drawer = ref(true)
    const {proxy}=getCurrentInstance()
     //工具函数
    //检查输入时间的相对时间正确性
    const checkTime=()=>{
        if(simPars.start_day-simPars.end_day>=0){
            ElMessage({
                message:"模拟天数必须是1天及以上",
                type:'error'
            })
            simPars.start_day=new Date('2022-01-01')
            simPars.end_day=new Date('2022-02-20')
        }
    }
     //计算两个日期包括的天数
     function getDaysBetweenDates(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
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
    //自定义表单字符串转化小数函数
    function toFloatNumber(value) {
            if(typeof value==="number")
            return value;
            // 清除"数字"和"."以外的字符
            value = value.replace(/[^\d.]/g,"");
            // 清除开头的"."
            value = value.replace(/^\./g,"");
            // 将超过两位小数以外的数字替换为字符"."
            value = value.replace(/\.{2,}/g,".");
            // 除了第一个小数点以后，后面的小数点全部替换为空
            value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            // 只能输入六位小数
            value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/,'$1$2.$3');
            //如果没有小数点，首位不能为类似于 01、02的数字
            if(value.indexOf(".")< 0 && value !=""){
                if(value.substr(0,1) == '0' && value.length == 2){
                    value= value.substr(1,value.length);
                }
            }
            return parseFloat(value)
        }

   //响应式对象
   //penal_data（核心数字看板）:
    const panel = reactive({
        cum_infections:{
            label:"累计感染数量",
            num:0,
            color:"#4266BE",
        },
        cum_severe:{
            label:"累计重症数量",
            num:0,
            color:"#c1981d",
        },
        cum_critical:{
            label:"累计危重症数量",
            num:0,
            color:"#FE0302",
        },
        cum_recoveries:{
            label:"累计康复数量",
            num:0,
            color:"#00CD00",
        },
        cum_deaths:{
            label:"累计死亡数量",
            num:0,
            color:"#000000",
        },
})
    //基本模拟tabs控件开关
    let activeSim=ref('first');
    //sim_pars（基本模拟参数）
    const simPars = reactive({
    start_day: new Date('2022-01-01'),
    end_day: new Date('2022-02-20'),
    pop_infected: 10,
    pop_size: 5000,
    pop_type: 'hybrid',
    interv_degree:"negative",//postive|negative
    epi_degree:"default",//optimistic|pessimistic|default
    old_degree:"China",//China|popOld60|popOld70
    contacts: {
        h: 3,
        c: 36,
        s: 50,
        w: 20
    },
    variant_start_day: '2022-02-05',
    // n_import: 0
    })

    //epi_pars（流行病学参数）
    const epiPars=reactive({
        isUseful:ref(true),
        symp:"1.0",
        severe:"1.0",
        crit:"1.0",
        death:"1.0",
        rel_beta:"1.0",
        beta:"0.015"
    })
     //int_pars(防疫参数)
     const intPars={
        c_distance:reactive([])
    }
    //接收添加防疫计划的表单参数
    const cdisForm=reactive(
        {
            start:0,
            end:1,
            value:0.5
        }
    )
    //防疫tabs控件开关
    let activeInt=ref("first")
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

    //方法
    //检验防疫计划输入的时间参数合理性，添加防疫记录
    const addInterv=()=>{
        //根据sim参数计算出设定天数的最大值
        const maxDay=getDaysBetweenDates(simPars.start_day,simPars.end_day)
        //排除非法数值
        if(cdisForm.start>=cdisForm.end||cdisForm.start>maxDay||cdisForm.end>maxDay||cdisForm.start<0||cdisForm.end<0){
            ElMessage({
                message:"时间选择值非法",
                type:"error"
            })
            return;
        }
        //检查重叠时间
        let overlap=false;
        overlap=intPars['c_distance'].some(({start,end})=>{
            return cdisForm.start<=start&&cdisForm.end>=start||
            cdisForm.start>=start&&cdisForm.start<=end

        })
        if(overlap){
                ElMessage({
                    message:"本次时间和之前的防疫措施冲突，请修改",
                    type:"error"
                })
                return;
        }
        //将响应式对象的值读取出来，加入列表中,否则加入响应式会导致数据变动
        const new_interv=Object.assign({},cdisForm)

        intPars['c_distance'].push(new_interv);
        //将表格中的数据按照start升序排列
        intPars['c_distance'].sort((a,b)=>{
            return a.start-b.start;
        })
    }
    //删除防疫措施
    const deleteInterv=(index)=>{
       intPars['c_distance'].splice(index,1);
    }
      //文件上传处理
      const handleUpload=(fileData)=>{
        let {file}=fileData
        //console.log(file)

        // 使用表单数据对象保存文件
        const form = new FormData();
        // 文件对象
        form.append("file", file);

        //发送到后台
       proxy.$api.uploadFile(form).then((res)=>{
        console.log(res)
       })
    }
    //上传数量超标提醒
    const handleExceed=(files)=>{

        ElMessage.warning(
            `本次模拟只能上传一份文件`
        )
    }

     //图标加载参数，配合onRun使用
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
         //修改参数的格式类型
         epiPars.symp=toFloatNumber( epiPars.symp);
         epiPars.severe=toFloatNumber( epiPars.severe);
         epiPars.crit=toFloatNumber( epiPars.crit);
         epiPars.death=toFloatNumber( epiPars.death);
         epiPars.beta=toFloatNumber( epiPars.beta);
         epiPars.rel_beta=toFloatNumber( epiPars.rel_beta);
         console.log(epiPars)
         let all_pars={
            sim_pars:simPars,
            epi_pars:epiPars,
            int_pars:intPars,
         }
         //检查是否打开了精细防疫模拟，如果有，防疫必须选择消极模式
         for(let key in intPars){
            if(intPars[key].length!=0){
                simPars.interv_degree="negative";
                break;
            }
         }
         //在控制台检查前端传参的格式
         //console.log("前端传递的参数集合",all_pars)
         proxy.$api.addNewRun(all_pars).then((res)=>{
            //检查从后台获取一系列表格数据
            //console.log(res);
            //处理后台传入的数据，赋值给echart的对象
            const {panelData,date,cumData,newData}=res;
            //给面板字典赋值
           for(let key in panelData){
            panel[key].num=panelData[key]
           }
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
            xOptions.title.text="日累计数量";
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
            newChart.setOption(xOptions);
            //渲染结束后取消加载动画
            loading.value=false;
         }
         )



    }
    //控制接受收文件的upload是否出现的开关
    let showFileInput=ref(false)
    //触发接受收文件的upload的处理程序
    const handleCommunity=(val)=>{
        if(val=='pro_hybrid'){
            showFileInput.value=true;
        }else if(val=='hybrid'){
            showFileInput.value=false;
        }
    }
    //计算模拟使用的天数，绑定到gantt组件
    const days=getDaysBetweenDates(simPars.start_day-simPars.end_day)
    // const test=[
    //             {start:0,end:10,value:0.5},
    //             {start:11,end:30,value:0.7},
    //             {start:31,end:35,value:0.7},
    //             {start:36,end:40,value:0.8}
    //         ]
     //初始化累计和新增折线图
     let cumChart=null
    let newChart=null
    //添加图表的resize处理程序
    function resizeChart(){
        cumChart.resize();
        newChart.resize();
    }
    onMounted(()=>{
        cumChart=Echart.init(proxy.$refs["cum_echart"]);
        newChart=Echart.init(proxy.$refs["new_echart"]);
        //增加窗口变化的监听器，及时调整echart图大小
        window.addEventListener('resize',resizeChart);
    })
    onUnmounted(()=>{
        //移除监听窗口变化的监听器
        window.removeEventListener('resize',resizeChart);
    })
    return{
        drawer,
        simPars,
        epiPars,
        onRun,
        loading,
        toFloatNumber,
        panel,
        handleCommunity,
        showFileInput,
        handleUpload,
        handleExceed,
        intPars,
        cdisForm,
        addInterv,
        deleteInterv,
        activeInt,
        activeSim,
        days,
        checkTime
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
:deep(.el-card__body){
justify-content: space-around;
.panel-block{
 display: flex;
 flex-direction: column;
 align-items: center;
 font-weight: bold;
 font-size:1rem;
}
}
.upload-tip{
    font-size: 14px;
    font-weight: lighter;
    line-height: 24px;
    color: #aaa;
}

</style>
