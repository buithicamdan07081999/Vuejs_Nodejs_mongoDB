<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const bannerpics = [
  "/images/banners/banner1.webp",
  "/images/banners/banner2.webp",
  "/images/banners/banner3.webp",
  "/images/banners/banner4.webp",
];
</script>

<template>
  <div class="banner w-full h-screen">
    <Swiper
      :modules="[Autoplay]"
      :autoplay="{ delay: 1000, disableOnInteraction: false }"
      :loop="true"
      class="w-full h-full"
      :key="bannerpics.length"
    >
      <SwiperSlide v-for="(banner, index) in bannerpics" :key="index">
        <img :src="banner" alt="Banner" class="banner-img" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
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
</style>
