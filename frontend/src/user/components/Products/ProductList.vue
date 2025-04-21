<script setup>
defineProps({
  title: String,
  items: Array
});
defineEmits(['delete']);
</script>

<template>
  <div class="categories">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <slot />
    </div>
  </div>
</template>
