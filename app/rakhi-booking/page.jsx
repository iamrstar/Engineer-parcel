"use client";

import { useState, useEffect } from "react";
import { CheckCircle, MapPin, User, ArrowRight, Package, CreditCard, Shield, Truck, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RakhiBookingPage() {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [bookingId, setBookingId] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        isCounterHandover: false,
        counterNumber: "",
        pickupAddress: "",
        pickupPincode: "",
        pickupCity: "",
        
        receiverName: "",
        receiverPhone: "",
        deliveryAddress: "",
        deliveryPincode: "",
        deliveryCity: "",
        deliveryState: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked) => {
        setFormData(prev => ({ ...prev, isCounterHandover: checked }));
    };

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
        return () => document.body.removeChild(script)
    }, [])

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // 1. Create order for exactly 70 INR
            const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 7000, // 70 INR in paise
                    currency: "INR",
                }),
            });
            const order = await orderRes.json();

            // 2. Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Engineers Parcel",
                description: `Rakhi Special Delivery`,
                order_id: order.id,
                handler: async (response) => {
                    setIsProcessing(true);
                    try {
                        const bookingData = {
                            serviceType: "rakhi-parcel",
                            senderDetails: {
                                name: formData.name,
                                phone: formData.phone,
                                email: formData.email,
                                address: formData.isCounterHandover ? `Counter Dropoff: ${formData.counterNumber}` : formData.pickupAddress,
                                pincode: formData.pickupPincode || "Counter Dropoff",
                                city: formData.pickupCity || "Dhanbad",
                            },
                            receiverDetails: {
                                name: formData.receiverName,
                                phone: formData.receiverPhone,
                                address: formData.deliveryAddress,
                                pincode: formData.deliveryPincode,
                                city: formData.deliveryCity,
                                state: formData.deliveryState,
                            },
                            bookingSummary: {
                                items: [{ type: "Rakhi Courier", quantity: 1, name: "Rakhi Envelope" }],
                                totalWeight: 0.5,
                            },
                            pricingSummary: {
                                basePrice: 70,
                                discount: 0,
                                totalAmount: 70,
                            }
                        };

                        const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingData: bookingData
                            }),
                        });
                        
                        const verifyData = await verifyRes.json();
                        if (verifyData.success || verifyData.booking) {
                            if (verifyData.booking && verifyData.booking.bookingId) {
                                setBookingId(verifyData.booking.bookingId);
                                setStep(3); // Success step
                            } else {
                                toast.error("Payment successful but booking not created. Don't worry, your money is safe and a refund will be issued.");
                            }
                        } else {
                            toast.error("Payment verification failed.");
                        }
                    } catch (err) {
                        toast.error("Error processing your payment.");
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: { color: "#ea580c" },
                modal: { ondismiss: () => setIsProcessing(false) },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            toast.error("Failed to initiate payment.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50/30 pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                        <Package className="w-4 h-4" /> Rakhi Special Delivery
                    </div>
                    <h1 className="text-4xl font-black text-gray-900">Send Rakhi Anywhere</h1>
                    <p className="text-gray-500">Flat ₹70 Delivery Across India</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: Sender Details */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
                                <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
                                    <User className="w-6 h-6 text-red-600" />
                                    <h2 className="font-bold text-red-900 text-lg">Sender Details</h2>
                                </div>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name *</Label>
                                            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone Number *</Label>
                                            <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit number" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Email *</Label>
                                            <Input name="email" value={formData.email} onChange={handleInputChange} placeholder="For receipt" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-2 bg-orange-50 p-4 rounded-xl border border-orange-100">
                                            <Checkbox 
                                                id="counterHandover" 
                                                checked={formData.isCounterHandover} 
                                                onCheckedChange={handleCheckboxChange} 
                                                className="border-orange-500 data-[state=checked]:bg-orange-500"
                                            />
                                            <Label htmlFor="counterHandover" className="text-orange-900 font-semibold cursor-pointer">
                                                I will handover to Center Counter
                                            </Label>
                                        </div>
                                    </div>

                                    {formData.isCounterHandover ? (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                            <Label>Counter Number *</Label>
                                            <Input name="counterNumber" value={formData.counterNumber} onChange={handleInputChange} placeholder="e.g. Counter 3" />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                            <div className="space-y-2 md:col-span-2">
                                                <Label>Pickup Address *</Label>
                                                <Input name="pickupAddress" value={formData.pickupAddress} onChange={handleInputChange} placeholder="Hostel/Room/Street" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Pincode *</Label>
                                                <Input name="pickupPincode" value={formData.pickupPincode} onChange={handleInputChange} placeholder="e.g. 826004" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>City *</Label>
                                                <Input name="pickupCity" value={formData.pickupCity} onChange={handleInputChange} placeholder="e.g. Dhanbad" />
                                            </div>
                                        </div>
                                    )}

                                    <Button 
                                        className="w-full h-12 bg-gray-900 text-white rounded-xl text-lg font-bold mt-6"
                                        onClick={() => setStep(2)}
                                        disabled={!formData.name || !formData.phone || (formData.isCounterHandover ? !formData.counterNumber : !formData.pickupAddress)}
                                    >
                                        Next: Receiver Details <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* STEP 2: Receiver Details & Pay */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
                                <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-red-600" />
                                    <h2 className="font-bold text-red-900 text-lg">Receiver Details</h2>
                                </div>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Receiver's Name *</Label>
                                            <Input name="receiverName" value={formData.receiverName} onChange={handleInputChange} placeholder="Brother's Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Receiver's Phone *</Label>
                                            <Input name="receiverPhone" value={formData.receiverPhone} onChange={handleInputChange} placeholder="10-digit number" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Delivery Address *</Label>
                                            <Input name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} placeholder="House, Street, Area" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Pincode *</Label>
                                            <Input name="deliveryPincode" value={formData.deliveryPincode} onChange={handleInputChange} placeholder="Destination Pincode" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>City *</Label>
                                            <Input name="deliveryCity" value={formData.deliveryCity} onChange={handleInputChange} placeholder="Destination City" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>State *</Label>
                                            <Input name="deliveryState" value={formData.deliveryState} onChange={handleInputChange} placeholder="e.g. Maharashtra" />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                                        <Button variant="outline" onClick={() => setStep(1)} className="h-14 px-6 rounded-xl">
                                            Back
                                        </Button>
                                        <Button 
                                            className="flex-1 h-14 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl text-lg font-black shadow-lg hover:scale-[1.02] transition-transform"
                                            onClick={handlePayment}
                                            disabled={!formData.receiverName || !formData.receiverPhone || !formData.deliveryAddress || isProcessing}
                                        >
                                            {isProcessing ? "Processing..." : "Pay and Send Rakhi"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* STEP 3: Success */}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <Card className="border-0 shadow-xl overflow-hidden rounded-2xl text-center py-12 px-6">
                                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">Rakhi Booking Confirmed! 🎉</h2>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    Your Rakhi is on its way! We'll make sure it reaches your brother safely and on time.
                                </p>
                                
                                <div className="bg-orange-50 p-6 rounded-2xl max-w-sm mx-auto mb-8 border border-orange-100">
                                    <p className="text-sm text-orange-800 mb-1">Tracking ID</p>
                                    <p className="text-2xl font-black text-orange-600">{bookingId}</p>
                                </div>

                                <Link href="/">
                                    <Button className="h-12 px-8 bg-gray-900 text-white rounded-xl font-bold">
                                        Back to Home
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
