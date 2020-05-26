import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
// import Snotify, { SnotifyPosition } from 'vue-snotify';
import Axios from 'axios';

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://kouveepetshopapi.smithdev.xyz/index.php/';
Vue.prototype.$apiUrl2 = 'http://kouveepetshopapi.smithdev.xyz/upload/';
// Vue.prototype.$apiUrl = 'http://localhost/kouveepetshop_api/index.php/';
// Vue.prototype.$apiUrl2 = 'http://localhost/kouveepetshop_api/upload/';
Vue.config.productionTip = false;
// Vue.prototype.$apiUrl = "http://localhost/P3L/kouveepetshop_api/";

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
  components: { App },
}).$mount('#app');
