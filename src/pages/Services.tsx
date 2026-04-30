import React from "react";
import { motion } from "motion/react";
import { Check, GraduationCap, Award, TrendingUp, Layers, Star, ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import hero1 from "../assets/services/SERVICES PAGE -hero.svg";
import skillCertImg from "../assets/services/skill-certifications.png";
import manpowerImg from "../assets/services/manpower-solutions.png";
import admissionImg from "../assets/services/admission-support.png";
import trainingImg from "../assets/services/training-workforce.png";
import placementImg from "../assets/services/placement-assistance.png";
import liveProjectImg from "../assets/services/live-projects.png";
import yourJourneyImg from "../assets/services/your journey.png";
import "./Services.css";

const SERVICES_DATA = [
  { title: "Skill Certification", description: "We offer industry-relevant courses and upskilling programs designed to enhance knowledge and employability. Learners receive recognized certifications upon successful completion.", image: skillCertImg, link: "/services/skill-certification" },
  { title: "Manpower Solutions for Companies", description: "We provide skilled and job-ready candidates to meet the manpower requirements of various organizations across industries, ensuring the right talent for the right role.", image: manpowerImg, link: "/services/manpower-solutions" },
  { title: "Admission Support for Colleges & Learners", description: "We assist students and institutions with seamless admission processes, helping learners choose the right courses and colleges for their career growth.", image: admissionImg, link: "/services/admission-support" },
  { title: "Training for Skilled & Unskilled Workforce", description: "We deliver practical training programs for both skilled and unskilled individuals, focusing on job readiness, productivity, and career development.", image: trainingImg, link: "/services/training-workforce" },
  { title: "Placement Assistance & Career Support", description: "We support learners with placement opportunities, interview preparation, and career guidance to help them secure suitable jobs.", image: placementImg, link: "/services/placement-assistance" },
  { title: "Live Projects & Industry-Driven Learning", description: "Get hands-on experience by working on real-time projects under the guidance of industry experts. Build practical skills and become job-ready with confidence.", image: liveProjectImg, link: "/services/live-projects" },
];

const TESTIMONIALS = [
  { text: "The certification program was intense but rewarding. I secured a job within 2 months of completion.", name: "Rohan Sharma", role: "Software Developer", initials: "RS", dark: true },
  { text: "Arambha provided me the mentorship I needed to switch careers into Digital Marketing. Truly grateful!", name: "Priya Verma", role: "Marketing Specialist", initials: "PV", dark: false },
  { text: "The live projects were the highlight. Dealing with real client briefs gave me immense confidence.", name: "Ankit Kapoor", role: "UI/UX Designer", initials: "AK", dark: true },
  { text: "Flexible learning meant I could study while working my part-time job. Excellent support system!", name: "Sneha Mehta", role: "Data Analyst", initials: "SM", dark: false },
  { text: "Industry-led sessions helped me understand the latest trends in DevOps that no textbook covers.", name: "Vikram Jha", role: "Cloud Engineer", initials: "VJ", dark: true },
  { text: "The resume optimization service changed everything for me. Response rate tripled in two weeks.", name: "Rahul Das", role: "Business Analyst", initials: "RD", dark: false },
  { text: "Placement support was genuine. They don't just send you links, they prepare you for the room.", name: "Neha Singh", role: "HR Executive", initials: "NS", dark: true },
  { text: "Best investment I made for my career. The network you build here is invaluable.", name: "Arjun Gupta", role: "Full Stack Dev", initials: "AG", dark: false },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F9FB] font-sans text-primary">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap');

        :root {
          --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
          --font-serif: "Lora", serif;
          --font-manrope: "Manrope", sans-serif;
        }

        .services-hero {
          background: #f8f9fb;
          font-family: var(--font-sans);
        }

        .hero-title {
          font-family: var(--font-serif) !important;
          font-style: italic;
        }

        .font-serif {
          font-family: var(--font-serif), serif;
        }

        .font-sans {
          font-family: var(--font-sans), sans-serif;
        }
      `}} />

      {/* ── Hero Section ── redesigned */}
      {/* ── Hero Section ── */}
      <section className="relative bg-white overflow-hidden flex items-center min-h-[480px] sm:min-h-[560px] lg:min-h-[700px]" aria-label="Our Services">
        {/* Background Image: visible on all screens, only shown behind content */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={hero1}
            alt="E-learning services background"
            className="w-full h-full object-contain object-left-top sm:object-center lg:object-[20%_center]"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Spacer for desktop — lets illustration breathe */}
            <div className="hidden lg:block lg:w-[55%]" />

            {/* Text content — glassmorphism card on mobile for legibility over the illustration */}
            <motion.div
              className="w-full lg:w-[45%] text-center lg:text-left bg-white/80 sm:bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-2xl"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h1 className="font-serif font-extrabold text-[clamp(2rem,5vw,3.6rem)] mb-4 sm:mb-6 leading-[1.05] italic">
                <span className="text-[#1B2B48]">Our</span> <span className="text-[#D4AF37]">Services</span>
              </h1>
              <p className="text-[#475569] text-base sm:text-[1.1rem] mb-6 sm:mb-8 max-w-[620px] mx-auto lg:mx-0 font-sans leading-[1.6]">
                We don't just teach — we help you build a career. From learning to placement, we guide you at every step with practical skills and real opportunities.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  className="w-full sm:w-auto bg-[#02367B] text-white px-6 py-3 sm:px-[26px] sm:py-[14px] rounded-xl font-bold text-sm sm:text-base font-serif italic shadow-[0_10px_28px_rgba(2,54,123,0.18)] hover:-translate-y-0.5 transition-all"
                  onClick={() => navigate('/programs')}
                >
                  Explore Programs
                </button>
                <button
                  className="w-full sm:w-auto bg-transparent border-2 border-[#1B2B48] text-[#1B2B48] px-6 py-3 sm:px-[26px] sm:py-[14px] rounded-xl font-bold text-sm sm:text-base font-serif italic hover:bg-[#1B2B48] hover:text-white transition-all"
                  onClick={() => { /* open consult modal or link */ }}
                >
                  Consult an Expert
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Arambha ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden bg-white">
        {/* subtle decorative blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2C4D8A]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <span className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#B8860B] font-bold tracking-[0.22em] uppercase text-[11px] px-4 py-1.5 rounded-full mb-6 font-sans">
                Transformation Leaders
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-serif italic text-[#0d2350] mb-6 leading-[1.1]">
                We don't just teach —{" "}
                <span className="text-[#D4AF37]">we help you build a career.</span>
              </h2>
              <p className="text-[#3A5785] text-lg mb-6 leading-relaxed max-w-lg font-sans">
                Our comprehensive approach bridges the gap between academic learning and real-world industrial demands through mentorship and practical exposure.
              </p>
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                src={yourJourneyImg}
                alt="Your Journey"
                className="w-full max-w-lg object-contain mt-4 rounded-2xl"
              />
            </motion.div>

            {/* Right — Bento Feature Grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">

              {/* Card 1 — Wide top: Industry Experts */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.02 }}
                className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl p-6 md:p-8 cursor-default group border border-[#E8ECF5] hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #EEF2FB 0%, #F5F7FF 100%)", minHeight: 160 }}
              >
                <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#2C4D8A]/5" />
                <div className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full bg-[#2C4D8A]/5" />
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap className="w-20 h-20 text-[#2C4D8A]" />
                </div>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2 font-sans">01 — Learn</p>
                <h3 className="text-2xl font-extrabold font-serif italic text-[#0d2350] mb-1">
                  Industry Experts
                </h3>
                <p className="text-[#3A5785] text-sm max-w-xs font-sans">Get trained by professionals with real-world experience in top companies.</p>
                <div className="mt-4 inline-flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#B8860B] text-xs font-bold px-3 py-1.5 rounded-full font-sans">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                  Live Mentorship Sessions
                </div>
              </motion.div>

              {/* Card 2 — Certified Programs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="col-span-1 relative overflow-hidden rounded-3xl p-6 cursor-default group border border-[#E8ECF5] hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(145deg, #F0F4FF 0%, #F8F9FF 100%)", minHeight: 180 }}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#2C4D8A]/5" />
                <Award className="w-8 h-8 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest mb-1 font-sans">02 — Certify</p>
                <h3 className="text-lg font-extrabold font-serif italic text-[#0d2350] leading-tight">
                  Certified<br />Programs
                </h3>
                <p className="text-[#3A5785] text-sm mt-3 leading-relaxed font-sans">Earn certifications that actually matter in the job market.</p>
              </motion.div>

              {/* Card 3 — Career Support */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="col-span-1 relative overflow-hidden rounded-3xl p-6 cursor-default group border border-[#E8ECF5] hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(145deg, #F0F4FF 0%, #F8F9FF 100%)", minHeight: 180 }}
              >
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#2C4D8A]/5" />
                <TrendingUp className="w-8 h-8 text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest mb-1 font-sans">03 — Launch</p>
                <h3 className="text-lg font-extrabold font-serif italic text-[#0d2350] leading-tight">
                  Career<br />Support
                </h3>
                <p className="text-[#3A5785] text-sm mt-3 leading-relaxed font-sans">Resume building, interview prep, and placement guidance.</p>
              </motion.div>

              {/* Card 4 — Wide bottom: Live Projects */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl p-6 md:p-7 cursor-default group border border-[#E8ECF5] hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #EEF2FB 0%, #F5F7FF 100%)", minHeight: 130 }}
              >
                <div className="absolute -left-8 -top-8 w-36 h-36 rounded-full bg-[#2C4D8A]/5" />
                <div className="absolute top-5 right-7 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Layers className="w-16 h-16 text-[#2C4D8A]" />
                </div>
                <div>
                  <p className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest mb-1 font-sans">04 — Build</p>
                  <h3 className="text-xl font-extrabold font-serif italic text-[#0d2350]">Live Projects</h3>
                  <p className="text-[#3A5785] text-sm mt-1 max-w-sm font-sans">Work on real client briefs and build a portfolio that gets you hired.</p>
                </div>
              </motion.div>


            </div>


          </div>
        </div>
      </section>


      {/* ── Expert Solutions / Service Cards ── */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-sans">
            CORE OFFERINGS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif italic text-[#2C4D8A] mb-10 sm:mb-16">
            Expert Solutions for Growth
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => navigate(service.link)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100 cursor-pointer text-left flex flex-col"
              >
                <div className="h-auto overflow-hidden relative bg-gradient-to-b from-[#f0f4ff] to-[#f8faff]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card-image transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-[#3A5785] text-sm leading-relaxed flex-grow font-sans">{service.description}</p>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-[#2C4D8A] hover:bg-[#D4AF37] transition-all duration-300 group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-[#F7F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif italic text-[#2C4D8A] mb-4">
              What Our Learners Say
            </h2>
            <p className="text-[#3A5785] max-w-2xl mx-auto font-sans text-sm sm:text-base">
              Join thousands of successful professionals who started their journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white border border-[#E0E3E5] hover:border-[#D4AF37] transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#191C1E] mb-6 italic text-sm leading-relaxed font-sans">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 font-sans"
                    style={{ backgroundColor: t.dark ? '#041632' : '#D4AF37' }}
                  >
                    {t.initials}
                  </div>
                  <div className="font-sans">
                    <h4 className="font-bold text-[#2C4D8A] text-sm">{t.name}</h4>
                    <p className="text-xs text-[#3A5785]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="brand-gradient-gold rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff,_transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-primary mb-6 sm:mb-8 italic">Start Your Confidence Journey Today</h2>
              <p className="text-primary/80 max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg font-medium font-sans">
                Join structured live training sessions from anywhere in Karnataka. Transform your communication and career with Arambha's proven system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center font-serif italic">
                <Link to="/programs" className="bg-primary text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 group text-base sm:text-lg">
                  View Programs <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <button className="bg-white text-primary border-2 border-primary px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-base sm:text-lg">
                  Book Free Demo <Calendar className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
