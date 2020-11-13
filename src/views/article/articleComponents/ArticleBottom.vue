<template>
   <div class="article-bottom">
        <van-button
            class="comment-btn"
            type="default"
            round 
            size="small"   
        >写评论</van-button>
        <van-icon
            name="comment-o"
            class="comment-icon"
            info="123"
            color="#777"
        />
        <!-- 收藏文章 -->
         <van-icon 
            @click="onCollect"
            :name="article.is_collected ? 'star':'star-o'"
            :color="article.is_collected ? 'orange':'#777'"
        />
        <van-icon 
            @click="onLike"
            :name="article.attitude===1?'good-job':'good-job-o'"
            :color="article.attitude===1?'hotpink':'#777'"
        />
        <van-icon class="share-icon" name="share" color="#777"></van-icon>
    </div>
</template>

<script>

import {addCollect,deleteCollect,addLike,deleteLike} from '../../../api/article.js'

export default {
  name: 'ArticleBottom',
  components: {},
  props: {
    article:{
        type:Object,
        required:true
    }
},
  data () {
    return {
        isCollectLoading:false,//收藏文章图标的loading状态
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onCollect(){
        this.$toast.loading({
            message:'操作中',
            forbidClick:true//禁止背景点击
        })
        if(this.article.is_collected){//如果文章已收藏，取消收藏
            await deleteCollect(this.article.art_id)
        }else{//文章未收藏，添加收藏
            await addCollect(this.article.art_id)
        }
        this.article.is_collected=!this.article.is_collected//更新视图
        this.$toast.success(`${this.article.is_collected?'':'取消'}收藏成功`)
    },
    async onLike(){
         this.$toast.loading({
            message:'操作中',
            forbidClick:true//禁止背景点击
        })
        if(this.article.attitude===1){//如果文章已点赞，取消点赞
            await deleteLike(this.article.art_id)
            this.article.attitude=-1//更新视图
        }else{//文章未点赞，添加点赞
            await addLike(this.article.art_id)
            this.article.attitude=1//更新视图
        }
        this.$toast.success(`${this.article.attitude===1?'':'取消'}点赞成功`)
    }
    
}
}
</script>

<style scoped lang="less">
.article-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn{
        width: 160px;
    }
    .comment-icon{
        bottom: -2px;
    }
    .van-icon{
        font-size: 20px;
    }
    .share-icon{
        bottom: -2px;
    }
}
</style>
