"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookingPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [date, setDate] = useState();
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceDetails, setPriceDetails] = useState(null);
const [showCouponPopup, setShowCouponPopup] = useState(false);
const [coupons, setCoupons] = useState([]);
const [loadingCoupons, setLoadingCoupons] = useState(false);
const [appliedCoupon, setAppliedCoupon] = useState(null);
const [discountAmount, setDiscountAmount] = useState(0);

  const [formData, setFormData] = useState({
    pickupPincode: "",
     deliveryPincode: "",
    serviceType: "",
    pickupLandmark: "",
    deliveryLandmark: "",
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    deliveryAddress: "",
    parcelWeight: "",
    parcelContents: "",
    specialInstructions: "",
    pickupTime: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
  });
useEffect(() => {
  if (showCouponPopup) {
    fetchCoupons();
  }
}, [showCouponPopup]);

const fetchCoupons = async () => {
  setLoadingCoupons(true);
  try {
    const res = await axios.get("https://api.engineersparcel.in/api/coupons");
    console.log("Coupons fetched:", res.data); // ✅ Check in console
    setCoupons(res.data);
  } catch (error) {
    console.error("Error fetching coupons:", error);
  } finally {
    setLoadingCoupons(false);
  }
};


const handleApplyCoupon = async (coupon) => {
    console.log("Apply clicked for coupon:", coupon);

  try {
    const res = await axios.post(`${API_BASE_URL}/api/coupons/validate`, {
      code: coupon.code,
      orderTotal: priceDetails.totalAmount, // correct field name
    });

    setAppliedCoupon(coupon);
    setDiscountAmount(res.data.discount);
    toast.success(`${coupon.code} applied! You saved ₹${res.data.discount}`);
    setShowCouponPopup(false);

  } catch (err) {
    toast.error(err.response?.data?.message || "Error applying coupon");
  }
};


    const [bookingData, setBookingData] = useState(null);


useEffect(() => {
  if (formData.weight && formData.serviceType) {
    const fetchPrice = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/calculate-price`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceType: formData.serviceType,
            weight: parseFloat(formData.weight),
            weightUnit: "kg",
            lengths: formData.lengths || 0,
            width: formData.width || 0,
            height: formData.height || 0,
            distance: formData.distance || 0,
            fragile: formData.fragile || false,
            value: formData.value || 0,
          }),
        });

        const data = await res.json();
        console.log("Backend response:", data);

        if (data.success) {
          setPriceDetails(data.data);
        } else {
          console.warn("Price calculation failed:", data.message);
        }
      } catch (err) {
        console.error("Error fetching price:", err);
      }
    };

    fetchPrice();
  }
}, [formData.weight, formData.serviceType]);



  
const handleInputChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const fetchPrice = async () => {
  if (!formData.parcelWeight || !formData.serviceType) return;

  const payload = {
      serviceType: formData.serviceType,
      pickupDate: date?.toISOString(),
      pickupSlot: formData.pickupTime || "afternoon",
      paymentMethod: "COD",
      packageDetails: {
  weight: parseFloat(formData.weight) || 1,             // Actual weight input from user
  weightUnit: formData.weightUnit || "kg",             // kg or g
  dimensions: {
    length: parseFloat(formData.length) || 0,
    width: parseFloat(formData.width) || 0,
    height: parseFloat(formData.height) || 0,
  },
  description: formData.parcelContents || "",
  value: parseFloat(formData.value) || 0,
  fragile: formData.fragile || false,
},
      notes: formData.specialInstructions || "", // ya formData.paymentMethod agar dynamic
  };

  try {
      const res = await fetch(`${API_BASE_URL}/api/calculate-price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Price API Response:", data);
    if (data.success) {
      setPriceDetails(data.data);
    } else {
      setPriceDetails(null);
    }
  } catch (err) {
    console.error("Price fetch error:", err);
    setPriceDetails(null);
  }
};

  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value) => {
    setFormData({ ...formData, serviceType: value });
    setStep(1);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };


  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
console.log("FormData:", formData);

  const handleSubmit = async (paymentMethod, e) => {
  if (e && e.preventDefault) e.preventDefault();

  // 🚨 Weight limit check
  if (Number(formData.weight) > 30) {
    alert("You can book parcels up to 30 kg only at once!");
    return;
  }

  setIsSubmitting(true);

  try {
    // ✅ Payload exactly matching backend Booking model
    const payload = {
      pickupPincode:
        formData.pickupPincode ||
        formData.pickupAddress?.match(/\b\d{6}\b/)?.[0] ||
        "826004",
      deliveryPincode:
        formData.deliveryPincode ||
        formData.deliveryAddress?.match(/\b\d{6}\b/)?.[0] ||
        "700001",

      senderDetails: {
        name: formData.senderName || formData.name || "",
        phone: formData.senderPhone || formData.phone || "",
        email: formData.senderEmail || formData.email || "",
        address: formData.senderAddress || formData.pickupAddress || "",
        pincode: formData.pickupPincode || "",
        city: formData.senderCity || "",
        state: formData.senderState || "",
        landmark: formData.senderLandmark || formData.pickupLandmark || "",
      },

      receiverDetails: {
        name: formData.receiverName || "",
        phone: formData.receiverPhone || "",
        email: formData.receiverEmail || "",
        address: formData.receiverAddress || formData.deliveryAddress || "",
        pincode: formData.deliveryPincode || "",
        city: formData.receiverCity || "",
        state: formData.receiverState || "",
        landmark:
          formData.receiverLandmark || formData.deliveryLandmark || "",
      },

      serviceType: formData.serviceType || "surface",
      pickupDate: formData.pickupDate || new Date().toISOString(),
      pickupSlot: formData.pickupSlot || "morning",
      paymentMethod, // "COD" ya "Online"

      packageDetails: {
        weight: Number(formData.weight) || 1,
        weightUnit: formData.weightUnit || "kg",
        dimensions: {
          length: Number(formData.length) || 10,
          width: Number(formData.width) || 10,
          height: Number(formData.height) || 10,
        },
        description: formData.description || formData.parcelContents || "Parcel",
        value: Number(formData.value) || 100,
        fragile: Boolean(formData.fragile) || false,
      },

      notes: formData.notes || formData.specialInstructions || "",
      couponCode: formData.couponCode || "",
      insuranceRequired: Boolean(formData.insuranceRequired) || false,
    };

    console.log("📦 Sending booking data:", payload);
    if (paymentMethod === "COD") {
  const res = await axios.post(`${API_BASE_URL}/api/bookings`, payload);
  console.log("✅ Booking response:", res.data);
  
  setBookingData(res.data.data); // <-- yahi fix hai
  setStep(4);
  setFormData({}); // safe, kyunki step 4 bookingData use karega
}

 else if (paymentMethod === "Online") {
      // 🟢 Razorpay flow (keep loading until done)
      await handleRazorpayPayment(payload);
    }
  } catch (error) {
    console.error("❌ Booking failed:", error.response?.data || error.message);
    alert(`Booking failed! ${error.response?.data?.message || error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};




useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 🟠 Handle Razorpay Online Payment
  const handleRazorpayPayment = async () => {
  try {
    if (!priceDetails?.totalAmount) {
      alert("Price not calculated yet!");
      return;
    }

    // Use final total after discount
    const finalAmount = priceDetails.totalAmount - discountAmount;
    const amountInPaise = finalAmount * 100;

    // 1️⃣ Create order from backend
    const { data } = await axios.post(`${API_BASE_URL}/api/payments/create-order`, {
      amount: amountInPaise,
      currency: "INR",
    });

    // 2️⃣ Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "EngineersParcel",
      description: "Parcel Booking Payment",
      order_id: data.id,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(`${API_BASE_URL}/api/payments/verify-payment`, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            // ✅ Call handleSubmit for online payment
            await handleSubmit("Online"); 
          } else {
            alert("⚠️ Payment verification failed!");
          }
        } catch (error) {
          console.error("Booking creation after payment failed:", error);
          alert("❌ Booking creation failed after payment.");
        }
      },
      prefill: {
        name: formData.name || "Customer",
        email: formData.email || "test@example.com",
        contact: formData.phone || "9999999999",
      },
      theme: { color: "#f97316" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment Error:", err);
    alert("❌ Payment Failed");
  }
};



  // 🟢 COD or Online submit handler
  const handleStep3Submit = async () => {
    setIsSubmitting(true);
    if (formData.paymentMethod === "Online") {
      await handleRazorpayPayment();
    } else {
      // COD logic (your existing booking submission)
      alert("COD Booking Confirmed ✅");
      setStep(4);
    }
    setIsSubmitting(false);
  };




  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Book a Pickup</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Schedule a pickup for your parcel or request our shifting and moving
            services
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className={cn("flex flex-col items-center", step >= 0 ? "text-orange-600" : "text-gray-400")}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border-2",
                  step >= 0 ? "border-orange-600 bg-orange-50" : "border-gray-300"
                )}>
                  1
                </div>
                <span className="text-sm mt-1">Service Details</span>
              </div>

              

              <div className={cn("flex-1 h-1 mx-4", step >= 1 ? "bg-orange-600" : "bg-gray-300")}></div>

              {/* Step 2 */}
              <div className={cn("flex flex-col items-center", step >= 1 ? "text-orange-600" : "text-gray-400")}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border-2",
                  step >= 1 ? "border-orange-600 bg-orange-50" : "border-gray-300"
                )}>
                  2
                </div>
                <span className="text-sm mt-1">Pickup and Delivery Details</span>
              </div>

              <div className={cn("flex-1 h-1 mx-4", step >= 2 ? "bg-orange-600" : "bg-gray-300")}></div>

             {/* Step 3 */}

               <div className={cn("flex flex-col items-center", step >= 2 ? "text-orange-600" : "text-gray-400")}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border-2",
                  step >= 2 ? "border-orange-600 bg-orange-50" : "border-gray-300"
                )}>
                  3
                </div>
                <span className="text-sm mt-1">Contact information</span>
              </div>



              {/* Step 4 */}
              <div className={cn("flex flex-col items-center", step >= 3 ? "text-orange-600" : "text-gray-400")}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border-2",
                  step >= 3 ? "border-orange-600 bg-orange-50" : "border-gray-300"
                )}>
                  4
                </div>
                <span className="text-sm mt-1">Checkout</span>
              </div>
            </div>
          </div>


          <Card>
            <CardContent className="pt-6">
                {step === 0 && (
                  <div>
                    <Label className="text-base font-semibold">
                      Select Service Type
                    </Label>
                    <RadioGroup
                      value={formData.serviceType} // controlled value
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
                      onValueChange={(value) => {
                        setFormData({ ...formData, serviceType: value }); // update form data
                        setStep(1); // go to step 1 automatically
                      }}
                    >
                      <div>
                        <RadioGroupItem
                          value="courier"
                          id="courier"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="courier"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-600 [&:has([data-state=checked])]:border-orange-600"
                        >
                          <div className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6"
                            >
                              <path d="M5 7.5V7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
                              <rect
                                width="8"
                                height="8"
                                x="2"
                                y="14"
                                rx="2"
                              />
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="font-semibold">
                              Courier Service
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Document & parcel delivery
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="shifting"
                          id="shifting"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="shifting"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-600 [&:has([data-state=checked])]:border-orange-600"
                        >
                          <div className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6"
                            >
                              <path d="M3 8h18M9 8v8m6-8v8" />
                              <rect
                                width="18"
                                height="12"
                                x="3"
                                y="4"
                                rx="2"
                              />
                              <path d="M3 20h18" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="font-semibold">
                              Shifting & Moving
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Home & office relocation
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="local"
                          id="local"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="local"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-600 [&:has([data-state=checked])]:border-orange-600"
                        >
                          <div className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6"
                            >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="font-semibold">
                              Local Parcel
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Same-day local delivery
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="international"
                          id="international"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="international"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-600 [&:has([data-state=checked])]:border-orange-600"
                        >
                          <div className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-6 w-6"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                              <path d="M2 12h20" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <span className="font-semibold">
                              International
                            </span>
                            <p className="text-sm text-muted-foreground">
                              Worldwide shipping
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                  </div>

                )}
              {step === 1 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleNext();
    }}
  >
    <div className="space-y-6">
      {/* =================== PICKUP DETAILS =================== */}
      <div className="space-y-4 p-4 border border-gray-200 rounded-2xl bg-white/5 shadow-sm">
        <h3 className="text-lg font-semibold text-orange-500">🚚 Pickup Details</h3>

        <div className="space-y-3">
          <div>
            <Label htmlFor="pickupPincode">Pickup Pincode</Label>
            <Input
              type="text"
              id="pickupPincode"
              name="pickupPincode"
              value={formData.pickupPincode}
              onChange={handleChange}
              placeholder="Enter pickup pincode"
              required
            />
          </div>

          <div>
            <Label htmlFor="pickupAddress">Pickup Address</Label>
            <Textarea
              id="pickupAddress"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              placeholder="Enter complete pickup address"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="pickupLandmark">Pickup Landmark</Label>
            <Input
              type="text"
              id="pickupLandmark"
              name="pickupLandmark"
              value={formData.pickupLandmark}
              onChange={handleChange}
              placeholder="Enter nearby landmark"
            />
          </div>
        </div>
      </div>

      {/* =================== DELIVERY DETAILS =================== */}
      <div className="space-y-4 p-4 border border-gray-200 rounded-2xl bg-white/5 shadow-sm">
        <h3 className="text-lg font-semibold text-orange-500">📦 Delivery Details</h3>

        <div className="space-y-3">
          <div>
            <Label htmlFor="deliveryPincode">Delivery Pincode</Label>
            <Input
              type="text"
              id="deliveryPincode"
              name="deliveryPincode"
              value={formData.deliveryPincode}
              onChange={handleChange}
              placeholder="Enter delivery pincode"
              required
            />
          </div>

          <div>
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Textarea
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="Enter complete delivery address"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="deliveryLandmark">Delivery Landmark</Label>
            <Input
              type="text"
              id="deliveryLandmark"
              name="deliveryLandmark"
              value={formData.deliveryLandmark}
              onChange={handleChange}
              placeholder="Enter nearby landmark"
            />
          </div>
        </div>
      </div>

      {/* =================== PICKUP DATE & TIME =================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="pickupTime">Preferred Pickup Time</Label>
          <Select onValueChange={(value) => handleSelectChange("pickupTime", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
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

      {/* =================== PARCEL DETAILS =================== */}
      {(formData.serviceType === "courier" ||
        formData.serviceType === "local" ||
        formData.serviceType === "international") && (
        <div className="p-4 border border-gray-200 rounded-2xl bg-white/5 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-orange-500">📏 Parcel Details</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
  <Label htmlFor="weight">Actual Weight</Label>
  <div className="flex items-center gap-3">
    <Input
      type="number"
      id="weight"
      placeholder="Enter weight (max. 30kgs)"
      value={formData.weight || ""}
      onChange={(e) => {
        let value = parseFloat(e.target.value);
        if (value > 30) {
          value = 30; // Max limit 30
          alert("You can book maximum 30 kg parcel at once!");
        }
        handleInputChange("weight", value);
      }}
      min="0"
      max="30"
      step="0.01"
    />
    <Select
      value={formData.weightUnit || "kg"}
      onValueChange={(v) => handleSelectChange("weightUnit", v)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kg">kg</SelectItem>
        <SelectItem value="g">grams</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <p className="text-xs text-gray-400">
    Tip: 1000g = 1kg — For small parcels, choose grams.
  </p>
</div>



            <div className="space-y-2">
              <Label>Dimensions (in cm)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Length"
                  value={formData.length || ""}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Width"
                  value={formData.width || ""}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Height"
                  value={formData.height || ""}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  min="0"
                />
              </div>
              <p className="text-xs text-gray-400">
             ( LEAVE BLANK IF NOT APPLICABLE)              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="parcelContents">Parcel Contents</Label>
            <Input
              id="parcelContents"
              name="parcelContents"
              value={formData.parcelContents}
              onChange={handleChange}
              placeholder="Brief description of contents"
            />
          </div>
        </div>
      )}

      {/* =================== SPECIAL INSTRUCTIONS =================== */}
      <div>
        <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
        <Textarea
          id="specialInstructions"
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          placeholder="Any special handling instructions or requirements"
          rows={3}
        />
      </div>

      {/* =================== NEXT BUTTON =================== */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
          Next Step
        </Button>
      </div>
    </div>
  </form>
)}


              {step === 2 && (
  <div className="space-y-6">
    <div>
      <Label htmlFor="name">Full Name</Label>
      <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your full name"
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          required
        />
      </div>
    </div>

    {/* Receiver Section */}
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Receiver Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="receiverName">Receiver Name</Label>
          <Input
            id="receiverName"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            placeholder="Receiver's full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="receiverEmail">Receiver Email</Label>
          <Input
            id="receiverEmail"
            name="receiverEmail"
            value={formData.receiverEmail}
            onChange={handleChange}
            placeholder="Receiver's email"
          />
        </div>
        <div>
          <Label htmlFor="receiverPhone">Receiver Phone</Label>
          <Input
            id="receiverPhone"
            name="receiverPhone"
            value={formData.receiverPhone}
            onChange={handleChange}
            placeholder="Receiver's phone"
            required
          />
        </div>
      </div>
    </div>

    <div className="flex justify-between">
      <Button type="button" variant="outline" onClick={handleBack}>
        Back
      </Button>
      <Button
        type="button"
        className="bg-orange-600 hover:bg-orange-700"
        onClick={handleNext}
      >
        Proceed to Checkout
      </Button>
    </div>
  </div>
)}



{step === 3 && (


  <div className="space-y-6 max-w-md mx-auto px-4">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
      Review Your Booking
    </h2>

    <div className="space-y-4">

                    {/* Service & Pickup */}
                    <div className="bg-orange-50/20 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-orange-100">
                      <h3 className="text-md md:text-lg font-semibold text-orange-600 border-b border-orange-200 pb-2 mb-2">
                        Service & Pickup
                      </h3>
                      <div className="flex justify-between text-gray-700 mb-1">
                        <span>Service Type:</span>
                        <span className="font-medium capitalize">{formData.serviceType}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1 break-words">
                        <span>Pickup Address:</span>
                        <span className="font-medium max-w-full">{formData.pickupAddress}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Landmark:</span>
                        <span className="font-medium">{formData.pickupLandmark || "-"}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Pincode:</span>
                        <span className="font-medium">{formData.pickupPincode}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Date:</span>
                        <span className="font-medium">{date ? format(date, "PPP") : "Not selected"}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700">
                        <span>Time Slot:</span>
                        <span className="font-medium">{formData.pickupTime || "Not selected"}</span>
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
                      <h3 className="text-md md:text-lg font-semibold text-orange-600 border-b border-orange-200 pb-2 mb-2">
                        Delivery Details
                      </h3>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1 break-words">
                        <span>Address:</span>
                        <span className="font-medium max-w-full">{formData.deliveryAddress}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Landmark:</span>
                        <span className="font-medium">{formData.deliveryLandmark || "-"}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700">
                        <span>Pincode:</span>
                        <span className="font-medium">{formData.deliveryPincode}</span>
                      </div>
                    </div>

                    {/* Sender */}
                    <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200">
                      <h3 className="text-md md:text-lg font-semibold text-orange-600 border-b border-orange-200 pb-2 mb-2">
                        Sender Details
                      </h3>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Email:</span>
                        <span className="font-medium">{formData.email || "-"}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700">
                        <span>Phone:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                    </div>

                    {/* Receiver */}
                    <div className="bg-orange-50/20 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-orange-100">
                      <h3 className="text-md md:text-lg font-semibold text-orange-600 border-b border-orange-200 pb-2 mb-2">
                        Receiver Details
                      </h3>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Name:</span>
                        <span className="font-medium">{formData.receiverName}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
                        <span>Email:</span>
                        <span className="font-medium">{formData.receiverEmail || "-"}</span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between text-gray-700">
                        <span>Phone:</span>
                        <span className="font-medium">{formData.receiverPhone}</span>
                      </div>
                    </div>

                    {/* Parcel */}
                    <div className="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
  <h3 className="text-md md:text-lg font-semibold text-orange-600 border-b border-orange-200 pb-2 mb-2">
    Parcel Details
  </h3>
  <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1">
    <span>Weight:</span>
    <span className="font-medium">{formData.weight} {formData.packageDetails?.weightUnit || "kg"}</span>
  </div>
  <div className="flex flex-col md:flex-row justify-between text-gray-700 mb-1 break-words">
    <span>Contents:</span>
    <span className="font-medium max-w-full">{formData.parcelContents || "-"}</span>
  </div>
  <div className="flex flex-col md:flex-row justify-between text-gray-700">
    <span>Special Instructions:</span>
    <span className="font-medium max-w-full">{formData.specialInstructions || "-"}</span>
  </div>
  <div className="flex flex-col md:flex-row justify-between text-gray-700 mt-1">
    <span>Dimensions:</span>
    <span className="font-medium max-w-full">
      {formData.packageDetails?.dimensions
        ? `${formData.packageDetails.dimensions.length} x ${formData.packageDetails.dimensions.width} x ${formData.packageDetails.dimensions.height} cm`
        : "-"}
    </span>
  </div>
</div>


                    {/* Pricing */}
                    {priceDetails ? (
  <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
    {/* Section Title */}
    <h3 className="text-md md:text-lg font-semibold text-green-600 border-b border-green-200 pb-2 mb-2">
      Pricing
    </h3>

    {/* Base Price, Tax, Total Amount */}
    <ul className="space-y-1">
      <li className="flex justify-between">
        <span>Base Price:</span>
        <span className="font-medium">₹{priceDetails.basePrice}</span>
      </li>
      <li className="flex justify-between">
        <span>Tax (18% GST):</span>
        <span className="font-medium">₹{priceDetails.tax}</span>
      </li>
      {/* <li className="flex justify-between text-orange-600 font-semibold">
        <span>Total Amount:</span>
        <span className="font-medium">
          ₹{(priceDetails.totalAmount - discountAmount).toFixed(2)}
        </span>
      </li> */}
    </ul>

    {/* Subtotal, Discount, Final Total */}
    <div className="mt-3 text-right">
      <p className="text-sm text-gray-600">Subtotal: ₹{priceDetails.totalAmount}</p>
      {discountAmount > 0 && (
        <p className="text-sm text-green-600">
          Discount: -₹{discountAmount.toFixed(2)}
        </p>
      )}
      <p className="text-lg font-semibold  text-orange-600 mt-1">
        Final Total: ₹{(priceDetails.totalAmount - discountAmount).toFixed(2)}
      </p>
    </div>
  </div>
) : (
  <p className="text-gray-500 text-center mt-2">Calculating price...</p>
)}



                  </div>
{/* Apply Coupon Section */}
<div className="mt-4">
  {/* Button to toggle coupon list */}
  <Button
    variant="outline"
    className="w-full bg-white text-orange-600 border-orange-400 hover:bg-orange-50"
    onClick={() => setShowCouponPopup((prev) => !prev)}
  >
    {showCouponPopup ? "Hide Coupons" : "Apply Coupon"}
  </Button>

  {/* Show available coupons inline */}
  {showCouponPopup && (
    <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-orange-700 mb-3 text-center">
        Available Coupons
      </h2>

      {loadingCoupons ? (
        <p className="text-center text-gray-500">Loading coupons...</p>
      ) : coupons.length > 0 ? (
        coupons.map((coupon) => (
          <Card key={coupon._id} className="mb-3 border border-gray-200">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-orange-600">{coupon.code}</p>
                  <p className="text-sm text-gray-700">{coupon.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Valid till:{" "}
                    {new Date(coupon.validUntil).toLocaleDateString()}
                  </p>
                </div>
               <Button
  size="sm"
  className="bg-orange-600 hover:bg-orange-700 text-white"
  onClick={() => handleApplyCoupon(coupon)}
>
  {appliedCoupon?._id === coupon._id ? "Applied" : "Apply"}
</Button>

              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No coupons available</p>
      )}
    </div>
  )}

  {/* Applied Coupon Display */}
  {appliedCoupon && (
    <div className="bg-green-50 border border-green-200 p-3 rounded-xl mt-3 flex justify-between items-center">
      <div>
        <p className="text-sm text-green-800">
          ✅ <strong>{appliedCoupon.code}</strong> applied successfully!
        </p>
        <p className="text-xs text-gray-600">
          Discount: ₹{discountAmount.toFixed(2)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-500"
        onClick={() => {
          setAppliedCoupon(null);
          setDiscountAmount(0);
        }}
      >
        Remove
      </Button>
    </div>
  )}

  {/* Updated Final Total */}
  
</div>



    <div className="flex flex-col md:flex-row justify-between mt-6 gap-3">
  <Button
    type="button"
    variant="outline"
    className="w-full md:w-auto"
    onClick={handleBack}
  >
    Back
  </Button>

  {/* Pay on Pickup */}
  <Button
  type="button"
  className="w-full md:w-auto bg-orange-600 hover:bg-orange-700"
  disabled={isSubmitting}
  onClick={(e) => handleSubmit("COD", e)}
>
  {isSubmitting ? "Submitting..." : "Pay on Pickup"}
</Button>

  {/* Pay Online */}
 <Button
  type="button"
  className="w-full md:w-auto bg-orange-600 hover:bg-orange-700"
  disabled={isSubmitting}
  onClick={async (e) => {
    e.preventDefault(); // prevent default behavior
    setIsSubmitting(true); // ✅ show processing immediately

    try {
      await handleRazorpayPayment(); // Razorpay popup logic
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsSubmitting(false); // ✅ hide processing after popup closes
    }
  }}
>
  {isSubmitting ? "Processing..." : "Pay Online"}
</Button>

</div>

  </div>
)}







              {step === 4 && bookingData && (
  <div className="text-center py-8">
    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
      <CheckCircle className="h-8 w-8" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      Booking Confirmed!
    </h2>
    <p className="text-gray-600 mb-6">
      Your booking has been successfully submitted. We'll update
      you shortly to confirm the details and Estimated Time of
      delivery.
    </p>

    {/* Booking Summary */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left mb-6">
      <h3 className="font-semibold text-gray-900 mb-2">
        Booking Summary
      </h3>
      <ul className="space-y-1 text-sm text-gray-600">
        <li className="flex justify-between">
          <span>Service Type:</span>
          <span className="font-medium">
            {bookingData.serviceType
              ? bookingData.serviceType.charAt(0).toUpperCase() +
                bookingData.serviceType.slice(1)
              : "N/A"}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Pickup Date:</span>
          <span className="font-medium">
            {bookingData.pickupDate
              ? format(new Date(bookingData.pickupDate), "PPP")
              : "Not specified"}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Booking Reference:</span>
          <span className="font-medium">
            {bookingData.bookingId || "N/A"}
          </span>
        </li>

        {bookingData.pricing && (
          <>
            <li className="flex justify-between">
              <span>Base Price:</span>
              <span className="font-medium">
                ₹{bookingData.pricing.basePrice}   
              </span>
            </li>
            <li className="flex justify-between">
              <span>Tax (18% GST):</span>
              <span className="font-medium">
                ₹{bookingData.pricing.tax}
              </span>
            </li>
            <li className="flex justify-between text-orange-600 font-semibold">
              <span>Total Amount:</span>
              <span className="font-medium">
                ₹{(priceDetails.totalAmount - discountAmount).toFixed(2)}
              </span>
            </li>
          </>
        )}
      </ul>
    </div>

    <Button asChild className="bg-orange-600 hover:bg-orange-700">
      <a href="/">Return to Home</a>
    </Button>
  </div>
)}

            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
