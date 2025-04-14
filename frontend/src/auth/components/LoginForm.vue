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
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  
  const handleLogin = () => {
    if (email.value === 'admin@gmail.com' && password.value === '123456') {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/admin')
    } else {
      alert('Sai tài khoản hoặc mật khẩu')
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
  