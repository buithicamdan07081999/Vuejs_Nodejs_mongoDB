<template>
  <div class="text-black mt-24 max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4">
    <h2 class="text-xl font-semibold text-center">Đặt lại mật khẩu</h2>

    <form @submit.prevent="handleReset">
      <input v-model="newPassword" type="password" placeholder="Mật khẩu mới" class="input" required />
      <input v-model="confirm" type="password" placeholder="Xác nhận mật khẩu" class="input" required />

      <button type="submit" class="btn-primary w-full">Cập nhật mật khẩu</button>
    </form>

    <p v-if="message" class="text-center text-green-600 mt-2">{{ message }}</p>
    <p v-if="error" class="text-center text-red-500 mt-2">{{ error }}</p>

    <div class="text-center mt-4">
      <router-link to="/admin/user" class="text-blue-600 hover:underline">Quay lại</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

const newPassword = ref('')
const confirm = ref('')
const message = ref('')
const error = ref('')

const handleReset = async () => {
  error.value = ''
  message.value = ''

  if (newPassword.value !== confirm.value) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  try {
    const res = await axios.put(`/admin/user/reset/password/${userId}`, {
      newPassword: newPassword.value,
    })
    message.value = res.data.message

    // Optional: quay về trang login sau 2s
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Lỗi hệ thống'
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md mb-2;
}
.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition;
}
</style>
