import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView, useAnimation, type Variants } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Globe,
  Briefcase,
  CheckCircle2,
  School,
  CreditCard,
  Rocket,
  RotateCcw,
  Users,
  Terminal,
  Mic2,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Handshake,
  Brain,
  Wallet,
  Zap,
  Award,
  Compass
} from "lucide-react";

import heroBg from "../assets/high_quality.png";
import engImg from "../assets/home-english.png";
import avatars from "../assets/avatars.png";

// Import program images
import spokenEnglishImg from "../assets/programs/spoken-english-mastery.png";
import campusToCorporateImg from "../assets/programs/campus-to-corporate.png";
import fullStackJavaImg from "../assets/programs/full-stack-java.png";

// Import partner logos
import vtuLogo from "../assets/partners/vtu.png";
import startupIndiaLogo from "../assets/partners/startup-india.png";
import isoLogo from "../assets/partners/iso.png";
import msmeLogo from "../assets/partners/msme.png";

function LogoBox({ alt, domain }: { alt: string, domain: string }) {
  const customLogos: Record<string, string> = {
    "tcs.com": "https://i.logos-download.com/113971/29583-s2560-9598f09d0f40cf2bc3d3c47217493980.png/Tata_Consultancy_Services_Logo_2020-s2560.png?dl",
    "infosys.com": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/500px-Infosys_logo.svg.png",


  };

  const iconUrl =
    customLogos[domain] ||
    `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;


  return (
    <div className="flex-shrink-0 px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center min-w-[200px] h-32 hover:border-accent-gold hover:shadow-lg transition-all group gap-2">

      <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-accent-gold/10 transition-colors shrink-0 overflow-hidden border border-slate-100">

        <img
          src={iconUrl}
          alt={`${alt} logo`}
          className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${alt}&background=transparent&color=1B2B48&bold=true`;
          }}
        />

      </div>
      <span className="text-xs font-extrabold text-primary/80 uppercase tracking-widest font-sans group-hover:text-accent-gold transition-colors duration-300">{alt}</span>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
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
      {/* Hero Section */}
      <section
        className="relative pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-cover bg-[center_right_-100px] md:bg-center bg-no-repeat font-sans"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Subtle overlay for mobile readability */}
        <div className="absolute inset-0 bg-white/40 md:hidden pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:pl-32 lg:pr-20 text-center lg:text-left grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <motion.h1 variants={itemVariants} className="font-serif text-4xl sm:text-5xl md:text-7xl text-primary mb-6 leading-[1.1] font-extrabold italic tracking-tight lg:max-w-xl">
              From Learning to <span className="text-accent-gold">Earning</span> – Start Your Journey Today.
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-[#475569] mb-10 max-w-[85%] sm:max-w-md lg:max-w-md mx-auto lg:mx-0 font-sans leading-relaxed font-medium">
              Speak confidently, gain skills, and step into your career. We bridge the gap between where you are and where you want to be with academic excellence.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <button className="brand-gradient-gold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 font-serif italic">
                Book a Class
                <ArrowRight size={18} />
              </button>
              <button className="bg-white/90 backdrop-blur-sm border border-outline-variant text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-white transition-all flex items-center justify-center gap-2 font-serif italic">
                <MessageCircle size={18} className="text-accent-gold" />
                WhatsApp Now
              </button>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left lg:text-left mt-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent-gold/10 p-2 rounded-lg shrink-0">
                  <Globe className="text-accent-gold" size={24} />
                </div>
                <div>
                  <p className="font-bold text-primary font-serif italic text-base sm:text-lg">Daily Practice</p>
                  <p className="text-sm text-on-surface-variant font-sans">Native language tailored</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent-gold/10 p-2 rounded-lg shrink-0">
                  <Briefcase className="text-accent-gold" size={24} />
                </div>
                <div>
                  <p className="font-bold text-primary font-serif italic text-base sm:text-lg">Live Projects</p>
                  <p className="text-sm text-on-surface-variant font-sans">Real career opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent-gold/10 p-2 rounded-lg shrink-0">
                  <CheckCircle2 className="text-accent-gold" size={24} />
                </div>
                <div>
                  <p className="font-bold text-primary font-serif italic text-base sm:text-lg">Outcome-Driven</p>
                  <p className="text-sm text-on-surface-variant font-sans">Measurable results</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          ></motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-white border-y border-outline-variant font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center"
          >
            <motion.div variants={itemVariants}>
              <p className="font-serif text-3xl sm:text-5xl text-primary mb-2 font-extrabold italic">5000+</p>
              <p className="text-[10px] sm:text-xs text-accent-gold uppercase tracking-widest font-bold">Active Students</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="font-serif text-3xl sm:text-5xl text-primary mb-2 font-extrabold italic">30,000+</p>
              <p className="text-[10px] sm:text-xs text-accent-gold uppercase tracking-widest font-bold">Offline Alumni</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="font-serif text-3xl sm:text-5xl text-primary mb-2 font-extrabold italic">100+</p>
              <p className="text-[10px] sm:text-xs text-accent-gold uppercase tracking-widest font-bold">Hiring Partners</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="font-serif text-3xl sm:text-5xl text-primary mb-2 font-extrabold italic">4.9/5</p>
              <p className="text-[10px] sm:text-xs text-accent-gold uppercase tracking-widest font-bold">Satisfaction Score</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/3"
            >
              <h2 className="font-serif text-2xl sm:text-4xl text-primary mb-3 sm:mb-4 font-bold leading-tight italic">Comprehensive Skill Eco-system</h2>
              <p className="text-sm sm:text-base text-on-surface-variant font-sans mb-6 sm:mb-8">Everything you need to transform from a student to a professional in a structured, efficient environment.</p>
              <div className="flex items-center gap-2 text-accent-gold font-bold">
                <Zap size={20} />
                <span className="uppercase tracking-wider text-sm font-sans">Built for rapid growth</span>
              </div>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:w-2/3"
            >
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: School, label: "Skill Training" },
                  { icon: CreditCard, label: "Certification" },
                  { icon: Rocket, label: "Career Ready" },
                  { icon: RotateCcw, label: "Daily Practice" },
                  { icon: Users, label: "Expert Mentors" },
                  { icon: Terminal, label: "Live Projects" },
                  { icon: Mic2, label: "Mock Interviews" },
                  { icon: MessageSquare, label: "Peer Learning" },
                  { icon: TrendingUp, label: "Job Outcomes" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-slate-100 bg-surface/50 hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg brand-gradient-gold/10 flex items-center justify-center text-accent-gold">
                      <item.icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-semibold text-primary text-xs sm:text-sm font-sans">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-8 sm:py-12 bg-white border-t border-slate-100 overflow-hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-left lg:col-span-4 pr-4"
            >
              <p className="text-[10px] sm:text-xs text-on-surface-variant uppercase mb-3 sm:mb-4 tracking-widest font-bold font-sans">Trusted by Alumni At</p>
              <h2 className="font-serif text-2xl sm:text-4xl text-primary leading-tight font-bold italic">
                Teams speaking at the world's most ambitious <span className="text-accent-gold">companies</span>.
              </h2>
            </motion.div>
            <div className="relative w-full overflow-hidden py-6 lg:col-span-8">
              <div
                className="flex w-max items-center py-4 animate-scroll hover:[animation-play-state:paused]"
                style={{ animation: "scroll 20s linear infinite" }}
              >
                {[...Array(2)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex w-max items-center gap-8 pr-8">
                    {[
                      { name: 'Netflix', domain: 'netflix.com' },
                      { name: 'Amazon', domain: 'amazon.com' },
                      { name: 'Cisco', domain: 'cisco.com' },
                      { name: 'Infosys', domain: 'infosys.com' },
                      { name: 'Cognizant', domain: 'cognizant.com' },
                      { name: 'Flipkart', domain: 'flipkart.com' },
                      { name: 'EY', domain: 'ey.com' },
                      { name: 'TCS', domain: 'tcs.com' },
                      { name: 'Capgemini', domain: 'capgemini.com' },
                      { name: 'Tech Mahindra', domain: 'techmahindra.com' },
                    ].map((company, i) => (
                      <LogoBox key={`${groupIndex}-${i}`} alt={company.name} domain={company.domain} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none hidden lg:block"></div>
              <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Program */}
      <section className="py-16 sm:py-32 bg-white overflow-hidden relative border-y border-slate-100 font-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 blur-3xl -mr-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <img
                  className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                  src={engImg}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-serif text-2xl sm:text-4xl text-primary mb-4 sm:mb-6 font-bold leading-tight italic">Speak English Confidently Using Your Regional Language</h2>
              <p className="text-base sm:text-xl mb-6 sm:mb-8 leading-relaxed text-on-surface-variant font-sans">
                Build strong communication skills using your native language as a bridge. No theory overload — only real-world speaking.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 font-sans">
                <div className="flex -space-x-3">
                  {["0.5%", "66.5%", "99.5%"].map((pos, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm bg-slate-100 bg-no-repeat"
                      style={{
                        backgroundImage: `url(${avatars})`,
                        backgroundSize: "460% auto",
                        backgroundPosition: `${pos} center`
                      }}
                    />
                  ))}
                </div>
                <p className="font-bold text-accent-gold text-sm sm:text-base">5000+ learners enrolled</p>
              </div>
              <button className="brand-gradient-navy text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold font-serif italic text-sm sm:text-base shadow-xl hover:brightness-110 transition-all uppercase tracking-wide">
                Start Speaking Today
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Partner Credentials Section */}
      <section className="py-12 sm:py-20 bg-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border-4 border-[#D4AF37]/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] transition-all duration-500 overflow-hidden group"
          >
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -mt-32 -mr-32 group-hover:bg-accent-gold/10 transition-colors duration-700"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
              {/* Heading Side */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <h3 className="font-serif text-3xl sm:text-4xl text-primary font-bold leading-tight italic">
                  Credential Platform Partner
                </h3>
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden lg:block w-px h-24 bg-slate-200"></div>

              {/* Logos Grid */}
              <div className="lg:w-2/3 flex flex-wrap items-center justify-center lg:justify-between gap-8 sm:gap-12 md:gap-16">
                <div className="flex flex-col items-center gap-2">
                  <img src={vtuLogo} alt="VTU" className="h-20 sm:h-24 object-contain drop-shadow-md hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={startupIndiaLogo} alt="Startup India" className="h-16 sm:h-20 object-contain drop-shadow-md hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={isoLogo} alt="ISO Certified" className="h-16 sm:h-20 object-contain drop-shadow-md hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={msmeLogo} alt="MSME" className="h-16 sm:h-20 object-contain drop-shadow-md hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <RoadmapSection />

      {/* Programs Cards */}
      <section className="py-8 sm:py-16 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8"
          >
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl sm:text-4xl text-primary mb-3 sm:mb-4 font-bold italic">Our Signature Programs</h2>
              <p className="text-sm sm:text-base text-on-surface-variant font-sans">Specialized tracks designed for rapid skill acquisition and career results.</p>
            </div>
            <Link to="/programs" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b-2 border-accent-gold group uppercase text-xs sm:text-sm tracking-wider font-sans">
              View All Programs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12"
          >
            <ProgramCard
              tag="Popular"
              category="Spoken English"
              title="Spoken English Mastery"
              desc="A structured Spoken English program designed to build fluency, confidence, pronunciation, and real-world communication skills."
              img={spokenEnglishImg}
              onClick={() => navigate("/programs?program=Spoken English Mastery")}
            />
            <ProgramCard
              tag="Career"
              tagColor="bg-accent-gold/10 text-accent-gold border-accent-gold/20"
              category="Job Ready"
              title="Campus to Corporate Program"
              desc="Intensive preparation program with mock interviews, resume building, and aptitude training for smooth career transitions."
              img={campusToCorporateImg}
              onClick={() => navigate("/programs?program=Campus to Corporate Program")}
            />
            <ProgramCard
              tag="Technical"
              tagColor="bg-slate-50 text-on-surface-variant border-slate-200"
              category="BTech"
              title="Full Stack Java Developer"
              desc="Master Java, Spring Boot, React, and MySQL to become a complete Full Stack Developer."
              img={fullStackJavaImg}
              onClick={() => navigate("/programs?program=Full Stack Java Developer")}
            />
          </motion.div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-2 sm:py-8 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-16 overflow-hidden relative border border-slate-100 shadow-2xl">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-surface rounded-full blur-[100px]"></div>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-primary mb-6 sm:mb-8 font-bold leading-tight italic">Built for <span className="text-accent-gold">outcomes</span>. Not curriculum theatre.</h2>
                <p className="text-base sm:text-xl text-on-surface-variant mb-8 sm:mb-12 font-sans leading-relaxed">
                  We don't just teach modules; we build careers. Our methodology focuses on the specific gaps that keep talented individuals from reaching their full professional potential.
                </p>
                <Link to="/about" className="inline-block">
                  <button className="brand-gradient-navy text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold font-serif italic text-sm sm:text-base shadow-lg hover:brightness-110 transition-all uppercase tracking-widest">
                    Learn More About Us
                  </button>
                </Link>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                <ValueCard icon={ShieldCheck} title="Certifications" text="Validated skills for your resume." />
                <ValueCard icon={Handshake} title="Hands-on" text="Learn by doing, not just watching." />
                <ValueCard icon={Brain} title="Mentorship" text="Direct access to industry pros." />
                <ValueCard icon={Wallet} title="Placement" text="Direct leads and support." />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LogoItem({ alt, src }: { alt: string, src: string }) {
  return (
    <img
      alt={alt}
      className="h-8 md:h-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform"
      src={src}
      referrerPolicy="no-referrer"
    />
  );
}

function ProgramCard({ tag, category, title, desc, duration, img, tagColor = "bg-slate-100 text-primary border-slate-200", onClick }: { tag: string, category?: string, title: string, desc: string, duration?: string, img: string, tagColor?: string, onClick?: () => void }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100 cursor-pointer max-w-[350px] mx-auto w-full"
    >
      <div className="h-52 overflow-hidden relative">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img} alt={title} />
      </div>
      <div className="p-6">
        <h3 className="text-lg text-primary mb-2 font-serif font-bold italic group-hover:text-accent-gold transition-colors">{title}</h3>
        <p className="text-on-surface-variant mb-5 font-sans text-xs sm:text-sm leading-relaxed line-clamp-2">{desc}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
          <span className="font-bold text-primary font-serif italic uppercase tracking-wider">{duration}</span>
          <div className="bg-surface p-1.5 rounded-full group-hover:bg-accent-gold group-hover:text-white transition-colors">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ValueCard({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-surface p-4 sm:p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group cursor-default"
    >
      <Icon className="text-accent-gold mb-3 sm:mb-4 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
      <h4 className="font-bold text-primary mb-2 text-xs sm:text-sm uppercase tracking-wide font-serif italic">{title}</h4>
      <p className="text-[11px] sm:text-xs text-on-surface-variant font-sans leading-relaxed">{text}</p>
    </motion.div>
  );
}

const ROADMAP_STEPS = [
  { title: "Foundation", desc: "Communication basics, confidence building, and native language bridging.", icon: Compass },
  { title: "Skill Training", desc: "Practical English, industry-specific skills, and live hands-on projects.", icon: Zap },
  { title: "Certification", desc: "Globally recognized industry certificates to validate your expertise.", icon: Award },
  { title: "Career Launch", desc: "Placement readiness, mock interviews, and direct hiring partner connections.", icon: Rocket },
];

function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(-1);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!isInView) return;
    // Animate path draw
    const path = pathRef.current;
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)";
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    }
    // Sequentially activate each step icon
    ROADMAP_STEPS.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 400 + i * 500);
    });
  }, [isInView]);

  return (
    <section className="py-6 sm:py-12 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="text-[10px] text-accent-gold uppercase tracking-widest font-bold mb-3 block font-sans">Learning Journey</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-primary mb-3 sm:mb-4 font-bold italic">Your Path to Mastery</h2>
          <p className="text-sm sm:text-base text-on-surface-variant font-sans">A structured evolution from novice to industry-expert.</p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

          {/* Animated SVG Roadmap Path (desktop only) */}
          <div className="hidden md:block absolute inset-x-0 top-0 h-[7rem] z-0 pointer-events-none">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 112"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="30%" stopColor="#d4af37" />
                  <stop offset="70%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Curved path connecting all 4 icon centers */}
              <path
                ref={pathRef}
                d="M 100 56 C 160 20, 240 92, 300 56 S 440 20, 500 56 S 640 92, 700 56"
                stroke="url(#rg)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            </svg>
          </div>

          {/* Step Cards */}
          {ROADMAP_STEPS.map((step, i) => {
            const isActive = activeStep >= i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center text-center group cursor-default"
              >
                {/* Floating Icon Box */}
                <motion.div
                  animate={isActive
                    ? { y: [0, -6, 0], boxShadow: ["0 4px 16px #0001", "0 8px 32px #d4af3740", "0 4px 16px #0001"] }
                    : { y: 0 }}
                  transition={isActive ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl flex items-center justify-center mb-5 sm:mb-7 transition-all duration-500 ${isActive
                    ? "border-2 border-accent-gold shadow-[0_0_24px_4px_rgba(212,175,55,0.25)]"
                    : "border-2 border-slate-100 shadow-md"
                    }`}
                >
                  {/* Number badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-md border-2 transition-all duration-500 font-sans ${isActive
                    ? "bg-accent-gold text-white border-accent-gold"
                    : "bg-white text-on-surface-variant border-slate-100"
                    }`}>
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={isActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
                  >
                    <step.icon
                      size={34}
                      strokeWidth={1.5}
                      className={`transition-colors duration-500 ${isActive ? "text-accent-gold" : "text-slate-400"}`}
                    />
                  </motion.div>
                </motion.div>

                <h3 className={`text-base sm:text-lg font-serif font-bold italic mb-2 transition-colors duration-500 ${isActive ? "text-primary" : "text-slate-400"}`}>
                  {step.title}
                </h3>
                <p className="text-on-surface-variant font-sans text-xs sm:text-sm leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
