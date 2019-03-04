<template>
  <div>
    <p>{{ title }}</p>
    <p>text</p>
    <el-button type="primary">按钮</el-button>
  </div>
</template>
<script>
import Request from '../libs/request';
export default {
  data(){
    return {
      title: 'this is a demo!Hello world!'
    }
  },
  created(){
    this.getNoticeList()
    this.getNoticeList()
    this.getNoticeList()
    this.getNoticeList()
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
    }
  }
}
</script>
<style scoped>

</style>

