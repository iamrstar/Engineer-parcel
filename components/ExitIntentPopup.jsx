"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if already seen in this session
    if (sessionStorage.getItem("exitIntentSeen")) {
      return;
    }

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves out from the top of the viewport
      if (e.clientY <= 0) {
        setShowPopup(true);
        sessionStorage.setItem("exitIntentSeen", "true");
        // Remove listener after triggering once
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;

    setIsSubmitting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await axios.post(`${API_URL}/api/leads`, {
        phone,
        source: "Exit Intent",
        details: { message: "10% off first shipment claimed" }
      });
      setIsSuccess(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border-4 border-orange-500 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
        
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10 text-center">
          {!isSuccess ? (
            <>
              <div className="inline-block bg-orange-100 text-orange-600 font-black px-4 py-1 rounded-full text-sm mb-4">
                WAIT! DON'T LEAVE YET
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
                Get <span className="text-orange-600">10% OFF</span> Your First Shipment
              </h2>
              <p className="text-gray-500 mb-6 font-medium">
                Enter your number below to claim your discount. We'll send you the promo code immediately.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="tel"
                  placeholder="Enter your phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-14 text-center text-lg font-bold border-2 focus-visible:ring-orange-500"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !phone}
                  className="w-full h-14 text-lg font-bold bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center">
                      Claim 10% Discount <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-4">
                No spam, we promise. Only logistics excellence.
              </p>
            </>
          ) : (
            <div className="py-8 animate-in zoom-in duration-300">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-gray-900 mb-2">Discount Claimed!</h2>
              <p className="text-gray-500">Our team will contact you shortly with your exclusive code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
