"use client"

import { useState, useEffect, Suspense } from "react"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, Building2, MapPin, CheckCircle2, Check, Search, ArrowLeft, ArrowRight, Clock, ShieldCheck } from "lucide-react"

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
  return dt ? dt.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : "-"
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
  <div className="inline-flex rounded-2xl bg-gray-100 p-1 w-full sm:w-auto mb-6">
    {options.map((opt) => {
      const active = value === opt.value
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${active ? "bg-white text-orange-600 shadow-lg" : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {opt.label}
        </button>
      )
    })}
  </div>
)

const SummaryChip = ({ label, value, icon: Icon }) => (
  <div className="rounded-[2rem] border-2 border-gray-50 bg-white/50 backdrop-blur-md px-6 py-5 shadow-xl shadow-gray-200/40 relative overflow-hidden group hover:border-orange-100 transition-all duration-300">
    <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-orange-100 transition-colors" />
    <div className="flex items-center gap-4 relative z-10">
      <div className="p-3 bg-gray-100 rounded-2xl group-hover:bg-orange-100 transition-colors">
        <Icon className="h-5 w-5 text-gray-500 group-hover:text-orange-600" />
      </div>
      <div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">{label}</div>
        <div className="text-sm font-black text-gray-900 leading-tight">{value}</div>
      </div>
    </div>
  </div>
)

function StatusTable({ rows = [] }) {
  return (
    <div className="rounded-[2.5rem] bg-white shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-between">
        <h3 className="font-black text-white uppercase tracking-widest text-sm flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-500" /> Full Tracking History
        </h3>
        <span className="bg-orange-500/10 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full border border-orange-500/20 uppercase">
          {rows.length} Updates
        </span>
      </div>

      {/* Timeline */}
      <div className="p-8 sm:p-10">
        {rows.length ? (
          <div className="space-y-10">
            {rows.map((r, i) => {
              const isDelivered = r.status?.toLowerCase().includes("delivered")
              const isLast = i === rows.length - 1
              const iconStyle = isDelivered
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : i === 0
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "bg-gray-100 text-gray-400"

              return (
                <div key={i} className="relative flex gap-6">
                  {/* Vertical line */}
                  {!isLast && (
                    <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-100" />
                  )}

                  {/* Icon circle */}
                  <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-2xl ${iconStyle} flex items-center justify-center transition-all duration-500 transform hover:rotate-6`}>
                    {isDelivered ? <CheckCircle2 className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className={`inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl ${isDelivered ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                        {r.status || "-"}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100/50">
                        {fmtDate(r.date)}
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-orange-200 transition-all duration-300">
                      <div className="text-sm font-bold text-gray-800 leading-relaxed">
                        {r.event || "-"}
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 text-gray-500">
                        <MapPin className="h-3 w-3 text-orange-400" />
                        <span className="text-xs font-black uppercase tracking-widest leading-none">{r.location || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
              <ShieldCheck className="h-10 w-10 text-gray-200" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Awaiting Updates</h3>
            <p className="text-gray-400 font-medium max-w-xs mx-auto mt-2">No tracking updates recorded for this parcel yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

const Stepper = ({ current = "IN_TRANSIT", dates = {} }) => {
  const steps = [
    { key: "CONFIRMED", label: "BOOKED", icon: Package },
    { key: "IN_TRANSIT", label: "TRANSIT", icon: Truck },
    { key: "ARRIVED_AT_DESTINATION", label: "ARRIVED", icon: Building2 },
    { key: "OUT_FOR_DELIVERY", label: "OUT FOR DELIVERY", icon: MapPin },
    { key: "DELIVERED", label: "DELIVERED", icon: CheckCircle2 },
  ]

  const idx = Math.max(0, steps.findIndex((s) => s.key === current))

  return (
    <div className="w-full py-12">
      <div className="flex justify-between items-center relative">
        {/* Background Line */}
        <div className="absolute left-[20px] right-[20px] top-[24px] h-1.5 bg-gray-100 rounded-full" />

        {/* Progress Line */}
        <div
          className="absolute left-[20px] top-[24px] h-1.5 rounded-full transition-all duration-1000 ease-in-out shadow-lg"
          style={{
            backgroundColor: PRIMARY,
            width: `calc(${(idx / (steps.length - 1)) * 100}% - 40px)`,
            boxShadow: `0 0 15px ${PRIMARY}40`
          }}
        />

        {steps.map((s, i) => {
          const isActive = i <= idx
          const isCurrent = i === idx
          return (
            <div key={s.key} className="relative z-10 flex flex-col items-center flex-1">
              <div
                className={`h-12 w-12 rounded-2xl flex items-center justify-center border-4 shadow-2xl transition-all duration-500 transform ${isActive
                  ? "text-white scale-110 rotate-3"
                  : "text-gray-400 border-white bg-gray-50 scale-90"
                  }`}
                style={{
                  backgroundColor: isActive ? PRIMARY : undefined,
                  borderColor: i < idx ? PRIMARY : 'white',
                  animation: isCurrent ? 'pulse-orange 2s infinite' : 'none'
                }}
              >
                <s.icon className={`h-5 w-5 ${isCurrent ? 'animate-bounce' : ''}`} />
              </div>
              <div className={`mt-4 text-[10px] font-black tracking-[0.15em] uppercase text-center transition-colors duration-300 ${isActive ? "text-orange-600" : "text-gray-400"
                }`}>
                {s.label}
              </div>
              {dates[s.key] && (
                <div className="mt-1.5 px-2 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 whitespace-nowrap">
                  {new Date(dates[s.key]).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <style jsx>{`
            @keyframes pulse-orange {
                0% { box-shadow: 0 0 0 0 rgba(235, 90, 12, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(235, 90, 12, 0); }
                100% { box-shadow: 0 0 0 0 rgba(235, 90, 12, 0); }
            }
        `}</style>
    </div>
  )
}

// ===== Main Page Content =====
function TrackContent() {
  const searchParams = useSearchParams()
  const urlId = searchParams.get("id")

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

  // Auto-track if ID is in URL
  useEffect(() => {
    if (urlId) {
      const cleanId = urlId.trim().toUpperCase()
      setBookingId(cleanId)
      setQuery({ type: "id", value: cleanId })
      setStep("result")
    }
  }, [urlId])

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
    <main className="min-h-screen w-full bg-gray-50 pb-20">
      <div className="w-full max-w-5xl mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <section className="text-center mb-12 relative">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse">
            Real-Time Monitoring
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-none mb-4">
            Track Your <span className="text-orange-600">Parcel</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
            Get comprehensive updates on your shipment's journey from pickup to doorstep.
          </p>
        </section>

        {/* Form */}
        {step === "form" && (
          <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white/70 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)]">
            <CardContent className="p-10 sm:p-14 text-center">
              <Segmented
                value={mode}
                onChange={(v) => { setMode(v); setStep("form") }}
                options={[
                  { value: "id", label: "Tracking ID" },
                  { value: "phone", label: "Mobile Number" }
                ]}
              />
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 bg-orange-50 p-2 rounded-xl group-focus-within:bg-orange-600 group-focus-within:text-white transition-all duration-300">
                    <Search className="h-4 w-4" />
                  </div>
                  <Input
                    className="h-16 pl-16 rounded-2xl border-gray-100 bg-gray-50/50 text-lg font-bold placeholder:text-gray-300 focus:bg-white focus:border-orange-500 transition-all duration-300"
                    value={mode === "id" ? bookingId : phone}
                    onChange={(e) => mode === "id" ? setBookingId(e.target.value.toUpperCase()) : setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onTrack()}
                    placeholder={mode === "id" ? "EP123456" : "9876543210"}
                  />
                </div>
                <Button
                  className="h-16 px-10 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest shadow-2xl shadow-orange-600/30 transition-all active:scale-95 disabled:opacity-50"
                  onClick={onTrack}
                  disabled={isValidating || (mode === "id" ? bookingId.length < 4 : phone.length < 10)}
                >
                  {isValidating ? "Loading..." : "Track Now"}
                </Button>
              </div>
              <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Safe & Secure Tracking • 24/7 Updates
              </p>
            </CardContent>
          </Card>
        )}

        {/* OTP */}
        {step === "otp" && (
          <Card className="border-none shadow-2xl rounded-[3rem] max-w-md mx-auto overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardContent className="p-10 space-y-8 text-center">
              <div>
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Verify Identity</h3>
                <p className="text-sm text-gray-500 font-medium">
                  We've sent a code to <span className="text-orange-600 font-bold">{phone}</span>
                </p>
              </div>

              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit OTP"
                className="h-16 text-center text-3xl font-black tracking-[0.5em] rounded-2xl border-gray-100 bg-gray-50/50"
              />

              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                {resendTimer > 0 ? (
                  <span className="text-gray-400">Resend in {resendTimer}s</span>
                ) : (
                  <button className="text-orange-600 hover:underline" onClick={onResendOtp}>Resend Now</button>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={onBack} className="flex-1 h-14 rounded-xl font-bold text-gray-500 capitalize">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button
                  className="flex-[2] h-14 rounded-2xl bg-orange-600 text-white font-black uppercase tracking-widest shadow-xl shadow-orange-600/20"
                  onClick={onVerifyOtp}
                >
                  Confirm <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {step === "result" && !error && bookings.length > 0 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-orange-50 text-orange-600 font-black uppercase tracking-widest text-[11px] rounded-xl px-4 py-2"
            >
              <ArrowLeft className="mr-2 h-3 w-3" /> Search Another
            </Button>

            {isValidating && (
              <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-orange-600"></div>
                <p className="mt-4 text-gray-400 font-black uppercase tracking-widest text-xs">Syncing status...</p>
              </div>
            )}

            {!isValidating && bookings.map((b, idx) => (
              <div key={idx} className="space-y-8">
                {/* Visual Status Container */}
                <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32" />
                  <CardContent className="p-0 relative z-10">
                    {/* Summary Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 sm:p-10 bg-gray-50/50">
                      <SummaryChip label="Waybill" value={b.waybill} icon={Package} />
                      <SummaryChip label="Origin" value={b.origin} icon={MapPin} />
                      <SummaryChip label="Destination" value={b.destination} icon={ArrowRight} />
                      <SummaryChip label="Estimated" value={b.etd} icon={Clock} />
                    </div>

                    {/* Stepper Container */}
                    <div className="px-8 sm:px-14 py-4">
                      <Stepper current={b.currentStatus} dates={datesByStep(b)} />
                    </div>
                  </CardContent>
                </Card>

                {/* History */}
                <StatusTable rows={b.history} />
              </div>
            ))}
          </div>
        )}

        {step === "result" && error && (
          <Card className="border-none shadow-2xl rounded-[3rem] py-16 text-center max-w-2xl mx-auto bg-white">
            <CardContent className="space-y-6">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-10 w-10 font-bold" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">Tracking Failed</h3>
                <p className="text-gray-500 font-medium">We couldn't find any parcel matching your search details.</p>
              </div>
              <Button
                onClick={onBack}
                className="bg-gray-900 text-white rounded-2xl h-14 px-10 font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

// ===== Main Page =====
export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-100 border-t-orange-600"></div>
      </div>
    }>
      <TrackContent />
    </Suspense>
  )
}

function AlertCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}
