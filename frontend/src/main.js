import './assets/main.css'
import './style.css';
import router from './router'; // Import Vue Router

import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App);

app.use(router); // Dùng Vue Router trong ứng dụng
app.mount('#app');
