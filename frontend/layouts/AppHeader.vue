<template>
  <!-- Header cho người dùng -->
  <header v-if="!isAdminPage" class="fixed w-full bg-black p-2">
    <div class="flex w-full items-center">
      <!-- Logo -->
      <div class="w-1/4 flex justify-center items-start">
      <router-link to="/">
        <img src="/images/logo/logo.webp" alt="Logo" class="h-12 cursor-pointer" />
      </router-link>
    </div>
      <!-- Menu/Dropdowns -->
      <div class="w-3/4 flex justify-center items-center space-x-4">
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
        <router-link to="/products" class="text-white px-4 py-2 hover:bg-gray-700 rounded">
          Giỏ hàng
        </router-link>
      </div>
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
