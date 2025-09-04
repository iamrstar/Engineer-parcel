"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, Building2, MapPin, CheckCircle2, Check } from "lucide-react"

const PRIMARY = "#eb5a0c"
const API = process.env.NEXT_PUBLIC_API_URL

// ===== Dummy Data (for fallback) =====
const dummyBookings = [
  {
    bookingId: "EP123456",
    senderDetails: { city: "Kolkata" },
    receiverDetails: { city: "Delhi" },
    status: "Out for Delivery",
    trackingHistory: [
      { status: "CONFIRMED", timestamp: "2025-08-20T10:00:00Z", description: "Order confirmed at Kolkata Hub" },
      { status: "IN_TRANSIT", timestamp: "2025-08-21T15:00:00Z", description: "Left Kolkata facility" },
      { status: "ARRIVED_AT_DESTINATION", timestamp: "2025-08-23T09:30:00Z", description: "Arrived at Delhi Hub" },
      { status: "OUT_FOR_DELIVERY", timestamp: "2025-08-24T08:00:00Z", description: "Courier out for delivery" },
    ]
  },
  {
    bookingId: "EP654321",
    senderDetails: { city: "Bangalore" },
    receiverDetails: { city: "Mumbai" },
    status: "In Transit",
    trackingHistory: [
      { status: "CONFIRMED", timestamp: "2025-08-18T12:00:00Z", description: "Order confirmed at Bangalore Hub" },
      { status: "IN_TRANSIT", timestamp: "2025-08-19T18:00:00Z", description: "Left Bangalore facility" },
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
  const hist = Array.isArray(b.trackingHistory)
    ? b.trackingHistory
    : []
  const history = hist.map((h) => ({
    status: h.status || h.event || "-",
    date: h.timestamp || h.date || h.createdAt || null,
    event: h.description || h.details || h.message || [h.location, h.remark].filter(Boolean).join(" - ") || h.status || "-",
  }))
  const currentStatus = normalizeStatus(
    b.status || history[history.length - 1]?.status || ""
  )
  return { id: waybill, waybill, origin, destination, currentStatus, history }
}

// ===== UI Components =====
const Segmented = ({ value, onChange, options }) => (
  <div className="inline-flex rounded-md border overflow-hidden">
    {options.map((opt) => {
      const active = value === opt.value
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-sm font-medium ${active ? "text-white" : "bg-background text-foreground hover:bg-muted/60"}`}
          style={{ backgroundColor: active ? PRIMARY : undefined }}
        >{opt.label}</button>
      )
    })}
  </div>
)

const SummaryChip = ({ label, value }) => (
  <div className="rounded-md border px-3 py-2">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-sm font-medium">{value}</div>
  </div>
)

const MultipleResults = ({ list, onPick }) => (
  <div className="px-4 pb-4">
    <div className="text-sm font-medium mb-2">Select a booking</div>
    <div className="grid gap-2">
      {list.map((b, i) => (
        <button key={b.waybill || i} onClick={() => onPick(i)}
          className="text-left border rounded-md px-3 py-2 hover:bg-muted/60">
          <div className="text-sm font-medium">{b.waybill}</div>
          <div className="text-xs text-muted-foreground">{b.origin} → {b.destination}</div>
        </button>
      ))}
    </div>
  </div>
)

// status of the the order 
function StatusTable({ rows = [] }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <br />
      <div className="px-4 py-3 border-b bg-orange-600">
        <h3 className=" flex justify-center items-center   font-semibold text-gray-700">Tracking History</h3>
      </div>

      {/* Timeline */}
      <div className="p-6 space-y-8 relative">
        {rows.length ? (
          rows.map((r, i) => {
            const isDelivered = r.status?.toLowerCase().includes("delivered");
            const lineColor = isDelivered ? "bg-green-500" : "bg-orange-500";
            const dotColor = isDelivered
              ? "border-green-500 bg-green-50"
              : "border-orange-500 bg-orange-50";
            const iconColor = isDelivered ? "text-green-500" : "text-orange-700";

            return (
              <div key={i} className="relative p-20">
                {/* vertical line */}
                {i !== rows.length - 1 && (
                  <div
                    className={`absolute left-[18px] top-6 bottom-0 w-[2px] bg-green  ${lineColor}`}
                  />
                )}

                {/* circle + check */}
                <div
                >
                  <Check className={`h-4  w-4 ${iconColor}`} />
                </div>

                {/* content */}
                <div className="ml-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"}`}
                  >
                    {r.status || "-"}
                  </span>

                  <div className="mt-1 text-sm font-medium text-gray-700">
                    {r.event || r.location || "-"}
                  </div>

                  <div className="text-xs text-gray-500">{fmtDate(r.date)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 text-center">
            No tracking updates yet
          </div>
        )}
      </div>
    </div>
  );
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
    { key: "CONFIRMED", label: "CONFIRMED", icon: Package },
    { key: "IN_TRANSIT", label: "IN TRANSIT", icon: Truck },
    { key: "ARRIVED_AT_DESTINATION", label: "ARRIVED AT DESTINATION", icon: Building2 },
    { key: "OUT_FOR_DELIVERY", label: "OUT FOR DELIVERY", icon: MapPin },
    { key: "DELIVERED", label: "DELIVERED", icon: CheckCircle2 },
  ]

  const idx = Math.max(0, steps.findIndex((s) => s.key === current))

  if (isLarge) return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] flex justify-between items-center relative px-2 py-6">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 rounded-full" />
        {steps.map((s, i) => (
          <div key={s.key} className="relative z-10 flex flex-col items-center w-1/5">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 shadow-md ${i <= idx ? "text-white" : "text-gray-500"}`}
              style={{ backgroundColor: i <= idx ? PRIMARY : "#f3f4f6" }}>
              <s.icon className="h-5 w-5" />
            </div>
            <span className="mt-2 text-[10px] sm:text-xs font-semibold text-center">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="relative pl-6 py-2">
      <div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-200 rounded" />
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={s.key} className="relative flex items-start gap-3">
            <span className={`relative z-10 h-9 w-9 rounded-full border grid place-items-center shadow-sm ${i <= idx ? "text-white" : "text-foreground"}`}
              style={{ backgroundColor: i <= idx ? PRIMARY : "#f3f4f6" }}>
              <s.icon className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold leading-tight">{s.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{fmtDate(dates?.[s.key])}</div>
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
  const [step, setStep] = useState("form") // form | otp | result
  const [mode, setMode] = useState("id")
  const [query, setQuery] = useState(null)
  const [otpSent, setOtpSent] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const { data, error, isValidating } = useSWR(query ? [query.type, query.value] : null,
    async ([type, value]) => await fetchBookings(type === "id" ? { id: value } : { phone: value })
  )

  const bookingsRaw = query ? (Array.isArray(data) ? data : data ? [data] : []) : dummyBookings
  const bookings = bookingsRaw.map(normalizeBooking)

  // OTP timer
  useEffect(() => { if (resendTimer > 0) { const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000); return () => clearTimeout(t) } }, [resendTimer])

  const onTrack = () => {
    if (mode === "id" && bookingId.trim()) setQuery({ type: "id", value: bookingId.trim().toUpperCase() }) || setStep("result")
    if (mode === "phone" && phone.trim()) { setOtpSent(true); setResendTimer(30); setStep("otp") }
  }

  const onVerifyOtp = () => {
    if (otp.trim() === "1234") { setQuery({ type: "phone", value: phone.trim() }); setStep("result") }
    else alert("Invalid OTP. Use 1234 for testing.")
  }

  const onResendOtp = () => { setOtp(""); setResendTimer(30); alert("OTP resent (1234 for testing).") }

  const onBack = () => {
    setStep("form"); setOtp(""); setOtpSent(false); setQuery(null); setBookingId(""); setPhone("")
  }

  const datesByStep = (b) => {
    const map = {}
    for (const h of b.history || []) {
      const k = normalizeStatus(h.status); const dt = safeDate(h.date)
      if (!map[k] && dt) map[k] = dt
    }
    return map
  }

  return (
    <main className="min-h-dvh w-full flex justify-center py-8 px-4">
      <div className="w-full max-w-4xl space-y-4">
        {/* ==== Form ==== */}
        {step === "form" && (
          <Card><CardContent className="space-y-4">
            <Segmented value={mode} onChange={(v) => { setMode(v); setOtpSent(false); setStep("form") }}
              options={[{ value: "id", label: "Tracking ID" }, { value: "phone", label: "Mobile" }]} />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
              <Input className="uppercase" value={mode === "id" ? bookingId : phone}
                onChange={(e) => mode === "id" ? setBookingId(e.target.value.toUpperCase()) : setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onTrack()}
                placeholder={mode === "id" ? "ENTER TRACKING ID" : "Enter Mobile Number"} />
              <Button style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }} className="text-white w-full" onClick={onTrack}>
                {isValidating ? (mode === "id" ? "Tracking..." : "Sending OTP...") : (mode === "id" ? "TRACK" : "GET OTP & TRACK")}
              </Button>
            </div>
          </CardContent></Card>
        )}

        {/* ==== OTP ==== */}
        {step === "otp" && (
          <Card><CardContent className="space-y-4">
            <div className="text-sm font-medium">OTP sent to {phone}. Please enter below:</div>
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              {resendTimer > 0 ? <span>Resend OTP in {resendTimer}s</span> : <button className="text-orange-500 font-medium" onClick={onResendOtp}>Resend OTP</button>}
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={onBack} className="w-full">← Back</Button>
              <Button style={{ backgroundColor: PRIMARY, borderColor: PRIMARY }} className="text-white w-full" onClick={onVerifyOtp}>VERIFY & TRACK</Button>
            </div>
          </CardContent></Card>
        )}

        {/* ==== Results ==== */}
        {step === "result" && bookings.length > 0 && (
          <div className="space-y-4">
            <Button variant="outline" onClick={onBack}>← Back</Button>
            {bookings.map((b, idx) => (
              <div key={idx} className="rounded-md border overflow-hidden mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
                  <SummaryChip label="WAYBILL NUMBER" value={b.waybill} />
                  <SummaryChip label="ORIGIN" value={b.origin} />
                  <SummaryChip label="DESTINATION" value={b.destination} />
                </div>
                <div className="px-4 pb-2"><Stepper current={b.currentStatus} dates={datesByStep(b)} /></div>
                <div className="px-4 pb-4"><StatusTable rows={b.history} /></div>
              </div>
            ))}
          </div>
        )}

        {step === "result" && error && <div className="text-red-600 mt-2">No results found. Try a different ID or mobile.</div>}
      </div>
    </main>
  )
}
