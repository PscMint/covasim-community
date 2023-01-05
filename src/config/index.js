// 环境配置文件
// 当前的环境变量
const env=import.meta.env.MODE|| "prod"
const EnvConfig={
    // 开发环境
    development:{
        baseApi:"http://127.0.0.1:5000",
        mockApi:""
    },
    //测试环境
    test:{
        baseApi:"",
        mockApi:""
    },
    //生产环境
    prod:{
        baseApi:"",
        mockApi:""
    }
}
// 导出当前环境和当前环境定义的接口
export default {
    env,
    mock:true,
    ...EnvConfig[env]
}