import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
//懒加载路由
const load = function(name){
  return resolve => require([`../page/${name}.vue`], resolve)
}

//定义路由，每个路由映射一个组件
//若要在导航中显示，添加meta属性值
let routes = [
  {path: '/demo', name: 'demo', meta: 'demo', component: load('demo')},
  {path: '/table', name: 'table', meta: '表格', component: load('table/layout'),
    children: [
      {path: '/table1', name: 'table1', meta: '简易表格', component: load('table/table1')},
      {path: '/table2', name: 'table2', meta: '查询表格', component: load('table/table2')},
    ]
  },
  {path: '/address', name: 'address', meta: '地址', component: load('address')},
  {path: '/form', name: 'form', meta: '表单', component: load('form')},
  
]

//注册路由
const router = new VueRouter({
  routes
})

export default router;