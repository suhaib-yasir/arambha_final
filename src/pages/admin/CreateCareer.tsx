import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Loader2,
  Briefcase,
  MapPin,
  Banknote,
  GraduationCap,
  Type,
  Layout,
  AlignLeft,
  Image as ImageIcon,
  ShieldCheck
} from 'lucide-react';
import { createCareer } from '../../services/careerService';

const DEPARTMENTS = [
  "Sales",
  "Marketing",
  "Human Resources",
  "Technical",
  "Operations",
  "Finance",
  "Strategy"
];

const LOCATIONS = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Pune",
  "Work from Home",
  "Remote",
  "Hybrid"
];

export default function CreateCareer() {
  const navigate = useNavigate();

  // Job Details
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('');

  // UI State
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !department || !location || !description) {
      setError('Title, Department, Location and Description are required.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await createCareer({
        title,
        department,
        location,
        experience,
        salary,
        description,
        image: imageUrl,
        badge
      });

      setSuccess(true);
      setTimeout(() => navigate('/admin/portal?tab=manage-careers'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create job posting.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-primary p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 blur-[100px] -mr-40 -mt-40 rounded-full"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-accent-gold/20 rounded-2xl flex items-center justify-center border border-accent-gold/30 backdrop-blur-md shadow-inner">
                <Briefcase className="text-accent-gold" size={32} />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-extrabold tracking-tight">Post New Career</h1>
                <p className="text-slate-300 text-sm mt-1 font-medium opacity-80">
                  Expand the Arambha family with top-tier talent
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Job Essentials */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Layout size={14} /> Job Foundations
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Job Title */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                        <Type size={16} /> Job Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all font-sans text-primary placeholder:text-slate-400"
                        placeholder="e.g. Senior Business Development Lead"
                        disabled={submitting}
                      />
                    </div>

                    {/* Department & Location */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <Layout size={16} /> Department
                        </label>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm appearance-none cursor-pointer"
                          disabled={submitting}
                        >
                          <option value="" disabled>Select...</option>
                          {DEPARTMENTS.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <MapPin size={16} /> Location
                        </label>
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm appearance-none cursor-pointer"
                          disabled={submitting}
                        >
                          <option value="" disabled>Select...</option>
                          {LOCATIONS.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Experience & Salary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <GraduationCap size={16} /> Experience
                        </label>
                        <input
                          type="text"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                          placeholder="e.g. 0–2 Years"
                          disabled={submitting}
                        />
                      </div>
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <Banknote size={16} /> Salary Range
                        </label>
                        <input
                          type="text"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                          placeholder="e.g. ₹3–5 LPA"
                          disabled={submitting}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Visuals & Description */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <ImageIcon size={14} /> Role Visibility
                  </h3>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                        <ImageIcon size={16} /> Image URL
                      </label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                        placeholder="https://..."
                        disabled={submitting}
                      />
                    </div>
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                        <ShieldCheck size={16} /> Status Badge
                      </label>
                      <input
                        type="text"
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                        placeholder="e.g. Urgent Hire, New"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <AlignLeft size={14} /> Job Description
                  </h3>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all font-sans text-primary placeholder:text-slate-400 resize-none"
                    placeholder="Provide a detailed overview of the role and requirements..."
                    disabled={submitting}
                  />
                </section>
              </div>
            </div>

            {/* Notifications */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl flex items-start gap-4 shadow-sm"
                >
                  <AlertCircle className="text-red-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-black text-red-900 uppercase tracking-tighter text-sm">Post Error</h4>
                    <p className="text-red-700 text-sm mt-1 font-medium">{error}</p>
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-2xl flex items-start gap-4 shadow-sm"
                >
                  <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-black text-green-900 uppercase tracking-tighter text-sm">Job Posted</h4>
                    <p className="text-green-700 text-sm mt-1 font-medium">
                      The career opportunity is now live on the platform.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="pt-10 flex gap-4">
              <button
                type="submit"
                disabled={submitting || !title || !department || !location}
                className="flex-1 brand-gradient-gold text-white font-black py-6 px-8 rounded-2xl shadow-2xl hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50 uppercase tracking-[0.15em] text-sm"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Publish Job Posting
                    <PlusCircle size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
