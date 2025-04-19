<template>
    <div>
      <!-- Sidebar -->
      <Sidebar :isSidebarHovered="isSidebarHovered" @hover-change="val => isSidebarHovered = val" />
  
      <!-- Nội dung -->
      <main
        class="transition-all duration-300 p-6 bg-gray-100 min-h-screen"
        :class="isSidebarHovered ? 'pl-64' : 'pl-16'"
      >
        <router-view />
      </main>
    </div>
  </template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue';
const isSidebarHovered = ref(false)
</script>