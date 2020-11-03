<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
      class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small">搜索</van-button>
    </van-nav-bar>
    <!--文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab 
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name">
      <!-- 文章列表 -->
      <article-list :channel='channel'></article-list>
      </van-tab>
      
    </van-tabs>
  </div>
</template>

<script>

import {getUserChannels} from '../../api/user.js'


import ArticleList from './homeComponents/ArticleList.vue'

export default {
  name: 'Home',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active:0,  // 控制被激活的标签
      channels:[]// 频道列表
    }
  },
  computed: {},
  watch: {},
  created () { 
    this.loadChannels()
  },
  mounted () { },
  methods: {
    //获取用户频道列表 
    async loadChannels(){
     const {data:res} = await getUserChannels()
     this.channels=res.data.channels
    //  console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/.van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    border: none;
    background-color: #5babfb;
    .van-button__text{
      font-size: 14px;
    }
    .van-icon{
      font-size: 16px;
    }
  }  
}
</style>
