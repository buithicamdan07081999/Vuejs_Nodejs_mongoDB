<template>
  <div>
    <!-- Header cố định -->
    <Header />

    <!-- Nội dung chính -->
    <div class="pt-16 flex flex-col h-screen">
      <main class="flex-1 overflow-aut">
        <div class="pt-16 px-4">
          <RouterView />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from "@/layouts/AppHeader.vue"
import Footer from "@/layouts/AppFooter.vue"
</script>
