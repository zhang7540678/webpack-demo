<template>
  <div class="we-address">
    <!-- <el-form ref="address" :model="formData" :rules="rules">
      <el-form-item prop="province">
        <el-select
          v-model="formData.province"
          @change="changeProvince"
          :clearable="true">
          <el-option v-for="(item, index) in province" :key="index" :label="item.areaName" :value="item.areaCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="city">
        <el-select
          v-model="formData.city"
          :clearable="true">
          <el-option v-for="(item, index) in mapCity" :key="index" :label="item.cityName" :value="item.cityCode"></el-option>
        </el-select>
      </el-form-item>
    </el-form> -->
    <el-cascader
      :options="options"
      v-model="area"
      @active-item-change="handleItemChange"
      :props="props"
    ></el-cascader>
  </div>
</template>

<script>
import store from "@store";
import weAddressStore from './weAddress.store'
import { createNamespacedHelpers } from 'vuex'

const {mapActions, mapState} = createNamespacedHelpers('weAddress');
export default {
  name: 'weAddress',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          province: '',
          city: ''
        }
      }
    }
  },
  data() {
    return {
      formData: this.value,
      mapCity: [],
      rules: {
        province:[{required: true, message: '请选择省份', trigger: 'change'}],
        city:[{required: true, message: '请选择市区', trigger: 'change'}]
      },
      props: {
        children: 'city'
      },
      area: [],
    }
  },
  created(){
    //注册一个动态模块
    if(!store.state.weAddress){
      store.registerModule('weAddress', weAddressStore);
    }
    this.getProvince();
    this.getCityList(this.formData.province)
  },
  methods: {
    ...mapActions([
      "getProvince",
      "getCity"
    ]),
    validate(){
      let vm = this;
      vm.$refs['address'].validate(valid => {
        if(valid){
          return true;
        }else{
          return false;
        }
      })
    },
    getCityList(val){
      let vm = this;
      vm.getCity(val).then(res => {
        vm.mapCity = res;
      })
    },
    changeProvince(){
      let vm = this;
      vm.formData.city = '';
    },
    handleItemChange(val){
      let vm = this;
      vm.getCityList(val[0]);
    }
  },
  computed: {
    ...mapState([
      'province',
      'city',
      'options'
    ]) 
  },
  watch: {
    'formData.province': {
      handler: function(val, oldVal){
        let vm = this;
        if(val != oldVal){
          this.getCityList(val)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="less">
.we-address{
  .el-form-item{
    display: inline-block;
  }
}
</style>
