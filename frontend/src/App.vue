<script setup>
import { RouterView } from 'vue-router';
import Header from '@/layouts/AppHeader.vue';
import Footer from '@/layouts/AppFooter.vue';
// import Sidebar from '@/layouts/AppSidebar.vue';
</script>

<template>
    <div class=" flex-1 flex flex-col w-full">
      <Header/>
      <!-- <Header class="h-16 text-white flex items-center justify-between px-4" /> -->
      <!-- Sidebar chiếm 1/5 chiều rộng, nền xám (bg-gray-100) & padding (p-4) -->
      <div class=" flex-1 flex flex-col w-full">
        <!-- Header cố định chiều cao h-16 (~64px), màu nền xanh (bg-blue-500), căn giữa nội dung -->
        <main class="flex-1 p-4 overflow-auto">
          <!-- <main class="flex-1 p-4 overflow-auto"> -->
          <RouterView />
          <!-- dùng <RouterView /> để hiển thị nội dung động theo đường dẫn -->
          <!-- 📌 Cách hoạt động:
          Khi vào /, Vue sẽ hiển thị HomeView.vue.
          Khi vào /products, Vue sẽ hiển thị ProductsView.vue.
          Khi vào /products/1, Vue sẽ hiển thị ProductDetailView.vue với id = 1. -->
        </main>
        <Footer class="h-12 bg-gray-800 text-white text-center p-2" />
      </div>
    </div>
</template>
