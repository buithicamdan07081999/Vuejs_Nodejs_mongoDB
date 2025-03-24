<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Biến lưu thông tin sản phẩm mới
const newProduct = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  image: '',
  stock: 1,
});

// Hàm thêm sản phẩm
const addProduct = async () => {
  try {
    await axios.post('/products', newProduct.value);
    alert('Thêm sản phẩm thành công!');
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
  }
};
</script>

<template>
  <div>
    <h2>Thêm sản phẩm mới</h2>
    <form @submit.prevent="addProduct">
      <input v-model="newProduct.name" placeholder="Tên sản phẩm" required />
      <input v-model="newProduct.description" placeholder="Mô tả" required />
      <input v-model="newProduct.price" type="number" placeholder="Giá" required />
      <input v-model="newProduct.category" placeholder="Danh mục" required />
      <input v-model="newProduct.image" placeholder="Link ảnh" required />
      <button type="submit">Thêm</button>
    </form>
  </div>
</template>
