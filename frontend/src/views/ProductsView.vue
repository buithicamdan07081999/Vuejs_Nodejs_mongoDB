<!-- src/views/ProductsView.vue -->
<script setup>
import { ref, computed } from 'vue';

// Danh sách sản phẩm giả lập
const products = ref([
  { id: 1, name: "Áo thun", category: "Quần áo", price: 200000, image: "../../public/images/donut.avif" },
  { id: 2, name: "Giày Nike", category: "Giày dép", price: 1500000, image: "../../public/images/pizza.avif" },
  { id: 3, name: "Túi xách", category: "Phụ kiện", price: 500000, image: "../../public/images/thitnguoi.avif" },
  { id: 4, name: "Tai nghe Bluetooth", category: "Thiết bị điện tử", price: 1200000, image: "../../public/images/egg.avif" }
]);

// Danh sách danh mục
const categories = ref(["Tất cả", "Quần áo", "Giày dép", "Phụ kiện", "Thiết bị điện tử"]);
const selectedCategory = ref("Tất cả");
const searchQuery = ref("");

// Lọc sản phẩm theo danh mục và tìm kiếm
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchCategory = selectedCategory.value === "Tất cả" || product.category === selectedCategory.value;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4 text-white">Danh sách sản phẩm</h1>

    <!-- Ô tìm kiếm -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      class="border p-2 w-full mb-4 rounded text-black"
    />

    <!-- Bộ lọc danh mục -->
    <select v-model="selectedCategory" class="border p-2 rounded w-full mb-4 text-black">
      <option v-for="category in categories" :key="category">{{ category }}</option>
    </select>

    <!-- Danh sách sản phẩm -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in filteredProducts" :key="product.id" class="p-4 bg-gray-100 rounded-lg text-center">
        <img :src="product.image" class="w-full h-32 object-cover rounded" />
        <h3 class="mt-2 font-semibold">{{ product.name }}</h3>
        <p class="text-gray-700">{{ product.category }}</p>
        <p class="text-red-500 font-bold">{{ product.price.toLocaleString() }} VNĐ</p>
      </div>
    </div>
  </div>
</template>
