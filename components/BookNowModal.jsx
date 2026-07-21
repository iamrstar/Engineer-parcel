"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Package, Truck, GraduationCap, MapPin, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const options = [
  {
    id: "courier",
    title: "Courier / Document",
    description: "Fast delivery for documents and small parcels.",
    icon: <Package className="w-6 h-6 text-orange-500" />,
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
    icon: <MapPin className="w-6 h-6 text-blue-500" />,
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
    icon: <Truck className="w-6 h-6 text-green-500" />,
    path: "/booking?service=shifting",
    color: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    borderColor: "border-green-200"
  },
  {
    id: "campus",
    title: "Campus Parcel",
    description: "Specialized service for students moving out.",
    icon: <GraduationCap className="w-6 h-6 text-purple-500" />,
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
      <DialogContent className="max-w-[92vw] sm:max-w-lg bg-white p-0 overflow-hidden rounded-2xl sm:rounded-[2rem] border-none shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="p-5 sm:p-6 pb-4 border-b border-gray-100 bg-gradient-to-br from-orange-50 via-white to-orange-50/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl sm:text-2xl font-black text-gray-900 text-center flex items-center justify-center gap-2">
              <Zap className="w-6 h-6 text-orange-500 shrink-0" />
              What would you like to send?
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 text-sm sm:text-base mt-1">
              Select a service that best fits your needs
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white">
          {options.map((option, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              key={option.id}
            >
              <button
                onClick={() => handleSelect(option.path)}
                className={`w-full text-left p-4 rounded-xl border ${option.borderColor} ${option.color} ${option.hoverColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group flex items-center gap-3 relative overflow-hidden`}
              >
                <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{option.title}</h3>
                    {option.badge && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[9px] font-black uppercase tracking-widest rounded-full shrink-0">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-snug line-clamp-2">{option.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
