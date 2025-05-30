<template>
  <div class="relative min-h-screen">
    <!-- Background Image full screen -->
    <div
      class="fixed inset-0 bg-cover bg-center z-0"
      :style="`background-image: url('${bgImage}')`"
    ></div>

    <!-- Overlay tối để dễ đọc chữ -->
    <div class="fixed inset-0 bg-black bg-opacity-60 z-0"></div>

    <!-- Form Container -->
    <div class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="bg-black bg-opacity-70 p-8 rounded-md w-full max-w-md">
        <h2 class="text-white text-3xl font-semibold mb-6 text-center">Đăng ký tài khoản</h2>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <input
            v-model="form.name"
            placeholder="Tên"
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="form.email"
            placeholder="Email"
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Mật khẩu"
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="form.phone"
            placeholder="Số điện thoại"
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="form.address"
            placeholder="Địa chỉ"
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="form.avatar"
            placeholder="Avatar URL"
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <router-link to="/login" class="text-red-400 underline text-sm text-center">Bạn đã có tài khoản?</router-link>
          <button
            type="submit"
            class="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

// ảnh bạn cung cấp, mình convert sang base64 hoặc lưu public nếu bạn muốn
const bgImage = new URL("@/assets/register.webp", import.meta.url).href;

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  avatar: "",
});

const handleRegister = async () => {
  try {
    const res = await axios.post("/api/auth/register", form.value);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
      icon: "success",
      title: "Đăng ký thành công!",
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });

    router.push("/");
  } catch (err) {
    Swal.fire({
      icon: "error",
      text: err.response?.data?.message || "Lỗi đăng ký",
    });
  }
};
</script>

<style scoped>
input::placeholder {
  color: #aaa;
}
</style>