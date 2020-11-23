<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="app-nav-bar"
    title="标题"
    left-arrow
    @click-left="$router.back()"/>
    <!-- 登录表单 -->
    <van-form 
    ref='userFormRef'
    @failed='onFailed'
    @submit='onLogin' 
    validate-first
    :show-error='false' 
    :show-error-message='false'>
      <van-field
        v-model="user.mobile"
        center
        icon-prefix="toutiao"
        left-icon="shouji"
        :rules="userFormRules.mobile"
        name='mobile'
        placeholder="请输入手机号"/>
      <van-field
        v-model="user.code"
        clearable
        center
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        :rules="userFormRules.code"
        name='code'
        placeholder="请输入验证码">
          <!--发送验证码按钮  -->
          <template #button>
            <van-count-down 
            v-if="isCountDownShow"
            @finish='isCountDownShow=false'
            :time="1000*60" format="ss s" />
            <van-button 
            v-else
            @click.prevent="onSendCode"
            class="send-btn" 
            :loading="isSendCodeLoading"
            size="small" round>发送验证码</van-button>
          </template>
        </van-field>
        <!-- 登录按钮 -->
        <div class="login-btn-wrap">
          <van-button 
          class="login-btn" 
          type="info" block>登录</van-button>
        </div>
    </van-form>
    
   
  </div>
</template>

<script>

import {login,sendCode} from '../../api/user.js'

export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
        //用户信息 
        user:{
          mobile:'13911111111',//手机号
          code:'246810'//验证码
        },
        // 用户表单验证规则
        userFormRules:{
          mobile:[
            {required: true, message: '请输入手机号' },
            {pattern:/^1[3|5|7|8|9]\d{9}$/,message:'手机号格式错误'}
          ],
          code:[
             {required: true, message: '请输入验证码' },
            {pattern:/\d{6}/,message:'验证码格式错误'}
          ]
        },
        // 控制倒计时和发送验证码的显示与隐藏
        isCountDownShow:false,
        // 发送验证码按钮的loading状态
        isSendCodeLoading:false
  }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  // 登录    // 当表单验证成功时触发此函数
   async onLogin(){
     this.$toast.loading({
       message:'登录中。。。',
       forbidClick:true,
       duration:0
     })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try{
        const {data:res}=await login(this.user)
      // 4.处理响应结果
        // console.log(res)
        // console.log(res.data)
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态（token等信息）放到vuex容器中
        this.$store.commit('setUser',res.data)
         
        //  先清除layout的缓存，让它重新渲染
        this.$store.commit('removeCachePage','Layout')
         
         // 登录成功，跳转回原来的页面
         this.$router.back()
      }catch(err){
        this.$toast.fail('登录失败,手机号或验证码错误',err)
      }
    },
    // 当表单验证失败时触发此函数
    onFailed(error){
      if(error.errors[0]){
        this.$toast({
           message:error.errors[0].message,
           position:'top'
        })
      }
    },
    // 点击发送验证码时触发
    async onSendCode(){
      // 校验手机号码
      try{
          await this.$refs.userFormRef.validate('mobile')
           // 验证通过--->请求发送验证码--->用户接收短信--->输入验证码--->请求登录
         this.isSendCodeLoading=true  //展示按钮的loading状态，防止网络慢用户多次触发发送行为
         await sendCode(this.user.mobile)
          // 请求发送验证码--->隐藏发送验证码按钮，显示倒计时
          this.isCountDownShow=true
          // 倒计时结束--->隐藏倒计时，显示发送验证码按钮(通过监听倒计时组件的finish事件)
      }catch(err){
        // try里面的任何代码错误都会进入到catch
        // 不同的错误需要有不同的错误提示，通过判断完成
        let message=''  //错误提示消息
        if(err && err.response && err.response.status===429){
          // console.log(dir(err))
          message='发送太频繁了，请稍后重试'
        }else if(err.name==='mobile'){
          message=err.message
        }else{
          message='发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
           message,
           position:'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的loading状态
      this.isSendCodeLoading=false
    }
  }
}
</script>

<style scoped lang="less" type="text/less">
.login-container{
  .send-btn{
    width:76px;
    height:23px;
    background-color: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border:none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>
