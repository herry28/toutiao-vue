/**
 * 请求模块
 */


 import axios from 'axios'
 // 非组件模块中需手动加载store
import store from '../store/index.js'

 const request=axios.create({
    baseURL:'//ttapi.research.itcast.cn'
   
 })

//  请求拦截器
request.interceptors.request.use(config=>{
   const { user }=store.state
   // 如果用户已登录，统一给接口设置token信息
   if(user){
      config.headers.Authorization=`Bearer ${user.token}`
   }
   return config //处理完必须返回config，否则请求会停在这里
},err=>{
   return Promise.reject(err)
})
// 响应拦截器

//  导出
export default request