<template>
  <div class="p-4 text-black">
    <h2 class="text-2xl font-bold mb-4">Cập nhật thông tin người dùng</h2>

    <!-- Chỉ hiển thị form khi user đã có dữ liệu -->
    <form v-if="user" @submit.prevent="updateUser" class="space-y-4">
      <div>
        <label class="block">Tên:</label>
        <input v-model="user.name" type="text" class="input" />
      </div>
      <div>
        <label class="block">Email:</label>
        <input v-model="user.email" type="email" class="input" />
      </div>
      <div>
        <label class="block">Số điện thoại:</label>
        <input v-model="user.phone" type="text" class="input" />
      </div>
      <div>
        <label class="block">Địa chỉ:</label>
        <input v-model="user.address" type="text" class="input" />
      </div>
      <div class="flex items-center space-x-2">
        <label>Admin:</label>
        <input v-model="user.isAdmin" type="checkbox" />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Cập nhật</button>
    </form>

    <div v-else class="text-gray-500">Đang tải dữ liệu người dùng...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

const route = useRoute()
const userId = route.params.id
const user = ref(null)

const fetchUser = async () => {
  try {
    const { data } = await axios.get(`/admin/get/user/${userId}`)
    user.value = data
  } catch (error) {
    console.error('Lỗi lấy dữ liệu người dùng:', error)
    Swal.fire('Lỗi', 'Không thể lấy dữ liệu người dùng', 'error')
  }
}

const updateUser = async () => {
  try {
    const res = await axios.put(`/admin/get/user/${userId}`, user.value)
    Swal.fire('Thành công', 'Người dùng đã được cập nhật', 'success')
  } catch (error) {
    console.error('Lỗi cập nhật:', error)
    Swal.fire('Lỗi', 'Không thể cập nhật người dùng', 'error')
  }
}

onMounted(fetchUser)
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-2 py-1 w-full;
}
</style>