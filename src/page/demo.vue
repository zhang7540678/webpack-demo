<template>
  <div>
    <p>{{ title }}</p>
    <p>{{ title | toUpper }}</p>
    <p>state: {{ count }}</p>
    <p>getters: {{ doubleCount }}</p>
    <el-button type="primary" @click="del">按钮-</el-button>
    <el-button type="primary" @click="add({name:'zhang san', age: '13'})">按钮+</el-button>
  </div>
</template>
<script>
import Request from '../libs/request';
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
        url: '/qexApi/api/getNews',
        data:{
          pageSize: 6,
          status: 2,
          issueType: 1,
          findType: 'p',
          menuId: 'WS1007',
          pageNum: 1
        }
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
<style scoped>

</style>

