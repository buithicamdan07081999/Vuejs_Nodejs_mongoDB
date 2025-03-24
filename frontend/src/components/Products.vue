<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Biến lưu danh sách sản phẩm
const products = ref([]);

// Hàm lấy danh sách sản phẩm từ API
const fetchProducts = async () => {
  try {
    const response = await axios.get('/products');
    products.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

// Gọi API khi component được load
onMounted(fetchProducts);

// Hàm xóa sản phẩm
const deleteProduct = async (id) => {
  try {
<<<<<<< HEAD
    await axios.delete(`/products/${id}`);
=======
    await axios.delete(`http://localhost:5000/api/products/${id}`);
>>>>>>> f656ed9 (done fix index)
    alert('Xóa sản phẩm thành công!');
    fetchProducts(); // Load lại danh sách
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
  }
};
</script>

<template>
  <div>
    <h2>Danh sách sản phẩm</h2>
    <ul>
      <li v-for="product in products" :key="product._id">
        <img :src="product.image" alt="Hình ảnh" width="100" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Giá: {{ product.price }} VNĐ</p>
        <button @click="deleteProduct(product._id)">Xóa</button>
      </li>
    </ul>
  </div>
</template>
