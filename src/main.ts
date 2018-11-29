import App from "./App.vue";
import Geelist from "./components";

Vue.config.productionTip = false;
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(Geelist);
new Vue({
  render: h => h(App)
}).$mount("#app");
