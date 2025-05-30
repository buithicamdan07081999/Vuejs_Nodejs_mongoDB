<template>
  <div class="relative min-h-screen">
    <!-- Background -->
    <div
      class="fixed inset-0 bg-cover bg-center z-0"
      :style="`background-image: url('${bgImage}')`"
    ></div>
    <div class="fixed inset-0 bg-black bg-opacity-60 z-0"></div>

    <!-- Form -->
    <div class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="bg-black bg-opacity-70 p-8 rounded-md w-full max-w-md">
        <h2 class="text-white text-3xl font-semibold mb-6 text-center">Đăng ký</h2>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <input
            v-model="name"
            type="text"
            placeholder="Họ và tên"
            autocomplete="name"
            required
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            required
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Mật khẩu"
            autocomplete="new-password"
            required
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            autocomplete="new-password"
            required
            class="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            :disabled="isLoading"
            class="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold"
          >
            {{ isLoading ? 'Đang đăng ký...' : 'Đăng ký' }}
          </button>

          <router-link
            to="/login"
            class="text-center text-sm text-white underline hover:text-red-400"
          >
            Đã có tài khoản? Đăng nhập
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register as registerAPI } from "@/auth/services/authService";
import Swal from "sweetalert2";

const bgImage = new URL("@/assets/register.webp", import.meta.url).href;

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: "error",
      title: "Mật khẩu không khớp",
      text: "Vui lòng kiểm tra lại mật khẩu.",
    });
    return;
  }

  isLoading.value = true;
  try {
    await registerAPI(name.value, email.value, password.value);

    Swal.fire({
      icon: "success",
      title: "Đăng ký thành công!",
      text: "Bạn có thể đăng nhập ngay bây giờ.",
      timer: 2000,
      showConfirmButton: false,
    });

    router.push("/login");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Đăng ký thất bại",
      text: err.response?.data?.message || "Có lỗi xảy ra, thử lại sau.",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
