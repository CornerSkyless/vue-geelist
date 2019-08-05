import Geelist from "./geelist.vue";

const GL = {
  install(Vue: any) {
    Vue.component("geelist", Geelist);
    Vue.component("Geelist", Geelist);
  }
};
export default GL;
