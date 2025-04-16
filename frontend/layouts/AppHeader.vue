<template>
  <!-- Header cho người dùng -->
  <header v-if="!isAdminPage" class="fixed top-0 left-0 w-full bg-black shadow-md z-50 p-2 text-white">
    <div class="flex w-full items-center">
      <!-- Logo -->
      <div class="w-1/4 flex justify-center items-center">
        <router-link to="/">
          <img src="/images/logo/logo.webp" alt="Logo"
            class="h-6 sm:h-10 md:h-12 lg:h-14 xl:h-20 object-contain cursor-pointer" />
        </router-link>
      </div>

      <!-- Menu -->
      <div class="w-3/4 flex justify-center items-center space-x-4">
        <!-- Bộ sưu tập Dropdown -->
        <div class="dropdown-container">
          <button class="px-4">
            <router-link to="/products" class="hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg">Bộ sưu
              tập</router-link>
          </button>
          <div class="dropdown-menu">
            <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm bán chạy</router-link>
            <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm mới nhất</router-link>
            <router-link to="/products" class="block px-4 py-2 hover:bg-gray-200">Sản phẩm giảm giá</router-link>
          </div>
        </div>

        <div v-if="isLoggedIn">
          <button @click="logout">Đăng xuất</button>
        </div>
        <div v-else>
          <router-link to="/login">Đăng nhập</router-link>
        </div>
        <!-- Tài khoản Dropdown -->
        <!-- <div class="dropdown-container">
          <button class="px-4 py-2">
            <router-link to="/admin">Tài khoản</router-link>
          </button>
          <div class="dropdown-menu">
            <router-link v-if="isLoggedIn" to="/profile" class="block px-4 py-2 hover:bg-gray-200">Thông tin tài
              khoản</router-link>
            <router-link v-if="!isLoggedIn" to="/login" class="block px-4 py-2 hover:bg-gray-200">Đăng
              nhập</router-link>
            <button v-if="isLoggedIn" @click="logout" class="block px-4 py-2 hover:bg-gray-200">Đăng xuất</button>
          </div>
        </div> -->


        <!-- Giỏ hàng -->
        <div>
          <router-link to="/products" class="px-4 py-2 hover:bg-gray-700 rounded">
            Giỏ hàng
          </router-link>
        </div>
      </div>
    </div>
  </header>

  <!-- Header cho trang Admin -->
  <header v-else class="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2 text-black">
    <nav class="flex justify-center items-center space-x-4">
      <router-link class="px-4 py-2 hover:bg-gray-700 rounded" to="/">Trang chủ</router-link>
      <router-link class="px-4 py-2 hover:bg-gray-700 rounded" to="/admin">Admin</router-link>

      <!-- Dropdown Quản trị -->
      <div class="dropdown-container">
        <button class="px-4 py-2">Quản trị</button>
        <div class="dropdown-menu">
          <router-link to="/admin/products" class="block px-4 py-2 hover:bg-gray-200">Quản lý Sản phẩm</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Đơn hàng</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Tài khoản</router-link>
          <router-link to="#" class="block px-4 py-2 hover:bg-gray-200">Quản lý Bài viết</router-link>
        </div>
      </div>

      <div v-if="isLoggedIn">
        <button @click="logout">Đăng xuất</button>
      </div>
      <div v-else>
        <router-link to="/login">Đăng nhập</router-link>
      </div>

      <!-- Tài khoản Dropdown -->
      <!-- <div class="dropdown-container">
        <button class="px-4 py-2">
          <router-link to="/admin">Tài khoản</router-link>
        </button>
        <div class="dropdown-menu">
          <router-link v-if="isLoggedIn" to="/profile" class="block px-4 py-2 hover:bg-gray-200">Thông tin tài
            khoản</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="block px-4 py-2 hover:bg-gray-200">Đăng nhập</router-link>
          <button v-if="isLoggedIn" @click="logout" class="block px-4 py-2 hover:bg-gray-200">Đăng xuất</button>
        </div>
      </div> -->

    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const isAdminPage = computed(() => route.path.startsWith('/admin'))
const isLoggedIn = computed(() => auth.isLoggedIn)

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 50;
}

.dropdown-container:hover .dropdown-menu {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}
</style>
