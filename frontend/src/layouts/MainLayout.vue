<!-- MainLayouts.vue -->
<template>
  <div>
    <component :is="headerComponent" />
    <div class="pt-16 flex flex-col min-h-screen">
      <main class="flex-1 overflow-auto">
        <div class="pt-4 px-4">
          <RouterView />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeaderUser from '@/layouts/UserLayout/UserHeader.vue'
import AppHeaderAdmin from '@/layouts/AdminLayout/AdminHeader.vue'
import Footer from '@/layouts/AppFooter.vue'

const route = useRoute()
const headerComponent = computed(() =>
  route.path.startsWith('/admin') ? AppHeaderAdmin : AppHeaderUser
)
</script>