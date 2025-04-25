<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý sản phẩm</h1>
    <!-- Thanh tìm kiếm -->
    <div class="flex justify-between mb-4">
      <input v-model="search" type="text" placeholder="Tìm kiếm sản phẩm..." class="border p-2 rounded w-1/3" />
      <router-link to="/admin/products/add" class="bg-blue-500 text-white px-4 py-2 rounded inline-block text-center">
        + Thêm sản phẩm
      </router-link>
    </div>

    <!-- Bảng danh sách sản phẩm -->
    <table class="w-full text-black bg-white shadow rounded-xl">
      <thead>
        <tr class="text-2xl font-bold">
          <th class="border p-2">Tên</th>
          <th class="border p-2">Giá</th>
          <th class="border p-2">Danh mục</th>
          <th class="border p-2">Hình ảnh</th>
          <th class="border p-2">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td class="border p-2">{{ product.name }}</td>
          <td class="border p-2">{{ product.price }}</td>
          <td class="border p-2">{{ product.category }}</td>
          <td class="border p-2">
            <img :src="product.image" alt="Ảnh" class="w-16 h-16 object-cover" />
          </td>
          <td class="border p-2">
            <router-link :to="`/admin/products/edit/${product._id}`"
              class="bg-yellow-500 text-white px-2 py-1 rounded inline-block text-center">
              Sửa
            </router-link>
            <button @click="deleteProduct(product._id)" class="bg-red-500 text-white px-2 py-1 rounded ml-2">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      search: "",
      products: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((p) =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    // hiển thị
    async fetchProducts() {
      const res = await fetch("http://localhost:5000/api/products");
      this.products = await res.json();
    },
    // xóa
    async deleteProduct(id) {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: 'Sản phẩm sẽ bị xoá vĩnh viễn!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Vâng, xoá!',
        cancelButtonText: 'Huỷ'
      });

      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'DELETE'
          });

          // Load lại danh sách
          await this.fetchProducts();
          Swal.fire({
            title: 'Đã xoá!',
            text: 'Sản phẩm đã được xoá.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (err) {
          console.error('❌ Lỗi xoá sản phẩm:', err);
          Swal.fire('Thất bại', 'Không thể xoá sản phẩm', 'error');
        }
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
