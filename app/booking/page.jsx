"use client";

import { useState } from "react";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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


  const [formData, setFormData] = useState({
    pickupPincode: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      senderDetails: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.pickupAddress,
        pincode: formData.pickupAddress.match(/\b\d{6}\b/)?.[0] || "826004",
      },
      receiverDetails: {
        name: formData.receiverName || "Receiver Name",
        email: formData.receiverEmail || "receiver@example.com",
        phone: formData.receiverPhone || "9123456780",
        address: formData.deliveryAddress,
        pincode: formData.deliveryAddress.match(/\b\d{6}\b/)?.[0] || "700001",
      },
      serviceType: formData.serviceType,
      pickupDate: date?.toISOString(),
      pickupSlot: formData.pickupTime || "afternoon",
      paymentMethod: "COD",
      packageDetails: {
        weight:
          formData.parcelWeight === "under1"
            ? 1
            : formData.parcelWeight === "1to5"
              ? 5
              : formData.parcelWeight === "5to10"
                ? 10
                : formData.parcelWeight === "10to20"
                  ? 20
                  : 25,
        dimensions: { length: 15, width: 10, height: 6 },
        description: formData.parcelContents,
        value: 200,
        fragile: false,
      },
      notes: formData.specialInstructions || "",
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setBookingId(data?.data?.bookingId || "");
        setPriceDetails(data?.data?.pricing || null);
        toast({
          title: "Booking Confirmed",
          description: `Your booking ID is ${data?.data?.bookingId || "N/A"}`,
        });
        setStep(4);
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      toast({ title: "Server Error", description: "Could not submit booking" });
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


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupPincode">Pickup Pincode</Label>
                        <input
                          type="text"
                          id="pickupPincode"
                          name="pickupPincode"
                          value={formData.pickupPincode}
                          onChange={handleChange}
                          placeholder="Enter pickup pincode"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                        <input
                          type="text"
                          id="pickupLandmark"
                          name="pickupLandmark"
                          value={formData.pickupLandmark}
                          onChange={handleChange}
                          placeholder="Enter nearby pickup landmark"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="deliveryPincode">
                          Delivery Pincode
                        </Label>
                        <input
                          type="text"
                          id="deliveryPincode"
                          name="deliveryPincode"
                          value={formData.deliveryPincode}
                          onChange={handleChange}
                          placeholder="Enter delivery pincode"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="deliveryAddress">
                          Delivery Address
                        </Label>
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
                        <Label htmlFor="deliveryLandmark">
                          Delivery Landmark
                        </Label>
                        <input
                          type="text"
                          id="deliveryLandmark"
                          name="deliveryLandmark"
                          value={formData.deliveryLandmark}
                          onChange={handleChange}
                          placeholder="Enter nearby delivery landmark"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="pickupTime">
                          Preferred Pickup Time
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleSelectChange("pickupTime", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (9 AM - 12 PM)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12 PM - 3 PM)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (3 PM - 6 PM)
                            </SelectItem>
                            <SelectItem value="night">
                              Night (6 PM - 9 PM)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {(formData.serviceType === "courier" ||
                      formData.serviceType === "local" ||
                      formData.serviceType === "international") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="parcelWeight">
                              Parcel Weight (approx.)
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("parcelWeight", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select weight range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under1">Under 1 kg</SelectItem>
                                <SelectItem value="1to5">1 - 5 kg</SelectItem>
                                <SelectItem value="5to10">5 - 10 kg</SelectItem>
                                <SelectItem value="10to20">10 - 20 kg</SelectItem>
                                <SelectItem value="above20">
                                  Above 20 kg
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="parcelContents">
                              Parcel Contents
                            </Label>
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

                    <div>
                      <Label htmlFor="specialInstructions">
                        Special Instructions (Optional)
                      </Label>
                      <Textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleChange}
                        placeholder="Any special handling instructions or requirements"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700"
                      >
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
  <form onSubmit={handleSubmit} className="space-y-6">
    <h2 className="text-lg font-semibold mb-4">Review Your Booking</h2>

    {/* Summary Section */}
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left space-y-2">
      <div className="flex justify-between">
        <span>Service Type:</span>
        <span className="font-medium">{formData.serviceType}</span>
      </div>
      <div className="flex justify-between">
        <span>Pickup Address:</span>
        <span className="font-medium">{formData.pickupAddress}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Address:</span>
        <span className="font-medium">{formData.deliveryAddress}</span>
      </div>
      <div className="flex justify-between">
        <span>Pickup Date:</span>
        <span className="font-medium">
          {date ? format(date, "PPP") : "Not selected"}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Parcel Weight:</span>
        <span className="font-medium">{formData.parcelWeight}</span>
      </div>
      <div className="flex justify-between">
        <span>Parcel Contents:</span>
        <span className="font-medium">{formData.parcelContents}</span>
      </div>

      {priceDetails && (
        <>
          <div className="flex justify-between">
            <span>Base Price:</span>
            <span>₹{priceDetails.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18% GST):</span>
            <span>₹{priceDetails.tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-orange-600">
            <span>Total Amount:</span>
            <span>₹{priceDetails.totalAmount}</span>
          </div>
        </>
      )}
    </div>

    <div className="flex justify-between mt-4">
      <Button type="button" variant="outline" onClick={handleBack}>
        Back
      </Button>
      <Button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : " Proceed to Payment"}
      </Button>
    </div>
  </form>
)}




              {step === 4 && (
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
                    delivery .
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
                          {formData.serviceType.charAt(0).toUpperCase() +
                            formData.serviceType.slice(1)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Pickup Date:</span>
                        <span className="font-medium">
                          {date ? format(date, "PPP") : "Not specified"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Booking Reference:</span>
                        <span className="font-medium">
                          {bookingId || "N/A"}
                        </span>
                      </li>

                      {priceDetails && (
                        <>
                          <li className="flex justify-between">
                            <span>Base Price:</span>
                            <span className="font-medium">
                              ₹{priceDetails.basePrice}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span>Tax (18% GST):</span>
                            <span className="font-medium">
                              ₹{priceDetails.tax}
                            </span>
                          </li>
                          <li className="flex justify-between text-orange-600 font-semibold">
                            <span>Total Amount:</span>
                            <span className="font-medium">
                              ₹{priceDetails.totalAmount}
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
