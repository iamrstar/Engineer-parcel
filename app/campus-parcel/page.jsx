"use client"

import { useState, useMemo, useEffect } from "react"
import {
    GraduationCap, Package, Plus, Minus, CreditCard, ArrowRight,
    CheckCircle, XCircle, MapPin, Phone, Mail, User, Calendar,
    Truck, Shield, Clock, AlertTriangle, Sparkles, Box, Search, Check, Bot
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ─── Box Configurations ───
const BOX_TYPES = [
    {
        id: "alpha",
        name: "Alpha Box",
        price: 499,
        edlPrice: 1800,
        description: "Books, clothes & study materials",
        dimensions: "18\" × 12\" × 12\"",
        capacity: "Up to 30 kg",
        icon: "📦",
        color: "from-blue-500 to-blue-600",
        bgLight: "bg-blue-50 border-blue-200",
        textColor: "text-blue-700",
    },
    {
        id: "nova",
        name: "Nova Box",
        price: 1049,
        edlPrice: 4500,
        description: "Full room items, electronics & furniture",
        dimensions: "24\" × 18\" × 18\"",
        capacity: "Up to 75 kg",
        icon: "📦",
        color: "from-orange-500 to-orange-600",
        bgLight: "bg-orange-50 border-orange-200",
        textColor: "text-orange-700",
    },
]

export default function StudentMovePage() {
    // ─── State ───
    const [quantities, setQuantities] = useState({ alpha: 0, nova: 0 })
    const [step, setStep] = useState(0) // 0=pincode, 1=boxes, 2=details, 3=summary, 4=success
    const [edlStage, setEdlStage] = useState(0) // 0=none, 1=initial-fail, 2=searching, 3=resolved
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [discount, setDiscount] = useState(0)
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)
    const [couponError, setCouponError] = useState("")
    const [availableCoupons, setAvailableCoupons] = useState([])
    const [isLoadingCoupons, setIsLoadingCoupons] = useState(false)
    const [showBoxDeliveryPopup, setShowBoxDeliveryPopup] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("online")
    const [isProcessing, setIsProcessing] = useState(false)
    const [bookingId, setBookingId] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        hostelAddress: "",
        destPincode: "",
        destCity: "",
        destState: "",
        destAddress: "",
        boxDeliveryType: "self",
        boxDeliveryDate: "",
        boxDeliverySlot: "",
        pickupDate: "",
        pickupSlot: "Morning (9 AM - 12 PM)",
    })
    const [deliveryDays, setDeliveryDays] = useState("")
    const [edlValue, setEdlValue] = useState(0)

    // ─── Pincode Check State ───
    const [pincodeStatus, setPincodeStatus] = useState(null) // null | "checking" | "serviceable" | "not-serviceable"
    const [pincodeError, setPincodeError] = useState("")

    // ─── Calculations ───
    const totalAmount = useMemo(() => {
        let base = BOX_TYPES.reduce((sum, box) => {
            const pricePerUnit = edlValue > 0 ? box.edlPrice : box.price;
            return sum + pricePerUnit * quantities[box.id];
        }, 0);
        
        // Add delivery fee if applicable
        if (formData.boxDeliveryType === 'delivered') {
            base += 49;
        }

        return Math.max(0, base - discount);
    }, [quantities, edlValue, discount, formData.boxDeliveryType])

    const totalBoxes = useMemo(() => {
        return Object.values(quantities).reduce((a, b) => a + b, 0)
    }, [quantities])

    // ─── Handlers ───
    const updateQuantity = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, prev[id] + delta),
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleApplyCoupon = async () => {
        if (!couponCode) return
        setIsValidatingCoupon(true)
        setCouponError("")
        try {
            const res = await fetch(`${API_BASE_URL}/api/coupons/validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: couponCode,
                    orderTotal: BOX_TYPES.reduce((sum, box) => {
                        const pricePerUnit = edlValue > 0 ? box.edlPrice : box.price;
                        return sum + pricePerUnit * quantities[box.id];
                    }, 0)
                }),
            })
            const data = await res.json()
            if (data.success) {
                setAppliedCoupon(data.couponCode)
                setDiscount(data.discount)
                setCouponError("")
            } else {
                setCouponError(data.message || "Invalid coupon code")
                setDiscount(0)
                setAppliedCoupon(null)
            }
        } catch (err) {
            setCouponError("Error validating coupon. Try again.")
        } finally {
            setIsValidatingCoupon(false)
        }
    }

    const fetchAvailableCoupons = async () => {
        setIsLoadingCoupons(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/coupons/public`)
            if (res.ok) {
                const data = await res.json()
                setAvailableCoupons(data)
            }
        } catch (err) {
            console.error("Error fetching coupons:", err)
        } finally {
            setIsLoadingCoupons(false)
        }
    }

    // ─── Pincode Auto-Check ───
    useEffect(() => {
        if (edlValue > 0 && step === 3) {
            fetchAvailableCoupons()
        }
    }, [edlValue, step])

    useEffect(() => {
        const pincode = formData.destPincode
        if (!/^\d{6}$/.test(pincode)) {
            setPincodeStatus(null)
            setPincodeError("")
            setFormData((prev) => ({ ...prev, destCity: "", destState: "" }))
            return
        }

        const checkPincode = async () => {
            setPincodeStatus("checking")
            setPincodeError("")
            try {
                const res = await fetch(`${API_BASE_URL}/api/pincode/check/${pincode}`)
                const data = await res.json()

                if (res.ok && data.data?.isServiceable) {
                    setPincodeStatus("serviceable")
                    setFormData((prev) => ({
                        ...prev,
                        destCity: data.data.city || "",
                        destState: data.data.state || "",
                    }))
                    setDeliveryDays(data.data.deliveryDays || "")
                    setEdlValue(data.data.edl || 0)

                    // Trigger EDL Animation if applicable
                    if (data.data.edl > 0) {
                        setEdlStage(1) // Stage 1: "Oh! We don't deliver directly..."
                        setTimeout(() => setEdlStage(2), 2000) // Stage 2: "Finding alternative..."
                        setTimeout(() => setEdlStage(3), 4500) // Stage 3: "Woah! We got something!"
                    } else {
                        setEdlStage(0)
                    }
                } else {
                    setPincodeStatus("not-serviceable")
                    setPincodeError(data.message || "This pincode is not serviceable yet.")
                    setFormData((prev) => ({ ...prev, destCity: "", destState: "" }))
                    setEdlValue(0)
                    setEdlStage(0)
                }
            } catch {
                setPincodeStatus("not-serviceable")
                setPincodeError("Could not verify pincode. Please try again.")
                setFormData((prev) => ({ ...prev, destCity: "", destState: "" }))
                setDeliveryDays("")
                setEdlValue(0)
            }
        }

        const debounce = setTimeout(checkPincode, 500)
        return () => clearTimeout(debounce)
    }, [formData.destPincode])

    // ─── Form Validation ───
    const isFormValid = () => {
        return (
            formData.name &&
            formData.phone &&
            /^\d{10}$/.test(formData.phone) &&
            formData.email &&
            formData.hostelAddress &&
            formData.destPincode &&
            pincodeStatus === "serviceable" &&
            formData.destAddress &&
            formData.pickupDate &&
            formData.pickupSlot
        )
    }

    // ─── Razorpay Payment ───
    const handlePayment = async () => {
        if (paymentMethod === "counter") return

        setIsProcessing(true)
        try {
            // 1. Create order on backend
            const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 100, // ⚠️ TEST MODE: ₹1 only for testing the full flow.
                    currency: "INR",
                }),
            })
            const order = await orderRes.json()

            // 2. Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Engineers Parcel",
                description: `Campus Parcel — ${totalBoxes} box(es)`,
                order_id: order.id,
                handler: async (response) => {
                    // 3. Verify payment
                    try {
                        const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        })
                        const verifyData = await verifyRes.json()

                        if (verifyData.success) {
                            // 4. Save booking to database
                            const boxDescription = BOX_TYPES
                                .filter((b) => quantities[b.id] > 0)
                                .map((b) => `${b.name} x${quantities[b.id]}`)
                                .join(", ")

                            const bookingData = {
                                serviceType: "campus-parcel",
                                senderDetails: {
                                    name: formData.name,
                                    phone: formData.phone,
                                    email: formData.email,
                                    address: formData.hostelAddress,
                                    pincode: "826004", // IIT ISM Dhanbad pincode
                                    city: "Dhanbad",
                                    state: "Jharkhand",
                                },
                                receiverDetails: {
                                    name: formData.name,
                                    phone: formData.phone,
                                    email: formData.email,
                                    address: formData.destAddress,
                                    pincode: formData.destPincode,
                                    city: formData.destCity,
                                    state: formData.destState,
                                },
                                packageDetails: {
                                    weight: totalBoxes,
                                    weightUnit: "kg",
                                    description: boxDescription,
                                },
                                boxDeliveryType: formData.boxDeliveryType,
                                boxDeliveryDate: formData.boxDeliveryDate,
                                boxDeliverySlot: formData.boxDeliverySlot,
                                pickupDate: formData.pickupDate,
                                pickupSlot: formData.pickupSlot,
                                pricing: {
                                    basePrice: totalAmount + discount,
                                    additionalCharges: 0,
                                    discount: discount,
                                    couponCode: appliedCoupon,
                                    tax: 0,
                                    totalAmount: totalAmount,
                                },
                                notes: `Campus Parcel Booking — ${boxDescription}. Razorpay Payment ID: ${response.razorpay_payment_id}`,
                            }

                            const bookingRes = await fetch(`${API_BASE_URL}/api/bookings/confirm-booking`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ bookingData }),
                            })
                            const bookingResult = await bookingRes.json()

                            if (bookingResult.success) {
                                setBookingId(bookingResult.booking.bookingId)
                                setStep(4)
                            } else {
                                alert("Payment succeeded but booking creation failed. Please contact support with Payment ID: " + response.razorpay_payment_id)
                            }
                        } else {
                            alert("Payment verification failed. Please contact support.")
                        }
                    } catch {
                        alert("Payment verification error. Please contact support.")
                    }
                    setIsProcessing(false)
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: { color: "#ea580c" },
                modal: {
                    ondismiss: () => setIsProcessing(false),
                },
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (err) {
            console.error("Payment error:", err)
            alert("Failed to initiate payment. Please try again.")
            setIsProcessing(false)
        }
    }

    // ─── Load Razorpay Script ───
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
        return () => document.body.removeChild(script)
    }, [])

    // ─── Get today's date for min date ───
    const today = new Date().toISOString().split("T")[0]

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            {/* ────── Graduation Offer Banner ────── */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white py-2.5 text-center text-sm font-bold tracking-wide">
                <span className="mr-2">🎓</span>
                Graduation Season Special — Flat rates for IIT ISM students!
                <span className="ml-2">🎓</span>
            </div>

            {/* ────── Hero Section ────── */}
            <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-300 text-sm px-4 py-1.5 rounded-full mb-6">
                        <GraduationCap className="w-4 h-4" />
                        Exclusively for IIT ISM Dhanbad Students
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                        Moving Out?{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                            We've Got You.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                        Pack your hostel life into our boxes. We'll safely deliver your books, electronics,
                        and belongings to your doorstep — affordable & hassle‑free.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-400" /> Safe & Insured
                        </div>
                        <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-blue-400" /> Door‑to‑Door
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-400" /> On‑Time Delivery
                        </div>
                    </div>
                </div>
            </section>

            {/* ────── Steps Progress ────── */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
                    {[
                        { n: 0, label: "Pincode", icon: <MapPin className="w-5 h-5" /> },
                        { n: 1, label: "Boxes", icon: <Package className="w-5 h-5" /> },
                        { n: 2, label: "Details", icon: <User className="w-5 h-5" /> },
                        { n: 3, label: "Confirm", icon: <CheckCircle className="w-5 h-5" /> },
                    ].map((s, i) => {
                        const isActive = step === s.n;
                        const isCompleted = step > s.n || step === 4;

                        return (
                            <div key={s.n} className="relative z-10 flex flex-col items-center gap-3">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isActive
                                        ? "step-node-active scale-110"
                                        : isCompleted
                                            ? "bg-green-500 text-white shadow-lg"
                                            : "bg-white border-2 border-gray-200 text-gray-400"
                                        }`}
                                >
                                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : s.icon}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-orange-600" : "text-gray-400"}`}>
                                    {s.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ────── Main Content ────── */}
            <section className="pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        {/* ═══════ STEP 0 — Pincode Verification ═══════ */}
                        {step === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-md mx-auto space-y-8"
                            >
                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-black text-gray-900">Check Availability</h2>
                                    <p className="text-gray-500">Enter your destination pincode to check if we deliver there.</p>
                                </div>

                                <Card className="glass shadow-2xl overflow-hidden border-0">
                                    <CardContent className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <Label className="text-gray-700 font-bold flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-orange-600" /> Destination Pincode
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    name="destPincode"
                                                    value={formData.destPincode}
                                                    onChange={handleChange}
                                                    placeholder="Enter 6-digit pincode"
                                                    maxLength={6}
                                                    className={`h-14 text-xl tracking-[0.2em] font-black text-center border-2 focus:ring-0 transition-all ${pincodeStatus === "serviceable"
                                                        ? "border-green-500 bg-green-50/50"
                                                        : pincodeStatus === "not-serviceable"
                                                            ? "border-red-500 bg-red-50/50"
                                                            : "border-gray-100 focus:border-orange-500"
                                                        }`}
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    {pincodeStatus === "checking" && (
                                                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-orange-500 border-t-transparent" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {pincodeStatus === "serviceable" && (
                                            <div className="space-y-4">
                                                <AnimatePresence mode="wait">
                                                    {edlStage === 1 && (
                                                        <motion.div
                                                            key="stage1"
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm"
                                                        >
                                                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                                                <AlertTriangle className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-orange-900">Oh! We don't deliver directly,</p>
                                                                <p className="text-sm text-orange-700">Checking for alternatives in our network...</p>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {edlStage === 2 && (
                                                        <motion.div
                                                            key="stage2"
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm"
                                                        >
                                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 animate-pulse">
                                                                <Sparkles className="w-6 h-6 animate-spin-slow" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-blue-900 leading-tight">Wait! Finding resolution...</p>
                                                                <p className="text-sm text-blue-700">Proprietary ENZEE AI is looking for a delivery route</p>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {edlStage === 3 && (
                                                        <motion.div
                                                            key="stage3"
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 shadow-md overflow-hidden relative group"
                                                        >
                                                            <motion.div 
                                                                initial={{ x: "-100%" }}
                                                                animate={{ x: "100%" }}
                                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none"
                                                            />
                                                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-lg z-10">
                                                                <Bot className="w-6 h-6" />
                                                            </div>
                                                            <div className="z-10">
                                                                <p className="font-black text-green-900 text-lg leading-tight flex items-center gap-2">
                                                                    Woah! We got something! ⚡
                                                                </p>
                                                                <p className="text-sm text-green-700 font-medium">
                                                                    We've found a resolution using Enzee AI for {formData.destCity}.
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {edlStage === 0 && (
                                                        <motion.div
                                                            key="standard"
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm"
                                                        >
                                                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-md">
                                                                <CheckCircle className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-green-900 text-lg">Perfect! We deliver there. 🎓</p>
                                                                <p className="text-sm text-green-700 font-medium">Ready to move your campus life to {formData.destCity}!</p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}

                                        {pincodeStatus === "not-serviceable" && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
                                                    <XCircle className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-red-900">Oops! Area not supported.</p>
                                                    <p className="text-sm text-red-700">{pincodeError}</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        <Button
                                            onClick={() => setStep(1)}
                                            disabled={pincodeStatus !== "serviceable" || (edlValue > 0 && edlStage !== 3)}
                                            className="w-full bg-gradient-premium h-14 text-lg font-black shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:grayscale"
                                        >
                                            {edlValue > 0 && edlStage < 3 ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                                    Searching...
                                                </div>
                                            ) : (
                                                <>Get Started <ArrowRight className="ml-2 w-5 h-5" /></>
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>

                                <div className="text-center p-6 bg-orange-500/5 rounded-3xl border border-orange-500/10">
                                    <p className="text-sm text-gray-500">
                                        All shipments are fully insured and handled by our premium delivery partners.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══════ STEP 1 — Box Selector ═══════ */}
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center">
                                    <h2 className="text-4xl font-black text-gray-900">Choose Your Boxes</h2>
                                    <p className="text-gray-500 mt-2">Select the box sizes and quantities you need for your move</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {BOX_TYPES.map((box) => (
                                        <Card
                                            key={box.id}
                                            className={`glass overflow-hidden border-0 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${quantities[box.id] > 0 ? " ring-4 ring-orange-500/20" : ""
                                                }`}
                                        >
                                            <div className={`bg-gradient-to-br ${box.color} p-5 text-white text-center`}>
                                                <span className="text-4xl">{box.icon}</span>
                                                <h3 className="text-xl font-bold mt-2">{box.name}</h3>
                                                <p className="text-white/80 text-sm mt-1">{box.dimensions}</p>
                                            </div>
                                            <CardContent className="p-5 space-y-4">
                                                <p className="text-sm text-gray-600">{box.description}</p>
                                                <p className="text-xs text-gray-400 font-medium">{box.capacity}</p>

                                                <div className="text-center">
                                                    <span className="text-3xl font-black text-gray-900">₹{edlValue > 0 ? box.edlPrice : box.price}</span>
                                                    <span className="text-sm text-gray-400 ml-1">/ box</span>
                                                </div>

                                                {/* Quantity Selector */}
                                                <div className="flex items-center justify-center gap-4">
                                                    <button
                                                        onClick={() => updateQuantity(box.id, -1)}
                                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-30"
                                                        disabled={quantities[box.id] === 0}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-2xl font-bold w-8 text-center">{quantities[box.id]}</span>
                                                    <button
                                                        onClick={() => updateQuantity(box.id, 1)}
                                                        className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {quantities[box.id] > 0 && (
                                                    <p className="text-center text-sm font-semibold text-gray-700">
                                                        Subtotal: ₹{(edlValue > 0 ? box.edlPrice : box.price) * quantities[box.id]}
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Total Bar */}
                                <Card className="border-0 shadow-xl bg-gray-900 text-white">
                                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="text-gray-400 text-sm">
                                                {totalBoxes} box{totalBoxes !== 1 ? "es" : ""} selected
                                            </p>
                                            <p className="text-3xl font-black">
                                                Total: ₹{totalAmount.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => setShowBoxDeliveryPopup(true)}
                                            disabled={totalBoxes === 0}
                                            className="w-full md:w-auto bg-gradient-premium h-14 px-10 text-lg font-black shadow-2xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 rounded-2xl"
                                        >
                                            Next: Your Details <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* ═══════ STEP 2 — Student Details ═══════ */}
                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-2xl mx-auto space-y-8"
                            >
                                <div className="text-center">
                                    <h2 className="text-4xl font-black text-gray-900">Your Details</h2>
                                    <p className="text-gray-500 mt-2">Fill in your pickup and delivery information</p>
                                </div>

                                <Card className="glass shadow-2xl border-0 overflow-hidden">
                                    <div className="bg-gradient-premium p-6">
                                        <h3 className="text-xl font-bold text-white">Student Information</h3>
                                        <p className="text-orange-100 text-sm">All fields are required unless marked optional</p>
                                    </div>

                                    <CardContent className="p-6 md:p-8 space-y-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <User className="w-4 h-4" /> Full Name
                                            </Label>
                                            <Input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="h-12 border-2 focus:border-orange-500"
                                            />
                                        </div>

                                        {/* Phone + Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <Phone className="w-4 h-4" /> Phone Number
                                                </Label>
                                                <Input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="10-digit mobile"
                                                    maxLength={10}
                                                    className="h-12 border-2 focus:border-orange-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" /> Email
                                                </Label>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="you@example.com"
                                                    className="h-12 border-2 focus:border-orange-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Pickup Address */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" /> Hostel / Room Address (Pickup)
                                            </Label>
                                            <Input
                                                name="hostelAddress"
                                                value={formData.hostelAddress}
                                                onChange={handleChange}
                                                placeholder="e.g. Room 204, Jasper Hostel, IIT ISM Dhanbad"
                                                className="h-12 border-2 focus:border-orange-500"
                                            />
                                        </div>

                                        {/* Destination Pincode (Verified in Step 0, Read-only here) */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-orange-600" /> Destination Pincode
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    name="destPincode"
                                                    value={formData.destPincode}
                                                    readOnly
                                                    className="h-12 border-2 pr-12 bg-gray-50/80 cursor-not-allowed font-bold text-gray-600 border-green-500/30"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <div className="p-1 bg-green-500 rounded-full text-white">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-50/50 border border-green-200/50 rounded-xl p-3 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                <p className="text-[11px] font-bold text-green-800 uppercase tracking-tight">
                                                    Verified Serviceable Area — {formData.destCity}, {formData.destState}
                                                </p>
                                            </div>
                                        </div>

                                        {/* City & State (auto-filled, read-only) */}
                                        {pincodeStatus === "serviceable" && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-semibold text-gray-700">City</Label>
                                                    <Input value={formData.destCity} readOnly className="h-12 border-2 bg-gray-50" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-semibold text-gray-700">State</Label>
                                                    <Input value={formData.destState} readOnly className="h-12 border-2 bg-gray-50" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Destination Full Address */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-gray-700">Delivery Address</Label>
                                            <Input
                                                name="destAddress"
                                                value={formData.destAddress}
                                                onChange={handleChange}
                                                placeholder="Full delivery address (house no, street, landmark)"
                                                className="h-12 border-2 focus:border-orange-500"
                                            />
                                        </div>

                                        {/* Pickup Date */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> Preferred Pickup Date
                                            </Label>
                                            <Input
                                                name="pickupDate"
                                                type="date"
                                                min={formData.boxDeliveryType === 'delivered' && formData.boxDeliveryDate ? formData.boxDeliveryDate : today}
                                                max={new Date((formData.boxDeliveryType === 'delivered' && formData.boxDeliveryDate ? new Date(formData.boxDeliveryDate).getTime() : Date.now()) + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                                value={formData.pickupDate}
                                                onChange={handleChange}
                                                className="h-12 border-2 focus:border-orange-500"
                                            />
                                        </div>

                                        {/* Pickup Slot */}
                                        <div className="space-y-3">
                                            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> Preferred Time Slot
                                            </Label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {[
                                                    "Morning (9 AM - 12 PM)",
                                                    "Afternoon (12 PM - 4 PM)",
                                                    "Evening (4 PM - 7 PM)"
                                                ].map((slot) => (
                                                    <div
                                                        key={slot}
                                                        onClick={() => setFormData(prev => ({ ...prev, pickupSlot: slot }))}
                                                        className={`px-3 py-2.5 rounded-lg border-2 text-xs font-semibold cursor-pointer transition-all text-center flex items-center justify-center ${formData.pickupSlot === slot
                                                            ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
                                                            : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                                            }`}
                                                    >
                                                        {slot}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Delivery Estimate */}
                                        {deliveryDays && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-bold text-blue-900">Estimated Delivery Time</p>
                                                    <p className="text-sm text-blue-700">Expect delivery in {deliveryDays} business days after pickup.</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Nav Buttons */}
                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setStep(1)} className="h-12 px-6 border-2">
                                        Back
                                    </Button>
                                    <Button
                                        onClick={() => setStep(3)}
                                        disabled={!isFormValid()}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 h-12 text-lg font-bold shadow-lg shadow-orange-200 disabled:opacity-40"
                                    >
                                        Review & Pay <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══════ STEP 3 — Summary & Payment ═══════ */}
                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-2xl mx-auto space-y-8"
                            >
                                <div className="text-center">
                                    <h2 className="text-4xl font-black text-gray-900">Final Review</h2>
                                    <p className="text-gray-500 mt-2">Review your order before proceeding to payment</p>
                                </div>

                                {/* Order Items */}
                                <Card className="glass shadow-2xl border-0 overflow-hidden">
                                    <CardContent className="p-6 md:p-8 space-y-6">
                                        <h3 className="font-bold text-lg text-gray-900 border-b pb-3">📦 Items</h3>
                                        {BOX_TYPES.filter((b) => quantities[b.id] > 0).map((box) => {
                                            const displayPrice = edlValue > 0 ? box.edlPrice : box.price;
                                            return (
                                                <div key={box.id} className="flex items-center justify-between py-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{box.name}</p>
                                                        <p className="text-sm text-gray-500">₹{displayPrice} × {quantities[box.id]}</p>
                                                    </div>
                                                    <p className="font-bold text-gray-900">₹{(displayPrice * quantities[box.id]).toLocaleString("en-IN")}</p>
                                                </div>
                                            );
                                        })}

                                        {/* Coupon Section (EDL Only) */}
                                        {edlValue > 0 && (
                                            <div className="border-t pt-4 space-y-3">
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Enter Coupon Code"
                                                        value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                        className="h-10 border-2"
                                                        disabled={appliedCoupon}
                                                    />
                                                    {appliedCoupon ? (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="h-10 text-red-600 border-red-200 hover:bg-red-50"
                                                            onClick={() => {
                                                                setAppliedCoupon(null)
                                                                setDiscount(0)
                                                                setCouponCode("")
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    ) : (
                                                        <Button 
                                                            id="apply-coupon-btn"
                                                            size="sm" 
                                                            className="h-10 bg-gray-900 text-white hover:bg-black"
                                                            onClick={handleApplyCoupon}
                                                            disabled={isValidatingCoupon || !couponCode}
                                                        >
                                                            {isValidatingCoupon ? "..." : "Apply"}
                                                        </Button>
                                                    )}
                                                </div>
                                                {couponError && <p className="text-xs text-red-500 font-bold">{couponError}</p>}
                                                {appliedCoupon && (
                                                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="w-4 h-4 text-green-600" />
                                                            <p className="text-xs font-bold text-green-700">Coupon "{appliedCoupon}" Applied!</p>
                                                        </div>
                                                        <p className="text-xs font-black text-green-700">- ₹{discount}</p>
                                                    </div>
                                                )}

                                                {/* Available Coupons List */}
                                                {!appliedCoupon && availableCoupons.length > 0 && (
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] uppercase tracking-wider font-black text-gray-400">Available Coupons</p>
                                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                            {availableCoupons.map((c) => (
                                                                <button
                                                                    key={c.code}
                                                                    onClick={() => {
                                                                        setCouponCode(c.code)
                                                                        // Auto-apply logic
                                                                        setTimeout(() => {
                                                                            const btn = document.getElementById("apply-coupon-btn");
                                                                            if (btn) btn.click();
                                                                        }, 100);
                                                                    }}
                                                                    className="shrink-0 bg-white border-2 border-dashed border-gray-200 hover:border-orange-500 hover:bg-orange-50 rounded-xl p-3 transition-all text-left group"
                                                                >
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-xs font-black text-gray-900 group-hover:text-orange-600">{c.code}</span>
                                                                        <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-orange-500" />
                                                                    </div>
                                                                    <p className="text-[10px] text-gray-500 line-clamp-1">{c.description}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="border-t pt-4 flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-bold text-gray-900">Total Amount</p>
                                                <p className="text-2xl font-black text-orange-600">₹{totalAmount.toLocaleString("en-IN")}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Delivery Details */}
                                <Card className="glass shadow-2xl border-0 overflow-hidden">
                                    <CardContent className="p-6 md:p-8 space-y-6">
                                        <div className="flex items-center gap-3 pb-3 border-b">
                                            <MapPin className="w-5 h-5 text-orange-600" />
                                            <h3 className="font-bold text-lg text-gray-900">Student & Schedule Info</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Full Name</p>
                                                    <p className="font-bold text-gray-800">{formData.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Pickup Address</p>
                                                    <p className="font-bold text-gray-800">{formData.hostelAddress}</p>
                                                </div>
                                                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                                                    <p className="text-[10px] text-orange-400 uppercase tracking-widest font-black mb-1">Empty Box Delivery</p>
                                                    <p className="font-bold text-orange-900">
                                                        {formData.boxDeliveryType === 'self' ? 'Pickup from Hub' : 'Doorstep Delivery'}
                                                    </p>
                                                    {formData.boxDeliveryType === 'delivered' && (
                                                        <p className="text-xs text-orange-700 font-medium mt-1">
                                                            📅 {formData.boxDeliveryDate} • ⏰ {formData.boxDeliverySlot}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Contact Phone</p>
                                                    <p className="font-bold text-gray-800">{formData.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Full Delivery Address</p>
                                                    <p className="font-bold text-gray-800 leading-snug">
                                                        {formData.destAddress}, {formData.destCity}, {formData.destState} — {formData.destPincode}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                                    <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black mb-1">Parcel Pickup</p>
                                                    <p className="font-bold text-blue-900">Scheduled for Doorstep Pickup</p>
                                                    <p className="text-xs text-blue-700 font-medium mt-1">
                                                        📅 {formData.pickupDate} • ⏰ {formData.pickupSlot}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Payment Method */}
                                <Card className="glass shadow-2xl border-0 overflow-hidden">
                                    <CardContent className="p-6 md:p-8 space-y-4">
                                        <h3 className="font-bold text-lg text-gray-900 border-b pb-3">💳 Payment Method</h3>

                                        {/* Online */}
                                        <label
                                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "online" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            onClick={() => setPaymentMethod("online")}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-orange-500" : "border-gray-300"}`}>
                                                {paymentMethod === "online" && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                                            </div>
                                            <CreditCard className="w-5 h-5 text-orange-600" />
                                            <div>
                                                <p className="font-semibold text-gray-900">Pay Online (Razorpay)</p>
                                                <p className="text-xs text-gray-500">UPI, Cards, Net Banking — Secure & Instant</p>
                                            </div>
                                        </label>

                                        {/* Counter — Disabled */}
                                        <div
                                            className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                                        >
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                            <div>
                                                <p className="font-semibold text-gray-900">Pay at Counter</p>
                                                <p className="text-xs text-red-600 font-medium">
                                                    ⚠️ Due to heavy traffic, Pay at Counter service is currently unavailable.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setStep(2)} className="h-12 px-6 border-2">
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-14 text-lg font-bold shadow-lg shadow-green-200 transition-all"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>Pay ₹{totalAmount.toLocaleString("en-IN")} <ArrowRight className="ml-2 w-5 h-5" /></>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══════ STEP 4 — Success ═══════ */}
                        {step === 4 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-lg mx-auto text-center space-y-6 py-12"
                            >
                                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">Booking Confirmed! 🎉</h2>
                                <p className="text-gray-500">
                                    Your campus parcel booking has been confirmed. We'll pick up your boxes on the selected date.
                                    You can track your booking anytime using your Booking ID.
                                </p>
                                <Card className="glass shadow-2xl border-0 overflow-hidden">
                                    <CardContent className="p-6 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Booking / Tracking ID</span>
                                            <span className="font-bold text-orange-600 text-base">{bookingId}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Total Paid</span>
                                            <span className="font-bold text-green-600">₹{totalAmount.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Boxes</span>
                                            <span className="font-bold">{totalBoxes}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Pickup Date</span>
                                            <span className="font-bold">{new Date(formData.pickupDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Time Slot</span>
                                            <span className="font-bold">{formData.pickupSlot}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        onClick={() => {
                                            const pickupFormatted = formData.pickupDate
                                                ? new Date(formData.pickupDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                                                : "TBD";
                                            const msg = `🎉 *Booking Confirmed!*

Hi Engineers Parcel! My Campus Parcel booking is confirmed.

📦 *Booking ID:* ${bookingId}
📋 *Boxes:* ${totalBoxes}
📅 *Pickup Date:* ${pickupFormatted}
⏰ *Time Slot:* ${formData.pickupSlot}
💰 *Amount Paid:* ₹${totalAmount.toLocaleString("en-IN")}

📍 *From:* ${formData.name}, ${formData.phone}
📍 *To:* ${formData.destAddress}, ${formData.destCity}

🔗 *Track:* ${window.location.origin}/track-order?id=${bookingId}

Please confirm my pickup! 🙏`;
                                            window.open(`https://wa.me/919525801506?text=${encodeURIComponent(msg)}`, "_blank")
                                        }}
                                        className="bg-green-600 hover:bg-green-700 h-12 px-8 shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Confirm via WhatsApp
                                    </Button>
                                    <Button asChild className="bg-orange-600 hover:bg-orange-700 h-12 px-8">
                                        <a href={`/track-order?id=${bookingId}`}>📦 Track Order</a>
                                    </Button>
                                    <Button asChild variant="outline" className="h-12 px-8 border-2">
                                        <a href="/">Home</a>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>

            {/* ═══════ BOX DELIVERY POPUP MODAL ═══════ */}
            <AnimatePresence>
                {showBoxDeliveryPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowBoxDeliveryPopup(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-premium p-6 text-center">
                                <div className="w-14 h-14 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                                    <Truck className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white">How do you want your boxes?</h3>
                                <p className="text-orange-100 text-sm mt-1">Select your preferred collection method</p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setFormData(prev => ({ ...prev, boxDeliveryType: 'self', boxDeliveryDate: '', boxDeliverySlot: '' }))}
                                        className={`group relative p-5 rounded-2xl border-2 transition-all cursor-pointer text-center ${formData.boxDeliveryType === 'self'
                                                ? "border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10"
                                                : "border-gray-100 hover:border-gray-200 bg-white"
                                            }`}
                                    >
                                        {formData.boxDeliveryType === 'self' && (
                                            <div className="absolute top-3 right-3 bg-orange-500 text-white p-1 rounded-full">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                        <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-3 ${formData.boxDeliveryType === 'self' ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <p className="font-black text-gray-900">Pick from Hub</p>
                                        <p className="text-xs text-gray-500 mt-1">Free</p>
                                    </div>

                                    <div
                                        onClick={() => setFormData(prev => ({ ...prev, boxDeliveryType: 'delivered' }))}
                                        className={`group relative p-5 rounded-2xl border-2 transition-all cursor-pointer text-center ${formData.boxDeliveryType === 'delivered'
                                                ? "border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10"
                                                : "border-gray-100 hover:border-gray-200 bg-white"
                                            }`}
                                    >
                                        {formData.boxDeliveryType === 'delivered' && (
                                            <div className="absolute top-3 right-3 bg-orange-500 text-white p-1 rounded-full">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        )}
                                        <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-3 ${formData.boxDeliveryType === 'delivered' ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <p className="font-black text-gray-900">Doorstep</p>
                                        <p className="text-xs text-gray-500 mt-1">₹49</p>
                                    </div>
                                </div>

                                {/* Delivery date/slot picker */}
                                <AnimatePresence>
                                    {formData.boxDeliveryType === 'delivered' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <div className="space-y-1.5">
                                                    <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> Date
                                                    </Label>
                                                    <Input
                                                        name="boxDeliveryDate"
                                                        type="date"
                                                        min={today}
                                                        max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                                        value={formData.boxDeliveryDate}
                                                        onChange={handleChange}
                                                        className="h-11 border-2 rounded-xl focus:border-orange-500 font-bold text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> Slot
                                                    </Label>
                                                    <select
                                                        name="boxDeliverySlot"
                                                        value={formData.boxDeliverySlot}
                                                        onChange={handleChange}
                                                        className="w-full h-11 rounded-xl border-2 border-gray-200 px-3 bg-white font-bold text-sm focus:border-orange-500 appearance-none"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="9 AM - 12 PM">9 AM – 12 PM</option>
                                                        <option value="12 PM - 3 PM">12 PM – 3 PM</option>
                                                        <option value="3 PM - 6 PM">3 PM – 6 PM</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-0">
                                <Button
                                    onClick={() => {
                                        setShowBoxDeliveryPopup(false)
                                        setStep(2)
                                    }}
                                    disabled={!formData.boxDeliveryType || (formData.boxDeliveryType === 'delivered' && (!formData.boxDeliveryDate || !formData.boxDeliverySlot))}
                                    className="w-full bg-gradient-premium h-14 text-lg font-black shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 rounded-2xl"
                                >
                                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
