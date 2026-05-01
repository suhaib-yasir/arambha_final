import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Gift } from "lucide-react";
import referralImg from "../assets/refferals/offer_code.png";

export default function ReferralPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [closeCount, setCloseCount] = useState(0);

  useEffect(() => {
    // If the user has closed the popup 2 times, don't start any timers
    if (closeCount >= 2) return;

    // Initial delay before first show
    const initialDelay = setTimeout(() => {
      if (closeCount < 2) setIsVisible(true);
    }, 5000);

    // Regular interval to show every 30 seconds
    const interval = setInterval(() => {
      if (closeCount < 2) {
        setIsVisible(true);
      }
    }, 30000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [closeCount]);

  const closePopup = () => {
    setIsVisible(false);
    setCloseCount(prev => prev + 1);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(10px)" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.6 
            }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(27,43,72,0.3)] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 z-20 p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-slate-500 hover:text-slate-800 hover:rotate-90"
            >
              <X size={20} />
            </button>

            {/* Left Content */}
            <div className="flex-[1.2] p-8 sm:p-14 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl sm:text-5xl font-serif font-black text-primary mb-6 flex items-center gap-3 italic">
                  Referral Offer <Gift className="text-accent-gold" size={40} />
                </h2>
                
                <p className="text-xl sm:text-2xl text-on-surface-variant mb-8 leading-relaxed font-sans">
                  <span className="font-extrabold text-primary">New here?</span> Sign up now and enjoy <span className="text-accent-gold font-extrabold bg-accent-gold/5 px-2 py-1 rounded-lg">33% off</span> on your first enrollment.
                </p>

                <div className="space-y-4 mb-10">
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-sans flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-2.5 shrink-0" />
                    <span>Refer 3 friends and get <span className="text-green-600 font-bold">₹500 cashback</span> after signup.</span>
                  </p>
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-sans flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-2.5 shrink-0" />
                    <span>Your friends will also get one <span className="text-primary font-bold">complimentary program</span>.</span>
                  </p>
                </div>

                <div className="space-y-4 max-w-sm">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      className="w-full px-6 py-4.5 rounded-2xl border-2 border-slate-100 focus:border-accent-gold outline-none transition-all font-sans text-lg bg-slate-50/50 focus:bg-white"
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full brand-gradient-gold text-white py-4.5 rounded-2xl font-bold text-xl shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all font-serif italic tracking-wide"
                  >
                    Get My 33% Off
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex flex-1 relative overflow-hidden">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                src={referralImg}
                alt="Referral Illustration"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Stats Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-secondary/20 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Verified Offer</p>
                    <p className="text-sm font-bold text-primary">Limited Time Only</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
