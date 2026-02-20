"use client"

import { useState, useMemo } from "react"
import { Calculator, Package, Info, CheckCircle, ArrowRight, Dimensions, Truck, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function PriceEstimatorPage() {
  const [formData, setFormData] = useState({
    weight: "",
    weightUnit: "kg",
    length: "",
    width: "",
    height: "",
    isFragile: false,
    declaredValue: "",
  })

  const [showEstimates, setShowEstimates] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Hide estimates when input changes to force recalculation click
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
    const valueCharge = (parseFloat(formData.declaredValue) || 0) * 0.02

    const subtotal = basePrice + fragileCharge + valueCharge
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
    setShowEstimates(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Price Estimator</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Calculate your parcel's chargeable weight and get estimated shipping costs instantly
          </p>
        </div>
      </section>

      {/* Estimator Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* Input Panel */}
          <div className="flex-1">
            <Card className="shadow-xl border-0 overflow-hidden h-full">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Parcel Details</h2>
                <p className="text-orange-100 font-medium">Enter your parcel's weight and dimensions</p>
              </div>

              <CardContent className="p-8 space-y-8">
                {/* Weight Row */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-700">Weight</Label>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Enter weight"
                      className="h-12 text-lg border-2 focus:border-orange-500"
                    />
                    <div className="flex rounded-lg overflow-hidden border-2 border-gray-200">
                      <button
                        onClick={() => handleUnitChange("kg")}
                        className={`px-4 h-full font-bold transition-colors ${formData.weightUnit === "kg" ? "bg-orange-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        KG
                      </button>
                      <button
                        onClick={() => handleUnitChange("g")}
                        className={`px-4 h-full font-bold transition-colors ${formData.weightUnit === "g" ? "bg-orange-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        G
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dimensions Grid */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    Dimensions (in cm)
                    <span className="text-xs font-normal text-gray-400">Length × Width × Height</span>
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Input
                      type="number"
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      placeholder="L"
                      className="h-12 border-2 focus:border-orange-500"
                    />
                    <Input
                      type="number"
                      name="width"
                      value={formData.width}
                      onChange={handleChange}
                      placeholder="W"
                      className="h-12 border-2 focus:border-orange-500"
                    />
                    <Input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="H"
                      className="h-12 border-2 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-700">Declared Value (₹)</Label>
                    <Input
                      type="number"
                      name="declaredValue"
                      value={formData.declaredValue}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="h-12 border-2 focus:border-orange-500"
                    />
                    <p className="text-[10px] text-gray-400">Insurance coverage at 2% of value</p>
                  </div>

                  <div className="flex items-center space-x-3 h-12 mt-auto">
                    <Checkbox
                      id="isFragile"
                      name="isFragile"
                      checked={formData.isFragile}
                      onCheckedChange={(checked) => setFormData(p => ({ ...p, isFragile: checked }))}
                    />
                    <Label htmlFor="isFragile" className="text-base font-semibold text-gray-700 cursor-pointer">
                      Fragile Parcel
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 h-14 text-lg font-bold shadow-lg shadow-orange-200 transition-all duration-200 hover:shadow-xl"
                >
                  Calculate Price Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Result Panel */}
          <div className="lg:w-[400px]">
            <Card className="shadow-xl border-0 h-full overflow-hidden flex flex-col">
              <div className="bg-gray-900 p-6 text-white text-center">
                <Truck className="w-12 h-12 mx-auto mb-2 text-orange-500 opacity-80" />
                <h3 className="text-xl font-bold">Shipping Estimate</h3>
                <p className="text-xs uppercase tracking-widest mt-1 opacity-60">Result for your parcel</p>
              </div>

              <CardContent className="p-6 flex-1 bg-white">
                {!showEstimates ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 min-h-[300px]">
                    <Calculator className="w-16 h-16 mb-4 text-gray-300" />
                    <p className="text-sm font-medium">Enter details and click<br />"Calculate Price Estimate"</p>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Estimated Price Ranges</h4>

                    <ResultItem
                      icon={<Truck className="w-4 h-4" />}
                      label="Surface"
                      estimate={calculateEstimate(rates.surface)}
                      color="blue"
                    />
                    <ResultItem
                      icon={<Zap className="w-4 h-4" />}
                      label="Express"
                      estimate={calculateEstimate(rates.express)}
                      color="orange"
                    />
                    <ResultItem
                      icon={<Star className="w-4 h-4" />}
                      label="Premium"
                      estimate={calculateEstimate(rates.premium)}
                      color="purple"
                    />

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <p className="text-[11px] text-gray-500 leading-relaxed italic">
                          * Prices shown are estimates and include 18% GST. Final prices may vary based on exact distance and actual pickup measurements.
                        </p>
                        <p className="text-[11px] text-gray-500 leading-relaxed italic">
                          * Minimum chargeable weight is 1 KG.
                        </p>
                      </div>
                      <Button asChild className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                        <a href="/booking">Book Now</a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  )
}

function ResultItem({ icon, label, estimate, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50"
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{label}</p>
          <p className="text-[10px] text-gray-500">Incl. GST: ₹{estimate.tax}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-black text-gray-900">₹{estimate.total}</p>
      </div>
    </div>
  )
}
