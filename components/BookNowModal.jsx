"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Package, Truck, GraduationCap, MapPin, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const options = [
  {
    id: "courier",
    title: "Courier / Document",
    description: "Fast delivery for documents and small parcels.",
    icon: <Package className="w-8 h-8 text-orange-500" />,
    path: "/booking?service=courier",
    color: "bg-orange-50",
    hoverColor: "hover:bg-orange-100",
    borderColor: "border-orange-200",
    badge: "Popular"
  },
  {
    id: "local",
    title: "Local Parcel (Same Day)",
    description: "Lightning-fast same-day delivery within the city.",
    icon: <MapPin className="w-8 h-8 text-blue-500" />,
    path: "/booking?service=local",
    color: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
    borderColor: "border-blue-200",
    badge: "Fast"
  },
  {
    id: "shifting",
    title: "House / Office Shifting",
    description: "Comprehensive relocation services for large items.",
    icon: <Truck className="w-8 h-8 text-green-500" />,
    path: "/booking?service=shifting",
    color: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    borderColor: "border-green-200"
  },
  {
    id: "campus",
    title: "Campus Parcel",
    description: "Specialized service for students moving out.",
    icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
    path: "/campus-parcel",
    color: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
    borderColor: "border-purple-200"
  }
];

export default function BookNowModal({ isOpen, onClose }) {
  const router = useRouter();

  const handleSelect = (path) => {
    onClose();
    router.push(path);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
        <div className="p-8 pb-6 border-b border-gray-100 bg-gradient-to-br from-orange-50 via-white to-orange-50/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-3xl font-black text-gray-900 text-center flex items-center justify-center gap-2">
              <Zap className="w-8 h-8 text-orange-500" />
              What would you like to send?
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 text-lg mt-2">
              Select a service that best fits your needs to continue
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
          {options.map((option, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={option.id}
            >
              <button
                onClick={() => handleSelect(option.path)}
                className={`w-full text-left p-6 rounded-2xl border ${option.borderColor} ${option.color} ${option.hoverColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex items-start gap-5 relative overflow-hidden`}
              >
                <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{option.title}</h3>
                    {option.badge && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
