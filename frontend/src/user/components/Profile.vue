<template>
    <div class="max-w-2xl mx-auto p-6 bg-white text-black rounded-xl shadow-md mt-10 mb-10">
      <h2 class="text-2xl font-bold mb-4">Thông tin tài khoản</h2>
      <div class="flex flex-col items-center">
        <!-- Avatar -->
        <div class="w-32 h-32 mb-4">
          <img
            :src="user.avatar || 'https://via.placeholder.com/150'"
            alt="Avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
  
        <!-- Info -->
        <p class="text-lg font-medium">Email: {{ user.email }}</p>
        <p class="text-lg">Vai trò: {{ user.role }}</p>
  
        <!-- Button: sau này dùng update -->
        <button
          class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="editProfile"
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Dữ liệu mẫu - sau sẽ lấy từ Vuex/store hoặc API
  const user = ref({
    email: 'user@gmail.com',
    role: 'user',
    avatar: '' // sau này cập nhật sau
  })
  
  function editProfile() {
    alert("Tính năng này sẽ cập nhật sau nha 😄")
  }
  </script>
  