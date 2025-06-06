<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const items = ref([])

const fetchProducts = async () => {
  const res = await axios.get('/product/price')
  items.value = res.data
  console.log('items.value:', items.value)
}

onMounted(fetchProducts)

const emit = defineEmits(['delete'])

const deleteItem = (id) => {
  emit('delete', id)
}
</script>

<template>
  <div class="categories text-white">
    <h2 class="text-2xl font-bold">Danh sách sản phẩm bán chạy</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div v-for="p in items" :key="p._id" class="category-card">
        <img :src="p.image" :alt="p.name" class="category-img" />
        <p class="font-medium">{{ p.name }}</p>
        <p class="text-gray-700 font-medium">{{ p.category }}</p>
        <p class="text-red-500 font-bold">{{ p.price }} VNĐ</p>
        <button @click="deleteItem(p._id)">Xóa</button><br />
        <router-link class="text-blue-500 font-bold" :to="`/product/${p._id}`">Xem chi tiết</router-link>
      </div>
    </div>
  </div>
</template>
