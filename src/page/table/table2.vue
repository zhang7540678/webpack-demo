<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>表格</el-breadcrumb-item>
      <el-breadcrumb-item>查询表格</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="tableForm" :model="formData" label-width="130px">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="esInput" label="智能搜索：">
            <el-input v-model="formData.esInput"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <we-table
      v-bind="tableProps" 
      ref="weTable"
      :reqData="formData">
      <template slot="opt">
        <el-table-column
         prop="opt"
         label="操作"
         width="100px"
         fixed="right"
         align="center">
          <template slot-scope="{ row }">
            <el-popover
              placement="left"
              trigger="click"
              >
              <el-button type="primary" size="small" @click="confirm(row)">确定</el-button>
              <el-button type="primary" size="small" @click="cancel(row)">取消</el-button>
              <el-button slot="reference">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </template>
    </we-table>
  </div>
</template>

<script>
const defFormData = () => {
  return {esInput: ''}
}

export default {
  data() {
    return {
      tableProps: {
        reqUrl: '/api/siteii/getInvestmentList',
        reqMethod: 'POST',
        tableConfs:[
          {prop: 'debtor', label: '公司名称'},
          {prop: 'debtorCityCode', label: '地址'},
          {prop: 'issueDate', label: '日期', filter: 'formatDate'},
          {prop: 'interest', label: '利息'},
          {prop: 'principalInterestTotal', label: '本息和'},
          {prop: 'onlookerWestCnt', label: '围观人数'},
        ],
        dataMaps:{
          pager: 'pager.totalRows',
          list: 'rows'
        }
      },
      formData: defFormData()
    }
  },
  created() {
    
  },
  methods:{
    search(){
      let vm = this;
      vm.$refs['weTable'].getList();
    },
    reset() {
      this.formData = defFormData();
      this.$nextTick(() => {
        this.search()
      })
    },
    confirm(row) {
      console.log(row.debtor)
    },
    cancel(row) {
      console.log('cancel')
    }
  },
  components:{
    WeTable: () => import('@components/we-table')
  }
}
</script>

<style>

</style>
