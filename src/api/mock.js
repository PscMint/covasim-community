import Mock from "mockjs";
import userApi from "./mock/user.js"

// 拦截器，拦截mock请求

Mock.mock(/addUser/,'post',userApi.createUser)
