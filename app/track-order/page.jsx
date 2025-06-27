"use client"

import { useState } from "react"
import { Search, XCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("")
  const [order, setOrder] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingId) return

    setIsLoading(true)
    setError("")
    setOrder(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${trackingId}`)

      if (!res.ok) {
        throw new Error("Order not found")
      }

      const data = await res.json()
      setOrder(data.data) // ✅ Fix: use `data.data`
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-lg max-w-3xl mx-auto">Enter your tracking ID to check parcel status and delivery info</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="trackingId" className="text-base font-semibold">Tracking ID</Label>
                  <div className="flex mt-2">
                    <Input
                      id="trackingId"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter tracking ID"
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={handleTrack}
                      disabled={isLoading || trackingId.length < 4}
                      className="bg-orange-600 hover:bg-orange-700 rounded-l-none"
                    >
                      {isLoading ? "Tracking..." : "Track"}
                      {!isLoading && <Search className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Result */}
                {error && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <XCircle className="h-5 w-5 mr-2" />
                    {error}
                  </div>
                )}

                {order && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-2" />
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Order Found</h3>
                        <p className="text-sm text-gray-700">
                          <strong>Sender:</strong> {order.senderDetails?.name}<br />
                          <strong>Recipient:</strong> {order.receiverDetails?.name}<br />
                          <strong>Origin:</strong> {order.senderDetails?.pincode}<br />
                          <strong>Destination:</strong> {order.receiverDetails?.pincode}<br />
                          <strong>Status:</strong> {order.status || "In Transit"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
