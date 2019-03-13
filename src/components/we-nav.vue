<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="0"
          :router="true"
          class="el-menu-vertical-demo aside-menu">
          <h5>导航项</h5>
          <!-- <el-submenu index="0">
            <template slot="title">导航一</template>
            <el-menu-item-group>
              <el-menu-item index="0-1">选项1</el-menu-item>
              <el-menu-item index="0-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="1">导航二</el-menu-item> -->
          <template v-for="(item, index) in routes">
            <template v-if="item.meta">
              <el-menu-item v-if="!item.children" :key="index" :index="`${index}`" :route="{name: item.name}">{{item.meta}}</el-menu-item>
              <el-submenu v-else :key="index" :index="`${index}`">
                <template slot="title">{{item.meta}}</template>
                <el-menu-item-group>
                  <el-menu-item v-for="(list, key) in item.children" :key="key" :index="`${index}-${key}`" :route="{name: list.name}">{{ list.meta }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import router from '../router';

export default {
  data() {
    return {
      routes: []
    }
  },
  created() {
    let vm = this;
    vm.routes = router.options.routes;
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
  .aside-menu{
    position: fixed;
    width: 230px;
    top: 0;
    bottom: 0;
    overflow: 0;
  }
</style>
