import Geelist from "./geelist.vue";

const GL = {
  install(Vue: any) {
    Vue.component('geelist', Geelist);
  }
};
export default GL;
