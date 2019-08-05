import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import Geelist from "../packages/components";
import Vue from "vue";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Geelist);

new Vue({
  render: h => h(App)
}).$mount("#app");
