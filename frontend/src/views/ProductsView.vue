<!-- src/views/ProductsView.vue -->
<script setup>
import { ref, computed } from 'vue';

// Danh sách sản phẩm giả lập
// Fake data sản phẩm
const products = ref([
  { id: 1, name: "Donut", category: "desserts", price: 200000, image: "../../../public/images/donut.avif" },
  { id: 2, name: "Pizza", category: "Fastfoods", price: 1500000, image: "../../../public/images/pizza.avif" },
  { id: 3, name: "Ham", category: "Fastfoods", price: 500000, image: "../../../public/images/thitnguoi.avif" },
  { id: 4, name: "Egg", category: "Fastfoods", price: 1200000, image: "../../../public/images/egg.avif" },
  { id: 5, name: "Burger", category: "Fastfoods", price: 200000, image: "../../../public/images/donut.avif" },
  { id: 6, name: "Spaghetti", category: "Fastfoods", price: 1500000, image: "../../../public/images/pizza.avif" },
  { id: 7, name: "Pasta", category: "Fastfoods", price: 500000, image: "../../../public/images/thitnguoi.avif" },
  { id: 8, name: "Pancake", category: "desserts", price: 1200000, image: "../../../public/images/egg.avif" },
]);

// Category Search / Search theo danh muc
// const productsname = ref(["All", "Donut", "Pizza", "Ham", "Egg", "Burger", "Spaghetti", "Pasta", "Pancake"]);


// ref(): Tạo biến reactive.
const categories = ref(["All", "desserts", "Fastfoods"]);
const selectedCategory = ref("All"); //tên v-model trong input
const searchQuery = ref(""); //tên v-model trong input

// Lọc sản phẩm theo danh mục và tìm kiếm
// computed(() => { ... }) Đây là một tính toán phản ứng (reactive computation) trong Vue.
// filteredProducts sẽ tự động cập nhật, Mỗi khi products, selectedCategory hoặc searchQuery thay đổi.


// Biến chứa các sản phẩm tương ứng trong bộ lọc
const filteredProducts = computed(() => {
  // products.value.filter(); : lọc sản phẩm
  return products.value.filter(product => {
    const productname = product.name;
    const productcategory = product.category;
    const Categoryvalue = selectedCategory.value;
    const SearchValue = searchQuery.value;

    const matchCategory = Categoryvalue === "All" || Categoryvalue === productcategory;
    const matchSearch = productname.toLowerCase().includes(SearchValue.toLowerCase());

    // if (Categoryvalue != "All" && matchCategory) {
    //   console.log(product.id, ".Tên sản phẩm: ", productname, " | Tên danh mục: ", productcategory, " | Kiểu dữ liệu:", typeof product.category);
    // }

    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4 text-white">Product List</h1>

    <!-- Ô tìm kiếm -->
    <input v-model="searchQuery" type="text" placeholder="Search products..."
      class="border p-2 w-full mb-4 rounded text-black" />

    <!-- Bộ lọc danh mục -->
    <select v-model="selectedCategory" class="border p-2 rounded w-full mb-4 text-black">
      <option v-for="category in categories" :key="category">{{ category }}</option>
      <!-- :key="category": Gán key duy nhất để Vue tối ưu hóa hiệu suất khi render. -->
    </select>

    <!-- Danh sách sản phẩm -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in filteredProducts" :key="product.id" class="p-4 border rounded-lg text-center">
        <!-- <div v-for="product in filteredProducts" :key="product.id" class="p-4 bg-gray-100 rounded-lg text-center"> -->
        <img :src="product.image" class="w-full h-32 object-cover rounded" />
        <h3 class="mt-2 font-semibold">{{ product.name }}</h3>
        <p class="text-gray-700">{{ product.category }}</p>
        <p class="text-red-500 font-bold">{{ product.price.toLocaleString() }} VNĐ</p>
        <router-link class="text-blue-500 font-bold hover:bg-blue-700 hover:text-white" :to="'/products/' + product.id">Xem chi tiết</router-link>
      </div>
    </div>
  </div>
</template>
