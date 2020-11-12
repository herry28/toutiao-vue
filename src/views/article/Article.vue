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
            fit="cover"
            round
            size="small"
        >{{articleDetail.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <!-- /文章标题及作者信息 -->

    <!-- 文章正文 -->
    <div 
        class="markdown-body"
        v-html="articleDetail.content"
    >
    </div>
    <!-- /文章正文 -->
  </div>
</template>

<script>

import './github-markdown.css'
import { getArticleById } from '../../api/article.js'


export default {
  name: 'Article',
  components: {},
  props: {
    articleId:{
        type:[String,Number,Object],
        required:true
    }
},
  data () {
    return {
        articleDetail:{},//文章详情信息
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
       console.log(res)
       this.articleDetail=res.data
    }
}
}
</script>

<style scoped lang="less">
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
