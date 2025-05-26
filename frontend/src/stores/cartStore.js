import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    total() {
      return this.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    }
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find(item => item._id === product._id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter(item => item._id !== id)
    },
    updateQuantity(id, qty) {
      const item = this.items.find(i => i._id === id)
      if (item) item.quantity = qty
    },
    clearCart() {
      this.items = []
    }
  }
})