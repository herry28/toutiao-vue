import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 导入vant组件库
import vant from 'vant'
//导入vant组件库样式
import 'vant/lib/index.css'

// 导入amfe-flexible，自动设置rem基准值（html标签字体大小）
import 'amfe-flexible'


// 加载全局样式（最好放在最后，方便去覆盖第三方样式）
import './style/index.less'



// 全局注册vant
Vue.use(vant)


Vue.config.productionTip = false


// 创建vue根实例，将router、store配置到根实例中
// 把app根组件渲染到#app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
