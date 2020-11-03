/**
 * 用户相关模块
 */
import request from '../utils/request.js'
// 非组件模块中需手动加载store
// import store from '../store/index.js'

 /**
  * 注册、登录
  */
 export const login=data=>{
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
 }

 /**
  * 发送短信验证码
  */
 export const sendCode=mobile=>{
     return request({
         method:'GET',
         url:`/app/v1_0/sms/codes/${mobile}`
     })
 }

/**
 * 获取登录用户信息
 * */  
export const getCurrentUser=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/user',
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}

/**
 * 获取用户频道列表
 * */  
export const getUserChannels=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/user/channels'
    })
}
