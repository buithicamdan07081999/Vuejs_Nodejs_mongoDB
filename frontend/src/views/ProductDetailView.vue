<template>
  <MainLayout>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      
      <!-- Bộ lọc và tìm kiếm -->
      <ProductFilter @updateFilter="updateFilter" />

      <!-- Danh sách sản phẩm -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <ProductItem v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import ProductItem from "@/components/products/ProductItem.vue";
import ProductFilter from "@/components/products/ProductFilter.vue";

// Danh sách sản phẩm giả định
// Fake data sản phẩm
const products = ref([
{ id: 1, name: "Donut", category: "Dersert", price: 200000, image: "../../../public/images/donut.avif" },
{ id: 2, name: "Pizza", category: "Fastfood", price: 1500000, image: "../../../public/images/pizza.avif" },
{ id: 3, name: "Ham", category: "Fastfood", price: 500000, image: "../../../public/images/thitnguoi.avif" },
{ id: 4, name: "Egg", category: "Fastfood", price: 1200000, image: "../../../public/images/egg.avif" }
]);

const filter = ref({ search: "", category: "All" });

// Cập nhật bộ lọc
const updateFilter = (newFilter) => {
  filter.value = newFilter;
};

// Lọc sản phẩm theo bộ lọc
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    return (filter.value.category === "All" || product.category === filter.value.category) &&
           product.name.toLowerCase().includes(filter.value.search.toLowerCase());
  });
});
</script>