<template>
  <!-- Header cho người dùng -->
  <header v-if="!isAdminPage" class="fixed top-0 left-0 w-full h-16 bg-black text-white z-50 p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="w-1/4 flex justify-center">
        <router-link to="/">
          <img src="/images/logo/logo.webp" alt="Logo" class="h-12 cursor-pointer" />
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="flex-1 mx-4">
        <div class="relative">
          <input type="text" placeholder="Search for items..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring" />
          <button class="absolute right-2 top-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Bộ sưu tập Dropdown -->
      <div class="dropdown-container">
        <button class="text-white px-4 py-2">
          <router-link to="/products">Bộ sưu tập</router-link>
        </button>
        <div class="dropdown-menu">
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm bán chạy</router-link>
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm mới nhất</router-link>
          <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm giảm giá</router-link>
        </div>
      </div>

      <!-- Tài khoản Dropdown -->
      <div class="dropdown-container">
        <button class="text-white px-4 py-2">
          <router-link to="/admin">Tài khoản</router-link>
        </button>
        <div class="dropdown-menu">
          <router-link to="/admin" class="block px-4 py-2 hover:bg-gray-200">Thông tin tài khoản</router-link>
          <router-link to="/login" class="block px-4 py-2 hover:bg-gray-200">Đăng nhập</router-link>
          <router-link to="/" class="block px-4 py-2 hover:bg-gray-200">Đăng xuất</router-link>
        </div>
      </div>

      <!-- Giỏ hàng -->
      <div>
        <button class="container text-white">
          <router-link to="/products">Giỏ hàng</router-link>
        </button>
      </div>
    </div>
  </header>

  <!-- Header cho trang Admin -->
  <header v-else class="fixed top-0 left-0 w-full bg-black shadow-md z-50 p-2">
    <nav class="flex justify-center items-center space-x-4">
      <router-link class="text-white px-4 py-2 hover:bg-gray-700 rounded" to="/">Trang chủ</router-link>
      <router-link class="text-white px-4 py-2 hover:bg-gray-700 rounded" to="/admin">Admin</router-link>

      <!-- Dropdown Quản trị -->
      <div class="dropdown-container">
        <button class="text-white px-4 py-2">Quản trị</button>
        <div class="dropdown-menu">
          <router-link to="/admin/products" class="block px-4 py-2 hover:bg-gray-200">Quản lý Sản phẩm</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Đơn hàng</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Tài khoản</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Bài viết</router-link>
        </div>
      </div>

      <!-- Dropdown Tài khoản -->
      <div class="dropdown-container">
        <button class="text-white px-4 py-2">Quản lý tài khoản</button>
        <div class="dropdown-menu">
          <router-link to="/login" class="block px-4 py-2 hover:bg-gray-200">Đăng nhập</router-link>
          <router-link to="/" class="block px-4 py-2 hover:bg-gray-200">Đăng xuất</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAdminPage = computed(() => route.path.startsWith('/admin'))
</script>

<style scoped>
.fa-cart-shopping {
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 900 !important;
}

.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  left: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background: white;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 50;
}

.dropdown-container:hover .dropdown-menu {
  visibility: visible;
  opacity: 1;
}
</style>
