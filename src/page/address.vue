<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p>地址数据： {{ area }}</p>
        <br>
      </el-col>
      <el-col :span="12">
        <weAddress ref="adr" v-model="area" />     
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="validate">地址校验</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      area:{
        province: '1210',
        city: '121000'
      }
    }
  },
  created() {
    
  },
  methods: {
    validate(){
      this.$refs['adr'].validate()
    }
  },
  components:{
    weAddress: () => import('@components/we-address')
  }
}
</script>

<style>

</style>
