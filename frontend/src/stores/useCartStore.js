import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find(item => item.productId === product._id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter(item => item.productId !== id)
    },
    clearCart() {
      this.items = []
    }
  }
})