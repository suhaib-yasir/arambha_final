import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { deleteCourse, updateCourse, Course } from '../../services/courseService';
import { useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Search, 
  Loader2, 
  Video, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  Pencil,
  UploadCloud,
  X,
  Save,
  PlusCircle,
  ArrowLeft
} from 'lucide-react';
import CreateCourse from './CreateCourse';

// Import program images for consistent branding
import spokenEnglishImg from "../../assets/programs/spoken-english-mastery.png";
import foundation60Img from "../../assets/programs/foundation-60.png";
import digitalMarketingImg from "../../assets/programs/digital-marketing-expert.png";
import campusToCorporateImg from "../../assets/programs/campus-to-corporate.png";
import hrManagementImg from "../../assets/programs/hr-management.png";
import bankingFinanceImg from "../../assets/programs/banking-finance.png";
import fullStackJavaImg from "../../assets/programs/full-stack-java.png";
import dataScienceImg from "../../assets/programs/data-science-ai.png";
import autocadImg from "../../assets/programs/autocad-design.png";

const IMAGE_MAP: Record<string, any> = {
  "Spoken English Mastery": spokenEnglishImg,
  "Foundation 60": foundation60Img,
  "Digital Marketing Expert": digitalMarketingImg,
  "Campus to Corporate Program": campusToCorporateImg,
  "Human Resource Management": hrManagementImg,
  "Banking & Finance Masterclass": bankingFinanceImg,
  "Full Stack Java Developer": fullStackJavaImg,
  "Data Science & AI": dataScienceImg,
  "AutoCAD Design": autocadImg,
};

export default function ManageCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [editVideoId, setEditVideoId] = useState('');
  const [editVideoTitle, setEditVideoTitle] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(data);
      setLoading(false);
    }, (err) => {
      console.error("Courses listener error:", err);
      setLoading(false);
      setMessage({ type: 'error', text: 'Failed to load courses from live stream.' });
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter(c => c.id !== id));
      setMessage({ type: 'success', text: 'Course deleted successfully.' });
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to delete course.' });
    }
  };

  const openEdit = (course: Course) => {
    setEditCourse(course);
    setEditVideoId(course.videoId || '');
    setEditVideoTitle(course.videoTitle || course.title || '');
  };

  const handleSaveEdit = async () => {
    if (!editCourse) return;
    if (!editVideoId.trim()) {
      setMessage({ type: 'error', text: 'Video ID cannot be empty.' });
      return;
    }
    setEditSaving(true);
    try {
      await updateCourse(editCourse.id, {
        videoId: editVideoId.trim(),
        videoTitle: editVideoTitle.trim() || editCourse.title,
        uploadStatus: 'completed'
      });
      setCourses(courses.map(c =>
        c.id === editCourse.id
          ? { ...c, videoId: editVideoId.trim(), videoTitle: editVideoTitle.trim(), uploadStatus: 'completed' }
          : c
      ));
      setMessage({ type: 'success', text: 'Course video info updated successfully.' });
      setEditCourse(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save changes.' });
    } finally {
      setEditSaving(false);
    }
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="font-serif text-4xl font-bold text-primary mb-2">Manage Courses</h1>
            <p className="text-on-surface-variant">Review, edit, and manage your uploaded content.</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-gold outline-none transition-all w-64 md:w-80"
              />
            </div>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
            >
              <PlusCircle size={20} />
              Create New
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
                  fetchCourses();
                }}
                className="flex items-center gap-2 text-primary hover:text-accent-gold transition-colors font-bold"
              >
                <ArrowLeft size={20} />
                Back to List
              </button>
              <h2 className="text-2xl font-bold text-primary">Deploy New Course</h2>
            </div>
            <CreateCourse onComplete={() => {
              setShowCreateForm(false);
              fetchCourses();
            }} />
          </motion.div>
        ) : (
          <>
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {message.text}
              <button onClick={() => setMessage(null)} className="ml-auto hover:opacity-70">
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Loader2 className="w-12 h-12 text-accent-gold animate-spin mb-4" />
            <p className="text-primary font-bold">Synchronizing database...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative aspect-video overflow-hidden rounded-t-3xl -mx-6 -mt-6 mb-6 group-hover:scale-[1.02] transition-transform duration-500 bg-slate-100">
                  <img 
                    src={IMAGE_MAP[course.title] || course.image || fullStackJavaImg} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    {/* Edit button */}
                    <button
                      onClick={() => openEdit(course)}
                      title="Edit video info"
                      className="p-2 bg-white/20 backdrop-blur-md text-white hover:bg-accent-gold rounded-lg transition-all border border-white/30"
                    >
                      <Pencil size={18} />
                    </button>
                    {/* Re-upload button */}
                    <button
                      onClick={() => navigate(`/admin/upload?courseId=${course.id}&courseName=${encodeURIComponent(course.title)}`)}
                      title="Re-upload video"
                      className="p-2 bg-white/20 backdrop-blur-md text-white hover:bg-blue-500 rounded-lg transition-all border border-white/30"
                    >
                      <UploadCloud size={18} />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => setDeleteId(course.id)}
                      className="p-2 bg-white/20 backdrop-blur-md text-white hover:bg-red-500 rounded-lg transition-all border border-white/30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4">
                     <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
                        <Video size={20} />
                     </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{course.title}</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {course.category || 'General'}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                    course.uploadStatus === 'completed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {course.uploadStatus}
                  </span>
                </div>

                {/* Video info */}
                {course.videoId ? (
                  <div className="text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2 mb-4 font-mono truncate">
                    🎬 {course.videoTitle || course.videoId}
                  </div>
                ) : (
                  <div className="text-xs text-yellow-600 bg-yellow-50 rounded-xl px-3 py-2 mb-4 flex items-center gap-2">
                    <AlertCircle size={12} /> No video attached
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <Calendar size={14} />
                    <span>{course.createdAt?.toDate ? course.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Video className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-primary font-bold text-lg">No courses found.</p>
            <p className="text-on-surface-variant mt-2">Start by uploading a new video.</p>
          </div>
        )}
        </>
      )}
    </div>

      {/* ── Edit Video Info Modal ── */}
      <AnimatePresence>
        {editCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setEditCourse(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl"
            >
              <button
                onClick={() => setEditCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 bg-accent-gold/10 rounded-2xl flex items-center justify-center text-accent-gold mb-5">
                <Pencil size={26} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-1">Edit Video Info</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Manually set the Google Drive <strong>videoId</strong> and <strong>videoTitle</strong> for:<br />
                <span className="font-bold text-primary">{editCourse.title}</span>
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    Google Drive File ID
                  </label>
                  <input
                    type="text"
                    value={editVideoId}
                    onChange={e => setEditVideoId(e.target.value)}
                    placeholder="e.g. 1l3Ppsow04PZnHzryBzbUobGAaeag4P47"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-gold outline-none font-mono text-sm"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Find this in your Google Drive URL: <code>drive.google.com/file/d/<strong>[ID]</strong>/view</code>
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={editVideoTitle}
                    onChange={e => setEditVideoTitle(e.target.value)}
                    placeholder="e.g. Digital Marketing Expert - Module 1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-gold outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setEditCourse(null)}
                  className="flex-1 py-4 bg-slate-100 text-primary font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={editSaving || !editVideoId.trim()}
                  className="flex-1 py-4 bg-accent-gold text-white font-bold rounded-2xl hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
                >
                  {editSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {editSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirm Modal ── */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setDeleteId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center text-primary mb-2">Delete Course?</h3>
              <p className="text-center text-on-surface-variant mb-8">
                This action cannot be undone. All video data and Firestore records will be permanently removed.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-4 bg-slate-100 text-primary font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
