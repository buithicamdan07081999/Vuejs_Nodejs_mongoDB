<template>
  <div class="relative min-h-screen">
    <div class="fixed inset-0 bg-cover bg-center z-0" :style="`background-image: url('${bgImage}')`"></div>
    <div class="fixed inset-0 bg-black bg-opacity-60 z-0"></div>

    <div class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="bg-black bg-opacity-70 p-8 rounded-md w-full max-w-md">
        <h2 class="text-white text-3xl font-semibold mb-6 text-center">Đăng nhập</h2>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <input v-model="email" type="email" placeholder="Email" class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input v-model="password" type="password" placeholder="Mật khẩu" class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />

          <router-link to="/register" class="text-red-400 underline text-sm text-center">Chưa có tài khoản?</router-link>

          <button type="submit" class="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold">
            {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { login as loginAPI } from "@/auth/services/authService"
import Swal from "sweetalert2"

const router = useRouter()
const auth = useAuthStore()
const email = ref("")
const password = ref("")
const isLoading = ref(false)

const bgImage = new URL("@/assets/register.webp", import.meta.url).href

const handleLogin = async () => {
  isLoading.value = true
  try {
    const res = await loginAPI(email.value, password.value)
    const { token, user } = res.data
    auth.login(token, user)
    Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false
    })
    router.push(user.role === 'admin' ? '/admin' : '/profile')
  } catch (err) {
    Swal.fire({ icon: 'error', text: err.response?.data?.message || 'Đăng nhập thất bại' })
  } finally {
    isLoading.value = false
  }
}
</script>
