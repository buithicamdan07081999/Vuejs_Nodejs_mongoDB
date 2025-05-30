<template>
  <div class="mb-4">
    <label class="block font-medium text-sm mb-1">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      class="w-full border rounded px-3 py-2"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
    default: false,
  },
  modelValue: [String, Number],
});

defineEmits(["update:modelValue"]);
</script>
