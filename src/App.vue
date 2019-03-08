<template>
  <div id='app'>
    <el-container>
      <el-aside width="230px">
        <WeNav />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    console.log('I`m coming!')
  },
  components: {
    WeNav: () => import('@components/we-nav')
  }
}
</script>
<style scoped lang="css">

</style>
