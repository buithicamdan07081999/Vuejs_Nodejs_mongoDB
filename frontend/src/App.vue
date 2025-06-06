<script setup>
import { RouterView } from 'vue-router';
import AppHeaderUser from './layouts/UserLayout/UserHeader.vue';
// import AppHeaderAdmin from './layouts/AdminLayout/AppHeaderAdmin.vue';
import Footer from './layouts/UserLayout/AppFooter.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeaderUser class="w-full"/>
    <main class="flex-grow w-full pt-header">
      <router-view />
    </main>
    <Footer class="w-full" />
  </div>
</template>
