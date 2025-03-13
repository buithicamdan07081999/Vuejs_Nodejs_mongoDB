<template>
  <div class="home">
    <div class="p-4">
      <section style="background-color: #1a1a1a;" class="text-white text-center p-10 rounded-lg">
        <h1 class="text-4xl font-bold">Wellcome to KDBD Chanel</h1>
        <p class="mt-2 text-lg">Find and shop for the best items at cheap prices</p>
      </section>
    </div>

    <!-- Banner -->

    <div class="banner">
      <Swiper :modules="[Autoplay]" :autoplay="{ delay: 1000, disableOnInteraction: false }" :loop="true"
        class="w-full h-64 mx-auto"  :key="banners.length">
        <SwiperSlide v-for="(banner, index) in banners" :key="index">
          <img :src="banner" alt="Banner" class="banner-img w-full h-64 object-cover" />
        </SwiperSlide>
      </Swiper>
      <!-- <img src="../../public/images/banner.jpg" alt="Banner" class="banner-img" /> -->
    </div>

    <!-- Danh mục sản phẩm -->
    <div class="categories">
      <h2 class="text-2xl font-bold text-center my-4">Danh mục sản phẩm</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <img :src="category.image" :alt="category.name" class="category-img" />
          <p class="text-center font-medium">{{ category.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const banners = [
  "../../public/images/dumsum.webp",
  "../../public/images/discount.webp",
  "../../public/images/menu.webp",
  "../../public/images/fruit.webp",
];

const categories = ref([
  { id: 1, name: "Donut", category: "Dersert", price: 200000, image: "../../public/images/donut.avif" },
  { id: 2, name: "Pizza", category: "Fastfood", price: 1500000, image: "../../public/images/pizza.avif" },
  { id: 3, name: "Ham", category: "Fastfood", price: 500000, image: "../../public/images/thitnguoi.avif" },
  { id: 4, name: "Egg", category: "Fastfood", price: 1200000, image: "../../public/images/egg.avif" }
]);

</script>

<style scoped>
.banner {
  width: 100%;
  text-align: center;
}

.banner-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
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
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}
</style>