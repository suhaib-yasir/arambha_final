import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { deleteCareer, Career } from '../../services/careerService';
import { 
  Trash2, 
  Search, 
  Loader2, 
  MapPin, 
  Briefcase,
  AlertCircle,
  CheckCircle2,
  X,
  ExternalLink,
  Plus,
  ArrowLeft
} from 'lucide-react';
import CreateCareer from './CreateCareer';

// Import career images for consistent branding
import businessDevImg from "../../assets/jobs/business-development-associate.png";
import digitalMarketingAssocImg from "../../assets/jobs/digital-marketing-associate.png";
import brandGrowthImg from "../../assets/jobs/brand-growth-executive.png";
import salesLeadImg from "../../assets/jobs/sales-lead-manager.png";
import marketingStrategyImg from "../../assets/jobs/marketing-strategy-manager.png";
import campusGrowthImg from "../../assets/jobs/campus-growth-partner.png";
import corporateSalesImg from "../../assets/jobs/corporate-sales-executive.png";
import hrManagerImg from "../../assets/jobs/human-resource-manager.png";
import leadGenImg from "../../assets/jobs/lead-generation-specialist.png";

const IMAGE_MAP: Record<string, any> = {
  "Business Development Associate – Inside Sales": businessDevImg,
  "Digital Marketing Associate": digitalMarketingAssocImg,
  "Brand Growth Executive": brandGrowthImg,
  "Sales Lead / Manager": salesLeadImg,
  "Marketing Strategy Manager": marketingStrategyImg,
  "Campus Growth Partner": campusGrowthImg,
  "Corporate Sales Executive (B2B)": corporateSalesImg,
  "Human Resource Manager": hrManagerImg,
  "Lead Generation Specialist": leadGenImg,
};

export default function ManageCareers() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "careers"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Career[];
      setCareers(data);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error("Careers listener error:", err);
      setError("Failed to load careers. Please check your connection.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCareer(id);
      setCareers(careers.filter(c => c.id !== id));
      setDeleteId(null);
    } catch (err: any) {
      setError('Failed to delete career posting');
    }
  };

  const filteredCareers = careers.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-accent-gold" size={48} />
        <p className="text-primary font-bold animate-pulse">Synchronizing Career Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Stats */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-gold transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search roles, departments, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-2xl border border-slate-200 shadow-sm h-full">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Postings</p>
              <p className="text-2xl font-serif font-black text-primary">{careers.length}</p>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Departments</p>
              <p className="text-2xl font-serif font-black text-accent-gold">
                {new Set(careers.map(c => c.department)).size}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 h-full"
          >
            <Plus size={20} />
            Post New Job
          </button>
        </div>
      </div>

      {showCreateForm ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => {
                setShowCreateForm(false);
                fetchCareers();
              }}
              className="flex items-center gap-2 text-primary hover:text-accent-gold transition-colors font-bold"
            >
              <ArrowLeft size={20} />
              Back to List
            </button>
            <h2 className="text-2xl font-bold text-primary">Post New Opportunity</h2>
          </div>
          <CreateCareer onComplete={() => {
            setShowCreateForm(false);
            fetchCareers();
          }} />
        </motion.div>
      ) : (
        <>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700 font-medium">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-500">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Career Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCareers.map((career) => (
            <motion.div
              layout
              key={career.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={IMAGE_MAP[career.title] || career.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80'} 
                  alt={career.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {career.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-gold text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {career.badge}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-black text-accent-gold uppercase tracking-[0.2em] mb-1 block">
                    {career.department}
                  </span>
                  <h3 className="text-white font-serif font-bold text-lg leading-tight line-clamp-1">
                    {career.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin size={14} className="text-accent-gold" />
                    {career.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <Briefcase size={14} className="text-accent-gold" />
                    {career.experience || 'Fresher'}
                  </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 min-h-[2.5rem]">
                  {career.description}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Compensation</span>
                    <span className="text-sm font-bold text-primary">{career.salary}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setDeleteId(career.id)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-accent-gold hover:bg-accent-gold/5 rounded-xl transition-all">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-serif font-black text-primary mb-2">Delete Job Posting?</h3>
              <p className="text-slate-600 mb-8 font-medium">
                This action is irreversible. The role will be immediately removed from the public careers page.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteId && handleDelete(deleteId)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-200"
                >
                  Delete Role
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {filteredCareers.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-primary">No positions found</h3>
          <p className="text-slate-500 mt-1 mb-6">Try adjusting your search filters or add a new role.</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-all">
            <Plus size={18} /> Add New Role
          </button>
        </div>
      )}
      </>
      )}
    </div>
  );
}
