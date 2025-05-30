<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const loading = ref(true)
const error = ref(null)

const fetchUsers = async () => {
  try {
    loading.value = true
    const res = await axios.get("http://localhost:5000/api/admin/userslist");
    console.log(res.data); // → danh sách users
    users.value = res.data.users
  } catch (err) {
    error.value = 'Lỗi tải danh sách người dùng'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Danh sách người dùng</h1>
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user._id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>
