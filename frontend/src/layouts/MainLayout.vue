
<template>
    <div>
      <Header />
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-4">
          <slot />
        </main>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  import Footer from '@/components/Footer.vue';
  </script>
  