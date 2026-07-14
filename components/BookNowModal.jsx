"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Package, Truck, GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const options = [
  {
    id: "courier",
    title: "Courier / Document",
    description: "Fast delivery for documents and small parcels.",
    icon: <Package className="w-8 h-8 text-orange-500" />,
    path: "/city-parcel",
    color: "bg-orange-50",
    hoverColor: "hover:bg-orange-100",
    borderColor: "border-orange-200"
  },
  {
    id: "local",
    title: "Local Parcel (Same Day)",
    description: "Lightning-fast same-day delivery within the city.",
    icon: <MapPin className="w-8 h-8 text-blue-500" />,
    path: "/city-parcel",
    color: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
    borderColor: "border-blue-200"
  },
  {
    id: "shifting",
    title: "House / Office Shifting",
    description: "Comprehensive relocation services for large items.",
    icon: <Truck className="w-8 h-8 text-green-500" />,
    path: "/services", // the user can go to services page or a dedicated shifting page
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
        <div className="p-8 pb-6 border-b border-gray-100 bg-gray-50">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-gray-900 text-center">
              What would you like to send?
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 text-lg mt-2">
              Select a service that best fits your needs
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
                className={`w-full text-left p-6 rounded-2xl border ${option.borderColor} ${option.color} ${option.hoverColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col items-start gap-4 h-full`}
              >
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
