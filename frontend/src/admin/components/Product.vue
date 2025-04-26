<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý sản phẩm</h1>

    <!-- Thanh tìm kiếm -->
    <div class="flex justify-between mb-4">
      <input v-model="search" @input="handleSearch" type="text" placeholder="Tìm kiếm sản phẩm..."
        class="border text-blue-800 p-2 rounded w-1/3" />
      <router-link to="/admin/products/add" class="bg-blue-500 text-white px-4 py-2 rounded inline-block text-center">
        + Thêm sản phẩm
      </router-link>
    </div>

    <!-- Bảng danh sách -->
    <table class="w-full text-black bg-white shadow rounded-xl">
      <thead>
        <tr class="text-lg font-bold bg-gray-100">
          <th class="border p-2 w-12">STT</th>
          <th class="border p-2">Tên</th>
          <th class="border p-2">Giá</th>
          <th class="border p-2">Danh mục</th>
          <th class="border p-2">Hình ảnh</th>
          <th class="border p-2">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product._id">
          <td class="border p-2 text-center">
            {{ index + 1 + (page - 1) * limit }}
          </td>
          <td class="border p-2">{{ product.name }}</td>
          <td class="border p-2">{{ product.price.toLocaleString() }} đ</td>
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

    <!-- Phân trang -->
    <div class="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button @click="prevPage" :disabled="page === 1"
        class="px-3 py-1 bg-gray-400 text:white rounded disabled:opacity-50">
        &lt;
      </button>

      <button v-for="n in totalPages" :key="n" @click="goToPage(n)" :class="[
        'px-3 py-1 rounded',
        n === page ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white hover:bg-gray-300'
      ]">
        {{ n }}
      </button>

      <button @click="nextPage" :disabled="page === totalPages"
        class="px-3 py-1 bg-gray-400 text:white rounded disabled:opacity-50">
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      search: "",
      products: [],
      page: 1,
      limit: 10,
      totalPages: 1,
      debounceTimer: null,
    };
  },
  methods: {
    async fetchProducts() {
      const res = await fetch(
        `http://localhost:5000/api/products?search=${this.search}&page=${this.page}&limit=${this.limit}`
      );
      const data = await res.json();
      this.products = data.products;
      this.totalPages = data.totalPages;
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchProducts();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchProducts();
      }
    },
    goToPage(n) {
      if (n !== this.page) {
        this.page = n;
        this.fetchProducts();
      }
    },
    async deleteProduct(id) {
      const result = await Swal.fire({
        title: "Bạn chắc chắn muốn xoá?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Vâng, xoá!",
        cancelButtonText: "Huỷ",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE",
          });
          this.fetchProducts();
          Swal.fire("Đã xoá!", "Sản phẩm đã được xoá.", "success");
        } catch (err) {
          console.error("Lỗi xoá sản phẩm:", err);
          Swal.fire("Lỗi", "Không thể xoá sản phẩm", "error");
        }
      }
    },
    handleSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.page = 1; // reset về trang đầu khi tìm kiếm
        this.fetchProducts();
      }, 300);
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
