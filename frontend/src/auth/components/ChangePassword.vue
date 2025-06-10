<template>
  <div class="p-4 max-w-xl mx-auto text-black">
    <h2 class="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
    <form @submit.prevent="changePassword" class="space-y-4">
      <input type="email" name="username" autocomplete="username" :value="userEmail" readonly hidden />
      <div>
        <label>Mật khẩu hiện tại:</label>
        <input v-model="currentPassword" type="password" name="currentPassword" class="input" required
          autocomplete="current-password" />
      </div>
      <div>
        <label>Mật khẩu mới:</label>
        <input v-model="newPassword"
        type="password"
        name="newPassword"
        class="input"
        required
        autocomplete="new-password"
        />
      </div>
      <div>
        <label>Xác nhận mật khẩu mới:</label>
        <input v-model="confirmPassword" type="password" name="confirmPassword" class="input" required
          autocomplete="new-password" />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Cập nhật mật khẩu
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const userEmail = authStore.user?.email || ''

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const router = useRouter()

const changePassword = async () => {
  console.log('Input:', {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value
  })

  if (newPassword.value.length < 6) {
    Swal.fire('Lỗi', 'Mật khẩu mới phải ít nhất 6 ký tự.', 'error')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    Swal.fire('Lỗi', 'Mật khẩu xác nhận không khớp.', 'error')
    return
  }

  try {
    const res = await axios.post('/user/profile/change/password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    })

    console.log('Server trả về:', res.data)

    Swal.fire({
      icon: 'success',
      title: 'Đổi mật khẩu thành công!',
      toast: true,
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false
    })

    router.push('/profile')
  } catch (err) {
    console.error('Lỗi khi gửi đổi mật khẩu:', err)
    Swal.fire('Lỗi', err.response?.data?.message || 'Đổi mật khẩu thất bại.', 'error')
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-2 py-1 w-full;
}
</style>