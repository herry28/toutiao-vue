/**
 * 请求模块
 */


 import axios from 'axios'
 import {Toast} from 'vant'
 // 非组件模块中需手动加载store
import store from '../store/index.js'
import router from '../router/index.js'

 const request=axios.create({
    baseURL:'//ttapi.research.itcast.cn'
   
 })


 const refreshTokenReq=axios.create({//新建请求refresh_token的请求对象，这样就不会走request请求对象的拦截器
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
request.interceptors.response.use((response)=>{//响应成功进入这里
   return response //必须返回response，否则请求会停在这里
},async (err)=>{//响应失败进入这里
   // 统一处理错误
   const status=err.response.status
   if(status===400){//客户端请求参数错误
      Toast.fail('客户端请求参数错误')
   }else if(status===401){//token无效
      // 如果没有user或user.token，直接去登录
      const {user}=store.state
      if(user || !user.token){
         return  redirectLogin()
      }
      // 如果有refresh_token，则请求获取新的token
      try{
         const {data:res}=await refreshTokenReq({
            method:'PUT',
            url:'/app/v1_0/authorizations',
            headers:{
               Authorization:`Bearer ${user.refresh_token}`
            }
         })
         // 刷新token成功， // 拿到新的token后再把它更新到容器中
         user.token=res.data.token
         store.commit('setUser',user)
         // 把失败的请求再发出去
         return request(err.config)
      }catch(err){
         redirectLogin()// 刷新token失败，直接跳转登录页面  
      }
   }else if(status===403){//没有权限操作
      Toast.fail('没有权限操作')
   }else if(status>=500){//服务端异常
      Toast.fail('服务端异常，请稍后重试')
   }

   return Promise.reject(err)//抛出异常
})

// 跳转到登录页面
function redirectLogin(){
   router.replace({
      name:'login',
      query:{
         redirect:router.currentRoute.fullPath//router.currentRoute和我们在组件中获取的this.$route是一样的
      }
   })
}


//  导出
export default request