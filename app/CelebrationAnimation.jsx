"use client"

import { useEffect, useState } from "react"
import { X, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CelebrationPopup() {
  const [show, setShow] = useState(false)
  const [countdown, setCountdown] = useState(8)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => setShow(false), 8000)
    const interval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Generate graduation hats that fly upward
  const hats = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    delay: Math.random() * 1.5,
    duration: 2.5 + Math.random() * 2,
    size: 20 + Math.random() * 16,
    rotate: -30 + Math.random() * 60,
  }))

  // Small confetti dots
  const confetti = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    color: ["#ea580c", "#f59e0b", "#8b5cf6", "#ec4899", "#10b981"][i % 5],
  }))

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-md"
        onClick={() => setShow(false)}
      />

      {/* Graduation hats flying upward */}
      {hats.map((hat) => (
        <div
          key={`hat-${hat.id}`}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${hat.left}%`,
            bottom: "-50px",
            fontSize: `${hat.size}px`,
            animation: `flyUp ${hat.duration}s ease-out ${hat.delay}s forwards`,
            transform: `rotate(${hat.rotate}deg)`,
          }}
        >
          🎓
        </div>
      ))}

      {/* Small confetti particles */}
      {confetti.map((c) => (
        <div
          key={`conf-${c.id}`}
          className="absolute w-2 h-2 rounded-full pointer-events-none z-20"
          style={{
            left: `${c.left}%`,
            bottom: "-10px",
            backgroundColor: c.color,
            animation: `flyUpConfetti ${c.duration}s ease-out ${c.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}

      <style>{`
        @keyframes flyUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes flyUpConfetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes popIn {
          0% { transform: scale(0.5) translateY(40px); opacity: 0; }
          50% { transform: scale(1.05) translateY(-5px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Popup Content */}
      <div className="relative z-30 w-full max-w-md mx-4">
        <div
          className="relative bg-white rounded-[32px] shadow-2xl overflow-hidden"
          style={{ animation: "popIn 0.6s ease-out forwards" }}
        >
          {/* Close button with circular timer */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-gray-100 transition-colors backdrop-blur-sm shadow-sm group"
            aria-label="Close"
          >
            {/* SVG circular progress ring */}
            <svg className="absolute inset-0 w-10 h-10 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="none" stroke="#f3f4f6" strokeWidth="2.5" />
              <circle
                cx="20" cy="20" r="17" fill="none" stroke="#ea580c" strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 17}`}
                strokeDashoffset={`${2 * Math.PI * 17 * (1 - countdown / 8)}`}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="relative text-xs font-black text-orange-600 group-hover:hidden">{countdown}</span>
            <X className="w-4 h-4 text-gray-500 relative hidden group-hover:block" />
          </button>

          {/* Top gradient band */}
          <div className="h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500" />

          {/* Content */}
          <div className="p-8 md:p-10 text-center">
            {/* Animated graduation cap */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div
                className="text-7xl"
                style={{ animation: "popIn 0.8s ease-out 0.3s both" }}
              >
                🎓
              </div>
            </div>

            {/* Main heading */}
            <h2
              className="text-3xl md:text-4xl font-black mb-3 leading-tight"
              style={{
                background: "linear-gradient(135deg, #ea580c 0%, #f59e0b 50%, #ea580c 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Graduated?
            </h2>

            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Time to move your stuff home!
            </p>

            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-xs mx-auto">
              Pack your hostel life into our boxes. We deliver your belongings safely to your doorstep.
            </p>

            {/* CTA Button */}
            <Link href="/campus-parcel" onClick={() => setShow(false)}>
              <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-lg py-4 px-8 rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                Book Campus Parcel
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-bold">1,200+ Students</span>
              </div>
              <div className="text-gray-200">|</div>
              <span className="font-bold">Starting ₹299/box</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
