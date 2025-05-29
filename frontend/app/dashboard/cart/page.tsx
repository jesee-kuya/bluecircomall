"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingBag, TreePine, Trash2, Leaf, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCartStore } from "@/lib/cart-store"
import { LocationSelector } from "@/components/location-selector"

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalCarbonFootprint,
    getShippingCost,
    selectedLocation,
  } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const totalCarbonFootprint = getTotalCarbonFootprint()
  const shippingCost = getShippingCost()
  const finalTotal = totalPrice + shippingCost

  // Calculate carbon offset cost (approximately $10 per ton of CO2)
  const carbonOffsetCost = (totalCarbonFootprint / 1000) * 10

  if (items.length === 0) {
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
          </div>
        </header>
        <main className="flex-1">
          <div className="container px-4 py-6 md:px-6">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/dashboard/marketplace">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
            </div>

            <div className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some eco-friendly products to get started!</p>
              <Link href="/dashboard/marketplace">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

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
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard/marketplace">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Shopping Cart ({totalItems} items)</h1>
          </div>

          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="items">Cart Items</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {item.carbonFootprint} kg CO₂
                                  </Badge>
                                  <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={clearCart}>
                      Clear Cart
                    </Button>
                    <Link href="/dashboard/marketplace">
                      <Button variant="outline">Continue Shopping</Button>
                    </Link>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shippingCost.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        Environmental Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Carbon Footprint</span>
                        <Badge className="bg-green-600">{totalCarbonFootprint.toFixed(2)} kg CO₂</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>This is equivalent to:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Driving {(totalCarbonFootprint * 4.6).toFixed(1)} km</li>
                          <li>Using a phone for {(totalCarbonFootprint * 122).toFixed(0)} days</li>
                        </ul>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Carbon Offset</span>
                          <span>${carbonOffsetCost.toFixed(2)}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Add Carbon Offset
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedLocation}
                    onClick={() => {
                      if (!selectedLocation) {
                        // Switch to delivery tab if no location selected
                        const deliveryTab = document.querySelector('[value="delivery"]') as HTMLElement
                        deliveryTab?.click()
                      }
                    }}
                  >
                    {selectedLocation ? "Proceed to Checkout" : "Select Delivery Location"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LocationSelector />
                </div>

                <div className="space-y-6">
                  {selectedLocation && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Selected Location
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-medium">{selectedLocation.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedLocation.city}, {selectedLocation.state} {selectedLocation.postalCode}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {selectedLocation.distance} km from warehouse
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Shipping Cost</span>
                        <span>${shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Carbon Impact</span>
                        <span>
                          {selectedLocation
                            ? `+${(selectedLocation.distance * 0.1 * totalItems).toFixed(2)} kg CO₂`
                            : "TBD"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Delivery</span>
                        <span>3-5 business days</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
