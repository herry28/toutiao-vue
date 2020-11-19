<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar 
        title="修改昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
    />
    <!-- /导航栏 -->

    <!--修改昵称区域  -->
    <div class="edit-name-field">
        <van-field 
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入昵称"
            show-word-limit
        /> 
    </div>
    
    <!--/修改昵称区域  -->
  </div>
</template>

<script>

import  {updateUserProfile} from '../../../api/user.js'

export default {
  name: 'UpdateName',
  components: {},
  props: {
    value:{
        type:String,
        required:true
    }
},
  data () {
    return {
        localName:this.value,//昵称
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onConfirm(){
        // 提示信息
        this.$toast({
            message:'保存中',
            forbidclick:true //禁止背景点击
        })
        try{
             // 请求提交更新用户昵称
            await updateUserProfile({
                name:this.localName
            })
            // 更新成功，修改父组件的name
            this.$emit('input',this.localName)
            // 关闭弹出层
            this.$emit('close')

            // 提示修改成功
            this.$toast.success('昵称修改成功')
        }catch(err){
            if(err && err.response && err.response.status===409){
                this.$toast.fail('昵称已存在')
            }
        }
       
    }
}
}
</script>

<style scoped lang="less">
.edit-name-field{
    padding: 10px;
}
</style>
