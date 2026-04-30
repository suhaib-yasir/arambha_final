import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { programs } from "../utils/programsData";
import programsHeroImg from "../assets/programs-hero.svg";

export default function ProgramDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const program = programs.find(p => p.id === parseInt(id || "1"));

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <h2 className="text-3xl font-bold text-[#1B2B48] mb-4">Program Not Found</h2>
        <p className="text-slate-600 mb-8">The program you are looking for does not exist.</p>
        <button onClick={() => navigate("/programs")} className="bg-[#1B2B48] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#10192A] transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-start justify-center py-12 sm:py-20 px-4 sm:px-6 font-sans">
      {/* Background Overlay */}
      <img src={programsHeroImg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-slate-100/90 backdrop-blur-sm"></div>

      {/* Main Content Card Wrapper */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col mt-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/programs")}
          className="absolute -top-10 left-0 z-20 flex items-center gap-2 text-[#1B2B48] hover:text-[#D4AF37] transition-colors font-bold text-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Programs
        </button>

        {/* The Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full">
          
          {/* Header Section (Dark Blue) */}
          <div className="bg-[#1B2B48] text-white p-8 sm:p-12 lg:p-14">
            <div className="inline-block bg-white/10 text-white/90 px-3 py-1.5 rounded-lg text-sm font-semibold mb-6 border border-white/5">
              {program.category}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              {program.title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-3xl leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Body Section (Light Background) */}
          <div className="bg-[#f8f9fa] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left Column (Content) */}
            <div className="flex-1">
              
              {/* What You Will Learn */}
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2B48] mb-8">What You Will Learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                  {program.tags?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-[#1B2B48] shrink-0">
                        <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <span className="font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Modules */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2B48] mb-8">Program Modules</h2>
                <div className="space-y-5">
                  {program.modules?.map((mod, i) => (
                    <div key={i} className="bg-white border border-[#1B2B48] rounded-xl p-6 shadow-sm">
                      <h3 className="font-bold text-[#1B2B48] text-lg mb-2">Module {i + 1}: {mod.title}</h3>
                      {mod.description && <p className="text-sm text-slate-600 leading-relaxed">{mod.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar Card) */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-[#f0f5fa] border border-blue-100 rounded-2xl p-8 shadow-sm sticky top-28">
                <h3 className="text-[#1B2B48] font-bold text-xl mb-6">Program Details</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-blue-200/60">
                    <span className="text-slate-600 text-sm">Duration</span>
                    <span className="font-bold text-[#1B2B48] text-sm">{program.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-blue-200/60">
                    <span className="text-slate-600 text-sm">Level</span>
                    <span className="font-bold text-[#1B2B48] text-sm">{program.level}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate("/login")}
                  className="w-full bg-[#1B2B48] text-white font-bold py-4 rounded-xl text-base hover:bg-[#10192A] transition-colors shadow-md"
                >
                  Enroll Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
