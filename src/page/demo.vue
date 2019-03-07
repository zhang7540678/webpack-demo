<template>
  <div>
    <p>{{ title }}</p>
    <p>{{ title | toUpper }}</p>
    <p>state: {{ count }}</p>
    <p class='getters'>getters: <b>{{ doubleCount }}</b></p>
    <el-button type="primary" @click="del">按钮-</el-button>
    <el-button type="primary" @click="add({name:'zhang san', age: '13/'})">按钮+</el-button>
  </div>
</template>
<script>
import Request from '@request';
import {mapState, mapGetters, mapActions} from 'vuex';
export default {
  data(){
    return {
      title: 'this is a demo!Hello world!',
    }
  },
  created(){
    this.getNoticeList()
  },
  methods: {
    getNoticeList(){
      Request({
        url: '/api/siteii/getInvestmentList',
        data:{
          pageSize: 10,
          pageNum: 1
        },
        method: 'POST'
      }).then(res => {
        console.log(res)
      })
    },
    ...mapActions([
      'add',
      'del'
    ])
  },
  computed: {
    ...mapState([
      'count'
    ]),
    ...mapGetters([
      'doubleCount'
    ])
  }
}
</script>
<style lang="less" scoped>
  .getters{
    b{
      color: red;
      opacity: 0.5;
    }
  }
</style>

