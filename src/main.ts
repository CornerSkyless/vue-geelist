import App from "./App.vue";
import Geelist from "./components";

Vue.config.productionTip = false;
import Vue from "vue";
Vue.use(Geelist);
new Vue({
  render: h => h(App)
}).$mount("#app");
