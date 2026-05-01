import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CloudUpload, 
  FileVideo, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Loader2,
  Play,
  FileCheck
} from 'lucide-react';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

export default function ChunkedUpload() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Re-upload mode: pre-filled from query params
  const reUploadCourseId = searchParams.get('courseId');
  const reUploadCourseName = searchParams.get('courseName') || '';
  const isReUploadMode = Boolean(reUploadCourseId);

  const [file, setFile] = useState<File | null>(null);
  const [courseName, setCourseName] = useState(reUploadCourseName);
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
    if (!file || !courseName) {
      setError('Course name and video file are required.');
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
      // In re-upload mode, override the returned course_id with the existing one
      const resumable_url = initData.resumable_url;
      const course_id = isReUploadMode ? reUploadCourseId! : initData.course_id;

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
          start = end; // Mark as finished
          setProgress(100);
          break;
        } else if (chunkResponse.status === 308) {
          // Chunk accepted, continue
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
      
      // Navigate back after delay
      setTimeout(() => navigate('/'), 3000);

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
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="brand-gradient-navy p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-gold/20 rounded-2xl flex items-center justify-center border border-accent-gold/30">
                <CloudUpload className="text-accent-gold" size={24} />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold">
                  {isReUploadMode ? 'Re-Upload Video' : 'Admin Video Portal'}
                </h1>
                <p className="text-slate-400 text-sm">
                  {isReUploadMode
                    ? `Replacing video for: ${reUploadCourseName}`
                    : 'Resumable high-fidelity upload pipeline'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Course Name */}
            <div>
              <label className="block text-sm font-bold text-primary uppercase tracking-wider mb-3">
                Course Identifier
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => !isReUploadMode && setCourseName(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent-gold outline-none transition-all font-sans text-primary ${
                  isReUploadMode ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                placeholder="e.g. Master Spoken English - Phase 1"
                disabled={uploading || isReUploadMode}
              />
              {isReUploadMode && (
                <p className="text-xs text-blue-600 mt-2 font-semibold">
                  🔄 Re-upload mode — this video will replace the existing one in Firestore.
                </p>
              )}
            </div>

            {/* Drop Zone */}
            <div 
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer group
                ${file ? 'border-accent-gold bg-accent-gold/5' : 'border-slate-200 hover:border-accent-gold hover:bg-slate-50'}`}
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
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-16 h-16 bg-accent-gold rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <FileVideo size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-primary truncate max-w-md">{file.name}</p>
                      <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type.split('/')[1].toUpperCase()}
                      </p>
                    </div>
                    {!uploading && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="mt-2 text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-bold"
                      >
                        <X size={16} /> Remove
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-file"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-accent-gold/10 group-hover:text-accent-gold transition-colors">
                      <Play size={32} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-primary text-lg">Select Master Video File</p>
                      <p className="text-sm text-on-surface-variant max-w-xs mx-auto">
                        Drag and drop your high-resolution video file here or click to browse.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Area */}
            <AnimatePresence>
              {(uploading || progress > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      {progress < 100 ? (
                        <Loader2 className="text-accent-gold animate-spin" size={18} />
                      ) : (
                        <FileCheck className="text-green-500" size={18} />
                      )}
                      <span className="font-bold text-primary">
                        {progress < 100 ? 'Syncing with Google Drive...' : 'Upload Synchronized'}
                      </span>
                    </div>
                    <span className="text-2xl font-serif font-bold text-accent-gold">{progress}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200 p-1">
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

            {/* Notifications */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl flex items-start gap-4"
                >
                  <AlertCircle className="text-red-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-red-900">Upload Interrupted</h4>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-l-4 border-green-500 p-6 rounded-2xl flex items-start gap-4"
                >
                  <CheckCircle2 className="text-green-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-green-900">Mission Accomplished</h4>
                    <p className="text-green-700 text-sm mt-1">
                      Course and video have been successfully registered in Firestore and stored in Google Drive.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="pt-4 flex gap-4">
              {!uploading ? (
                <button
                  onClick={uploadFile}
                  disabled={!file || !courseName}
                  className="flex-1 brand-gradient-gold text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:grayscale disabled:opacity-50 uppercase tracking-widest text-sm"
                >
                  Begin Production Sync
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={cancelUpload}
                  className="flex-1 bg-white border-2 border-slate-200 text-primary font-bold py-5 px-8 rounded-2xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  Terminate Process
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
        
        <p className="text-center text-on-surface-variant text-xs mt-8 uppercase tracking-[0.2em] font-bold">
          Arambha Digital Infrastructure • v2.0
        </p>
      </div>
    </div>
  );
}
