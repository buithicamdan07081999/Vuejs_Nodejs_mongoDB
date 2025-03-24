<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const products = ref([]);
const router = useRouter();

// Hàm lấy danh sách sản phẩm từ API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

// Khi component được load thì gọi API
onMounted(fetchProducts);

// Chuyển đến trang chi tiết khi click vào sản phẩm
const goToDetail = (id) => {
  router.push(`/product/${id}`);
};
</script>

<template>
  <div>
    <h2>Danh sách sản phẩm</h2>
    <ul>
      <li v-for="product in products" :key="product._id" @click="goToDetail(product._id)">
        <img :src="product.image" alt="Hình ảnh" width="100" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.category }}</p>
        <p>{{ product.stock }}</p>
        <p>{{ product.description }}</p>
        <p>Giá: {{ product.price }} VNĐ</p>
      </li>
    </ul>
  </div>
</template>
