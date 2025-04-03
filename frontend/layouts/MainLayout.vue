<template>
    <div class="flex h-screen">
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Import Header -->
        <Header />  
        <!-- Nội dung chính -->
        <main class="p-4 overflow-auto">
          <RouterView />
        </main>
        <Footer />  
      </div>
    </div>
  </template>
  
  <script setup>
  import Header from "@/layouts/AppHeader.vue"; // Import Header
  import Footer from "@/layouts/AppFooter.vue";
//   import Sidebar from "@/layouts/AppSidebar.vue";
  </script>
  