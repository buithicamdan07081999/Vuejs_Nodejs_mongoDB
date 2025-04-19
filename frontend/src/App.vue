<script setup>
import { RouterView } from 'vue-router';
import Header from './layouts/AppHeader.vue';
import Footer from './layouts/AppFooter.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- flex flex-col: chia bố cục theo chiều dọc
     min-h-screen: chiều cao tối thiểu là 100% chiều cao màn hình -->
    <Header class="w-full"/>
    <main class="flex-grow w-full pt-header">
      <!-- flex-grow ở main sẽ giúp phần này chiếm toàn bộ không gian còn trống giữa Header và Footer -->
      <router-view />
    </main>
    <Footer class="w-full" />
  </div>
</template>
