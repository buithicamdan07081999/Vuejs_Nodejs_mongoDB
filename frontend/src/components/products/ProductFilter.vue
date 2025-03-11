<!-- Giao dien Search -->
<template>
  <div class="flex space-x-4">
    <input v-model="search" type="text" placeholder="Tìm kiếm..." class="border p-2 rounded" />
    <!-- v-model="search": Gán giá trị của ô nhập liệu (input) vào biến search trong Vue. -->
    <select v-model="category" class="border p-2 rounded text-black">
      <!-- v-model="category": Gán giá trị của dropdown vào biến category. -->
      <option value="All">All</option>
      <option value="Donut">Donut</option>
      <option value="Pizza">Pizza</option>
      <option value="Ham">Ham</option>
      <option value="Egg">Egg</option>
    </select>
    <button @click="applyFilter" class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
  </div>
</template>
<!-- Giao dien Search -->

<script setup>
import { ref, defineEmits } from "vue";
// ref: Được dùng để tạo các biến phản ứng (search, category).
// defineEmits: Dùng để khai báo sự kiện (updateFilter) mà component có thể phát ra.

const search = ref("");
const category = ref("All");

const emit = defineEmits(["updateFilter"]);
// emit: Kích hoạt sự kiện "updateFilter" khởi tạo (lần đầu load).

const applyFilter = () => {
  emit("updateFilter", { search: search.value, category: category.value });
};
// Kích hoạt sự kiện "updateFilter" khi nhấn nút "Seach", hàm applyFilter() được gọi.
// Hàm này phát ra sự kiện "updateFilter", gửi dữ liệu tìm kiếm (search) và danh mục (category) ra ngoài.
</script>

<!-- Cách component này hoạt động
Người dùng nhập từ khóa tìm kiếm hoặc chọn danh mục.
Nhấn nút "Seach", gọi hàm applyFilter().
Sự kiện "updateFilter" được phát ra với dữ liệu { search, category }.
Component cha có thể nhận sự kiện này để thực hiện lọc dữ liệu. -->