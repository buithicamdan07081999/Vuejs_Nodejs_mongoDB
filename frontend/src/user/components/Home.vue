<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'; // Import CSS mặc định của Swiper
import { Autoplay } from 'swiper/modules';

// Tạo mảng chứa danh sanh sản phẩm
const products = ref([]);
const productslast = ref([]);
const productsprice = ref([]);

// Hàm lấy danh sách sản phẩm từ API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};
// Hàm lấy sản phẩm gần nhất
const fetchlastestProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products/latest');
    productslast.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm mới nhất:', error);
  }
};
// Hàm lấy sản phẩm theo giá
const fetchpriceProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products/price');
    productsprice.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm theo giá:', error);
  }
};

// Hàm xóa sản phẩm
const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    alert('Xóa sản phẩm thành công!');
    fetchProducts(); // Load lại danh sách
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
  }
};
const bannerpics = [
  "/images/banners/banner1.webp",
  "/images/banners/banner2.webp",
  "/images/banners/banner3.webp",
  "/images/banners/banner4.webp",
];

//swiper 

onMounted(() => {
  fetchProducts();
  fetchlastestProducts();
  fetchpriceProducts();
});

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

const daysAgo = (dateStr) => {
  const createdDate = new Date(dateStr);
  const today = new Date();
  const diffTime = Math.abs(today - createdDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
</script>

<template>
  <div class="home p-2 text-white text-center">
    <section class=" bg-grey; p-2 rounded-lg">
      <h1 class="text-4xl font-bold">Wellcome to KDBD Chanel</h1>
      <p class="mt-2 text-lg text-yellow-300 marquee-text"> BAD HABITS STORE - BAD IS NOT BAD !</p>
    </section>
  </div>
  <!-- Banner -->
  <div class="banner w-full h-screen">
    <Swiper :modules="[Autoplay]" :autoplay="{ delay: 1000, disableOnInteraction: false }" :loop="true"
      class="w-full h-full" :key="bannerpics.length">
      <SwiperSlide v-for="(banner, index) in bannerpics" :key="index">
        <img :src="banner" alt="Banner" class="banner-img w-full h-64 object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>

  <!-- Sản phẩm bán chạy -->
  <div class="categories text-white">
    <h2 class="text-2xl font-bold">Danh sách sản phẩm bán chạy</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div v-for="product in productsprice" :key="product._id" class="category-card">
        <img :src="product.image" :alt="product.name" class="category-img" />
        <p class=" font-medium">{{ product.name }}</p>
        <p class="text-gray-700 font-medium">{{ product.category }}</p>
        <p class="text-red-500 font-bold">{{ product.price }} VNĐ</p>
        <button @click="deleteProduct(product._id)">Xóa</button><br />
        <router-link class="text-blue-500 font-bold" :to="'/products/' + product._id">Xem chi tiết</router-link>
      </div>
    </div>
  </div>
  <!-- Title sản phẩm mới -->
  <div class="home p-2 text-white text-left">
    <section class="rounded-lg">
      <h1 class="text-4xl font-bold">NEW ARRIVAL ART & DESIGN / STUDIO</h1>
      <p class="mt-2 text-lg text-gray-500">ARE YOU READY TO DARE TO BE OUT WITH BAD HABITS?</p>
    </section>
  </div>
  <!-- Sản phẩm mới nhất -->
  <h2 class="text-2xl font-bold text-white">Danh sách sản phẩm mới</h2>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    <div v-for="product in productsprice" :key="product._id" class="category-card">
      <img :src="product.image" :alt="product.name" class="category-img" />
      <p class="text-yellow-500 font-bold">
        <!-- {{ formatDate(product.createdAt) }} -->
        ( {{ daysAgo(product.createdAt) }} ngày trước )
      </p>
      <p class="text-center font-medium">{{ product.name }}</p>
      <p class="text-center text-gray-700 font-medium">{{ product.category }}</p>
      <p class="text-red-500 font-bold">{{ product.price }} VNĐ</p>
      <button @click="deleteProduct(product._id)">Xóa</button><br />
      <router-link class="text-blue-500 font-bold" :to="'/products/' + product._id">Xem chi tiết</router-link>
    </div>
  </div>
</template>

<style scoped>
.marquee-text {
  display: inline-block;
  white-space: nowrap;
  /* Giữ chữ trên một dòng. */
  overflow: hidden;
  /*  Tránh chữ bị tràn */
  animation: marquee 8s linear infinite;
  /* infinite:  lặp vô hạn */
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.banner {
  width: 100%;
  max-width: 100vw;
  height: 74vh;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.category-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
  text-align: center;
}

.category-img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
