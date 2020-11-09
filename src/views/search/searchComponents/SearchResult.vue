<template>
  <div class="search-result">
    <van-list
        v-model="loading"
        :fisished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <van-cell 
            v-for="item in list" 
            :key="item" 
            :title="item"
        />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  components: {},
  props: {},
  data () {
    return {
        loading:false,
        finished:false,
        list:[]
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onLoad(){
        setTimeout(()=>{
            for(let i=0;i<this.list.length;i++){
                this.list.push(this.list.length-1)
            }
            this.loading=false
            if(this.list.length>=40){
                this.finished=true
            }
        },1000)
    }
}
}
</script>

<style scoped lang="less">
.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top:54px ;
    bottom: 0;
    overflow-y: auto;
}
</style>
