"use client"

import type React from "react"
import { useState } from "react"
import { Truck, Factory, Package, Recycle, Info, TreePine, Calculator } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CarbonCalculatorProps {
  productName: string
  baseFootprint: number
  children: React.ReactNode
}

export function CarbonCalculator({ productName, baseFootprint, children }: CarbonCalculatorProps) {
  const [distance, setDistance] = useState([100])
  const [packaging, setPackaging] = useState("standard")
  const [recycling, setRecycling] = useState([50])
  const [transportation, setTransportation] = useState("truck")
  const [isOpen, setIsOpen] = useState(false)

  // Transportation methods with their CO2 multipliers
  const transportationMethods = {
    truck: { name: "Truck", multiplier: 1.0, icon: "🚛" },
    train: { name: "Train", multiplier: 0.3, icon: "🚂" },
    ship: { name: "Ship", multiplier: 0.2, icon: "🚢" },
    air: { name: "Air Freight", multiplier: 3.0, icon: "✈️" },
    local: { name: "Local Delivery", multiplier: 0.5, icon: "🚲" },
  }

  // Packaging options with their CO2 impact
  const packagingOptions = {
    minimal: { name: "Minimal", impact: 0.1, description: "Recyclable cardboard only" },
    standard: { name: "Standard", impact: 0.3, description: "Standard packaging with protection" },
    premium: { name: "Premium", impact: 0.6, description: "Premium packaging with extra materials" },
    plastic: { name: "Plastic", impact: 0.8, description: "Plastic packaging (not recommended)" },
  }

  // Calculate the total carbon footprint
  const calculateTotalFootprint = () => {
    // Base product footprint
    const total = baseFootprint

    // Add shipping impact based on distance and transportation method
    const transportMethod = transportationMethods[transportation as keyof typeof transportationMethods]
    const shippingImpact = (distance[0] / 100) * 0.5 * transportMethod.multiplier

    // Add packaging impact
    const packagingImpact = packagingOptions[packaging as keyof typeof packagingOptions].impact

    // Subtract recycling benefit (up to 30% reduction)
    const recyclingBenefit = baseFootprint * (recycling[0] / 100) * 0.3

    return Math.max(0.1, total + shippingImpact + packagingImpact - recyclingBenefit)
  }

  const totalFootprint = calculateTotalFootprint()

  // Calculate breakdown
  const getFootprintBreakdown = () => {
    const transportMethod = transportationMethods[transportation as keyof typeof transportationMethods]
    const shippingImpact = (distance[0] / 100) * 0.5 * transportMethod.multiplier
    const packagingImpact = packagingOptions[packaging as keyof typeof packagingOptions].impact
    const recyclingBenefit = baseFootprint * (recycling[0] / 100) * 0.3

    return {
      base: baseFootprint,
      shipping: shippingImpact,
      packaging: packagingImpact,
      recyclingBenefit: recyclingBenefit,
    }
  }

  const breakdown = getFootprintBreakdown()

  // Calculate the impact level
  const getImpactLevel = () => {
    if (totalFootprint < baseFootprint * 0.8) return { level: "Low Impact", color: "text-green-600" }
    if (totalFootprint < baseFootprint * 1.2) return { level: "Moderate Impact", color: "text-yellow-600" }
    return { level: "High Impact", color: "text-red-600" }
  }

  const impact = getImpactLevel()

  // Calculate equivalent activities
  const calculateEquivalents = () => {
    return {
      drivingKm: (totalFootprint * 4.6).toFixed(1), // 1kg CO2 = ~4.6km driving
      phoneDays: (totalFootprint * 122).toFixed(0), // 1kg CO2 = ~122 days of smartphone use
      treeDays: (totalFootprint * 48).toFixed(0), // 1kg CO2 = ~48 days of tree absorption
      lightBulbHours: (totalFootprint * 1000).toFixed(0), // 1kg CO2 = ~1000 hours of LED bulb
    }
  }

  const equivalents = calculateEquivalents()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            Carbon Footprint Calculator
          </DialogTitle>
          <DialogDescription>
            Calculate the complete environmental impact of <strong>{productName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Impact Summary */}
          <Card className="border-2 border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Total Carbon Footprint</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {totalFootprint.toFixed(2)} kg CO₂
                </Badge>
              </CardTitle>
              <p className={`text-sm font-medium ${impact.color}`}>{impact.level}</p>
            </CardHeader>
          </Card>

          {/* Transportation Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium">Transportation Method</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Different transportation methods have varying carbon emissions per kilometer
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select value={transportation} onValueChange={setTransportation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(transportationMethods).map(([key, method]) => (
                  <SelectItem key={key} value={key}>
                    <span className="flex items-center gap-2">
                      <span>{method.icon}</span>
                      <span>{method.name}</span>
                      <span className="text-xs text-muted-foreground">({method.multiplier}x impact)</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Shipping Distance */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium">Shipping Distance</span>
              </div>
              <span className="text-sm font-medium">{distance[0]} km</span>
            </div>
            <Slider value={distance} min={10} max={2000} step={10} onValueChange={setDistance} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Local (10km)</span>
              <span>Regional (500km)</span>
              <span>International (2000km)</span>
            </div>
          </div>

          {/* Packaging Options */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium">Packaging Type</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(packagingOptions).map(([key, option]) => (
                <Button
                  key={key}
                  variant={packaging === key ? "default" : "outline"}
                  size="sm"
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => setPackaging(key)}
                >
                  <span className="font-medium">{option.name}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                  <span className="text-xs">+{option.impact} kg CO₂</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Recycling Potential */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium">Recycling Potential</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        Higher recycling potential reduces the overall environmental impact by up to 30%
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium">{recycling[0]}%</span>
            </div>
            <Slider value={recycling} min={0} max={100} step={5} onValueChange={setRecycling} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Not recyclable</span>
              <span>Partially recyclable</span>
              <span>Fully recyclable</span>
            </div>
          </div>

          <Separator />

          {/* Footprint Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Carbon Footprint Breakdown</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Factory className="h-3.5 w-3.5 text-slate-500" />
                  Base Product
                </span>
                <span>{breakdown.base.toFixed(2)} kg CO₂</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-slate-500" />
                  Shipping
                </span>
                <span>+{breakdown.shipping.toFixed(2)} kg CO₂</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Package className="h-3.5 w-3.5 text-slate-500" />
                  Packaging
                </span>
                <span>+{breakdown.packaging.toFixed(2)} kg CO₂</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Recycle className="h-3.5 w-3.5 text-green-600" />
                  Recycling Benefit
                </span>
                <span className="text-green-600">-{breakdown.recyclingBenefit.toFixed(2)} kg CO₂</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Total Impact</span>
                <span>{totalFootprint.toFixed(2)} kg CO₂</span>
              </div>
            </div>
          </div>

          {/* Environmental Equivalents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TreePine className="h-4 w-4 text-green-600" />
                Environmental Impact Equivalents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>🚗</span>
                  <span>{equivalents.drivingKm} km driving</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{equivalents.phoneDays} days phone use</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌳</span>
                  <span>{equivalents.treeDays} days tree absorption</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <span>{equivalents.lightBulbHours} hours LED bulb</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips for Reducing Impact */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-base text-green-800">💡 Tips to Reduce Impact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-green-700 space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Choose local delivery when possible</li>
                <li>Select minimal packaging options</li>
                <li>Buy multiple items together to reduce shipping trips</li>
                <li>Look for products with high recycling potential</li>
                <li>Consider carbon offset options at checkout</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
            Close Calculator
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700">Add Carbon Offset (+$2.50)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
