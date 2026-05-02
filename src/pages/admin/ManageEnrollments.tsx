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
  MapPin,
  GraduationCap,
  BookOpen,
  Filter,
  X
} from 'lucide-react';

export default function ManageEnrollments() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "enrollments"), orderBy("enrolled_at", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEnrollments(data);
      setLoading(false);
    }, (err) => {
      console.error("Enrollments listener error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredEnrollments = enrollments.filter(e =>
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.course_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Manage Enrollments</h1>
          <p className="text-on-surface-variant">Review and track student course registrations.</p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by student or course..."
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
          <p className="text-primary font-bold">Loading enrollments...</p>
        </div>
      ) : filteredEnrollments.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Student</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Course</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Contact</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold font-bold">
                          {enrollment.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{enrollment.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{enrollment.user_id?.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                        {enrollment.course_title || 'Unknown Course'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Mail size={12} /> {enrollment.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Phone size={12} /> {enrollment.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Calendar size={12} />
                        {enrollment.enrolled_at?.toDate ? enrollment.enrolled_at.toDate().toLocaleDateString() : 'Recent'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedEnrollment(enrollment)}
                        className="text-xs font-bold text-accent-gold hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-primary font-bold text-lg">No enrollments found.</p>
          <p className="text-on-surface-variant mt-2">When students enroll, they will appear here.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEnrollment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedEnrollment(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-primary p-8 text-white relative">
                <button
                  onClick={() => setSelectedEnrollment(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-accent-gold rounded-2xl flex items-center justify-center text-primary text-2xl font-black">
                    {selectedEnrollment.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedEnrollment.name}</h3>
                    <p className="text-white/60 text-sm">Enrolled in {selectedEnrollment.course_title}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                          <Mail size={16} className="text-accent-gold" />
                          {selectedEnrollment.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                          <Phone size={16} className="text-accent-gold" />
                          {selectedEnrollment.phone}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                          <Phone size={16} className="text-green-600" />
                          WhatsApp: {selectedEnrollment.whatsapp}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Address</h4>
                      <div className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                        <MapPin size={16} className="text-accent-gold mt-1" />
                        {selectedEnrollment.address}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Education Background</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                          <GraduationCap size={16} className="text-accent-gold" />
                          {selectedEnrollment.highest_education}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                          <BookOpen size={16} className="text-accent-gold" />
                          {selectedEnrollment.college_name}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl">
                          <Calendar size={16} className="text-accent-gold" />
                          Passing Year: {selectedEnrollment.year_of_passing}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">System Info</h4>
                      <div className="text-[10px] font-mono text-slate-400 bg-slate-50 p-3 rounded-xl">
                        User ID: {selectedEnrollment.user_id}<br/>
                        Course ID: {selectedEnrollment.course_id}<br/>
                        Doc ID: {selectedEnrollment.id}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedEnrollment(null)}
                    className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 transition-all"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
