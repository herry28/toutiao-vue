import Vue from 'vue'
import Vuex from 'vuex'

import {getItem,setItem} from '../utils/storage.js' 
const USER_KEY='toutiao-user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前登录用户的登录状态（token等数据）
    // user:JSON.parse(window.localStorage.getItem('user'))
    user:getItem(USER_KEY),
    cachePages:['Layout']
  },
  mutations: {
    setUser(state,data){
      state.user=data
      //为了防止页面刷新数据丢失，还需要把数据放到本地存储
      // window.localStorage.setItem('user',JSON.stringify(data))
      setItem(USER_KEY,state.user) //将容器中的数据映射到本地
    },
    addCachePage(state,pageName){//添加缓存页面
      if(!state.cachePages.includes(pageName)){
        state.cachePages.push(pageName)
      }
    },
    removeCachePage(state,pageName){//移除缓存页面
      const index=state.cachePages.indexOf(pageName)
      if(index!==-1){
        state.cachePages.splice(index,1)
      }

    }
    
  },
  actions: {
  },
  modules: {
  }
})
