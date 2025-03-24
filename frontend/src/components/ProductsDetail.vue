<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const product = ref({});
const route = useRoute();
const productId = route.params.id;

// Hàm lấy thông tin sản phẩm từ API
const fetchProduct = async () => {
  try {
    const response = await axios.get(`/products/${productId}`);
    product.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
  }
};

// Khi component được load thì gọi API
onMounted(fetchProduct);
</script>

<template>
  <div>
    <h2>Chi tiết sản phẩm</h2>
    <div v-if="product">
      <img :src="product.image" alt="Hình ảnh" width="200" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>Giá: {{ product.price }} VNĐ</p>
    </div>
    <p v-else>Đang tải...</p>
  </div>
</template>
