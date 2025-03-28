import './assets/main.css'
import './style.css';
import router from './user/router/userRoutes'; // Import Vue Router
import axios from 'axios';
// Cấu hình axios thành global (tất cả component có thể sử dụng mà không cần import lại)
axios.defaults.baseURL = 'http://localhost:5000/api';
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router); // Dùng Vue Router trong ứng dụng
app.config.globalProperties.$axios = axios; // Gán axios vào globalProperties
app.mount('#app');// Gắn Vue vào <div id="app">
