"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Package,
    Search,
    MapPin,
    Calendar,
    ChevronRight,
    Filter,
    ArrowRight,
    Truck,
    CheckCircle2,
    Clock,
    AlertCircle
} from "lucide-react"
import Link from "next/link"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function BookingsPage() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [filteredBookings, setFilteredBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`${API_URL}/api/users/me/bookings`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success) {
                    setBookings(res.data.data)
                    setFilteredBookings(res.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch bookings:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])

    useEffect(() => {
        let result = bookings
        if (searchTerm) {
            result = result.filter(b =>
                b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                b.receiverDetails?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        if (statusFilter !== "All") {
            result = result.filter(b => b.status === statusFilter)
        }
        setFilteredBookings(result)
    }, [searchTerm, statusFilter, bookings])

    const getStatusStyles = (status) => {
        const s = status?.toLowerCase() || ""
        if (s.includes("delivered")) return { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle2 }
        if (s.includes("transit") || s.includes("out")) return { bg: "bg-blue-100", text: "text-blue-700", icon: Truck }
        if (s.includes("cancel")) return { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle }
        return { bg: "bg-orange-100", text: "text-orange-700", icon: Clock }
    }

    const statusOptions = ["All", "Pending", "In Transit", "Out for Delivery", "Delivered", "Cancelled"]

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Shipments</h1>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-1">Manage & Track all your parcels</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/booking">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-orange-600/30">
                            New Booking
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <Card className="border-none shadow-xl shadow-gray-200/50">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                        <Input
                            placeholder="Search by Booking ID or Receiver Name..."
                            className="pl-10 h-11 border-gray-100 focus:border-orange-500 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <Filter className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
                        {statusOptions.map(opt => (
                            <button
                                key={opt}
                                onClick={() => setStatusFilter(opt)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${statusFilter === opt
                                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Bookings List */}
            <div className="space-y-4">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-3xl" />
                    ))
                ) : filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => {
                        const status = getStatusStyles(booking.status)
                        return (
                            <Card key={booking.bookingId} className="border-none shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-50">
                                        <div className="p-6 md:w-1/3 flex items-start gap-4">
                                            <div className={`p-4 rounded-2xl ${status.bg} ${status.text} transition-transform group-hover:scale-110 duration-300 shadow-inner`}>
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">ID: {booking.bookingId}</p>
                                                <h3 className="text-lg font-black text-gray-900 leading-tight">To: {booking.receiverDetails?.name}</h3>
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
                                                    <status.icon className="h-3 w-3" />
                                                    {booking.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 md:flex-1 grid grid-cols-2 gap-6 bg-gray-50/30">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Route</span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-700 flex items-center gap-2">
                                                    {booking.senderDetails?.city} <ArrowRight className="h-3 w-3 text-gray-300" /> {booking.receiverDetails?.city}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <Calendar className="h-3 w-3" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Booked On</span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-700">
                                                    {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 md:w-48 flex items-center justify-center bg-white">
                                            <Link href={`/track-order?id=${booking.bookingId}`} className="w-full">
                                                <Button variant="outline" className="w-full border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 text-gray-600 hover:text-orange-600 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all h-12">
                                                    View Details <ChevronRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-100">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <Package className="h-10 w-10 text-gray-200" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">No bookings found</h3>
                        <p className="text-gray-400 font-medium max-w-xs mx-auto mt-2">Try adjusting your filters or start a new shipment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
