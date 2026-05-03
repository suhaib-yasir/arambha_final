import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Loader2, X } from "lucide-react";
import { programs } from "../utils/programsData";
import programsHeroImg from "../assets/programs-hero.svg";
import { useAuth } from "../context/AuthContext";
import { enrollInCourse } from "../services/courseService";
import { useState } from "react";

export default function ProgramDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const program = programs.find(p => p.id === parseInt(id || "1"));

  const { currentUser } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    whatsapp: '',
    address: '',
    collegeName: '',
    yearOfPassing: '',
    highestEducation: '',
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.displayName || '',
        email: currentUser.email || '',
      }));
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnrollClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !currentUser) return;

    setEnrolling(true);
    try {
      await enrollInCourse(currentUser.uid, program.id.toString(), formData);
      setEnrolled(true);
      setIsFormOpen(false);
      alert("Congratulations! You have successfully enrolled in " + program.title + ". Your details have been updated and a notification has been sent to the admin.");
    } catch (error: any) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll: " + error.message);
    } finally {
      setEnrolling(false);
    }
  };

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
                  onClick={handleEnrollClick}
                  disabled={enrolling || enrolled}
                  className="w-full bg-[#1B2B48] text-white font-bold py-4 rounded-xl text-base hover:bg-[#10192A] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {enrolling && <Loader2 className="animate-spin" size={20} />}
                  {enrolled ? "Enrolled Successfully" : (enrolling ? "Processing..." : "Enroll Now")}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Enrollment Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X size={18} />
            </button>

            <div className="p-8 sm:p-10 overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1B2B48] mb-2">Student Enrollment Form</h2>
                <p className="text-slate-500 text-sm">Please provide your details to complete the enrollment for <span className="font-bold text-[#1B2B48]">{program.title}</span>.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Permanent Address</label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">College Name</label>
                    <input
                      type="text"
                      name="collegeName"
                      required
                      value={formData.collegeName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Year of Passing</label>
                    <input
                      type="text"
                      name="yearOfPassing"
                      required
                      value={formData.yearOfPassing}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Highest Education Qualification</label>
                  <select
                    name="highestEducation"
                    required
                    value={formData.highestEducation}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all"
                  >
                    <option value="">Select Qualification</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Com">B.Com</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="BCA">BCA</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 py-4 bg-slate-100 text-[#1B2B48] font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={enrolling}
                    className="flex-1 py-4 bg-[#1B2B48] text-white font-bold rounded-xl hover:bg-[#10192A] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {enrolling ? <Loader2 size={18} className="animate-spin" /> : null}
                    {enrolling ? 'Processing...' : 'Confirm Enrollment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
