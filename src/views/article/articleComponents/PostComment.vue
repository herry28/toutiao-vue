<template>
  <div class="post-comment">
    <van-field
        v-model.trim="message" 
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
    />
    <van-button 
        size="mini"
        @click="onPost"
        :disabled="!message"
    >发布</van-button>
  </div>
</template>

<script>

import {addComment} from '../../../api/comment.js'

export default {
  name: 'PostComment',
  components: {},
  props: {
    target:{//如果发布文章评论，则传递文章id；若发布评论回复，则传递评论id
        type:[Number,String,Object],
        required:true
    },
    articleId:{//如果发布文章评论，则不用传；若发布评论回复，则传递文章id
        type:[Number,String,Object],
        default:null
    }

},
  data () {
    return {
        message:'',//输入框内容
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onPost(){
        this.$toast({
            message:'发布中...',
            forbidClick:true//禁止背景点击
        })
        const {data:res} = await addComment({
            target:this.target.toString(),//评论的目标id
            content:this.message,//评论的内容
            art_id:this.articleId?this.articleId.toString():null,//文章id（对评论内容回复时需要加，对文章进行评论，不需要传此参数）
        })
        // console.log(res)
        // 发布事件
        this.$emit('post-success',res.data.new_obj)
        this.$toast.success('发布成功')//提示发布成功
        this.message=""//清空输入框
    }
}
}
</script>

<style scoped lang="less">
.post-comment{
    display: flex;
    align-items: center;
    padding: 14px;
}
</style>
