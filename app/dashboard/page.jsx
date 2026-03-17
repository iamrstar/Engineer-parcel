"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Package,
    Truck,
    Clock,
    MapPin,
    ArrowUpRight,
    Search,
    Plus,
    TrendingUp,
    CreditCard
} from "lucide-react"
import Link from "next/link"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function DashboardPage() {
    const { user } = useAuth()
    const [stats, setStats] = useState({
        total: 0,
        delivered: 0,
        inTransit: 0,
        pending: 0
    })
    const [recentBookings, setRecentBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`${API_URL}/api/users/me/bookings`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.data.success) {
                    const bookings = res.data.data
                    setRecentBookings(bookings.slice(0, 5))

                    // Calculate stats
                    const s = { total: bookings.length, delivered: 0, inTransit: 0, pending: 0 }
                    bookings.forEach(b => {
                        const status = b.status?.toLowerCase() || ""
                        if (status.includes("delivered")) s.delivered++
                        else if (status.includes("transit") || status.includes("out")) s.inTransit++
                        else s.pending++
                    })
                    setStats(s)
                }
            } catch (error) {
                console.error("Dashboard data fetch failed:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboardData()
    }, [])

    const statCards = [
        { label: "Total Bookings", value: stats.total, icon: Package, color: "bg-blue-500", shadow: "shadow-blue-500/20" },
        { label: "Delivered", value: stats.delivered, icon: Truck, color: "bg-green-500", shadow: "shadow-green-500/20" },
        { label: "In Transit", value: stats.inTransit, icon: MapPin, color: "bg-orange-500", shadow: "shadow-orange-500/20" },
        { label: "Pending", value: stats.pending, icon: Clock, color: "bg-purple-500", shadow: "shadow-purple-500/20" },
    ]

    return (
        <div className="space-y-8 pb-12">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Hello, {user?.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-gray-500 font-medium">Welome back! Here's what's happening with your parcels today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/track-order"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                    >
                        <Search className="h-4 w-4" /> Track Order
                    </Link>
                    <Link
                        href="/booking"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-sm font-bold text-white shadow-lg shadow-orange-600/30 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus className="h-4 w-4" /> New Booking
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.label} className="border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-2xl text-white ${stat.shadow} transform -rotate-3`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings */}
                <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-200/50 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 py-5">
                        <div>
                            <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
                            <CardDescription>Your last 5 parcel shipments</CardDescription>
                        </div>
                        <Link href="/dashboard/bookings" className="text-sm font-bold text-orange-600 hover:text-orange-700 underline-offset-4 hover:underline">
                            View all
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-12 text-center text-gray-400">Loading bookings...</div>
                        ) : recentBookings.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {recentBookings.map((booking) => (
                                    <div key={booking.bookingId} className="flex items-center justify-between p-5 hover:bg-orange-50/30 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-orange-100 transition-colors text-gray-500 group-hover:text-orange-600">
                                                <Package className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">#{booking.bookingId}</p>
                                                <p className="text-xs text-gray-500 font-medium">{booking.receiverDetails?.city} • {new Date(booking.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${booking.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center gap-4">
                                <div className="bg-gray-50 p-6 rounded-3xl">
                                    <Package className="h-12 w-12 text-gray-300" />
                                </div>
                                <p className="text-gray-500 font-medium">You haven't made any bookings yet.</p>
                                <Link href="/booking" className="text-orange-600 font-bold hover:underline">Start Shipping Now</Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions / Tips */}
                <div className="space-y-8">
                    <Card className="border-none bg-gradient-to-br from-orange-600 to-red-600 shadow-xl shadow-orange-600/30 text-white overflow-hidden relative">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <CardHeader>
                            <CardTitle className="text-xl">Student Move?</CardTitle>
                            <CardDescription className="text-orange-100">Get 20% off on your first campus parcel order.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/campus-parcel" className="inline-block w-full text-center bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">
                                Claim Offer Now
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-gray-200/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
                                <span className="p-2 bg-white rounded-lg shadow-sm text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all"><CreditCard className="h-4 w-4" /></span>
                                <span className="text-sm font-semibold text-gray-700">Payment Issues</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors cursor-pointer group">
                                <span className="p-2 bg-white rounded-lg shadow-sm text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all"><Truck className="h-4 w-4" /></span>
                                <span className="text-sm font-semibold text-gray-700">Delivery Support</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
