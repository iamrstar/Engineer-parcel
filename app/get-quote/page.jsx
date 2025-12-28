"use client"

import { useState } from "react"
import { Package, Truck, Home, MapPin, Mail, Phone, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function QuotationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
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
    furniture: "",
    appliances: "",
    boxes: "",
    vehicles: "",
    specialItems: "",
    packingRequired: "yes",
    storageRequired: "no",
    additionalNotes: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const emailContent = `
New Moving Quotation Request

PERSONAL INFORMATION:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}

MOVING DETAILS:
- Move Type: ${formData.moveType}
- From: ${formData.fromAddress}, ${formData.fromCity} - ${formData.fromPincode}
- To: ${formData.toAddress}, ${formData.toCity} - ${formData.toPincode}
- Preferred Move Date: ${formData.moveDate}
- Floor From: ${formData.floorFrom}
- Floor To: ${formData.floorTo}

ITEMS TO MOVE:
- Furniture: ${formData.furniture || "Not specified"}
- Appliances: ${formData.appliances || "Not specified"}
- Boxes/Cartons: ${formData.boxes || "Not specified"}
- Vehicles: ${formData.vehicles || "Not specified"}
- Special Items: ${formData.specialItems || "Not specified"}

ADDITIONAL SERVICES:
- Packing Required: ${formData.packingRequired}
- Storage Required: ${formData.storageRequired}
- Additional Notes: ${formData.additionalNotes || "None"}
    `.trim()

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form Data:", formData)
      console.log("Email Content:", emailContent)
      setShowSuccess(true)
    } catch (error) {
      console.error("Error submitting:", error)
      alert("There was an error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const validateStep = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.email && formData.phone
    }
    if (currentStep === 2) {
      return formData.fromAddress && formData.fromCity && formData.fromPincode &&
             formData.toAddress && formData.toCity && formData.toPincode && formData.moveDate
    }
    return true
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
              Thank you for choosing Engineers Parcel. Our team will review your moving requirements and get back to you soon with a detailed quotation.
            </p>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>You will receive a confirmation email at <strong>{formData.email}</strong></span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Our representative will call you within 24 hours to discuss your requirements</span>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>We'll provide a detailed quotation based on your moving needs</span>
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
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Need immediate assistance?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <a href="tel:+919525801506" className="text-orange-600 hover:underline">
                    📞 +91-9525801506
                  </a>
                  <a href="mailto:engineersparcel@gmail.com" className="text-orange-600 hover:underline">
                    ✉️ engineersparcel@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <section className="bg-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Truck className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Get Moving Quotation</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Fill in your details and get a customized quote for your shifting needs
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
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
                  {step === 3 && "Items & Services"}
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

        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91-XXXXXXXXXX"
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

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Items & Services</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  Please provide an approximate count or description of items to help us prepare an accurate quote.
                </p>
              </div>

              <div>
                <Label htmlFor="furniture">Furniture Items</Label>
                <Textarea
                  id="furniture"
                  name="furniture"
                  value={formData.furniture}
                  onChange={handleChange}
                  placeholder="e.g., 1 King bed, 2 wardrobes, 1 dining table with 6 chairs, 1 sofa set"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="appliances">Appliances & Electronics</Label>
                <Textarea
                  id="appliances"
                  name="appliances"
                  value={formData.appliances}
                  onChange={handleChange}
                  placeholder="e.g., 1 refrigerator, 1 washing machine, 2 TVs, 1 microwave"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="boxes">Boxes/Cartons (Approximate count)</Label>
                <Input
                  id="boxes"
                  name="boxes"
                  value={formData.boxes}
                  onChange={handleChange}
                  placeholder="e.g., 20-25 boxes"
                />
              </div>

              <div>
                <Label htmlFor="vehicles">Vehicles (if any)</Label>
                <Input
                  id="vehicles"
                  name="vehicles"
                  value={formData.vehicles}
                  onChange={handleChange}
                  placeholder="e.g., 1 car, 1 motorcycle"
                />
              </div>

              <div>
                <Label htmlFor="specialItems">Special/Fragile Items</Label>
                <Textarea
                  id="specialItems"
                  name="specialItems"
                  value={formData.specialItems}
                  onChange={handleChange}
                  placeholder="e.g., Piano, antiques, artwork, glass items"
                  rows={2}
                />
              </div>

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
                  rows={4}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-orange-600 hover:bg-orange-700 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get Quotation"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help? Contact us at:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="tel:+919525801506" className="text-orange-600 hover:underline">
              📞 +91-9525801506
            </a>
            <a href="mailto:engineersparcel@gmail.com" className="text-orange-600 hover:underline">
              ✉️ engineersparcel@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}