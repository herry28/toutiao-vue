<template>
  <div id="app">
   <!-- 一级路由出口 ,路由表中的顶层路由都是1级路由-->
    <keep-alive :ixclude="cachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name:'App',
  computed:{
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
.test{
  font-size: 20px;
}
</style>
