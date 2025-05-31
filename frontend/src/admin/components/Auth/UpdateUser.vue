<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-black">Quản lý người dùng</h1>

    <!-- Trạng thái -->
    <div v-if="loading" class="text-gray-500 mb-4">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Bảng danh sách -->
    <table v-else class="w-full text-black bg-white shadow rounded-xl">
      <thead class="bg-gray-100 text-lg font-bold">
        <tr>
          <th class="border p-2 text-left">Email</th>
          <th class="border p-2 text-center w-40">Vai trò</th>
          <th class="border p-2 text-center w-52">Ngày tạo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user._id"
          class="hover:bg-gray-100 transition text-sm"
        >
          <td class="border p-2">{{ user.email }}</td>
          <td class="border p-2 text-center capitalize">{{ user.role }}</td>
          <td class="border p-2 text-center">
            {{ new Date(user.createdAt).toLocaleString("vi-VN") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get("/admin/userslist");
        console.log("Đường dẫn",res);        
        this.users = res.data.data;
      } catch (err) {
        this.error = "Lỗi khi tải người dùng.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>