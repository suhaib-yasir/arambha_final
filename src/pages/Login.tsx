import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, User, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { loginUser, loginWithGoogle } from "../services/authService";
import { isUserAdmin } from "../services/adminService";
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
      const user = await loginUser(email, password);
      // Check if user is admin
      const adminStatus = await isUserAdmin(user.uid);
      if (adminStatus) {
        navigate("/admin/portal");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      // Check if user is admin
      const adminStatus = await isUserAdmin(user.uid);
      if (adminStatus) {
        navigate("/admin/portal");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex items-center justify-center">
      <style dangerouslySetInnerHTML={{
        __html: `
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
        <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-8 sm:p-12 bg-white pt-16 sm:pt-24 md:pt-32 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="mb-10 text-center lg:text-left">
              <Link to="/" className="inline-flex lg:hidden mb-8 group transition-all">
                <img 
                  src={logo} 
                  alt="Arambha Logo" 
                  className="h-48 sm:h-56 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform" 
                />
              </Link>
              <h1 className="font-serif text-3xl sm:text-4xl text-primary mb-2 font-bold italic">Welcome Back</h1>
              <p className="text-sm text-on-surface-variant font-sans">
                Sign in to access your learning dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 lg:space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-sans mb-4">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
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
                disabled={loading}
                className="w-full brand-gradient-gold text-white py-4 rounded-xl font-bold shadow-lg hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-serif italic text-lg"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-on-surface-variant font-sans">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white text-primary border border-slate-200 py-4 rounded-xl font-bold shadow-sm hover:bg-slate-50 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 font-sans text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              <div className="mt-8 text-center text-sm font-sans">
                <span className="text-on-surface-variant">Don't have an account? </span>
                <Link to="/signup" className="text-accent-gold font-bold hover:underline transition-all">
                  Sign up
                </Link>
              </div>
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
