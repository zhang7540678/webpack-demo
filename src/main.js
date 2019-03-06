import Vue from 'vue';
import App from './App';
import router from './router/index';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filterFun from './libs/filter';
import store from './store';

Vue.use(elementUI);
//注册全局filter
Object.keys(filterFun).forEach(key => {
  Vue.filter(key, filterFun[key]);
})

//注册全局的vue, 挂载到dom节点app上 
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app")




