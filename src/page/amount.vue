<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item   >首页</el-breadcrumb-item>
      <el-breadcrumb-item>金额组件</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <h3>金额组件：元与万元之间的转换</h3>
        <br>
        <p>单位（元）：</p> 
        <el-input v-model="num" style="width:220px;"></el-input>
      </el-col>
      <el-col :span="24">
        <br>
        <p>单位（万元）：</p>
        <we-amount v-model="num"></we-amount>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: '10000000000'
    }
  },
  methods: {
   
  },
  components: {
    weAmount: () => import("@components/we-amount")
  }
}
</script>

<style scoped>

</style>
