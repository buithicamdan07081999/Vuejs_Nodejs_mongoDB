
<template>
    <MainLayout>
      <div v-if="product" class="p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Product Image -->
          <div>
            <img :src="product.image" alt="Product Image" class="w-full h-80 object-cover" />
          </div>
  
          <!-- Product Info -->
          <div>
            <h2 class="text-2xl font-bold">{{ product.name }}</h2>
            <p class="text-gray-600 mt-2">{{ product.description }}</p>
            <p class="text-xl font-semibold mt-4">{{ formatPrice(product.price) }}</p>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Sản phẩm không tồn tại!</p>
      </div>
    </MainLayout>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import MainLayout from "@/layouts/MainLayout.vue";
  
  const route = useRoute();
  const product = ref(null);
  
  // Fake product data
  const products = [
    { id: 1, name: "Áo thun nam", price: 300000, description: "Áo thun chất lượng cao", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Giày thể thao", price: 1200000, description: "Giày chạy bộ êm ái", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Túi xách nữ", price: 800000, description: "Túi xách phong cách", image: "https://via.placeholder.com/150" },
  ];
  
  onMounted(() => {
    product.value = products.find((p) => p.id == route.params.id);
  });
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };
  </script>
  