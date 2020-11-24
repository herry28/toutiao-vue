import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import {Dialog} from 'vant'


Vue.use(VueRouter)

const routes = [
  {
    name:'login',
    path:'/login',
    component:()=>import('../views/login/Login.vue'),
    meta:{requireAuth:false}
  },
  {//一级路由渲染到根组件中的router-view中
    path:'/',
    component:()=>import('../views/layout/Layout.vue'),
    children:[
      {//子路由渲染到父路由的router-view中
        name:'home',
        path:'',//默认子路由
        component:()=>import('../views/home/Home.vue'),
        meta:{requireAuth:false}
      },
      {
        name:'qa',
        path:'/qa',
        component:()=>import('../views/qa/Qa.vue'),
        meta:{requireAuth:false}
      },
      {
        name:'video',
        path:'/video',//默认子路由
        component:()=>import('../views/video/Video.vue'),
        meta:{requireAuth:false}
      },
      {
        name:'my',
        path:'/my',//默认子路由
        component:()=>import('../views/my/My.vue'),
        meta:{requireAuth:false}
      },
    ]
  },
  {
    name:'search',
    path:'/search',
    component:()=>import('../views/search/Search.vue'),
    meta:{requireAuth:false}
  },
  {
    name:'article',
    path:'/article/:articleId',
    component:()=>import('../views/article/Article.vue'),
    props:true,
    meta:{requireAuth:false}
  },
  {
    name:'user-profile',
    path:'/user/profile',
    component:()=>import('../views/userProfile/UserProfile.vue'),
    meta:{requireAuth:false}
  },
  {
    name:'chat',
    path:'/user/chat',
    component:()=>import('../views/chat/Chat.vue'),
    meta:{requireAuth:true}
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to,from,next)=>{
 
  //校验登录状态，提示用户  
  if(to.meta.requireAuth){//判断页面是否需要登录才能访问
     // 如果用户已登录，直接放行
    if(store.state.user){
      return next()
    }
    // 如果用户未登录，提示是否登录
    Dialog.confirm({
      title:'访问提示',
      message:'该功能需要登录才能访问，确认登录吗？'
    }).then(()=>{//确认执行这里
      router.replace({
        name:'login',
        query:{
          redirect:router.currentRoute.fullPath
        }
      })
    }).catch(()=>{//取消执行这里
      // 取消了，终端路由导航
      next(false)
    })
  }else{
    next()//不需要登录状态的页面直接过去
  }
})

export default router
