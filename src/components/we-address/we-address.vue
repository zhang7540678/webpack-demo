<template>
  <div class="we-address">
    <div v-if="type != 'cascade'">
      <el-form ref="address" :model="formData">
        <el-form-item :prop="pKey" :rules="[{required: true, message: '请选择省份', trigger: 'change'}]">
          <el-select
            v-model="formData[`${pKey}`]"
            @change="changeProvince"
            :clearable="true">
            <el-option v-for="(item, index) in province" :key="index" :label="item.areaName" :value="item.areaCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :prop="cKey" :rules="[{required: true, message: '请选择市区', trigger: 'change'}]">
          <el-select
            v-model="formData[`${cKey}`]"
            :clearable="true">
            <el-option v-for="(item, index) in mapCity" :key="index" :label="item.cityName" :value="item.cityCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-cascader
        :options="options"
        v-model="area"
        @active-item-change="handleItemChange"
        :props="props"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import store from "@store";
import weAddressStore from './weAddress.store'
import { createNamespacedHelpers } from 'vuex'
import { format } from 'path';

const {mapActions, mapState} = createNamespacedHelpers('weAddress');
export default {
  name: 'weAddress',
  props: {
    value: {
      type: [Object, Array],
      default: () => {
        return {
          province: '',
          city: ''
        }
      }
    },
    type: {
      type: String,
      default: 'default'
    },
    pKey: {
      type: String,
      default: 'privince'
    },
    cKey: {
      type: String,
      default: 'city'
    },
  },
  data() {
    return {
      formData: this.value,
      mapCity: [],
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
    
    //若为cascade模式
    if(this.type == 'cascade'){
      this.area[0] = this.value[this.pKey];
      this.area[1] = this.value[this.cKey];
    }

    //初始化
    let params = {
      provinceId: this.formData[this.pKey],
      type: this.type
    }
    this.getProvince(params);
    if(this.type != 'cascade'){
      this.getCityList(params)
    }
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
    changeProvince(val){
      let vm = this;
      vm.formData[vm.cKey] = '';
      vm.getCityList({
        provinceId: val,
        type: vm.type
      })
    },
    handleItemChange(val){
      let vm = this;
      vm.getCityList({
        provinceId: val[0],
        type: vm.type
      });
    }
  },
  computed: {
    ...mapState([
      'province',
      'city',
      'options'
    ]),
    formCity() {
      return this.formData[this.cKey];
    }
  },
  watch: {
    'formCity': {
      handler: function(val, oldVal){
        let vm = this;
        if(val != oldVal && vm.type != 'cascade'){
          vm.$emit('input', vm.formData)
        }
      },
      deep: true,
    },
    'area': {
      handler: function(val, oldVal){
        let vm = this;
        if(val != oldVal && vm.type == 'cascade'){
          let obj = {};
          obj[vm.pKey] = val[0];
          obj[vm.cKey] = val[1];
          vm.$emit('input', obj)
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
