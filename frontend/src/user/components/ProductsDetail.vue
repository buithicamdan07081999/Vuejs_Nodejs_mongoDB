<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const product = ref({});
const route = useRoute();
const productId = route.params.id;

// Hàm lấy thông tin sản phẩm từ API
const fetchProduct = async () => {
  try {
    const response = await axios.get(`/products/${productId}`);
    product.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
  }
};

// Khi component được load thì gọi API
onMounted(fetchProduct);
</script>

<template>
  <div v-if="product" class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img :src="product.image" alt="Product Image" class="w-full h-120 object-cover" />
        </div>
        <div>
          <h2 class="text-2xl font-bold">{{ product.name }}</h2>
          <p class="text-gray-600 mt-2">{{ product.description }}</p>
          <p class="text-xl font-semibold mt-4">{{ product.price }}</p>
          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Product does not exist!</p>
    </div>

</template>
