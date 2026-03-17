"use client";

import { useState, useEffect } from "react";
import {
  CalendarIcon,
  CheckCircle,
  Package,
  MapPin,
  User,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Truck,
  Info,
  Smartphone,
  Mail,
  Box,
  BadgePercent,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const steps = [
  { id: 1, title: "Service", description: "Select shipping type", icon: Truck },
  { id: 2, title: "Waypoints", description: "Pickup & Delivery", icon: MapPin },
  { id: 3, title: "Details", description: "Parcel & Contact", icon: User },
  { id: 4, title: "Checkout", description: "Review & Payment", icon: CreditCard },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceDetails, setPriceDetails] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [manualCoupon, setManualCoupon] = useState("");
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: "courier",
    pickupPincode: "",
    pickupAddress: "",
    pickupLandmark: "",
    deliveryPincode: "",
    deliveryAddress: "",
    deliveryLandmark: "",
    pickupTime: "morning",
    weight: "1",
    weightUnit: "kg",
    length: "",
    width: "",
    height: "",
    parcelContents: "",
    specialInstructions: "",
    name: "",
    email: "",
    phone: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    fragile: false,
    value: "",
    insuranceRequired: false
  });

  // Fetch coupons
  useEffect(() => {
    if (showCoupons) {
      const fetchCoupons = async () => {
        setLoadingCoupons(true);
        try {
          const res = await axios.get(`${API_BASE_URL}/api/coupons`);
          setCoupons(res.data);
        } catch (err) {
          console.error("Coupon fetch error:", err);
        } finally {
          setLoadingCoupons(false);
        }
      };
      fetchCoupons();
    }
  }, [showCoupons]);

  // Price Calculation
  useEffect(() => {
    if (formData.weight && formData.serviceType) {
      const calculatePrice = async () => {
        try {
          const res = await axios.post(`${API_BASE_URL}/api/calculate-price`, {
            serviceType: formData.serviceType,
            weight: parseFloat(formData.weight),
            weightUnit: formData.weightUnit,
            length: parseFloat(formData.length) || 0,
            width: parseFloat(formData.width) || 0,
            height: parseFloat(formData.height) || 0,
            fragile: formData.fragile,
            value: parseFloat(formData.value) || 0,
          });
          if (res.data.success) {
            setPriceDetails(res.data.data);
          }
        } catch (err) {
          console.error("Price fetch error:", err);
        }
      };
      const timeoutId = setTimeout(calculatePrice, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formData.weight, formData.weightUnit, formData.serviceType, formData.length, formData.width, formData.height, formData.fragile, formData.value]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const applyCoupon = async (code) => {
    if (!priceDetails) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/coupons/validate`, {
        code,
        orderTotal: priceDetails.totalAmount,
      });
      setAppliedCoupon(res.data.coupon || { code });
      setDiscountAmount(res.data.discount);
      toast.success("Coupon applied successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid coupon.");
    }
  };

  const makePayload = (paymentMethod) => {
    return {
      pickupPincode: formData.pickupPincode,
      deliveryPincode: formData.deliveryPincode,
      senderDetails: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.pickupAddress,
        pincode: formData.pickupPincode,
        landmark: formData.pickupLandmark
      },
      receiverDetails: {
        name: formData.receiverName,
        phone: formData.receiverPhone,
        email: formData.receiverEmail,
        address: formData.deliveryAddress,
        pincode: formData.deliveryPincode,
        landmark: formData.deliveryLandmark
      },
      serviceType: formData.serviceType,
      pickupDate: date ? date.toISOString() : new Date().toISOString(),
      pickupSlot: formData.pickupTime,
      paymentMethod,
      packageDetails: {
        weight: Number(formData.weight),
        weightUnit: formData.weightUnit,
        dimensions: {
          length: Number(formData.length) || 0,
          width: Number(formData.width) || 0,
          height: Number(formData.height) || 0,
        },
        description: formData.parcelContents,
        value: Number(formData.value) || 0,
        fragile: formData.fragile,
      },
      notes: formData.specialInstructions,
      couponCode: appliedCoupon?.code || "",
      insuranceRequired: formData.insuranceRequired
    };
  };

  const handleRazorpay = async (payload) => {
    try {
      const amountPaise = Math.round((priceDetails.totalAmount - discountAmount) * 100);
      const { data: orderData } = await axios.post(`${API_BASE_URL}/api/payments/create-order`, {
        amount: amountPaise,
        currency: "INR"
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EngineersParcel",
        description: "Booking Payment",
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(`${API_BASE_URL}/api/payments/verify-payment`, response);
            if (verifyRes.data.success) {
              const res = await axios.post(`${API_BASE_URL}/api/bookings`, { ...payload, paymentMethod: "Online" });
              if (res.data.success) {
                setBookingData(res.data.data);
                setStep(5); // Confirmed Step
                toast.success("Payment successful! Booking confirmed.");
              }
            }
          } catch (err) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#ea580c" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Error creating payment order.");
    }
  };

  const handleFinalSubmit = async (paymentMethod) => {
    setIsSubmitting(true);
    const payload = makePayload(paymentMethod);

    if (paymentMethod === "Online") {
      await handleRazorpay(payload);
    } else {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/bookings`, payload);
        if (res.data.success) {
          setBookingData(res.data.data);
          setStep(5);
          toast.success("Booking confirmed!");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Booking failed.");
      }
    }
    setIsSubmitting(false);
  };

  const StepIcon = ({ id, active, finished }) => {
    const Icon = steps.find(s => s.id === id).icon;
    return (
      <div className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 z-10",
        active ? "border-orange-600 bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]" :
          finished ? "border-green-500 bg-green-500 text-white" :
            "border-gray-200 bg-white text-gray-400"
      )}>
        {finished ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* Header */}
      <div className="bg-gradient-premium py-12 md:py-20 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-float-slow" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rotate-45 animate-float-slow" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-4"
        >
          {step === 5 ? "You're All Set!" : "Book Your Shipment"}
        </motion.h1>
        <p className="text-orange-100 max-w-xl mx-auto text-lg">
          {step === 5 ? "Your parcel is ready for its journey." : "Fast, reliable, and transparent shipping at your fingertips."}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 pb-20">
        {step < 5 && (
          <div className="mb-10 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex items-center justify-between min-w-[600px] px-8">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex relative items-center group">
                  <div className="flex flex-col items-center">
                    <StepIcon id={s.id} active={step === s.id} finished={step > s.id} />
                    <span className={cn(
                      "mt-2 text-xs font-bold uppercase tracking-wider",
                      step === s.id ? "text-orange-600" : "text-gray-400"
                    )}>
                      {s.title}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={cn(
                      "w-32 md:w-48 h-[2px] mt-[-20px] mx-[-10px]",
                      step > idx + 1 ? "bg-green-500" : "bg-gray-200"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-none overflow-hidden">
                  <div className="bg-orange-600/5 p-4 border-b border-orange-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Truck className="h-5 w-5 text-orange-600" /> Choose Service
                    </h2>
                  </div>
                  <CardContent className="p-6">
                    <RadioGroup
                      value={formData.serviceType}
                      onValueChange={(v) => handleSelectChange("serviceType", v)}
                      className="grid grid-cols-1 gap-3"
                    >
                      {[
                        { id: "courier", label: "Courier Service", desc: "Best for documents & small parcels", icon: Box },
                        { id: "local", label: "Local Parcel", desc: "Same-day delivery within city", icon: Smartphone },
                        { id: "international", label: "International", desc: "Global shipping & logistics", icon: CreditCard },
                        { id: "shifting", label: "Shifting", desc: "Home & office relocation", icon: Package },
                      ].map((s) => (
                        <div key={s.id}>
                          <RadioGroupItem value={s.id} id={s.id} className="peer sr-only" />
                          <Label
                            htmlFor={s.id}
                            className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-all hover:bg-orange-50 peer-data-[state=checked]:border-orange-600 peer-data-[state=checked]:bg-orange-50/50"
                          >
                            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                              <s.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900">{s.label}</p>
                              <p className="text-sm text-gray-500">{s.desc}</p>
                            </div>
                            {formData.serviceType === s.id && <div className="h-4 w-4 rounded-full bg-orange-600 flex items-center justify-center"><CheckCircle className="h-3 w-3 text-white" /></div>}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card className="glass border-none h-fit">
                  <div className="bg-orange-600/5 p-4 border-b border-orange-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Box className="h-5 w-5 text-orange-600" /> Package Info
                    </h2>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">Actual Weight</Label>
                        <div className="flex gap-2">
                          <Input
                            id="weight"
                            type="number"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="h-12 border-gray-100 focus:border-orange-500 focus:ring-orange-500/20"
                            placeholder="Enter Weight"
                          />
                          <Select value={formData.weightUnit} onValueChange={(v) => handleSelectChange("weightUnit", v)}>
                            <SelectTrigger className="w-24 h-12 border-gray-100">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">KG</SelectItem>
                              <SelectItem value="g">GMS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold ml-1">Dimensions (LxWxH in cm)</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Input id="length" placeholder="L" value={formData.length} onChange={handleInputChange} className="h-11 text-center" />
                          <Input id="width" placeholder="W" value={formData.width} onChange={handleInputChange} className="h-11 text-center" />
                          <Input id="height" placeholder="H" value={formData.height} onChange={handleInputChange} className="h-11 text-center" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-blue-50/50 border border-blue-100/50 rounded-xl text-xs text-blue-700">
                        <Info className="h-4 w-4" />
                        Enter approx weight. Final weight will be verified on pickup.
                      </div>
                    </div>

                    <Button
                      onClick={handleNext}
                      className="w-full h-12 bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 text-lg font-bold"
                    >
                      Continue <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="glass border-none">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-orange-600 mb-2">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center font-bold">1</div>
                        <h3 className="text-lg font-bold">Pickup Information</h3>
                      </div>

                      <div className="space-y-4 ml-10">
                        <div className="space-y-2">
                          <Label htmlFor="pickupPincode">Pincode</Label>
                          <Input id="pickupPincode" value={formData.pickupPincode} onChange={handleInputChange} placeholder="826004" className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupAddress">Street Address</Label>
                          <Textarea id="pickupAddress" value={formData.pickupAddress} onChange={handleInputChange} placeholder="Flat/House No, Floor, Building Name" rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupLandmark">Landmark (Optional)</Label>
                          <Input id="pickupLandmark" value={formData.pickupLandmark} onChange={handleInputChange} placeholder="Near City Mall" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-orange-600 mb-2">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center font-bold">2</div>
                        <h3 className="text-lg font-bold">Delivery Information</h3>
                      </div>

                      <div className="space-y-4 ml-10">
                        <div className="space-y-2">
                          <Label htmlFor="deliveryPincode">Pincode</Label>
                          <Input id="deliveryPincode" value={formData.deliveryPincode} onChange={handleInputChange} placeholder="700001" className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deliveryAddress">Street Address</Label>
                          <Textarea id="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} placeholder="Flat/House No, Floor, Building Name" rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deliveryLandmark">Landmark (Optional)</Label>
                          <Input id="deliveryLandmark" value={formData.deliveryLandmark} onChange={handleInputChange} placeholder="Opposite State Bank" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-orange-600/5 rounded-2xl border border-orange-600/10">
                    <div className="space-y-2">
                      <Label>Pickup Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full h-11 justify-start text-left font-normal border-white/50 bg-white/50 backdrop-blur-sm">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time Slot</Label>
                      <Select value={formData.pickupTime} onValueChange={(v) => handleSelectChange("pickupTime", v)}>
                        <SelectTrigger className="h-11 border-white/50 bg-white/50 backdrop-blur-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 3 PM)</SelectItem>
                          <SelectItem value="evening">Evening (3 PM - 6 PM)</SelectItem>
                          <SelectItem value="night">Night (6 PM - 9 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button variant="outline" onClick={handleBack} className="h-12 px-8">Back</Button>
                    <Button onClick={handleNext} className="h-12 flex-1 bg-orange-600 hover:bg-orange-700">Next <ChevronRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-none">
                  <div className="bg-orange-600/5 p-4 border-b border-orange-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
                      <User className="h-5 w-5 text-orange-600" /> Sender Info
                    </h2>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="h-11" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="9876543210" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-none">
                  <div className="bg-orange-600/5 p-4 border-b border-orange-100">
                    <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
                      <Box className="h-5 w-5 text-orange-600" /> Receiver Info
                    </h2>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="receiverName">Full Name</Label>
                      <Input id="receiverName" value={formData.receiverName} onChange={handleInputChange} placeholder="Jane Smith" className="h-11" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="receiverEmail">Email (Optional)</Label>
                        <Input id="receiverEmail" type="email" value={formData.receiverEmail} onChange={handleInputChange} placeholder="jane@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="receiverPhone">Phone</Label>
                        <Input id="receiverPhone" value={formData.receiverPhone} onChange={handleInputChange} placeholder="9123456780" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass border-none">
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="font-bold flex items-center gap-2"><Info className="h-4 w-4 text-orange-600" /> Additional Details</Label>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <input
                            type="checkbox"
                            id="fragile"
                            checked={formData.fragile}
                            onChange={(e) => setFormData(prev => ({ ...prev, fragile: e.target.checked }))}
                            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                          />
                          <Label htmlFor="fragile" className="text-sm cursor-pointer font-medium">Handle with care (Fragile Item)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <input
                            type="checkbox"
                            id="insuranceRequired"
                            checked={formData.insuranceRequired}
                            onChange={(e) => setFormData(prev => ({ ...prev, insuranceRequired: e.target.checked }))}
                            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                          />
                          <Label htmlFor="insuranceRequired" className="text-sm cursor-pointer font-medium">Add Shipping Insurance</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialInstructions">Special Instructions / Parcel Content</Label>
                      <Textarea id="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} placeholder="Anything else we should know?" rows={4} />
                    </div>
                  </div>

                  <div className="flex gap-4 border-t pt-6">
                    <Button variant="outline" onClick={handleBack} className="h-12 px-8">Back</Button>
                    <Button onClick={handleNext} className="h-12 flex-1 bg-orange-600 hover:bg-orange-700">Review & Payment <ChevronRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass border-none">
                  <div className="bg-orange-600/5 p-4 border-b border-orange-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight">Booking Summary</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-orange-600 hover:bg-orange-50 underline">Edit details</Button>
                  </div>
                  <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <Label className="uppercase text-[10px] tracking-widest text-gray-400 font-black">Service Type</Label>
                        <p className="text-2xl font-black capitalize text-gray-900 leading-tight">{formData.serviceType}</p>
                        <p className="text-sm text-gray-500 font-medium">Actual Weight: {formData.weight} {formData.weightUnit}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="uppercase text-[10px] tracking-widest text-gray-400 font-black">Pickup Date</Label>
                        <p className="text-2xl font-black text-gray-900 leading-tight">{date ? format(date, "MMM dd, yyyy") : "N/A"}</p>
                        <p className="text-sm text-gray-500 font-medium capitalize">{formData.pickupTime} Slot</p>
                      </div>
                    </div>

                    <div className="relative border-4 border-dashed border-gray-50 rounded-3xl p-8 bg-gray-50/30">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-2 relative">
                          <div className="absolute -left-12 top-0 bottom-0 w-8 flex flex-col items-center">
                            <div className="h-4 w-4 rounded-full bg-orange-600 ring-4 ring-orange-100" />
                            <div className="flex-1 w-1 bg-orange-200 mt-1" />
                          </div>
                          <Label className="block text-xs font-black text-orange-600 uppercase tracking-tighter">Sender</Label>
                          <p className="font-black text-lg text-gray-900">{formData.name}</p>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{formData.pickupAddress}, {formData.pickupPincode}</p>
                          <p className="text-xs text-gray-400 font-bold">{formData.phone}</p>
                        </div>
                        <div className="space-y-2 relative">
                          <div className="absolute -left-12 top-0 bottom-0 w-8 flex flex-col items-center">
                            <div className="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                            <div className="flex-1 w-1 border-2 border-dashed border-gray-200 mt-1" />
                          </div>
                          <Label className="block text-xs font-black text-blue-600 uppercase tracking-tighter">Receiver</Label>
                          <p className="font-black text-lg text-gray-900">{formData.receiverName}</p>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{formData.deliveryAddress}, {formData.deliveryPincode}</p>
                          <p className="text-xs text-gray-400 font-bold">{formData.receiverPhone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-orange border-none overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-20"><BadgePercent className="h-24 w-24" /></div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-black text-orange-950 mb-6 flex items-center gap-2">
                      <BadgePercent className="h-6 w-6" /> Exclusive Offers
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        placeholder="ENTER COUPON CODE"
                        value={manualCoupon}
                        onChange={(e) => setManualCoupon(e.target.value.toUpperCase())}
                        className="h-14 font-black tracking-widest uppercase border-orange-200 bg-white/60 focus:bg-white transition-all text-xl"
                      />
                      <Button
                        onClick={() => applyCoupon(manualCoupon)}
                        className="h-14 bg-orange-950 text-white hover:bg-black px-10 font-bold rounded-xl"
                      >
                        APPLY
                      </Button>
                    </div>
                    <button
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="mt-4 text-orange-800 font-black text-sm hover:underline flex items-center gap-1"
                    >
                      <Info className="h-4 w-4" /> OR VIEW ALL AVAILABLE OFFERS
                    </button>

                    {showCoupons && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {loadingCoupons ? (
                          <div className="col-span-2 flex justify-center p-4"><Loader2 className="animate-spin h-6 w-6 text-orange-600" /></div>
                        ) : coupons.length > 0 ? (
                          coupons.map(c => (
                            <div key={c._id} className="bg-white/80 p-4 rounded-2xl border border-orange-100 flex justify-between items-center group hover:border-orange-400 transition-all cursor-pointer" onClick={() => applyCoupon(c.code)}>
                              <div>
                                <p className="text-sm font-black text-orange-600 tracking-tighter">{c.code}</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">{c.description}</p>
                              </div>
                              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                <ChevronRight className="h-4 w-4" />
                              </div>
                            </div>
                          ))
                        ) : <p className="col-span-2 text-center text-gray-500 py-4 text-xs font-bold">NO VALID COUPONS FOUND</p>}
                      </div>
                    )}

                    {appliedCoupon && (
                      <div className="mt-6 bg-white rounded-2xl p-4 flex items-center justify-between border-2 border-green-500 animate-pulse">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <CheckCircle className="h-8 w-8" />
                          </div>
                          <div>
                            <p className="font-black text-green-900 leading-none">COUPON {appliedCoupon.code} APPLIED!</p>
                            <p className="text-xs text-green-700 font-black">SAVED ₹{discountAmount.toFixed(2)} ON THIS ORDER</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setAppliedCoupon(null); setDiscountAmount(0); }} className="text-red-500 font-black hover:bg-red-50">REMOVE</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="glass-dark border-none overflow-hidden">
                  <div className="p-8 space-y-8">
                    <h3 className="text-2xl font-black text-white text-center tracking-tight">Price Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-gray-300">
                        <span className="font-bold uppercase text-xs tracking-widest text-gray-400">Standard Rate</span>
                        <span className="text-xl font-bold">₹{priceDetails?.basePrice || 0}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span className="font-bold uppercase text-xs tracking-widest text-gray-400">GST (18%)</span>
                        <span className="text-xl font-bold">₹{priceDetails?.tax || 0}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between items-center text-green-400">
                          <span className="font-bold uppercase text-xs tracking-widest">Discount ({appliedCoupon.code})</span>
                          <span className="text-xl font-bold">-₹{discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="h-px bg-white/10 my-4" />
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <span className="block font-black uppercase text-[10px] tracking-[0.2em] text-orange-400">Total Payable</span>
                          <span className="text-5xl font-black text-white tracking-tighter">₹{((priceDetails?.totalAmount || 0) - discountAmount).toFixed(2)}</span>
                        </div>
                        <div className="text-right text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Inclusive of all taxes</div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button
                        disabled={isSubmitting}
                        onClick={() => handleFinalSubmit("Online")}
                        className="w-full h-16 bg-gradient-premium hover:shadow-[0_10px_30px_rgba(234,88,12,0.4)] transition-all text-xl font-black rounded-2xl flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : <><CreditCard className="h-6 w-6" /> PAY ONLINE</>}
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={isSubmitting}
                        onClick={() => handleFinalSubmit("COD")}
                        className="w-full h-14 text-white hover:bg-white/10 font-bold border-2 border-white/20 rounded-2xl"
                      >
                        {isSubmitting ? "PROCESSING..." : "PAY ON PICKUP (COD)"}
                      </Button>
                    </div>

                    <div className="p-4 bg-gray-900 ring-1 ring-white/5 rounded-2xl flex items-center gap-3">
                      <AlertCircle className="h-10 w-10 text-orange-500 shrink-0" />
                      <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter">
                        By proceeding, you agree to our <Link href="/terms" className="text-white underline">Service Terms</Link>. Pickup is usually scheduled within 24 business hours.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {step === 5 && bookingData && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto"
            >
              <Card className="glass border-none overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />
                <CardContent className="p-10 text-center space-y-8">
                  <div className="relative inline-block">
                    <div className="h-24 w-24 rounded-3xl bg-green-500 text-white flex items-center justify-center shadow-2xl shadow-green-500/30 transform rotate-12 relative z-10">
                      <CheckCircle className="h-14 w-14" />
                    </div>
                    <div className="absolute inset-0 h-24 w-24 rounded-3xl bg-green-200 animate-ping opacity-20" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Booking Confirmed!</h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">Reference ID: #{bookingData.bookingId}</p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200 text-left space-y-6">
                    <div>
                      <Label className="uppercase text-[10px] font-black tracking-widest text-gray-400">What happens next?</Label>
                      <ul className="mt-2 space-y-3">
                        {[
                          "Courier partner will call for pickup coordinate",
                          "Package pickup usually within 24 hours",
                          "Track using the ID above or registered phone"
                        ].map((text, idx) => (
                          <li key={idx} className="flex gap-3 items-start">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-0.5"><CheckCircle className="h-3 w-3" /></div>
                            <span className="text-sm font-bold text-gray-700 leading-tight">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Paid</span>
                        <span className="text-2xl font-black text-orange-600">₹{bookingData.pricing?.totalAmount || "0"}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild className="rounded-xl font-bold bg-gray-50 hover:bg-gray-100"><Link href="/dashboard">View in Dashboard</Link></Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild className="h-14 bg-orange-600 hover:bg-orange-700 font-bold rounded-2xl shadow-lg shadow-orange-600/20">
                      <Link href="/">Back home</Link>
                    </Button>
                    <Button variant="outline" asChild className="h-14 font-black rounded-2xl hover:bg-gray-100">
                      <Link href={`/track-order?id=${bookingData.bookingId}`}>Check Status <ChevronRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #fdba74; }
      `}</style>
    </div>
  );
}
