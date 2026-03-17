"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UserPlus, Loader2, Mail, Lock, User, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function RegisterPage() {
    const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: Details
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const { register, sendOTP, verifyOTP } = useAuth()
    const router = useRouter()

    const transitionStyle = "transition-all duration-300 ease-in-out"

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSendOTP = async (e) => {
        e.preventDefault()
        if (!email) return toast.error("Please enter your email")

        setIsLoading(true)
        const result = await sendOTP(email)
        if (result.success) {
            toast.success("OTP sent to your email!")
            setStep(2)
        } else {
            toast.error(result.message)
        }
        setIsLoading(false)
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        if (!otp) return toast.error("Please enter the OTP")

        setIsLoading(true)
        const result = await verifyOTP(email, otp)
        if (result.success) {
            toast.success("Email verified successfully!")
            setStep(3)
        } else {
            toast.error(result.message)
        }
        setIsLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!")
        }

        setIsLoading(true)
        const registerData = {
            name: formData.name,
            email,
            phone: formData.phone,
            password: formData.password
        }
        const result = await register(registerData)

        if (result.success) {
            toast.success("Account created successfully! Welcome to Engineer Parcel.")
            router.push("/dashboard")
        } else {
            toast.error(result.message)
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <Card className="w-full max-w-lg border-none shadow-2xl backdrop-blur-md bg-white/90 relative overflow-hidden">
                {/* Decorative glass elements */}
                <div className="absolute top-0 left-0 -ml-16 -mt-16 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-40 animate-pulse" />

                <CardHeader className="space-y-1 text-center relative z-10 pt-8">
                    <div className={`mx-auto w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-3 hover:rotate-0 ${transitionStyle}`}>
                        <UserPlus className="text-white h-7 w-7" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-900 tracking-tight">
                        {step === 1 && "Start Registration"}
                        {step === 2 && "Verify Email"}
                        {step === 3 && "Complete Profile"}
                    </CardTitle>
                    <CardDescription className="text-gray-500 text-base">
                        {step === 1 && "Enter your email to receive an OTP"}
                        {step === 2 && `Enter the 6-digit code sent to ${email}`}
                        {step === 3 && "Tell us a bit more about yourself"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 px-8 pb-10">
                    {step === 1 && (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        className={`pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50 backdrop-blur-sm ${transitionStyle}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className={`w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 ${transitionStyle}`}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send OTP <ArrowRight className="h-5 w-5" /></>}
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-sm font-medium text-gray-700 ml-1 text-center block">Enter 6-digit OTP</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    required
                                    maxLength={6}
                                    className={`h-14 text-center text-2xl tracking-[1em] font-bold border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50 backdrop-blur-sm ${transitionStyle}`}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className={`w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 ${transitionStyle}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Verify OTP <ArrowRight className="h-5 w-5" /></>}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm text-gray-500 hover:text-orange-600 font-medium transition-colors"
                                >
                                    Change Email
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 ml-1">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            required
                                            className={`pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50 backdrop-blur-sm ${transitionStyle}`}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 ml-1">Phone Number</Label>
                                    <div className="relative group">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        <Input
                                            id="phone"
                                            placeholder="9876543210"
                                            required
                                            className={`pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50 backdrop-blur-sm ${transitionStyle}`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="password" title="password" className="text-sm font-medium text-gray-700 ml-1">Password</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className={`pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50 backdrop-blur-sm ${transitionStyle}`}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" title="Confirm Password" className="text-sm font-medium text-gray-700 ml-1">Confirm</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className={`pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white/50 backdrop-blur-sm ${transitionStyle}`}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className={`w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-600/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4 ${transitionStyle}`}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Create Account <ArrowRight className="h-5 w-5" /></>}
                            </Button>
                        </form>
                    )}

                    <div className="mt-8 text-center text-sm border-t border-gray-100 pt-6">
                        <span className="text-gray-500">Already have an account?</span>{" "}
                        <Link
                            href="/login"
                            title="Sign in"
                            className="text-orange-600 hover:text-orange-700 font-bold transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
