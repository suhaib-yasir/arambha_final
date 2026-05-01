import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

export default function ChunkedUpload() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const abortControllerRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid video file.');
      setFile(null);
    }
  };

  const uploadFile = async () => {
    if (!file || !courseName) {
      setError('Course name and video file are required.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);
    
    abortControllerRef.current = new AbortController();

    try {
      // 1. Initiate Upload Session
      const initFormData = new FormData();
      initFormData.append('course_name', courseName);
      initFormData.append('admin_uid', currentUser.uid);
      initFormData.append('filename', file.name);
      initFormData.append('content_type', file.type);

      const initResponse = await fetch('http://localhost:8000/api/upload/initiate', {
        method: 'POST',
        body: initFormData,
        signal: abortControllerRef.current.signal
      });

      if (!initResponse.ok) throw new Error('Failed to initiate upload session.');
      const { resumable_url, course_id } = await initResponse.json();

      // 2. Upload in Chunks
      const totalSize = file.size;
      let start = 0;
      let driveId = null;

      while (start < totalSize) {
        const end = Math.min(start + CHUNK_SIZE, totalSize);
        const chunk = file.slice(start, end);
        const contentRange = `bytes ${start}-${end - 1}/${totalSize}`;

        const chunkResponse = await fetch('http://localhost:8000/api/upload/chunk', {
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
          break;
        } else if (chunkResponse.status === 308) {
          // Chunk accepted, continue
          start = end;
          setProgress(Math.round((start / totalSize) * 100));
        } else {
          throw new Error('Chunk upload failed.');
        }
      }

      // 3. Finalize in Firestore
      const finalizeFormData = new FormData();
      finalizeFormData.append('course_id', course_id);
      finalizeFormData.append('drive_id', driveId);
      finalizeFormData.append('filename', file.name);

      await fetch('http://localhost:8000/api/upload/finalize', {
        method: 'POST',
        body: finalizeFormData,
        signal: abortControllerRef.current.signal
      });

      setSuccess(true);
      setProgress(100);
      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Upload cancelled.');
      } else {
        setError(err.message || 'An error occurred during upload.');
      }
      console.error(err);
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
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Resumable Video Upload
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter course name..."
              disabled={uploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Video File</label>
            <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <div className="space-y-2">
                <p className="text-slate-300">{file ? file.name : 'Click to select or drag and drop'}</p>
                <p className="text-xs text-slate-500">MP4, MOV, AVI (Max 500MB recommended)</p>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/30 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm">
              ✓ Upload complete! Redirecting...
            </div>
          )}

          <div className="flex gap-4">
            {!uploading ? (
              <button
                onClick={uploadFile}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Upload
              </button>
            ) : (
              <button
                onClick={cancelUpload}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
