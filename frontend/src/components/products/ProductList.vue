<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
  
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
    { id: 1, name: "Áo thun nam", price: 300000, category: "Clothing", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Giày thể thao", price: 1200000, category: "Shoes", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Túi xách nữ", price: 800000, category: "Bags", image: "https://via.placeholder.com/150" },
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
  