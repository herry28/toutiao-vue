<template>
  <div class="chat">
    <!--导航栏  -->
    <van-nav-bar 
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!--/导航栏 -->

    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell :title="item.msg" 
        v-for="(item,index) in messages"
       :key="index" 
      />
    </van-cell-group>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-msg-wrap">
      <van-field 
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      />
      <van-button 
        size="small" 
        type="primary"
        @click="onSend"
      >发送</van-button>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>

import io from 'socket.io-client'
import {setItem,getItem} from '../../utils/storage.js'

export default {
  name: 'Chat',
  components: {},
  props: {},
  data () {
    return {
      message:'',//输入的消息
      socket:null,//请求对象
      messages:getItem('msg') || [],//展示的消息列表
}
  },
  computed: {},
  watch: {
    messages(){
      setItem('msg',this.messages)
      this.$nextTick(()=>{//当数据改变时需要立即操作数据所影响的dom时需要放到nextTick函数中
        this.scrollToBottom()
      })
    }
},
  created () { 
     const socket=io('http://ttapi.research.itcast.cn/') //建立连接
     this.socket=socket
     socket.on('connect',()=>{console.log('连接建立成功了')})
     socket.on('disconnect',()=>{console.log('断开连接了')})
     socket.on('message',data=>{//接收服务端消息
        this.messages.push(data)//将服务端返回的消息存储到数组中
     })
},
  mounted () {
    this.scrollToBottom()
 },
  methods: {
    onSend(){
      const data={
        msg:this.message,
        timestamp:Date.now()
      }
      this.socket.emit('message',data)
      this.messages.push(data)//将用户发送出去的消息存储到数组中
      this.message=''//清空输入框
    },
    scrollToBottom(){
      const list=this.$refs['message-list']
      list.scrollTop=list.scrollHeight
    }
  }
}
</script>

<style scoped lang="less">
.message-list{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 44px;
  top: 46px;
  overflow-y: auto;
}
.send-msg-wrap{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
</style>
