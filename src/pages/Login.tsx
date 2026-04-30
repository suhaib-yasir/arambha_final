import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, User, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../services/authService";
import logo from "../assets/ARAMBHA.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex items-center justify-center">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap');

        :root {
          --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
          --font-serif: "Lora", serif;
        }

        .font-serif {
          font-family: var(--font-serif), serif;
        }

        .font-sans {
          font-family: var(--font-sans), sans-serif;
        }
      `}} />
      
      <div className="flex w-full min-h-screen">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="mb-10">
              <h1 className="font-serif text-4xl text-primary mb-3 font-bold italic">Welcome Back</h1>
              <p className="text-sm text-on-surface-variant font-sans">
                Sign in to access your learning dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2 font-sans">
                  Email Address
                </label>
                <div className="relative font-sans">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all bg-slate-50/50"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2 font-sans">
                  Password
                </label>
                <div className="relative font-sans">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all bg-slate-50/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm font-sans">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accent-gold border-slate-300 rounded focus:ring-accent-gold cursor-pointer"
                  />
                  <span className="ml-2 text-on-surface-variant">Remember me</span>
                </label>
                <a href="#" className="text-accent-gold font-bold hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full brand-gradient-gold text-white py-4 rounded-xl font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 font-serif italic text-lg"
              >
                Sign In
                <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Side - Logo & Decorative */}
        <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-[#F3F6FF]">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl -ml-20 -mb-20"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 p-12 -mt-24"
          >
            <div className="flex flex-col items-center">
              <img
                src={logo}
                alt="Arambha Logo"
                className="w-full max-w-[380px] h-auto drop-shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h2 className="font-serif text-2xl text-primary font-bold italic mb-1">Arambha</h2>
                <p className="text-accent-gold font-bold tracking-[0.2em] uppercase text-[10px]">Skill Solutions</p>
                <div className="mt-4 h-1 w-16 bg-accent-gold mx-auto rounded-full"></div>
                <p className="mt-4 text-on-surface-variant text-sm font-medium font-sans max-w-xs mx-auto leading-relaxed">
                  Bridging the gap between student life and career success with academic excellence.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating background elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent-gold/20 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-primary/10 rounded-full"
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
