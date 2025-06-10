// src/axios.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000
})

// ✅ Gắn token vào header nếu có
instance.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

export default instance