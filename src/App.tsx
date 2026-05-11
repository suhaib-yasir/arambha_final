import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { MessageCircle, MessageSquare } from "lucide-react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const LegalSupport = lazy(() => import("./pages/LegalSupport"));
const AdminPortal = lazy(() => import("./pages/admin/AdminPortal"));
const ProgramDetails = lazy(() => import("./pages/ProgramDetails"));
const Gallery = lazy(() => import("./pages/Gallery"));
const CategoryGallery = lazy(() => import("./pages/CategoryGallery"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
import { AuthProvider } from "./context/AuthContext";
import { AdminRoute } from "./components/AdminRoute";
import ReferralPopup from "./components/ReferralPopup";
import ContactPopup from "./components/ContactPopup";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Navbar />
          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-accent-gold rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:id" element={<ProgramDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:category" element={<CategoryGallery />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/legal-support" element={<LegalSupport />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route 
                path="/admin/portal" 
                element={
                  <AdminRoute>
                    <AdminPortal />
                  </AdminRoute>
                } 
              />
            </Routes>
          </Suspense>
          <Footer />
          <ReferralPopup />
          <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

          {/* Floating Actions */}
          <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
            {/* Contact Message Button */}
            <motion.button
              onClick={() => setIsContactOpen(true)}
              className="bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
            >
              <MessageSquare size={32} />
            </motion.button>

            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919108032103"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
            >
              <MessageCircle size={32} />
            </motion.a>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
