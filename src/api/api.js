// 对整个项目api的管理，所有的数据请求方法集合在该对象中，该对象绑定到vue的全局
import request from "./request"
export default{
    
    addUser(params){
        return request({
            url:"/addUser",
            mock:false,
            method:"post",
            data:params
        })
    },
    getAllUsers(){
        return request({
            url:"/getUsers",
            mock:false,
            method:"get",
            
        })
    },
    getSimRes(){
        return request({
            url:"/sim_res",
            mock:false,
            method:"get"
        })
    }
}
