<template>
  <div class="max-w-2xl mx-auto p-6 bg-white text-black rounded-xl shadow-md mt-10 mb-10">
    <h2 class="text-2xl font-bold mb-4">Thông tin tài khoản</h2>

    <div class="flex flex-col items-center">
      <!-- Avatar -->
      <div class="w-32 h-32 mb-4">
        <img :src="profile.avatar || '/default-avatar.png'" alt="Avatar" class="rounded-full w-32 h-32 object-cover" />
      </div>

      <!-- Info -->
      <p class="text-lg font-medium">Tên đăng nhập: {{ auth.user.name }}</p>
      <p class="text-lg font-medium">Email: {{ auth.user.email }}</p>
      <p class="text-lg font-medium">Address: {{ auth.user.address }}</p>
      <p class="text-lg font-medium">Phone: {{ auth.user.phone }}</p>
      <!-- Button -->
      <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="editProfile">
        Cập nhật
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const auth = useAuthStore()
const profile = ref({})

const fetchProfile = async () => {
  try {
    const response = await axios.get(`/user/profile`)
    profile.value = response.data
  } catch (error) {
    console.error('Lỗi khi lấy profile:', error)
  }
}

onMounted(fetchProfile)

function editProfile() {
  alert("Tính năng này sẽ cập nhật sau nha 😄")
}
</script>