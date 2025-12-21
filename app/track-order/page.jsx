"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, Building2, MapPin, CheckCircle2, Check, Search } from "lucide-react"

const PRIMARY = "#eb5a0c"
const API = process.env.NEXT_PUBLIC_API_URL

// ===== Dummy Data (for fallback) =====
const dummyBookings = [
  {
    bookingId: "EP123456",
    senderDetails: { city: "Kolkata" },
    receiverDetails: { city: "Delhi" },
    status: "Out for Delivery",
    estimatedDelivery: "Dec 25, 2025",
    trackingHistory: [
      { status: "CONFIRMED", timestamp: "2025-12-20T10:00:00Z", description: "Order confirmed at Kolkata Hub", location: "Kolkata Hub" },
      { status: "IN_TRANSIT", timestamp: "2025-12-21T15:00:00Z", description: "Left Kolkata facility", location: "Kolkata" },
      { status: "ARRIVED_AT_DESTINATION", timestamp: "2025-12-22T09:30:00Z", description: "Arrived at Delhi Hub", location: "Delhi Hub" },
      { status: "OUT_FOR_DELIVERY", timestamp: "2025-12-22T08:00:00Z", description: "Courier out for delivery", location: "Delhi" },
    ]
  }
]

// ===== Fetch API =====
const fetchBookings = async ({ id, phone }) => {
  const url = id
    ? `${API}/api/bookings/${encodeURIComponent(id)}`
    : `${API}/api/tracking/phone/${encodeURIComponent(phone)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  const data = await res.json()
  return Array.isArray(data?.data ?? data) ? data?.data ?? data : [data?.data ?? data]
}

// ===== Helpers =====
const normalizeStatus = (s = "") => {
  const v = s.toLowerCase()
  if (v.includes("delivered")) return "DELIVERED"
  if (v.includes("out")) return "OUT_FOR_DELIVERY"
  if (v.includes("arrived")) return "ARRIVED_AT_DESTINATION"
  if (v.includes("transit")) return "IN_TRANSIT"
  if (v.includes("confirm")) return "CONFIRMED"
  return "IN_TRANSIT"
}

const safeDate = (d) => {
  try {
    const dt = d ? new Date(d) : null
    return dt && !isNaN(dt.getTime()) ? dt : null
  } catch { return null }
}

const fmtDate = (d) => {
  const dt = safeDate(d)
  return dt ? dt.toLocaleString() : "-"
}

const normalizeBooking = (b = {}) => {
  const waybill = b.bookingId || b.waybill || "-"
  const origin = b.senderDetails?.city || b.origin || "-"
  const destination = b.receiverDetails?.city || b.destination || "-"
  const hist = Array.isArray(b.trackingHistory) ? b.trackingHistory : []
  const history = hist.map((h) => ({
    status: h.status || h.event || "-",
    date: h.timestamp || h.date || h.createdAt || null,
    event: h.description || h.details || h.message || "-",
    location: h.location || h.city || "-",
  }))

  const currentStatus = normalizeStatus(
    b.status || history[history.length - 1]?.status || ""
  )
  const etd = b.estimatedDelivery || "Updated Shortly"
  return { id: waybill, waybill, origin, destination, currentStatus, history, etd }
}

// ===== UI Components =====
const Segmented = ({ value, onChange, options }) => (
  <div className="inline-flex rounded-lg border overflow-hidden w-full sm:w-auto">
    {options.map((opt) => {
      const active = value === opt.value
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium transition-colors ${
            active ? "text-white" : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          style={{ backgroundColor: active ? PRIMARY : undefined }}
        >
          {opt.label}
        </button>
      )
    })}
  </div>
)

const SummaryChip = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</div>
    <div className="text-sm font-semibold text-gray-900">{value}</div>
  </div>
)

function StatusTable({ rows = [] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200" style={{ backgroundColor: PRIMARY }}>
        <h3 className="text-center font-semibold text-white">Tracking History</h3>
      </div>

      {/* Timeline */}
      <div className="p-4 sm:p-6">
        {rows.length ? (
          <div className="space-y-6">
            {rows.map((r, i) => {
              const isDelivered = r.status?.toLowerCase().includes("delivered")
              const lineColor = isDelivered ? "bg-green-500" : "bg-orange-500"
              const dotColor = isDelivered ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"
              const iconColor = isDelivered ? "text-green-600" : "text-orange-600"

              return (
                <div key={i} className="relative flex gap-4">
                  {/* Vertical line */}
                  {i !== rows.length - 1 && (
                    <div className={`absolute left-4 top-10 bottom-0 w-0.5 ${lineColor}`} />
                  )}

                  {/* Icon circle */}
                  <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 ${dotColor} flex items-center justify-center`}>
                    <Check className={`h-4 w-4 ${iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                      isDelivered ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {r.status || "-"}
                    </span>

                    <div className="mt-2 space-y-1">
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Event:</span> {r.event || "-"}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Location:</span> {r.location || "-"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{fmtDate(r.date)}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-8">
            No tracking updates yet
          </div>
        )}
      </div>
    </div>
  )
}

const Stepper = ({ current = "IN_TRANSIT", dates = {} }) => {
  const [isLarge, setIsLarge] = useState(false)
  
  useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const steps = [
    { key: "CONFIRMED", label: "BOOKED", icon: Package },
    { key: "IN_TRANSIT", label: "IN TRANSIT", icon: Truck },
    { key: "ARRIVED_AT_DESTINATION", label: "ARRIVED", icon: Building2 },
    { key: "OUT_FOR_DELIVERY", label: "OUT FOR DELIVERY", icon: MapPin },
    { key: "DELIVERED", label: "DELIVERED", icon: CheckCircle2 },
  ]

  const idx = Math.max(0, steps.findIndex((s) => s.key === current))

  if (isLarge) {
    return (
      <div className="w-full py-8">
        <div className="flex justify-between items-center relative px-2">
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-6 h-1 bg-gray-200 rounded-full" />
          <div 
            className="absolute left-0 top-6 h-1 rounded-full transition-all duration-500"
            style={{ 
              backgroundColor: PRIMARY,
              width: `${(idx / (steps.length - 1)) * 100}%`
            }}
          />
          
          {steps.map((s, i) => (
            <div key={s.key} className="relative z-10 flex flex-col items-center" style={{ width: `${100 / steps.length}%` }}>
              <div 
                className={`h-12 w-12 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-300 ${
                  i <= idx ? "text-white border-transparent" : "text-gray-400 border-gray-300 bg-white"
                }`}
                style={{ backgroundColor: i <= idx ? PRIMARY : undefined }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <span className="mt-3 text-xs font-semibold text-center text-gray-700 max-w-[80px]">
                {s.label}
              </span>
              {dates[s.key] && (
                <span className="text-[10px] text-gray-500 mt-1">
                  {fmtDate(dates[s.key])}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={s.key} className="relative flex items-start gap-3">
            {i !== steps.length - 1 && (
              <div 
                className={`absolute left-4 top-10 bottom-0 w-0.5 ${
                  i < idx ? "bg-orange-500" : "bg-gray-200"
                }`}
              />
            )}
            <span 
              className={`relative z-10 h-9 w-9 flex-shrink-0 rounded-full border-2 flex items-center justify-center shadow-sm transition-all ${
                i <= idx ? "text-white border-transparent" : "text-gray-400 border-gray-300 bg-white"
              }`}
              style={{ backgroundColor: i <= idx ? PRIMARY : undefined }}
            >
              <s.icon className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-0 pt-1">
              <div className="text-sm font-semibold text-gray-900">{s.label}</div>
              {dates[s.key] && (
                <div className="text-xs text-gray-500 mt-1">{fmtDate(dates[s.key])}</div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ===== Main Page =====
export default function TrackPage() {
  const [bookingId, setBookingId] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState("form")
  const [mode, setMode] = useState("id")
  const [query, setQuery] = useState(null)
  const [resendTimer, setResendTimer] = useState(0)

  const { data, error, isValidating } = useSWR(
    query ? [query.type, query.value] : null,
    async ([type, value]) => await fetchBookings(type === "id" ? { id: value } : { phone: value })
  )

  const bookingsRaw = query ? (Array.isArray(data) ? data : data ? [data] : []) : dummyBookings
  const bookings = bookingsRaw.map(normalizeBooking)

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendTimer])

  const onTrack = () => {
    if (mode === "id" && bookingId.trim()) {
      setQuery({ type: "id", value: bookingId.trim().toUpperCase() })
      setStep("result")
    }
    if (mode === "phone" && phone.trim()) {
      setResendTimer(30)
      setStep("otp")
    }
  }

  const onVerifyOtp = () => {
    if (otp.trim() === "1234") {
      setQuery({ type: "phone", value: phone.trim() })
      setStep("result")
    } else {
      alert("Invalid OTP. Use 1234 for testing.")
    }
  }

  const onResendOtp = () => {
    setOtp("")
    setResendTimer(30)
    alert("OTP resent (1234 for testing).")
  }

  const onBack = () => {
    setStep("form")
    setOtp("")
    setQuery(null)
    setBookingId("")
    setPhone("")
  }

  const datesByStep = (b) => {
    const map = {}
    for (const h of b.history || []) {
      const k = normalizeStatus(h.status)
      const dt = safeDate(h.date)
      if (!map[k] && dt) map[k] = dt
    }
    return map
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <section className="text-center mb-8 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg shadow-lg p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-sm sm:text-base opacity-90 max-w-2xl mx-auto">
            Enter your tracking ID or mobile number to check parcel status and delivery info
          </p>
        </section>

        {/* Form */}
        {step === "form" && (
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Segmented 
                value={mode} 
                onChange={(v) => { setMode(v); setStep("form") }}
                options={[
                  { value: "id", label: "Tracking ID" }, 
                  { value: "phone", label: "Mobile Number" }
                ]} 
              />
              <div className="flex gap-2">
                <Input
                  className="flex-1 border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  value={mode === "id" ? bookingId : phone}
                  onChange={(e) => mode === "id" ? setBookingId(e.target.value.toUpperCase()) : setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onTrack()}
                  placeholder={mode === "id" ? "Enter Tracking ID" : "Enter Mobile Number"}
                />
                <Button
                  className="text-white px-6 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: PRIMARY }}
                  onClick={onTrack}
                  disabled={isValidating || (mode === "id" ? bookingId.length < 4 : phone.length < 10)}
                >
                  {isValidating ? (mode === "id" ? "Tracking..." : "Sending...") : (
                    mode === "id" ? (
                      <>
                        Track <Search className="ml-2 h-4 w-4" />
                      </>
                    ) : "Get OTP"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* OTP */}
        {step === "otp" && (
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="text-sm font-medium text-gray-700">
                OTP sent to <span className="font-semibold">{phone}</span>. Please enter below:
              </div>
              <Input 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter OTP"
                className="border-gray-300 focus:ring-2 focus:ring-orange-400"
              />
              <div className="flex justify-between items-center text-sm">
                {resendTimer > 0 ? (
                  <span className="text-gray-500">Resend OTP in {resendTimer}s</span>
                ) : (
                  <button 
                    className="font-medium hover:underline"
                    style={{ color: PRIMARY }}
                    onClick={onResendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={onBack} className="flex-1">
                  ← Back
                </Button>
                <Button 
                  className="flex-1 text-white hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}
                  onClick={onVerifyOtp}
                >
                  Verify & Track
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {step === "result" && !error && bookings.length > 0 && (
          <div className="space-y-6">
            <Button variant="outline" onClick={onBack} className="shadow-sm">
              ← Back to Search
            </Button>
            
            {isValidating && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: PRIMARY }}></div>
                <p className="mt-2 text-gray-600">Loading tracking information...</p>
              </div>
            )}
            
            {!isValidating && bookings.map((b, idx) => (
              <Card key={idx} className="shadow-lg border-gray-200 overflow-hidden">
                <CardContent className="p-0">
                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-6 bg-gray-50">
                    <SummaryChip label="Waybill Number" value={b.waybill} />
                    <SummaryChip label="Origin" value={b.origin} />
                    <SummaryChip label="Destination" value={b.destination} />
                    <SummaryChip label="Estimated Delivery" value={b.etd} />
                  </div>
                  
                  {/* Stepper */}
                  <div className="px-4 sm:px-6 bg-white">
                    <Stepper current={b.currentStatus} dates={datesByStep(b)} />
                  </div>
                  
                  {/* History */}
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <StatusTable rows={b.history} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === "result" && error && (
          <Card className="shadow-lg border-red-200">
            <CardContent className="p-6 text-center">
              <div className="text-red-600 font-medium mb-2">No results found</div>
              <p className="text-sm text-gray-600 mb-4">Try a different tracking ID or mobile number</p>
              <Button variant="outline" onClick={onBack}>← Back to Search</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
