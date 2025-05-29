// This file will contain data fetching functions for the application
// In a real application, these would connect to a database or API

import type { Product, CarbonData } from "@/types"

export async function getProducts(): Promise<Product[]> {
  // In a real app, this would fetch from an API or database
  // For now, we'll return an empty array to maintain functionality without dummy data
  return []
}

export async function getCarbonData(): Promise<CarbonData> {
  // In a real app, this would fetch from an API or database
  // For now, we'll return default values
  return {
    totalSaved: 0,
    goal: 100,
    progress: 0,
    wasteRecycled: {
      total: 0,
      breakdown: {
        plastic: 0,
        paper: 0,
        metal: 0,
        glass: 0,
      },
    },
    ecoPurchases: {
      count: 0,
      carbonOffset: 0,
      waterSaved: 0,
      plasticAvoided: 0,
    },
  }
}

// Function to calculate distance between two locations (placeholder)
export function calculateDistance(from: string, to: string): number {
  // In a real app, this would use a geocoding service
  // For now, return a random distance between 5-100km
  return Math.floor(Math.random() * 95) + 5
}

// Function to get product categories
export function getProductCategories() {
  return [
    { id: "electronics", name: "Electronics", baseFootprint: 15 },
    { id: "clothing", name: "Clothing", baseFootprint: 5 },
    { id: "food", name: "Food & Beverages", baseFootprint: 3 },
    { id: "beauty", name: "Beauty & Personal Care", baseFootprint: 2 },
    { id: "home", name: "Home & Kitchen", baseFootprint: 8 },
    { id: "toys", name: "Toys & Games", baseFootprint: 4 },
    { id: "books", name: "Books & Stationery", baseFootprint: 1 },
    { id: "sports", name: "Sports & Outdoors", baseFootprint: 6 },
  ]
}

// Function to get transportation methods
export function getTransportationMethods() {
  return [
    { id: "air", name: "Air Freight", impactPerKm: 0.5 },
    { id: "truck", name: "Truck", impactPerKm: 0.1 },
    { id: "train", name: "Train", impactPerKm: 0.03 },
    { id: "ship", name: "Ship", impactPerKm: 0.015 },
    { id: "local", name: "Local Delivery", impactPerKm: 0.05 },
  ]
}

// Function to get packaging types
export function getPackagingTypes() {
  return [
    { id: "minimal", name: "Minimal Packaging", impact: 0.2 },
    { id: "standard", name: "Standard Packaging", impact: 0.5 },
    { id: "premium", name: "Premium Packaging", impact: 1.0 },
    { id: "plastic", name: "Plastic Packaging", impact: 0.8 },
    { id: "paper", name: "Paper Packaging", impact: 0.3 },
  ]
}
