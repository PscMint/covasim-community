<template>
  <el-page-header class="mt-5" :icon="ArrowLeft" >
    <template #content>
      <span class="font-semibold"> Covid-19 SIM Tool
      <el-tag @click="handleTagClick" class="ml-1 cursor-pointer" size="large">参数设置</el-tag>
      </span>
    </template>
  </el-page-header>
  <el-divider/>
    <el-row>
          <el-drawer
              v-model="curStore.state.drawer"
              v-if="!isMobile"
              size="40%"
          >
           <Parameters/>
          </el-drawer>
          <el-dialog
              v-model="curStore.state.drawer"
              v-if="isMobile"
              width="95%"
          >
            <Parameters/>
          </el-dialog>
        <!-- 结果展示部分 -->
        <el-col :span="24">
            <!-- 核心数字看板 -->
            <el-card :body-style="{display:'flex'}"  shadow="hover" v-loading="curStore.state.loading" element-loading-text="运行中...">
                <!-- 累计 感染，重症，危重症，死亡 ，治愈-->
                <div  v-for="item in panel" class="panel-block">
                    <div class="text-xs sm:text-base">{{ item.label }}</div>
                    <div  :style="{color:item.color}">{{ item.num }}</div>
                </div>
            </el-card>
            <!-- 图表看板 -->
            <el-card shadow="hover" v-loading="curStore.state.loading" element-loading-text="运行中...">
                <div ref="cum_echart" style="height:300px;">
                    <!-- <el-skeleton :rows="8" animated :loading="loading" :throttle="500">
                        <template #template>
                            <el-skeleton-item variant="caption" style="width:200px ;" />
                            <el-skeleton-item variant="image" style="width:400px;height: 250px;margin: auto;" />
                        </template>
                    </el-skeleton> -->
                </div>
            </el-card>
            <el-card shadow="hover" v-loading="curStore.state.loading" element-loading-text="运行中...">
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

<script setup>
import * as Echart from "echarts"
import { getCurrentInstance,onMounted,onUnmounted, ref,} from 'vue'
import Parameters from "../components/Parameters.vue";
import {useStore} from 'vuex'
import { ArrowLeft } from '@element-plus/icons-vue'
import {useBasicLayout} from '../hooks/useBasicLayout'

const {isMobile} = useBasicLayout()
const {proxy}=getCurrentInstance()
//初始化累计和新增折线图
let curStore = useStore()
const panel = curStore.state.panel
//添加图表的resize处理程序
const resizeNew = ()=>{
  // console.log(1)
  curStore.commit('resize')
}
const handleTagClick = ()=>{
  curStore.commit('setDrawer',true)
}

onMounted(()=>{
  //初始化echart对象
  curStore.commit('setNewChart',Echart.init(proxy.$refs["new_echart"]))
  curStore.commit('setCumChart',Echart.init(proxy.$refs["cum_echart"]))

  // console.log('?',curStore.state.cumChart)
  //增加窗口变化的监听器，及时调整echart图大小
  window.addEventListener('resize',resizeNew);
})
onUnmounted(()=>{
  //移除监听窗口变化的监听器
  window.removeEventListener('resize',resizeNew);
})
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
