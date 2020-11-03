<template>
  <div class="article-list">
    <van-pull-refresh 
        v-model="isRefreshLoading"
        :success-text="refreshSuccessText"
        :success-duration="1000"
        @refresh="onRefresh">
        <van-list
            v-model="loading"
            @load="onLoad"
            :finished="finished"
            finished-text="没有更多了">
            <van-cell v-for="(article,index) in articles" :key="index" :title="article.title"></van-cell>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>

import { getArticles } from '../../../api/article.js'

export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel:{
        type:Object,
        required:true
    }
  },
  data () {
    return {
        articles:[], //数据列表
        loading:false,//控制加载中的loading状态
        finished:false, //控制加载结束的状态（当加载完，不再触发加载更多）
        timestamp:null,//获取下一页数据的时间戳
        isRefreshLoading:false,//下拉刷新的loading状态
        refreshSuccessText:''//下拉刷新成功时的提示
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
       async onLoad(){
            // 1.请求获取数据
            const {data:res}=await getArticles({
                channel_id:this.channel.id,
                timestamp:this.timestamp || Date.now(),//相当于页码，
                with_top:1//是否包含置顶(1包含置顶，0不包含置顶)
            })
            // console.log(res)
            // 2.把数据放到articles数组中
            const {results}=res.data
            this.articles.push(...results)
            // 3.设置本次加载状态结束（才可以判断是否需要加载下一次）
            this.loading=false
            // 4.数据全部加载完成
            if(results.length){ // 如果还有数据，更新获取下一页数据的时间戳
               this.timestamp=res.data.pre_timestamp
            }else{//没有数据，将加载状态设置结束，不再触发加载更多
                this.finished=true
            }
        },

        // 当下拉刷新时触发此函数
       async onRefresh(){
            // 下拉刷新时组件自己会展示loading状态
            // 1.请求获取数据
             const {data:res}=await getArticles({
                channel_id:this.channel.id,
                timestamp: Date.now(),//相当于页码，
                with_top:1//是否包含置顶(1包含置顶，0不包含置顶)
            })
            // 2.把数据放到文章列表中（顶部追加）
            const {results}=res.data
            this.articles.unshift(...results)
            // 3.关闭刷新的状态
            this.isRefreshLoading=false
            this.refreshSuccessText=`更新了${results.length}条数据`
        }
    }
}
</script>

<style scoped lang="less">
.article-list{
    position:fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom:50px ;
    overflow-y: auto;

}
</style>
