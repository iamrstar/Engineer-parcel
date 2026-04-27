"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Instagram, Clock, Sparkles, Package, Loader2, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function Maintenance() {
    const [timeLeft, setTimeLeft] = useState(19 * 3600); // 19 hours in seconds
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return {
            h: String(h).padStart(2, '0'),
            m: String(m).padStart(2, '0'),
            s: String(s).padStart(2, '0')
        };
    };

    const time = formatTime(timeLeft);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#0a0a0a_100%)] z-[-1]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl w-full z-10"
            >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden border-0">
                    <CardContent className="p-8 md:p-12 text-center flex flex-col items-center">
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase"
                        >
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Operations Temporarily Paused
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight text-white"
                        >
                            We're Coming Back <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                                Very Soon.
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4 mb-10"
                        >
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                                Due to <span className="text-white font-semibold">exceptionally high demand</span>, we are currently focusing all our resources on processing the massive influx of orders.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-amber-500 font-medium italic">
                                <Sparkles className="w-4 h-4" />
                                <span>Ensuring every delivery is perfect.</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 opacity-50" />
                            
                            <p className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Estimated Return In</p>
                            
                            <div className="flex items-center justify-center gap-4 md:gap-8">
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl md:text-6xl font-black text-white tabular-nums">{time.h}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Hours</span>
                                </div>
                                <span className="text-3xl md:text-5xl font-black text-orange-500/50 mb-6">:</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl md:text-6xl font-black text-white tabular-nums">{time.m}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Minutes</span>
                                </div>
                                <span className="text-3xl md:text-5xl font-black text-orange-500/50 mb-6">:</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl md:text-6xl font-black text-white tabular-nums">{time.s}</span>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Seconds</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                                <Button 
                                    asChild
                                    variant="outline"
                                    className="w-full sm:w-auto h-14 px-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-2xl transition-all group"
                                >
                                    <Link href="https://www.instagram.com/engineersparcel/" target="_blank">
                                        <Instagram className="mr-2 h-5 w-5 text-pink-500 group-hover:scale-110 transition-transform" />
                                        Follow for Updates
                                    </Link>
                                </Button>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                                <Button 
                                    className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-0 rounded-2xl shadow-lg shadow-orange-900/20 transition-all group"
                                >
                                    <Rocket className="mr-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Get Notified
                                </Button>
                            </motion.div>
                        </div>

                    </CardContent>
                </Card>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-gray-500 text-sm mt-8"
                >
                    &copy; 2026 Engineers Parcel. All rights reserved.
                </motion.p>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[10%] opacity-10"
                >
                    <Package size={80} />
                </motion.div>
                <motion.div
                    animate={{ 
                        y: [0, 20, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[20%] right-[10%] opacity-10"
                >
                    <Clock size={80} />
                </motion.div>
            </div>
        </div>
    )
}
