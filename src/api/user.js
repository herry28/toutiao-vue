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