"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919525801506"; 
  const telNumber = "+919525801506";
  const message = "Hi, I need a shipping quote from Engineers Parcel";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col gap-3"
          >
            <a
              href={`tel:${telNumber}`}
              className="flex items-center gap-3 px-5 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors hover:scale-105"
            >
              <span className="font-semibold text-sm">Call Us</span>
              <Phone className="w-5 h-5 fill-current" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors hover:scale-105"
            >
              <span className="font-semibold text-sm">WhatsApp</span>
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-16 h-16 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 ${
          isOpen ? "bg-gray-800" : "bg-gradient-to-r from-orange-500 to-orange-600"
        }`}
        aria-label="Contact Us"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-8 h-8 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Optional: Add a small pulse effect ring */}
        {!isOpen && <span className="absolute inset-0 rounded-full border-4 border-orange-500 animate-ping opacity-20 pointer-events-none"></span>}
      </button>
    </div>
  );
}
