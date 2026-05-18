import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Link as LinkIcon, Zap, PlayCircle, BookOpen } from 'lucide-react';
import { getActiveWebinars, getUpcomingWebinars, Webinar } from '../services/webinarService';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const [activeWebinars, setActiveWebinars] = useState<Webinar[]>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<Webinar[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Refresh webinars every minute to update active status
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [active, upcoming] = await Promise.all([
        getActiveWebinars(),
        getUpcomingWebinars()
      ]);
      
      // Filter upcoming to exclude already active ones
      const filteredUpcoming = upcoming.filter(w => !active.find(a => a.id === w.id));
      
      setActiveWebinars(active);
      setUpcomingWebinars(filteredUpcoming);

      // Fetch enrollments from Firebase
      let firebaseEnrollments: any[] = [];
      if (currentUser) {
        try {
          const enrollmentsRef = collection(db, 'enrollments');
          const q = query(enrollmentsRef, where('user_id', '==', currentUser.uid));
          const snapshot = await getDocs(q);
          firebaseEnrollments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            enrolled_at: doc.data().enrolled_at?.toDate?.()
              ? doc.data().enrolled_at.toDate().toISOString()
              : doc.data().enrolled_at || new Date().toISOString()
          }));
        } catch (err) {
          console.warn('Firebase enrollment fetch failed:', err);
        }
      }

      setEnrolledCourses(firebaseEnrollments);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };


  const formatDateTime = (date: any) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (date: any) => {
    if (!date) return '';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleTimeString('en-IN', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center py-20">
            <div className="animate-spin">
              <Zap className="text-accent-gold" size={32} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Student Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here is your learning progress.</p>
        </motion.div>

        {/* My Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-primary">My Courses</h2>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-primary">{course.course_title}</h3>
                    <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded">Paid</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Enrolled on: {new Date(course.enrolled_at).toLocaleDateString()}</p>
                  <button className="w-full py-2 bg-primary/5 text-primary font-bold rounded-lg hover:bg-primary/10 transition-all text-sm">Continue Learning</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">You haven't enrolled in any courses yet.</p>
            </div>
          )}
        </motion.div>

        {/* Active Webinars Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
              <PlayCircle size={18} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-primary">
              Active Now {activeWebinars.length > 0 && `(${activeWebinars.length})`}
            </h2>
          </div>

          {activeWebinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-200 hover:shadow-xl transition-all"
                >
                  {/* Active Badge */}
                  <div className="h-2 bg-gradient-to-r from-red-500 to-pink-500"></div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{webinar.title}</h3>
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                          🔴 Live Now
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        webinar.type === 'zoom' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {webinar.type === 'zoom' ? 'Zoom' : 'Google Meet'}
                      </span>
                    </div>

                    {webinar.description && (
                      <p className="text-sm text-slate-600 mb-4">{webinar.description}</p>
                    )}

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={16} className="text-accent-gold" />
                        <span>Started at {formatTime(webinar.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-accent-gold" />
                        <span>Ends at {formatTime(webinar.endTime)}</span>
                      </div>
                    </div>

                    <a
                      href={webinar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <LinkIcon size={18} />
                      Join Meeting Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <PlayCircle size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No active webinars right now</p>
            </div>
          )}
        </motion.div>

        {/* Upcoming Webinars Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <Calendar size={18} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-primary">
              Upcoming {upcomingWebinars.length > 0 && `(${upcomingWebinars.length})`}
            </h2>
          </div>

          {upcomingWebinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  {/* Upcoming Badge */}
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"></div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-2">{webinar.title}</h3>
                    
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-4">
                      📅 Scheduled
                    </div>

                    {webinar.description && (
                      <p className="text-xs text-slate-600 mb-4 line-clamp-2">{webinar.description}</p>
                    )}

                    <div className="space-y-2 mb-6 bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-slate-700 font-semibold">{formatDateTime(webinar.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock size={14} className="text-slate-400" />
                        <span>to {formatTime(webinar.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded text-white font-bold ${
                          webinar.type === 'zoom' 
                            ? 'bg-blue-600' 
                            : 'bg-red-600'
                        }`}>
                          {webinar.type === 'zoom' ? 'Zoom' : 'Google Meet'}
                        </span>
                      </div>
                    </div>

                    <a
                      href={webinar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <LinkIcon size={16} />
                      View Details
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No upcoming webinars scheduled</p>
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        {activeWebinars.length === 0 && upcomingWebinars.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">No Webinars Available</h4>
                <p className="text-blue-800 text-sm">
                  Check back soon! New webinars will be scheduled by instructors and displayed here.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
