import Geelist from "./geelist.vue";
import {
  Message,
  Button,
  Tooltip,
  Input,
  Checkbox,
  CheckboxGroup,
  Popover,
  Tag,
  Pagination
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
const GL = {
  install(Vue: any) {
    Vue.component("geelist", Geelist);
    Vue.use(Button);
    Vue.use(Tooltip);
    Vue.use(Input);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Popover);
    Vue.use(Tag);
    Vue.use(Pagination);
  }
};
export default GL;
