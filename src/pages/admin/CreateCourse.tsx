import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  FileVideo, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Loader2,
  Play,
  FileCheck,
  Type,
  Layout,
  Clock,
  AlignLeft,
  Image as ImageIcon,
  ShieldCheck
} from 'lucide-react';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

const CATEGORIES = [
  "Spoken English",
  "Digital Marketing",
  "Professional Development",
  "Soft Skills",
  "Technical Training",
  "Business Essentials"
];

export default function CreateCourse() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Course Details
  const [courseName, setCourseName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [price, setPrice] = useState('');

  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setError(null);
    } else if (selectedFile) {
      setError('Please select a valid video file (MP4, MOV, etc.).');
      setFile(null);
    }
  };

  const uploadFile = async () => {
    if (!file || !courseName || !category) {
      setError('Course name, category and video file are required.');
      return;
    }

    if (!currentUser) {
      setError('You must be logged in as an admin.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);
    
    abortControllerRef.current = new AbortController();

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

      // 1. Initiate Upload Session
      const initFormData = new FormData();
      initFormData.append('course_name', courseName);
      initFormData.append('admin_uid', currentUser.uid);
      initFormData.append('filename', file.name);
      initFormData.append('content_type', file.type);
      initFormData.append('description', description);
      initFormData.append('category', category);
      initFormData.append('duration', duration);
      initFormData.append('level', level);
      initFormData.append('price', price);
      initFormData.append('image_url', imageUrl); 

      const initResponse = await fetch(`${backendUrl}/api/upload/initiate`, {
        method: 'POST',
        body: initFormData,
        signal: abortControllerRef.current.signal
      });

      if (!initResponse.ok) {
        const errorText = await initResponse.text();
        throw new Error(`Failed to initiate upload: ${errorText}`);
      }
      
      const initData = await initResponse.json();
      const resumable_url = initData.resumable_url;
      const course_id = initData.course_id;

      // 2. Upload in Chunks
      const totalSize = file.size;
      let start = 0;
      let driveId = null;

      while (start < totalSize) {
        const end = Math.min(start + CHUNK_SIZE, totalSize);
        const chunk = file.slice(start, end);
        const contentRange = `bytes ${start}-${end - 1}/${totalSize}`;

        const chunkResponse = await fetch(`${backendUrl}/api/upload/chunk`, {
          method: 'PUT',
          headers: {
            'resumable-url': resumable_url,
            'content-range': contentRange
          },
          body: chunk,
          signal: abortControllerRef.current.signal
        });

        if (chunkResponse.status === 200 || chunkResponse.status === 201) {
          const result = await chunkResponse.json();
          driveId = result.drive_id;
          start = end; 
          setProgress(100);
          break;
        } else if (chunkResponse.status === 308) {
          start = end;
          setProgress(Math.round((start / totalSize) * 100));
        } else {
          const errorText = await chunkResponse.text();
          throw new Error(`Chunk upload failed: ${errorText}`);
        }
      }

      // 3. Finalize in Firestore
      const finalizeFormData = new FormData();
      finalizeFormData.append('course_id', course_id);
      finalizeFormData.append('drive_id', driveId);
      finalizeFormData.append('filename', file.name);

      const finalizeResponse = await fetch(`${backendUrl}/api/upload/finalize`, {
        method: 'POST',
        body: finalizeFormData,
        signal: abortControllerRef.current.signal
      });

      if (!finalizeResponse.ok) {
        throw new Error('Failed to finalize upload record.');
      }

      setSuccess(true);
      setProgress(100);
      
      setTimeout(() => navigate('/admin/portal'), 3000);

    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Upload cancelled by user.');
      } else {
        setError(err.message || 'An unexpected error occurred during upload.');
      }
      console.error('Upload Error:', err);
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
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
          <div className="brand-gradient-navy p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 blur-[100px] -mr-40 -mt-40 rounded-full"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-accent-gold/20 rounded-2xl flex items-center justify-center border border-accent-gold/30 backdrop-blur-md shadow-inner">
                <PlusCircle className="text-accent-gold" size={32} />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-extrabold tracking-tight">Create New Course</h1>
                <p className="text-slate-300 text-sm mt-1 font-medium opacity-80">
                  Deploy premium learning content to the Arambha Ecosystem
                </p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Details */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Layout size={14} /> Course Foundations
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Course Title */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                        <Type size={16} /> Course Title
                      </label>
                      <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all font-sans text-primary placeholder:text-slate-400"
                        placeholder="e.g. Advanced Digital Strategy 2024"
                        disabled={uploading}
                      />
                    </div>

                    {/* Category */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                        <Layout size={16} /> Learning Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all font-sans text-primary appearance-none cursor-pointer"
                        disabled={uploading}
                      >
                        <option value="" disabled>Select a category...</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Duration & Level Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <Clock size={16} /> Duration
                        </label>
                        <input
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                          placeholder="e.g. 2h 30m"
                          disabled={uploading}
                        />
                      </div>
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <ShieldCheck size={16} /> Course Level
                        </label>
                        <select
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm appearance-none cursor-pointer"
                          disabled={uploading}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>

                    {/* Price & Thumbnail Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <span className="text-lg font-bold">₹</span> Course Price
                        </label>
                        <input
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                          placeholder="e.g. 4999"
                          disabled={uploading}
                        />
                      </div>
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-primary mb-2 transition-colors group-focus-within:text-accent-gold">
                          <ImageIcon size={16} /> Thumbnail URL
                        </label>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all text-sm"
                          placeholder="https://..."
                          disabled={uploading}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <AlignLeft size={14} /> Curriculum Description
                  </h3>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-accent-gold/10 focus:border-accent-gold outline-none transition-all font-sans text-primary placeholder:text-slate-400 resize-none"
                    placeholder="Provide a detailed overview of what students will learn..."
                    disabled={uploading}
                  />
                </section>
              </div>

              {/* Right Column: Video Upload */}
              <div className="flex flex-col h-full">
                <h3 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Play size={14} /> Video Asset
                </h3>
                
                <div 
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  className={`flex-1 min-h-[300px] relative border-2 border-dashed rounded-[2rem] p-8 text-center transition-all cursor-pointer group flex flex-col items-center justify-center
                    ${file ? 'border-accent-gold bg-accent-gold/5 shadow-inner' : 'border-slate-200 hover:border-accent-gold hover:bg-slate-50'}`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                  
                  <AnimatePresence mode="wait">
                    {file ? (
                      <motion.div
                        key="file-selected"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className="w-20 h-20 bg-accent-gold rounded-[1.5rem] flex items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                          <FileVideo size={40} />
                        </div>
                        <div className="px-4">
                          <p className="font-bold text-primary truncate max-w-[200px]">{file.name}</p>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-1 rounded uppercase tracking-tighter">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                            <span className="text-[10px] font-black bg-accent-gold/20 text-accent-gold px-2 py-1 rounded uppercase tracking-tighter">
                              {file.type.split('/')[1].toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {!uploading && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="mt-4 text-red-500 hover:text-red-600 flex items-center gap-1 text-xs font-black uppercase tracking-widest"
                          >
                            <X size={14} /> Change Video
                          </button>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="no-file"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-6"
                      >
                        <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-accent-gold/10 group-hover:text-accent-gold transition-all group-hover:scale-110">
                          <Play size={40} fill="currentColor" />
                        </div>
                        <div className="space-y-2">
                          <p className="font-bold text-primary text-xl">Select Course Video</p>
                          <p className="text-sm text-on-surface-variant max-w-[200px] mx-auto font-medium leading-relaxed">
                            Drag and drop your high-resolution master file here
                          </p>
                        </div>
                        <div className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                          Browse Files
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress Area */}
                <AnimatePresence>
                  {(uploading || progress > 0) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          {progress < 100 ? (
                            <Loader2 className="text-accent-gold animate-spin" size={18} />
                          ) : (
                            <FileCheck className="text-green-500" size={18} />
                          )}
                          <span className="font-bold text-primary text-sm">
                            {progress < 100 ? 'Syncing with Google Drive...' : 'Upload Synchronized'}
                          </span>
                        </div>
                        <span className="text-2xl font-serif font-black text-accent-gold">{progress}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                        <motion.div 
                          className="brand-gradient-gold h-full rounded-full relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/20 blur-sm"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    <h4 className="font-black text-red-900 uppercase tracking-tighter text-sm">Deployment Error</h4>
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
                    <h4 className="font-black text-green-900 uppercase tracking-tighter text-sm">Course Deployed</h4>
                    <p className="text-green-700 text-sm mt-1 font-medium">
                      All assets and metadata have been successfully integrated into the Firestore & Drive ecosystem.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="pt-10 flex gap-4">
              {!uploading ? (
                <button
                  onClick={uploadFile}
                  disabled={!file || !courseName || !category}
                  className="flex-1 brand-gradient-gold text-white font-black py-6 px-8 rounded-2xl shadow-2xl hover:brightness-110 hover:translate-y-[-2px] active:translate-y-[0px] transition-all flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50 uppercase tracking-[0.15em] text-sm"
                >
                  Publish to Platform
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={cancelUpload}
                  className="flex-1 bg-white border-2 border-slate-200 text-primary font-black py-6 px-8 rounded-2xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-sm"
                >
                  Abort Deployment
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-center gap-8 mt-12 opacity-30 grayscale contrast-125">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Secure Channel</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Admin Protocol 4.1</p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">v2.4.0</p>
        </div>
      </div>
    </div>
  );
}
