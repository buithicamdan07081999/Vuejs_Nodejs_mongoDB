<script setup>
defineProps(["product"]); // Đảm bảo prop này được dùng trong template
</script>

<template>
  <div>
    <h2>{{ product.name }}</h2>  <!-- Dùng prop ở đây -->
    <p>{{ product.price }}</p>
  </div>
</template>
