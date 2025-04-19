<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white text-black p-4 transition-all duration-300 overflow-hidden',
        isCollapsed ? 'w-16' : 'w-48'
      ]"
    >
      <!-- Toggle Button -->
      <button
        @click="toggleSidebar"
        class="mb-4 text-sm text-gray-600 hover:text-black"
      >
        {{ isCollapsed ? '☰' : '✖' }}
      </button>

      <!-- Title -->
      <h1
        class="text-xl font-bold mb-4 whitespace-nowrap transition-opacity duration-300"
        :class="{ 'opacity-0': isCollapsed, 'opacity-100': !isCollapsed }"
      >
        Quản trị
      </h1>

      <!-- Menu Items -->
      <ul class="space-y-2">
        <li>
          <router-link to="/admin" class="flex items-center space-x-2 hover:text-blue-500">
            <HomeIcon class="w-5 h-5" />
            <span
              class="transition-opacity duration-300"
              :class="{ 'opacity-0': isCollapsed, 'opacity-100': !isCollapsed }"
            >
              Dashboard
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin/products" class="flex items-center space-x-2 hover:text-blue-500">
            <CubeIcon class="w-5 h-5" />
            <span
              class="transition-opacity duration-300"
              :class="{ 'opacity-0': isCollapsed, 'opacity-100': !isCollapsed }"
            >
              Products
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="#" class="flex items-center space-x-2 hover:text-blue-500">
            <ClipboardDocumentListIcon class="w-5 h-5" />
            <span
              class="transition-opacity duration-300"
              :class="{ 'opacity-0': isCollapsed, 'opacity-100': !isCollapsed }"
            >
              Orders
            </span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <main class="flex-1 bg-gray-100 p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, CubeIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>
