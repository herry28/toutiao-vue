<template>
  <div class="reply-comment">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`" >
      <van-icon 
        slot="left" 
        name="cross"
        @click="$emit('close')" 
      />
    </van-nav-bar>
    <!-- /头部信息 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->

    <!-- 评论的评论 -->
    <van-cell title="所有回复" />
    <comment-list 
      :source="comment.com_id"
      :comment-list="replyCommentList"
      type='c'
    />
    <!-- /评论的评论 -->
    <!-- 底部 -->
    <div class="article-bottom">
       <van-button
            class="comment-btn"
            @click="isPostShow=true"
            type="default"
            round 
            size="small"   
        >写评论</van-button>
    </div>
    <!-- /底部 -->

    <!-- 回复评论的弹出层 -->
    <van-popup
        v-model="isPostShow"
        position="bottom"
    >
        <!-- 发表回复评论的组件 -->
        <post-comment 
          :target="comment.com_id"
          :article-id="articleId"
          @post-success="onPostSuccess"
        /> 
    </van-popup>
    <!-- /回复评论的弹出层 -->
  </div>
</template>

<script>

import CommentItem from './CommentItem.vue'
import CommentList from './CommentList.vue'
import PostComment from './PostComment.vue'


export default {
  name: 'ReplyComment',
  components: {
    CommentItem,
    CommentList,
    PostComment
},
  props: {
    comment:{
      type:Object,
      required:true
    },
    articleId:{
      type:[Number,String,Object],
      required:true
    }
},
  data () {
    return {
      isPostShow:false,//控制发表评论回复组件弹出层的显示与隐藏
      replyCommentList:[]
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onPostSuccess(comment){
      // 1.将发布成功的回复评论放到回复评论列表的顶部
      this.replyCommentList.unshift(comment)
      // 2.更新回复评论的数量
      this.comment.reply_count++
      // 3.关闭发表评论回复组件弹出层
      this.isPostShow=false
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
    }
</style>
