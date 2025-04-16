import './assets/main.css'
import './style.css';
import router from "/src/router/index.js";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router); // Dùng Vue Router trong ứng dụng
app.config.globalProperties.$axios = axios; // Gán axios vào globalProperties
app.use(createPinia()) // xử lý đăng nhập
app.mount('#app');// Gắn Vue vào <div id="app">
