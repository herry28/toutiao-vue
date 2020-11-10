<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search外层添加form标签，且action不为空，即可在手机输入法中显示搜索按钮 -->
    <form action="/">
        <van-search 
            show-action
            @search='onSearch'
            @cancel='$router.back()'
            @focus=" isSearchResultShow=false"
            v-model="searchText"
        />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result 
        v-if="isSearchResultShow" 
        :search-text="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion 
        v-else-if="searchText"
        :search-text="searchText"
     />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-histroy  v-else />
    <!-- /历史记录 -->

    
  </div>
</template>

<script>

import SearchSuggestion from './searchComponents/SearchSuggestion.vue'
import SearchHistroy from './searchComponents/SearchHistroy.vue'
import SearchResult from './searchComponents/SearchResult.vue'

export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchHistroy,
    SearchResult
},
  props: {},
  data () {
    return {
    searchText:'',//搜索输入框的内容
    isSearchResultShow:false,//控制搜索结果的显示状态
}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onSearch(){
        // 展示搜索结果
        this.isSearchResultShow=true
    }
  }
}
</script>

<style scoped lang="less">
</style>
