<template>
  <div class="p-4 text-black max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Cập nhật hồ sơ cá nhân</h2>

    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label class="block">Tên:</label>
        <input v-model="formData.name" type="text" class="input" required />
      </div>
      <div>
        <label class="block">Email:</label>
        <input v-model="formData.email" type="email" class="input" required />
      </div>
      <div>
        <label class="block">Số điện thoại:</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>
      <div>
        <label class="block">Địa chỉ:</label>
        <input v-model="formData.address" type="text" class="input" />
      </div>

      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Lưu thay đổi
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from '@/axios'
import Swal from 'sweetalert2'

const authStore = useAuthStore()

// Tạo formData sao chép từ authStore.user
const formData = ref({
  name: authStore.user?.name || '',
  id: authStore.user?.id || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  address: authStore.user?.address || ''
})

const updateProfile = async () => {
  try {
    const { data } = await axios.put('/user/update/', formData.value.id)
    console.log("Value: ", formData.value.id, formData.value.name)
    // Cập nhật lại user trong authStore
    authStore.setUser(data)

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Cập nhật thành công!',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (err) {
    console.error('Lỗi khi cập nhật:', err)
    Swal.fire('Lỗi', 'Không thể cập nhật hồ sơ.', 'error')
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-2 py-1 w-full;
}
</style>