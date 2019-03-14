<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h2>一般模式：</h2>
        <p>地址数据： {{ area1 }}</p>
        <br>
      </el-col>
      <el-col :span="12">
        <weAddress ref="adr" pKey="province" cKey='city'  v-model="area1" />     
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="validate">地址校验</el-button>
      </el-col>
      <el-col :span="24">
        <h2>级联模式：</h2>
        <p>地址数据： {{ area2 }}</p>
        <br>
      </el-col>
      <el-col :span="24">
        <br>
        <weAddress type="cascade" v-model="area2" pKey="p" cKey='c'/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      area1:{
        province: '1210',
        city: '121000'
      },
      area2:{
        p: '1210',
        c: '121000'
      },
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
