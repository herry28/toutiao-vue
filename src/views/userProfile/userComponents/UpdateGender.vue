<template>
  <div class="update-gender">
    <van-picker 
        show-toolbar
        :columns="columns"
        :default-index="selectedIndex"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        @change="onGenderChange"
    />
  </div>
</template>

<script>

import  {updateUserProfile, getUserProfile} from '../../../api/user.js'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value:{
        type:Number,
        required:true
    }
},
  data () {
    return {
        columns:['男','女'],//展示哪些数据
        selectedIndex:this.value,//被选中的索引
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 当picker组件的选中项发生变化时触发
    onGenderChange(picker,value,index){
        this.selectedIndex=index
    },
    // 当点击完成时触发
    async onConfirm(){
        this.$toast({
            message:'保存中',
            forbidclick:true
        })
        //发请求，修改性别
        await getUserProfile({
            gender:this.selectedIndex
        })
        // 修改成功，修改父组件中的数据
        this.$emit('input',this.selectedIndex)
        // 关闭弹出层
        this.$emit('close')
        // 提示修改成功
        this.$toast.success('性别修改成功')
    }
}
}
</script>

<style scoped lang="less">
</style>
