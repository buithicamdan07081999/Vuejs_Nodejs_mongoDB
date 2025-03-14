<template>
  <div class="home">
    <div class="p-4">
      <section style="background-color: #1a1a1a;" class="text-white text-center p-5 rounded-lg">
        <!-- hiệu ứng: -->
        <!-- - rounded-lg: Bo góc large (lg), tương đương 8px. -->
        <!-- p-5 (padding) 5 * 4px = 20px -->
        <h1 class="text-4xl font-bold">Wellcome to KDBD Chanel</h1>
        <p class="mt-2 text-lg marquee-text">Find and shop for the best items at cheap prices</p>
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

    <!-- Danh mục sản phẩm -->
    <!-- 
            grid Biến phần tử thành một Grid container (bố cục dạng lưới).
            gap-6	Tạo khoảng cách giữa các ô trong lưới là 1.5rem (24px). -->
    <!-- 
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-blue-200 p-4">Item 1</div>
    <div class="bg-green-200 p-4">Item 2</div>
    <div class="bg-red-200 p-4">Item 3</div>
    <div class="bg-yellow-200 p-4">Item 4</div>
  </div> -->
    <div class="categories">
      <h2 class="text-2xl font-bold text-center my-4">Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!--
        Sắp xếp lưới grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            2 cột trên mobile.
            3 cột trên tablet.
            4 cột trên màn hình lớn. -->
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

const bannerpics = [
  "../../public/images/dimsum.webp",
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