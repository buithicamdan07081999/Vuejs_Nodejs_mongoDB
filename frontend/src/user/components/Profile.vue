<template>
  <div class="max-w-2xl mx-auto p-6 bg-white text-black rounded-xl shadow-md mt-10 mb-10">
    <h2 class="text-2xl font-bold mb-4">Thông tin tài khoản</h2>
    <div class="flex flex-col items-center">
      <!-- Avatar -->
      <div class="w-32 h-32 mb-4">
        <img
          :src="user.avatar || 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/463600900_2830541050455000_1706347478209980915_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE9x_ogescp_k7V9L_rvXDvr1fXkBvnl-SvV9eQG-eX5NWVpXR3iMmQYfDEqcBRNiAlNCaIwjmxAfzGd5Zv-XaN&_nc_ohc=kXejn-3WRrAQ7kNvwELTAQf&_nc_oc=AdmLc3NSn554lhQjDdNBclgppWfGCu8OlQpZj0dYTYjooMxv4MqXuQiWwJSratR4TGM&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=DVtGZEvOL-v1xOX2QNEw0g&oh=00_AfFTN_i74RAUZ-y-lN1ZAA3rMe3KBzqYDmx_PYE4rdi8XA&oe=680946AC'"
          alt="Avatar"
          class="rounded-full w-32 h-32 object-cover"
        />
      </div>

      <!-- Info -->
      <p class="text-lg font-medium">Email: {{ user.email }}</p>
      <p class="text-lg">Vai trò: {{ user.role }}</p>

      <!-- Button -->
      <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="editProfile">
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
