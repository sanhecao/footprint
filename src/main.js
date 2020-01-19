import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$echarts=echarts;
Vue.prototype.$axios=axios;
Vue.config.productionTip = false;

new Vue({
  mode: 'history',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
