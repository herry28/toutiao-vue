<template>
  <div id="app">
   <!-- 一级路由出口 ,路由表中的顶层路由都是1级路由-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App'
}
</script>

<style lang="less">
.test{
  font-size: 20px;
}
</style>
