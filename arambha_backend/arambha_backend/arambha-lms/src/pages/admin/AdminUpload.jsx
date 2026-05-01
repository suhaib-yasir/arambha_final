import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminUpload() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!courseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (files.length === 0) {
      setError('Please select at least one video file');
      return;
    }

    if (!currentUser) {
      setError('Not authenticated');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('course_name', courseName);
      formData.append('admin_uid', currentUser.uid);
      
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('http://localhost:8000/upload-course', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      const result = await response.json();

      setSuccessMessage(
        `Course "${courseName}" created successfully with ${files.length} videos!`
      );
      setSuccess(true);

      // Reset form
      setCourseName('');
      setFiles([]);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold">Course Upload</h1>
          <p className="text-blue-100 mt-1">Admin Panel - Integrated Google Drive & Firestore Upload</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  ✓ {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g., Fundamentals of Java"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={loading}
                  />
                </div>

                {/* Video Upload Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Videos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept="video/*,.mp4,.avi,.mov,.mkv"
                      className="w-full cursor-pointer"
                      disabled={loading}
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Select one or more video files (mp4, avi, mov, mkv)
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Course...' : 'Create Course + Prepare Upload'}
                </button>
              </form>

              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Upload Pipeline: Active</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✓ Creates course in Firestore</li>
                  <li>✓ Uploads video files to Google Drive</li>
                  <li>✓ Auto-creates videos subcollection with Drive IDs</li>
                  <li>✓ Full Pipeline Integrated</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-lg p-6 text-white sticky top-8">
              <h3 className="text-lg font-bold mb-4">📋 Upload Preview</h3>

              {courseName && (
                <div className="mb-4 p-3 bg-slate-600 rounded">
                  <p className="text-xs text-gray-300">Course Name</p>
                  <p className="font-semibold truncate">{courseName}</p>
                </div>
              )}

              {files.length > 0 && (
                <div>
                  <p className="text-sm text-gray-300 mb-3">
                    {files.length} video{files.length !== 1 ? 's' : ''} selected
                  </p>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="bg-slate-600 p-3 rounded flex items-start justify-between group hover:bg-slate-500 transition"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">Video {index + 1}</p>
                          <p className="text-xs text-gray-300 truncate">{file.name}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-400 hover:text-red-300 text-lg opacity-0 group-hover:opacity-100 transition"
                          disabled={loading}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-600 bg-opacity-20 rounded border border-blue-400 text-xs">
                    <p className="font-semibold text-blue-200">Firestore Structure:</p>
                    <p className="text-blue-100 mt-1 font-mono text-xs">
                      courses/{'{courseId}'}/videos/
                    </p>
                  </div>
                </div>
              )}

              {files.length === 0 && !courseName && (
                <div className="text-center text-gray-400">
                  <p className="text-sm">Select course name and videos to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
