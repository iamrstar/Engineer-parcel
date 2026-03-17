"use client"

import React, { useEffect } from "react"
import { useAuth } from "@/src/context/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    Package,
    User,
    Settings,
    LogOut,
    Bell,
    Search,
    ChevronRight,
    Menu,
    X
} from "lucide-react"
import { useState } from "react"

export default function DashboardLayout({ children }) {
    const { user, loading, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    if (!user) return null

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Bookings", href: "/dashboard/bookings", icon: Package },
        { name: "Profile", href: "/dashboard/profile", icon: User },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar for Desktop */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto z-20">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <nav className="mt-5 flex-1 px-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive
                                            ? "bg-orange-50 text-orange-600 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-500"
                                            }`}
                                    />
                                    {item.name}
                                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <button
                        onClick={logout}
                        className="group flex items-center px-3 py-3 w-full text-sm font-semibold text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden bg-gray-900/50 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 lg:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-full flex flex-col py-5">
                    <div className="px-6 flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600">Dashboard</span>
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="mt-8 flex-1 px-4 space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center px-4 py-4 text-base font-semibold rounded-2xl ${isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <item.icon className={`mr-4 h-6 w-6 ${isActive ? "text-orange-600" : "text-gray-400"}`} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="px-4 mt-auto">
                        <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-4 text-base font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                        >
                            <LogOut className="mr-4 h-6 w-6" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-gray-200 lg:hidden sticky top-16 z-10 transition-shadow duration-300">
                    <div className="px-4 h-14 flex items-center justify-between font-medium">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600">
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="text-gray-900">Dashboard</span>
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
                    <div className="max-w-6xl mx-auto uppercase text-xs font-bold text-gray-400 tracking-widest mb-2 flex items-center gap-2">
                        Home <ChevronRight className="h-3 w-3" /> Dashboard {pathname !== "/dashboard" && (<><ChevronRight className="h-3 w-3" /> {pathname.split("/").pop()}</>)}
                    </div>
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
