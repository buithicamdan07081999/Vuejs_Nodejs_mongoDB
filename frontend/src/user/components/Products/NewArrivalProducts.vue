<script setup>
import { formatDate, daysAgo } from '@/format/dateFormat';
defineProps({
  items: Array
});
defineEmits(['delete']);
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-white">Danh sách sản phẩm mới</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div v-for="p in items" :key="p._id" class="category-card">
        <img :src="p.image" :alt="p.name" class="category-img" />
        <p class="text-yellow-500 font-bold">
          ({{ daysAgo(p.createdAt) }} ngày trước)<br/>
          {{ formatDate(p.createdAt) }}
        </p>
        <p class="text-center font-medium">{{ p.name }}</p>
        <p class="text-center text-gray-700 font-medium">{{ p.category }}</p>
        <p class="text-red-500 font-bold">{{ p.price }} VNĐ</p>
        <button @click="$emit('delete', p._id)">Xóa</button><br/>
        <router-link class="text-blue-500 font-bold" :to="`/product/${p._id}`">Xem chi tiết</router-link>
      </div>
    </div>
  </div>
</template>
