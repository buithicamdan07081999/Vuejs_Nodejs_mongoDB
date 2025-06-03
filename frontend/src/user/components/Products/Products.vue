<template>
  <div class="pt-10 px-6 bg-grey text-white min-h-screen">
    <div class="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
      <input v-model="searchQuery" type="text" placeholder="Tìm theo tên..."
        class="border border-gray-300 rounded px-4 py-2 w-1/3" />
      <select v-model="sortOrder" class="border border-gray-300 rounded px-4 py-2 w-1/3">
        <option value="">Sắp xếp theo giá</option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
      </select>
      <button @click="clearFilters" class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full md:w-auto">
        Xoá bộ lọc
      </button>
    </div>

    <h2 class="text-3xl font-bold mb-8 text-center">Danh sách sản phẩm</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in filteredProducts" :key="product._id"
        class="category-card bg-grey rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4">
        <img :src="product.image" alt="Hình ảnh" class="w-full h-120 object-cover mb-4 rounded-md" />
        <h3 class="text-lg font-semibold mb-1 text-center">{{ product.name }}</h3>
        <p class="text-sm text-gray-500 mb-2 text-center">{{ product.description }}</p>
        <p class="text-red-500 font-bold text-center mb-4">Giá: {{ product.price }} VNĐ</p>
        <button>
          <router-link class="bg-blue-500 hover:bg-blue-800 text-sm px-4 py-2 rounded transition duration-200 text-white-300 font-bold" :to="'/product/' + product._id">Xem chi tiết</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const searchQuery = ref('')
const minPrice = ref('')
const maxPrice = ref('')

const fetchProducts = async () => {
  try {
    const response = await axios.get('/product')
    products.value = response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error)
  }
}

onMounted(fetchProducts)


const clearFilters = () => {
  searchQuery.value = ''
  sortOrder.value = ''
}


const sortOrder = ref('')

const filteredProducts = computed(() => {
  let result = products.value.filter(product => {
    const matchName = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchMinPrice = !minPrice.value || product.price >= Number(minPrice.value)
    const matchMaxPrice = !maxPrice.value || product.price <= Number(maxPrice.value)
    return matchName && matchMinPrice && matchMaxPrice
  })

  if (sortOrder.value === 'asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})


</script>

<style scoped>
.category-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
  text-align: center;
}

</style>