<template>
  <header class="bg-white text-black shadow-md p-2 w-full fixed top-0 left-0">
    <nav class="grid grid-cols-3 text-center">
      <router-link to="/">Trang chủ</router-link>
      <router-link to="#">Quản lý</router-link>
      <router-link to="#">Search</router-link>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
nav {
  padding: 2px;
}

nav a {
  color: rgb(4, 0, 0);
  margin: 0 3px;
  text-decoration: none;
}
</style>
