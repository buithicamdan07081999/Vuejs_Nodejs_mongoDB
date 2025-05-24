<template>
  <div class="flex items-center justify-center min-h-screen w-100 bg-gray-100">
    <form @submit.prevent="handleRegister" class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-black">Đăng ký</h2>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Mật khẩu" class="input" />
      <button type="submit" class="btn">Đăng ký</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleRegister = () => {
  // Gửi API thật sau
  alert('Đăng ký thành công')
  router.push('/login')
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
