<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar 
        class="app-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
        <van-image 
            width="30"
            height="30"
            round
            fit="cover"
            :src="userProfile.photo"
        />
    </van-cell>
    <van-cell 
        title="昵称" 
        :value="userProfile.name" 
        @click="isEditNameShow=true"
        is-link
    />
    <van-cell 
        title="性别" 
        :value="userProfile.gender===0?'男':'女'" 
        @click="isEditGenderShow=true"
        is-link
    />
    <van-cell 
        title="生日" 
        :value="userProfile.birthday" 
        is-link
    />
    <!-- /个人信息 -->

    <!-- 修改昵称的弹出层 -->
    <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{height:'100%'}"
    >
        <update-name 
            @close="isEditNameShow=false"
            v-model="userProfile.name" 
            v-if="isEditNameShow"
        />
        <!-- 当传递给子组件的数据，既要使用又要修改时，可以使用v-model代替 -->
         <!-- @update-name="userProfile.name=$event"
        :name="userProfile.name" -->
    </van-popup>
    <!-- /修改昵称的弹出层 -->

    <!-- 修改性别的弹出层 -->
     <van-popup
        v-model="isEditGenderShow"
        position="bottom"
    >
        <update-gender 
            v-model="userProfile.gender"
            @close="isEditGenderShow=false"
        />
    </van-popup>
    <!-- /修改性别的弹出层 -->

  </div>
</template>

<script>

import {getUserProfile} from '../../api/user.js'

import UpdateName from './userComponents/UpdateName.vue'
import UpdateGender from './userComponents/UpdateGender.vue'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender
},
  props: {},
  data () {
    return {
        userProfile:{},//用户信息
        isEditNameShow:false,//控制修改昵称弹出层的显示与隐藏
        isEditGenderShow:false,//控制修改性别弹出层的显示与隐藏
}
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
 },
  mounted () { },
  methods: {
    async loadUserProfile(){
        const {data:res} = await getUserProfile()
        console.log(res)
        this.userProfile=res.data
   }
}
}
</script>

<style scoped lang="less">
.van-popup{
    background-color: #f5f7f9;
}
</style>
