<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios'
import { useCartStore } from '@/cart/stores/cartStore'
import Swal from 'sweetalert2'

const product = ref({})
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const productId = route.params.id
const selectedQty = ref(1)

const fetchProduct = async () => {
  try {
    const res = await axios.get(`/product/${productId}`)
    product.value = res.data
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error)
  }
}

const addToCart = () => {
  cartStore.addToCart(product.value, selectedQty.value)
  Swal.fire({
    toast: true,
    icon: 'success',
    title: 'Đã thêm vào giỏ hàng',
    timer: 2000,
    showConfirmButton: false
  })
}

const handleBuyNow = () => {
  addToCart()
  router.push({ name: 'CartPage' }) // hoặc CheckoutPage nếu bạn có
}

onMounted(fetchProduct)
</script>

<template>
  <div v-if="product" class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex justify-center items-center shadow-md">
        <img :src="product.image" alt="Hình sản phẩm"
          class="w-full max-w-xs md:max-w-lg h-auto object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105" />
      </div>
      <div class="p-6 rounded-lg shadow-md space-y-5 text-white">
        <h1 class="text-2xl font-bold leading-tight">{{ product.name }}</h1>
        <p class="text-3xl text-red-500 font-bold">
          {{ Number(product.price).toLocaleString('vi-VN') }}₫
        </p>
        <div class="border-t pt-4">
          <p class="text-gray-400">{{ product.description }}</p>
        </div>

        <div class="border-t pt-4 text-sm space-y-2 font-medium">
          <p><span>Danh mục: </span><span class="text-yellow-200">{{ product.category }}</span></p>
        </div>

        <div class="flex items-center space-x-4 mt-4">
          <label for="qty" class="text-white">Số lượng:</label>
          <input v-model="selectedQty" type="number" min="1" class="w-20 text-black px-2 py-1 rounded" />
        </div>

        <button @click="addToCart"
          class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition duration-300">
          Thêm vào giỏ hàng
        </button>
        <button @click="handleBuyNow"
          class="w-full mt-2 bg-green-500 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition duration-300">
          Mua ngay
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center text-white">Sản phẩm không tồn tại!</p>
  </div>
</template>