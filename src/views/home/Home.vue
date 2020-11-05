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
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab 
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name">
      <!-- 文章列表 -->
      <article-list :channel='channel'></article-list>
      </van-tab> 
      <!-- 占位元素，用来解决汉堡按钮把最后的元素挡住了 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <!-- 汉堡按钮 -->
      <div slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow=true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup 
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height:100%"
      position="bottom">
      <!-- 频道编辑组件 -->
      <channel-edit :my-channels="channels"/>
      </van-popup>
  </div>
</template>

<script>

import {getUserChannels} from '../../api/user.js'


import ArticleList from './homeComponents/ArticleList.vue'
import ChannelEdit from './homeComponents/ChannelEdit.vue'

export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active:0,  // 控制被激活的标签
      channels:[],// 频道列表
      isChannelEditShow:true,//控制频道编辑页面的显示与隐藏
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
  .channel-tabs{
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line{
      bottom: 20px;
      width: 15px!important;
      height: 3px;
      background:#3296fa;
    }
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    height: 43px;
    width: 33px;
    display:flex ;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .9;
    .van-icon{
      font-size: 24px;
    }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
}
</style>
