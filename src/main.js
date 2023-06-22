import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
import VConsole from "vconsole";

// 实例化 VConsole
const vconsole = new VConsole();
// 可选：在开发环境下自动显示 VConsole
if (process.env.NODE_ENV === "development") {
  vconsole.show();
}
Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
