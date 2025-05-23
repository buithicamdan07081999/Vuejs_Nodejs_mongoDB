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

      <div class="flex justify-end">
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
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();
const name = ref('');

// Gửi request thêm danh mục
const addCategory = async () => {
  try {
    await axios.post('/categories', { name: name.value });
    // ✅ Toast góc phải khi thành công
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Đã thêm danh mục mới',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
    router.push('/admin/categories');
  } catch (err) {
    console.error('Lỗi thêm danh mục:', err);

    // ❌ Giữ alert nếu lỗi để người dùng dễ thấy
    Swal.fire('Lỗi', err.response?.data?.message || 'Không thể thêm danh mục', 'error');
  }
};
</script>
