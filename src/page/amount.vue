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
        <p>单位（元）： {{num}}<el-input v-model="num"></el-input></p>
        <br>
        <el-button type="primary" @click="add">num++</el-button>
      </el-col>
      <el-col :span="24">
        <we-amount v-model="num"></we-amount>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 123456789
    }
  },
  methods: {
    add() {
      this.num += 30000000;
    }
  },
  components: {
    weAmount: () => import("@components/we-amount")
  }
}
</script>

<style scoped>

</style>
