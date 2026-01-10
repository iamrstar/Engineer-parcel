"use client"

import { useState } from "react"
import { CheckCircle, Search, XCircle, MapPin, Clock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL // 🔁 change for production

export default function PincodeCheckerPage() {
  const [pincode, setPincode] = useState("")
  const [result, setResult] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState("")

  const checkPincode = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode")
      return
    }

    setIsChecking(true)
    setResult(null)
    setError("")

    try {
      const res = await fetch(`${API_BASE_URL}/api/pincode/check/${pincode}`)
      const data = await res.json()

      if (!res.ok) {
        setResult({
          isServiceable: false,
        })
        setError(data.message || "Pincode not serviceable")
      } else {
        setResult({
          isServiceable: data.data.isServiceable,
          data: data.data,
        })
      }
    } catch (err) {
      setError("Server not reachable. Please try again later.")
    } finally {
      setIsChecking(false)
    }
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
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Check Delivery Availability</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Enter your pincode to see if we deliver to your area and get estimated delivery times
          </p>
        </div>
      </section>

      {/* Checker Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Enter Your Pincode</h2>
              <p className="text-orange-100">We'll check if delivery is available in your area</p>
            </div>
            
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">
                  Pincode
                </Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                      className="pl-10 h-12 text-lg border-2 focus:border-orange-500 focus:ring-orange-500"
                      onKeyDown={(e) => e.key === 'Enter' && checkPincode()}
                    />
                  </div>
                  <Button
                    onClick={checkPincode}
                    disabled={isChecking}
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 h-12 px-8 shadow-lg shadow-orange-200 transition-all duration-200 hover:shadow-xl"
                  >
                    {isChecking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Checking...
                      </>
                    ) : (
                      <>
                        Check
                        <Search className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {error && !result && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div
                  className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    result.isServiceable
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                      : "bg-gradient-to-br from-red-50 to-rose-50 border-red-300"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        result.isServiceable ? "bg-green-500" : "bg-red-500"
                      }`}>
                        {result.isServiceable ? (
                          <CheckCircle className="text-white h-6 w-6" />
                        ) : (
                          <XCircle className="text-white h-6 w-6" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className={`font-bold text-2xl mb-2 ${
                          result.isServiceable ? "text-green-900" : "text-red-900"
                        }`}>
                          {result.isServiceable
                            ? "Great News! We Deliver Here"
                            : "Sorry, We Don't Deliver Here Yet"}
                        </h3>

                        {result.isServiceable && result.data && (
                          <div className="space-y-3 mt-4">
                            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                              <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-gray-600">Location</p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {result.data.city}, {result.data.state}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-lg">
                              <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-gray-600">Estimated Delivery</p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {result.data.deliveryDays} {result.data.deliveryDays === 1 ? 'day' : 'days'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 bg-green-100 p-3 rounded-lg">
                              <Package className="h-5 w-5 text-green-700" />
                              <p className="text-sm text-green-800 font-medium">
                                Your order will be dispatched soon after confirmation
                              </p>
                            </div>
                          </div>
                        )}

                        {!result.isServiceable && (
                          <div className="mt-4 space-y-3">
                            <p className="text-gray-700 bg-white/60 backdrop-blur-sm p-4 rounded-lg">
                              We're constantly expanding our delivery network. Check back soon or contact our support team for more information.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!result && !error && (
                <div className="text-center py-12 text-gray-400">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-sm">Enter a pincode to check delivery availability</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Wide Coverage</h3>
              <p className="text-sm text-gray-600">Expanding delivery network across regions</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">On-Time</h3>
              <p className="text-sm text-gray-600">Track your order every step of the way</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
