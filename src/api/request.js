// 对于axios的二次封装，对每一次的不同请求完成一些固定的相同操作
import axios from "axios";
import config from "../config"
import { ElMessage } from "element-plus";

const NET_ERROR="网络异常，请稍后重试"
// create axios
const service=axios.create({
    //baseURL:config.baseApi
})

service.interceptors.request.use((req)=>{
    // 在请求之前的固定操作，比如：自定义header
    console.log(req)
    return req;
})
service.interceptors.response.use((res)=>{
    // 在请求之后的固定操作，比如：返回res的解构，对状态码进行处理
    const{code,data,msg}=res.data;
    if(code===200)
    return data;
    else{
        ElMessage.error(msg||NET_ERROR);
        // 解释使用promise的原因：响应本身是有的，但是状态码不匹配，需要手动reject
        return Promise.reject(msg||NET_ERROR);
    }
    

})
//返回一个配置好参数的axios对象，主要的目的是将出传入的信息整理一下，传给sevice
function request(options){
    // method default is get
    options.method=options.method||"get";
    options.params=options.data;
   
    // if(options.headers){
    //     const headers=options.headers;
    //     //允许请求自己设定请求头
    //     service.defaults.headers=headers;
    // }
    //设置是否使用mock，config是mock的总开关，代表没有设定或者大体的默认的情况
    //保留每个方法的mock属性，给每个方法选择是否通过mock获取数据，如果单个定义了，那么就会按照单个开启或关闭
    let isMock=config.mock;
    if(options.mock!=="undefined"){
        isMock=options.mock
    }
    //如果是线上的环境，不能给mock的接口
    if(config.env=="prod"){
        service.defaults.baseURL=config.baseApi;
    }else{
        service.defaults.baseURL=isMock?config.mockApi:config.baseApi
    }
    return service(options)
}
export default request