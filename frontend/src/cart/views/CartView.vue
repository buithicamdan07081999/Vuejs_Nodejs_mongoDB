<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>

    <div v-if="cartItems.length === 0" class="text-gray-500">
      Giỏ hàng đang trống.
    </div>

    <div v-else class="space-y-4">
      <CartItem
        v-for="item in cartItems"
        :key="item._id"
        :item="item"
        @remove="removeFromCart(item._id)"
      />

      <div class="border-t pt-4 mt-4 text-right">
        <p class="text-lg font-semibold">
          Tổng cộng: <span class="text-red-500">{{ totalPrice.toLocaleString() }}đ</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/cart/stores/cartStore'
import CartItem from '../components/CartItem.vue'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cartItems, totalPrice } = storeToRefs(cartStore)
const { removeFromCart } = cartStore
</script>