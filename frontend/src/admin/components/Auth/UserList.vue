<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý người dùng</h1>

    <div class="flex justify-between mb-4 w-full">
      <input v-model="search" @input="handleSearch" type="text" placeholder="Tìm kiếm người dùng..."
        class="border text-blue-800 p-2 rounded w-full" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        <router-link to="/admin/adduser" class="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm
        </router-link>
      </button>
    </div>

    <!-- Trạng thái -->
    <div v-if="loading" class="text-gray-500 mb-4">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Bảng danh sách -->
    <table v-else class="w-full text-black bg-white shadow rounded-xl">
      <thead class="bg-gray-100 text-sm font-bold">
        <tr>
          <th class="border p-2 text-left">Email</th>
          <th class="border p-2 text-center w-40">Vai trò</th>
          <th class="border p-2 text-center w-52">Ngày tạo</th>
          <th class="border p-2 text-center w-40">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id" class="hover:bg-gray-50 transition text-sm">
          <td class="border p-2">{{ user.email }}</td>
          <td class="border p-2 text-center capitalize">{{ user.role }}</td>
          <td class="border p-2 text-center">
            {{ new Date(user.createdAt).toLocaleString("vi-VN") }}
          </td>
          <td class="border p-2">
            <div class="flex justify-center gap-2">
              <router-link :to="`/admin/update/user/${user._id}`"
                class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Sửa
              </router-link>
              <button @click="deleteUser(user._id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Xóa
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
      users: [],
      loading: true,
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredUsers() {
      const q = this.searchQuery.trim().toLowerCase();
      return this.users.filter((user) => user.email.toLowerCase().includes(q));
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get("/admin/userslist");
        this.users = res.data.data;
      } catch (err) {
        this.error = "Lỗi khi tải người dùng.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    handleSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.page = 1;
        this.fetchProducts();
      }, 300);
    },
    async deleteUser(id) {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Bạn đang xóa user với id là: " + id,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(`/admin/users/${id}`);
          this.users = this.users.filter((u) => u._id !== id);
          Swal.fire("Đã xóa!", "Người dùng đã bị xóa.", "success");
        } catch (err) {
          Swal.fire("Lỗi!", "Không thể xóa người dùng.", "error");
          console.error(err);
        }
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>