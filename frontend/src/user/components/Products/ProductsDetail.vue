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
    console.log(product.value);
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
      <div class="flex justify-center items-center shadow-md">
        <img :src="product.image" alt="Product Image"
          class="w-full max-w-xs md:max-w-lg lg:max-w-md h-auto object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105" />
      </div>
      <!-- Thông tin -->
      <div class="p-6 rounded-lg shadow-md space-y-5 text-white">
        <!-- Tên sản phẩm -->
        <h1 class="text-2xl font-bold leading-tight">
          {{ product.name }}
        </h1>
        <!-- Giá sản phẩm -->
        <p class="text-3xl text-red-500 font-bold">
          {{ Number(product.price).toLocaleString('vi-VN') }}₫
        </p>
        <!-- Mô tả sản phẩm -->
        <div class="border-t pt-4">
          <p class="text-gray-400">
            {{ product.description }}
          </p>
        </div>
        <!-- Thông tin thêm -->
        <div class="border-t pt-4 text-sm space-y-2 font-medium">
          <p>
            <span>Danh mục: </span><span class="text-yellow-200">{{ product.category }}</span> 
          </p>
          <p v-if="product.size">
            <span class="">Kích thước:</span>
            <span class="inline-block bg-gray-100 px-2 py-1 rounded text-sm ml-1 text-black">{{ product.size }}</span>
          </p>
        </div>
        <!-- Nút mua -->
        <button
          class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:shadow-lg transition duration-300">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center">Product does not exist!</p>
  </div>

</template>
