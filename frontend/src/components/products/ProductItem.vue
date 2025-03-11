<template>
  <div class="border p-4 rounded-lg shadow">
    <img :src="product.image" alt="Product Image" class="w-full h-40 object-cover mb-2" />
    <h2 class="text-lg font-bold">{{ product.name }}</h2>
    <p class="text-xl font-semibold">{{ formatPrice(product.price) }}</p>
    <router-link :to="'/product/' + product.id" class="text-blue-500 mt-2 inline-block">Xem chi tiết</router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  product: Object  
});

// Kiểm tra props nhận vào
  console.log("Received product:", props.product);

// Nhận dữ liệu product từ component cha.
// Dữ liệu này chứa name, image, price, id

// Định dạng giá tiền
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};
</script> 
