"use client"

// Simple cart store using localStorage
export interface CartItem {
  id: string
  companyId: string
  companyName: string
  itemName: string
  price: number
  language?: string
}

export const CartStore = {
  getCart: (): CartItem[] => {
    if (typeof window === "undefined") return []
    const cart = localStorage.getItem("mena-cart")
    return cart ? JSON.parse(cart) : []
  },

  addToCart: (item: CartItem) => {
    const cart = CartStore.getCart()
    cart.push(item)
    localStorage.setItem("mena-cart", JSON.stringify(cart))
    // Dispatch custom event for cart updates
    window.dispatchEvent(new Event("cart-updated"))
  },

  removeFromCart: (itemId: string) => {
    const cart = CartStore.getCart()
    const updatedCart = cart.filter((item) => item.id !== itemId)
    localStorage.setItem("mena-cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cart-updated"))
  },

  clearCart: () => {
    localStorage.removeItem("mena-cart")
    window.dispatchEvent(new Event("cart-updated"))
  },

  getCartCount: (): number => {
    return CartStore.getCart().length
  },

  getCartTotal: (): number => {
    const cart = CartStore.getCart()
    return cart.reduce((total, item) => total + item.price, 0)
  },
}

