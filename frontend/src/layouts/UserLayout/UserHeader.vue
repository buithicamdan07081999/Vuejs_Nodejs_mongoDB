<template>
  <header class="header-user w-full block">
    <div class="item-between-css">
      <!-- Logo -->
      <div class="w-1/4 item-center-css">
        <router-link to="/">
          <img
            src="/images/logo/logo.webp"
            alt="Logo"
            class="h-6 sm:h-10 md:h-12 lg:h-14 xl:h-20 object-contain cursor-pointer"
          />
        </router-link>
      </div>

      <!-- Menu trung tâm -->
      <nav class="w-2/4 item-center-css space-x-4">
        <!-- Menu bộ sưu tập -->
        <div class="dropdown-container">
          <button class="header-link">{{ $t('collection') }}</button>
          <div class="dropdown-menu">
            <router-link to="/product/bestprice" class="header-link">{{ $t('best_seller') }}</router-link>
            <router-link to="/product/newest" class="header-link">{{ $t('newest') }}</router-link>
            <router-link to="/product" class="header-link">{{ $t('products') }}</router-link>
          </div>
        </div>

        <!-- Thông báo -->
        <router-link to="#" class="header-link">{{ $t('notification') }}</router-link>

        <!-- Chuyển ngôn ngữ -->
        <div class="dropdown-container relative">
          <button class="header-link flex items-center gap-2" @click="isLangOpen = !isLangOpen">
            🌐 {{ $t('language') }}
            <svg
              class="w-4 h-4 transform transition-transform"
              :class="{ 'rotate-180': isLangOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="isLangOpen" class="dropdown-menu absolute">
            <button class="header-link" @click="changeLanguage('vi')">🇻🇳 Tiếng Việt</button>
            <button class="header-link" @click="changeLanguage('en')">🇺🇸 English</button>
            <button class="header-link" @click="changeLanguage('fr')">🇫🇷 Français</button>
          </div>
        </div>

        <!-- Giỏ hàng -->
        <router-link to="/cart" class="header-link">{{ $t('cart') }}</router-link>
      </nav>

      <!-- Tài khoản -->
      <div class="w-1/4 flex justify-end">
        <div v-if="auth.user">
          <div class="dropdown-container">
            <button class="header-link flex items-center gap-1">
              👋 {{ $t('hello') }},
              <router-link to="/profile" class="font-semibold">{{ auth.user.name || auth.user.email }}</router-link>
            </button>
            <div class="dropdown-menu">
              <router-link to="/profile" class="header-link">{{ $t('manage_account') }}</router-link>
              <router-link to="/admin" class="header-link">{{ $t('admin_page') }}</router-link>
              <button @click="handleLogout" class="header-link text-red-500">{{ $t('logout') }}</button>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center space-x-2">
          <router-link to="/login" class="text-blue-500 header-link">{{ $t('login') }}</router-link>
          <span>|</span>
          <router-link to="/register" class="text-blue-500 header-link">{{ $t('register') }}</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Import store & thư viện
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Biến & hàm xử lý
const auth = useAuthStore()
const router = useRouter()
const { locale } = useI18n()
const isLangOpen = ref(false)

// Đổi ngôn ngữ + lưu vào localStorage
const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

// Logout + redirect
const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Dropdown cơ bản */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background: #fff;
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

/* Hover mở dropdown */
.dropdown-container:hover .dropdown-menu {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}
</style>