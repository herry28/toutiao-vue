/**
 * 用户相关模块
 */
import request from '../utils/request.js'

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