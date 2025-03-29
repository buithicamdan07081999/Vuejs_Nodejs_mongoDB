<template>
  <header v-if="!isAdminPage" class="fixed top-0 left-0 w-full bg-black shadow-md z-50 p-2">
    <nav class="flex justify-center space-x-4 text-white">
      <router-link to="/">KDBD STORE</router-link>
      <router-link to="#">SEARCH</router-link>
      <router-link to="#">BESTSELLER</router-link>
      <router-link to="#">BỌ SƯU TẬP</router-link>
      <router-link to="#">DANH MỤC</router-link>
      <router-link to="#">CỬA HÀNG</router-link>
      <router-link to="#">TUYỂN DỤNG</router-link>
      <router-link to="#">BLOG</router-link>
      <router-link to="#">GIỎ HÀNG</router-link>
      <router-link to="/admin">ĐĂNG NHẬP</router-link>
    </nav>
  </header>

  <!-- Header cho trang Admin -->
  <header v-else class="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2">
    <nav class="flex justify-center space-x-4 items-center">
      <router-link to="/admin">Admin Dashboard</router-link>

      <!-- Dropdown Menu: Quản trị -->
      <div class="relative" @mouseenter="isAdminDropdownOpen = true" @mouseleave="isAdminDropdownOpen = false">
        <button class="text-black px-4 py-2">Quản trị</button>
        <div v-if="isAdminDropdownOpen" class="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
          <router-link to="/admin/products" class="block px-4 py-2 hover:bg-gray-200">Quản lý Sản phẩm</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Đơn hàng</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Tài khoản</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Bài viết</router-link>
        </div>
      </div>

      <!-- Dropdown Menu: Quản lý tài khoản -->
      <div class="relative" @mouseenter="isAccountDropdownOpen = true" @mouseleave="isAccountDropdownOpen = false">
        <button class="text-black px-4 py-2">Quản lý tài khoản</button>
        <div v-if="isAccountDropdownOpen" class="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Đăng nhập</router-link>
          <router-link to="/" class="block px-4 py-2 hover:bg-gray-200">Đăng xuất</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAdminPage = computed(() => route.path.startsWith("/admin"));

// Tạo hai biến riêng cho từng dropdown
const isAdminDropdownOpen = ref(false);
const isAccountDropdownOpen = ref(false);
</script>

<style scoped>
nav {
  padding: 2px;
}
nav a {
  margin: 0 3px;
  text-decoration: none;
}
nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}
</style>
