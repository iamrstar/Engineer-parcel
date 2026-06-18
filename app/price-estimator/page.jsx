"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, Package, Info, CheckCircle, ArrowRight, Ruler, Truck, Zap, Star, ShieldCheck, Scale, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"

export default function PriceEstimatorPage() {
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    length: "",
    width: "",
    height: "",
    isFragile: false,
  })

  const [showEstimates, setShowEstimates] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Lead Gate States
  const [showLeadGate, setShowLeadGate] = useState(false)
  const [leadData, setLeadData] = useState({ name: "", phone: "" })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (showEstimates) setShowEstimates(false)
  }

  const handleUnitChange = (unit) => {
    setFormData((prev) => ({ ...prev, weightUnit: unit }))
    if (showEstimates) setShowEstimates(false)
  }

  const calculations = useMemo(() => {
    const weight = parseFloat(formData.weight) || 0
    const weightKg = formData.weightUnit === "g" ? weight / 1000 : weight

    const l = parseFloat(formData.length) || 0
    const w = parseFloat(formData.width) || 0
    const h = parseFloat(formData.height) || 0

    // Volumetric Weight Formula: (L × W × H) / 2700
    const volumetricWeight = (l * w * h) / 2700
    const chargeableWeight = Math.ceil(Math.max(weightKg, volumetricWeight))

    return {
      actualWeight: weightKg,
      volumetricWeight,
      chargeableWeight,
      usedVolumetric: volumetricWeight > weightKg
    }
  }, [formData])

  const rates = {
    surface: 100,
    air: 220,
    express: 350,
    premium: 500
  }

  const calculateEstimate = (ratePerKg) => {
    const basePrice = Math.max(ratePerKg * calculations.chargeableWeight, 100)
    const fragileCharge = formData.isFragile ? 30 : 0

    const subtotal = basePrice + fragileCharge
    const tax = subtotal * 0.18
    const total = subtotal + tax

    return {
      total: total.toFixed(2),
      base: basePrice,
      tax: tax.toFixed(2)
    }
  }

  const handleCalculate = () => {
    if (!formData.weight || calculations.chargeableWeight === 0) {
      alert("Please enter valid weight and dimensions.")
      return
    }
    
    // Show lead gate instead of calculating immediately
    setShowLeadGate(true)
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    if (!leadData.name || !leadData.phone || leadData.phone.length < 10) return

    setIsSubmittingLead(true)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      await axios.post(`${API_URL}/api/leads`, {
        name: leadData.name,
        phone: leadData.phone,
        source: "Price Estimator",
        details: {
          weight: formData.weight,
          unit: formData.weightUnit,
          dimensions: `${formData.length}x${formData.width}x${formData.height}`,
          chargeableWeight: calculations.chargeableWeight
        }
      })
      
      setShowLeadGate(false)
      setIsAnimating(true)
      setTimeout(() => {
        setShowEstimates(true)
        setIsAnimating(false)
      }, 800)
    } catch (error) {
      console.error("Error saving lead:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmittingLead(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden text-white selection:bg-orange-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none translate-y-1/2"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

      {/* Lead Capture Gate Modal */}
      <AnimatePresence>
        {showLeadGate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] border border-white/10 rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              
              <button 
                onClick={() => setShowLeadGate(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 text-orange-500 rounded-2xl mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Almost there!</h2>
                <p className="text-gray-400 mb-8">Enter your details below to reveal your exact shipping estimate.</p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Your Name *</Label>
                    <Input
                      value={leadData.name}
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                      className="h-14 mt-1 bg-white/5 border-white/10 text-white focus:border-orange-500 focus:bg-white/10 rounded-xl"
                      placeholder="Rahul Kumar"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Mobile Number *</Label>
                    <Input
                      type="tel"
                      value={leadData.phone}
                      onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                      className="h-14 mt-1 bg-white/5 border-white/10 text-white focus:border-orange-500 focus:bg-white/10 rounded-xl"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmittingLead || !leadData.name || !leadData.phone}
                    className="w-full h-14 mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all hover:scale-[1.02]"
                  >
                    {isSubmittingLead ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Show My Estimate"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="relative max-w-6xl mx-auto px-4 py-24 z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest backdrop-blur-md">
            <Calculator className="w-3 h-3" />
            Smart Pricing Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Price Estimator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Enter your parcel dimensions and weight below to instantly calculate the chargeable weight and shipping options.
          </p>
        </motion.div>

        {/* Main Interface */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Input Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 h-full shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                    <Package className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Parcel Details</h2>
                    <p className="text-sm text-gray-400">Specify weight and dimensions</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Weight Row */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <Scale className="w-4 h-4 text-gray-500" /> Physical Weight
                    </Label>
                    <div className="flex gap-4">
                      <div className="relative flex-1 group/input">
                        <Input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="h-16 text-2xl font-bold bg-white/5 border-white/10 text-white focus:border-orange-500 focus:bg-white/10 transition-all rounded-2xl pl-6"
                        />
                      </div>
                      <div className="flex rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1 shrink-0">
                        <button
                          onClick={() => handleUnitChange("kg")}
                          className={`w-16 h-full font-bold rounded-xl transition-all ${formData.weightUnit === "kg" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-gray-400 hover:text-white"}`}
                        >
                          KG
                        </button>
                        <button
                          onClick={() => handleUnitChange("g")}
                          className={`w-16 h-full font-bold rounded-xl transition-all ${formData.weightUnit === "g" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-gray-400 hover:text-white"}`}
                        >
                          G
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dimensions Grid */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-gray-500" /> Dimensions (CM)
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                      {['length', 'width', 'height'].map((dim, idx) => (
                        <div key={dim} className="relative group/dim">
                          <Input
                            type="number"
                            name={dim}
                            value={formData[dim]}
                            onChange={handleChange}
                            placeholder="0"
                            className="h-16 text-xl font-bold bg-white/5 border-white/10 text-white focus:border-orange-500 focus:bg-white/10 transition-all rounded-2xl text-center"
                          />
                          <span className="absolute top-2 left-3 text-xs font-black text-gray-500 uppercase tracking-widest">{dim.charAt(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="pt-6 border-t border-white/10">
                    <label className="flex items-center space-x-4 cursor-pointer group/check">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${formData.isFragile ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/30' : 'bg-white/5 border-white/20 group-hover/check:border-white/40'}`}>
                        {formData.isFragile && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        name="isFragile" 
                        checked={formData.isFragile} 
                        onChange={handleChange} 
                        className="hidden" 
                      />
                      <div>
                        <span className="text-lg font-semibold text-white block">Fragile Parcel</span>
                        <span className="text-xs text-gray-500">Requires special handling (+₹30)</span>
                      </div>
                    </label>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    disabled={isAnimating}
                    className="w-full h-16 bg-white text-black hover:bg-gray-200 text-lg font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isAnimating ? "Processing..." : "Calculate Price"} 
                      {!isAnimating && <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Result Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:w-[450px] flex flex-col"
          >
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-[32px] p-1 h-full shadow-2xl shadow-orange-900/20 relative">
              <div className="bg-[#111] rounded-[28px] h-full p-8 flex flex-col relative overflow-hidden">
                
                {/* Background glow for results */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10 relative z-10">
                  <h3 className="text-2xl font-bold text-white">Estimate</h3>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Truck className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                <div className="flex-1 relative z-10">
                  <AnimatePresence mode="wait">
                    {!showEstimates ? (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full flex flex-col items-center justify-center text-center opacity-50 min-h-[300px]"
                      >
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 relative">
                          {isAnimating && <div className="absolute inset-0 border-t-2 border-orange-500 rounded-full animate-spin"></div>}
                          <Calculator className="w-10 h-10 text-gray-500" />
                        </div>
                        <p className="text-lg font-medium text-gray-400">Waiting for details...</p>
                        <p className="text-sm text-gray-600 mt-2 max-w-[200px]">Fill the form and hit calculate to see options.</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ staggerChildren: 0.1 }}
                        className="space-y-6"
                      >
                        {/* Chargeable Weight Callout */}
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                          className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md"
                        >
                          <div>
                            <p className="text-xs text-orange-400 font-bold uppercase tracking-widest mb-1">Chargeable Weight</p>
                            <p className="text-3xl font-black text-white">{calculations.chargeableWeight} <span className="text-xl text-orange-500">KG</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-400">Actual: {calculations.actualWeight.toFixed(2)} KG</p>
                            <p className="text-[10px] text-gray-400">Volumetric: {calculations.volumetricWeight.toFixed(2)} KG</p>
                          </div>
                        </motion.div>

                        <div className="space-y-4">
                          <ResultItem
                            icon={<Truck className="w-5 h-5" />}
                            label="Surface Transport"
                            desc="Standard delivery"
                            estimate={calculateEstimate(rates.surface)}
                            delay={0.1}
                          />
                          <ResultItem
                            icon={<Zap className="w-5 h-5" />}
                            label="Express Air"
                            desc="Fast delivery"
                            estimate={calculateEstimate(rates.express)}
                            delay={0.2}
                            highlight
                          />
                          <ResultItem
                            icon={<Star className="w-5 h-5" />}
                            label="Premium Priority"
                            desc="Next day guaranteed"
                            estimate={calculateEstimate(rates.premium)}
                            delay={0.3}
                          />
                        </div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-6">
                          <Button asChild className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02]">
                            <a href="/booking">Proceed to Book</a>
                          </Button>
                          <p className="text-[10px] text-gray-500 text-center mt-4">
                            * Includes 18% GST. Final prices subject to physical measurement.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

function ResultItem({ icon, label, desc, estimate, highlight, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`relative p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group overflow-hidden ${highlight ? 'bg-orange-500/10 border-orange-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      )}
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/10 text-gray-400 group-hover:text-white'}`}>
          {icon}
        </div>
        <div>
          <p className={`font-bold ${highlight ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{label}</p>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
      
      <div className="text-right relative z-10">
        <p className={`text-xl font-black ${highlight ? 'text-orange-400' : 'text-white'}`}>₹{estimate.total}</p>
        <p className="text-[10px] text-gray-500">Base: ₹{estimate.base}</p>
      </div>
    </motion.div>
  )
}
