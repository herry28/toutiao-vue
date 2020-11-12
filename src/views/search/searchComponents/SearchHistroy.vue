<template>
  <div>
    <van-cell
        title="搜索历史"
    >
        <div v-if="isDeleteShow">
            <span @click="$emit('delete-all-histroies',[])">全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon name="delete"
            v-else 
            @click="isDeleteShow=true"
        />
    </van-cell>
    <van-cell 
        :title="item"
        v-for="(item,index) in searchHistroies"
        :key="index"
        @click="onDelete(item,index)"
    >
        <van-icon name="close"
            v-show="isDeleteShow"
        />
    </van-cell>
   
  </div>
</template>

<script>

// import {setItem} from '../../../utils/storage.js'

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
    return {
        isDeleteShow:false,//控制删除的显示与隐藏
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onDelete(histroy,index){
        if(this.isDeleteShow){//如果是删除状态，则执行删除操作
            this.searchHistroies.splice(index,1)
            //持久化处理
            // 1.修改本地存储的数据
            // setItem('search-histroies',this.searchHistroies)
            // 2.请求接口删除线上的数据(没有合适的接口)
            return 
        }
        //如果是非删除状态，则展示搜索结果
        this.$emit('search',histroy)
    }
}
}
</script>

<style scoped lang="less">
</style>
