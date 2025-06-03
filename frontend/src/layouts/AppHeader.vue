<template>
  <!-- Header cho người dùng -->
  <header v-if="!isAdminPage" class="header-user w-full block">
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
            <router-link to="/product" class="header-link">{{ $t('collection') }}</router-link>
          </button>
          <div class="dropdown-menu">
            <router-link to="/product" class="header-link">{{ $t('best_seller') }}</router-link>
            <router-link to="/product" class="header-link">{{ $t('newest') }}</router-link>
            <router-link to="/product" class="header-link">{{ $t('discount') }}</router-link>
          </div>
        </div>

        <!-- Thông báo -->
        <div>
          <router-link to="#" class="header-link">{{ $t('notification') }}</router-link>
        </div>

        <!-- Language Switcher -->
        <div class="dropdown-container">
          <button class="header-link flex items-center gap-2">
            🌐 {{ $t('language') }}
            <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': isLangOpen }" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="dropdown-menu">
            <button class="header-link" @click="changeLanguage('vi')">🇻🇳 Tiếng Việt</button>
            <button class="header-link" @click="changeLanguage('en')">🇺🇸 English</button>
            <button class="header-link" @click="changeLanguage('fr')">🇫🇷 Français</button>
          </div>
        </div>

        <!-- Giỏ hàng -->
        <div>
          <router-link to="/product" class="header-link">{{ $t('cart') }}</router-link>
        </div>
      </div>

      <!-- Tài khoản -->
      <div class="w-1/4 justify-end">
        <div v-if="auth.user">
          <div class="dropdown-container">
            <button class="header-link">
              <span>👋 {{ $t('hello') }},&nbsp;</span>
              <router-link to="/profile">{{ auth.user.name || auth.user.email }}</router-link>
            </button>
            <div class="dropdown-menu">
              <router-link to="/profile" class="item-center-css header-link">{{ $t('manage_account') }}</router-link>
              <router-link to="/admin" class="item-center-css header-link">{{ $t('admin_page') }}</router-link>
              <button @click="handleLogout" class="header-link item-center-css text-red-500">{{ $t('logout') }}</button>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center space-x-1">
          <router-link to="/login" class="text-blue-500 header-link">{{ $t('login') }}</router-link>
          <span>|</span>
          <router-link to="/login" class="text-blue-500 header-link">{{ $t('register') }}</router-link>
        </div>
      </div>
    </div>
  </header>
  <!-- Header cho trang Admin -->
  <header v-else class="header-admin w-full block item-center-css">
    <nav class="w-full flex justify-between items-center">
      <!-- Left (Logo or Home) -->
      <div class="w-1/4 item-center-css">
        <router-link to="/">
          <img src="/images/logo/logo.webp" alt="Logo"
            class="h-6 sm:h-10 md:h-12 lg:h-14 xl:h-20 object-contain cursor-pointer p-1" />
        </router-link>
        <!-- <router-link class="header-link" to="/">{{ $t('home') }}</router-link> -->
      </div>

      <!-- Center (Admin menu) -->
      <div class="w-2/4 item-center-css">
        <input type="text" placeholder="Search for datas & reports..."
          class="w-full p-2 border rounded-md focus:outline-none focus:ring" />
      </div>
      <div class="p-8 flex items-center gap-4">
        <div class="relative">
          <span class="text-xl">🔔</span>
          <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>
      </div>

      <!-- Right (User info) -->
      <div class="w-1/4  item-center-css">
        <div v-if="auth.user">
          <div class="dropdown-container">
            <button class="header-link">
              <div class="flex items-center gap-2">
                <img alt="Avatar" class="w-8 h-8 rounded-full"
                  src="/images/auth/avatar.webp" /> 
                <span class="font-semibold">BUI DAN</span>
              </div>
              <!-- <span>👋 {{ $t('hello') }},&nbsp;</span> -->
              <!-- <router-link to="/profile">{{ auth.user.name || auth.user.email }}</router-link> -->
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
import { watch, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const isLangOpen = ref(false)
function changeLanguage(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

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
