<template>
  <div class="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow text-black">
    <h2 class="text-xl font-bold mb-4">Cập nhật danh mục</h2>

    <form @submit.prevent="updateCategory" class="space-y-4">
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
          Cập nhật
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const categoryId = route.params.id;

const name = ref('');

// Lấy danh mục theo id
const fetchCategory = async () => {
  try {
    const res = await axios.get(`/category/${categoryId}`);
    name.value = res.data.name;
  } catch (err) {
    console.error('Lỗi khi tải danh mục:', err);
    Swal.fire('Lỗi', 'Không thể tải danh mục', 'error');
  }
};

// Cập nhật danh mục
const updateCategory = async () => {
  try {
    await axios.put(`/category/${categoryId}`, { name: name.value });
    // ✅ Toast góc phải khi thành công
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Cập nhật thành công',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
    router.push('/admin/category');
  } catch (err) {
    console.error('Lỗi cập nhật danh mục:', err);
    Swal.fire('Lỗi', err.response?.data?.message || 'Không thể cập nhật', 'error');
  }
};

onMounted(fetchCategory);
</script>
