<template>
  <aside class="w-64 h-screen bg-grey-800 hover:bg-indigo-100 text-white p-4 shadow-lg">
    <h2 class="text-xl font-semibold mb-6 text-white">Danh mục</h2>
    <nav>
      <ul class="space-y-3">
        <li>
          <router-link to="/"
            class="block px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded-lg transition flex items-center">
            🏠 Trang chủ
          </router-link>
        </li>
        <li>
          <router-link to="/products"
            class="flex items-center block px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded-lg transition">🛍
            Sản phẩm</router-link>
        </li>
        <li>
          <router-link to="#"
            class="flex items-center block px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded-lg transition">📞
            Liên hệ</router-link>
        </li>
        <li>
          <router-link to="#"
            class="flex items-center block px-4 py-2 text-white hover:bg-gray-700 hover:text-white rounded-lg transition">❓
            Hỗ trợ</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>