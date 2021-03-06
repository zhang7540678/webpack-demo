<template>
  <div class='we-table'>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="tableData"
      :border="border"
      width="100%">
      <!-- 个性化 -->
      <slot name='person'></slot>  
      <template v-for="(itemConf, index) in tableConfs">
        <el-table-column
          v-if="!itemConf.filter" 
          :key="index" 
          v-bind="itemConf" 
          :show-overflow-tooltip="true"
          >
          <template slot-scope="{row}">
            <span v-html="row[itemConf.prop]"></span>
          </template>
        </el-table-column>
        <el-table-column 
          v-else 
          :key="index" 
          v-bind="itemConf" 
          :show-overflow-tooltip="true" 
          :formatter="filterFun(itemConf)"
          ></el-table-column>
      </template>  
      <!-- 操作栏 -->
      <slot name='opt'></slot>  
    </el-table>
    <!-- 分页 -->
    <el-pagination
      align="right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pager.page"
      :page-sizes="pager.pageSizes"
      :page-size="pager.pageSize"
      :layout="pager.layout"
      :total="pager.total">
    </el-pagination>
  </div>
</template>
<script>
import Request from '@request';
import Vue from 'vue';

export default {
  name: 'WeTable',
  props: {
    reqUrl: {
      type: String,
      default: ''
    },
    reqData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    reqMethod: {
      type: String,
      default: 'GET'
    },
    /* 
    ** 表达结构配置
    [{
      prop: 'name',
      label: '姓名',
      width: '100px'
    }]
    */
    tableConfs: {
      type: Array,
      default: []
    },
    //动态获取对应数据
    dataMaps: {
      type: Object,
      default: () => {
        return {
          pager: 'pager.total',
          list: 'rows'
        }
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    beforeRender: {
      type: Function,
      default: () => {
        return Promise.resolve()
      }
    },
    pager: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          pageSizes: [5,10,15],
          page: 1,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 0
        }
      }
    }
  },
  data() {
    return {
      tableData: [],
      reqParams:{},
      loading: false
    }
  },
  created() {
    let vm = this;
    vm.getList();
  },
  methods: {
    getList() {
      let vm = this;
      let reqData = {
        pageSize: vm.pager.pageSize,
        pageNum: vm.pager.page
      }
      vm.reqParams = Object.assign(reqData, vm.reqData);
      vm.loading=true;
      Request({
        url: vm.reqUrl,
        method: vm.reqMethod,
        data: vm.reqParams,
        loading: false
      }).then(res => {
        vm.loading=false;
        vm.beforeRender().then(() => {
          //获取列表数据
          vm.tableData = vm.getStrJson(res, vm.dataMaps.list);
          vm.pager.total = vm.getStrJson(res, vm.dataMaps.pager);
        })
      }).catch(err => {
        vm.loading = false;
      })
    },
    getStrJson(obj, str) {
      let arr = str.split('.');
      let newObj = Object.assign({}, obj);
      arr.forEach(item => {
        if(newObj){
          newObj = newObj[item];
        }
      });

      return newObj;
    },
    filterFun(itemConf) {
      let vm = this; 
      let fn = (row, column, cellValue, index) => {
        return Vue.$utils[itemConf.filter](cellValue);
      }

      return fn;
    },
    handleSizeChange(size) {
      let vm = this;
      vm.pager.pageSize = size;
      vm.getList();
    },
    handleCurrentChange(page) {
      let vm = this;
      vm.pager.page = page;
      vm.getList();
    }
  }
}
</script>
<style lang="less" scoped>
  .we-table{
    .cell{
      white-space: nowrap;
    }
    .el-pagination{
      margin-top: 15px;
    }
  }
</style>


