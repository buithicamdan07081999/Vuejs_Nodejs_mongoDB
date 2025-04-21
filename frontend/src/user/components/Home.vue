<script setup>
import { formatDate, daysAgo } from '@/format/dateFormat';
import { useProducts } from '@/composables/products/useProductsData';
const { productslast, productsprice, deleteProduct } = useProducts();
import '@/assets/styles/HomePage.css';  
import BannerSlider from './Slider/BannerSlider.vue';
</script>

<template>
  <div class="home p-2 text-white text-center">
    <section class=" bg-grey; p-2 rounded-lg">
      <h1 class="text-4xl font-bold">Wellcome to KDBD Chanel</h1>
      <p class="mt-2 text-lg text-yellow-300 marquee-text"> BAD HABITS STORE - BAD IS NOT BAD !</p>
    </section>
  </div>
  <!-- Banner -->
  <BannerSlider />
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
    <div v-for="product in productslast" :key="product._id" class="category-card">
      <img :src="product.image" :alt="product.name" class="category-img" />
      <p class="text-yellow-500 font-bold">
        ( {{ daysAgo(product.createdAt) }} ngày trước )
        <br/> 
        {{ formatDate(product.createdAt) }}
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
