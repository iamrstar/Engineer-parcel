"use client"

import { useState, useEffect } from "react"
import { Package, Truck, Home, MapPin, Mail, Phone, CheckCircle, ArrowLeft, Plus, Minus, X, Loader2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/src/context/AuthContext"
import { useRouter } from "next/navigation"
import axios from "axios"

const BASE_RATES = {
  "1 BHK": {
    "Up to 50 KM": [7000, 11000],
    "Up to 500 KM": [12000, 16000],
    "Up to 1000 KM": [20000, 25000],
    "Up to 1500 KM": [26000, 32000],
    "Within 2500 KM": [30000, 35000]
  },
  "2 BHK": {
    "Up to 50 KM": [12000, 15000],
    "Up to 500 KM": [20000, 23000],
    "Up to 1000 KM": [25000, 30000],
    "Up to 1500 KM": [32000, 40000],
    "Within 2500 KM": [40000, 45000]
  },
  "3 BHK": {
    "Up to 50 KM": [15000, 18000],
    "Up to 500 KM": [25000, 30000],
    "Up to 1000 KM": [35000, 40000],
    "Up to 1500 KM": [45000, 50000],
    "Within 2500 KM": [50000, 65000]
  },
  "4 BHK/Villa": {
    "Up to 50 KM": [25000, 30000],
    "Up to 500 KM": [35000, 40000],
    "Up to 1000 KM": [50000, 60000],
    "Up to 1500 KM": [55000, 65000],
    "Within 2500 KM": [70000, 90000]
  },
  "Car Transportation": {
    "Up to 50 KM": [9000, 11500],
    "Up to 500 KM": [12000, 14500],
    "Up to 1000 KM": [17000, 20000],
    "Up to 1500 KM": [21000, 25000],
    "Within 2500 KM": [25000, 30000]
  },
  "Bike Transportation": {
    "Up to 50 KM": [3000, 7000],
    "Up to 500 KM": [7000, 10500],
    "Up to 1000 KM": [10500, 15000],
    "Up to 1500 KM": [15000, 20000],
    "Within 2500 KM": [20000, 25000]
  }
}

const ITEM_PRICES = {
  fridge: 1000,
  washingMachine: 800,
  tv: 500,
  ac: 1000,
  microwave: 300,
  cooler: 500,
  bed: 1500,
  mattress: 400,
  wardrobe: 1200,
  diningTable: 1000,
  chair: 150,
  sofa: 1200,
  centerTable: 400,
  bike: 2500,
  car: 10000,
  boxes: 200,
  cylinder: 200,
  geyser: 300,
  waterPurifier: 200,
}

const ITEM_LABELS = {
  fridge: "Refrigerator",
  washingMachine: "Washing Machine",
  tv: "Television (TV)",
  ac: "Air Conditioner (AC)",
  microwave: "Microwave / Oven",
  cooler: "Air Cooler",
  bed: "Bed (Cot)",
  mattress: "Mattress",
  wardrobe: "Wardrobe / Almirah",
  diningTable: "Dining Table",
  chair: "Chair",
  sofa: "Sofa Set",
  centerTable: "Center Table",
  bike: "Motorcycle / Scooter",
  car: "Car",
  boxes: "Boxes (Approx 20kg each)",
  cylinder: "Gas Cylinder",
  geyser: "Geyser",
  waterPurifier: "Water Purifier",
}

const STANDARD_INVENTORY = {
  "1 BHK": { fridge: 1, tv: 1, bed: 1, mattress: 1, wardrobe: 1, sofa: 1, cylinder: 1, boxes: 10 },
  "2 BHK": { fridge: 1, washingMachine: 1, tv: 1, bed: 2, mattress: 2, wardrobe: 2, sofa: 1, centerTable: 1, diningTable: 1, cylinder: 1, boxes: 15 },
  "3 BHK": { fridge: 1, washingMachine: 1, tv: 2, ac: 1, bed: 3, mattress: 3, wardrobe: 3, sofa: 1, centerTable: 1, diningTable: 1, cylinder: 1, boxes: 20 },
  "4 BHK/Villa": { fridge: 1, washingMachine: 1, tv: 3, ac: 2, bed: 4, mattress: 4, wardrobe: 4, sofa: 2, centerTable: 1, diningTable: 1, cylinder: 2, boxes: 30 },
  "Car Transportation": { car: 1 },
  "Bike Transportation": { bike: 1 }
}

const getStandardItems = (size) => {
  const base = {
    fridge: 0, washingMachine: 0, tv: 0, ac: 0, microwave: 0, cooler: 0,
    bed: 0, mattress: 0, wardrobe: 0, diningTable: 0, chair: 0, sofa: 0,
    centerTable: 0, bike: 0, car: 0, boxes: 0, cylinder: 0, geyser: 0, waterPurifier: 0
  }
  return { ...base, ...(STANDARD_INVENTORY[size] || {}) }
}

export default function QuotationPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // AI Flow States
  const [isCalculatingQuote, setIsCalculatingQuote] = useState(false)
  const [showLeadGate, setShowLeadGate] = useState(false)
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [showQuotePopup, setShowQuotePopup] = useState(false)
  const [loadingText, setLoadingText] = useState("Analyzing your inventory...")

  // Base configuration state
  const [isConfigured, setIsConfigured] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [tempMoveSize, setTempMoveSize] = useState("2 BHK")
  const [tempDistance, setTempDistance] = useState("Up to 500 KM")

  const [moveSize, setMoveSize] = useState("2 BHK")
  const [distance, setDistance] = useState("Up to 500 KM")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    moveType: "household",
    fromAddress: "",
    fromCity: "",
    fromPincode: "",
    toAddress: "",
    toCity: "",
    toPincode: "",
    moveDate: "",
    floorFrom: "",
    floorTo: "",
    packingRequired: "yes",
    storageRequired: "no",
    additionalNotes: "",
  })

  const [items, setItems] = useState(getStandardItems("2 BHK"))

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || ""
      }))
    }
  }, [user])

  const handleItemChange = (item, change) => {
    setItems(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change)
    }))
  }

  const applyDefaults = () => {
    setMoveSize(tempMoveSize)
    setDistance(tempDistance)
    setItems(getStandardItems(tempMoveSize))
    setIsConfigured(true)
    setShowModal(false)
  }

  // Calculations
  const baseRate = BASE_RATES[moveSize][distance]
  const finalMin = baseRate[0]
  const finalMax = baseRate[1]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGetQuote = () => {
    setIsCalculatingQuote(true)
    let step = 0
    const texts = [
      "Analyzing your inventory...",
      "Calculating route options...",
      "Enzee AI is finalizing your quote..."
    ]
    setLoadingText(texts[0])
    
    const interval = setInterval(() => {
      step++
      if (step < texts.length) {
        setLoadingText(texts[step])
      }
    }, 1600)

    setTimeout(() => {
      clearInterval(interval)
      setIsCalculatingQuote(false)
      setShowLeadGate(true)
    }, 5000)
  }

  const handleLeadGateSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone || formData.phone.length < 10) return

    setIsSubmittingLead(true)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      await axios.post(`${API_URL}/api/leads`, {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        source: "Rate Calculator",
        details: { moveSize, distance, items }
      })
      setShowLeadGate(false)
      setShowQuotePopup(true)
    } catch (error) {
      console.error("Error capturing lead:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    setShowQuotePopup(false)

    try {
      const token = localStorage.getItem("token")
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      
      const payload = {
        formData,
        items,
        moveSize,
        distance,
        finalMin,
        finalMax
      }

      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      
      const res = await axios.post(`${API_URL}/api/estimator/request-callback`, payload, config)

      if (res.data.success) {
        setShowSuccess(true)
      } else {
        alert("There was an error. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting:", error)
      alert("There was an error connecting to the server. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep === 2 && !isConfigured) {
      setShowModal(true)
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const validateStep = () => {
    if (currentStep === 1) {
      return formData.email
    }
    if (currentStep === 2) {
      return formData.fromAddress && formData.fromCity && formData.fromPincode &&
             formData.toAddress && formData.toCity && formData.toPincode && formData.moveDate
    }
    return true
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle className="h-12 w-12" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Request Submitted Successfully!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Thank you for choosing Engineers Parcel. Our team has received your estimation request and will contact you shortly.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>A summarized report has been sent to our team from <strong>{formData.email}</strong></span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Our representative will call you within 24 hours to discuss your requirements</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                In the meantime, explore our services or contact us directly
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('https://www.engineersparcel.in', '_blank')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Explore Our Services
                </Button>
                
                <Button 
                  onClick={() => window.location.href = 'tel:+919525801506'}
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative">
      
      {/* AI Loading Overlay */}
      {isCalculatingQuote && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative">
            <Loader2 className="w-20 h-20 text-orange-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mt-8 mb-2">Calculating Quote</h2>
          <p className="text-xl text-orange-600 font-medium animate-pulse">{loadingText}</p>
        </div>
      )}

      {/* Lead Capture Gatekeeper */}
      {showLeadGate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full p-8 md:p-10 animate-in zoom-in duration-300 relative border border-orange-100">
            <button 
              onClick={() => setShowLeadGate(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Your Quote is Ready!</h2>
              <p className="text-gray-500 mt-2">Enter your details to view your estimated rate.</p>
            </div>

            <form onSubmit={handleLeadGateSubmit} className="space-y-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="h-12 bg-gray-50 mt-1"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-12 bg-gray-50 mt-1"
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmittingLead || !formData.phone || !formData.fullName}
                className="w-full h-14 mt-4 text-lg bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all hover:scale-[1.02]"
              >
                {isSubmittingLead ? <Loader2 className="w-6 h-6 animate-spin" /> : "View My Quote"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Final Quote Popup */}
      {showQuotePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full p-8 md:p-10 animate-in zoom-in duration-300 relative border border-orange-100">
            <button 
              onClick={() => setShowQuotePopup(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Your Quote is Ready</h2>
              <p className="text-gray-500 mt-2">Based on {moveSize} and {distance}</p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 text-center border border-orange-200 mb-8">
              <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-2">Final Estimated Rate Range</h3>
              <p className="text-4xl md:text-5xl font-black text-orange-600">₹{finalMin.toLocaleString()} - ₹{finalMax.toLocaleString()}</p>
              <p className="text-xs text-orange-600/70 mt-3 font-medium">* Not a final rate. Subject to final physical inspection.</p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full h-16 text-lg bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                {isSubmitting ? "Processing..." : "Request a Call Back"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Initial Configuration Modal Overlay */}
      {showModal && !isCalculatingQuote && !showQuotePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-gray-900">Configure Your Move</h3>
              <button 
                onClick={() => {
                  if (isConfigured) setShowModal(false)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                {isConfigured && <X className="w-6 h-6" />}
              </button>
            </div>
            
            <p className="text-gray-500 mb-8">
              Select your Move Size and we will automatically build a standard inventory list for you to adjust.
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="tempMoveSize" className="text-sm font-bold text-gray-700">Move Size</Label>
                <select
                  id="tempMoveSize"
                  value={tempMoveSize}
                  onChange={(e) => setTempMoveSize(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors"
                >
                  {Object.keys(BASE_RATES).map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="tempDistance" className="text-sm font-bold text-gray-700">Approximate Distance</Label>
                <select
                  id="tempDistance"
                  value={tempDistance}
                  onChange={(e) => setTempDistance(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors"
                >
                  {Object.keys(BASE_RATES["1 BHK"]).map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={() => {
                  applyDefaults()
                  setCurrentStep(3)
                }} 
                className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-200"
              >
                Generate Inventory
              </Button>
            </div>
          </div>
        </div>
      )}

      <section className="relative pt-20 pb-16 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold px-4 py-2 rounded-full mb-6">
            <Truck className="w-4 h-4" />
            ENGINEERED LOGISTICS SOLUTIONS
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Precision Estimator. <br />
            <span className="text-orange-600">Universal Coverage.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From hyperlocal parcel drops to global supply chain management, calculate an estimated rate for your move with absolute precision.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {step === 1 && "Personal Info"}
                  {step === 2 && "Moving Details"}
                  {step === 3 && "Estimator Calculator"}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`h-1 flex-1 mx-4 ${
                    currentStep > step ? "bg-orange-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[32px] shadow-2xl shadow-orange-100/50 p-8 md:p-12 border border-gray-100 relative z-20 mt-4">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="moveType">Type of Move *</Label>
                <select
                  id="moveType"
                  name="moveType"
                  value={formData.moveType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="household">Household Shifting</option>
                  <option value="office">Office Relocation</option>
                  <option value="vehicle">Vehicle Transportation</option>
                  <option value="commercial">Commercial Moving</option>
                </select>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={nextStep}
                  disabled={!validateStep()}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Moving Details</h2>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                  From (Current Location)
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fromAddress">Complete Address *</Label>
                    <Input
                      id="fromAddress"
                      name="fromAddress"
                      value={formData.fromAddress}
                      onChange={handleChange}
                      placeholder="House/Flat No., Street, Locality"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromCity">City *</Label>
                      <Input
                        id="fromCity"
                        name="fromCity"
                        value={formData.fromCity}
                        onChange={handleChange}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromPincode">Pincode *</Label>
                      <Input
                        id="fromPincode"
                        name="fromPincode"
                        value={formData.fromPincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="floorFrom">Floor Number</Label>
                    <Input
                      id="floorFrom"
                      name="floorFrom"
                      value={formData.floorFrom}
                      onChange={handleChange}
                      placeholder="e.g., Ground, 1st, 2nd"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-green-600" />
                  To (Destination)
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="toAddress">Complete Address *</Label>
                    <Input
                      id="toAddress"
                      name="toAddress"
                      value={formData.toAddress}
                      onChange={handleChange}
                      placeholder="House/Flat No., Street, Locality"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="toCity">City *</Label>
                      <Input
                        id="toCity"
                        name="toCity"
                        value={formData.toCity}
                        onChange={handleChange}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="toPincode">Pincode *</Label>
                      <Input
                        id="toPincode"
                        name="toPincode"
                        value={formData.toPincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="floorTo">Floor Number</Label>
                    <Input
                      id="floorTo"
                      name="floorTo"
                      value={formData.floorTo}
                      onChange={handleChange}
                      placeholder="e.g., Ground, 1st, 2nd"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="moveDate">Preferred Moving Date *</Label>
                <Input
                  id="moveDate"
                  name="moveDate"
                  type="date"
                  value={formData.moveDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!validateStep()}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && isConfigured && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Estimator Calculator</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowModal(true)}
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                >
                  Change Move Size
                </Button>
              </div>

              {/* Items Inventory */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Adjust Your Inventory</h3>
                  <p className="text-sm text-gray-500">
                    We've automatically pre-filled standard items for a typical {moveSize}. 
                    Add or remove items below to perfectly match your belongings.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(items).map((key) => {
                    const count = items[key];
                    const isSelected = count > 0;
                    
                    return (
                      <div key={key} className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${isSelected ? 'border-orange-300 bg-orange-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <div>
                          <p className={`font-semibold ${isSelected ? 'text-orange-900' : 'text-gray-900'}`}>{ITEM_LABELS[key]}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleItemChange(key, -1)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-orange-300 text-orange-600 hover:bg-orange-100' : 'border-gray-300 text-gray-400'}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className={`w-6 text-center font-bold text-lg ${isSelected ? 'text-orange-600' : 'text-gray-400'}`}>{count}</span>
                          <button 
                            onClick={() => handleItemChange(key, 1)}
                            className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <hr className="border-gray-200 my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="packingRequired">Packing Service Required? *</Label>
                  <select
                    id="packingRequired"
                    name="packingRequired"
                    value={formData.packingRequired}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="yes">Yes - Full Packing</option>
                    <option value="partial">Partial Packing</option>
                    <option value="no">No - Self Packing</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="storageRequired">Storage Required? *</Label>
                  <select
                    id="storageRequired"
                    name="storageRequired"
                    value={formData.storageRequired}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="no">No</option>
                    <option value="short">Yes - Short term (1-7 days)</option>
                    <option value="long">Yes - Long term (1+ months)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes/Requirements</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Any specific requirements or concerns..."
                  rows={3}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300 w-full md:w-auto"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleGetQuote}
                  className="bg-orange-600 hover:bg-orange-700 px-12 w-full md:w-auto text-xl h-14 shadow-xl shadow-orange-200 transition-all hover:scale-105 font-bold"
                  disabled={isSubmitting || isCalculatingQuote}
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
