<script setup>
import { ref, watch } from 'vue'
import { HomeIcon, CubeIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
const emit = defineEmits(['hover-change'])
const internalHover = ref(false)
watch(internalHover, (newVal) => {
  emit('hover-change', newVal)
})

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: HomeIcon },
  { label: 'Products', path: '/admin/products', icon: CubeIcon },
  { label: 'Orders', path: '/admin/OrdersPage', icon: ClipboardDocumentListIcon },
]
</script>

<template>
  <div
    class="fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 z-50"
    :class="internalHover ? 'w-64' : 'w-16'"
    @mouseenter="internalHover = true"
    @mouseleave="internalHover = false"
  >
    <div class="mt-20 p-4 text-center text-xl font-bold">
      <span v-if="internalHover">Logo</span>
      <span v-else>🔥</span>
    </div>

    <div class="mt-4 space-y-4">
      <router-link
        v-for="item in menuItems"
        :key="item.label"
        :to="item.path"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 rounded-md transition"
      >
        <component :is="item.icon" class="w-6 h-6" />
        <span v-if="internalHover">{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>
