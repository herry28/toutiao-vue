<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--13">{{article.title}}</div>
    <div slot="label">
        <!-- 3张图片区域 -->
        <div class="cover-wrap" v-if="article.cover.type==='3'">
            <div 
             v-for="(img,index) in article.cover.images"
            :key="index"
            class="cover-wrap-item">
                <van-image 
                  class="cover-item"
                  fit="cover"
                  :src="img"/>
            </div>
        </div>
        <!-- 底部文字区域 -->
        <div class="label-wrap">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate | relativeTime}}</span>
        </div>
    </div>
        <!--1张图片区域  -->
         <van-image 
            class="right-cover"
            fit="cover"
            :src="article.cover.images[0]"/>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article:{
        type:Object,
        required:true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { 
    // console.log(this.article)
   },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item{
    .title{
        font-size: 16px;
        color:#3a3a3a;
    }
    /deep/.van-cell__value{
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
        .right-cover{
            width: 116px;
            height:73px;
        }
    }
    .cover-wrap{
        display: flex;
        padding: 15px 0;
        .cover-wrap-item{
            flex: 1;
            height: 73px;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item{
                width: 100%;
                height:73px;
            }
        }     
    }
     .label-wrap{
            color: #b4b4b4;
            font-size: 11px;
            span{
                margin-right: 12px;
            }
        }
}
</style>
