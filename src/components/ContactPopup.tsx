import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Phone, ArrowRight, Send } from "lucide-react";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 400);
  };

  const resetAndClose = () => {
    onClose();
    // Small delay before resetting state to allow exit animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[400px] rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(27,43,72,0.3)] bg-white"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-8 sm:p-10"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-2xl font-sans font-bold text-primary mb-1">Get in touch</h2>
                      <div className="flex flex-col gap-1 mt-2">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                           <Mail size={12} className="text-accent-gold" />
                           arambha@gmail.com
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                           <Phone size={12} className="text-accent-gold" />
                           +91 9108032103
                         </div>
                      </div>
                    </div>
                    <button onClick={resetAndClose} className="text-slate-400 hover:text-primary transition-colors">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1 group">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Sean Murphy"
                        className="w-full py-2 bg-transparent border-b border-slate-200 focus:border-primary outline-none transition-all font-sans text-primary placeholder:text-slate-300"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">Email</label>
                      <input
                        required
                        type="email"
                        placeholder="sean.murphy@gmail.com"
                        className="w-full py-2 bg-transparent border-b border-slate-200 focus:border-primary outline-none transition-all font-sans text-primary placeholder:text-slate-300"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1 group">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">Message</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="How can we help?"
                        className="w-full py-2 bg-transparent border-b border-slate-200 focus:border-primary outline-none transition-all font-sans text-primary placeholder:text-slate-300 resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-4">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Send</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30"
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, backgroundColor: "#fff" }}
                  animate={{ opacity: 1, backgroundColor: "#1B2B48" }} // Primary Navy
                  className="min-h-[450px] p-10 flex flex-col justify-between text-white relative"
                >
                  <button onClick={resetAndClose} className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors">
                    <X size={24} />
                  </button>

                  <div className="mt-12">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl font-sans font-bold leading-tight"
                    >
                      Thank<br />You.
                    </motion.h2>
                  </div>

                  <div>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4 }}
                      className="h-px bg-white/20 w-full mb-8"
                    />
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl font-sans font-medium text-white/90 leading-relaxed mb-12"
                    >
                      We'll be in touch.<br />Shortly!
                    </motion.p>

                    <div className="flex justify-end items-center gap-4">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Next</span>
                      <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetAndClose}
                        className="w-12 h-12 rounded-full bg-blue-900/40 text-white flex items-center justify-center border border-white/20 backdrop-blur-md"
                      >
                        <ArrowRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
