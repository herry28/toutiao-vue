<template>
  <div class="search-suggestion">
    <van-cell
        icon="search"
        @click="$emit('search',item)"
        v-for="(item,index) in suggestions"
        :key="index"
    >
        <div slot="title" v-html="highlight(item)"></div>
        <van-icon name="close"/>
    </van-cell>
    
  </div>
</template>

<script>

import {getSearchSuggestions} from '../../../api/search.js'

import {debounce} from 'lodash'  //从lodash中按需加载debounce函数

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText:{
        type:String,
        required:true
    }
},
  data () {
    return {
        suggestions:[],//联想建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText:{
        handler:debounce(async function(){
             const {data:res} =  await getSearchSuggestions(this.searchText)//当searchText发生变化时触发 
            //  console.log(res)
             this.suggestions=res.data.options
        },200),
        immediate:true
    //    async handler(){
    //      const {data:res} =  await getSearchSuggestions(this.searchText)//当searchText发生变化时触发 
    //      console.log(res)
    //      this.suggestions=res.data.options
    //    },       
    }
},
  created () { },
  mounted () { },
  methods: {
    // 搜索关键词高亮显示
    highlight(str){
        const reg=new RegExp(this.searchText,'gi')
        const htmlStr=`<span style="color:red">${this.searchText}</span>`
        return str.replace(reg,htmlStr)
    }
}
}
</script>

<style scoped lang="less">
</style>
