<template>
  <div class="el-amount">
    <el-input
      v-model="num"
      @blur="blur"
      @focus="focus"
      :style="style"></el-input>
    <div v-if="tips" class="tips">{{ tips }}</div>
    <p v-if="zn" class="zn">{{zn}}</p>
  </div>
</template>

<script>
import * as utils from '@libs/utils';
import { debug } from 'util';

export default {
  name: 'weAmount',
  props: {
    value: {
      type:[Number, String],
      default: ''
    },
    width: {
      type: String,
      default: '220px'
    }
  },
  data() {
    return {
      num: this.value,
      tips: "",
      zn: ''
    }
  },
  created() {
    let vm = this;
    vm.isNumber(vm.value);
    vm.num = utils.formatToWangYuan(vm.value);
    vm.zn = utils.formatNumToZn(vm.value);
  },
  methods: {
    isNumber(val) {
      let vm = this;
      //判断是否数字
      if(!utils.isNumber(val)){
        vm.num = '';
        vm.zn = '';
        vm.$emit('input', '');
        return false;
      }

      return true;
    },
    blur() {
      let vm = this;
      if(!vm.isNumber(vm.num)){
        return;
      }
      //如果金额值超过兆亿
      if(vm.num>=100000000000000){
        vm.tips = '金额数值过大，超过兆亿';
        vm.$emit('input', '');
        vm.zn='';
        return;
      }

      const amount = vm.num;
      vm.num = utils.toThousands(vm.num,6,false);

      //万元转换成元
      const newNum = utils.formatWangToYuan(amount);
      vm.$emit('input', newNum);
      vm.zn = utils.formatNumToZn(newNum);
    },
    focus() {
      let vm = this;
      vm.tips = '';

      if(!utils.isNull(vm.num)){
        vm.num = vm.num.toString().replace(/\,/g, '');
      }
    }
  },
  computed: {
    style() {
      return{width: `${this.width}`};
    },
    
  },
  watch: {
    num: function(val, oldVal){
      let vm = this;
      if(val != oldVal){
        
      }
    },
    value: function(val, oldVal){
      let vm = this;
      if(val != oldVal){
        vm.isNumber(vm.value);
        vm.num = utils.formatToWangYuan(val);
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-amount{
  position: relative;
  .tips{
    position: absolute;
    top: 10px;
    left: 10px;
    color: #999;
    font-size: 13px;
  }
  .zn{
    font-size: 14px;
    color: #666;
    padding: 3px 5px;
  }
}
</style>
