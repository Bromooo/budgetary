import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3Toasity, { ToastContainerOptions, toast } from 'vue3-toastify';

import 'vue3-toastify/dist/index.css';
import "./assets/css/tailwind.css"
import "./assets/css/toast.css"

const formatNumberWithCommas = (number) => {
  if (typeof number !== "number") {
    return "";
  }

  return '₦' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formatDate = (date) => {
  date = new Date(date)
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const addDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return day + 'th';
    }
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  }

  const formattedDate = `${addDaySuffix(day)} ${month} ${year} `;
  // - ${hour}:${minute}
  return formattedDate;
}


const app = createApp(App).use(store).use(router).use(Vue3Toasity, { autoClose: 3000, position: "top-center" })
app.config.globalProperties.$toast = toast;
app.config.globalProperties.$numberFormat = formatNumberWithCommas;
app.config.globalProperties.$formatDate = formatDate;
app.mount('#app')
// console.log(app);