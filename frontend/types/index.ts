// Product types
export interface Product {
  id: number
  name: string
  description: string
  price: number
  rating: number
  carbonFootprint: number
  category: string
  image: string
  inStock?: boolean
  sustainabilityRating?: number
}

// Carbon Tracking types
export interface CarbonData {
  totalSaved: number
  goal: number
  progress: number
  wasteRecycled: {
    total: number
    breakdown: {
      plastic: number
      paper: number
      metal: number
      glass: number
    }
  }
  ecoPurchases: {
    count: number
    carbonOffset: number
    waterSaved: number
    plasticAvoided: number
  }
}

// User types
export interface User {
  id: string
  name: string
  email: string
  role: "consumer" | "waste-picker" | "aggregator" | "recycler"
  carbonGoal?: number
  totalCarbonSaved?: number
}

// Order types
export interface Order {
  id: string
  userId: string
  items: Array<{
    productId: number
    quantity: number
    price: number
  }>
  totalAmount: number
  totalCarbonFootprint: number
  shippingAddress: {
    name: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

// Location types
export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}
