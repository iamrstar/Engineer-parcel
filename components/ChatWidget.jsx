"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, 
  ChevronDown, Maximize2, Minimize2, Trash2, 
  PhoneCall, ExternalLink, ArrowRight, CornerDownLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_MESSAGE = {
  role: "assistant",
  content: `👋 **Hi! I am ParcelBot**, your EngineersParcel AI Assistant.\n\nI can help you with:\n• 📦 **Live tracking** for your active parcel\n• 💰 **Instant shipping rates** (OneBox Alpha ₹799 / Nova ₹1599)\n• 🎓 **Hostel & campus shifting** (IIT ISM rates ₹599 & ₹1149)\n• 📍 **Pincode serviceability** across 19,000+ codes\n\nHow can I help you today?`,
};

const SUGGESTIONS = [
  "Track my parcel 📦",
  "OneBox rates & sizes 💰",
  "IIT ISM campus special 🎓",
  "Check pincode delivery 📍",
  "Talk to human support 📞",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (customText) => {
    const textToSend = (typeof customText === "string" ? customText : input).trim();
    if (!textToSend || isLoading) return;

    const newMessages = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I am here to help!" },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered a brief connection error. You can reach our team directly on WhatsApp or Call at **+91 95258 01506**!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Basic markdown renderer for bold, lists, and links
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return lines.map((line, lineIdx) => {
      // Parse markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target={match[2].startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 underline font-semibold inline-flex items-center gap-1"
          >
            {match[1]}
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // Format bold text **word**
      const formattedParts = parts.map((part, pIdx) => {
        if (typeof part !== "string") return part;
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const subParts = [];
        let subLast = 0;
        let bMatch;

        while ((bMatch = boldRegex.exec(part)) !== null) {
          if (bMatch.index > subLast) {
            subParts.push(part.substring(subLast, bMatch.index));
          }
          subParts.push(
            <strong key={`b-${bMatch.index}`} className="font-bold text-white">
              {bMatch[1]}
            </strong>
          );
          subLast = bMatch.index + bMatch[0].length;
        }
        if (subLast < part.length) {
          subParts.push(part.substring(subLast));
        }
        return <span key={pIdx}>{subParts}</span>;
      });

      return (
        <p key={lineIdx} className={line.trim() === "" ? "h-2" : "mb-1 leading-relaxed"}>
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* ══════════ FLOATING LAUNCHER BUTTON ══════════ */}
      <div className="fixed bottom-24 right-6 z-[95]">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative group flex items-center gap-3 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all border border-white/20"
              aria-label="Open ParcelBot AI Assistant"
            >
              <div className="relative">
                <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-orange-600 animate-pulse" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-black tracking-wide leading-none uppercase">ParcelBot AI</p>
                <p className="text-[10px] text-orange-100 font-medium leading-tight">Instant shipping answers</p>
              </div>
              <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════ MAIN CHAT MODAL ══════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed z-[110] bg-gray-950/95 text-white backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "inset-4 sm:inset-10 rounded-[32px]"
                : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[640px] max-h-[85vh] rounded-[28px]"
            }`}
          >
            {/* ─── Header ─── */}
            <div className="relative p-4 sm:p-5 bg-gradient-to-r from-gray-900 via-gray-900 to-orange-950/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm tracking-wide text-white">ParcelBot AI</h3>
                    <span className="text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase">
                      Llama 3.3
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    EngineersParcel Live Assistant
                  </p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse" : "Maximize"}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors hidden sm:block"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ─── Messages Feed ─── */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm font-sans">
              {messages.map((msg, index) => {
                const isBot = msg.role === "assistant";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-white shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-gray-200 shadow-lg ${
                        isBot
                          ? "bg-white/5 border border-white/10 text-gray-200"
                          : "bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-br-none ml-auto"
                      }`}
                    >
                      {isBot ? renderFormattedText(msg.content) : <p>{msg.content}</p>}
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 mt-0.5 text-gray-300">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing Loader */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.3s]" />
                    <span className="text-xs text-gray-400 font-medium ml-1">ParcelBot is thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Suggested Quick Chips ─── */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-4 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item)}
                    className="shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 text-[11px] font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5"
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}

            {/* ─── Input Bar ─── */}
            <div className="p-3 sm:p-4 bg-gray-900/80 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything... e.g. Track EP123 or OneBox rate"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-40 disabled:hover:from-orange-500 disabled:hover:to-amber-500 text-white rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  Powered by <strong className="text-gray-400">Groq AI</strong>
                </span>
                <a
                  href="https://wa.me/919525801506?text=Hi%20EngineersParcel%2C%20I%20need%20assistance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
