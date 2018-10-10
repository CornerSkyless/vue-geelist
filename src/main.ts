import Vue from "vue";
import App from "./App.vue";
import Geelist from './components'

Vue.config.productionTip = false;
Vue.use(Geelist);
new Vue({
    render: h => h(App)
}).$mount("#app");
