import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, LogOut, ShieldCheck, Filter, LayoutDashboard } from "lucide-react";
import logo from "../assets/ARAMBHA.svg";
import arambhaText from "../assets/arambha-text.svg";
import { useAuth } from "../context/AuthContext";
import { isUserAdmin } from "../services/adminService";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (currentUser) {
      isUserAdmin(currentUser.uid).then(setIsAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show navbar when scrolling up OR near the top
      if (currentY < 10 || currentY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
        setIsMenuOpen(false); // close mobile menu when hiding
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/programs", label: "Programs" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/careers", label: "Careers" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm transition-transform duration-300 ease-in-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-4 w-full">
        <Link to="/" className="flex items-center relative w-[280px] sm:w-[350px] lg:w-[450px] xl:w-[500px] h-10 sm:h-12 lg:h-14 z-10 shrink-0">
          <img
            alt="Arambha Logo"
            className="absolute left-0 h-10 sm:h-12 lg:h-14 w-auto object-contain scale-[1.3] lg:scale-[1.6] origin-left transition-transform"
            src={logo}
          />
          <img
            src={arambhaText}
            alt="Arambha Skill Solutions"
            className="absolute left-[55px] sm:left-[65px] lg:left-[95px] h-10 sm:h-12 lg:h-14 w-auto object-contain scale-[1.4] sm:scale-[1.8] lg:scale-[2.2] xl:scale-[2.5] origin-left transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={`text-sm font-semibold tracking-tight transition-colors pb-1 ${isActive(link.path)
                  ? 'text-primary border-b-2 border-accent-gold'
                  : 'text-on-surface-variant hover:text-primary'
                }`}
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin/portal"
              className={`text-sm font-bold tracking-tight transition-colors pb-1 flex items-center gap-1.5 ${location.pathname.startsWith('/admin')
                  ? 'text-accent-gold border-b-2 border-accent-gold'
                  : 'text-accent-gold/80 hover:text-accent-gold'
                }`}
            >
              <ShieldCheck size={16} />
              Portal
            </Link>
          )}
          {currentUser && !isAdmin && (
            <Link
              to="/student/dashboard"
              className={`text-sm font-bold tracking-tight transition-colors pb-1 flex items-center gap-1.5 ${location.pathname.startsWith('/student/dashboard')
                  ? 'text-accent-gold border-b-2 border-accent-gold'
                  : 'text-accent-gold/80 hover:text-accent-gold'
                }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!currentUser ? (
            <Link to="/login" className="hidden lg:block text-sm font-semibold text-on-surface-variant hover:text-primary transition-all">Login</Link>
          ) : (
            <button
              onClick={() => {
                sessionStorage.removeItem('mockUser');
                window.dispatchEvent(new CustomEvent('mock-login', { detail: null }));
                signOut(auth).then(() => navigate('/'));
              }}
              className="hidden lg:flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-all cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
          <button className="brand-gradient-gold text-white px-4 lg:px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap">
            Book a Class
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-primary hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                className={`block px-4 py-3 rounded-lg font-semibold transition-all ${isActive(link.path)
                    ? 'bg-accent-gold text-white'
                    : 'text-on-surface-variant hover:bg-slate-50'
                  }`}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <div className="space-y-3">
                <Link
                  to="/admin/portal"
                  className={`block px-4 py-3 rounded-lg font-bold transition-all border-2 border-accent-gold/20 flex items-center gap-2 ${location.pathname.startsWith('/admin')
                      ? 'bg-accent-gold text-white'
                      : 'text-accent-gold hover:bg-accent-gold/5'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShieldCheck size={20} />
                  Admin Portal
                </Link>
              </div>
            )}
            {currentUser && !isAdmin && (
              <div className="space-y-3">
                <Link
                  to="/student/dashboard"
                  className={`block px-4 py-3 rounded-lg font-bold transition-all border-2 border-accent-gold/20 flex items-center gap-2 ${location.pathname.startsWith('/student/dashboard')
                      ? 'bg-accent-gold text-white'
                      : 'text-accent-gold hover:bg-accent-gold/5'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  Student Dashboard
                </Link>
              </div>
            )}
            {!currentUser ? (
              <Link
                to="/login"
                className="block px-4 py-3 rounded-lg font-semibold text-on-surface-variant hover:bg-slate-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  sessionStorage.removeItem('mockUser');
                  window.dispatchEvent(new CustomEvent('mock-login', { detail: null }));
                  signOut(auth).then(() => {
                    navigate('/');
                    setIsMenuOpen(false);
                  });
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={20} />
                Logout
              </button>
            )}
            <button className="w-full brand-gradient-gold text-white px-6 py-3 rounded-lg font-semibold shadow-md">
              Book a Class
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
