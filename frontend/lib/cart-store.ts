import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types"

export interface CartItem extends Product {
  quantity: number
  addedAt: Date
}

export interface DeliveryLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  distance: number // distance in km from warehouse
  isDefault?: boolean
}

interface CartStore {
  items: CartItem[]
  selectedLocation: DeliveryLocation | null
  savedLocations: DeliveryLocation[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getTotalCarbonFootprint: () => number
  getShippingCost: () => number
  setSelectedLocation: (location: DeliveryLocation) => void
  addSavedLocation: (location: DeliveryLocation) => void
  removeSavedLocation: (locationId: string) => void
  setDefaultLocation: (locationId: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedLocation: null,
      savedLocations: [],

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          } else {
            return {
              items: [...state.items, { ...product, quantity, addedAt: new Date() }],
            }
          }
        })
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotalCarbonFootprint: () => {
        const { items, selectedLocation } = get()
        const baseFootprint = items.reduce((total, item) => total + item.carbonFootprint * item.quantity, 0)

        // Add shipping distance impact if location is selected
        if (selectedLocation) {
          // Calculate additional carbon based on distance (0.1kg CO2 per km per item)
          const distanceImpact = selectedLocation.distance * 0.1 * get().getTotalItems()
          return baseFootprint + distanceImpact
        }

        return baseFootprint
      },

      getShippingCost: () => {
        const { selectedLocation } = get()
        if (!selectedLocation) return 0

        // Base shipping cost
        const baseCost = 5.99

        // Additional cost based on distance
        const distanceCost = selectedLocation.distance > 50 ? (selectedLocation.distance - 50) * 0.1 : 0

        return Math.round((baseCost + distanceCost) * 100) / 100
      },

      setSelectedLocation: (location: DeliveryLocation) => {
        set({ selectedLocation: location })
      },

      addSavedLocation: (location: DeliveryLocation) => {
        set((state) => ({
          savedLocations: [...state.savedLocations, { ...location, id: `loc${Date.now()}` }],
        }))
      },

      removeSavedLocation: (locationId: string) => {
        set((state) => ({
          savedLocations: state.savedLocations.filter((loc) => loc.id !== locationId),
          // If the removed location was selected, set selected to default or null
          selectedLocation:
            state.selectedLocation?.id === locationId
              ? state.savedLocations.find((loc) => loc.id !== locationId && loc.isDefault) || null
              : state.selectedLocation,
        }))
      },

      setDefaultLocation: (locationId: string) => {
        set((state) => ({
          savedLocations: state.savedLocations.map((loc) => ({
            ...loc,
            isDefault: loc.id === locationId,
          })),
          // Also select this location
          selectedLocation: state.savedLocations.find((loc) => loc.id === locationId) || state.selectedLocation,
        }))
      },
    }),
    {
      name: "bluecirco-cart",
    },
  ),
)
