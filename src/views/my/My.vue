<template>
  <div class="my-container">
    <!--用户信息区域  -->
    <van-cell-group 
      v-if="user"
      class="my-info">
        <van-cell 
        :border="false"
        class="base-info"
         center >
          <van-image 
          class="avatar"
          slot="icon"
          width="50" height="50" 
          round
          fit="cover"
          :src="currentUser.photo" />
          <div slot="title" class="name">{{currentUser.name}}</div>
          <van-button
          class="update-btn" 
            size="small"
            round
            to="/user/profile"
          >编辑资料</van-button>
        </van-cell>     
        <van-grid class='data-info' :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item >
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
        </van-grid>
    </van-cell-group>

    <!-- 未登录时界面 -->
    <div v-else class="not-login">
      <div @click="$router.push({
        name:'login',
        query:{
          redirect:'/my'
        }
      })">
        <img class="mobile" src="./phone.png" alt="">
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <!-- 收藏历史区域 -->
    <van-grid 
    class="nav-grid mb-4"
    :column-num="2">
      <van-grid-item  class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item  class="nav-grid-item" icon="browsing-history-o" text="历史" />
    </van-grid>
    <!--  -->
    <van-cell title="消息通知" is-link to="" />
    <van-cell title="小智同学" is-link to="/user/chat" class="mb-4" />
    <van-cell 
    v-if="user" 
    @click="onLogout"
    title="退出登录" 
    class="logout-cell" />
  </div>
</template>

<script>

import {mapState} from 'vuex'
import {getCurrentUser} from '../../api/user.js'

export default {
  name: 'My',
  components: {},
  props: {},
  data () {
    return {
      // 当前登录用户信息
      currentUser:{}
  }
  },
  computed: {
  ...mapState(['user'])
  },
  watch: {},
  created () { 
    this.loadCurrentUser()
  },
  mounted () { },
  methods: {
    onLogout(){
      // 提示用户确认退出
      this.$dialog.confirm({
        title:'提示退出',
        message:'确认退出吗？'
      }).then(()=>{//确认
        // 清除用户状态
        this.$store.commit('setUser',null)

      }).catch(()=>{//取消

      })

    },
   async loadCurrentUser(){
     const {data:res} = await getCurrentUser()
    //  console.log(res)
     this.currentUser=res.data
    }
  }
}
</script>

<style scoped lang="less">
.my-container{
  .my-info{
    background: url('./banner.png') no-repeat;
    background-size:cover;
    .base-info{
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;
      .avatar{
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border:1px solid #fff;
        margin-right: 11px;
      }
      .name{
        font-size: 15px;
        color:#fff;
      }
      .update-btn{
        height: 16px;
        font-size: 10px;
        color:#666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color:#fff;
        .text-wrap{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count{
          font-size: 18px;
            }
        .text{
          font-size: 11px;
          }
        }  
      }
    }
    
    /deep/.van-grid-item__content{
      background-color: unset;
    }
  }
  .nav-grid{
      .nav-grid-item{
        height: 70px;
        /deep/.van-icon-star-o{
          font-size: 22px;
          color: #eb5253;
        }
        /deep/.van-icon-browsing-history-o{
           font-size: 22px;
           color: #ff9d1d;
        }
      }
       .van-grid-item__text{
          font-size: 14px;
          color:#333;
        }
    }
    .not-login{
      height: 180px;
      background: url('./banner.png') no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile{
        width: 66px;
        height: 66px;
      }
      .text{
        font-size: 14px;
        color: #fff;
      }
    }
    .logout-cell{
      text-align: center;
      color:#d86262;
    }
    .mb-4{
      margin-bottom: 4px;
    }
}
</style>
