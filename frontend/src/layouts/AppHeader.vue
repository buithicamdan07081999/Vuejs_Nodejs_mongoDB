<template>
    <header class="h-16 bg-blue-500 text-white flex items-center px-4">
        <nav>
            <router-link to="/">Trang chủ</router-link>
            <router-link to="/admin">Quản lý</router-link>
            <router-link to="/admin">Search</router-link>
        </nav>
    </header>
</template>

<script setup>
</script>

<style scoped>
nav {
  padding: 10px;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
</style>
