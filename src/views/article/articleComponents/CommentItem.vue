<template>
  <van-cell class="comment-item">
    <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="comment.aut_photo"
    />
    <div slot="title">
        <div class="title-wrap">
            <div class="name">{{comment.aut_name}}</div>
            <div class="like-wrap"    @click="onCommentLike">
                <van-icon 
                    class="like-icon" 
                    :class="{liked:comment.is_liking}"
                    :name="comment.is_liking?'good-job':'good-job-o'" 
                />
                <span class="like-count">{{comment.like_count}}</span>
            </div>
        </div>
        <div class="content">{{comment.content}}</div>
        <div >
            <span class="pubdate">{{comment.pubdate}}</span>
            <van-button
                class="reply-btn"
                @click="$emit('reply-comment',comment)"
                round
                size="mini"
            >{{comment.reply_count}}回复</van-button>
        </div>
    </div>
  </van-cell>
</template>

<script>

import {addCommentLike,deleteCommentLike} from '../../../api/comment.js'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment:{
        type:Object,
        required:true
    }
},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onCommentLike(){
        const commentId=this.comment.com_id.toString()
        if(this.comment.is_liking){//如果已点赞，取消点赞
            await deleteCommentLike(commentId)
            this.comment.like_count--
        }else{//没有点赞，添加点赞
            await addCommentLike(commentId)
            this.comment.like_count++
        }
        this.comment.is_liking=!this.comment.is_liking//更新视图 
    }
}
}
</script>

<style scoped lang="less">
.comment-item{
    .avatar{
        width: 36px;
        height: 36px;
    }
    .title-wrap{
        display: flex;
        justify-content: space-between;
    }
    .name{
        font-size: 14px;
        color:#406599
    }
    .content{
        font-size: 16px;
        color: rgb(83, 17, 17);
    }
    .pubdate{
        font-size: 10px;
        margin-right: 10px;
    }
    .like-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .like-icon .liked{
        color: #ff69b4;
    }
}
</style>
