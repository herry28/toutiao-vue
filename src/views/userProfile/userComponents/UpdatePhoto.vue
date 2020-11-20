<template>
  <div class="update-photo">
    <img class="img" :src="imgUrl" ref="img">
    <van-nav-bar 
        class="toolbar"
        left-text="取消"
        right-text="确认"
        @click-left="$emit('close')"
        @click-right="onConfirm"
    />
  </div>
</template>

<script>

import { updateUserPhoto } from '../../../api/user.js'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    file:{
        required:true
    }
},
  data () {
    return {
        imgUrl:window.URL.createObjectURL(this.file),
        cropper:null,//裁切器实例

    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { 
    const img=this.$refs.img//获取要裁切的图片dom
    this.cropper=new Cropper(img,{
        viewMode:1,
        dragMode:'move',
        aspectRatio:1,
        cropBoxMovable:false,
        cropBoxResizable:false,
        background:false,
        movable:true
    })
},
  methods: {
    // 裁切图片的方法
    getCroppedCanvas(){
        return new Promise(resolve=>{
            this.cropper.getCroppedCanvas().toBlob(file=>{
                resolve(file)
            })
        })
    },

    async onConfirm(){
        this.$toast.loading({
            message:'保存中',
            forbidClick:true,
            duration:0//0表示持续展示
        })
        const file=await this.getCroppedCanvas()
        const fd=new FormData()
        fd.append('photo',file)
        // 请求修改头像的接口
        // const fd=new FormData()
        // fd.append('photo',this.file)
        await updateUserPhoto(fd)
        // 更新父组件中的用户头像
        this.$emit('update-photo',window.URL.createObjectURL(file))
        // 关闭弹出层
        this.$emit('close')
        // 提示修改成功
        this.$toast.success('修改头像成功')
        

    }
}
}
</script>

<style scoped lang="less">
.toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
}
.img{
    display: block;
    min-width: 100%;
}
</style>
