<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 w-100 text-black">
      <form @submit.prevent="handleLogin" class="bg-white p-10 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-6">Đăng nhập</h2>
        <input v-model="email" type="email" placeholder="Email" class="input" />
        <input v-model="password" type="password" placeholder="Mật khẩu" class="input" />
        <button type="submit" class="btn">Đăng nhập</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '@/auth/services/authService' // 👈 import hàm login
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  
  const handleLogin = async () => {
    try {
      const res = await login(email.value, password.value) // 👈 gọi API thật
      
      // Giả sử backend trả về token và user info
      const { token, user } = res.data
  
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
  
      router.push('/admin') // hoặc '/user' nếu user role khác
    } catch (err) {
      alert('Đăng nhập thất bại: ' + err.response.data.message)
    }
  }
  </script>
  
  
  <style scoped>
  .input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .btn {
    width: 100%;
    background-color: black;
    color: white;
    padding: 0.75rem;
    border-radius: 6px;
    font-weight: bold;
  }
  </style>
  