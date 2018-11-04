import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store, { Store } from "./tools/store.js";
import "./assets/reset.css";

Vue.config.productionTip = false;

Vue.use(Store);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
