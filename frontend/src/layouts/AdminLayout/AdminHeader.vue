<template>
  <header class="header-admin w-full block item-center-css">
    <nav class="w-full flex justify-between items-center">
      <!-- Logo -->
      <div class="w-1/4 item-center-css">
        <router-link to="/">
          <img src="/images/logo/logo.webp" alt="Logo"
            class="h-6 sm:h-10 md:h-12 lg:h-14 xl:h-20 object-contain cursor-pointer p-1" />
        </router-link>
      </div>

      <!-- Search -->
      <div class="w-2/4 item-center-css">
        <input type="text" placeholder="Search for datas & reports..."
          class="w-full p-2 border rounded-md focus:outline-none focus:ring" />
      </div>

      <!-- Notifications -->
      <div class="p-8 flex items-center gap-4">
        <div class="relative">
          <span class="text-xl">🔔</span>
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>
      </div>

      <!-- Tài khoản -->
      <div class="w-1/4 item-center-css">
        <div v-if="auth.user">
          <div class="dropdown-container">
            <button class="header-link">
              <div class="flex items-center gap-2">
                <img alt="Avatar" class="w-8 h-8 rounded-full" src="/images/auth/avatar.webp" />
                <span class="font-semibold">BUI DAN</span>
              </div>
            </button>
            <div class="dropdown-menu">
              <router-link to="/profile" class="item-center-css header-link">{{ $t('manage_account') }}</router-link>
              <button @click="handleLogout" class="header-link item-center-css text-red-500">{{ $t('logout') }}</button>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center space-x-1">
          <router-link to="/login" class="text-blue-500 header-link">{{ $t('login') }}</router-link>
          <span>|</span>
          <router-link to="/register" class="text-blue-500 header-link">{{ $t('register') }}</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.dropdown-container {
  position: relative;
}
.dropdown-menu {
  @apply absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg flex flex-col items-center z-50;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}
.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>