<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Giỏ hàng</h2>

    <div v-for="item in cart.items" :key="item.productId" class="flex justify-between mb-2">
      <div>{{ item.name }} x {{ item.quantity }}</div>
      <div>{{ item.price * item.quantity }} đ</div>
    </div>

    <div class="text-right font-semibold mt-4">Tổng: {{ cart.totalPrice }} đ</div>

    <button @click="handleCheckout"
      class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Đặt hàng
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/useCartStore'
import axios from 'axios'
import Swal from 'sweetalert2'

const cart = useCartStore()

const handleCheckout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!user || !token) {
      Swal.fire('Thông báo', 'Bạn cần đăng nhập trước khi đặt hàng.', 'warning')
      return
    }

    const res = await axios.post('/api/orders', {
      userId: user._id,
      items: cart.items,
      totalPrice: cart.totalPrice
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    Swal.fire('Thành công!', 'Đơn hàng đã được tạo.', 'success')
    cart.clearCart()
  } catch (err) {
    console.error(err)
    Swal.fire('Lỗi', 'Không thể đặt hàng.', 'error')
  }
}
</script>