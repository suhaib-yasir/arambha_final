import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, GraduationCap, Users, CheckCircle2, Loader2, Calendar } from "lucide-react";
import { getCourses, Course } from "../services/courseService";
import { useAuth } from "../context/AuthContext";
import { isUserAdmin } from "../services/adminService";
import { Link } from "react-router-dom";
import EnrollmentForm from "../components/EnrollmentForm";

// Import program images
import spokenEnglishImg from "../assets/programs/spoken-english-mastery.png";
import foundation60Img from "../assets/programs/foundation-60.png";
import digitalMarketingImg from "../assets/programs/digital-marketing-expert.png";
import campusToCorporateImg from "../assets/programs/campus-to-corporate.png";
import hrManagementImg from "../assets/programs/hr-management.png";
import bankingFinanceImg from "../assets/programs/banking-finance.png";
import fullStackJavaImg from "../assets/programs/full-stack-java.png";
import dataScienceImg from "../assets/programs/data-science-ai.png";
import autocadImg from "../assets/programs/autocad-design.png";
import programsHeroImg from "../assets/programs-hero.svg";

const CATEGORIES = ["All", "Spoken English", "Schooling", "BTech", "Graduate", "Job Ready"];

const WHY_CHOOSE_US = [
  {
    title: "Industry-aligned curriculum",
    desc: "Course content updated weekly to reflect current market demands and technology shifts.",
    icon: <BookOpen className="w-8 h-8" />
  },
  {
    title: "Practical training",
    desc: "70% project-based learning with real-world case studies and hands-on workshops.",
    icon: <GraduationCap className="w-8 h-8" />
  },
  {
    title: "Placement support",
    desc: "Dedicated career desk helping you with mocks, portfolio building, and job referrals.",
    icon: <CheckCircle2 className="w-8 h-8" />
  },
  {
    title: "Experienced mentors",
    desc: "Learn directly from practitioners who have spent decades in the corporate world.",
    icon: <Users className="w-8 h-8" />
  }
];

export default function ProgramsScreen() {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [enrolledProgramIds, setEnrolledProgramIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dynamicPrograms, setDynamicPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [isEnrollFormOpen, setIsEnrollFormOpen] = useState(false);
  const [activeEnrollProgram, setActiveEnrollProgram] = useState<{id: string, title: string} | null>(null);

  useEffect(() => {
    if (currentUser) {
      isUserAdmin(currentUser.uid).then(setIsAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  const handleEnroll = (program: any) => {
    if (!currentUser) {
      alert("Please log in to enroll in programs.");
      return;
    }
    setActiveEnrollProgram({ id: program.id, title: program.title });
    setIsEnrollFormOpen(true);
  };

  useEffect(() => {
    const fetchDynamicPrograms = async () => {
      try {
        const courses = await getCourses();
        if (!Array.isArray(courses)) {
          setDynamicPrograms([]);
          return;
        }
        const mapped = courses.map((c, idx) => ({
          // Use the Firestore document ID as the canonical ID — this is what
          // ProgramDetails will use to fetch from Firestore.
          id: c.id || `dynamic-${idx}`,
          title: c.title || "Untitled Course",
          category: c.category || "Job Ready",
          duration: c.duration || "Self-Paced",
          description: c.description || "Premium course content uploaded by Arambha Experts.",
          image: c.image || fullStackJavaImg,
          videoUrl: c.videoId
            ? `https://drive.google.com/uc?export=download&id=${c.videoId}`
            : "https://www.w3schools.com/html/mov_bbb.mp4",
        }));
        setDynamicPrograms(mapped);
      } catch (err) {
        console.error("Failed to load dynamic programs:", err);
        setDynamicPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicPrograms();
  }, []);

  const filteredPrograms =
    selectedCategory === "All"
      ? dynamicPrograms
      : dynamicPrograms.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full font-sans programs-page-root">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap');

        :root {
          --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
          --font-serif: "Lora", serif;
        }

        .font-serif { font-family: var(--font-serif), serif; }
        .font-sans  { font-family: var(--font-sans), sans-serif; }

        .programs-page-root { overflow-x: hidden; }

        .programs-hero-img {
          width: 100%;
          max-width: 100%;
          margin-right: 0;
          height: auto;
          object-fit: contain;
        }

        @media (min-width: 1024px) {
          .programs-hero-img {
            width: 160%;
            max-width: none;
            margin-right: -8%;
          }
        }

        .category-filter-bar {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        @media (min-width: 480px) {
          .category-filter-bar {
            flex-wrap: wrap;
            justify-content: center;
            overflow-x: visible;
          }
        }

        @media (max-width: 639px) {
          .program-card-img { height: 180px; }
          .cta-heading { font-size: 1.6rem; line-height: 1.2; }
          .cta-body   { font-size: 0.95rem; }
        }

        .why-card { display: flex; flex-direction: column; align-items: center; }
      `}} />

      {/* ── Hero ── */}
      <section className="relative pt-0 sm:pt-4 pb-0 sm:pb-4 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-left w-full flex flex-col justify-center py-8 sm:py-12 lg:py-8 pl-4 sm:pl-6 lg:pl-8"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-primary leading-[1.15] mb-5 sm:mb-6 italic">
                Choose the Right Program to{" "}
                <span className="text-accent-gold">Start Your Career Journey</span>
              </h1>
              <p className="text-base sm:text-lg text-[#475569] mb-7 sm:mb-10 max-w-xl font-sans">
                Explore skill-based, career-focused programs designed to take you from learning to earning with confidence.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 font-sans">
                <button
                  className="bg-accent-gold hover:bg-accent-gold-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg shadow-accent-gold/20 transition-all font-serif italic text-sm sm:text-base"
                  onClick={() => document.getElementById("programs-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Programs
                </button>
                <button className="border-2 border-primary text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-primary/5 transition-all font-serif italic text-sm sm:text-base">
                  Book a Free Class
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative w-full hidden md:flex justify-center lg:justify-end items-center"
            >
              <img
                src={programsHeroImg}
                alt="Students learning together"
                className="programs-hero-img"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section id="programs-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-20 font-sans">
        <h2 className="text-center text-2xl sm:text-4xl font-serif text-primary font-bold mb-6 sm:mb-10 italic">
          Explore Our Programs
        </h2>
        <div className="bg-white border-2 border-accent-gold p-2 rounded-2xl flex gap-2 shadow-lg max-w-3xl mx-auto category-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-transparent text-text-muted hover:bg-accent-gold/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Program Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-accent-gold animate-spin mb-4" />
            <p className="text-primary font-serif text-xl">Loading premium programs…</p>
          </div>
        ) : filteredPrograms.length > 0 ? (
          selectedCategory === "All" ? (
            <>
              <ProgramSection
                title="Foundational & Communication Skills"
                programs={filteredPrograms.slice(0, 3)}
                onPreview={setPreviewVideo}
                isAdmin={isAdmin}
                enrolledProgramIds={enrolledProgramIds}
                onEnroll={handleEnroll}
              />
              <ProgramSection
                title="Career & Job-Ready Programs"
                programs={filteredPrograms.slice(3, 6)}
                onPreview={setPreviewVideo}
                isAdmin={isAdmin}
                enrolledProgramIds={enrolledProgramIds}
                onEnroll={handleEnroll}
              />
              <ProgramSection
                title="Technical & Professional Programs"
                programs={filteredPrograms.slice(6)}
                onPreview={setPreviewVideo}
                isAdmin={isAdmin}
                enrolledProgramIds={enrolledProgramIds}
                onEnroll={handleEnroll}
              />
            </>
          ) : (
            <ProgramSection
              title={`${selectedCategory} Programs`}
              programs={filteredPrograms}
              onPreview={setPreviewVideo}
              isAdmin={isAdmin}
              enrolledProgramIds={enrolledProgramIds}
              onEnroll={(program) => handleEnroll(program)}
            />
          )
        ) : (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">No programs found in this category.</p>
          </div>
        )}
      </div>

      {/* ── Why Choose Us ── */}
      <section style={{ backgroundColor: "#D4AF37" }} className="py-14 sm:py-24 mb-12 sm:mb-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white italic">
              Why Choose Arambha Programs?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-primary/5 text-center why-card"
              >
                <div
                  className="w-16 h-16 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3"
                  style={{ backgroundColor: "#006CA5" }}
                >
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-primary mb-3 leading-tight font-serif italic">
                  {item.title}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="brand-gradient-gold rounded-3xl p-8 sm:p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#ffffff,_transparent)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-headline-lg font-serif font-extrabold text-primary mb-8 italic cta-heading">
                Start Your Confidence Journey Today
              </h2>
              <p className="text-primary/80 max-w-2xl mx-auto mb-12 text-lg font-medium font-sans cta-body">
                Join structured live training sessions from anywhere in Karnataka. Transform your
                communication and career with Arambha's proven system.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center font-serif italic">
                <Link
                  to="/careers"
                  className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 group text-lg"
                >
                  View Careers{" "}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <button className="bg-white text-primary border-2 border-primary px-10 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-lg">
                  Book Free Demo <Calendar className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Modal ── */}
      {previewVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setPreviewVideo(null)}
          />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            <video
              src={previewVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Enrollment Form & Payment */}
      {activeEnrollProgram && (
        <EnrollmentForm
          isOpen={isEnrollFormOpen}
          onClose={() => setIsEnrollFormOpen(false)}
          program={activeEnrollProgram}
          onSuccess={() => {
            if (activeEnrollProgram) {
              setEnrolledProgramIds([...enrolledProgramIds, activeEnrollProgram.id]);
            }
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// ProgramSection
// ─────────────────────────────────────────────
function ProgramSection({
  title,
  programs,
  onPreview,
  isAdmin,
  enrolledProgramIds,
  onEnroll,
}: {
  title: string;
  programs: any[];
  onPreview: (url: string) => void;
  isAdmin: boolean;
  enrolledProgramIds: string[];
  onEnroll: (program: any) => void;
}) {
  return (
    <section className="mb-20">
      <div className="text-center mb-2">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold inline-block italic text-primary">
          {title}
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent-gold"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        {programs.map((program, i) => {
          const isEnrolled = enrolledProgramIds.includes(program?.id);

          // All courses now route via ?courseId= so ProgramDetails always
          // knows the exact Firestore document ID to fetch.
          const detailsLink = `/programs/detail?courseId=${encodeURIComponent(program?.id)}`;

          return (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-transparent border-2 rounded-3xl overflow-hidden flex flex-col transition-all hover:-translate-y-2 hover:shadow-xl"
              style={{ borderColor: "#006CA5" }}
            >
              {/* Card image */}
              <div className="h-60 overflow-hidden program-card-img">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">
                  {program?.title || "Untitled Program"}
                </h3>
                <p className="text-text-muted text-sm line-clamp-3 mb-8 font-lora leading-relaxed">
                  {program?.description || "No description available."}
                </p>
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  {/* View Details — always links with courseId query param */}
                  <Link
                    to={detailsLink}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-center text-sm"
                  >
                    View Details
                  </Link>

                  {/* Enroll / View Course */}
                  {isEnrolled ? (
                    <button
                      onClick={() => onPreview(program?.videoUrl)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 border-2 border-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-sm group"
                    >
                      View Course{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onEnroll(program)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 brand-gradient-navy text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-md text-sm"
                    >
                      Enroll
                    </button>
                  )}

                  {/* Admin preview */}
                  {isAdmin && (
                    <button
                      onClick={() => onPreview(program?.videoUrl)}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-all text-sm"
                      title="Preview Video"
                    >
                      Preview
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}