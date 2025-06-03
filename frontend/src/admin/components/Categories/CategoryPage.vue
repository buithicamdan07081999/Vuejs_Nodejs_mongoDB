<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý danh mục</h1>

    <!-- Nút Thêm (canh phải) -->
    <div class="flex justify-end mb-4">
      <router-link to="/admin/category/add"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        + Thêm danh mục
      </router-link>
    </div>

    <!-- Bảng danh mục -->
    <table class="w-full text-black bg-white shadow rounded-xl">
      <thead class="bg-gray-100 text-lg font-bold">
        <tr>
          <th class="border p-2 text-center w-16">STT</th>
          <th class="border p-2 text-left">Tên danh mục</th>
          <th class="border p-2 text-center w-40">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category._id" class="hover:bg-gray-100 transition">
          <td class="border p-2 text-center">{{ index + 1 }}</td>
          <td class="border p-2">{{ category.name }}</td>
          <td class="border p-2 text-center">
            <div class="flex justify-center gap-2">
              <router-link :to="`/admin/category/edit/${category._id}`"
                class="bg-yellow-500 text-white px-3 py-1 rounded">
                Sửa
              </router-link>
              <button @click="deleteCategory(category._id)" class="bg-red-500 text-white px-3 py-1 rounded">
                Xoá
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      const res = await axios.get("/category");
      this.categories = res.data;
    },
    async deleteCategory(id) {
      const result = await Swal.fire({
        title: "Xác nhận xoá?",
        text: "Bạn không thể khôi phục sau khi xoá.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(`/category/${id}`);
          this.fetchCategories();
          // Hiển thị toast thông báo thành công
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Đã xoá danh mục',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });

        } catch (err) {
          console.error('Lỗi khi xoá:', err);
          Swal.fire('Lỗi', 'Không thể xoá danh mục', 'error');
        }
      }
    }
    ,
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
