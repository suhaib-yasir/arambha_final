/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  Search, ShoppingCart, Globe, Bell, Heart, Menu,
  MapPin, Briefcase, GraduationCap, Banknote, ArrowRight,
  ChevronLeft, ChevronRight, MessageSquare, BookOpen,
  Target, Linkedin, Instagram, Mail, Phone, Star, Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { applyForJob } from '../services/careerService';
import heroStudentsImg from "../assets/careers/hero-careers.svg";
import designExcellenceImg from "../assets/careers/design-excellence.png";
import impactfulCollabImg from "../assets/careers/impactful-collaboration.png";
import growthMindsetImg from "../assets/careers/growth-mindset.png";
import radicalIntegrityImg from "../assets/careers/radical-integrity.png";
import businessDevImg from "../assets/jobs/business-development-associate.png";
import digitalMarketingAssocImg from "../assets/jobs/digital-marketing-associate.png";
import brandGrowthImg from "../assets/jobs/brand-growth-executive.png";
import salesLeadImg from "../assets/jobs/sales-lead-manager.png";
import marketingStrategyImg from "../assets/jobs/marketing-strategy-manager.png";
import campusGrowthImg from "../assets/jobs/campus-growth-partner.png";
import corporateSalesImg from "../assets/jobs/corporate-sales-executive.png";
import hrManagerImg from "../assets/jobs/human-resource-manager.png";
import leadGenImg from "../assets/jobs/lead-generation-specialist.png";

// Color Palette
const COLORS = {
  primary: '#1F2F4F',
  secondary: '#2E446B',
  gold: '#D4AF37',
};

// --- Types ---
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  image: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  link: string;
}

// --- Data ---
const CATEGORIES: Category[] = [
  { id: 'home', name: 'Home', link: '#' },
  { id: 'about', name: 'About', link: '#' },
  { id: 'programs', name: 'Programs', link: '#' },
  { id: 'services', name: 'Services', link: '#' },
  { id: 'careers', name: 'Careers', link: '#' },
];

const JOB_LISTINGS: Job[] = [
  {
    id: '1',
    title: 'Business Development Associate – Inside Sales',
    department: 'Sales',
    location: 'Bangalore',
    experience: '0–2 Years',
    salary: '₹3–5 LPA',
    description: 'Drive revenue growth through lead conversion and relationship building. Engage with prospective clients, understand their requirements, and close deals effectively.',
    image: businessDevImg,
    badge: 'Urgent Hire'
  },
  {
    id: '2',
    title: 'Digital Marketing Associate',
    department: 'Marketing',
    location: 'Bangalore',
    experience: '0–2 Years',
    salary: '₹3–5 LPA',
    description: 'Assist in executing digital marketing campaigns across platforms. Manage SEO/SEM activities, track performance metrics, and optimize campaigns to improve engagement and conversions.',
    image: digitalMarketingAssocImg,
    badge: 'New'
  },
  {
    id: '3',
    title: 'Brand Growth Executive',
    department: 'Marketing',
    location: 'Work from Home',
    experience: '0–2 Years',
    salary: '₹3–6 LPA',
    description: 'Support brand visibility and online engagement initiatives. Coordinate promotional campaigns and ensure consistent brand communication across all digital platforms.',
    image: brandGrowthImg,
  },
  {
    id: '4',
    title: 'Sales Lead / Manager',
    department: 'Sales',
    location: 'Bangalore',
    experience: '0–2 Years',
    salary: '₹3–8 LPA',
    description: 'Lead and motivate the sales team to achieve regional revenue targets. Mandatory experience in the EdTech industry required. Develop sales strategies and monitor KPIs.',
    image: salesLeadImg,
  },
  {
    id: '5',
    title: 'Marketing Strategy Manager',
    department: 'Marketing',
    location: 'Bangalore',
    experience: '0–2 Years',
    salary: '₹3–8 LPA',
    description: 'Design and execute data-driven marketing strategies aligned with business objectives. Analyze market trends and oversee campaign performance to drive sustainable growth.',
    image: marketingStrategyImg,
  }
];

const MORE_JOBS: Job[] = [
  {
    id: '6',
    title: 'Campus Growth Partner',
    department: 'Marketing',
    location: 'Work from Home',
    experience: '0–2 Years',
    salary: '₹3–5 LPA',
    description: 'Act as the company representative across college campuses. Build student networks, generate leads, and organize engagement activities to increase brand awareness.',
    image: campusGrowthImg,
  },
  {
    id: '7',
    title: 'Corporate Sales Executive (B2B)',
    department: 'Sales',
    location: 'Bangalore',
    experience: '0–2 Years',
    salary: '₹4–8 LPA',
    description: 'Identify and develop corporate partnerships to expand business opportunities. Pitch tailored solutions, close deals, and maintain long-term client relationships.',
    image: corporateSalesImg,
  },
  {
    id: '8',
    title: 'Human Resource Manager',
    department: 'Human Resources',
    location: 'Bangalore, India',
    experience: '1–4 Years',
    salary: '₹3–6 LPA',
    description: 'We are looking for an experienced Human Resource Manager with mandatory experience in the EdTech industry. Lead recruitment, employee engagement, performance management, and HR operations.',
    image: hrManagerImg,
  },
  {
    id: '9',
    title: 'Lead Generation Specialist',
    department: 'Marketing / Sales',
    location: 'Bangalore, India',
    experience: '1–2 Years',
    salary: '₹3–5 LPA',
    description: 'We are seeking a results-driven Lead Generation Specialist with mandatory experience in the EdTech industry. Generate high-quality leads through digital campaigns, outbound strategies, and data-driven marketing initiatives.',
    image: leadGenImg,
  },
  {
    id: '10',
    title: 'Marketing Graduate Intern',
    department: 'Marketing',
    location: 'Remote',
    experience: 'Fresher',
    salary: '₹15,000 / Month',
    description: 'Learn the ropes of digital marketing in a fast-paced environment.',
    image: digitalMarketingAssocImg,
  },
  {
    id: '11',
    title: 'Talent Acquisition Intern',
    department: 'HR',
    location: 'Bangalore / Hybrid',
    experience: 'Academic Credit / Fresher',
    salary: '₹10,000 / Month',
    description: 'Help us grow the Arambha family by identifying great talent.',
    image: hrManagerImg,
  }
];

// --- Helper Components ---

const WelcomeHero = () => (
  <div className="relative w-full bg-white font-sans" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
    {/* Background image - right side on larger screens */}
    <div className="absolute top-0 right-0 w-full md:w-3/5 lg:w-3/5 h-full hidden md:block">
      <img
        src={heroStudentsImg}
        alt="Arambha Team"
        className="w-full h-full object-cover object-center"
        style={{ objectFit: 'cover' }}
      />
    </div>

    {/* Content - left side */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-[55%] lg:w-[50%]">
        {/* Small label */}
        <div className="text-xs font-bold uppercase tracking-widest mb-3 font-sans" style={{ color: COLORS.gold }}>
          Join Our Team
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-5 font-serif italic" style={{ color: COLORS.primary }}>
          Build Your Career with <span style={{ color: COLORS.gold }}>Arambha</span>
        </h1>

        {/* Subheading / Description */}
        <p className="text-lg sm:text-xl mb-8 font-sans leading-relaxed max-w-lg" style={{ color: '#4b5563' }}>
          We go beyond jobs. We create growth opportunities for ambitious, result-driven individuals who are ready to make an impact.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <button className="text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all font-serif italic text-sm sm:text-base" style={{ backgroundColor: COLORS.primary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.secondary} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}>
            Explore Roles <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Dropdown = ({ value, onChange, options, icon: Icon, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 lg:w-[160px] flex items-center px-4 border-b sm:border-b-0 sm:border-r border-gray-100 min-h-[60px] relative cursor-pointer" ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
      <Icon className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: COLORS.gold }} />
      <div className="flex-1 text-xs font-bold text-gray-700 truncate font-sans">
        {value || placeholder}
      </div>
      <div className={`absolute right-4 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180 -translate-y-1' : ''}`}>
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-gray-400 rotate-45 mb-1"></div>
      </div>

      {isOpen && (
        <div className="absolute top-[110%] left-0 w-full min-w-[160px] bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1" onClick={e => e.stopPropagation()}>
          <div className="max-h-60 overflow-y-auto">
            <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-xs font-bold text-gray-700 font-sans transition-colors" onClick={() => { onChange(''); setIsOpen(false); }}>
              {placeholder}
            </div>
            {options.map((opt: string) => (
              <div key={opt} className={`px-4 py-2 hover:bg-slate-50 cursor-pointer text-xs font-bold font-sans transition-colors ${value === opt ? 'bg-slate-50' : 'text-gray-700'}`} style={value === opt ? { color: COLORS.primary } : {}} onClick={() => { onChange(opt); setIsOpen(false); }}>
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const JobFilter = ({ onSearch }: { onSearch: (filters: { search: string; location: string; department: string; experience: string }) => void }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');

  const handleSearch = () => {
    onSearch({
      search: searchTerm,
      location: location,
      department: department,
      experience: experience
    });
  };

  return (
    <div className="relative mb-16 z-20 px-4 font-sans">
      <div className={`bg-white p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row items-stretch transition-all duration-300`} style={isFocused ? { boxShadow: `0 0 0 4px ${COLORS.gold}33, 0 10px 40px rgba(0,0,0,0.08)`, transform: 'translateY(-2px)' } : {}}>
        <div className="flex-grow flex items-center px-4 border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[60px]">
          <Search className="w-5 h-5 mr-3 transition-colors" style={{ color: isFocused ? COLORS.gold : '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search for your dream role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400 font-sans"
            style={{ color: COLORS.primary }}
          />
        </div>
        <div className="flex flex-col sm:flex-row flex-shrink-0">
          <Dropdown
            icon={MapPin}
            value={location}
            onChange={setLocation}
            placeholder="All Locations"
            options={['Bangalore', 'Remote', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune']}
          />
          <Dropdown
            icon={Briefcase}
            value={department}
            onChange={setDepartment}
            placeholder="Department"
            options={['Marketing', 'Sales', 'HR', 'Strategy', 'Partnerships']}
          />
          <Dropdown
            icon={GraduationCap}
            value={experience}
            onChange={setExperience}
            placeholder="Experience"
            options={['Fresher', '0-2 Years', '1-3 Years', '2-4 Years', '2-5 Years', '3-5 Years', '4-6 Years', '5+ Years']}
          />
        </div>
        <button onClick={handleSearch} className="text-white lg:px-10 px-4 min-h-[60px] lg:min-h-0 rounded-xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 m-1 font-serif italic" style={{ backgroundColor: COLORS.primary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.gold} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}>
          Search
        </button>
      </div>
    </div>
  );
};

const CourseCard = ({ course, onApply }: { course: Job, onApply?: () => void }) => (
  <motion.div
    className="flex-shrink-0 w-full flex flex-col gap-3 p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 font-sans"
    whileHover={{ y: -8 }}
    style={{ backgroundColor: '#F3F6FF' }}
  >
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-gray-50">
      <motion.img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
        referrerPolicy="no-referrer"
      />
      {course.badge && (
        <div className="absolute top-2 right-2 z-10">
          <span className="text-[10px] text-white font-black px-2 py-1 rounded shadow-sm uppercase tracking-widest font-sans" style={{ backgroundColor: COLORS.gold }}>
            {course.badge}
          </span>
        </div>
      )}
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-[15px] font-extrabold line-clamp-2 leading-snug min-h-[2.5rem] font-serif italic" style={{ color: COLORS.primary }}>
        {course.title}
      </h3>
      <div className="flex flex-col gap-1.5 border-t border-gray-50 pt-2 font-sans">
        {[
          { icon: MapPin, text: course.location },
          { icon: Briefcase, text: course.department },
          { icon: GraduationCap, text: course.experience },
          { icon: Banknote, text: course.salary, bold: true }
        ].map((info, i) => (
          <div key={i} className="flex items-center gap-2 text-sm" style={{ color: info.bold ? COLORS.primary : '#4b5563', fontWeight: info.bold ? 'bold' : 'normal' }}>
            <info.icon className="w-4 h-4" style={{ color: COLORS.gold }} />
            <span>{info.text}</span>
          </div>
        ))}
      </div>
      <button onClick={onApply} className="mt-2 w-full text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm group font-serif italic" style={{ backgroundColor: COLORS.primary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.secondary} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}>
        Apply Now
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const CourseCarousel = ({ title, subtitle, courses, id, onApply }: { title?: string, subtitle?: string, courses: Job[], id: string, onApply: (title: string) => void }) => {
  return (
    <section className="py-8 font-sans">
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold tracking-tight font-serif italic" style={{ color: COLORS.primary }}>{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 font-medium mt-1">
              {subtitle.includes('"') ? (
                <>
                  {subtitle.split('"')[0]}
                  <span className="font-bold italic" style={{ color: COLORS.gold }}>"{subtitle.split('"')[1]}"</span>
                  {subtitle.split('"')[2]}
                </>
              ) : subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 pt-2">
        {courses.map(c => (
          /* @ts-ignore - key is reserved */
          <CourseCard key={c.id} course={c} onApply={() => onApply(c.title)} />
        ))}
        {courses.length === 0 && (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[320px] rounded-2xl border border-gray-100 flex flex-col p-4 animate-pulse" style={{ backgroundColor: '#F3F6FF' }}>
                <div className="w-full aspect-[16/10] bg-gray-50 rounded-lg mb-4" />
                <div className="h-4 bg-gray-50 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-50 rounded w-1/2" />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

const FeaturedCourse = ({ onApply }: { onApply: (title: string) => void }) => (
  <section className="py-12 font-sans">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold font-serif italic" style={{ color: COLORS.primary }}>Opportunity Spotlight</h2>
      <button className="text-sm font-bold hover:underline font-sans" style={{ color: COLORS.gold }}>View all roles</button>
    </div>
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl flex flex-col lg:flex-row gap-0 transition-all cursor-pointer group" onMouseEnter={(e) => e.currentTarget.style.borderColor = `${COLORS.gold}4D`} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
      <div className="relative w-full lg:w-[45%] h-64 lg:h-auto overflow-hidden flex-shrink-0" style={{ backgroundColor: COLORS.primary }}>
        <img src={leadGenImg} alt="Lead" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${COLORS.primary}CC, transparent)` }} />
        <div className="absolute bottom-6 left-6">
          <span className="text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-2 block w-fit font-sans" style={{ backgroundColor: COLORS.gold }}>Featured Role</span>
          <div className="text-white font-bold text-xl font-serif italic">Lead Generation Specialist</div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-12 gap-4 flex-grow">
        <h3 className="text-3xl font-extrabold leading-tight mb-2 font-serif italic" style={{ color: COLORS.primary }}>Strategic Lead Generation Lead (SaaS)</h3>
        <p className="text-base text-gray-600 font-medium max-w-xl font-sans">We're looking for a high-impact individual to lead market expansion efforts. Focus on identifying business opportunities and pipelines.</p>
        <div className="grid grid-cols-2 gap-4 max-w-sm font-sans">
          {[{ l: 'Salary', v: '₹15 - ₹22 LPA' }, { l: 'Experience', v: '4+ Years' }, { l: 'Location', v: 'Bangalore' }, { l: 'Type', v: 'Full-time' }].map(item => (
            <div key={item.l} className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">{item.l}</span>
              <span className="text-sm font-bold" style={{ color: COLORS.primary }}>{item.v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 font-serif italic">
          <button onClick={() => onApply('Strategic Lead Generation Lead')} className="text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all" style={{ backgroundColor: COLORS.primary }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.secondary} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}>Apply Now</button>
          <button className="font-bold transition-colors" style={{ color: COLORS.primary }} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.gold} onMouseLeave={(e) => e.currentTarget.style.color = COLORS.primary}>Role Overview</button>
        </div>
      </div>
    </div>
  </section>
);

const GoogleSection = () => (
  <section className="pt-24 pb-0 font-sans">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="font-black tracking-widest text-xs uppercase mb-4 font-sans" style={{ color: COLORS.gold }}>Inside Arambha</h2>
      <h3 className="text-4xl font-black mb-6 font-serif italic" style={{ color: COLORS.primary }}>Our Culture & Values</h3>
      <p className="text-gray-500 font-medium text-lg leading-relaxed font-sans">At Arambha, we values bold thinkers who aren't afraid to redefine the possible.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: "Design Excellence", desc: "Pushing boundaries.", img: designExcellenceImg },
        { title: "Impactful Collaboration", desc: "Working as one team.", img: impactfulCollabImg },
        { title: "Growth Mindset", desc: "invest in evolution.", img: growthMindsetImg },
        { title: "Radical Integrity", desc: "Transparency & trust.", img: radicalIntegrityImg }
      ].map((v, i) => (
        <motion.div key={i} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group" whileHover={{ y: -10 }}>
          <div className="h-48 overflow-hidden relative">
            <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="p-6">
            <h4 className="text-lg font-black mb-1 font-serif italic" style={{ color: COLORS.primary }}>{v.title}</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed font-sans">{v.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// --- Registration Form Component ---

interface FormData {
  roleApplied: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  skills: string;
  areaOfInterest: string;
  course: string;
  others: string;
  collegeName: string;
  yearOfPassing: string;
  certifications: string;
  highestEducation: string;
  workExperienceStatus: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  referenceName: string;
  resume: File | null;
  customRole?: string;
}

const RegistrationForm = ({ isModal = false, isOpen = true, onClose, roleApplied }: { isModal?: boolean, isOpen?: boolean, onClose?: () => void, roleApplied?: string }) => {
  const [formData, setFormData] = useState<FormData>({
    roleApplied: roleApplied || '',
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    skills: '',
    areaOfInterest: '',
    course: '',
    others: '',
    collegeName: '',
    yearOfPassing: '',
    certifications: '',
    highestEducation: '',
    workExperienceStatus: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    referenceName: '',
    resume: null,
    customRole: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (roleApplied) {
      setFormData(prev => ({ ...prev, roleApplied }));
    }
  }, [roleApplied]);

  // ── SCROLL LOCK ──────────────────────────────────────────────
  // Locks the BODY when modal is open so the background page
  // cannot scroll. Restored on close / unmount.
  useEffect(() => {
    if (!isModal) return;
    if (isOpen) {
      // Preserve current scroll position so the page doesn't jump
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isModal, isOpen]);

  const [resumeFileName, setResumeFileName] = useState('');
  const dragRef = useRef<HTMLDivElement>(null);
  // ── REF for the scrollable inner container ───────────────────
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      if (file.size <= 1 * 1024 * 1024) {
        setFormData(prev => ({ ...prev, resume: file }));
        setResumeFileName(file.name);
      } else {
        alert('File size must be less than 1MB');
      }
    } else {
      alert('Only PDF, DOC, and DOCX files are allowed');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = '#f0f4ff';
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = '#ffffff';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current) {
      dragRef.current.style.backgroundColor = '#ffffff';
    }
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format. Please enter a valid email (e.g., @gmail.com, .edu.in).");
      setLoading(false);
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      alert("Please enter exactly 10 digits for Phone Number.");
      setLoading(false);
      return;
    }

    const whatsappDigits = formData.whatsapp.replace(/\D/g, '');
    if (whatsappDigits.length !== 10) {
      alert("Please enter exactly 10 digits for WhatsApp Number.");
      setLoading(false);
      return;
    }

    try {
      const finalData = { ...formData };
      if (roleApplied === 'custom') {
        finalData.roleApplied = formData.customRole || '';
      }
      
      await applyForJob(finalData);
      
      alert("Thank you for your application! We have sent a detailed notification to the admin and we will review your profile shortly.");
      if (onClose) onClose();
    } catch (error: any) {
      console.error("Application error:", error);
      alert("Failed to submit application: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isModal && !isOpen) return null;

  const formContent = (
    <>
      {/* Title Section */}
      <div className={`mb-10 ${isModal ? 'text-center' : ''}`}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 font-serif italic" style={{ color: COLORS.primary }}>
          {isModal ? 'Job Application' : 'Registration Form'}
        </h2>
        <p className="text-base text-gray-600 font-sans" style={{ color: '#4b5563' }}>
          Please fill out all the required information
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={isModal ? "" : "bg-white p-8 rounded-lg border"} style={isModal ? {} : { borderColor: '#e5e7eb' }}>
        {/* Section A: Personal Information */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6 font-serif italic" style={{ color: COLORS.primary }}>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isModal && roleApplied && roleApplied !== 'custom' && (
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                  Role Applied For
                </label>
                <input
                  type="text"
                  value={formData.roleApplied}
                  readOnly
                  className="px-4 py-3 border rounded-lg text-sm font-sans bg-gray-50 text-gray-500 font-semibold cursor-not-allowed"
                  style={{ borderColor: '#e5e7eb' }}
                />
              </div>
            )}
            {isModal && roleApplied === 'custom' && (
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                  Interested Role <span style={{ color: COLORS.gold }}>*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2 font-sans">
                  Tell us the role you're interested in
                </p>
                <input
                  type="text"
                  name="customRole"
                  value={formData.customRole || ""}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-lg text-sm font-sans"
                  style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                  placeholder="Enter the role you are looking for"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Name <span style={{ color: COLORS.gold }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="Your full name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Email <span style={{ color: COLORS.gold }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address (e.g., user@gmail.com, user@edu.in)"
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Phone Number <span style={{ color: COLORS.gold }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter exactly 10 digits for Phone Number."
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="10 digit phone number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                }}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                WhatsApp Number <span style={{ color: COLORS.gold }}>*</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter exactly 10 digits for WhatsApp Number."
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="10 digit whatsapp number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                }}
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Address <span style={{ color: COLORS.gold }}>*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="Full address"
              />
            </div>
          </div>
        </div>

        {/* Section B: Skills & Interests */}
        <div className="mb-10 pb-10 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="text-xl font-bold mb-6 font-serif italic" style={{ color: COLORS.primary }}>
            Skills & Interests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Skills
              </label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                rows={4}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="List your key skills, separated by commas or newlines"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Area of Interest
              </label>
              <textarea
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleInputChange}
                rows={4}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="What areas are you interested in?"
              />
            </div>
          </div>
        </div>

        {/* Section C: Education */}
        <div className="mb-10 pb-10 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="text-xl font-bold mb-6 font-serif italic" style={{ color: COLORS.primary }}>
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Course
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 cursor-pointer"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
              >
                <option value="">Select a course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.Com">B.Com</option>
                <option value="B.A">B.A</option>
                <option value="MBA">MBA</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Others
              </label>
              <input
                type="text"
                name="others"
                value={formData.others}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="If other, please specify"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="Your college name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Year of Passing
              </label>
              <input
                type="text"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="YYYY"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Highest Education Qualification
              </label>
              <select
                name="highestEducation"
                value={formData.highestEducation}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
              >
                <option value="">Select qualification</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Certifications
              </label>
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                rows={3}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="List your certifications, if any"
              />
            </div>
          </div>
        </div>

        {/* Section D: Work Experience */}
        <div className="mb-10 pb-10 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="text-xl font-bold mb-6 font-serif italic" style={{ color: COLORS.primary }}>
            Work Experience
          </h3>
          <div className="flex flex-col">
            <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
              Work Experience Status
            </label>
            <select
              name="workExperienceStatus"
              value={formData.workExperienceStatus}
              onChange={handleInputChange}
              className="px-4 py-2.5 border rounded text-sm font-sans"
              style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
            >
              <option value="">Select status</option>
              <option value="Fresher">Fresher</option>
              <option value="0-2 Years">0-2 Years</option>
              <option value="2-4 Years">2-4 Years</option>
              <option value="4-6 Years">4-6 Years</option>
              <option value="6+ Years">6+ Years</option>
            </select>
          </div>
        </div>

        {/* Section E: Professional Links */}
        <div className="mb-10 pb-10 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="text-xl font-bold mb-6 font-serif italic" style={{ color: COLORS.primary }}>
            Professional Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="https://your-portfolio.com"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="https://github.com/yourprofile"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 font-sans" style={{ color: COLORS.primary }}>
                Reference Name
              </label>
              <input
                type="text"
                name="referenceName"
                value={formData.referenceName}
                onChange={handleInputChange}
                className="px-4 py-2.5 border rounded text-sm font-sans"
                style={{ borderColor: '#e5e7eb', color: COLORS.primary }}
                placeholder="Name of reference"
              />
            </div>
          </div>
        </div>

        {/* Section F: Resume Upload */}
        <div className="mb-10 pb-10 border-b" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="text-xl font-bold mb-6 font-serif italic" style={{ color: COLORS.primary }}>
            Resume Upload
          </h3>
          <div
            ref={dragRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors"
            style={{ borderColor: '#e5e7eb' }}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.gold + '20' }}>
                  <span style={{ color: COLORS.gold, fontSize: '20px' }}>📎</span>
                </div>
                <p className="text-sm font-bold font-sans" style={{ color: COLORS.primary }}>
                  Drag & drop your resume here
                </p>
                <p className="text-xs text-gray-400 font-sans">
                  or click to browse
                </p>
                <p className="text-xs text-gray-400 font-sans mt-1">
                  PDF, DOC, DOCX (max 1MB)
                </p>
              </div>
            </label>
            {resumeFileName && (
              <p className="text-sm mt-4 font-sans" style={{ color: COLORS.gold }}>
                ✓ {resumeFileName}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all font-serif italic disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = COLORS.secondary)}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = COLORS.primary)}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </>
  );

  // ── MODAL RENDER — THE FIX IS HERE ──────────────────────────
  if (isModal) {
    return (
      <div
        // Overlay: intercepts ALL wheel + touch events so they NEVER
        // reach the background page.
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onWheel={(e) => e.stopPropagation()}           // ← blocks trackpad/mouse wheel on overlay
        onTouchMove={(e) => e.preventDefault()}        // ← blocks touch-drag on overlay
      >
        <div
          // Modal card: a proper scroll container with a hard max-height.
          // onWheel stopPropagation here ensures wheel events consumed
          // by THIS div do NOT bubble up to the overlay → no page scroll.
          className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative flex flex-col"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}         // ← wheel stays inside modal
          onTouchMove={(e) => e.stopPropagation()}     // ← touch-drag stays inside modal
        >
          {/* Close button — fixed inside modal, not inside scroll area */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-gray-500 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            ✕
          </button>

          {/* Scrollable area — the ONLY place that scrolls */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-8 sm:p-10 rounded-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
            style={{
              overscrollBehavior: "contain",   // ← prevents scroll chaining to page
              WebkitOverflowScrolling: "touch", // ← smooth momentum on iOS
            }}
          >
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 font-sans" style={{ backgroundColor: '#f8f9fb' }}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {formContent}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const allJobs = [...JOB_LISTINGS, ...MORE_JOBS];

  const handleSearch = (filters: { search: string; location: string; department: string; experience: string }) => {
    let results = allJobs;

    // Filter by search term
    if (filters.search) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.department.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by location
    if (filters.location) {
      results = results.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by department
    if (filters.department) {
      results = results.filter(job =>
        job.department.toLowerCase() === filters.department.toLowerCase()
      );
    }

    // Filter by experience
    if (filters.experience) {
      results = results.filter(job =>
        job.experience.toLowerCase().includes(filters.experience.toLowerCase())
      );
    }

    setFilteredJobs(results);
    setIsSearchActive(filters.search !== '' || filters.location !== '' || filters.department !== '' || filters.experience !== '');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fb] font-sans" id="app-root" style={{ color: COLORS.primary }}>
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
      <WelcomeHero />
      <main className="flex-grow max-w-[1340px] mx-auto px-4 lg:px-6 w-full overflow-x-hidden pb-0 pt-4">
        <JobFilter onSearch={handleSearch} />

        {isSearchActive ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight font-serif italic" style={{ color: COLORS.primary }}>
                Search Results ({filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found)
              </h2>
              <button
                onClick={() => { setIsSearchActive(false); setFilteredJobs([]); }}
                className="text-sm font-bold hover:underline font-sans"
                style={{ color: COLORS.gold }}
              >
                Clear filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 pt-2">
              {filteredJobs.map(job => (
                <CourseCard key={job.id} course={job} onApply={() => { setSelectedRole(job.title); setIsModalOpen(true); }} />
              ))}
              {filteredJobs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg font-medium font-sans">No jobs found matching your criteria. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <CourseCarousel id="active-hires" title="Active Hiring" subtitle="Top roles based on your profile" courses={JOB_LISTINGS} onApply={(title) => { setSelectedRole(title); setIsModalOpen(true); }} />
            <CourseCarousel id="sales-roles" title="Business Development & Sales" subtitle='Join our high-performance growth engine' courses={MORE_JOBS.filter(j => j.department === 'Sales' || j.department === 'Marketing / Sales')} onApply={(title) => { setSelectedRole(title); setIsModalOpen(true); }} />
            <CourseCarousel id="internships" title="Campus Partnerships & Internships" subtitle="Start your career journey with us" courses={MORE_JOBS.filter(j => j.experience.toLowerCase().includes('fresher') || j.experience.toLowerCase().includes('student'))} onApply={(title) => { setSelectedRole(title); setIsModalOpen(true); }} />
          </>
        )}

        {/* CTA Section */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center border-t border-gray-100 mt-8">
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 font-serif italic" style={{ color: COLORS.primary }}>
            Didn't find a role that fits you?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-sans">
            We are always looking for talented people. Tell us what you're interested in.
          </p>
          <button
            onClick={() => {
              setSelectedRole('custom');
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg transition-all font-serif italic text-lg"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.gold)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
          >
            Apply for Your Role
          </button>
        </div>


        <RegistrationForm isModal={true} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roleApplied={selectedRole} />

        <GoogleSection />
      </main>
    </div>
  );
}
