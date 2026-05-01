import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import { seedAdminIfMissing, isUserAdmin } from '../services/adminService';
import {
  getStudentProfile,
  getStudentCourses,
  getStudentCertificates,
} from '../services/dashboardService';
import DashboardCard from '../components/DashboardCard';
import CourseCard from '../components/CourseCard';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is admin and seed if necessary
        try {
          await seedAdminIfMissing(currentUser);
          const adminStatus = await isUserAdmin(currentUser.uid);
          setIsAdmin(adminStatus);
        } catch (err) {
          console.warn('Admin seeding skipped:', err);
        }

        const [profileData, coursesData, certificatesData] = await Promise.all([
          getStudentProfile(currentUser.uid),
          getStudentCourses(currentUser.uid),
          getStudentCertificates(currentUser.uid),
        ]);

        setProfile(profileData);
        setCourses(coursesData);
        setCertificates(certificatesData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Failed to logout');
    }
  };

  // Calculate derived metrics
  const calculateMetrics = () => {
    if (!profile || !courses) {
      return {
        enrolledCourses: 0,
        completedCourses: 0,
        totalCredits: 0,
        certificatesEarned: 0,
        totalVideosCompleted: 0,
        overallProgress: 0,
        pendingCourses: 0,
        lastCourseInProgress: null,
      };
    }

    const completedCourses = courses.filter((c) => c.completed).length;
    const totalVideosCompleted = courses.reduce((sum, c) => sum + (c.videosCompleted || 0), 0);
    const overallProgress =
      courses.length > 0
        ? Math.round(
            courses.reduce((sum, c) => sum + (c.progressPercent || 0), 0) /
              courses.length
          )
        : 0;

    const incompleteCourses = courses.filter((c) => !c.completed);
    const lastCourseInProgress = incompleteCourses.length > 0 ? incompleteCourses[0] : null;

    return {
      enrolledCourses: profile.enrolledCoursesCount || 0,
      completedCourses: profile.completedCoursesCount || 0,
      totalCredits: profile.totalCredits || 0,
      certificatesEarned: profile.certificatesEarned || 0,
      totalVideosCompleted,
      overallProgress,
      pendingCourses: (profile.enrolledCoursesCount || 0) - (profile.completedCoursesCount || 0),
      lastCourseInProgress,
    };
  };

  const metrics = calculateMetrics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-300 font-bold text-lg mb-2">Error</h2>
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {profile?.name || 'Student'}</h1>
            <p className="text-blue-100 mt-1">{profile?.email}</p>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            icon="📚"
            title="Courses Enrolled"
            value={metrics.enrolledCourses}
            gradient="from-blue-500 to-blue-600"
          />
          <DashboardCard
            icon="✅"
            title="Courses Completed"
            value={metrics.completedCourses}
            gradient="from-green-500 to-green-600"
          />
          <DashboardCard
            icon="⭐"
            title="Total Credits"
            value={metrics.totalCredits}
            gradient="from-yellow-500 to-yellow-600"
          />
          <DashboardCard
            icon="🏆"
            title="Certificates Earned"
            value={metrics.certificatesEarned}
            gradient="from-purple-500 to-purple-600"
          />

          <DashboardCard
            icon="🎬"
            title="Videos Completed"
            value={metrics.totalVideosCompleted}
            gradient="from-pink-500 to-pink-600"
          />
          <DashboardCard
            icon="📊"
            title="Overall Progress"
            value={`${metrics.overallProgress}%`}
            gradient="from-indigo-500 to-indigo-600"
          />
          <DashboardCard
            icon="⏳"
            title="Pending Courses"
            value={metrics.pendingCourses}
            gradient="from-orange-500 to-orange-600"
          />
          <DashboardCard
            icon="🚀"
            title="Last Course"
            value={metrics.lastCourseInProgress ? 'In Progress' : 'None'}
            gradient="from-cyan-500 to-cyan-600"
          />
        </section>

        {/* My Courses Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My Courses</h2>
            <span className="text-gray-400 text-sm">{courses.length} courses</span>
          </div>

          {courses.length === 0 ? (
            <div className="bg-slate-700 bg-opacity-50 border border-slate-600 rounded-lg p-12 text-center">
              <p className="text-gray-300 text-lg">No courses enrolled yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Browse and enroll in courses to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg"
                >
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="text-lg font-semibold">{cert.title || 'Certificate'}</h3>
                  <p className="text-sm text-amber-100 mt-2">
                    {cert.courseTitle || 'Course Certificate'}
                  </p>
                  {cert.earnedDate && (
                    <p className="text-xs text-amber-200 mt-3">
                      Earned: {new Date(cert.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
