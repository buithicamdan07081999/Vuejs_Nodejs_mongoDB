<template>
    <div>
      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        class="border p-2 w-full mb-4"
      />
  
      <!-- Filter Price -->
      <div class="mb-4">
        <label for="price" class="block">Lọc theo giá:</label>
        <select v-model="selectedPrice" class="border p-2">
          <option value="">Tất cả</option>
          <option value="low">Dưới 500K</option>
          <option value="mid">500K - 1 Triệu</option>
          <option value="high">Trên 1 Triệu</option>
        </select>
      </div>
  
      <!-- Product Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import ProductItem from "./ProductItem.vue";
  
  // Fake data sản phẩm
  const products = ref([
  { id: 1, name: "Donut", category: "Dersert", price: 200000, image: "../../../public/images/donut.avif" },
  { id: 2, name: "Pizza", category: "Fastfood", price: 1500000, image: "../../../public/images/pizza.avif" },
  { id: 3, name: "Ham", category: "Fastfood", price: 500000, image: "../../../public/images/thitnguoi.avif" },
  { id: 4, name: "Egg", category: "Fastfood", price: 1200000, image: "../../../public/images/egg.avif" }
]);
  
  const searchQuery = ref("");
  const selectedPrice = ref("");
  
  // Filter products
  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesPrice =
        !selectedPrice.value ||
        (selectedPrice.value === "low" && product.price < 500000) ||
        (selectedPrice.value === "mid" && product.price >= 500000 && product.price <= 1000000) ||
        (selectedPrice.value === "high" && product.price > 1000000);
  
      return matchesSearch && matchesPrice;
    });
  });
  </script>
  