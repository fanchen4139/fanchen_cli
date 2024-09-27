import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './routes/index'
import 'ant-design-vue/dist/reset.css'
import {createPinia} from "pinia";

const app = createApp(App)
const store = createPinia()
app.use(Antd).use(router).use(store).use(store)
app.mount('#app')