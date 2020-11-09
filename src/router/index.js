import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    name:'login',
    path:'/login',
    component:()=>import('../views/login/Login.vue')
  },
  {//一级路由渲染到根组件中的router-view中
    path:'/',
    component:()=>import('../views/layout/Layout.vue'),
    children:[
      {//子路由渲染到父路由的router-view中
        name:'home',
        path:'',//默认子路由
        component:()=>import('../views/home/Home.vue')
      },
      {
        name:'qa',
        path:'/qa',
        component:()=>import('../views/qa/Qa.vue')
      },
      {
        name:'video',
        path:'/video',//默认子路由
        component:()=>import('../views/video/Video.vue')
      },
      {
        name:'my',
        path:'/my',//默认子路由
        component:()=>import('../views/my/My.vue')
      },
    ]
  },
  {
    name:'search',
    path:'/search',
    component:()=>import('../views/search/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
