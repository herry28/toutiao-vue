<template>
  <div class="comment-list">
    <van-cell>全部评论</van-cell>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <comment-item 
            v-for="(comment,index) in commentList" 
            :key="index" :title="comment.content" 
            :comment='comment'
        />
    </van-list>
  </div>
</template>

<script>

import {getComments} from '../../../api/comment.js'

import CommentItem from './CommentItem.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem,
},
  props: {
    source:{
        type:[Number,String,Object],
        required:true
    }
},
  data () {
    return {
        commentList: [],
        loading: false,
        finished: false,
        offset:null,//页码
        limit:10,//每页大小
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad() {
        //  1.请求获取数据
        const {data:res} = await getComments({
            type:'a',//评论类型，a-对文章的评论，c-对评论的回复
            source:this.source,//文章id或评论id
            offset:this.offset,//页码（获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据）
            limit:this.limit,//每页大小
        })
        console.log(res)
        // 2.把数据放到data中
        const {results}=res.data
        this.commentList.push(...results)
        // 3.将本次的loading关闭
        this.loading=false
        // 4.判断是否还有数据
        if(results.length){//若有，更新获取下一页数据的页码；
            this.offset=res.data.last_id
        }else{//若没有，则将finished设置为true，不再触发加载更多
            this.finished=true
        }
     },
  }
}
</script>

<style scoped lang="less">
</style>
