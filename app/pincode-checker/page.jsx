"use client"

import { useState } from "react"
import { CheckCircle, Search, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock database of serviceable pincodes
const serviceablePincodes = [
  { pincode: "826004", city: "Dhanbad", state: "Jharkhand", deliveryDays: 1 },
  { pincode: "834001", city: "Ranchi", state: "Jharkhand", deliveryDays: 1 },
  { pincode: "700001", city: "Kolkata", state: "West Bengal", deliveryDays: 2 },
  { pincode: "110001", city: "Delhi", state: "Delhi", deliveryDays: 3 },
  { pincode: "400001", city: "Mumbai", state: "Maharashtra", deliveryDays: 4 },
  { pincode: "600001", city: "Chennai", state: "Tamil Nadu", deliveryDays: 4 },
  { pincode: "500001", city: "Hyderabad", state: "Telangana", deliveryDays: 3 },
  { pincode: "560001", city: "Bangalore", state: "Karnataka", deliveryDays: 3 },
  { pincode: "380001", city: "Ahmedabad", state: "Gujarat", deliveryDays: 3 },
  { pincode: "800001", city: "Patna", state: "Bihar", deliveryDays: 2 },
]

export default function PincodeCheckerPage() {
  const [pincode, setPincode] = useState("")
  const [result, setResult] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  const handlePincodeChange = (e) => {
    setPincode(e.target.value)
  }

  const checkPincode = () => {
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      return
    }

    setIsChecking(true)

    // Simulate API call
    setTimeout(() => {
      const found = serviceablePincodes.find((p) => p.pincode === pincode)

      if (found) {
        setResult({
          isServiceable: true,
          data: found,
        })
      } else {
        setResult({
          isServiceable: false,
        })
      }

      setIsChecking(false)
    }, 1000)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Pincode Checker</h1>
          <p className="text-lg max-w-3xl mx-auto">Check if we deliver to your area and get estimated delivery times</p>
        </div>
      </section>

      {/* Pincode Checker */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="pincode" className="text-base font-semibold">
                    Enter Pincode
                  </Label>
                  <div className="flex mt-2">
                    <Input
                      id="pincode"
                      value={pincode}
                      onChange={handlePincodeChange}
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={checkPincode}
                      disabled={isChecking || !pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)}
                      className="bg-orange-600 hover:bg-orange-700 rounded-l-none"
                    >
                      {isChecking ? "Checking..." : "Check"}
                      {!isChecking && <Search className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {result && (
                  <div
                    className={`p-4 rounded-lg ${result.isServiceable ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {result.isServiceable ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="ml-3">
                        <h3
                          className={`text-lg font-semibold ${result.isServiceable ? "text-green-800" : "text-red-800"}`}
                        >
                          {result.isServiceable ? "Delivery Available" : "Delivery Not Available"}
                        </h3>
                        {result.isServiceable ? (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>
                              We deliver to {result.data?.city}, {result.data?.state}.
                            </p>
                            <p className="mt-1">
                              Estimated delivery time:{" "}
                              <span className="font-semibold">
                                {result.data?.deliveryDays} {result.data?.deliveryDays === 1 ? "day" : "days"}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <p className="mt-2 text-sm text-gray-600">
                            Sorry, we don't deliver to this pincode yet. Please check back later as we're expanding our
                            delivery network.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Coverage Information */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Delivery Coverage</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Major Cities We Serve</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Dhanbad - Same day delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Ranchi - Next day delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Kolkata - 1-2 days delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Delhi - 2-3 days delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Mumbai - 3-4 days delivery</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Bangalore - 3-4 days delivery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">International Shipping</h3>
                <p className="text-gray-600 mb-4">
                  We offer international shipping to over 200 countries worldwide. Delivery times vary by destination:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>SAARC Countries - 3-5 days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Middle East - 4-6 days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Europe - 5-7 days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>North America - 5-8 days</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Australia & New Zealand - 6-9 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if my pincode is not serviceable?</h3>
                <p className="text-gray-600">
                  If your pincode is not currently serviceable, you can contact our customer service to check if we can
                  make special arrangements for your delivery. We're constantly expanding our delivery network, so your
                  area might be covered soon.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How accurate are the delivery time estimates?
                </h3>
                <p className="text-gray-600">
                  Our delivery time estimates are based on normal operating conditions. Actual delivery times may vary
                  due to factors like weather, traffic, or other unforeseen circumstances. We always strive to deliver
                  within the estimated timeframe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you deliver to remote or rural areas?</h3>
                <p className="text-gray-600">
                  Yes, we deliver to many rural and remote areas, though delivery times may be longer. Use our pincode
                  checker to verify if we service your area and get an estimated delivery timeframe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
