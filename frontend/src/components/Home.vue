<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

//swiper 
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const products = ref([]);

const bannerpics = [
  "../../public/images/banner3.webp",
  "../../public/images/banner1.webp",
  "../../public/images/banner2.webp",
];

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
    <div class="home">
      <div class="p-6">
        <section style="background-color: white;" class="text-black text-center p-1">
          <!-- hiệu ứng: -->
          <!-- <section style="background-color: #1a1a1a;" class="text-white text-center p-5 rounded-lg"> -->
          <!-- hiệu ứng: -->
          <!-- - rounded-lg: Bo góc large (lg), tương đương 8px. -->
          <!-- p-5 (padding) 5 * 4px = 20px -->
          <h1 class="text-4xl font-bold">Wellcome to KDBD Chanel</h1>
          <p class="mt-2 text-lg text-yellow-300 marquee-text">I love mập yêu!</p>
          <!-- marquee-text : chạy chữ (giống banner)  -->
        </section>
      </div>

      <!-- Banner -->

      <div class="banner">
        <Swiper :modules="[Autoplay]" :autoplay="{ delay: 1000, disableOnInteraction: false }" :loop="true"
          class="w-full h-64 mx-auto" :key="bannerpics.length">
          <!-- 
            :autoplay="{ delay: 1000 }" → Tự chạy mỗi 1 giây.
            :loop="true" → Lặp vô hạn.
            :key="bannerpics.length" → Cập nhật khi danh sách thay đổi. 
        -->
          <SwiperSlide v-for="(banner, index) in bannerpics" :key="index">
            <img :src="banner" alt="Banner" class="banner-img w-full h-64 object-cover" />
          </SwiperSlide>
        </Swiper>
        <!-- <img src="../../public/images/banner.jpg" alt="Banner" class="banner-img" /> -->
      </div>

    </div>
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

  /* Bắt đầu từ ngoài cùng bên phải */
  100% {
    transform: translateX(-100%);
  }

  /* Kết thúc ngoài cùng bên trái */
}

.banner {
  width: 100%;
  text-align: center;
}

.banner-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  /* Đảm bảo ảnh không méo khi thay đổi kích thước */
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
