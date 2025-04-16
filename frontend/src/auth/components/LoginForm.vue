<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 w-100 text-black">
    <form @submit.prevent="handleLogin" class="bg-white p-10 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6">Đăng nhập</h2>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Mật khẩu" class="input" />
      <!-- <button type="submit" class="btn">Đăng nhập</button>
        -->
      <button :disabled="isLoading" type="submit" class="btn">
        {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginAPI } from '@/auth/services/authService'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')

const isLoading = ref(false)
const handleLogin = async () => {
  isLoading.value = true
  try {
    const res = await loginAPI(email.value, password.value)
    const { token, user } = res.data
    auth.login(token, user)
    // router.push(user.role === 'admin' ? '/admin' : '/profile')
    if (user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/profile')
    }

  } catch (err) {
    console.log('Email:', email.value)
    console.log('Password:', password.value)
    console.error('Đăng nhập lỗi:', err)
    console.log('Full response:', err.response)
    alert('Đăng nhập thất bại: ' + (err.response?.data?.message || 'Lỗi không xác định'))
  } finally {
    isLoading.value = false
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