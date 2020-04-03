import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Axios from "axios";

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = "http://localhost/kouveepetshop_api/index.php/";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: { App }
}).$mount("#app");
