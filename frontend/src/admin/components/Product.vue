<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý sản phẩm</h1>

    <!-- Thanh tìm kiếm -->
    <div class="flex justify-between mb-4">
      <input v-model="search" @input="handleSearch" type="text" placeholder="Tìm kiếm sản phẩm..."
        class="border text-blue-800 p-2 rounded w-1/3" />
      <router-link to="/admin/products/add" class="bg-blue-500 text-white px-4 py-2 rounded">
        + Thêm sản phẩm
      </router-link>
    </div>

    <!-- Bảng sản phẩm -->
    <table class="w-full text-black bg-white shadow rounded-xl">
      <thead class="bg-gray-100 text-lg font-bold">
        <tr>
          <th class="border p-2 w-12 text-center">STT</th>
          <th class="border p-2 text-center">Tên</th>
          <th class="border p-2 text-center">Giá</th>
          <th class="border p-2 text-center">Danh mục</th>
          <th class="border p-2 text-center">Hình ảnh</th>
          <th class="border p-2 text-center">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product._id" class="hover:bg-gray-100 transition text-center">
          <td class="border p-2">{{ index + 1 + (page - 1) * limit }}</td>
          <td class="border p-2">{{ product.name }}</td>
          <td class="border p-2">{{ product.price.toLocaleString() }}</td>
          <td class="border p-2">{{ product.category }}</td>

          <!-- Căn giữa ảnh -->
          <td class="border p-2">
            <div class="flex justify-center">
              <img :src="product.image" alt="Ảnh" class="w-16 h-16 object-cover rounded" />
            </div>
          </td>

          <!-- Căn giữa nút Sửa Xóa -->
          <td class="border p-2">
            <div class="flex gap-2 justify-center items-center">
              <router-link :to="`/admin/products/edit/${product._id}`"
                class="bg-yellow-500 text-white px-3 py-1 rounded">
                Sửa
              </router-link>
              <button @click="deleteProduct(product._id)" class="bg-red-500 text-white px-3 py-1 rounded">
                Xóa
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button @click="changePage(page - 1)" :disabled="page === 1"
        class="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50">
        &lt;
      </button>

      <button v-for="n in totalPages" :key="n" @click="changePage(n)" :class="[
        'px-3 py-1 rounded',
        n === page ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white hover:bg-gray-300'
      ]">
        {{ n }}
      </button>

      <button @click="changePage(page + 1)" :disabled="page === totalPages"
        class="px-3 py-1 bg-gray-400 text-white rounded disabled:opacity-50">
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
      const { products, totalPages } = await res.json();
      this.products = products;
      this.totalPages = totalPages;
    },
    handleSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.page = 1;
        this.fetchProducts();
      }, 300);
    },
    changePage(n) {
      if (n >= 1 && n <= this.totalPages && n !== this.page) {
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
          await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
          this.fetchProducts();
          Swal.fire("Đã xoá!", "", "success");
        } catch (err) {
          console.error("Lỗi xoá sản phẩm:", err);
          Swal.fire("Lỗi", "Không thể xoá sản phẩm", "error");
        }
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
