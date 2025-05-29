"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  CircleDollarSign,
  Leaf,
  LogOut,
  Package,
  Recycle,
  Settings,
  ShoppingBag,
  TreePine,
  Truck,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("consumer")

  useEffect(() => {
    // Redirect to marketplace page
    router.push("/dashboard/marketplace")
  }, [router])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <TreePine className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">BlueCirco Mall</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard/marketplace" className="text-sm font-medium hover:text-primary">
              Marketplace
            </Link>
            <Link href="/dashboard/carbon-tracking" className="text-sm font-medium hover:text-primary">
              Carbon Tracking
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="User"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to Your Forest Economy Dashboard
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select your role in the ecosystem to view your personalized dashboard.
                </p>
              </div>
              <div className="w-full max-w-md">
                <Tabs defaultValue="consumer" className="w-full" onValueChange={setUserType}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="consumer">Consumer</TabsTrigger>
                    <TabsTrigger value="waste-picker">Waste Picker</TabsTrigger>
                    <TabsTrigger value="aggregator">Aggregator</TabsTrigger>
                    <TabsTrigger value="recycler">Recycler</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {userType === "consumer" && (
              <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
                    <Leaf className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-12.4 kg</div>
                    <p className="text-xs text-muted-foreground">CO₂ saved this month</p>
                    <div className="mt-4 h-4 w-full rounded-full bg-gray-100">
                      <div className="h-4 w-3/4 rounded-full bg-green-600"></div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">75% of your monthly goal</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/carbon-tracking">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Eco-Purchases</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Eco-friendly products purchased</p>
                    <div className="mt-4 grid grid-cols-4 gap-1">
                      <div className="h-2 w-full rounded-full bg-blue-600"></div>
                      <div className="h-2 w-full rounded-full bg-blue-600"></div>
                      <div className="h-2 w-full rounded-full bg-blue-600"></div>
                      <div className="h-2 w-full rounded-full bg-blue-200"></div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">75% sustainable products</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/marketplace">
                      <Button variant="outline" size="sm" className="w-full">
                        Shop Marketplace
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Waste Collection</CardTitle>
                    <Recycle className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5.2 kg</div>
                    <p className="text-xs text-muted-foreground">Waste properly recycled</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="flex-1 text-xs">
                        Next pickup: <span className="font-medium">Tomorrow, 10:00 AM</span>
                      </div>
                      <Button size="sm" variant="secondary">
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Waste
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {userType === "waste-picker" && (
              <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Collections</CardTitle>
                    <Package className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42.8 kg</div>
                    <p className="text-xs text-muted-foreground">Materials collected this week</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <span className="text-xs">Plastic:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-2/3 rounded-full bg-green-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">18.3 kg</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">Paper:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-1/2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">12.5 kg</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">Metal:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-1/4 rounded-full bg-yellow-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">6.0 kg</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Register New Collection
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Earnings</CardTitle>
                    <CircleDollarSign className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$86.50</div>
                    <p className="text-xs text-muted-foreground">Earned this week</p>
                    <div className="mt-4 h-4 w-full rounded-full bg-gray-100">
                      <div className="h-4 w-4/5 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">80% of weekly target</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/earnings">
                      <Button variant="outline" size="sm" className="w-full">
                        View Earnings History
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Offers</CardTitle>
                    <Package className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Active offers from aggregators</p>
                    <div className="mt-4 space-y-2">
                      <div className="rounded-md border p-2">
                        <div className="flex justify-between">
                          <span className="text-xs font-medium">EcoCollect Ltd.</span>
                          <span className="text-xs font-medium text-green-600">$32.40</span>
                        </div>
                        <p className="text-xs text-muted-foreground">For 15kg plastic</p>
                      </div>
                      <div className="rounded-md border p-2">
                        <div className="flex justify-between">
                          <span className="text-xs font-medium">GreenAgg Inc.</span>
                          <span className="text-xs font-medium text-green-600">$28.75</span>
                        </div>
                        <p className="text-xs text-muted-foreground">For 15kg plastic</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/offers">
                      <Button variant="outline" size="sm" className="w-full">
                        View All Offers
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}

            {userType === "aggregator" && (
              <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Materials</CardTitle>
                    <Package className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124.5 kg</div>
                    <p className="text-xs text-muted-foreground">Available for purchase</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <span className="text-xs">Plastic:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-3/4 rounded-full bg-green-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">68.2 kg</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">Paper:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-1/3 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">32.3 kg</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">Metal:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-1/5 rounded-full bg-yellow-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">24.0 kg</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Browse Materials
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inventory</CardTitle>
                    <Truck className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">352.8 kg</div>
                    <p className="text-xs text-muted-foreground">Current inventory</p>
                    <div className="mt-4 h-4 w-full rounded-full bg-gray-100">
                      <div className="h-4 w-2/3 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">67% of capacity</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/inventory">
                      <Button variant="outline" size="sm" className="w-full">
                        Manage Inventory
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Carbon Impact</CardTitle>
                    <Leaf className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-128.4 kg</div>
                    <p className="text-xs text-muted-foreground">CO₂ saved this month</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Transportation:</span>
                        <span className="text-xs font-medium text-red-500">+12.3 kg CO₂</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Material recovery:</span>
                        <span className="text-xs font-medium text-green-500">-140.7 kg CO₂</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/carbon-tracking">
                      <Button variant="outline" size="sm" className="w-full">
                        View Carbon Report
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}

            {userType === "recycler" && (
              <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Material Needs</CardTitle>
                    <Package className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">500 kg</div>
                    <p className="text-xs text-muted-foreground">Monthly processing target</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <span className="text-xs">PET Plastic:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-1/2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">50%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">HDPE Plastic:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-3/4 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">75%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs">Aluminum:</span>
                        <div className="ml-2 h-2 flex-1 rounded-full bg-gray-100">
                          <div className="h-2 w-1/4 rounded-full bg-yellow-600"></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">25%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Post Material Needs
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Production</CardTitle>
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">324.5 kg</div>
                    <p className="text-xs text-muted-foreground">Processed this month</p>
                    <div className="mt-4 h-4 w-full rounded-full bg-gray-100">
                      <div className="h-4 w-3/5 rounded-full bg-blue-600"></div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">65% of monthly capacity</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/production">
                      <Button variant="outline" size="sm" className="w-full">
                        View Production Reports
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Impact Metrics</CardTitle>
                    <Leaf className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-248.6 kg</div>
                    <p className="text-xs text-muted-foreground">CO₂ saved this month</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Jobs created:</span>
                        <span className="text-xs font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Virgin materials saved:</span>
                        <span className="text-xs font-medium">286.2 kg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Water saved:</span>
                        <span className="text-xs font-medium">4,320 L</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/dashboard/impact">
                      <Button variant="outline" size="sm" className="w-full">
                        Share Impact Report
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold">Explore Platform Components</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <Link href="/dashboard/marketplace">
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                        Marketplace
                      </CardTitle>
                      <CardDescription>Browse eco-friendly products</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
                <Link href="/dashboard/carbon-tracking">
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-yellow-600" />
                        Carbon Tracking
                      </CardTitle>
                      <CardDescription>Monitor your environmental impact</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
