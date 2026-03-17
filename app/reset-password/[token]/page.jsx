"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function ResetPasswordPage() {
    const params = useParams()
    const router = useRouter()
    const token = params.token

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [status, setStatus] = useState("idle") // idle | loading | success | error
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setStatus("error")
            setMessage("Passwords do not match")
            return
        }

        if (password.length < 6) {
            setStatus("error")
            setMessage("Password must be at least 6 characters")
            return
        }

        setStatus("loading")
        setMessage("")

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            })
            const data = await res.json()

            if (data.success) {
                setStatus("success")
                setMessage("Your password has been reset successfully. You can now log in with your new password.")
                setTimeout(() => {
                    router.push("/login")
                }, 3000)
            } else {
                setStatus("error")
                setMessage(data.message || "Failed to reset password. Link may be invalid or expired.")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Connection error. Please try again.")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="glass shadow-2xl border-0 overflow-hidden text-center">
                    <div className="bg-gradient-premium p-8 text-white">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-black">Reset Password</h1>
                        <p className="text-orange-100 text-sm mt-2">
                            Please set your new secure password below.
                        </p>
                    </div>

                    <CardContent className="p-8 text-left">
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-4"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Success!</h2>
                                    <p className="text-gray-500">
                                        {message}
                                    </p>
                                    <div className="pt-4">
                                        <p className="text-xs text-gray-400 animate-pulse">Redirecting to login...</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="password" text-sm font-bold text-gray-700 ml-1>New Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="h-12 pl-10 pr-10 border-2 focus:border-orange-500 rounded-xl"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword" text-sm font-bold text-gray-700 ml-1>Confirm Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <Input
                                                    id="confirmPassword"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="h-12 pl-10 border-2 focus:border-orange-500 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {status === "error" && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 text-sm">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            <p>{message}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-gradient-premium h-14 text-lg font-black shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-xl"
                                    >
                                        {status === "loading" ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                                Updating...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Reset Password
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
