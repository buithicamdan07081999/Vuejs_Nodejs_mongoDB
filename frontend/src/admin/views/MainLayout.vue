<template>
  <div class="flex flex-col h-screen">
    <!-- Sidebar sẽ chiếm chiều cao còn lại sau Header -->
    <Sidebar :isSidebarHovered="isSidebarHovered" @hover-change="val => isSidebarHovered = val" />

    <!-- Nội dung chính -->
    <div class="flex flex-col flex-1">
      <!-- Header luôn ở trên cùng, không bị ảnh hưởng bởi Sidebar -->
      <Header />

      <main
        class="transition-all duration-300 p-6 bg-gray-100 min-h-screen"
        :class="isSidebarHovered ? 'pl-64' : 'pl-16'"
      >
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './../components/Sidebar.vue';
import Header from '@/layouts/AppHeader.vue'
import Footer from '@/layouts/AppFooter.vue'

const isSidebarHovered = ref(false)
</script>

<style scoped>
/* Đảm bảo Header luôn ở trên cùng */
.header-admin {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff; /* Hoặc màu nền bạn mong muốn */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

/* Điều chỉnh không gian khi Sidebar được mở */
.main-content {
  margin-top: 80px; /* Cung cấp không gian cho Header */
}
</style>
