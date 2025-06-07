<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
      <!-- Tiêu đề -->
      <h2 class="text-3xl font-bold text-center mb-6 text-blue-600">Thông tin tài khoản</h2>

      <!-- Avatar -->
      <div class="flex justify-center mb-6">
        <img :src="auth.user.avatar || '/images/auth/avatar.webp'" alt="Avatar" class="rounded-full w-36 h-36 object-cover border-4 border-white shadow-lg
         transition-all duration-300 ease-in-out
         hover:scale-125 hover:rotate-3
         hover:shadow-blue-300 hover:ring-4 hover:ring-blue-200
         hover:scale-125 hover:rotate-3 hover:opacity-90 hover:contrast-125" />
      </div>

      <!-- Thông tin người dùng -->
      <div class="space-y-4 text-gray-800 text-lg">
        <div class="flex justify-between">
          <span class="font-semibold">Tên đăng nhập:</span>
          <span>{{ auth.user.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Email:</span>
          <span>{{ auth.user.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Địa chỉ:</span>
          <span>{{ auth.user.address || 'Chưa cập nhật' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Số điện thoại:</span>
          <span>{{ auth.user.phone || 'Chưa cập nhật' }}</span>
        </div>
      </div>

      <!-- Nút cập nhật -->
      <div class="flex justify-center mt-8">
        <button @click="editProfile"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition duration-200">
          Cập nhật thông tin
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useAuthStore()


const editProfile = () => {
  router.push('/profile/edit')
}

</script>