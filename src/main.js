import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import Axios from 'axios';

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://kouveepetshopapi.smithdev.xyz/index.php/';
// Vue.prototype.$apiUrl = "http://localhost/P3L/kouveepetshop_api/";
Vue.prototype.$apiUrl2 = 'http://kouveepetshopapi.smithdev.xyz/upload/';
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  components: { App },
}).$mount('#app');
