import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, ArrowRight, Users, Clock, Star, BadgeCheck } from "lucide-react";

import skillCertImg from "../assets/services/services updated/courses and upskilling.svg";
import manpowerImg from "../assets/services/services updated/manpower solutions for companies.svg";
import admissionImg from "../assets/services/services updated/admission support.svg";
import trainingImg from "../assets/services/services updated/training.svg";
import placementImg from "../assets/services/services updated/placeement assistance.svg";
import liveProjectImg from "../assets/services/services updated/live projects.svg";

import skillCertImg1 from "../assets/services/services updated/courses and upskilling.svg";
import skillCertImgOverview from "../assets/services/skill-certifications.png";
import manpowerImg1 from "../assets/services/services updated/workforce solutions.svg";
import manpowerImgOverview from "../assets/services/manpower-solutions.png";
import admissionImg1 from "../assets/services/services updated/admission support.svg";
import admissionImgOverview from "../assets/services/admission-support.png";
import trainingImg1 from "../assets/services/services updated/workforce training.svg";
import trainingImgOverview from "../assets/services/training-workforce.png";
import placementImg1 from "../assets/services/services updated/placement assistance.svg";
import placementImgOverview from "../assets/services/placement-assistance.png";
import liveProjectImg1 from "../assets/services/services updated/live projects.svg";
import liveProjectImgOverview from "../assets/services/live-projects.png";

type Service = {
  title: string;
  subtitle: string;
  image: string;
  overview: string;
  highlights: string[];
  benefits: { icon: React.ReactNode; label: string; value: string }[];
  features: { title: string; desc: string }[];
  overviewImage?: string;
};

const DATA: Record<string, Service> = {
  "skill-certification": {
    title: "Skill Certification",
    subtitle: "Industry-recognized certifications that validate your expertise and accelerate your career.",
    image: skillCertImg,
    overviewImage: skillCertImgOverview,
    overview: "Our Skill Certification program equips learners with practical, industry-relevant competencies and internationally recognized credentials. Whether you're a fresher looking to stand out or a professional aiming to upskill, our tracks are structured for real-world impact.",
    highlights: ["MSME & Government-recognized certificates", "30+ certification tracks", "Flexible online & offline modes", "Lifetime access to materials", "Expert mentorship"],
    benefits: [
      { icon: <Users />, label: "Learners Certified", value: "10,000+" },
      { icon: <Clock />, label: "Duration", value: "30–90 Days" },
      { icon: <Star />, label: "Success Rate", value: "96%" },
      { icon: <BadgeCheck />, label: "Industry Partners", value: "100+" },
    ],
    features: [
      { title: "Structured Curriculum", desc: "Carefully crafted modules aligned with current industry demands and global certification standards." },
      { title: "Live & Recorded Sessions", desc: "Attend live classes or catch up at your own pace with high-quality recorded lectures." },
      { title: "Hands-on Assignments", desc: "Practical assignments that reinforce concepts and prepare you for real workplace challenges." },
      { title: "Exam & Assessment Support", desc: "Mock tests, practice papers, and one-on-one revision sessions before the final assessment." },
      { title: "Digital Certificate", desc: "Receive a verifiable digital certificate shareable on LinkedIn and major job portals." },
      { title: "Post-Certification Guidance", desc: "Career counseling and job referral support after you earn your certification." },
    ],
  },
  "manpower-solutions": {
    title: "Manpower Solutions",
    subtitle: "Connecting businesses with the right talent, every time, at scale.",
    image: manpowerImg,
    overviewImage: manpowerImgOverview,
    overview: "Arambha's Manpower Solutions bridges the talent gap between organizations and job-ready candidates. We partner with businesses across industries to source, screen, and supply skilled professionals who align with your specific workforce needs.",
    highlights: ["Dedicated recruitment team", "Pan-India talent network", "Pre-screened candidates", "Bulk & campus hiring", "Industry-specific pipelines"],
    benefits: [
      { icon: <Users />, label: "Companies Served", value: "200+" },
      { icon: <Clock />, label: "Placement Time", value: "7–14 Days" },
      { icon: <Star />, label: "Client Satisfaction", value: "98%" },
      { icon: <BadgeCheck />, label: "Sectors Covered", value: "15+" },
    ],
    features: [
      { title: "Talent Sourcing", desc: "We identify and attract candidates from our extensive alumni network and job portals." },
      { title: "Screening & Shortlisting", desc: "Multi-round screening including aptitude tests, HR rounds, and skill assessments." },
      { title: "Campus Recruitment", desc: "Organized drives at colleges and institutions to find fresh talent for your company." },
      { title: "Contract Staffing", desc: "Flexible short-term staffing solutions for project-based or seasonal requirements." },
      { title: "Executive Search", desc: "Specialized headhunting for senior and leadership positions across industries." },
      { title: "Onboarding Support", desc: "We assist with documentation, orientation, and initial training for new hires." },
    ],
  },
  "admission-support": {
    title: "Admission Support",
    subtitle: "Guiding students and institutions through every step of the admission journey.",
    image: admissionImg,
    overviewImage: admissionImgOverview,
    overview: "Our Admission Support service simplifies course and college selection for students, while helping institutions attract the right candidates. We provide personalized counseling, documentation assistance, and end-to-end enrollment support.",
    highlights: ["Free career counseling", "Course shortlisting", "Document submission support", "Scholarship guidance", "Post-admission follow-up"],
    benefits: [
      { icon: <Users />, label: "Students Guided", value: "5,000+" },
      { icon: <Clock />, label: "Counseling Time", value: "1–3 Days" },
      { icon: <Star />, label: "Satisfaction Rate", value: "97%" },
      { icon: <BadgeCheck />, label: "Partner Colleges", value: "50+" },
    ],
    features: [
      { title: "Career Counseling", desc: "One-on-one sessions to help students identify their strengths and ideal career paths." },
      { title: "Course Matching", desc: "Smart matching of students with the right programs based on their goals and eligibility." },
      { title: "Application Assistance", desc: "Step-by-step help with filling applications, writing SOPs, and gathering documents." },
      { title: "Scholarship Guidance", desc: "Information on government and institutional scholarships and how to apply." },
      { title: "Institutional Support", desc: "Helping colleges attract qualified candidates and streamline their admission processes." },
      { title: "Follow-Up & Support", desc: "Continuous support from application to enrollment, ensuring no student is left behind." },
    ],
  },
  "training-workforce": {
    title: "Training for Workforce",
    subtitle: "Transforming potential into professional performance at every skill level.",
    image: trainingImg,
    overviewImage: trainingImgOverview,
    overview: "Our workforce training programs cater to individuals at all skill levels — from those with no prior training to experienced professionals looking to upskill. We focus on practical, job-ready skills that deliver immediate results in the workplace.",
    highlights: ["Customized programs", "On-site & off-site options", "Soft & technical skills", "Progress tracking", "Government-approved modules"],
    benefits: [
      { icon: <Users />, label: "Workforce Trained", value: "15,000+" },
      { icon: <Clock />, label: "Duration", value: "2 Weeks–6 Months" },
      { icon: <Star />, label: "Employer Satisfaction", value: "95%" },
      { icon: <BadgeCheck />, label: "Training Tracks", value: "25+" },
    ],
    features: [
      { title: "Needs Assessment", desc: "We analyze your workforce's current skill gaps and design a targeted training plan." },
      { title: "Customized Modules", desc: "Training content tailored to your industry, role requirements, and company culture." },
      { title: "Experienced Trainers", desc: "Industry practitioners with years of hands-on experience delivering the training." },
      { title: "On-the-Job Training", desc: "Practical exercises that mirror real work environments for immediate skill application." },
      { title: "Progress Monitoring", desc: "Regular assessments and reports to track individual and group progress throughout." },
      { title: "Certification", desc: "Participants receive certificates validating their newly acquired skills." },
    ],
  },
  "placement-assistance": {
    title: "Placement Assistance",
    subtitle: "Your career launch partner — from resume to offer letter.",
    image: placementImg,
    overviewImage: placementImgOverview,
    overview: "Arambha's Placement Assistance program goes beyond connecting you with employers. We prepare you holistically — from crafting a standout resume to acing interviews — and actively connect you with our hiring partner network to land the right job.",
    highlights: ["Dedicated placement coordinators", "100+ hiring partners", "Resume & LinkedIn optimization", "Mock interviews", "Post-placement support"],
    benefits: [
      { icon: <Users />, label: "Students Placed", value: "8,000+" },
      { icon: <Clock />, label: "Time to Placement", value: "30–60 Days" },
      { icon: <Star />, label: "Placement Rate", value: "93%" },
      { icon: <BadgeCheck />, label: "Hiring Partners", value: "100+" },
    ],
    features: [
      { title: "Resume Building", desc: "Professional resume crafting with ATS-optimized formatting and compelling content." },
      { title: "Interview Preparation", desc: "Comprehensive mock interviews covering HR, technical, and behavioral rounds." },
      { title: "Aptitude Training", desc: "Focused aptitude, reasoning, and verbal ability training for competitive hiring." },
      { title: "Company Connections", desc: "Direct introductions to our network of 100+ hiring partner companies." },
      { title: "Offer Negotiation", desc: "Guidance on evaluating and negotiating job offers to maximize your compensation." },
      { title: "Career Counseling", desc: "Ongoing career advice and support even after placement to help you grow." },
    ],
  },
  "live-projects": {
    title: "Live Projects & Industry Learning",
    subtitle: "Build real things. Gain real experience. Get real results.",
    image: liveProjectImg,
    overviewImage: liveProjectImgOverview,
    overview: "Our Live Projects program immerses learners in actual industry projects under the guidance of senior professionals. You work on real client briefs, solve genuine business problems, and build a portfolio that speaks louder than any certificate.",
    highlights: ["Real client projects", "Industry mentor guidance", "Portfolio-ready deliverables", "Team-based learning", "Industry networking"],
    benefits: [
      { icon: <Users />, label: "Projects Completed", value: "2,000+" },
      { icon: <Clock />, label: "Duration", value: "4–12 Weeks" },
      { icon: <Star />, label: "Learner Rating", value: "4.9/5" },
      { icon: <BadgeCheck />, label: "Industry Domains", value: "10+" },
    ],
    features: [
      { title: "Real Client Briefs", desc: "Work on actual project briefs from our industry partners — not simulated case studies." },
      { title: "Expert Mentorship", desc: "Get daily guidance from senior professionals who've worked in top companies." },
      { title: "Agile Workflow", desc: "Experience real sprint planning, stand-ups, and delivery cycles just like in industry." },
      { title: "Portfolio Building", desc: "Complete deliverables that you can proudly showcase to employers." },
      { title: "Cross-Domain Exposure", desc: "Projects spanning tech, marketing, finance, design, and more." },
      { title: "Completion Certificate", desc: "A recognized certificate upon successful project delivery, co-signed by mentors." },
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = DATA[slug ?? ""];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#F7F9FB] font-sans">
        <h1 className="text-4xl font-bold font-serif italic text-[#2C4D8A] mb-4">
          Service Not Found
        </h1>
        <p className="text-[#3A5785] mb-8">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="bg-[#2C4D8A] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#D4AF37] transition-all">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F9FB] min-h-screen font-sans">
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

      {/* ── HERO: Full Bleed Banner Layout ── */}
      <section className="relative w-full bg-transparent min-h-[400px] md:min-h-[600px] lg:min-h-[800px] flex items-center justify-center">
        <div className="absolute top-2 left-2 sm:left-6 z-20">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate('/services')}
            className="flex items-center justify-center text-[#0d2350] hover:text-[#D4AF37] transition-colors bg-white/90 backdrop-blur-md w-10 h-10 rounded-full shadow-md"
            aria-label="Back to Services"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ padding: 0, paddingTop: "1rem" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pt-24 pb-8 px-4"
        >
          <img
            src={service.image}
            alt={service.title}
            style={{ width: "100%", height: "fit-content" }}
            className=" object-contain object-center"
          />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {service.benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center px-6 py-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2C4D8A]/8 flex items-center justify-center mb-3 text-[#2C4D8A]">
                {b.icon}
              </div>
              <p className="text-3xl font-extrabold font-serif italic text-[#2C4D8A] leading-none mb-1">{b.value}</p>
              <p className="text-[11px] text-[#3A5785] uppercase tracking-widest font-bold font-sans">{b.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-bold tracking-[0.22em] uppercase text-[11px] mb-4 block font-sans">Overview</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif italic text-[#2C4D8A] mb-6 leading-tight">
              What We Offer
            </h2>
            <p className="text-[#3A5785] leading-relaxed text-base mb-10 font-sans">
              {service.overview}
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              {service.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2.5 bg-white border border-[#E0E8F5] hover:border-[#D4AF37]/60 hover:shadow-md px-4 py-2.5 rounded-xl group transition-all duration-200 cursor-default"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-[#2C4D8A] font-semibold text-sm font-sans">{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* right image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#2C4D8A]/10 rounded-[2rem] blur-2xl" />
            <img
              src={service.overviewImage || service.image}
              alt={service.title}
              className="relative w-full h-[420px] object-cover rounded-3xl shadow-2xl"
            />
            {/* floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="font-sans">
                <p className="font-extrabold text-[#2C4D8A] text-sm">Trusted by thousands</p>
                <p className="text-xs text-[#3A5785]">across India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-bold tracking-[0.22em] uppercase text-[11px] mb-4 block font-sans">What's Included</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-serif italic text-[#2C4D8A]">
              Key Features
            </h2>
            <p className="text-[#3A5785] mt-3 max-w-xl mx-auto text-sm font-sans">
              Every feature is designed to give you a practical edge in your career journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative bg-[#F7F9FB] rounded-2xl p-8 border border-[#E8ECF0] hover:border-[#D4AF37]/50 hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                {/* decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-3xl" />
                <div className="w-11 h-11 rounded-2xl bg-[#2C4D8A] group-hover:bg-[#D4AF37] flex items-center justify-center mb-5 text-white font-extrabold text-sm transition-colors duration-300 shadow-md font-sans">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-bold font-serif italic text-[#2C4D8A] mb-2">{f.title}</h3>
                <p className="text-sm text-[#3A5785] leading-relaxed font-sans">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-[#041632] relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold tracking-[0.22em] uppercase text-[11px] px-4 py-1.5 rounded-full mb-6 font-sans"
          >
            Get Started Today
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold font-serif italic text-white mb-5 leading-tight"
          >
            Ready to Transform Your Career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 mb-10 text-base max-w-xl mx-auto leading-relaxed font-sans"
          >
            Join thousands of learners who have transformed their futures with Arambha Skill Solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/programs"
              className="bg-[#D4AF37] hover:brightness-110 text-white px-10 py-4 rounded-xl font-extrabold text-sm shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all font-serif italic"
            >
              Explore Programs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="border border-white/25 hover:border-white/70 text-white px-10 py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/5 font-serif italic"
            >
              <ArrowLeft className="w-4 h-4" /> All Services
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
