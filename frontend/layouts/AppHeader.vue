<template>
  <header v-if="!isAdminPage" class="fixed top-0 left-0 w-full bg-black shadow-md z-50 p-2">
    <!-- <nav class="flex justify-center space-x-4 text-white">
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
    </nav> -->
    <!-- Logo -->
    <div class="container mx-auto flex justify-between items-center">

      <div class="flex items-center">
        <img src="/images/logo/logo.webp" alt="Logo" class="h-12" />
      </div>
      <!-- Search Bar -->
      <div class="flex-1 mx-4">
        <div class="relative">
          <input type="text" placeholder="Search for items..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring" />
          <button class="absolute right-2 top-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Navigation Links -->
      <div class="relative" @mouseenter="isUserDropdownOpen = true" @mouseleave="isUserDropdownOpen = false">
        <button class="text-white px-4 py-2">          
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Bộ sưu</router-link>
        </button>
        <div v-if="isUserDropdownOpen" class="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm bán chạy</router-link>
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm mới nhất</router-link>
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm giảm giá</router-link>
        </div>
      </div>
      <!-- Account Links -->
      <div class="relative" @mouseenter="isUserAccountDropdownOpen = true"
        @mouseleave="isUserAccountDropdownOpen = false">
        <button class="text-white px-4 py-2">Quản lý tài khoản</button>
        <div v-if="isUserAccountDropdownOpen"
          class="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Thông tin tài khoản</router-link>
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Đăng nhập</router-link>
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Đăng xuất</router-link>
        </div>
      </div>
      <!-- Shopping-cart -->

      <div>
        <button class="text-white text-xl">
          <!-- <i class="fa-solid fa-shopping-cart"></i> -->
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>

    </div>
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

// Tạo biến riêng cho từng dropdown
const isAdminDropdownOpen = ref(false);
const isAccountDropdownOpen = ref(false);
const isUserDropdownOpen = ref(false);
const isUserAccountDropdownOpen = ref(false);
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
.fa-cart-shopping {
  display: inline-block !important;
  visibility: visible !important;
}
.fas, .fa-solid {
    font-family: "Font Awesome 6 Free" !important;
    font-weight: 900 !important;
}

</style>
