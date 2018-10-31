import Geelist from './geelist.vue';
import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
const GL = {
    install(Vue: any) {
        Vue.component(Geelist.name, Geelist);
    }
};
export default GL;
