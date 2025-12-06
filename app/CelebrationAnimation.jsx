"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

export default function CelebrationPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => setShow(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const confetti = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
  }))

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex justify-center items-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image src="/ism.jpg" alt="Background Image" fill className="object-cover" priority />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-400/70 via-orange-500/50 to-orange-400/70 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Confetti */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: `${conf.left}%`,
            top: "-10px",
            backgroundColor: ["#ff6b35", "#ffd60a", "#ff006e", "#fb5607"][conf.id % 4],
            animation: `fall ${conf.duration}s linear ${conf.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes riseFade {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-35vh); opacity: 0; }
        }
      `}</style>

      {/* POPUP CONTENT */}
      <div className="relative z-10 w-full h-full flex justify-center items-center px-4 sm:px-6">
        <div
          className="bg-gradient-to-br from-white/95 via-orange-50/90 to-white/90 shadow-2xl text-center border border-white/80 rounded-3xl
            w-full max-w-md p-8 md:p-12 flex flex-col justify-center items-center
            animate-in fade-in scale-in-95 duration-500"
          style={{ animation: "riseFade 4s forwards" }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-red-600" />
          </button>

          {/* TEXT */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 text-center mb-6 bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            Celebrating 100 Years of IIT ISM Dhanbad
          </h2>

          <div className="mb-6 text-6xl md:text-7xl animate-bounce">🎉</div>

          <p className="text-white font-semibold text-base md:text-lg mb-6">A Century of Excellence & Innovation</p>

          <div className="flex justify-center gap-3">
            <div className="w-4 h-4 bg-orange-600 rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
