<template>
    <div v-if="product" class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Ảnh sản phẩm -->
        <div>
          <img :src="product.image" alt="Product Image" class="w-full h-80 object-cover" />
        </div>

        <!-- Thông tin sản phẩm -->
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);


const products = [
  { id: 1, name: "Donut", price: 200000, description: "Áo thun chất lượng cao", image: "../../../public/images/donut.avif" },
  { id: 2, name: "Pizza", price: 1500000, description: "Áo thun chất lượng cao", image: "../../../public/images/pizza.avif" },
  { id: 3, name: "Ham", price: 500000, description: "Áo thun chất lượng cao", image: "../../../public/images/thitnguoi.avif" },
  { id: 4, name: "Egg", price: 1200000, description: "Áo thun chất lượng cao", image: "../../../public/images/egg.avif" },
];


onMounted(() => {
  const productId = parseInt(route.params.id);
  product.value = products.find((p) => p.id === productId);

  console.log("Route ID:", route.params.id, "Type:", typeof route.params.id);
  console.log("Products:", products);
  console.log("Found Product:", product.value);
});
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};
</script>
