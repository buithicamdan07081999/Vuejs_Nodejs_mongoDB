<script setup>
import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const cartStore = useCartStore()
const router = useRouter()

const cartItems = computed(() => cartStore.items)

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function removeFromCart(productId) {
  cartStore.removeItem(productId)
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: 'Đã xoá khỏi giỏ hàng',
    showConfirmButton: false,
    timer: 1500
  })
}

function checkout() {
  if (!cartItems.value.length) {
    Swal.fire('Giỏ hàng trống', 'Vui lòng thêm sản phẩm trước khi thanh toán', 'warning')
    return
  }
  // Tạm in ra console – sẽ xử lý backend sau
  console.log('Checkout items:', cartItems.value)
  Swal.fire('Đặt hàng thành công!', 'Chúng tôi sẽ xử lý đơn của bạn', 'success')
  cartStore.clearCart()
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">🛒 Giỏ hàng của bạn</h1>

    <div v-if="cartItems.length === 0" class="text-gray-500">
      Giỏ hàng đang trống.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item._id"
        class="flex items-center justify-between border p-4 rounded shadow-sm"
      >
        <div class="flex items-center gap-4">
          <img :src="item.image" class="w-16 h-16 object-cover rounded" />
          <div>
            <h2 class="font-semibold">{{ item.name }}</h2>
            <p class="text-sm text-gray-600">Giá: {{ item.price }}₫</p>
            <p class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</p>
          </div>
        </div>
        <button
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          @click="removeFromCart(item._id)"
        >
          Xoá
        </button>
      </div>

      <div class="text-right text-xl font-bold mt-4">
        Tổng tiền: {{ totalPrice }}₫
      </div>

      <div class="text-right mt-2">
        <button
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          @click="checkout"
        >
          Thanh toán
        </button>
      </div>
    </div>
  </div>
</template>
