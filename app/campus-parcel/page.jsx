"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
    GraduationCap, Package, Plus, Minus, CreditCard, ArrowRight,
    CheckCircle, XCircle, MapPin, Phone, Mail, User, Calendar,
    Truck, Shield, Clock, AlertTriangle, Sparkles, Box, Search, Check, Bot, Info
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ─── Box Configurations ───
const BOX_TYPES = [
    {
        id: "alpha",
        name: "Alpha Box",
        price: 499,
        edlPrice: 1800,
        description: "Books, clothes & study materials",
        dimensions: "42\ × 42\ × 27\cm",
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
        description: "large amount of stuff",
        dimensions: "60\ × 35\ × 40\ cm",
        capacity: "Up to 75 kg",
        icon: "📦",
        color: "from-orange-500 to-orange-600",
        bgLight: "bg-orange-50 border-orange-200",
        textColor: "text-orange-700",
    },
]

const OTHER_ITEMS_TYPES = [
    { id: "laptop", name: "Laptop", price: 1800, icon: "💻", color: "from-purple-500 to-purple-600" },
    { id: "bicycleGearless", name: "Bicycle (Gearless)", price: 1200, icon: "🚲", color: "from-green-500 to-green-600" },
    { id: "bicycleGear", name: "Bicycle (With Gear)", price: 1800, icon: "🚲", color: "from-green-600 to-green-700" },
    { id: "studyTable", name: "Study Table (Regular)", price: 800, icon: "🏷️", color: "from-teal-500 to-teal-600" },
    { id: "studyTableSmall", name: " Bed Study Table ", price: 275, icon: "🛌", color: "from-emerald-400 to-emerald-500" },
    { id: "mattress", name: "Mattress", price: 1500, icon: "🛏️", color: "from-rose-500 to-rose-600" },
    { id: "cooler", name: "Cooler", price: 1500, icon: "🌬️", color: "from-cyan-500 to-cyan-600" },
    { id: "trolleySmall", name: "Trolley (Small)", price: 1200, icon: "🧳", color: "from-amber-400 to-amber-500" },
    { id: "trolleyMedium", name: "Trolley (Medium)", price: 1500, icon: "🧳", color: "from-amber-500 to-amber-600" },
    { id: "trolleyLarge", name: "Trolley (Large)", price: 1800, icon: "🧳", color: "from-amber-600 to-amber-700" },
    { id: "pcKit14", name: "PC Kit (Up to 14\")", price: 1500, icon: "🖥️", color: "from-blue-400 to-blue-500" },
    { id: "pcKit24", name: "PC Kit (Up to 24\")", price: 2000, icon: "🖥️", color: "from-blue-500 to-blue-600" },
    { id: "pcKitAbove", name: "PC Kit (Above 24\")", price: 4000, icon: "🖥️", color: "from-blue-600 to-blue-700" },
    { id: "cpu", name: "CPU / Monitor", price: 1200, icon: "🔌", color: "from-gray-500 to-gray-600" },
]

export default function StudentMovePage() {
    // ─── State ───
    const [quantities, setQuantities] = useState({ alpha: 0, nova: 0 })
    const [otherItems, setOtherItems] = useState({
        laptop: 0,
        bicycleGearless: 0,
        bicycleGear: 0,
        studyTable: 0,
        studyTableSmall: 0,
        mattress: 0,
        cooler: 0,
        trolleySmall: 0,
        trolleyMedium: 0,
        trolleyLarge: 0,
        pcKit14: 0,
        pcKit24: 0,
        pcKitAbove: 0,
        cpu: 0
    })
    const [step, setStep] = useState(0) // 0=pincode, 1=boxes, 2=details, 3=summary, 4=success
    const [edlStage, setEdlStage] = useState(0) // 0=none, 1=initial-fail, 2=searching, 3=resolved
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [discount, setDiscount] = useState(0)
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)
    const [couponError, setCouponError] = useState("")
    const [availableCoupons, setAvailableCoupons] = useState([])
    const [isLoadingCoupons, setIsLoadingCoupons] = useState(false)
    const [showPackagingPopup, setShowPackagingPopup] = useState(false)
    const [showPickupPopup, setShowPickupPopup] = useState(false)
    const [showOtherItemsPopup, setShowOtherItemsPopup] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("online")
    const [isProcessing, setIsProcessing] = useState(false)
    const [bookingId, setBookingId] = useState("")
    const [showProhibitedWarning, setShowProhibitedWarning] = useState(false)

    // ─── Helpers ───
    const today = new Date().toISOString().split('T')[0]
    
    const addDays = (dateStr, days) => {
        if (!dateStr) return null;
        const d = new Date(dateStr);
        d.setDate(d.getDate() + days);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        hostelAddress: "",
        destPincode: "",
        destCity: "",
        destState: "",
        destAddress: "",
        destLandmark: "",
        receiverName: "",
        receiverPhone: "",
        packagingType: null, // null | 'own' | 'preferred'
        packagingDate: "",
        packagingSlot: "",
        pickupType: "self", // 'self' (Hub) or 'delivered' (Doorstep)
        pickupDate: "",
        pickupSlot: "Morning (9 AM - 12 PM)",
    })
    const [sameAsSender, setSameAsSender] = useState(false)
    const [deliveryDays, setDeliveryDays] = useState("")
    const [edlValue, setEdlValue] = useState(0)
    const [showEdlWarning, setShowEdlWarning] = useState(false)
    const [edlPackages, setEdlPackages] = useState([
        { id: Date.now(), type: "", l: "", b: "", h: "", weight: "" }
    ])
    const [edlContents, setEdlContents] = useState([])
    const [otherItemText, setOtherItemText] = useState("")
    const [edlStep, setEdlStep] = useState(0) // 0: Packages, 1: Contents

    // ─── Pincode Check State ───
    const [pincodeStatus, setPincodeStatus] = useState(null) // null | "checking" | "serviceable" | "not-serviceable"
    const [pincodeError, setPincodeError] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    // ─── Calculations ───
    const pricingSummary = useMemo(() => {
        let base = 0;
        
        if (edlValue > 0) {
            // EDL Pricing: Sum of (Max(Actual, Volumetric) * 80)
            base = edlPackages.reduce((sum, pkg) => {
                const volWeight = (Number(pkg.l) * Number(pkg.b) * Number(pkg.h)) / 2700;
                const chargeableWeight = Math.max(Number(pkg.weight), volWeight);
                return sum + (chargeableWeight * 80);
            }, 0);
            
            // Add other items cost
            base += OTHER_ITEMS_TYPES.reduce((sum, item) => {
                return sum + item.price * otherItems[item.id];
            }, 0);

            // Add EDL Surcharge (Essential for remote areas)
            base += edlValue; 
        } else {
            base = BOX_TYPES.reduce((sum, box) => {
                return sum + box.price * quantities[box.id];
            }, 0);
            
            // Add other items cost
            base += OTHER_ITEMS_TYPES.reduce((sum, item) => {
                return sum + item.price * otherItems[item.id];
            }, 0);
        }
        
        // Add packaging fee (Free for now)
        if (formData.packagingType === 'preferred') {
            base += 0;
        }

        // Add pickup fee if applicable (Free for now)
        if (formData.pickupType === 'delivered') {
            base += 0;
        }

        const subtotal = Math.max(0, base - discount);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        return {
            base: Number(base.toFixed(2)),
            discount: Number(discount.toFixed(2)),
            subtotal: Number(subtotal.toFixed(2)),
            tax: Number(tax.toFixed(2)),
            total: Number(total.toFixed(2))
        };
    }, [quantities, otherItems, edlValue, edlPackages, discount, formData.pickupType, formData.packagingType])

    const totalAmount = pricingSummary.total;

    const totalOtherItemsCount = useMemo(() => {
        return Object.values(otherItems).reduce((a, b) => a + b, 0);
    }, [otherItems])

    const totalBoxes = useMemo(() => {
        if (edlValue > 0) return edlPackages.length + totalOtherItemsCount;
        const standardBoxes = Object.values(quantities).reduce((a, b) => a + b, 0);
        const extraItems = Object.values(otherItems).reduce((a, b) => a + b, 0);
        return standardBoxes + extraItems;
    }, [quantities, otherItems, edlPackages, edlValue, totalOtherItemsCount])

    // ─── Handlers ───
    const updateQuantity = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, prev[id] + delta),
        }))
        // Popup trigger removed: asked globally in next step
    }

    const updateOtherItemQuantity = (id, delta) => {
        setOtherItems((prev) => ({
            ...prev,
            [id]: Math.max(0, prev[id] + delta),
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Effect to clear pickupDate if it becomes invalid after packagingDate changes
    useEffect(() => {
        if (formData.packagingType === 'preferred' && formData.packagingDate && formData.pickupDate) {
            if (formData.pickupDate < formData.packagingDate) {
                setFormData(prev => ({ ...prev, pickupDate: "" }))
            }
            const maxDate = addDays(formData.packagingDate, 7);
            if (formData.pickupDate > maxDate) {
                setFormData(prev => ({ ...prev, pickupDate: "" }))
            }
        }
    }, [formData.packagingDate])

    // Sync receiver details if 'same as sender' is checked
    useEffect(() => {
        if (sameAsSender) {
            setFormData(prev => ({
                ...prev,
                receiverName: prev.name,
                receiverPhone: prev.phone
            }))
        }
    }, [sameAsSender, formData.name, formData.phone])

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
                    orderTotal: edlValue > 0 
                        ? edlPackages.reduce((sum, pkg) => {
                            const volWeight = (Number(pkg.l) * Number(pkg.b) * Number(pkg.h)) / 2700;
                            const chargeableWeight = Math.max(Number(pkg.weight), volWeight);
                            return sum + (chargeableWeight * 80);
                          }, 0)
                        : BOX_TYPES.reduce((sum, box) => {
                            return sum + box.price * quantities[box.id];
                          }, 0)
                }),
            })
            const data = await res.json()
            if (data.success || data.discount > 0) {
                setAppliedCoupon(data.couponCode || couponCode)
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
                    // Set all data fields FIRST before making it "serviceable" to avoid race conditions
                    const edlResult = data.data.edl || 0
                    setEdlValue(edlResult)
                    setFormData((prev) => ({
                        ...prev,
                        destCity: data.data.city || "",
                        destState: data.data.state || "",
                    }))
                    setDeliveryDays(data.data.deliveryDays || "")

                    // Trigger EDL Animation if applicable
                    if (edlResult > 0) {
                        setEdlStage(1) // Stage 1: "Oh! We don't deliver directly..."
                        setTimeout(() => setEdlStage(2), 2000) // Stage 2: "Finding alternative..."
                        setTimeout(() => setEdlStage(3), 4500) // Stage 3: "Woah! We got something!"
                    } else {
                        setEdlStage(0)
                        setEdlValue(0)
                    }

                    // Move this to the end so the 'Get Started' button only enables AFTER all values are set
                    setPincodeStatus("serviceable") 
                } else {
                    setPincodeStatus("not-serviceable")
                    setPincodeError(data.message || "This pincode is not serviceable yet.")
                    setContactNumber(data.data?.contactNumber || "")
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
        const basicInfoValid = 
            formData.name &&
            formData.phone &&
            /^\d{10}$/.test(formData.phone) &&
            formData.email &&
            formData.hostelAddress &&
            formData.destPincode &&
            pincodeStatus === "serviceable" &&
            formData.destAddress &&
            formData.receiverName &&
            formData.receiverPhone &&
            /^\d{10}$/.test(formData.receiverPhone);

        const packagingValid = 
            formData.packagingType && formData.packagingDate && formData.packagingSlot;

        const pickupValid = 
            formData.pickupType && formData.pickupDate && formData.pickupSlot;

        return basicInfoValid && packagingValid && pickupValid;
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
                    amount: Math.round(totalAmount * 100),
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
                            let boxDescription = "";
                            let detailedPackageInfo = null;

                            if (edlValue > 0) {
                                boxDescription = `EDL Multi-package: ${edlPackages.length} items. Contents: ${edlContents.join(", ")}`;
                                detailedPackageInfo = edlPackages.map((pkg, idx) => ({
                                    id: idx + 1,
                                    type: pkg.type,
                                    dims: `${pkg.l}x${pkg.b}x${pkg.h}`,
                                    weight: pkg.weight,
                                    chargeable: Math.max(Number(pkg.weight), (Number(pkg.l) * Number(pkg.b) * Number(pkg.h)) / 2700).toFixed(2)
                                }));
                            } else {
                                boxDescription = BOX_TYPES
                                    .filter((b) => quantities[b.id] > 0)
                                    .map((b) => `${b.name} x${quantities[b.id]}`);
                            }

                            // Add other items to summary string
                            const selectedExtraItems = OTHER_ITEMS_TYPES
                                .filter(item => otherItems[item.id] > 0)
                                .map(item => `${item.name} x${otherItems[item.id]}`);
                            
                            const fullItemSummary = [
                                ...(Array.isArray(boxDescription) ? boxDescription : [boxDescription]), 
                                ...selectedExtraItems
                            ].filter(Boolean).join(", ");

                            const bookingData = {
                                serviceType: "campus-parcel",
                                senderDetails: {
                                    name: formData.name,
                                    phone: formData.phone,
                                    email: formData.email,
                                    address: formData.hostelAddress,
                                    landmark: "", // Not required for hostel
                                    pincode: "826004", // IIT ISM Dhanbad pincode
                                    city: "Dhanbad",
                                    state: "Jharkhand",
                                },
                                receiverDetails: {
                                    name: formData.receiverName,
                                    phone: formData.receiverPhone,
                                    email: formData.email,
                                    address: formData.destLandmark 
                                        ? `${formData.destAddress}, ${formData.destLandmark}` 
                                        : formData.destAddress,
                                    landmark: formData.destLandmark,
                                    pincode: formData.destPincode,
                                    city: formData.destCity,
                                    state: formData.destState,
                                },
                                packageDetails: {
                                    items: fullItemSummary,
                                    totalItems: totalBoxes,
                                    weight: edlValue > 0 ? edlPackages.reduce((sum, pkg) => sum + Number(pkg.weight), 0) : undefined,
                                    weightUnit: edlValue > 0 ? "kg" : undefined,
                                    description: fullItemSummary,
                                    isEdl: edlValue > 0,
                                    edlItems: detailedPackageInfo,
                                    edlContents: edlContents,
                                    otherContentText: otherItemText
                                },
                                boxDeliveryType: formData.packagingType === 'preferred' ? 'delivered' : 'self',
                                boxDeliveryDate: formData.packagingDate,
                                boxDeliverySlot: formData.packagingSlot,
                                pickupMethod: formData.pickupType === 'delivered' ? 'doorstep' : 'hub',
                                pickupDate: formData.pickupDate,
                                pickupSlot: formData.pickupSlot,
                                pricing: {
                                    basePrice: pricingSummary.base,
                                    additionalCharges: 0, // Packaging/Pickup are now free
                                    discount: pricingSummary.discount,
                                    couponCode: appliedCoupon,
                                    tax: pricingSummary.tax,
                                    totalAmount: pricingSummary.total,
                                },
                                notes: "",
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

    // ─── Component Render ───

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            {/* ────── Graduation Offer Banner ────── */}
            <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 text-white py-3 text-center text-sm font-black tracking-widest uppercase shadow-lg relative z-50">
                <span className="mr-2">✨</span>
                Offer Effective 27th April — Flat rates & Upto 80% Off on Boxes!
                <span className="ml-2">✨</span>
            </div>

            {/* ────── Hero Section ────── */}
            <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 text-orange-300 text-sm px-4 py-1.5 rounded-full mb-6"
                    >
                        <GraduationCap className="w-4 h-4" />
                        Exclusively for IIT ISM Dhanbad Students
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]"
                    >
                        Moving Out?{" "}
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 animate-gradient-x">
                            We've Got You.
                        </span>
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col items-center gap-4 mb-10"
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                        <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
                            Pack your hostel life into our boxes. We'll safely deliver your belongings 
                            to your doorstep — <span className="text-white font-bold">affordable & hassle‑free.</span>
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <p className="text-sm font-black tracking-[0.2em] text-orange-400 uppercase italic">
                                    🚀 Launching 27th April
                                </p>
                            </div>
                            <div className="px-6 py-2 rounded-2xl bg-orange-500/20 border border-orange-500/30 backdrop-blur-md animate-pulse">
                                <p className="text-sm font-black tracking-[0.1em] text-orange-300 uppercase">
                                    🔥 Upto 80% Off on Boxes
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.15em]"
                    >
                        {[
                            { icon: <Shield className="w-5 h-5 text-green-400" />, label: "Safe & Insured" },
                            { icon: <Truck className="w-5 h-5 text-blue-400" />, label: "Door‑to‑Door" },
                            { icon: <Clock className="w-5 h-5 text-yellow-400" />, label: "On‑Time Delivery" }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5, color: "#fff" }}
                                className="flex items-center gap-3 text-gray-400 transition-colors"
                            >
                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">{item.icon}</div>
                                {item.label}
                            </motion.div>
                        ))}
                    </motion.div>
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
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.15 : 1,
                                        backgroundColor: isCompleted ? "#22c55e" : (isActive ? "#ea580c" : "#ffffff"),
                                        borderColor: isCompleted ? "#22c55e" : (isActive ? "#ea580c" : "#e5e7eb"),
                                        color: (isActive || isCompleted) ? "#ffffff" : "#9ca3af"
                                    }}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-xl shadow-black/5`}
                                >
                                    {isCompleted ? <CheckCircle className="w-7 h-7" /> : React.cloneElement(s.icon, { className: "w-6 h-6" })}
                                </motion.div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? "text-orange-600" : "text-gray-400"}`}>
                                    {isActive ? "Viewing" : s.label}
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
                                                className="bg-red-50 border border-red-200 rounded-3xl p-6 flex flex-col gap-5 shadow-xl shadow-red-500/5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-500/20">
                                                        <AlertTriangle className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-red-900 text-lg leading-tight">Oops! Area not supported.</p>
                                                        <p className="text-sm text-red-700 font-medium mt-1">{pincodeError}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-red-100">
                                                    <p className="text-xs text-red-800 font-bold leading-relaxed">
                                                        We might still be able to deliver your items! Please contact us directly to arrange a special delivery.
                                                    </p>
                                                    <Button 
                                                        onClick={() => window.location.href = `tel:${contactNumber || "+919525801506"}`}
                                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-black h-14 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 transition-all active:scale-95"
                                                    >
                                                        <Phone className="w-5 h-5" /> 
                                                        <span>Contact Us to Deliver</span>
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        <Button
                                            onClick={() => {
                                                if (edlValue > 0) {
                                                    setShowEdlWarning(true)
                                                } else {
                                                    setStep(1)
                                                }
                                            }}
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
                                    <h2 className="text-4xl font-black text-gray-900">
                                        {edlValue > 0 ? "Manage Your Packages" : "Choose Your Boxes"}
                                    </h2>
                                    <p className="text-gray-500 mt-2">
                                        {edlValue > 0 
                                            ? "Add dimensions and weight for each item you want to ship" 
                                            : "Select the box sizes and quantities you need for your move"}
                                    </p>
                                </div>

                                {edlValue > 0 ? (
                                    /* ───── EDL MULTI-PACKAGE MANAGER ───── */
                                    <div className="space-y-6">
                                        {edlStep === 0 ? (
                                            <>
                                                <div className="space-y-4">
                                                    {edlPackages.map((pkg, index) => {
                                                        const volWeight = (Number(pkg.l) * Number(pkg.b) * Number(pkg.h)) / 2700;
                                                        const chargeableWeight = Math.max(Number(pkg.weight), volWeight);
                                                        
                                                        return (
                                                            <Card key={pkg.id} className="glass border-0 shadow-lg overflow-hidden transition-all hover:shadow-xl">
                                                                <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-sm">
                                                                            {index + 1}
                                                                        </div>
                                                                        <span className="font-bold uppercase tracking-wider text-xs">Package Details</span>
                                                                    </div>
                                                                    {edlPackages.length > 1 && (
                                                                        <button 
                                                                            onClick={() => setEdlPackages(prev => prev.filter(p => p.id !== pkg.id))}
                                                                            className="text-red-400 hover:text-red-300 transition-colors"
                                                                        >
                                                                            <XCircle className="w-5 h-5" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <CardContent className="p-6 space-y-6">
                                                                    {/* Packaging Type */}
                                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                                        {["Box", "Suitcase", "Backpack", "Other"].map((type) => (
                                                                            <div
                                                                                key={type}
                                                                                onClick={() => {
                                                                                    if (type === "Other") {
                                                                                        setShowOtherItemsPopup(true);
                                                                                        return;
                                                                                    }
                                                                                    const newPkgs = [...edlPackages];
                                                                                    newPkgs[index].type = type;
                                                                                    setEdlPackages(newPkgs);
                                                                                    // Popup trigger removed: asked globally in next step
                                                                                }}
                                                                                className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                                                                                    pkg.type === type 
                                                                                        ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm" 
                                                                                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                                                                }`}
                                                                            >
                                                                                <div className="text-xl mb-1">
                                                                                    {type === "Box" ? "📦" : type === "Suitcase" ? "💼" : type === "Backpack" ? "🎒" : "➕"}
                                                                                </div>
                                                                                <p className="text-[10px] font-black uppercase tracking-tighter">{type}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                                        {/* Dimensions */}
                                                                        <div className="space-y-3">
                                                                            <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                                                                <Search className="w-3 h-3" /> Dimensions (L × B × H in cm) <span className="text-red-500 font-bold ml-1">*Required</span>
                                                                            </Label>
                                                                            <div className="flex gap-2">
                                                                                {['l', 'b', 'h'].map((dim) => (
                                                                                    <Input
                                                                                        key={dim}
                                                                                        placeholder={dim.toUpperCase()}
                                                                                        value={pkg[dim]}
                                                                                        onChange={(e) => {
                                                                                            const newPkgs = [...edlPackages];
                                                                                            newPkgs[index][dim] = e.target.value.replace(/\D/g, "");
                                                                                            setEdlPackages(newPkgs);
                                                                                        }}
                                                                                        className="h-12 text-center font-bold border-2 focus:border-blue-500"
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        {/* Weight */}
                                                                        <div className="space-y-3">
                                                                            <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                                                                <Package className="w-3 h-3" /> Actual Weight (kg) <span className="text-red-500 font-bold ml-1">*Required</span>
                                                                            </Label>
                                                                            <div className="relative">
                                                                                <Input
                                                                                    placeholder="0.00"
                                                                                    value={pkg.weight}
                                                                                    onChange={(e) => {
                                                                                        const newPkgs = [...edlPackages];
                                                                                        newPkgs[index].weight = e.target.value.replace(/[^\d.]/g, "");
                                                                                        setEdlPackages(newPkgs);
                                                                                    }}
                                                                                    className="h-12 pl-12 font-bold border-2 focus:border-blue-500"
                                                                                />
                                                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">KG</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="bg-blue-50 rounded-2xl p-4 flex justify-between items-center border border-blue-100/50">
                                                                        <div>
                                                                            <p className="text-[10px] text-blue-400 uppercase font-black mb-0.5">Chargeable Weight</p>
                                                                            <p className="text-xl font-black text-blue-900">
                                                                                {chargeableWeight > 0 ? chargeableWeight.toFixed(2) : "0.00"} <span className="text-sm font-bold">Kgs</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="text-[10px] text-blue-400 uppercase font-black mb-0.5">Estimated Price</p>
                                                                            <p className="text-xl font-black text-blue-900">₹{(chargeableWeight * 80).toLocaleString("en-IN")}</p>
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        );
                                                    })}
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Button 
                                                        variant="outline" 
                                                        onClick={() => setEdlPackages(prev => [...prev, { id: Date.now(), type: "", l: "", b: "", h: "", weight: "" }])}
                                                        className="w-full h-14 border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-gray-500 font-bold rounded-2xl flex items-center justify-center gap-2"
                                                    >
                                                        <Plus className="w-5 h-5" /> Add Another Package
                                                    </Button>

                                                    <Button 
                                                        onClick={() => setShowOtherItemsPopup(true)}
                                                        className={`w-full h-14 border-2 border-dashed transition-all font-bold rounded-2xl flex items-center justify-center gap-2 ${
                                                            totalOtherItemsCount > 0 
                                                                ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm" 
                                                                : "border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-500"
                                                        }`}
                                                    >
                                                        {totalOtherItemsCount > 0 ? (
                                                            <>
                                                                <CheckCircle className="w-5 h-5 text-purple-600" />
                                                                Edit Special Items ({totalOtherItemsCount})
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Sparkles className="w-5 h-5" />
                                                                Add Special Items (Laptop, Cycle, etc.)
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                <div className="pt-10">
                                                    {/* Highly Visible Total Summary Card for EDL */}
                                                    <Card className="border-2 border-orange-500 bg-gray-900 text-white shadow-2xl overflow-hidden rounded-3xl">
                                                        <CardContent className="p-8">
                                                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                                                <div className="text-center md:text-left">
                                                                    <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Final Estimated Budget</p>
                                                                    <p className="text-4xl font-black flex items-baseline gap-2">
                                                                        <span className="text-xl text-gray-400">₹</span>
                                                                        {totalAmount.toLocaleString("en-IN")}
                                                                    </p>
                                                                    <p className="text-gray-400 text-xs mt-2 font-medium">
                                                                        {totalBoxes} total item{totalBoxes !== 1 ? 's' : ''} • Inclusive of GST & EDL
                                                                    </p>
                                                                </div>
                                                                
                                                                <Button
                                                                    onClick={() => setShowPackagingPopup(true)}
                                                                    disabled={edlPackages.some(p => !p.l || !p.b || !p.h || !p.weight)}
                                                                    className="w-full md:w-auto bg-gradient-premium h-16 px-12 text-xl font-black shadow-xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all rounded-2xl group flex items-center gap-3"
                                                                >
                                                                    <span>Next: Save & Continue</span>
                                                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                                                </Button>
                                                            </div>
                                                            
                                                            {totalOtherItemsCount > 0 && (
                                                                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                                                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
                                                                        + {totalOtherItemsCount} Special Item{totalOtherItemsCount !== 1 ? 's' : ''} Added
                                                                    </span>
                                                                    {OTHER_ITEMS_TYPES.filter(it => otherItems[it.id] > 0).map(it => (
                                                                        <span key={it.id} className="text-[10px] text-gray-500 font-bold uppercase italic">
                                                                            • {it.name}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </>
                                        ) : (
                                            /* ───── EDL PACKAGE CONTENTS (MULTI-SELECT) ───── */
                                            <div className="space-y-8">
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {[
                                                        { label: "Books & Docs", icon: "📚" },
                                                        { label: "Clothes & Items", icon: "👕" },
                                                        { label: "Consumables", icon: "🍪" },
                                                        { label: "Electronics", icon: "📱" },
                                                        { label: "Household Items", icon: "🍳" },
                                                        { label: "Other", icon: "📦" }
                                                    ].map((item) => {
                                                        const isSelected = edlContents.includes(item.label);
                                                        return (
                                                            <div
                                                                key={item.label}
                                                                onClick={() => {
                                                                    setEdlContents(prev => 
                                                                        prev.includes(item.label) 
                                                                            ? prev.filter(i => i !== item.label)
                                                                            : [...prev, item.label]
                                                                    );
                                                                }}
                                                                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer text-center relative group ${
                                                                    isSelected 
                                                                        ? "border-orange-500 bg-orange-50 ring-4 ring-orange-500/10 shadow-lg" 
                                                                        : "border-gray-100 bg-white hover:border-gray-200"
                                                                }`}
                                                            >
                                                                {isSelected && (
                                                                    <div className="absolute top-3 right-3 bg-orange-500 text-white p-1 rounded-full shadow-md scale-110">
                                                                        <Check className="w-3 h-3" />
                                                                    </div>
                                                                )}
                                                                <div className={`text-4xl mb-4 transition-transform duration-300 group-hover:scale-110`}>{item.icon}</div>
                                                                <p className="text-sm font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{item.label}</p>
                                                                
                                                                {item.label === "Other" && isSelected && (
                                                                    <motion.div 
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        className="mt-4"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <Input 
                                                                            placeholder="Specify items..."
                                                                            value={otherItemText}
                                                                            onChange={(e) => setOtherItemText(e.target.value)}
                                                                            className="h-10 border-2 border-orange-200 focus:border-orange-500 bg-white text-xs font-bold"
                                                                        />
                                                                    </motion.div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="flex gap-4 pt-4">
                                                    <Button variant="outline" onClick={() => setEdlStep(0)} className="h-14 px-8 border-2 rounded-2xl font-bold">
                                                        Back to Packages
                                                    </Button>
                                                    <Button 
                                                        onClick={() => setShowPackagingPopup(true)}
                                                        disabled={edlContents.length === 0}
                                                        className="flex-1 bg-gradient-premium h-14 text-lg font-black shadow-xl shadow-orange-500/20 rounded-2xl"
                                                    >
                                                        Proceed to Details <ArrowRight className="ml-2 w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* ───── STANDARD BOX SELECTOR ───── */
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {BOX_TYPES.map((box) => (
                                        <Card
                                            key={box.id}
                                            className={`glass overflow-hidden border-0 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ring-1 ring-black/5 ${quantities[box.id] > 0 ? " ring-4 ring-orange-500/30" : ""
                                                }`}
                                        >
                                            <div className={`bg-gradient-to-br ${box.color} p-6 text-white text-center relative overflow-hidden group`}>
                                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                                
                                                {/* 80% OFF Badge */}
                                                <div className="absolute top-3 right-3 bg-white text-orange-600 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter shadow-lg z-10 animate-bounce">
                                                    80% Off
                                                </div>

                                                <span className="text-5xl block mb-2">{box.icon}</span>
                                                <h3 className="text-2xl font-black">{box.name}</h3>
                                                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mt-2">
                                                    {box.dimensions}
                                                </div>
                                            </div>
                                            <CardContent className="p-6 space-y-5">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{box.description}</p>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{box.capacity}</p>
                                                </div>

                                                <div className="text-center">
                                                    <span className="text-3xl font-black text-gray-900">₹{edlValue > 0 ? box.edlPrice : box.price}</span>
                                                    <span className="text-sm text-gray-400 ml-1">+ GST</span>
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

                                    {/* ───── OTHER ITEMS CARD (POPUP TRIGGER) ───── */}
                                    {edlValue === 0 && (
                                        <Card
                                            onClick={() => setShowOtherItemsPopup(true)}
                                            className={`glass overflow-hidden border-0 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group ring-1 ring-black/5 ${totalOtherItemsCount > 0 ? " ring-4 ring-purple-500/30" : ""}`}
                                        >
                                            <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white text-center group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-700 relative`}>
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                                <div className="relative inline-block">
                                                    <span className="text-5xl">⚡</span>
                                                    {totalOtherItemsCount > 0 && (
                                                        <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
                                                            {totalOtherItemsCount}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-2xl font-black mt-2">Special Items</h3>
                                                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mt-1">Electronics & More</p>
                                            </div>
                                            <CardContent className="p-6 space-y-5 text-center">
                                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                    Pack your <span className="text-gray-900 font-black">Laptops</span>, <span className="text-gray-900 font-black">Cycles</span>, and more. 
                                                </p>
                                                <div className="pt-2">
                                                    <Button className="w-full h-12 bg-gray-50 hover:bg-purple-600 hover:text-white text-gray-900 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border-2 border-gray-100 group-hover:border-purple-600 shadow-none">
                                                        {totalOtherItemsCount > 0 ? "Edit Selection" : "View Items"}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                                )}



                                {edlValue === 0 && (
                                    /* Total Bar (Standard) */
                                    <Card className="border-0 shadow-xl bg-gray-900 text-white mt-8">
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
                                                onClick={() => {
                                                    const hasStandardBoxes = quantities.alpha > 0 || quantities.nova > 0;
                                                    if (hasStandardBoxes) {
                                                        setShowPackagingPopup(true);
                                                    } else {
                                                        // Auto-set to own packaging for special items
                                                        setFormData(prev => ({ ...prev, packagingType: 'own' }));
                                                        setShowPickupPopup(true);
                                                    }
                                                }}
                                                disabled={totalBoxes === 0}
                                                className="w-full md:w-auto bg-gradient-premium h-14 px-10 text-lg font-black shadow-2xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 rounded-2xl"
                                            >
                                                Next: Your Details <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
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

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <GraduationCap className="w-4 h-4" /> Hostel / Room Address (Address Line 1)
                                                </Label>
                                                <Input
                                                    name="hostelAddress"
                                                    value={formData.hostelAddress}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Room 204, Jasper Hostel, IIT ISM Dhanbad"
                                                    className="h-12 border-2 focus:border-orange-500"
                                                />
                                            </div>
                                            
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

                                        {/* ─── Receiver Details ─── */}
                                        <div className="space-y-4 pt-4 border-t border-dashed">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-md font-bold text-gray-900 flex items-center gap-2">
                                                    📦 Receiver Details
                                                </h4>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id="same-as-sender" 
                                                        checked={sameAsSender}
                                                        onCheckedChange={(checked) => setSameAsSender(checked)}
                                                    />
                                                    <label
                                                        htmlFor="same-as-sender"
                                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                                                    >
                                                        Same as Sender
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-semibold text-gray-700">Receiver Name</Label>
                                                    <Input
                                                        name="receiverName"
                                                        value={formData.receiverName}
                                                        onChange={handleChange}
                                                        disabled={sameAsSender}
                                                        placeholder="Name of person receiving"
                                                        className="h-12 border-2 focus:border-orange-500 disabled:bg-gray-50/80"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-sm font-semibold text-gray-700">Receiver Phone</Label>
                                                    <Input
                                                        name="receiverPhone"
                                                        value={formData.receiverPhone}
                                                        onChange={handleChange}
                                                        disabled={sameAsSender}
                                                        placeholder="Receiver's mobile"
                                                        maxLength={10}
                                                        className="h-12 border-2 focus:border-orange-500 disabled:bg-gray-50/80"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ─── Delivery Address ─── */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-gray-700">Delivery Address (Address Line 1)</Label>
                                                <Input
                                                    name="destAddress"
                                                    value={formData.destAddress}
                                                    onChange={handleChange}
                                                    placeholder="House no, street, locality"
                                                    className="h-12 border-2 focus:border-orange-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-gray-700">Landmark (Address Line 2) - Optional</Label>
                                                <Input
                                                    name="destLandmark"
                                                    value={formData.destLandmark}
                                                    onChange={handleChange}
                                                    placeholder="Near landmark or school/temple"
                                                    className="h-12 border-2 focus:border-orange-500"
                                                />
                                            </div>
                                        </div>



                                        {/* Delivery Estimate */}
                                        {deliveryDays && (
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-bold text-blue-900">Estimated Delivery Time</p>
                                                    <p className="text-sm text-blue-700">Expect delivery in 5-7 business days after pickup.</p>
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
                                        {edlValue > 0 ? (
                                            /* EDL Items Summary */
                                            <div className="space-y-4">
                                                {edlPackages.map((pkg, idx) => {
                                                    const volWeight = (Number(pkg.l) * Number(pkg.b) * Number(pkg.h)) / 2700;
                                                    const chargeableWeight = Math.max(Number(pkg.weight), volWeight);
                                                    return (
                                                        <div key={pkg.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <p className="font-black text-gray-900 text-sm uppercase tracking-tight">Package #{idx + 1}: {pkg.type}</p>
                                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{pkg.l}x{pkg.b}x{pkg.h} cm • {pkg.weight} kg</p>
                                                                </div>
                                                                <p className="font-black text-orange-600 text-sm">₹{(chargeableWeight * 80).toLocaleString("en-IN")}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[9px] font-black uppercase">
                                                                    Chargeable: {chargeableWeight.toFixed(2)} kg
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                <div className="pt-2">
                                                    <p className="text-[10px] text-gray-400 uppercase font-black mb-2">Package Contents</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {edlContents.map(c => (
                                                            <span key={c} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold border border-gray-200">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Standard Items Summary */
                                            BOX_TYPES.filter((b) => quantities[b.id] > 0).map((box) => {
                                                const displayPrice = box.price;
                                                return (
                                                    <div key={box.id} className="flex items-center justify-between py-2">
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{box.name}</p>
                                                            <p className="text-sm text-gray-500">₹{displayPrice} × {quantities[box.id]}</p>
                                                        </div>
                                                        <p className="font-bold text-gray-900">₹{(displayPrice * quantities[box.id]).toLocaleString("en-IN")}</p>
                                                    </div>
                                                );
                                            })
                                        )}

                                        {/* Other Items Summary */}
                                        {OTHER_ITEMS_TYPES.some(item => otherItems[item.id] > 0) && (
                                            <div className="pt-4 border-t border-gray-50 border-dashed">
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">Extra Items</p>
                                                {OTHER_ITEMS_TYPES.filter(item => otherItems[item.id] > 0).map((item) => (
                                                    <div key={item.id} className="flex items-center justify-between py-2">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-lg">{item.icon}</span>
                                                            <div>
                                                                <p className="font-semibold text-gray-900 text-sm italic">{item.name}</p>
                                                                <p className="text-[10px] text-gray-500 font-bold">₹{item.price.toLocaleString("en-IN")} × {otherItems[item.id]}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-bold text-gray-900 text-sm">₹{(item.price * otherItems[item.id]).toLocaleString("en-IN")}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

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

                                        <div className="border-t pt-4 flex flex-col gap-2 bg-gray-50 -mx-6 px-6 py-4">
                                            <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                                                <p>Weight Price (Base)</p>
                                                <p>₹{(pricingSummary.base - (edlValue > 0 ? edlValue : 0)).toLocaleString("en-IN")}</p>
                                            </div>
                                            {edlValue > 0 && (
                                                <div className="flex justify-between items-center text-sm font-bold text-orange-600">
                                                    <p>Remote Area Surcharge (EDL)</p>
                                                    <p>+ ₹{edlValue.toLocaleString("en-IN")}</p>
                                                </div>
                                            )}
                                            {pricingSummary.discount > 0 && (
                                                <div className="flex justify-between items-center text-sm font-bold text-green-600">
                                                    <p>Discount</p>
                                                    <p>- ₹{pricingSummary.discount.toLocaleString("en-IN")}</p>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center text-sm font-bold text-gray-500 border-t border-gray-100 pt-2">
                                                <p>Subtotal</p>
                                                <p>₹{pricingSummary.subtotal.toLocaleString("en-IN")}</p>
                                            </div>
                                            <div className="flex justify-between items-center text-sm font-bold text-blue-600">
                                                <p>GST (18%)</p>
                                                <p>+ ₹{pricingSummary.tax.toLocaleString("en-IN")}</p>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                                                <p className="text-xl font-black text-gray-900 uppercase tracking-tighter">Amount to pay</p>
                                                <p className="text-3xl font-black text-orange-600">₹{pricingSummary.total.toLocaleString("en-IN")}</p>
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
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Full Name (Sender)</p>
                                                    <p className="font-bold text-gray-800">{formData.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Receiver Name</p>
                                                    <p className="font-bold text-gray-800">{formData.receiverName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Pickup Address</p>
                                                    <p className="font-bold text-gray-800">
                                                        {formData.hostelAddress}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                                                    <p className="text-[10px] text-orange-400 uppercase tracking-widest font-black mb-1">Packaging & Pickup</p>
                                                    <p className="font-bold text-orange-900 leading-tight">
                                                        {formData.packagingType === 'preferred' ? (
                                                            <span>
                                                                📦 Preferred Box (<span className="line-through opacity-70">+₹39</span> <span className="text-green-600 font-black">Free</span>)
                                                            </span>
                                                        ) : '🛍️ Own Packaging'}
                                                    </p>
                                                    <p className="font-bold text-orange-800 mt-1">
                                                        {formData.pickupType === 'self' ? '📍 Drop at Hub' : (
                                                            <span>
                                                                🚚 Doorstep Pickup (<span className="line-through opacity-70">+₹29</span> <span className="text-green-600 font-black">Free</span>)
                                                            </span>
                                                        )}
                                                    </p>
                                                    {formData.packagingType && (
                                                        <p className="text-xs text-orange-700 font-medium mt-1 italic border-t pt-1 border-orange-200">
                                                            {formData.packagingType === 'own' ? 'Box Collection (Hub): ' : 'Box Delivery (Room): '} {formData.packagingDate} ({formData.packagingSlot})
                                                        </p>
                                                    )}
                                                    {formData.pickupType && (
                                                        <p className="text-xs text-orange-700 font-medium mt-1 italic border-t pt-1 border-orange-200">
                                                            {formData.pickupType === 'self' ? 'Parcel Drop (Hub): ' : 'Parcel Collection (Room): '} {formData.pickupDate} ({formData.pickupSlot})
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Sender Phone</p>
                                                    <p className="font-bold text-gray-800">{formData.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Receiver Phone</p>
                                                    <p className="font-bold text-gray-800">{formData.receiverPhone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-1">Full Delivery Address</p>
                                                    <p className="font-bold text-gray-800 leading-snug">
                                                        {formData.destAddress}
                                                        {formData.destLandmark && `, ${formData.destLandmark}`}, {formData.destCity}, {formData.destState} — {formData.destPincode}
                                                    </p>
                                                </div>
                                                {formData.pickupType && (
                                                    <div className={`p-3 rounded-xl border ${formData.pickupType === 'self' ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
                                                        <p className={`text-[10px] uppercase tracking-widest font-black mb-1 ${formData.pickupType === 'self' ? 'text-orange-400' : 'text-blue-400'}`}>Parcel {formData.pickupType === 'self' ? 'Drop-off' : 'Pickup'}</p>
                                                        <p className={`font-bold ${formData.pickupType === 'self' ? 'text-orange-900' : 'text-blue-900'}`}>
                                                            {formData.pickupType === 'self' ? 'Scheduled for Hub Drop-off' : 'Scheduled for Doorstep Pickup'}
                                                        </p>
                                                        <p className={`text-xs font-medium mt-1 ${formData.pickupType === 'self' ? 'text-orange-700' : 'text-blue-700'}`}>
                                                            📅 {formData.pickupDate} • ⏰ {formData.pickupSlot}
                                                        </p>
                                                    </div>
                                                )}
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
                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 my-4">
                                    <p className="text-blue-800 font-bold flex items-center justify-center gap-2">
                                        <Info className="w-5 h-5" /> 
                                        A confirmation email has been sent to your email ID.
                                    </p>
                                    <p className="text-blue-600 text-sm mt-1">
                                        Please check your **Inbox** as well as the **Spam folder**.
                                    </p>
                                </div>
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

             {/* ═══════ MODAL 1: PACKAGING CHOICE ═══════ */}
            <AnimatePresence>
                {showPackagingPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowPackagingPopup(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                        >
                            <div className="bg-gradient-premium p-6 text-center text-white">
                                <Package className="w-10 h-10 mx-auto mb-3" />
                                <h3 className="text-xl font-black">
                                    {edlValue === 0 ? "Box Logistics" : "Need a Box?"}
                                </h3>
                                <p className="text-orange-100 text-xs mt-1">
                                    {edlValue === 0 
                                        ? "How would you like to receive your boxes?" 
                                        : "Would you like us to provide packaging or do you have your own?"}
                                </p>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setFormData(prev => ({ ...prev, packagingType: 'own' }))}
                                        className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all ${formData.packagingType === 'own' ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-100 opacity-60 hover:opacity-100"}`}
                                    >
                                        <div className="text-3xl mb-2">
                                            {edlValue === 0 ? "📍" : "🛍️"}
                                        </div>
                                        <p className="font-black text-gray-900 text-sm">
                                            {edlValue === 0 ? "Fetch from Hub" : "Have my own"}
                                        </p>
                                        <p className="text-[9px] text-gray-500 mt-1 mb-2 leading-tight">
                                            {edlValue === 0 ? "Collect empty boxes from our campus office." : "Use your own packaging materials."}
                                        </p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Free</p>
                                    </div>
                                    <div
                                        onClick={() => setFormData(prev => ({ ...prev, packagingType: 'preferred' }))}
                                        className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all ${formData.packagingType === 'preferred' ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-100 opacity-60 hover:opacity-100"}`}
                                    >
                                        <div className="text-3xl mb-2">
                                            {edlValue === 0 ? "🏠" : "📦"}
                                        </div>
                                        <p className="font-black text-gray-900 text-sm">
                                            {edlValue === 0 ? "Deliver to Room" : "Preferred Box"}
                                        </p>
                                        <p className="text-[9px] text-gray-500 mt-1 mb-2 leading-tight">
                                            {edlValue === 0 ? "We'll deliver empty boxes to your room." : "Choose from our high-quality boxes."}
                                        </p>
                                        <div className="flex flex-col items-center">
                                            <p className="text-[10px] text-gray-400 line-through font-bold uppercase tracking-widest">₹39 / item</p>
                                            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Free (Limited Time)</p>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {formData.packagingType && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden bg-gray-50 p-4 rounded-xl border border-gray-200"
                                        >
                                            <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">
                                                {formData.packagingType === 'own' 
                                                    ? "When will you collect boxes from our Hub?" 
                                                    : (edlValue === 0 ? "When should we deliver your boxes?" : "When should we deliver empty box?")}
                                            </p>
                                            <div className="grid grid-cols-1 gap-3">
                                                <Input
                                                    name="packagingDate"
                                                    type="date"
                                                    min={today}
                                                    value={formData.packagingDate}
                                                    onChange={handleChange}
                                                    className="h-10 border-2 rounded-lg font-bold text-xs"
                                                />
                                                <select
                                                    name="packagingSlot"
                                                    value={formData.packagingSlot}
                                                    onChange={handleChange}
                                                    className="w-full h-10 rounded-lg border-2 border-gray-200 px-3 bg-white text-xs font-bold"
                                                >
                                                    <option value="">Select Time Slot</option>
                                                    <option value="9 AM - 12 PM">9 AM – 12 PM</option>
                                                    <option value="12 PM - 3 PM">12 PM – 3 PM</option>
                                                    <option value="3 PM - 6 PM">3 PM – 6 PM</option>
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Button
                                    onClick={() => {
                                        setShowPackagingPopup(false)
                                        setShowPickupPopup(true)
                                    }}
                                    disabled={!formData.packagingType || !formData.packagingDate || !formData.packagingSlot}
                                    className="w-full bg-gradient-premium h-14 text-lg font-black rounded-2xl shadow-lg shadow-orange-500/20"
                                >
                                    Confirm Choice
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════ MODAL 2: PICKUP METHOD ═══════ */}
            <AnimatePresence>
                {showPickupPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowPickupPopup(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
                        >
                            <div className="bg-gradient-premium p-6 text-center text-white">
                                <Truck className="w-10 h-10 mx-auto mb-3" />
                                <h3 className="text-xl font-black">Shipment Pickup</h3>
                                <p className="text-orange-100 text-xs mt-1">How should we receive your final packed shipment?</p>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setFormData(prev => ({ ...prev, pickupType: 'self' }))}
                                        className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all ${formData.pickupType === 'self' ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-100 opacity-60 hover:opacity-100"}`}
                                    >
                                        <div className="text-3xl mb-2">📍</div>
                                        <p className="font-black text-gray-900 text-sm">Drop to Hub</p>
                                        <p className="text-[9px] text-gray-500 mt-1 mb-2 leading-tight">Drop your package to our warehouse.</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest"></p>
                                        <a href="https://maps.app.goo.gl/YourHubLocationLink" target="_blank" rel="noopener noreferrer" className="block text-[8px] mt-1 underline text-orange-600" onClick={(e) => e.stopPropagation()}>View Map</a>
                                    </div>
                                    <div
                                        onClick={() => setFormData(prev => ({ ...prev, pickupType: 'delivered' }))}
                                        className={`p-5 rounded-2xl border-2 text-center cursor-pointer transition-all ${formData.pickupType === 'delivered' ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-100 opacity-60 hover:opacity-100"}`}
                                    >
                                        <div className="text-3xl mb-2">🏠</div>
                                        <p className="font-black text-gray-900 text-sm">Home Pickup</p>
                                        <p className="text-[9px] text-gray-500 mt-1 mb-2 leading-tight">We'll pick up your packed shipment from your room.</p>
                                        <div className="flex flex-col items-center">
                                            <p className="text-[10px] text-gray-400 line-through font-bold uppercase tracking-widest">₹29 fee</p>
                                            <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Free (Limited Time)</p>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {formData.pickupType && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden bg-gray-50 p-4 rounded-xl border border-gray-200"
                                        >
                                            <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">
                                                {formData.pickupType === 'self' ? "When will you drop your parcel at our Hub?" : "When should we collect your parcel?"}
                                            </p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Input
                                                    name="pickupDate"
                                                    type="date"
                                                    min={formData.packagingType === 'preferred' && formData.packagingDate ? formData.packagingDate : today}
                                                    max={formData.packagingType === 'preferred' && formData.packagingDate ? addDays(formData.packagingDate, 7) : addDays(today, 14)}
                                                    value={formData.pickupDate}
                                                    onChange={handleChange}
                                                    className="h-10 border-2 rounded-lg font-bold text-xs"
                                                />
                                                <select
                                                    name="pickupSlot"
                                                    value={formData.pickupSlot}
                                                    onChange={handleChange}
                                                    className="w-full h-10 rounded-lg border-2 border-gray-200 px-3 bg-white text-xs font-bold"
                                                >
                                                    <option value="">Slot</option>
                                                    <option value="9 AM - 12 PM">9 AM – 12 PM</option>
                                                    <option value="12 PM - 3 PM">12 PM – 3 PM</option>
                                                    <option value="3 PM - 6 PM">3 PM – 6 PM</option>
                                                </select>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Button
                                    onClick={() => {
                                        setShowPickupPopup(false)
                                        setStep(2)
                                    }}
                                    disabled={!formData.pickupType || !formData.pickupDate || !formData.pickupSlot}
                                    className="w-full bg-gradient-premium h-14 text-lg font-black rounded-2xl shadow-lg shadow-orange-500/20"
                                >
                                    Proceed to Details <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════ MODAL 3: OTHER ITEMS SELECTION ═══════ */}
            <AnimatePresence>
                {showOtherItemsPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowOtherItemsPopup(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
                        >
                            <div className="bg-gradient-premium p-6 text-center text-white relative">
                                <button 
                                    onClick={() => setShowOtherItemsPopup(false)}
                                    className="absolute right-6 top-6 text-white/60 hover:text-white"
                                >
                                    <XCircle className="w-6 h-6" />
                                </button>
                                <Sparkles className="w-10 h-10 mx-auto mb-3" />
                                <h3 className="text-2xl font-black">Special Items </h3>
                                <p className="text-orange-100 text-xs mt-1">Select any additional electronics or furniture items</p>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {OTHER_ITEMS_TYPES.map((item) => (
                                        <Card
                                            key={item.id}
                                            className={`border-none shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden ${
                                                otherItems[item.id] > 0 ? "ring-2 ring-purple-500/50 bg-purple-50/20" : "bg-gray-50/50"
                                            }`}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg text-xl transition-transform group-hover:scale-110`}>
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight leading-tight">{item.name}</h4>
                                                        <p className="text-xs font-bold text-purple-600 mt-0.5">₹{item.price.toLocaleString("en-IN")}</p>
                                                        <hr className="my-1 border-gray-100" />
                                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">+ GST</p>
                                                    </div>
                                                    <div className="flex items-center bg-white rounded-xl p-1 gap-1 border border-gray-100 shadow-sm">
                                                        <button
                                                            onClick={() => updateOtherItemQuantity(item.id, -1)}
                                                            disabled={otherItems[item.id] === 0}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:text-purple-600 transition-all disabled:opacity-30"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-6 text-center font-black text-gray-900 text-xs">{otherItems[item.id]}</span>
                                                        <button
                                                            onClick={() => updateOtherItemQuantity(item.id, 1)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 hover:text-purple-600 transition-all font-black"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t items-center flex justify-between">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Selected Items</p>
                                    <p className="font-black text-gray-900">{totalOtherItemsCount} Items</p>
                                </div>
                                <Button
                                    onClick={() => setShowOtherItemsPopup(false)}
                                    className="px-8 bg-gradient-premium h-12 text-lg font-black rounded-xl shadow-lg ring-4 ring-orange-500/10"
                                >
                                    Confirm & Save
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════ EDL WARNING MODAL (Subtle Service Info) ═══════ */}
            <AnimatePresence>
                {showEdlWarning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-blue-100"
                        >
                            <div className="bg-blue-600 p-8 text-center text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <Info className="w-16 h-16 mx-auto mb-4 opacity-90" />
                                <h3 className="text-2xl font-black mb-2">Service Information</h3>
                                <p className="text-blue-50 text-sm opacity-90">Please review this update regarding your location</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl">
                                    <p className="text-blue-900 font-bold leading-relaxed">
                                        "We can't deliver directly to this, but we have an alternative and maybe the offer is not applicable for you."
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => {
                                            setShowEdlWarning(false)
                                            setStep(1)
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-black shadow-lg shadow-blue-200 rounded-2xl transition-all active:scale-95"
                                    >
                                        Continue Anyway
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowEdlWarning(false)
                                            setFormData(prev => ({ ...prev, destPincode: "" }))
                                            setPincodeStatus(null)
                                        }}
                                        className="w-full h-12 text-gray-400 font-bold border-2 border-gray-100 hover:border-blue-200 hover:text-blue-600 rounded-2xl transition-all"
                                    >
                                        Try with another pincode
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════ PROHIBITED ITEMS WARNING MODAL ═══════ */}
            <AnimatePresence>
                {showProhibitedWarning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-red-100"
                        >
                            <div className="bg-red-600 p-8 text-center text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <AlertTriangle className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-2xl font-black mb-2">Prohibited Items!</h3>
                                <p className="text-red-50 text-sm opacity-90 uppercase tracking-widest font-black">Strict Regulation Policy</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-2xl">
                                    <h4 className="text-red-900 font-black text-sm uppercase mb-2">Do not include:</h4>
                                    <ul className="text-red-900/80 font-bold space-y-2 list-disc ml-5">
                                        <li>Medicines of any kind</li>
                                        <li>Alcoholic items / Beverages</li>
                                        <li>Hazardous or Flammable things</li>
                                        <li>Explosives / Chemicals</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-xl">
                                    <p className="text-gray-600 text-xs font-bold leading-relaxed">
                                        ⚠️ <span className="text-red-600 font-black">Warning:</span> Strict inspection will be done. Legal action may be taken by authorities if such items are found during scanning.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => {
                                        setShowProhibitedWarning(false)
                                        setEdlStep(1)
                                    }}
                                    className="w-full bg-red-600 hover:bg-red-700 h-14 text-lg font-black shadow-lg shadow-red-200 rounded-2xl transition-all active:scale-95"
                                >
                                    I Understand & Confirm
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
