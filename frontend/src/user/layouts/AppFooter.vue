<template>
    <footer class="bg-gray-800 text-white text-center p-2">
      <p>&copy; {{ currentYear }} - Copyright</p>
    </footer>
  </template>
  
  <script setup>
  import { computed } from "vue";
  const currentYear = computed(() => new Date().getFullYear());
  </script>
  