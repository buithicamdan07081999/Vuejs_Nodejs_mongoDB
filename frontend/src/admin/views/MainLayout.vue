<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar :isSidebarHovered="isSidebarHovered" @hover-change="val => isSidebarHovered = val" />
    <div class="flex flex-col flex-1 overflow-hidden">
      <Header class="header-admin" />
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
import { ref } from 'vue'
import Sidebar from '@/layouts//Sidebar.vue';
import Header from '@/layouts/AppHeader.vue'

const isSidebarHovered = ref(false)
</script>