<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
        <div slot="title" class="channel-title">我的频道</div>
        <van-button 
          plain
          round
          size="mini"
          type="danger">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item 
            class="grid-item"
            v-for="(channel,index) in myChannels"
            :key="index"
            :text="channel.name"/>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell center :border="false">
        <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item 
            @click="onAdd(recChannel)"
            class="grid-item"
            v-for="(recChannel,index) in recommendChannels"
            :key="index"
            :text="recChannel.name"/>
    </van-grid>

  </div>
</template>

<script>

import {getAllChannels} from '../../../api/channel.js'

export default {
  name: 'ChannelEdit',
  components: {
},
  props: {
    myChannels:{
        type:Array,
        required:true
    }
},
  data () {
    return {
        allChannels:[],//所有频道数据
}
  },
  computed: {
     // 推荐频道=所有频道-我的频道
    recommendChannels(){
        return this.allChannels.filter(channel=>{
            // 判断channel是否属于我的频道
           return !this.myChannels.find(myChannel=>{
                return myChannel.id===channel.id//找到满足该条件的元素并返回（即找到了我的频道元素）
            })
        })
    }
},
  watch: {},
  created () {
    this.loadAllChannels()
 },
  mounted () { },
  methods: {
    async loadAllChannels(){
        const {data:res}=await getAllChannels()
        console.log(res)
        this.allChannels=res.data.channels
    },
    onAdd(channel){
        this.myChannels.push(channel)
    }
}
}
</script>

<style scoped lang="less">
.channel-edit{
    padding-top: 54px;
    .channel-title{
        font-size: 16px;
        color:#333;
    }
    .grid-item{
        width: 80px;
        height: 43px;
        /deep/.van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size: 14px;
                color:#222;
            }

        }
        
    }
}
</style>
