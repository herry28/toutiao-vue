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
    <!-- 弹窗选文件 -->
    <input type="file" 
        hidden 
        ref="file"
        accept="image/*"
        @change="onFileChange"
    >
    <!-- 个人信息 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
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
        @click="isEditBirthdayShow=true"
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
        <!-- 修改性别组件 -->
        <update-gender 
            v-model="userProfile.gender"
            @close="isEditGenderShow=false"
        />
    </van-popup>
    <!-- /修改性别的弹出层 -->

    <!-- 修改生日的弹出层 -->
     <van-popup
        v-model="isEditBirthdayShow"
        position="bottom"
    >
        <!-- 修改生日组件 -->
        <update-birthday 
            v-if="isEditBirthdayShow"
            v-model="userProfile.birthday"
            @close="isEditBirthdayShow=false"
        />
    </van-popup>
    <!-- /修改生日的弹出层 -->

    <!-- 修改头像的弹出层 -->
     <van-popup
        class="update-photo-popup"
        v-model="isEditPhotoShow"
        position="bottom"
        :style="{height:'100%'}"
    >
        <!-- 头像预览组件 -->
       <update-photo 
            :file="previewImg" 
            @close="isEditPhotoShow=false"
            @update-photo="userProfile.photo=$event"
       />
    </van-popup>
    <!-- /修改头像的弹出层 -->

  </div>
</template>

<script>

import {getUserProfile} from '../../api/user.js'

import UpdateName from './userComponents/UpdateName.vue'
import UpdateGender from './userComponents/UpdateGender.vue'
import UpdateBirthday from './userComponents/UpdateBirthday.vue'
import UpdatePhoto from './userComponents/UpdatePhoto.vue'

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
},
  props: {},
  data () {
    return {
        userProfile:{},//用户信息
        isEditNameShow:false,//控制修改昵称弹出层的显示与隐藏
        isEditGenderShow:false,//控制修改性别弹出层的显示与隐藏
        isEditBirthdayShow:false,//控制修改生日弹出层的显示与隐藏
        isEditPhotoShow:false,//控制修改头像弹出层的显示与隐藏
        previewImg:null,//上传图片的url
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
        // console.log(res)
        this.userProfile=res.data
   },
    // 当选择文件时触发
   onFileChange(){
        //得到上传的图片对象
        const file=this.$refs.file.files[0]
        this.previewImg=file
       //展示弹出层
       this.isEditPhotoShow=true
       //为了解决相同文件不触发change事件，所以手动的清空file的value
       this.$refs.file.value=""    
   }
}
}
</script>

<style scoped lang="less">
.van-popup{
    background-color: #f5f7f9;
}
.update-photo-popup{
    background-color: #000;
}
</style>
