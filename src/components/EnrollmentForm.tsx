import React, { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, CreditCard, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { enrollInCourse } from '../services/courseService';

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  program: {
    id: string;
    title: string;
  };
  onSuccess: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  collegeName?: string;
  yearOfPassing?: string;
  highestEducation?: string;
}

export default function EnrollmentForm({ isOpen, onClose, program, onSuccess }: EnrollmentFormProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    whatsapp: "",
    address: "",
    collegeName: "",
    yearOfPassing: "",
    highestEducation: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.whatsapp.trim()) errors.whatsapp = "WhatsApp is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.collegeName.trim()) errors.collegeName = "College name is required";
    if (!formData.yearOfPassing.trim()) errors.yearOfPassing = "Year of passing is required";
    if (!formData.highestEducation) errors.highestEducation = "Education is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('payment');
    }
  };

  const handlePayment = async () => {
    if (!currentUser) {
      alert("You must be logged in to enroll.");
      return;
    }
    setLoading(true);
    try {
      const enrollmentData = {
        ...formData,
        course_title: program.title,
        enrolled_at: new Date().toISOString(),
        payment_status: 'paid',
        payment_id: 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      };
      await enrollInCourse(currentUser.uid, program.id, enrollmentData);
      setStep('success');
      onSuccess();
    } catch (error: any) {
      alert("Enrollment failed: " + (error?.message || error));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
          <X size={18} />
        </button>

        <div className="p-8 sm:p-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-2">Student Enrollment Form</h2>
                  <p className="text-slate-500 text-sm">Enrolling for: <span className="font-bold text-primary">{program.title}</span></p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Full Name *</label>
                      <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Email Address *</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Phone *</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">WhatsApp *</label>
                      <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">College Name *</label>
                      <input name="collegeName" value={formData.collegeName} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Year of Passing *</label>
                      <input name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Qualification *</label>
                    <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} className="w-full border rounded-xl px-4 py-3 bg-slate-50" required>
                      <option value="">-- Select --</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg">Proceed to Payment</button>
                </form>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-4">Secure Payment</h2>
                <p className="text-slate-600 mb-8">You are paying for <span className="font-bold">{program.title}</span></p>
                
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left border border-slate-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500">Course Fee</span>
                    <span className="font-bold text-primary">₹14,999</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-500">Platform Fee</span>
                    <span className="font-bold text-primary">₹0</span>
                  </div>
                  <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
                    <span className="font-bold text-primary">Total Amount</span>
                    <span className="font-bold text-accent-gold text-xl">₹14,999</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-center text-slate-500 text-sm mb-8">
                  <ShieldCheck size={18} className="text-green-500" />
                  Secure SSL Encrypted Payment
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep('form')} className="flex-1 py-4 bg-slate-100 text-primary font-bold rounded-xl">Back</button>
                  <button onClick={handlePayment} disabled={loading} className="flex-1 py-4 bg-accent-gold text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
                    Pay Now
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">Enrollment Successful!</h3>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                  Congratulations! You have successfully enrolled in <strong>{program.title}</strong>. Your payment has been processed and your seat is confirmed.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/student/dashboard");
                    }}
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    Go to Student Dashboard <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 text-slate-500 font-bold hover:text-primary transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
