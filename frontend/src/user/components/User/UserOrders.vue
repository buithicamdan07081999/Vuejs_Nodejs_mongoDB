<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
    <div v-if="orders.length">
      <div v-for="order in orders" :key="order._id" class="border p-4 mb-4 rounded shadow">
        <p><strong>Mã đơn:</strong> {{ order._id }}</p>
        <p><strong>Ngày đặt:</strong> {{ formatDate(order.createdAt) }}</p>
        <p><strong>Tổng tiền:</strong> {{ order.totalPrice.toLocaleString() }}đ</p>
      </div>
    </div>
    <div v-else>
      <p>Chưa có đơn hàng nào.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);

onMounted(async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('/api/orders/my-orders', {
    headers: { Authorization: `Bearer ${token}` }
  });
  orders.value = res.data;
});

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
</script>