import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    totalPrice: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    totalQty: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.qty, 0),
  },
  actions: {
    addToCart(product, qty = 1) {
      const existing = this.cartItems.find((i) => i._id === product._id)
      if (existing) {
        existing.qty += qty
      } else {
        this.cartItems.push({ ...product, qty })
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((i) => i._id !== productId)
    },
    clearCart() {
      this.cartItems = []
    },
  },
})