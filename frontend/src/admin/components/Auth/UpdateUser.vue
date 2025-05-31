<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
    <h2 class="text-2xl font-bold mb-4 text-black">Cập nhật người dùng</h2>

    <div v-if="loading" class="text-gray-500 mb-4">Đang tải dữ liệu...</div>
    <div v-else-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <form @submit.prevent="updateUser" v-if="!loading">
      <!-- Email -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          v-model="user.email"
          required
          class="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Vai trò -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
        <select
          v-model="user.role"
          required
          class="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <!-- Nút submit -->
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Lưu thay đổi
      </button>
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
const userId = route.params.id;

const user = ref({
  email: '',
  role: ''
});

const loading = ref(true);
const error = ref(null);

// Lấy dữ liệu người dùng
const fetchUser = async () => {
  try {
    const res = await axios.get(`/admin/get/user/${userId}`);
    user.value = res.data.data;
  } catch (err) {
    error.value = 'Lỗi khi tải người dùng.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Cập nhật người dùng
const updateUser = async () => {
  try {
    await axios.put(`/admin/update/users/${userId}`, user.value); 
    //link \backend\routes\Auth\AdminRoutes.js
    Swal.fire("Thành công", "Người dùng đã được cập nhật.", "success");
    router.push("/admin/users");
  } catch (err) {
    Swal.fire("Lỗi", "Không thể cập nhật người dùng.", "error");
    console.error(err);
  }
};

onMounted(fetchUser);
</script>
