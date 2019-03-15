<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>表单校验</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item prop="name" label="一般属性">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="obj.name" label="对象属性">
        <el-input v-model="formData.obj.name"></el-input>
      </el-form-item>
      <template v-for="(item, index) in formData.arr">
        <el-form-item
          :prop="`arr[${index}].name`" 
          :key="index" 
          :label="`数组属性${index+1}`"
          :rules="formRules.arr">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <el-row>
      <el-col :span="24" align="center">
        <el-button type="primary" @click="check">校验</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        obj: {name: ''},
        arr: [
          {name: ''},
          {name: ''},
        ]
      },
      formRules: {
        name: [{required: true, message: '一般属性必填', trigger: 'blur'}],
        "obj.name": [{required: true, message: '对象属性必填', trigger: 'blur'}],
        "arr": [{required: true, message: '数组属性必填', trigger: 'blur'}],
      }
    }
  },
  methods: {
    check() {
      let _this = this;
      _this.$refs.form.validate(valid => {
        if(valid){
          _this.$message.success('校验通过！');
        }
      })
    }
  }
}
</script>

<style>

</style>
