<template>
  <div class="border p-4 flex items-center justify-between rounded shadow-sm">
    <div>
      <h2 class="font-semibold">{{ item.name }}</h2>
      <p>Giá: {{ item.price.toLocaleString() }}đ</p>
      <p>Số lượng: {{ item.qty }}</p>
    </div>
    <button
      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      @click="$emit('remove')"
    >
      Xóa
    </button>
  </div>
</template>

<script setup>
defineProps(['item'])
</script>