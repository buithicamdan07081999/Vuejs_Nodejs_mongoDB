<template>
  <div class="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow text-black">
    <h2 class="text-xl font-bold mb-4">Thêm danh mục mới</h2>

    <form @submit.prevent="addCategory" class="space-y-4">
      <div>
        <label class="block font-medium mb-1">Tên danh mục</label>
        <input
          v-model="name"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Nhập tên danh mục"
          required
        />
      </div>

      <div class="flex justify-between">
        <!-- Nút quay lại -->
        <button
          type="button"
          @click="backToPrevious"
          class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
        >
          Quay lại
        </button>

        <!-- Nút thêm danh mục -->
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Thêm
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/axios';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();

const name = ref('');

// Hàm điều hướng quay lại trang trước, có xử lý state nếu đến từ trang thêm sản phẩm
const backToPrevious = () => {
  if (route.query.from === 'add-product') {
    // Lấy dữ liệu state nếu có
    const productData = route.query.state ? JSON.parse(route.query.state) : null;

    router.push({
      path: '/admin/product/add',
      query: {
        restored: 'true',
        // Nếu productData null thì stringify sẽ trả về null chuỗi
        state: productData ? JSON.stringify(productData) : '',
      },
    });
  } else {
    router.push('/admin/category'); // Mặc định quay về trang danh sách danh mục
  }
};

// Hàm thêm danh mục mới
const addCategory = async () => {
  try {
    await axios.post('/category', { name: name.value });

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Đã thêm danh mục mới',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    if (route.query.from === 'add-product') {
      const state = route.query.state || ''
      router.push({
        path: '/admin/product/add',
        query: {
          restored: 'true',
          state,
        }
      });
    } else {
      router.push('/admin/category');
    }
  } catch (err) {
    console.error('Lỗi thêm danh mục:', err);

    Swal.fire(
      'Lỗi',
      err.response?.data?.message || 'Không thể thêm danh mục',
      'error'
    );
  }
};

</script>
