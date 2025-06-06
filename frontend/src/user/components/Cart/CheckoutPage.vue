<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from '@/axios'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const user = ref(null)
const form = ref({
  name: '',
  phone: '',
  address: ''
})

// Nếu chưa login thì redirect
onMounted(async () => {
  if (!authStore.token) {
    router.push('/login')
    return
  }
  const res = await axios.get('/users/profile', {
    headers: { Authorization: `Bearer ${authStore.token}` }
  })
  user.value = res.data
  form.value.name = res.data.username
  form.value.phone = res.data.phone || ''
  form.value.address = res.data.address || ''
})

const handleSubmit = async () => {
  const order = {
    orderItems: [{ product: route.query.productId, qty: 1 }],
    shippingAddress: {
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address
    },
    totalPrice: 1 // → load từ API nếu cần
  }

  const res = await axios.post('/orders', order, {
    headers: { Authorization: `Bearer ${authStore.token}` }
  })

  Swal.fire({
    icon: 'success',
    title: 'Đặt hàng thành công!',
    showConfirmButton: true
  }).then(() => {
    router.push('/my-orders')
  })
}
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h1 class="text-xl font-bold mb-4">Thông tin đặt hàng</h1>
    <input v-model="form.name" placeholder="Tên người nhận" class="input" />
    <input v-model="form.phone" placeholder="Số điện thoại" class="input mt-2" />
    <input v-model="form.address" placeholder="Địa chỉ giao hàng" class="input mt-2" />
    <button @click="handleSubmit" class="btn btn-success mt-4">Xác nhận đặt hàng</button>
  </div>
</template>