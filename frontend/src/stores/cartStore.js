import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addItem(product) {
      const existing = this.items.find(i => i._id === product._id)
      if (existing) {
        existing.quantity += product.quantity || 1
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item._id !== productId)
    },
    clearCart() {
      this.items = []
    }
  }
})