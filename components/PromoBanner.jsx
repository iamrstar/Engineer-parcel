"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BANNERS = [
  { id: 1, src: "/rakhi-01.PNG", alt: "Rakhi Promotion" },
  // Add more banners here to enable the auto-sliding effect
];

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (BANNERS.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));

  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
        <div className="relative w-full aspect-[4/1] rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-orange-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={BANNERS[currentIndex].src}
                alt={BANNERS[currentIndex].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls - Only show if >1 banner */}
        {BANNERS.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-800 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-800 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
