<template>
    <header class="h-16 text-white flex items-center px-4">
        <nav>
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
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
</style>
