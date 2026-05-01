import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { 
  Search, 
  Loader2, 
  Calendar,
  User,
  Mail,
  Phone,
  Briefcase,
  X,
  FileText,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';

export default function ManageApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "applicants"), orderBy("appliedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(data);
      setLoading(false);
    }, (err) => {
      console.error("Applicants listener error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredApps = applications.filter(a =>
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.roleApplied?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Job Applications</h1>
          <p className="text-on-surface-variant">Review and manage talent applications.</p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-gold outline-none transition-all w-64 md:w-80"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <Loader2 className="w-12 h-12 text-accent-gold animate-spin mb-4" />
          <p className="text-primary font-bold">Loading applications...</p>
        </div>
      ) : filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <motion.div
              layout
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold">
                  {app.name?.charAt(0)}
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {app.workExperienceStatus}
                </span>
              </div>
              
              <h3 className="font-bold text-primary text-lg mb-1">{app.name}</h3>
              <p className="text-xs text-accent-gold font-bold uppercase tracking-wider mb-4">{app.roleApplied}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={14} /> {app.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone size={14} /> {app.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">View Full Profile</span>
                <div className="flex gap-2">
                  {app.linkedinUrl && <Linkedin size={14} className="text-slate-300" />}
                  {app.githubUrl && <Github size={14} className="text-slate-300" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-primary font-bold text-lg">No applications found.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedApp(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-[#1B2B48] p-8 text-white relative">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-accent-gold text-primary rounded-3xl flex items-center justify-center text-3xl font-black">
                    {selectedApp.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{selectedApp.name}</h3>
                    <p className="text-accent-gold font-bold uppercase tracking-[0.2em] text-xs">{selectedApp.roleApplied}</p>
                    <div className="flex gap-4 mt-3">
                      {selectedApp.linkedinUrl && (
                        <a href={selectedApp.linkedinUrl} target="_blank" className="text-white/60 hover:text-white transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {selectedApp.githubUrl && (
                        <a href={selectedApp.githubUrl} target="_blank" className="text-white/60 hover:text-white transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {selectedApp.portfolioUrl && (
                        <a href={selectedApp.portfolioUrl} target="_blank" className="text-white/60 hover:text-white transition-colors">
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact & Personal</h4>
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Email</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.email}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Phone / WhatsApp</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.phone} / {selectedApp.whatsapp}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Address</span>
                          <p className="text-sm font-bold text-primary line-clamp-2">{selectedApp.address}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Skills & Interests</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl">
                        <p className="text-sm text-primary leading-relaxed">{selectedApp.skills}</p>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Area of Interest</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.areaOfInterest}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Education Background</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Highest Qualification</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.highestEducation}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">College / University</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.collegeName}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Year of Passing</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.yearOfPassing}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Additional Info</h4>
                      <div className="bg-slate-50 p-6 rounded-2xl">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block mb-1">Reference Name</span>
                          <p className="text-sm font-bold text-primary">{selectedApp.referenceName || 'None'}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200 text-[10px] font-mono text-slate-400">
                          App ID: {selectedApp.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="flex-1 py-4 bg-slate-100 text-primary font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Mail size={18} /> Contact Applicant
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
