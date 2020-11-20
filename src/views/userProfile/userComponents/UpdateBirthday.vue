<template>
  <div class="update-birthday">
    <van-datetime-picker 
        v-model="currentDate"
        type="date"
        title="请选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
    />
  </div>
</template>

<script>

import  {updateUserProfile} from '../../../api/user.js'

import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value:{
        type:String,
        required:true
    }
},
  data () {
    return {
        currentDate:new Date(this.value),//当前被选中的日期
        minDate:new Date(2000,0,1),
        maxDate:new Date(),
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 当点击完成时触发
    async onConfirm(){
        this.$toast({
            message:'保存中',
            forbidclick:true
        })
        const date=dayjs(this.currentDate).format('YYYY-MM-DD')
        //发请求，修改性别
        await updateUserProfile({
            birthday:date
        })
        // 修改成功，修改父组件中的数据
        this.$emit('input',date)
        // 关闭弹出层
        this.$emit('close')
        // 提示修改成功
        this.$toast.success('生日修改成功')
    }
}
}
</script>

<style scoped lang="less">
</style>
