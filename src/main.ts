import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Store from "./tools/store.js";
import "./assets/reset.css";

Vue.config.productionTip = false;
Vue.prototype.$state = Store.state;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
