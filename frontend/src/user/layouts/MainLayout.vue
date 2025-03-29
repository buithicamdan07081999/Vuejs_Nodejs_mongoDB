<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <!-- <aside class="w-1/5 bg-gray-800 text-white p-4">
        <Sidebar />
      </aside> -->
  
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Import Header -->
        <Header />  
        <!-- Nội dung chính -->
        <main class="flex-1 p-4 overflow-auto">
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
  