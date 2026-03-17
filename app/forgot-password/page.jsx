"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Send, CheckCircle, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useAuth } from "@/src/context/AuthContext"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password, 4: Success
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [resetToken, setResetToken] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { forgotPasswordOTP, verifyForgotOTP, resetPasswordOTP } = useAuth()

    const handleSendOTP = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const result = await forgotPasswordOTP(email)
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
        setIsLoading(true)
        const result = await verifyForgotOTP(email, otp)
        if (result.success) {
            toast.success("Email verified successfully!")
            setResetToken(result.resetToken)
            setStep(3)
        } else {
            toast.error(result.message)
        }
        setIsLoading(false)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!")
        }
        setIsLoading(true)
        const result = await resetPasswordOTP(password, resetToken)
        if (result.success) {
            toast.success("Password reset successful!")
            setStep(4)
        } else {
            toast.error(result.message)
        }
        setIsLoading(false)
    }

    const transitionStyle = "transition-all duration-300 ease-in-out"

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>

                <Card className="glass shadow-2xl border-0 overflow-hidden">
                    <div className="bg-gradient-premium p-8 text-white text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                            {step === 4 ? <CheckCircle className="w-8 h-8 text-white" /> : <Lock className="w-8 h-8 text-white" />}
                        </div>
                        <h1 className="text-2xl font-black">
                            {step === 1 && "Forgot Password?"}
                            {step === 2 && "Verify OTP"}
                            {step === 3 && "Reset Password"}
                            {step === 4 && "Success!"}
                        </h1>
                        <p className="text-orange-100 text-sm mt-2">
                            {step === 1 && "Enter your email to receive a password reset code."}
                            {step === 2 && `Enter the 6-digit code sent to ${email}`}
                            {step === 3 && "Create a secure new password for your account."}
                            {step === 4 && "Your password has been updated successfully."}
                        </p>
                    </div>

                    <CardContent className="p-8">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSendOTP}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 pl-10 border-2 focus:border-orange-500 transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-premium h-14 text-lg font-black shadow-xl rounded-xl">
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send OTP <Send className="ml-2 w-5 h-5" /></>}
                                    </Button>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.form
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleVerifyOTP}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2 text-center">
                                        <Label htmlFor="otp" className="text-sm font-bold text-gray-700">Enter 6-Digit Code</Label>
                                        <Input
                                            id="otp"
                                            type="text"
                                            maxLength={6}
                                            required
                                            placeholder="000000"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="h-14 text-center text-3xl tracking-[0.5em] font-black border-2 focus:border-orange-500 transition-all rounded-xl"
                                        />
                                    </div>
                                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-premium h-14 text-lg font-black shadow-xl rounded-xl">
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify Code"}
                                    </Button>
                                    <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors">
                                        Change Email
                                    </button>
                                </motion.form>
                            )}

                            {step === 3 && (
                                <motion.form
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleResetPassword}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="pass" className="text-sm font-bold text-gray-700 ml-1">New Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    id="pass"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="h-12 pl-10 pr-10 border-2 focus:border-orange-500 transition-all rounded-xl"
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm" className="text-sm font-bold text-gray-700 ml-1">Confirm Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    id="confirm"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="h-12 pl-10 border-2 focus:border-orange-500 transition-all rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-premium h-14 text-lg font-black shadow-xl rounded-xl">
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Password"}
                                    </Button>
                                </motion.form>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                        <p className="text-green-800 font-bold">Successfully Updated!</p>
                                        <p className="text-green-600 text-sm mt-1">You can now log in with your new password.</p>
                                    </div>
                                    <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 h-14 text-lg font-black rounded-xl">
                                        <Link href="/login">Return to Login</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Remembered your password?{" "}
                    <Link href="/login" className="font-bold text-orange-600 hover:underline">
                        Log in instead
                    </Link>
                </p>
            </motion.div >
        </div >
    )
}
