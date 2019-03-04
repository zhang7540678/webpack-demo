import Vue from 'vue';
import App from './App';
import router from './router/index'
//注册全局的vue, 挂载到dom节点app上 
new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
}).$mount("#app")




