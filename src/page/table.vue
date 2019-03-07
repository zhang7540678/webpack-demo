<template>
  <div>
    <we-table v-bind="tableProps">
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

export default {
  data() {
    return {
      tableProps: {
        reqUrl: '/api/siteii/getInvestmentList',
        reqMethod: 'POST',
        reqData: {},
        tableConfs:[
          {prop: 'debtor', label: '公司名称'},
          {prop: 'debtorCityCode', label: '地址'},
          {prop: 'issueDate', label: '日期', width: '110px', filter: 'dateFormat'},
          {prop: 'interest', label: '利息', width: '120px'},
          {prop: 'principalInterestTotal', label: '本息和', width: '120px'},
          {prop: 'onlookerWestCnt', label: '围观人数'},
        ],
        dataMaps:{
          pager: 'pager.totalRows',
          list: 'rows'
        }
      }
    }
  },
  create() {

  },
  methods:{
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
