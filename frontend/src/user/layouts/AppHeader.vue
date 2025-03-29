<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2">
    <nav class="flex justify-center space-x-4">
      <router-link to="/">Trang chủ</router-link>
      <router-link to="#">Quản lý</router-link>
      <router-link to="#">Search</router-link>
    </nav>
  </header>
</template>


<!-- fixed top-0 left-0 → Giữ Header cố định trên đầu.

w-full → Chiếm toàn bộ chiều rộng.

z-50 → Đảm bảo Header nằm trên banner hoặc các phần tử khác.

p-2 → Tạo khoảng padding để không bị dính vào mép màn hình. -->

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
