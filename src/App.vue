<template>
  <div id='app'>
    <router-view></router-view>
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
  }
}
</script>
<style scoped>

</style>
