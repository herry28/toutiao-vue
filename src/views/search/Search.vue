<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在van-search外层添加form标签，且action不为空，即可在手机输入法中显示搜索按钮 -->
    <form action="/">
        <van-search 
            show-action
            @search='onSearch(searchText)'
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
        @search="onSearch"
     />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-histroy  
        v-else 
        :search-histroies="searchHistroies"
    />
    <!-- /历史记录 -->

    
  </div>
</template>

<script>

import SearchSuggestion from './searchComponents/SearchSuggestion.vue'
import SearchHistroy from './searchComponents/SearchHistroy.vue'
import SearchResult from './searchComponents/SearchResult.vue'
import {setItem,getItem} from '../../utils/storage.js'
import {getSearchHistrois} from '../../api/search.js'
import {mapState} from 'vuex'

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
    searchHistroies:getItem('search-histroies') || [],//搜索历史记录
}
  },
  computed: {
    ...mapState(['user'])
},
  watch: {},
 created () { 
  this.loadSearchHistories()
},
  mounted () { },
  methods: {
    // 触发搜索
    onSearch(searchText){
        // 把输入框设置为要搜索的文本
        this.searchText=searchText

        // 当触发搜索时，记录搜索历史记录
        const index=this.searchHistroies.indexOf(searchText)
        if(index!==-1){//判断是否有重复的，如果有，则删除
            this.searchHistroies.splice(index,1)
        }
        this.searchHistroies.unshift(searchText)//把最新的搜索历史记录放到最前面
        // 如果用户已登录，则把搜索历史记录存储到线上（只要调用了获取搜索结果的数据接口，后端会自动存储用户的搜索历史记录）
        
        // 如果用户未登录，则把搜索历史记录存储到本地
        setItem('search-histroies',this.searchHistroies)

        // 展示搜索结果
        this.isSearchResultShow=true
    },

    // 加载线上的搜索历史记录
    async  loadSearchHistories(){
        // 因为后端存储的搜索历史记录只有4条，所以可以让后端返回的历史记录和本地的合并到一起
       let searchHistroies=getItem('search-histroies') || []
        // console.log(localSearchHistroies)
       if(this.user){//如果用户已登录
            const {data:res} = await getSearchHistrois()
            const onlineSearchHistroies=res.data.keywords
            searchHistroies=[...new Set([...searchHistroies,...onlineSearchHistroies])]
            this.searchHistroies=searchHistroies
        }       
        if(this.searchHistroies){//如果有本地存储，则把本地得到的历史记录合并到线上
            console.log(this.searchHistroies)
        }
    }
  }
}
</script>

<style scoped lang="less">
</style>
