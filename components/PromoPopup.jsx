"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [stage, setStage] = useState("hidden"); // "hidden" | "countdown" | "presenting" | "main"
    const [count, setCount] = useState(3);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
            setStage("countdown");
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (stage === "countdown") {
            if (count > 0) {
                const timer = setTimeout(() => setCount(c => c - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setStage("presenting");
            }
        }
    }, [stage, count]);

    useEffect(() => {
        if (stage === "presenting") {
            const timer = setTimeout(() => setStage("main"), 3000);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAction = () => {
        handleClose();
        router.push("/city-parcel");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={`fixed inset-0 z-[100] flex items-center justify-center ${stage === "main" ? "p-4 sm:px-0" : "p-0"}`}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`relative z-10 overflow-hidden shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            stage === "main"
                                ? "w-full max-w-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-white/10 h-auto"
                                : "w-full h-full bg-black flex flex-col items-center justify-center rounded-none border-none"
                        }`}
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-orange-500/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                        {/* Close Button */}
                        {stage === "main" && (
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 hover:text-white transition-colors z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        {stage === "countdown" && (
                            <div className="p-16 flex items-center justify-center min-h-[300px]">
                                <motion.div
                                    key={count}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-[12rem] md:text-[20rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
                                >
                                    {count}
                                </motion.div>
                            </div>
                        )}

                        {stage === "presenting" && (
                            <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px] z-10 relative">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="max-w-4xl"
                                >
                                    <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
                                        Presenting <span className="text-orange-500">OneBox</span>
                                    </h2>
                                    <p className="text-2xl md:text-4xl text-gray-400 font-medium leading-relaxed">
                                        The unique segment of India which makes logistics <span className="text-white">easier.</span>
                                    </p>
                                </motion.div>
                            </div>
                        )}

                        {stage === "main" && (
                            <div className="p-8 sm:p-10 text-center relative z-10">
                                {/* Icon / Badge */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 mb-6 rotate-3"
                                >
                                    <Package className="w-10 h-10 text-white" />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest"
                                >
                                    <Zap className="w-3 h-3" />
                                    Limited Time Offer
                                </motion.div>

                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight"
                                >
                                    Ship Anything. <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                                        Anywhere from Dhanbad.
                                    </span>
                                </motion.h2>

                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-gray-400 text-base sm:text-lg mb-8 max-w-sm mx-auto"
                                >
                                    Introducing <span className="text-orange-500 font-bold">OneBox</span>. One box. One price. Anywhere. Ship anything up to 30kg at just <strong className="text-white">₹999</strong>.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Button 
                                        onClick={handleAction}
                                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/25 transition-all group"
                                    >
                                        Get Your OneBox Now
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                                
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-4 text-xs text-gray-500"
                                >
                                    *T&C Apply. Applicable for Dhanbad pickups only.
                                </motion.p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
