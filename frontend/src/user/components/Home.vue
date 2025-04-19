<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'; // Import CSS mặc định của Swiper
import { Autoplay } from 'swiper/modules';

const products = ref([]);
const productslast = ref([]);

// Hàm lấy danh sách sản phẩm từ API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    products.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  }
};

const fetchlastestProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products/latest');
    productslast.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách 6 sản phẩm:', error);
  }
};

// Gọi API khi component được load
onMounted(() => {
  fetchProducts();
  fetchlastestProducts();
});

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

// Banner images
const bannerpics = [
  "/images/banners/banner1.webp",
  "/images/banners/banner2.webp",
  "/images/banners/banner3.webp",
  "/images/banners/banner4.webp",
];

</script>

<template>
  <div class="home p-2 text-black">
    <section class="text-center rounded-lg">
      <h1 class="text-4xl font-bold">Welcome to KDBD Channel</h1>
      <p class="mt-2 text-lg text-yellow-300 marquee-text"> BAD HABITS STORE - BAD IS NOT BAD !</p>
    </section>
  </div>

  <!-- Banner -->
  <div class="banner w-full h-screen">
    <Swiper :modules="[Autoplay]" :autoplay="{ delay: 1000, disableOnInteraction: false }" :loop="true"
      class="w-full h-full">
      <SwiperSlide v-for="(banner, index) in bannerpics" :key="index">
        <img :src="banner" alt="Banner" class="banner-img w-full h-full object-cover" />
      </SwiperSlide>
    </Swiper>
  </div>

  <!-- Categories -->
  <div class="categories p-6 text-center">
    <h2 class="text-2xl font-bold">Danh sách 6 sản phẩm</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div v-for="product in productslast" :key="product._id" class="category-card">
        <img :src="product.image" :alt="product.name" class="category-img" />
        <p class="text-center font-medium">{{ product.name }}</p>
        <p class="text-center text-gray-700 font-medium">{{ product.category }}</p>
        <p class="text-red-500 font-bold">{{ product.price }} VNĐ</p>
        <button @click="deleteProduct(product._id)">Xóa</button><br />
        <router-link class="text-blue-500 font-bold" :to="'/products/' + product._id">Xem chi tiết</router-link>
      </div>
    </div>
  </div>

  <div class="home p-2 text-black">
    <section class="text-left rounded-lg">
      <h1 class="text-4xl font-bold">NEW ARRIVAL ART & DESIGN / STUDIO</h1>
      <p class="mt-2 text-lg gray-text">ARE YOU READY TO DARE TO BE OUT WITH BAD HABITS?</p>
    </section>
  </div>

  <div class="categories p-6 text-center">
    <h2 class="text-2xl font-bold">Danh sách sản phẩm</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div v-for="product in products" :key="product._id" class="category-card">
        <img :src="product.image" :alt="product.name" class="category-img" />
        <p class="text-center font-medium">{{ product.name }}</p>
        <p class="text-center text-gray-700 font-medium">{{ product.category }}</p>
        <p class="text-red-500 font-bold">{{ product.price }} VNĐ</p>
        <button @click="deleteProduct(product._id)">Xóa</button><br />
        <router-link class="text-blue-500 font-bold" :to="'/products/' + product._id">Xem chi tiết</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-text {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  animation: marquee 8s linear infinite;
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
  height: 100vh;
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
  border-radius: 5px;
}

.gray-text {
  color: #A5A5A5;
}
</style>
