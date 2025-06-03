<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý sản phẩm</h1>

    <!-- Thanh tìm kiếm -->
    <div class="flex justify-between mb-4 w-full">
      <input v-model="search" @input="handleSearch" type="text" placeholder="Tìm kiếm sản phẩm..."
        class="border text-blue-800 p-2 rounded w-full" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        <router-link to="/admin/product/add" class="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm
        </router-link>
      </button>
    </div>

    <!-- Bảng sản phẩm -->
    <div v-if="selectedProducts.length" class="mb-4">
      <button @click="deleteSelected" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        🗑 Xoá đã chọn ({{ selectedProducts.length }})
      </button>
    </div>
    <table class="w-full text-black bg-white shadow rounded-xl">
      <thead class="bg-gray-100 text-lg font-bold">
        <tr>
          <th class="border p-2 w-12 text-center">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
          </th>
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
          <td class="border p-2 text-center">
            <input type="checkbox" v-model="selectedProducts" :value="product._id" />
          </td>
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
              <router-link :to="`/admin/product/edit/${product._id}`"
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
      selectedProducts: [], // Các sản phẩm đã chọn
      selectAll: false, // Check chọn tất cả
    };
  },
  methods: {
    async fetchProducts() {
      const res = await fetch(
        `http://localhost:5000/api/product?search=${this.search}&page=${this.page}&limit=${this.limit}`
      );
      const { products, totalPages } = await res.json();
      this.products = products;
      this.totalPages = totalPages;
      this.syncSelected();
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
          await fetch(`http://localhost:5000/api/product/${id}`, { method: "DELETE" });
          await this.fetchProducts();
          Swal.fire("Đã xoá!", "Sản phẩm đã được xoá.", "success");
        } catch (err) {
          console.error("Lỗi xoá sản phẩm:", err);
          Swal.fire("Lỗi", "Không thể xoá sản phẩm", "error");
        }
      }
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedProducts = this.products.map(p => p._id);
      } else {
        this.selectedProducts = [];
      }
    },
    syncSelected() {
      // Khi load page mới, giữ trạng thái đã chọn nếu có
      const currentIds = this.products.map(p => p._id);
      this.selectedProducts = this.selectedProducts.filter(id => currentIds.includes(id));
      this.selectAll = this.selectedProducts.length === this.products.length;
    },
    async deleteSelected() {
      if (!this.selectedProducts.length) return;

      const result = await Swal.fire({
        title: `Bạn muốn xoá ${this.selectedProducts.length} sản phẩm?`,
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Vâng, xoá tất cả!",
        cancelButtonText: "Huỷ",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        try {
          await Promise.all(
            this.selectedProducts.map(id =>
              fetch(`http://localhost:5000/api/product/${id}`, { method: "DELETE" })
            )
          );
          this.selectedProducts = [];
          this.selectAll = false;
          await this.fetchProducts();
          Swal.fire("Đã xoá!", "Các sản phẩm đã được xoá.", "success");
        } catch (err) {
          console.error("Lỗi xoá nhiều sản phẩm:", err);
          Swal.fire("Lỗi", "Không thể xoá các sản phẩm", "error");
        }
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
