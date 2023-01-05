<template>
<el-card shadow="hover" >
    <el-form :model="form" label-width="120px" class="form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</el-card>


  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="password" label="密码" width="180" />
    <el-table-column prop="email" label="邮箱" />
  </el-table>


</template>
<script>

import { isArray } from 'lodash'
import {getCurrentInstance,ref, reactive,onMounted} from 'vue'
export default{
    setup(){
      const {proxy}=getCurrentInstance()
        const form=reactive({
            username:"",
            email:"",
            password:""
        })
        let tableData=ref([])
        const onSubmit=()=>{
         
            proxy.$api.addUser(form).then((res)=>{
            console.log(res)
            
          })
         
        }
        //判断当前的代码环境
        onMounted(()=>{
          //console.log(import.meta.env.MODE)
          
            proxy.$api.getAllUsers().then((res)=>{
            console.log(isArray(res))
            tableData.value=res
          })
        
         
        })
        return{
            form,
            onSubmit,tableData
        }
    }
}
</script>
<style lang="less" scoped>
.el-card{
    padding: 20px 0;
    padding-right: 120px;

}
.form{
 :deep(.el-form-item){
    width: 480px;
 }
}
</style>
