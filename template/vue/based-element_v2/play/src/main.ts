import Vue from "vue";
// @ts-ignore
import App from "./App.vue"
import "@element-fc_v2/theme-chalk/src/index.scss"
import ElementFC from "element-fc_v2"
// import {creatOverload} from "packages/utils/overload";

import router from "./router/index.js";

Vue.use(ElementFC)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')