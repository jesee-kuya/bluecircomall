import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Login | BlueCirco Mall",
  description: "Login to your BlueCirco Mall account",
}

export default function LoginPage() {
  return (
    <div className="container relative flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-lg font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="mb-4">
            <h2 className="text-3xl font-bold text-primary">BlueCirco Mall</h2>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Return to Landing Page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
