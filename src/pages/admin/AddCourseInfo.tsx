import { useState, useEffect } from 'react';
import { getCourses } from '../../services/courseService';
import { db } from '../../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Search, Plus, Trash2, Save, Loader2 } from 'lucide-react';

interface CourseInfo {
  courseId: string;
  courseName: string;
  learning: string[];
  modules: { name: string; description: string }[];
  duration: string;
  level: string;
}

export default function AddCourseInfo() {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setMessage({ type: 'error', text: 'Failed to load courses' });
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCourse = async (course: any) => {
    setSelectedCourse(course);
    try {
      const docRef = doc(db, 'courseDetails', course.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCourseInfo(docSnap.data() as CourseInfo);
      } else {
        setCourseInfo({
          courseId: course.id,
          courseName: course.title,
          learning: ['', '', '', ''],
          modules: [{ name: '', description: '' }],
          duration: course.duration || 'Self-Paced',
          level: course.level || 'Beginner'
        });
      }
    } catch (err) {
      console.error('Failed to fetch course info:', err);
      setMessage({ type: 'error', text: 'Failed to load course information' });
    }
  };

  const handleLearningChange = (index: number, value: string) => {
    if (!courseInfo) return;
    const newLearning = [...courseInfo.learning];
    newLearning[index] = value;
    setCourseInfo({ ...courseInfo, learning: newLearning });
  };

  const handleModuleChange = (index: number, field: 'name' | 'description', value: string) => {
    if (!courseInfo) return;
    const newModules = [...courseInfo.modules];
    newModules[index] = { ...newModules[index], [field]: value };
    setCourseInfo({ ...courseInfo, modules: newModules });
  };

  const addModule = () => {
    if (!courseInfo) return;
    setCourseInfo({
      ...courseInfo,
      modules: [...courseInfo.modules, { name: '', description: '' }]
    });
  };

  const removeModule = (index: number) => {
    if (!courseInfo) return;
    setCourseInfo({
      ...courseInfo,
      modules: courseInfo.modules.filter((_, i) => i !== index)
    });
  };

  const handleSave = async () => {
    if (!courseInfo || !selectedCourse) return;

    // Validate
    const learningPoints = courseInfo.learning.filter(l => l.trim());
    if (learningPoints.length === 0) {
      setMessage({ type: 'error', text: 'Add at least one learning point' });
      return;
    }

    const validModules = courseInfo.modules.filter(m => m.name.trim() && m.description.trim());
    if (validModules.length === 0) {
      setMessage({ type: 'error', text: 'Add at least one module' });
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, 'courseDetails', selectedCourse.id);
      await setDoc(docRef, {
        courseId: selectedCourse.id,
        courseName: selectedCourse.title,
        learning: learningPoints,
        modules: validModules,
        duration: courseInfo.duration,
        level: courseInfo.level,
        updatedAt: new Date()
      });
      setMessage({ type: 'success', text: 'Course information saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save course info:', err);
      setMessage({ type: 'error', text: 'Failed to save course information' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto pb-20">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Add Course Information</h2>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search course by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold"
            />
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
            {loading ? (
              <div className="col-span-2 flex justify-center py-8">
                <Loader2 className="animate-spin text-accent-gold" size={24} />
              </div>
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <button
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCourse?.id === course.id
                      ? 'border-accent-gold bg-accent-gold/10'
                      : 'border-slate-200 hover:border-accent-gold'
                  }`}
                >
                  <h3 className="font-bold text-primary">{course.title}</h3>
                  <p className="text-sm text-slate-600">{course.category}</p>
                </button>
              ))
            ) : (
              <p className="col-span-2 text-slate-500 py-4">No courses found</p>
            )}
          </div>
        </motion.div>

        {/* Course Details Form */}
        {courseInfo && selectedCourse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-8">{courseInfo.courseName}</h3>

            {/* Duration and Level (Fetched, Read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Duration</label>
                <input
                  type="text"
                  value={courseInfo.duration}
                  disabled
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Level</label>
                <input
                  type="text"
                  value={courseInfo.level}
                  disabled
                  className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* What Will You Learn */}
            <div className="mb-8">
              <label className="block text-lg font-bold text-primary mb-4">What Will You Learn (Max 4)</label>
              <div className="space-y-3">
                {courseInfo.learning.slice(0, 4).map((point, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Learning point ${index + 1}`}
                    value={point}
                    onChange={(e) => handleLearningChange(index, e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  />
                ))}
              </div>
            </div>

            {/* Modules */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-bold text-primary">Modules ({courseInfo.modules.length})</label>
                <button
                  onClick={addModule}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-gold text-primary font-bold rounded-lg hover:brightness-110 transition-all"
                >
                  <Plus size={18} /> Add Module
                </button>
              </div>

              <div className="space-y-4">
                {courseInfo.modules.map((module, index) => (
                  <div key={index} className="p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-primary">Module {index + 1}</h4>
                      {courseInfo.modules.length > 1 && (
                        <button
                          onClick={() => removeModule(index)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Module name"
                      value={module.name}
                      onChange={(e) => handleModuleChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                    />
                    <textarea
                      placeholder="Module description"
                      value={module.description}
                      onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:brightness-110 disabled:opacity-70 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Course Information
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
