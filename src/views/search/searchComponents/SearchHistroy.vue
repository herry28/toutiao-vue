<template>
  <div>
    <van-cell
        title="搜索历史"
    >
        <div>
            <span>全部删除</span>
            &nbsp;&nbsp;
            <span>完成</span>
        </div>
        <van-icon name="delete"/>
    </van-cell>
    <van-cell 
        :title="item"
        v-for="(item,index) in searchHistroies"
        :key="index"
    >
        <van-icon name="close" />
    </van-cell>
   
  </div>
</template>

<script>
export default {
  name: 'SearchHistroy',
  components: {},
  props: {
    searchHistroies:{
        type:Array,
        required:true
    }
},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less">
</style>
