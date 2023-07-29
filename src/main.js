import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3Toasity, { ToastContainerOptions, toast } from 'vue3-toastify';

import 'vue3-toastify/dist/index.css';
import "./assets/css/tailwind.css"
import "./assets/css/toast.css"

const app = createApp(App).use(store).use(router).use(Vue3Toasity, { autoClose: 3000, position: "top-center" })
app.config.globalProperties.$toast = toast;
app.mount('#app')
// console.log(app);