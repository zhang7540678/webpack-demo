import Vue from 'vue';
import App from './App';
import router from './router/index';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(elementUI);
//注册全局的vue, 挂载到dom节点app上 
new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
}).$mount("#app")




