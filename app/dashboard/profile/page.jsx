"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Loader2,
    ShieldCheck,
    Calendar,
    Building,
    Navigation
} from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function ProfilePage() {
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: ""
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: {
                    street: user.address?.street || "",
                    city: user.address?.city || "",
                    state: user.address?.state || "",
                    pincode: user.address?.pincode || ""
                }
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { id, value } = e.target
        if (id.includes("address.")) {
            const field = id.split(".")[1]
            setFormData({
                ...formData,
                address: { ...formData.address, [field]: value }
            })
        } else {
            setFormData({ ...formData, [id]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const token = localStorage.getItem("token")
            const res = await axios.put(`${API_URL}/api/auth/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (res.data.success) {
                toast.success("Profile updated successfully!")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-orange-500/30 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        <ShieldCheck className="text-white h-4 w-4" />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">{user?.name}</h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-gray-100 rounded-md text-gray-600">{user?.role || "USER"}</span>
                        • Member since {new Date(user?.createdAt).getFullYear()}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100 px-8 py-6">
                            <CardTitle className="text-xl font-black flex items-center gap-3">
                                <User className="h-5 w-5 text-orange-600" /> Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input id="name" value={formData.name} onChange={handleChange} className="pl-10 h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-all rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input id="email" type="email" value={formData.email} disabled className="pl-10 h-12 border-gray-100 bg-gray-100/50 text-gray-500 rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input id="phone" value={formData.phone} onChange={handleChange} className="pl-10 h-12 border-gray-100 bg-gray-50/50 focus:bg-white transition-all rounded-xl" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <CardTitle className="text-xl font-black flex items-center gap-3 mb-6">
                                        <MapPin className="h-5 w-5 text-orange-600" /> Default Address
                                    </CardTitle>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="address.street" className="text-sm font-bold text-gray-700 ml-1">Street Address</Label>
                                            <div className="relative">
                                                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input id="address.street" value={formData.address.street} onChange={handleChange} className="pl-10 h-12 border-gray-100 bg-gray-50/50 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address.city" className="text-sm font-bold text-gray-700 ml-1">City</Label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input id="address.city" value={formData.address.city} onChange={handleChange} className="pl-10 h-12 border-gray-100 bg-gray-50/50 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address.pincode" className="text-sm font-bold text-gray-700 ml-1">Pincode</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input id="address.pincode" value={formData.address.pincode} onChange={handleChange} className="pl-10 h-12 border-gray-100 bg-gray-50/50 rounded-xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-black px-8 py-6 rounded-2xl shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5" /> Save Changes</>}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-600/40" />
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-xl font-black">Security Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 relative z-10">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 text-green-500 rounded-lg">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold">Email Verified</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500/20 text-orange-500 rounded-lg">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold">Password age</span>
                                </div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">32 Days</span>
                            </div>
                            <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 bg-transparent rounded-xl font-black uppercase tracking-widest text-[10px]">
                                Change Password
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2rem] bg-orange-600 text-white p-2">
                        <CardContent className="p-6 text-center space-y-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                                <Plus className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-black leading-tight">Add more detail for faster checkout</h3>
                            <p className="text-orange-100 text-sm font-medium">Verified addresses get priority pickup and delivery.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function Plus(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
