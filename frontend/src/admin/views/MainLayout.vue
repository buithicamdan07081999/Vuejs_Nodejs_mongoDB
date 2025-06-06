<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar :isSidebarHovered="isSidebarHovered" @hover-change="val => isSidebarHovered = val" />
    <div class="flex flex-col flex-1 overflow-hidden">
      <component :is="headerComponent" class="header-admin" />
      <main
        class="flex-1 overflow-y-auto transition-all duration-300 bg-gray-100"
        :class="isSidebarHovered ? 'pl-64' : 'pl-16'"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Sidebar from '@/layouts/AdminLayout/Sidebar.vue';
import AppHeaderUser from '@/layouts/UserLayout/UserHeader.vue'
import AppHeaderAdmin from '@/layouts/AdminLayout/AdminHeader.vue'
const route = useRoute()
const headerComponent = computed(() =>
  route.path.startsWith('/admin') ? AppHeaderAdmin : AppHeaderUser
)
const isSidebarHovered = ref(false)
</script>