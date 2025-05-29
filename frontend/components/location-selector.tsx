"use client"

import { useState } from "react"
import { Check, MapPin, Plus, Home, Building2, MapPinned, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { type DeliveryLocation, useCartStore } from "@/lib/cart-store"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
  name: z.string().min(1, "Location name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
})

export function LocationSelector() {
  const {
    savedLocations,
    selectedLocation,
    setSelectedLocation,
    addSavedLocation,
    removeSavedLocation,
    setDefaultLocation,
  } = useCartStore()
  const [isAddingLocation, setIsAddingLocation] = useState(false)
  const [isEditingLocation, setIsEditingLocation] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      name: "",
      address: "",
      city: "",
      state: "",
      country: "United States",
      postalCode: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Calculate a random distance between 5-100km for demo purposes
    // In a real app, this would be calculated based on warehouse locations
    const distance = Math.floor(Math.random() * 95) + 5

    const newLocation: DeliveryLocation = {
      ...values,
      id: `loc${Date.now()}`,
      distance,
      isDefault: savedLocations.length === 0,
    }

    addSavedLocation(newLocation)
    setIsAddingLocation(false)
    form.reset()
  }

  function getLocationIcon(name: string) {
    if (name.toLowerCase().includes("home")) return <Home className="h-4 w-4" />
    if (name.toLowerCase().includes("office") || name.toLowerCase().includes("work"))
      return <Building2 className="h-4 w-4" />
    return <MapPin className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Delivery Location</h3>
        <Dialog open={isAddingLocation} onOpenChange={setIsAddingLocation}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Delivery Location</DialogTitle>
              <DialogDescription>Enter the details for your new delivery location.</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Home, Office, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Green Street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Mexico">Mexico</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="94110" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddingLocation(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Location</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {savedLocations.length > 0 ? (
        <RadioGroup
          defaultValue={selectedLocation?.id}
          value={selectedLocation?.id}
          onValueChange={(value) => {
            const location = savedLocations.find((loc) => loc.id === value)
            if (location) setSelectedLocation(location)
          }}
          className="space-y-3"
        >
          {savedLocations.map((location) => (
            <div key={location.id} className="flex items-start space-x-2">
              <RadioGroupItem value={location.id} id={location.id} className="mt-1" />
              <label htmlFor={location.id} className="flex-1 cursor-pointer">
                <Card className={`${selectedLocation?.id === location.id ? "border-green-500" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getLocationIcon(location.name)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{location.name}</h4>
                            {location.isDefault && (
                              <Badge variant="outline" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {location.city}, {location.state} {location.postalCode}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPinned className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{location.distance} km from warehouse</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.preventDefault()
                            setDefaultLocation(location.id)
                          }}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Set as default</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground"
                          onClick={(e) => {
                            e.preventDefault()
                            removeSavedLocation(location.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground mb-4">No delivery locations saved yet.</p>
            <Button onClick={() => setIsAddingLocation(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Location
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
