<script setup>
import { RouterView } from 'vue-router';
import Header from './layouts/AppHeader.vue';
import Footer from './layouts/AppFooter.vue';
// import Sidebar from '@/layouts/AppSidebar.vue';
</script>

<template>
    <div class=" flex-1 flex flex-col w-full">
      <Header />
      <div class="flex-1 flex flex-col w-full mt-9">
        <main class="flex-1 overflow-auto mt-12">
          <RouterView />
        </main>
        <Footer class="h-12 bg-gray-800 text-white text-center p-2" />
      </div>
    </div>
</template>
