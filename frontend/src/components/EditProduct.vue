<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const product = ref({});
const route = useRoute();
const productId = route.params.id;

// Lấy thông tin sản phẩm cần sửa
const fetchProduct = async () => {
  try {
    const response = await axios.get(`/products/${productId}`);
    product.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
  }
};

// Hàm cập nhật sản phẩm
const updateProduct = async () => {
  try {
    await axios.put(`/products/${productId}`, product.value);
    alert('Cập nhật sản phẩm thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
  }
};

onMounted(fetchProduct);
</script>

<template>
  <div>
    <h2>Cập nhật sản phẩm</h2>
    <form @submit.prevent="updateProduct">
      <input v-model="product.name" required />
      <input v-model="product.description" required />
      <input v-model="product.price" type="number" required />
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>
