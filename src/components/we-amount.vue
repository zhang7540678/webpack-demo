<template>
  <div>
    <el-input
      v-model="num"
      @blur="blur"
      @focus="focus"
      :style="style"></el-input>
  </div>
</template>

<script>
import * as utils from '@libs/utils';

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
    }
  },
  created() {
    let vm = this;
    vm.isNumber(vm.value);
    vm.num = utils.formatToWangYuan(vm.value);
  },
  methods: {
    isNumber(val) {
      let vm = this;
      //判断是否数字
      if(!utils.isNumber(val)){
        vm.num = '';
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

      const amount = vm.num;
      vm.num = utils.toThousands(vm.num,6,false);

      //万元转换成元
      vm.$emit('input', utils.formatWangToYuan(amount));
    },
    focus() {
      let vm = this;

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

<style>

</style>
