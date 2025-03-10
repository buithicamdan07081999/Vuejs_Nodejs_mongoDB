<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <!-- <div class="h-screen flex justify-center items-center bg-blue-500 text-white text-3xl font-bold">
    I love mập yêu!
  </div> -->
  <div class="flex h-screen w-full">
    <Sidebar class="w-1/5 bg-gray-100 p-4" />
    <!-- Sidebar chiếm 1/5 chiều rộng, nền xám (bg-gray-100) & padding (p-4) -->
    <div class=" flex-1 flex flex-col w-4/5">
      <Header style="background-color: #1a1a1a;" class="h-16 text-white flex items-center justify-between px-4" />
      <!-- Header cố định chiều cao h-16 (~64px), màu nền xanh (bg-blue-500), căn giữa nội dung -->
      <main class="flex-1 p-4">
        <RouterView />
      </main>
      <Footer class="h-12 bg-gray-800 text-white text-center p-2" />
    </div>
  </div>
</template>
