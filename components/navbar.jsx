"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/src/context/AuthContext"
import { Menu, X, LogOut, User, LayoutDashboard, LogIn, ChevronRight, Truck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Track", href: "/track-order" },
  { name: "Estimate", href: "/price-estimator" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled
        ? "py-2 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border-b border-gray-100/50"
        : "py-4 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="relative group">
              <div className="absolute -inset-2 bg-orange-500/10 rounded-xl blur-lg transition-all duration-500 group-hover:bg-orange-500/20 opacity-0 group-hover:opacity-100" />
              <Image
                src="/logo.png"
                alt="EngineersParcel Logo"
                width={130}
                height={45}
                className="relative drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-gray-100/50 p-1 rounded-2xl mr-4">
              {navLinks.map((link, idx) => (
                <Link key={link.name} href={link.href} className="relative group px-4 py-2">
                  <span className="relative z-10 text-sm font-bold text-gray-600 group-hover:text-orange-600 transition-colors duration-300">
                    {link.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100"
                    layoutId="navHover"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="gap-2 font-bold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl px-4"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    className="gap-2 font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl px-4"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl px-6 shadow-lg shadow-orange-600/20 group overflow-hidden relative">
                    <span className="relative z-10 flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </Button>
                </Link>
              )}

              <Link href="/campus-parcel">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-black rounded-xl px-6 shadow-xl shadow-gray-900/10 gap-2 border border-white/10 group">
                    <span className="text-lg">🎓</span>
                    Campus Parcel
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Mobile: Campus Parcel & Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/campus-parcel">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button className="bg-gray-900 border border-white/20 text-white font-black rounded-xl px-4 py-2 h-10 text-xs gap-2 shadow-lg shadow-gray-900/20 active:scale-95 transition-all">
                  <span className="text-sm">🎓</span>
                  Campus
                </Button>
              </motion.div>
            </Link>

            <button
              onClick={toggleMenu}
              className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm ${isMenuOpen
                ? "bg-gray-100 text-orange-600 rotate-90"
                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                }`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b border-gray-100/50"
          >
            <div className="px-6 pt-6 pb-10 space-y-4">
              {/* Mobile Search/CTA Section */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-orange-50 border border-orange-100 transition-all hover:bg-orange-100 group"
                    onClick={toggleMenu}
                  >
                    <div className="p-3 bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform">
                      <LayoutDashboard className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black text-orange-900 uppercase tracking-widest">Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-orange-600 transition-all hover:bg-orange-700 group shadow-xl shadow-orange-600/20"
                    onClick={toggleMenu}
                  >
                    <div className="p-3 bg-white/20 rounded-xl text-white group-hover:scale-110 transition-transform">
                      <LogIn className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest">Login</span>
                  </Link>
                )}

                <Link
                  href="/track-order"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:bg-gray-100 group"
                  onClick={toggleMenu}
                >
                  <div className="p-3 bg-gray-900 rounded-xl text-white shadow-lg shadow-gray-900/10 group-hover:scale-110 transition-transform">
                    <Truck className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Track</span>
                </Link>
              </div>

              {/* Menu Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between p-4 rounded-2xl text-lg font-bold text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-all group border border-transparent hover:border-gray-100"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-orange-500 transition-colors" />
                      {link.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>

              {user && (
                <button
                  onClick={() => { logout(); toggleMenu() }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl text-lg font-bold text-red-500 hover:bg-red-50 transition-all text-left mt-2 border border-transparent hover:border-red-100"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <LogOut className="h-5 w-5" />
                  </div>
                  Logout
                </button>
              )}

              {/* Prominent Mobile Campus Parcel CTA */}
              <Link
                href="/campus-parcel"
                className="flex items-center justify-between p-6 rounded-[2rem] bg-gradient-to-r from-gray-900 to-black text-white shadow-2xl mt-4 group relative overflow-hidden active:scale-95 transition-transform"
                onClick={toggleMenu}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,165,0,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="text-4xl group-hover:scale-125 transition-transform duration-500">🎓</div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight leading-none uppercase">Campus Parcel</h3>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Special Student Service</p>
                  </div>
                </div>
                <div className="relative z-10 p-3 bg-white/10 rounded-full group-hover:bg-orange-500 transition-colors">
                  <ChevronRight className="h-6 w-6" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
