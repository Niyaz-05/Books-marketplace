import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(persist((set, get) => ({
  favorites: [],
  cart: {},
  reading: {},

  toggleFavorite: (id) => set((state) => {
    const exists = state.favorites.includes(id)
    return { favorites: exists ? state.favorites.filter(x => x !== id) : [...state.favorites, id] }
  }),

  addToCart: (id, qty = 1) => set((state) => {
    const next = { ...state.cart }
    next[id] = (next[id] || 0) + qty
    return { cart: next }
  }),
  removeFromCart: (id) => set((state) => {
    const next = { ...state.cart }
    delete next[id]
    return { cart: next }
  }),
  setQty: (id, qty) => set((state) => {
    const next = { ...state.cart }
    if (qty <= 0) delete next[id]
    else next[id] = qty
    return { cart: next }
  }),
  clearCart: () => set({ cart: {} }),

  setReadingProgress: (id, page) => set((state) => ({ reading: { ...state.reading, [id]: page } })),
}), {
  name: 'books-app-store',
  storage: createJSONStorage(() => localStorage),
}))

export default useStore
