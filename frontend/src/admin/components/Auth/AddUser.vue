<template>
  <div class="p-4 text-black">
    <h2 class="text-2xl font-bold mb-4">Tạo người dùng mới</h2>

    <form @submit.prevent="createUser" class="space-y-4">
      <div>
        <label class="block">Tên:</label>
        <input v-model="user.name" type="text" class="input" required />
      </div>

      <div>
        <label class="block">Email:</label>
        <input v-model="user.email" type="email" class="input" required />
      </div>

      <div>
        <label class="block">Mật khẩu:</label>
        <input v-model="user.password" type="password" class="input" required />
      </div>

      <div>
        <label class="block">Số điện thoại:</label>
        <input v-model="user.phone" type="text" class="input" />
      </div>

      <div>
        <label class="block">Địa chỉ:</label>
        <input v-model="user.address" type="text" class="input" />
      </div>

      <!-- ✅ Đổi từ select thành checkbox -->
      <div class="flex items-center space-x-2">
        <label>Admin:</label>
        <input v-model="user.isAdmin" type="checkbox" />
      </div>

      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Tạo người dùng
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()

const user = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  isAdmin: false, // ✅ dùng để chuyển đổi thành role
})

const createUser = async () => {
  try {
    const result = await Swal.fire({
      title: 'Xác nhận tạo người dùng mới?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Tạo',
      cancelButtonText: 'Huỷ'
    })

    if (!result.isConfirmed) return

    const payload = {
      ...user.value,
      role: user.value.isAdmin ? 'admin' : 'user'
    }
    await axios.post('/admin/user/add', payload)

    Swal.fire({
      icon: 'success',
      title: 'Tạo thành công!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    })

    router.push('/admin/user')
  } catch (err) {
    console.error(err)
    Swal.fire('Thất bại', 'Không thể tạo người dùng', 'error')
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-2 py-1 w-full;
}
</style>
