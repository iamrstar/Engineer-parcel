"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LogIn, Loader2, Mail, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const result = await login(email, password)

        if (result.success) {
            toast.success("Login successful! Welcome back.")
            router.push("/dashboard")
        } else {
            toast.error(result.message)
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <Card className="w-full max-w-md border-none shadow-2xl backdrop-blur-md bg-white/90 relative overflow-hidden">
                {/* Decorative glass elements */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50" />

                <CardHeader className="space-y-1 text-center relative z-10">
                    <div className="mx-auto w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <LogIn className="text-white h-6 w-6" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</CardTitle>
                    <CardDescription className="text-gray-500">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email Address</Label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all bg-white/50 backdrop-blur-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <Label htmlFor="password" title="password" className="text-sm font-medium text-gray-700">Password</Label>
                                <Link href="/forgot-password" title="forgot-password" className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all bg-white/50 backdrop-blur-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-gray-500">Don't have an account?</span>{" "}
                        <Link
                            href="/register"
                            title="Sign up"
                            className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
