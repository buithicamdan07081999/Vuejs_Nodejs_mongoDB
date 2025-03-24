<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);

onMounted(async () => {
  try {
    // const response = await axios.get('/products');
    const response = await axios.get('/products');
    products.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
});
</script>

<template>
  <div>
    <h1>Danh sách sản phẩm</h1>
    <div v-if="products.length === 0">Đang tải...</div>
    <div v-else>
      <div v-for="product in products" :key="product._id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Giá: {{ product.price }} VND</p>
        <router-link :to="'/product/' + product._id">Xem chi tiết</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
