<template>
  <div class="pt-10 px-6 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Danh sách sản phẩm</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product._id"
        class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4">
        <img :src="product.image" alt="Hình ảnh" class="w-full h-48 object-cover mb-4 rounded-md" />
        <h3 class="text-lg font-semibold text-gray-900 mb-1 text-center">{{ product.name }}</h3>
        <p class="text-sm text-gray-600 mb-2 text-center">{{ product.description }}</p>
        <p class="text-red-600 font-bold text-center mb-4">Giá: {{ product.price }} VNĐ</p>
        <button @click="deleteProduct(product._id)"
          class="bg-blue-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition duration-200">
          <router-link class="text-white-500 font-bold" :to="'/products/' + product._id">Xem chi tiết</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])

const fetchProducts = async () => {
  try {
    const response = await axios.get('/products')
    products.value = response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
  }
}

onMounted(fetchProducts)

const deleteProduct = async (id) => {
  try {
    await axios.delete(`/products/${id}`)
    alert('Xóa sản phẩm thành công!')
    fetchProducts()
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error)
  }
}
</script>
