import './assets/main.css'
import './style.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '/src/router/index.js'
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/styles/global.css'
import i18n from './i18n/index.js'


// Khởi tạo Pinia với plugin persisted
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Cấu hình axios
axios.defaults.baseURL = 'http://localhost:5000/api'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)
app.config.globalProperties.$axios = axios

app.mount('#app')
