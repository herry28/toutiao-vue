<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell center :border="false">
        <div slot="title" class="channel-title">我的频道</div>
        <van-button 
          @click="isEdit=!isEdit"
          plain
          round
          size="mini"
          type="danger">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item 
            @click="onUserChannelClick(channel,index)"
            :icon="(isEdit && index!=0)?'clear':''"
            class="grid-item"
            :class="{active:index===active}"
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

import {getAllChannels,addUserChannels,deleteUserChannel} from '../../../api/channel.js'
import {mapState} from 'vuex'
import {setItem} from '../../../utils/storage.js'

export default {
  name: 'ChannelEdit',
  components: {
},
  props: {
    myChannels:{
        type:Array,
        required:true
    },
    active:{
        type:Number,
        required:true
    }
},
  data () {
    return {
        allChannels:[],//所有频道数据
        isEdit:false,//控制编辑的显示与隐藏
}
  },
  computed: {
    // 是否登录
    ...mapState(['user']),
     // 推荐频道=所有频道-我的频道
    recommendChannels(){
        return this.allChannels.filter(channel=>{
            // 判断channel是否属于我的频道
           return !this.myChannels.find(myChannel=>{
                return myChannel.id===channel.id//找到满足该条件的元素并返回（即找到了我的频道元素）
            })
        })
    },
},
  watch: {},
  created () {
    this.loadAllChannels()
 },
  mounted () { },
  methods: {
    async loadAllChannels(){
        const {data:res}=await getAllChannels()
        // console.log(res)
        this.allChannels=res.data.channels
    },
    // 添加频道
   async onAdd(channel){
        this.myChannels.push(channel)
        // 数据持久化
        if(this.user){//如果登录了，则数据存储在线上
            await addUserChannels({
                channels:[{
                    id:channel.id,
                    seq:this.myChannels.length
                }]
            })
        }else{//没有登录，则数据存储在本地
            setItem('my-channels',this.myChannels)
        }
    },
    // 删除频道的逻辑
    onUserChannelClick(channel,index){ 
        if(this.isEdit && index!=0){// 如果是编辑状态，删除频道
            this.deleteChannel(index)
        }else{ // 如果非编辑状态，切换频道
            this.switchChannel(index)
        }  
    },
    // 删除频道
   async deleteChannel(channel,index){
        if(index<=this.active){ // 如果删除的是当前激活频道之前的频道，更新激活频道的索引
            this.$emit('update-active',this.active-1)
        }
        this.myChannels.splice(index,1)
        // 数据持久化
        if(this.user){//登录了，持久化到线上
            await deleteUserChannel(channel.id)
        }else{//没有登录，持久化到本地
            setItem('my-channels',this.myChannels)
        }
    },
    // 切换频道
    switchChannel(index){
        // 关闭弹出层
        this.$emit('close')
        // 切换频道
        this.$emit('update-active',index)
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
            position: relative;
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size: 14px;
                color:#222;
                margin-top: 0;
            }

        }
        /deep/.van-grid-item__icon{
            position: absolute;
            right:-5px;
            top: -5px;
            font-size: 20px;
            color: #ccc;
        }
        
    }
    .active{
        /deep/.van-grid-item__text{
             color:red!important;
        }
  }
}
</style>
