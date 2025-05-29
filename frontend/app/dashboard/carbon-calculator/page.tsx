"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Leaf, TreePine, Info, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

// Sample product categories with average carbon footprints
const productCategories = [
  { id: "electronics", name: "Electronics", baseFootprint: 15 },
  { id: "clothing", name: "Clothing", baseFootprint: 5 },
  { id: "food", name: "Food & Beverages", baseFootprint: 3 },
  { id: "beauty", name: "Beauty & Personal Care", baseFootprint: 2 },
  { id: "home", name: "Home & Kitchen", baseFootprint: 8 },
  { id: "toys", name: "Toys & Games", baseFootprint: 4 },
  { id: "books", name: "Books & Stationery", baseFootprint: 1 },
  { id: "sports", name: "Sports & Outdoors", baseFootprint: 6 },
]

// Sample transportation methods with carbon impact per km
const transportationMethods = [
  { id: "air", name: "Air Freight", impactPerKm: 0.5 },
  { id: "truck", name: "Truck", impactPerKm: 0.1 },
  { id: "train", name: "Train", impactPerKm: 0.03 },
  { id: "ship", name: "Ship", impactPerKm: 0.015 },
  { id: "local", name: "Local Delivery", impactPerKm: 0.05 },
]

// Sample packaging types with carbon impact
const packagingTypes = [
  { id: "minimal", name: "Minimal Packaging", impact: 0.2 },
  { id: "standard", name: "Standard Packaging", impact: 0.5 },
  { id: "premium", name: "Premium Packaging", impact: 1.0 },
  { id: "plastic", name: "Plastic Packaging", impact: 0.8 },
  { id: "paper", name: "Paper Packaging", impact: 0.3 },
]

interface CalculatorItem {
  id: string
  category: string
  quantity: number
  distance: number
  transportation: string
  packaging: string
  recycling: number
}

export default function CarbonCalculatorPage() {
  const [items, setItems] = useState<CalculatorItem[]>([
    {
      id: "1",
      category: "electronics",
      quantity: 1,
      distance: 100,
      transportation: "truck",
      packaging: "standard",
      recycling: 50,
    },
  ])

  const addItem = () => {
    const newItem: CalculatorItem = {
      id: Date.now().toString(),
      category: "clothing",
      quantity: 1,
      distance: 100,
      transportation: "truck",
      packaging: "standard",
      recycling: 50,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof CalculatorItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        return item
      }),
    )
  }

  // Calculate carbon footprint for a single item
  const calculateItemFootprint = (item: CalculatorItem) => {
    const category = productCategories.find((c) => c.id === item.category)
    const transportation = transportationMethods.find((t) => t.id === item.transportation)
    const packaging = packagingTypes.find((p) => p.id === item.packaging)

    if (!category || !transportation || !packaging) return 0

    // Base product footprint
    const baseFootprint = category.baseFootprint * item.quantity

    // Transportation impact
    const transportationImpact = transportation.impactPerKm * item.distance

    // Packaging impact
    const packagingImpact = packaging.impact * item.quantity

    // Recycling benefit (up to 20% reduction)
    const recyclingBenefit = baseFootprint * (item.recycling / 100) * 0.2

    return baseFootprint + transportationImpact + packagingImpact - recyclingBenefit
  }

  // Calculate total carbon footprint
  const calculateTotalFootprint = () => {
    return items.reduce((total, item) => total + calculateItemFootprint(item), 0)
  }

  const totalFootprint = calculateTotalFootprint()

  // Calculate carbon offset cost (approximately $10 per ton of CO2)
  const calculateOffsetCost = () => {
    return (totalFootprint / 1000) * 10
  }

  const offsetCost = calculateOffsetCost()

  // Calculate equivalents
  const calculateEquivalents = () => {
    return {
      drivingKm: (totalFootprint * 4).toFixed(1),
      phoneDays: (totalFootprint * 30).toFixed(1),
      treeDays: (totalFootprint * 0.5).toFixed(1),
      flightMinutes: (totalFootprint * 0.25).toFixed(1),
    }
  }

  const equivalents = calculateEquivalents()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <TreePine className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">BlueCirco Mall</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/cart">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <h1 className="text-2xl font-bold">Carbon Footprint Calculator</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Products</span>
                    <Button size="sm" onClick={addItem}>
                      <Plus className="h-4 w-4 mr-1" /> Add Product
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Product {items.indexOf(item) + 1}</h3>
                        {items.length > 1 && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => removeItem(item.id)}>
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Product Category</label>
                          <Select
                            value={item.category}
                            onValueChange={(value) => updateItem(item.id, "category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {productCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name} ({category.baseFootprint} kg CO₂)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Quantity</label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-1">
                            <label className="text-sm font-medium">Shipping Distance (km)</label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-[200px] text-xs">
                                    Approximate distance the product will travel from warehouse to delivery
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Input
                            type="number"
                            min="1"
                            value={item.distance}
                            onChange={(e) => updateItem(item.id, "distance", Number.parseInt(e.target.value) || 1)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Transportation Method</label>
                          <Select
                            value={item.transportation}
                            onValueChange={(value) => updateItem(item.id, "transportation", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select transportation" />
                            </SelectTrigger>
                            <SelectContent>
                              {transportationMethods.map((method) => (
                                <SelectItem key={method.id} value={method.id}>
                                  {method.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Packaging Type</label>
                          <Select
                            value={item.packaging}
                            onValueChange={(value) => updateItem(item.id, "packaging", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select packaging" />
                            </SelectTrigger>
                            <SelectContent>
                              {packagingTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <label className="text-sm font-medium">Recycling Potential</label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-[200px] text-xs">
                                      Percentage of the product that can be recycled at end of life
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <span className="text-sm">{item.recycling}%</span>
                          </div>
                          <Slider
                            value={[item.recycling]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) => updateItem(item.id, "recycling", value[0])}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Carbon Footprint:</span>
                          <Badge className="bg-green-600">{calculateItemFootprint(item).toFixed(2)} kg CO₂</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Footprint Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Carbon Footprint</span>
                      <Badge className="bg-green-600">{totalFootprint.toFixed(2)} kg CO₂</Badge>
                    </div>
                    <Progress value={Math.min((totalFootprint / 50) * 100, 100)} className="h-2" />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">This is equivalent to:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span>Driving a car for</span>
                        <span className="font-medium">{equivalents.drivingKm} km</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Using a smartphone for</span>
                        <span className="font-medium">{equivalents.phoneDays} days</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>A tree absorbing CO₂ for</span>
                        <span className="font-medium">{equivalents.treeDays} days</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Flying in an airplane for</span>
                        <span className="font-medium">{equivalents.flightMinutes} minutes</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Carbon Offset</h3>
                    <p className="text-sm text-muted-foreground">
                      You can offset the carbon footprint of these products by contributing to verified carbon reduction
                      projects.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Estimated offset cost:</span>
                      <span className="font-medium">${offsetCost.toFixed(2)}</span>
                    </div>
                    <Button className="w-full">Add Carbon Offset to Cart</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips to Reduce Your Footprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Choose products with minimal packaging</li>
                    <li>• Opt for ground shipping instead of air freight</li>
                    <li>• Buy products manufactured closer to your location</li>
                    <li>• Select products with high recycling potential</li>
                    <li>• Combine multiple items in a single order</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <TreePine className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-500">© 2024 BlueCirco Mall. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
