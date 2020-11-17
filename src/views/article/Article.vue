<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar 
        class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <div class="article-wrap">
          <!-- 文章标题及作者信息 -->
        <h1 class="title">{{articleDetail.title}}</h1>
        <van-cell center class="user-info">
            <div slot="title" class="name">{{articleDetail.aut_name}}</div>
            <van-image 
                slot="icon"
                class="avatar"
                round
                :src="articleDetail.aut_photo"
            />
            <div slot="label" class="pubdate">{{articleDetail.pubdate}}</div>
            <van-button
                class="follow-btn"
                :type="articleDetail.is_followed ? 'default' : 'info'"
                :icon="articleDetail.is_followed ? '' : 'plus'"
                :loading="isFollowLoading"
                @click="onFollow"
                fit="cover"
                round
                size="small"
            >{{articleDetail.is_followed ? '已关注' : '关注'}}</van-button>
        </van-cell>
        <!-- /文章标题及作者信息 -->

        <!-- 文章正文 -->
        <div 
            ref="article-content"
            class="markdown-body"
            v-html="articleDetail.content"
        >
        </div>
        <!-- /文章正文 -->

        <!-- 文章评论列表 -->
        <comment-list 
            :source="articleId"
            :comment-list="commentList"
            @update-total-count="totalCommentCount=$event"
            @reply-comment="onReplyComment"
        />
        <!-- /文章评论列表 -->
    </div>
  

    <!-- 底部区域 -->
    <article-bottom  
        :article="articleDetail"
        :total-comment-count="totalCommentCount"
        @PostComment="isPostShow=true"
    />
    <!-- /底部区域 -->

    <!-- 发布评论的弹出层 -->
    <van-popup
        v-model="isPostShow"
        position="bottom"
    >
        <!-- 发布评论组件 -->
        <post-comment 
            :target="articleId"
            @post-success="onPostSuccess"
        />
    </van-popup>
    <!-- /发布评论的弹出层 -->

    <!-- 回复评论的弹出层 -->
    <van-popup
        v-model="isReplyShow"
        position="bottom"
    >
        <!-- 回复评论组件 -->
        <reply-comment />
    </van-popup>
    <!-- /回复评论的弹出层 -->
  </div>
</template>

<script>

import './github-markdown.css'
import { getArticleById } from '../../api/article.js'
import { addFollow,deleteFollow } from '../../api/user.js'
import {ImagePreview} from 'vant'

import ArticleBottom from './articleComponents/ArticleBottom.vue'
import CommentList from './articleComponents/CommentList.vue'
import PostComment from './articleComponents/PostComment.vue'
import ReplyComment from './articleComponents/ReplyComment.vue'

export default {
  name: 'Article',
  components: {
    ArticleBottom,
    CommentList,
    PostComment,
    ReplyComment
},
  props: {
    articleId:{
        type:[String,Number,Object],
        required:true
    }
},
  data () {
    return {
        articleDetail:{},//文章详情信息
        isFollowLoading:false,//关注用户按钮的loading状态
        isPostShow:false,//控制发布评论弹出层的显示与隐藏
        commentList:[],//评论列表数据
        totalCommentCount:0,//评论总条数
        isReplyShow:false,//控制回复评论弹出层的显示与隐藏
}
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
 },
  mounted () { },
  methods: {
   async loadArticle(){
      let {data:res} = await getArticleById(this.articleId)
    //    console.log(res)
       this.articleDetail=res.data

        //调用处理图片预览的函数
        this.$nextTick(()=>{
            this.handlePreviewImage()
        }) 
       
    },
    
    //处理图片预览 
    handlePreviewImage(){
         //实现文章图片预览效果：
        // 1.获取文章内容的dom容器
        const articleContent = this.$refs['article-content']
        // console.log(articleContent)
        // 2.得到所有的img标签
        const imgs=articleContent.querySelectorAll('img')
        // console.log(imgs)
        const imgPaths=[]//收集文章中所有图片的路径
        // 3.循环img列表，给img注册点击事件
        imgs.forEach((img,index)=>{
            imgPaths.push(img.src) 
            img.onclick=()=>{// 4.在事件处理函数中调用ImagePreview()预览
                ImagePreview({
                    images:imgPaths,//预览图片的路径列表
                    startPosition:index//起始位置
                })
            }
        })
        
    },

    // 点击关注用户按钮时触发
    async onFollow(){
        this.isFollowLoading=true//展示loading状态
        if(this.articleDetail.is_followed){//如果用户已关注，则取消关注
           await deleteFollow(this.articleDetail.aut_id) //发请求取消关注
        }else{//没有关注，则添加关注
            await addFollow(this.articleDetail.aut_id)//发请求关注
        }
        this.articleDetail.is_followed =!this.articleDetail.is_followed//更新视图
        this.isFollowLoading=false//关闭loading状态
    },
    // 发布评论成功后调用
    onPostSuccess(comment){
        // console.log(comment)
        // 1.把发布成功的评论数据对象放到评论列表顶部
        this.commentList.unshift(comment)
        this.totalCommentCount++ //总的评论数自增1
        // 2.关闭发布评论弹出层
        this.isPostShow=false
    },

    onReplyComment(comment){
        this.isReplyShow=true
        console.log(111,comment)
    }
}
}
</script>

<style scoped lang="less">
.article-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
}
.app-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.title{
    font-size:20px;
    color:#3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.user-info{
    .avatar{
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name{
        font-size: 14px;
        color:#333;
    }
    .pubdate{
        font-size: 10px;
        color: #b4b4b4;
    }
    .follow-btn{
        width: 85px;
        height: 29px;
    }
}

</style>
