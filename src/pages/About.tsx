import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Building,
  Puzzle,
  Briefcase,
  Cpu,
  Globe,
  Rocket,
  GraduationCap,
  Wrench,
  Brain,
  Code2,
  Mic2,
  BadgeCheck,
  Users,
  TrendingUp,
  TrendingDown,
  Quote,
  Compass,
  Eye,
  UserRound,
  Scale,
  MousePointer2,
  Accessibility,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  Lightbulb,
  Layers,
  Award,
  Star
} from 'lucide-react';

import hereBg from "../assets/About page-hero.svg";

// --- Helper Components ---

const Hero = () => (
  <section className="relative min-h-0 md:min-h-[650px] flex items-start justify-start pt-16 pb-4 md:pt-8 md:pb-0 overflow-hidden px-4 md:px-6 bg-white">
    {/* Desktop Background Image */}
    <div 
      className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-[center_right] lg:bg-center z-0"
      style={{ backgroundImage: `url(${hereBg})` }}
    />

    <div className="relative z-10 w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-start w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4 md:px-0 md:pl-10 lg:pl-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold font-semibold tracking-widest text-[10px] sm:text-xs uppercase"
        >
          Our Legacy of Innovation & Transformation
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[34px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif mb-6 md:mb-8 leading-[1.1] md:leading-tight tracking-tighter font-extrabold text-primary"
        >
          <span className="whitespace-nowrap">Empowering <span className="text-secondary font-serif italic">Talent.</span></span><br />
          <span className="whitespace-nowrap">Igniting <span className="text-secondary font-serif italic">Innovation.</span></span><br />
          <span className="whitespace-nowrap">Shaping Global <span className="text-secondary font-serif italic">Futures.</span></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[13px] sm:text-[15px] md:text-[17px] text-[#475569] mb-8 md:mb-10 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl font-sans md:ml-10 leading-relaxed drop-shadow-sm"
        >
          A Decade of Disruption, Growth & Transformational Impact. We are not just an institution; we are the bridge between potential and excellence.
        </motion.p>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="pt-4 pb-16 md:py-20 bg-white relative z-20 border-b border-outline-variant/30">
    <div className="max-w-7xl mx-auto px-6 overflow-x-auto">

      {/* Responsive Grid for mobile, Flex for desktop */}
      <div className="grid grid-cols-2 md:flex md:flex-nowrap items-center justify-center md:justify-between gap-y-8 md:gap-0">

        {/* ITEM */}
        <motion.div className="flex flex-col items-center text-center px-2 md:px-6">
          <span className="text-3xl md:text-5xl font-black font-serif text-primary">50+</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-accent-gold font-bold mt-2">
            Industry Programs
          </span>
        </motion.div>

        <div className="hidden md:block w-px h-16 bg-slate-300"></div>

        <motion.div className="flex flex-col items-center text-center px-2 md:px-6">
          <span className="text-3xl md:text-5xl font-black font-serif text-primary">12K+</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-accent-gold font-bold mt-2">
            Alumni Network
          </span>
        </motion.div>

        <div className="hidden md:block w-px h-16 bg-slate-300"></div>

        <motion.div className="flex flex-col items-center text-center px-2 md:px-6">
          <span className="text-3xl md:text-5xl font-black font-serif text-primary">95%</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-accent-gold font-bold mt-2">
            Placement Rate
          </span>
        </motion.div>

        <div className="hidden md:block w-px h-16 bg-slate-300"></div>

        <motion.div className="flex flex-col items-center text-center px-2 md:px-6">
          <span className="text-3xl md:text-5xl font-black font-serif text-primary">500+</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-accent-gold font-bold mt-2">
            Strategic Partnerships
          </span>
        </motion.div>

        <div className="hidden md:block w-px h-16 bg-slate-300"></div>

        <motion.div className="flex flex-col items-center text-center px-2 md:px-6 col-span-2 md:col-span-1 mt-4 md:mt-0">
          <span className="text-3xl md:text-5xl font-black font-serif text-primary">100+</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] text-accent-gold font-bold mt-2">
            Institutional Collabs
          </span>
        </motion.div>

      </div>
    </div>
  </section>
);

function TimelineItem({ year, title, description, icon: Icon, subTitle, subDesc, align = "right" }) {
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start md:items-center mb-16 md:mb-24 group pl-10 md:pl-0"
    >
      {/* TEXT SIDE */}
      <div className={`${isLeft ? "md:order-2 md:text-left" : "md:text-right"}`}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-3 py-1 bg-accent-gold/10 text-accent-gold font-bold text-[11px] rounded-full mb-3 md:mb-4 border border-accent-gold/20 tracking-wider"
        >
          {year}
        </motion.div>

        <h3 className="text-xl md:text-3xl font-serif mb-3 md:mb-4 text-primary italic font-bold leading-tight">
          {title}
        </h3>

        <p className={`text-on-surface-variant leading-relaxed font-sans text-sm md:text-base md:max-w-md ${isLeft ? "" : "md:ml-auto"}`}>
          {description}
        </p>
      </div>

      {/* CENTRAL DOT & CONNECTOR */}
      <div className="absolute top-0 md:top-1/2 left-0 md:left-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 flex items-center justify-center pointer-events-none mt-1 md:mt-0">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full brand-gradient-gold text-white flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700 relative z-20">
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        {/* The Connector Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 40, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`hidden md:block absolute h-[1px] bg-accent-gold/30 ${isLeft ? 'right-5 rotate-180' : 'left-5'} z-0`}
        />
      </div>

      {/* CARD SIDE */}
      <div className={`relative ${isLeft ? "md:order-1" : ""}`}>
        <div className="p-8 bg-[#e1e8f2] rounded-3xl border border-[#2c4d8a]/10 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden z-10">
          {/* Glass glare effect */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#2c4d8a]/5 rounded-full blur-2xl group-hover:bg-[#2c4d8a]/10 transition-colors duration-700"></div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-[#2c4d8a]/10 group-hover:scale-105 group-hover:bg-[#2c4d8a]/5 transition-all duration-500 shadow-sm">
              <Icon className="h-8 w-8 text-[#2c4d8a] group-hover:text-accent-gold transition-colors" />
            </div>

            <h4 className="text-xl md:text-2xl font-bold font-serif mb-2 italic text-[#2c4d8a]">
              {subTitle}
            </h4>

            <p className="text-[#3A5785] text-sm leading-relaxed font-sans max-w-xs">
              {subDesc}
            </p>
          </div>

          {/* Subtle animated border */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#2c4d8a] to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
        </div>
      </div>
    </motion.div>
  );
}

const Evolution = () => (
  <section className="pt-0 pb-16 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-primary mb-6 italic">Our Evolution</h2>
        <p className="text-on-surface-variant max-w-lg mx-auto font-sans">Building the Future of Professional Excellence</p>
        <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 font-sans">Explore the key milestones that have shaped Arambha into a global leader in education, technology, and talent mobility.</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-accent-gold/50 via-outline-variant to-accent-gold/50"></div>

        <TimelineItem
          year="2015"
          title="Foundation"
          description="Launched with a mission to bridge the gap between education and industry through practical, learner-focused training. Built the foundation for scalable skill development."
          icon={Building}
          subTitle="Vision Rooted"
          subDesc="The start of a journey to bridge the industry-academia gap."
        />

        <TimelineItem
          year="2017"
          title="Expansion"
          description="Expanded into holistic development with technical, soft skills, leadership, and internship programs. Reached thousands of learners across institutions."
          icon={Puzzle}
          subTitle="Holistic Growth"
          subDesc="Broadening horizons to encompass entire career paths."
          align="left"
        />

        <TimelineItem
          year="2019"
          title="Job Placement Launch"
          description="Empowering Talent, Enabling Opportunities. Launched dedicated placement and recruitment solutions to support career outcomes."
          icon={Briefcase}
          subTitle="Career Outcomes"
          subDesc="Formalizing the bridge between skilled talent and top employers."
        />

        <TimelineItem
          year="2021"
          title="IT Services Division"
          description="Driving Digital Transformation Through Innovation. Diversified into custom IT solutions to support businesses alongside workforce development."
          icon={Cpu}
          subTitle="Digital Innovation"
          subDesc="Extending expertise into the core of digital business operations."
          align="left"
        />

        <TimelineItem
          year="2023"
          title="Global Impact"
          description="Scaling Innovation Across Borders. Achieved significant milestones and expanded footprint globally."
          icon={Globe}
          subTitle="Going Global"
          subDesc="Expanding our expertise to global markets."
        />

        <TimelineItem
          year="2025 & Beyond"
          title="The Future Ahead"
          description="Architecting the future of work through innovation-led growth. Focusing on AI-driven learning, EdTech product innovation, and global talent ecosystems."
          icon={TrendingUp}
          subTitle="Future-Ready Workforce"
          subDesc="Enabling Industry 5.0 readiness through advanced tech academies."
          align="left"
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="p-8 bg-white rounded-xl border border-outline-variant hover-lift text-center"
  >
    <Icon className="h-10 w-10 text-secondary mb-6 mx-auto" />
    <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-primary font-serif">{title}</h4>
    <p className="text-sm text-on-surface-variant font-sans">{desc}</p>
  </motion.div>
);

const Differentiation = () => (
  <section className="pt-16 pb-32 bg-[#e1e8f2]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 sm:mb-20">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto lora">
          Why Organizations & Learners Choose Arambha Skill Solutions
        </h2>
        <div className="h-1 sm:h-1.5 w-16 sm:w-20 bg-accent-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
        {[
          {
            title: "Industry-Relevant Learning",
            desc: "Programs aligned with real market needs and cutting-edge technologies.",
            icon: Brain
          },
          {
            title: "Career-Focused Outcomes",
            desc: "Training designed specifically to maximize employability and growth.",
            icon: Award
          },
          {
            title: "Expert Mentorship",
            desc: "Learn from industry professionals with years of practical experience.",
            icon: GraduationCap
          },
          {
            title: "End-to-End Support",
            desc: "Complete guidance from the initial learning phase to final placement.",
            icon: Layers
          },
          {
            title: "Global Opportunities",
            desc: "Preparing local talent for the international workforce and global standards.",
            icon: Globe
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group p-8 sm:p-10 bg-white rounded-3xl sm:rounded-[2rem] border border-outline-variant hover:border-secondary/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Subtle card background glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {/* Layered Decorative Background */}
              <div className="absolute inset-0 bg-secondary/10 rounded-2xl sm:rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-primary/5 rounded-2xl sm:rounded-3xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500 border border-primary/10"></div>

              {/* Main Icon Container */}
              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md border border-outline-variant group-hover:border-secondary transition-colors duration-500">
                <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-secondary transition-colors duration-500" />
              </div>
            </div>

            <div className="relative z-10">
              <h4 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4 font-serif italic">{item.title}</h4>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-sans">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section className="py-32 bg-surface relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-24">
        <span className="text-secondary font-bold text-xs tracking-[0.3em] uppercase mb-4 block">The Challenge</span>
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-6 leading-tight italic max-w-3xl mx-auto">Breaking The Communication Barrier</h2>
        <div className="h-1.5 w-16 bg-accent-gold mx-auto rounded-full"></div>
      </div>

      {/* ZERO GAP BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[1px] bg-outline-variant/60 overflow-hidden shadow-2xl border border-outline-variant relative">

        {/* Card 1: Transformation (Spans 2 cols, 2 rows) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 xl:col-span-2 xl:row-span-2 bg-white p-10 md:p-16 relative group overflow-hidden flex flex-col justify-center hover:bg-slate-50 transition-colors duration-500"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center mb-10 border border-outline-variant shadow-sm group-hover:scale-110 group-hover:bg-accent-gold/10 transition-all duration-500">
              <Users className="h-10 w-10 text-secondary" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight font-serif italic text-primary">
              Transformation<br />Stories That Inspire
            </h3>
            <p className="text-lg text-on-surface-variant mb-12 font-sans leading-relaxed max-w-md">
              Thousands of students and professionals have transformed their careers through our ecosystem.
            </p>
            <div className="pt-8 border-t border-outline-variant/60 flex items-start gap-6 mt-auto">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-lg group-hover:-translate-y-1 group-hover:shadow-accent-gold/30 transition-all duration-300">
                <Rocket className="h-6 w-6 text-accent-gold" />
              </div>
              <p className="text-lg font-medium text-primary leading-snug">
                From fresh graduates to experienced professionals — we help people unlock growth.
              </p>
            </div>
          </div>
        </motion.div>

        {/* The 4 Problem Cards */}
        {[
          { icon: Mic2, title: "Hesitation", desc: "Knowledge exists, but words don't come out naturally." },
          { icon: BadgeCheck, title: "Interviews", desc: "Failing to showcase your true value to recruiters." },
          { icon: Users, title: "Meetings", desc: "Staying silent while others take the professional lead." },
          { icon: TrendingDown, title: "Missed Growth", desc: "Slow growth despite having strong technical skills." }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className="col-span-1 bg-white p-10 flex flex-col justify-center group relative overflow-hidden hover:bg-slate-50 transition-colors duration-500 lg:min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#D4AF37_0%,_transparent_60%)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mb-8 border border-outline-variant group-hover:border-accent-gold/30 group-hover:bg-accent-gold/10 transition-all duration-500">
                <item.icon className="h-7 w-7 text-primary group-hover:text-accent-gold transition-colors duration-500" />
              </div>
              <h4 className="font-bold mb-4 text-primary text-2xl font-serif italic transition-colors duration-500">{item.title}</h4>
              <p className="text-base text-on-surface-variant font-sans leading-relaxed transition-colors duration-500">{item.desc}</p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-accent-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </motion.div>
        ))}

      </div>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="py-20 bg-surface relative overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 relative">

        {/* MISSION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1 bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant relative group hover:-translate-y-2 hover:shadow-xl hover:border-accent-gold/50 transition-all duration-500 overflow-hidden"
        >
          {/* Mobile-only Enhancements */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-gold md:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-transparent md:hidden pointer-events-none"></div>
          <Compass className="absolute -bottom-6 -right-6 w-32 h-32 text-accent-gold/10 md:hidden pointer-events-none" />

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>

          <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mb-6 border border-outline-variant group-hover:scale-110 group-hover:bg-accent-gold/10 transition-all duration-500 relative z-10">
            <Compass className="w-7 h-7 text-primary group-hover:text-accent-gold transition-colors" />
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-primary italic mb-4 transition-colors relative z-10">Our Mission</h3>
          <p className="text-on-surface-variant font-sans leading-relaxed text-base relative z-10">
            To empower learners with confident English communication through structured practical training and consistent speaking practice, along with IT and non-IT skill development for the modern workforce.
          </p>
        </motion.div>

        {/* VISION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant relative group hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 transition-all duration-500 overflow-hidden"
        >
          {/* Mobile-only Enhancements */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary md:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent md:hidden pointer-events-none"></div>
          <Eye className="absolute -bottom-6 -right-6 w-32 h-32 text-primary/10 md:hidden pointer-events-none" />

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>

          <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mb-6 border border-outline-variant group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 relative z-10">
            <Eye className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-extrabold text-primary italic mb-4 relative z-10">Our Vision</h3>
          <p className="text-on-surface-variant font-sans leading-relaxed text-base relative z-10">
            To be recognized as one of the most trusted skill training institutes in Karnataka, setting benchmarks for quality education and career transformation that lasts a lifetime.
          </p>
        </motion.div>

      </div>
    </div>
  </section>
);

const Values = () => {
  const orbitalNodes = [
    {
      title: "Innovation-Led",
      desc: "Continuously evolving our methods to deliver modern, impactful training.",
      icon: Lightbulb,
      x: 0,
      y: -280,
      align: "top"
    },
    {
      title: "Collaborative",
      desc: "Building success through teamwork and shared commitment to outcomes.",
      icon: Layers,
      x: 266,
      y: -86,
      align: "right"
    },
    {
      title: "Growth Mindset",
      desc: "Embracing lifelong learning as the core driver for staff and students.",
      icon: TrendingUp,
      x: 165,
      y: 226,
      align: "right"
    },
    {
      title: "Global Vision",
      desc: "Empowering local talent with world-standard skills to compete globally.",
      icon: Globe,
      x: -165,
      y: 226,
      align: "left"
    },
    {
      title: "Excellence",
      desc: "Striving for the highest quality in everything we do to transform lives.",
      icon: Award,
      x: -266,
      y: -86,
      align: "left"
    }
  ];

  return (
    <section className="py-16 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-24 relative z-20">
          <span className="text-secondary font-bold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Corporate Values</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4 sm:mb-6 italic font-extrabold">What Drives Us</h2>
          <div className="h-1 sm:h-2 w-16 sm:w-24 bg-accent-gold mx-auto rounded-full"></div>
        </div>

        {/* Desktop Orbit Layout */}
        <div className="hidden xl:flex relative w-full max-w-[1000px] mx-auto h-[700px] items-center justify-center mt-12">

          {/* SVG Connecting Lines & Rings */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="-500 -350 1000 700" fill="none">
              {/* Outer dashed rotating ring */}
              <motion.circle
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ rotate: 360 }}
                transition={{ rotate: { duration: 100, repeat: Infinity, ease: "linear" } }}
                cx="0" cy="0" r="280" stroke="#D4AF37" strokeWidth="1" strokeDasharray="8 16" opacity="0.4"
                style={{ transformOrigin: 'center' }}
              />

              {/* Inner solid ring */}
              <circle cx="0" cy="0" r="160" stroke="#E2E8F0" strokeWidth="1" opacity="0.6" />

              {/* Connecting Lines */}
              {orbitalNodes.map((node, i) => (
                <motion.line
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.2 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  x1="0" y1="0" x2={node.x} y2={node.y}
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              ))}
            </svg>
          </div>

          {/* Center Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-56 h-56 bg-primary rounded-full flex flex-col items-center justify-center text-center p-6 border-4 border-white shadow-2xl relative"
            >
              <Star className="h-10 w-10 text-secondary mb-3 fill-secondary" />
              <div className="text-white font-bold font-serif text-2xl leading-tight italic">Our Core<br />Philosophy</div>
            </motion.div>
          </div>

          {/* Orbital Nodes */}
          {orbitalNodes.map((node, idx) => (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 z-30"
              style={{
                transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1, type: 'spring', bounce: 0.5 }}
                className="group relative flex flex-col items-center justify-center"
              >
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border border-outline-variant shadow-lg group-hover:border-secondary group-hover:shadow-secondary/20 transition-all hover-lift relative z-10 cursor-default">
                  <node.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                </div>

                {/* Label */}
                <div className={`absolute pointer-events-none ${node.align === 'top' ? 'bottom-[110%] left-1/2 -translate-x-1/2 text-center mb-4 w-64' :
                  node.align === 'right' ? 'left-[110%] top-1/2 -translate-y-1/2 ml-6 text-left w-64' :
                    'right-[110%] top-1/2 -translate-y-1/2 mr-6 text-right w-64'
                  }`}>
                  <h4 className="font-bold font-serif text-primary text-xl italic group-hover:text-secondary transition-colors">{node.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-2 font-sans leading-relaxed">{node.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet / Laptop Layout */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 relative z-20">
          <div className="md:col-span-2 bg-primary text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl mb-4 sm:mb-8 border-l-8 border-secondary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <Star className="h-8 w-8 sm:h-12 sm:w-12 text-secondary mb-3 sm:mb-4 mx-auto fill-secondary relative z-10" />
            <h3 className="text-xl sm:text-3xl font-bold font-serif italic relative z-10">Our Core Philosophy</h3>
            <p className="text-white/70 mt-2 sm:mt-4 text-sm sm:text-base max-w-lg mx-auto relative z-10">The principles that guide every decision and interaction at Arambha.</p>
          </div>

          {orbitalNodes.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="flex items-start sm:items-center gap-4 sm:gap-6 bg-surface p-5 sm:p-8 rounded-2xl border border-outline-variant hover:border-secondary transition-all shadow-sm hover:shadow-md group"
            >
              <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-outline-variant group-hover:scale-105 transition-transform duration-500">
                <node.icon className="h-6 w-6 sm:h-10 sm:w-10 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <div>
                <h4 className="font-bold font-serif text-primary text-base sm:text-xl italic group-hover:text-secondary transition-colors">{node.title}</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 sm:mt-2 font-sans leading-relaxed">{node.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-4">
    <div className="max-w-7xl mx-auto px-6">
      <div className="brand-gradient-gold rounded-3xl p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff,_transparent)]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-headline-lg font-serif font-extrabold text-primary mb-8 italic">Start Your Confidence Journey Today</h2>
          <p className="text-primary/80 max-w-2xl mx-auto mb-12 text-lg font-medium font-sans">
            Join structured live training sessions from anywhere in Karnataka. Transform your communication and career with Arambha's proven system.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/programs" className="bg-primary text-white px-10 py-4 rounded-xl font-bold font-serif hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 group">
              View Programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="bg-white text-primary border-2 border-primary px-10 py-4 rounded-xl font-bold font-serif hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Book Free Demo <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-primary text-white border-t border-white/10 full-width relative overflow-hidden">
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-30">
      <img
        alt="ARAMBHA Background Text"
        className="w-full h-full object-contain select-none"
        src="https://lh3.googleusercontent.com/aida/ADBb0uh5x2tlJe8QlgjqBeZdz9P8z9UnNTRvzS7v39ahKVoNOQ_-jTyurn-WCNHyrXI0PtvaE7Hg2QnMDjdfAsTHwRo2B1c_jIhcPTS6H-_z-YUmxMOuK87RdBzpTRA3liSPzBwJUlX6QuNpo0YwoZkuFIFakPtnQapKEv9VLIp86_OKGwb_nMD09QIDWCa3DpXO8O5j-ul6xKjkzTGehI-WpIg6fpO7zZiBwDSO1xoLfzxuK8PqzzVGy-KcQC4FZVWoQLEROvru5U9k"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-8 py-20 relative z-10">
      <div className="col-span-1">
        <div className="text-xl font-bold text-accent-gold mb-8 font-serif italic">Arambha Skill Solutions</div>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed font-sans">
          Elevating professional mastery through visionary learning. Bridging the gap between student life and career success with academic excellence.
        </p>
        <div className="flex space-x-5">
          <Globe className="h-5 w-5 text-slate-400 cursor-pointer hover:text-accent-gold transition-colors" />
          <Mail className="h-5 w-5 text-slate-400 cursor-pointer hover:text-accent-gold transition-colors" />
          <Phone className="h-5 w-5 text-slate-400 cursor-pointer hover:text-accent-gold transition-colors" />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-white mb-8 font-serif italic">Programs</h4>
        <ul className="space-y-4">
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">Higher Education</a></li>
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">K-12 Solutions</a></li>
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">Corporate Training</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-8 font-serif italic">Company</h4>
        <ul className="space-y-4">
          <li><a className="text-accent-gold font-bold transition-all text-sm underline underline-offset-8 font-sans" href="#">About Us</a></li>
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">Careers</a></li>
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-8 font-serif italic">Legal</h4>
        <ul className="space-y-4">
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">Privacy Policy</a></li>
          <li><a className="text-slate-400 hover:text-accent-gold transition-all text-sm font-sans" href="#">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-8 py-8 border-t border-white/10 text-center text-xs text-slate-500 font-serif tracking-widest relative z-10 uppercase">
      © 2024 Arambha Skill Solutions. Academic Excellence & Professional Growth.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-primary font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap');

        :root {
          --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
          --font-serif: "Lora", serif;
          --font-manrope: "Manrope", sans-serif;

          --color-primary: #1B2B48;
          --color-secondary: #D4AF37;
          --color-accent-gold: #D4AF37;
          --color-navy-deep: #10192A;
          --color-surface: #f7f9fb;
          --color-on-surface-variant: #4B5563;
          --color-outline-variant: #E2E8F0;
          
          --text-primary: #1B2B48;
          --bg-primary: #1B2B48;
          --text-secondary: #D4AF37;
          --bg-secondary: #D4AF37;
        }

        .brand-gradient-navy {
          background: linear-gradient(135deg, #1B2B48 0%, #10192A 100%);
        }
        .brand-gradient-gold {
          background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
        }
        .hover-lift {
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -10px rgba(27, 43, 72, 0.1);
        }
        .timeline-line {
          background: #E2E8F0;
        }
        .timeline-dot {
          box-shadow: 0 0 0 4px white, 0 0 0 6px #D4AF37;
        }

        /* Essential mappings for when build-time processing is bypassed */
        .text-primary { color: var(--color-primary); }
        .bg-primary { background-color: var(--color-primary); }
        .text-secondary { color: var(--color-secondary); }
        .bg-secondary { background-color: var(--color-secondary); }
        .font-manrope { font-family: var(--font-manrope); }
        .font-serif { font-family: var(--font-serif); }
        .bg-surface { background-color: var(--color-surface); }
        .border-outline-variant { border-color: var(--color-outline-variant); }
        .text-on-surface-variant { color: var(--color-on-surface-variant); }
      `}} />
      <main>
        <Hero />
        <Stats />
        <Evolution />
        <Differentiation />
        <Problem />
        <MissionVision />
        <Values />
        <CTA />
      </main>
    </div>
  );
}
