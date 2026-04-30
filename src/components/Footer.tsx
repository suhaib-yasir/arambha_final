import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import logo from "../assets/ARAMBHA(1).svg";

import arambhaText from "../assets/arambha-text.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface text-primary border-t border-slate-200 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-8 py-16 relative z-10">
        <div className="col-span-1">
          <div className="flex items-start gap-6 mb-8">
            <img src={logo} style={{ width: "200px", height: "200px" }} alt="Arambha Logo" />
            
          </div>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed font-sans">
            Elevating professional mastery through visionary learning. Bridging the gap between student life and career success with academic excellence.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-on-surface-variant hover:text-accent-gold hover:border-accent-gold transition-all">
              <Facebook size={14} />
            </a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-on-surface-variant hover:text-accent-gold hover:border-accent-gold transition-all">
              <Twitter size={14} />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-on-surface-variant hover:text-accent-gold hover:border-accent-gold transition-all">
              <Instagram size={14} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-on-surface-variant hover:text-accent-gold hover:border-accent-gold transition-all">
              <Linkedin size={14} />
            </a>
          </div>
        </div>
        <FooterSection title="Quick Links" links={["About Arambha", "Skill Programs", "Career Launchpad"]} />
        <FooterSection title="Legal & Support" links={["Contact Support", "Partner Network", "Privacy Policy", "Terms of Service"]} isLegalSupport={true} />
        <div>
          <h4 className="font-bold text-primary mb-6 font-serif italic text-base uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-4 text-sm text-on-surface-variant font-sans">
            <ContactInfo icon={Phone} text="+91 91080 32103" />
            <ContactInfo icon={Mail} text="arambhaskilldesignsolutions@gmail.com" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-slate-200 text-center text-[10px] text-slate-400 font-sans tracking-[0.2em] uppercase relative z-10">
        © {new Date().getFullYear()} Arambha Skill Solutions. All rights reserved. Academic Excellence & Professional Growth.
        <div className="mt-2 opacity-30 select-none">ARAMBHA ACADEMIC EXCELLENCE SYSTEM V1.0</div>
      </div>
    </footer>
  );
}

function FooterSection({ title, links, isLegalSupport = false }: { title: string, links: string[], isLegalSupport?: boolean }) {
  return (
    <div>
      <h4 className="font-bold text-primary mb-6 font-serif italic text-base uppercase tracking-wider">{title}</h4>
      <ul className="space-y-4">
        {links.map((link, i) => (
          <li key={i}>
            {isLegalSupport ? (
              <Link
                to="/legal-support"
                className="text-on-surface-variant hover:text-accent-gold hover:translate-x-1 transition-all text-sm inline-block font-sans"
              >
                {link}
              </Link>
            ) : (
              <Link
                to={
                  link === "About Arambha"
                    ? "/about"
                    : link === "Skill Programs"
                    ? "/programs"
                    : link === "Career Launchpad"
                    ? "/careers"
                    : "/"
                }
                className="text-on-surface-variant hover:text-accent-gold hover:translate-x-1 transition-all text-sm inline-block font-sans"
              >
                {link}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon() {
  return (
    <div className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-on-surface-variant hover:text-accent-gold hover:border-accent-gold transition-all cursor-pointer">
      <Globe size={14} />
    </div>
  );
}

function ContactInfo({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <p className="flex items-start gap-3">
      <Icon size={16} className="text-accent-gold mt-1 shrink-0" />
      <span className="leading-tight">{text}</span>
    </p>
  );
}
