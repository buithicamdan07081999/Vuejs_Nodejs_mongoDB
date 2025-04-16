<template>
  <!-- Header cho người dùng -->
  <header v-if="!isAdminPage" class="header-user">
    <div class="item-between-css">
      <!-- Logo -->
      <div class="w-1/4 item-center-css">
        <router-link to="/">
          <img src="/images/logo/logo.webp" alt="Logo"
            class="h-6 sm:h-10 md:h-12 lg:h-14 xl:h-20 object-contain cursor-pointer" />
        </router-link>
      </div>

      <!-- Menu -->
      <div class="w-2/4 item-center-css">
        <!-- Bộ sưu tập Dropdown -->
        <div class="dropdown-container">
          <button class="px-4">
            <router-link to="/products" class="header-link">Bộ sưu
              tập</router-link>
          </button>
          <div class="dropdown-menu">
            <router-link to="/products" class="block header-link">Sản phẩm bán chạy</router-link>
            <router-link to="/products" class="block header-link">Sản phẩm mới nhất</router-link>
            <router-link to="/products" class="block header-link">Sản phẩm giảm giá</router-link>
          </div>
        </div>
        <!-- Thông báo -->
        <div>
          <router-link to="/noti" class="header-link">
            Thông báo
          </router-link>
        </div>
        <!-- Tiếng Việt -->
        <div>
          <router-link to="/#" class="header-link">
            Tiếng Việt
          </router-link>
        </div>
        <div>
          <router-link to="/products" class="header-link">
            Giỏ hàng
          </router-link>
        </div>
      </div>
      <div class="w-1/4 justify-end">
        <div v-if="auth.user">
          <!-- Tài khoản -->
          <div class="dropdown-container">
            <button class="header-link">
              <span>👋 Xin chào,&nbsp;</span>
              <router-link to="/profile">{{ auth.user.name || auth.user.email }}</router-link>
            </button>
            <div class="dropdown-menu">
              <router-link to="/profile" class="item-center-css header-link">
                Quản lý tài khoản
              </router-link>
              <button @click="handleLogout"
                class="header-link item-center-css text-red-500">Đăng xuất</button>
            </div>
          </div>

        </div>
        <div v-else class="flex items-center space-x-1">
  <router-link to="/login" class="text-blue-500 header-link">Đăng nhập</router-link>
  <span>|</span>
  <router-link to="/login" class="text-blue-500 header-link">Đăng ký</router-link>
</div>

      </div>
    </div>
  </header>

  <!-- Header cho trang Admin -->
  <header v-else class="header-admin">
    <nav class="item-center-css">
      <router-link class="header-link" to="/">Trang chủ</router-link>
      <router-link class="header-link" to="/admin">Admin</router-link>

      <!-- Dropdown Quản trị -->
      <div class="dropdown-container">
        <button class="header-link">Quản trị</button>
        <div class="dropdown-menu">
          <router-link to="/admin/products" class="block header-link hover:bg-gray-200">Quản lý Sản phẩm</router-link>
          <router-link to="#" class="block header-link hover:bg-gray-200">Quản lý Đơn hàng</router-link>
          <router-link to="#" class="block header-link hover:bg-gray-200">Quản lý Tài khoản</router-link>
          <router-link to="#" class="block header-link hover:bg-gray-200">Quản lý Bài viết</router-link>
        </div>
      </div>

      <div v-if="auth.user">
        <span class="mr-4"> 👋 Xin chào, {{ auth.user.name || auth.user.email }}</span>
        <button @click="handleLogout" class="text-red-500 font-semibold">&nbsp;Đăng xuất</button>
      </div>
      <div v-else>
        <router-link to="/login" class="text-blue-500 font-semibold">Đăng nhập</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const isAdminPage = computed(() => route.path.startsWith('/admin'))

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

watch(() => auth.user, (newUser) => {
  console.log('User thay đổi:', newUser)
})

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
  background: #ffffff;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 50;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.dropdown-container:hover .dropdown-menu {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}
</style>

