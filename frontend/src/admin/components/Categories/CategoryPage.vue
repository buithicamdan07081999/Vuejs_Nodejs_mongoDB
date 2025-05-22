<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Quản lý danh mục</h1>

    <!-- Form -->
    <form @submit.prevent="isEditing ? updateCategory() : addCategory()" class="mb-6 flex gap-2">
      <input v-model="categoryName" type="text" placeholder="Tên danh mục"
        class="border px-3 py-2 rounded w-full" />
      <button type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ isEditing ? 'Cập nhật' : 'Thêm' }}
      </button>
    </form>

    <!-- Bảng danh mục -->
    <table class="w-full text-sm border bg-white shadow">
      <thead class="bg-gray-100 font-bold">
        <tr>
          <th class="border px-4 py-2">STT</th>
          <th class="border px-4 py-2 text-left">Tên danh mục</th>
          <th class="border px-4 py-2 text-center">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category._id"
          class="hover:bg-gray-50 transition">
          <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ category.name }}</td>
          <td class="border px-4 py-2 text-center">
            <button @click="editCategory(category)" class="text-yellow-600 font-bold mr-3">Sửa</button>
            <button @click="deleteCategory(category._id)" class="text-red-600 font-bold">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      categories: [],
      categoryName: '',
      isEditing: false,
      editingId: null
    };
  },
  methods: {
    async fetchCategories() {
      const res = await axios.get('/api/categories');
      this.categories = res.data;
    },
    async addCategory() {
      if (!this.categoryName.trim()) return;
      try {
        await axios.post('/api/categories', { name: this.categoryName });
        this.categoryName = '';
        this.fetchCategories();
      } catch (err) {
        Swal.fire('Lỗi', err.response?.data?.message || 'Thêm thất bại', 'error');
      }
    },
    editCategory(category) {
      this.categoryName = category.name;
      this.editingId = category._id;
      this.isEditing = true;
    },
    async updateCategory() {
      try {
        await axios.put(`/api/categories/${this.editingId}`, { name: this.categoryName });
        this.categoryName = '';
        this.isEditing = false;
        this.editingId = null;
        this.fetchCategories();
      } catch (err) {
        Swal.fire('Lỗi', err.response?.data?.message || 'Cập nhật thất bại', 'error');
      }
    },
    async deleteCategory(id) {
      const result = await Swal.fire({
        title: 'Xác nhận xoá?',
        text: 'Bạn không thể khôi phục sau khi xoá.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ'
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/categories/${id}`);
        this.fetchCategories();
      }
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 1px #3182ce;
}
</style>