import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Loader2, X, AlertCircle } from "lucide-react";
import programsHeroImg from "../assets/programs-hero.svg";
import { useAuth } from "../context/AuthContext";
import { enrollInCourse, getCourses } from "../services/courseService";
import EnrollmentForm from "../components/EnrollmentForm";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";

interface CourseDetail {
  learning: string[];
  modules: { name: string; description: string }[];
  duration: string;
  level: string;
}

interface DynamicCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  level?: string;
}

export default function ProgramDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseIdParam = searchParams.get("courseId");
  const { currentUser } = useAuth();

  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [dynamicCourse, setDynamicCourse] = useState<DynamicCourse | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoadingDetail(true);
        setNotFound(false);
        const firestoreCourseId = courseIdParam || id;

        if (!firestoreCourseId) {
          setNotFound(true);
          return;
        }

        let match = null;
        try {
          const courseRef = doc(db, "courses", firestoreCourseId);
          const courseSnap = await getDoc(courseRef);
          if (courseSnap.exists()) {
            match = { id: firestoreCourseId, ...courseSnap.data() };
          }
        } catch (e) {
          console.warn("Firestore course fetch failed:", e);
        }

        if (!match) {
          const allCourses = await getCourses();
          match = allCourses.find((c: any) => String(c.id) === String(firestoreCourseId));
        }

        if (!match) {
          setNotFound(true);
          return;
        }

        setDynamicCourse({
          id: String(match.id),
          title: match.title || "Untitled Course",
          category: match.category || "",
          duration: match.duration || "Self-Paced",
          description: match.description || "",
          image: match.image || "",
          level: match.level || "",
        });

        try {
          const detailRef = doc(db, "courseDetails", firestoreCourseId);
          const detailSnap = await getDoc(detailRef);
          if (detailSnap.exists()) {
            setCourseDetail(detailSnap.data() as CourseDetail);
          }
        } catch (e) {}
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoadingDetail(false);
      }
    };
    fetchCourse();
  }, [id, courseIdParam]);

  const handleEnrollClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setIsFormOpen(true);
  };

  if (loadingDetail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans gap-4">
        <Loader2 className="w-12 h-12 text-[#1B2B48] animate-spin" />
        <p className="text-[#1B2B48] font-semibold text-lg">Loading program details…</p>
      </div>
    );
  }

  if (notFound || !dynamicCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <h2 className="text-3xl font-bold text-[#1B2B48] mb-4">Program Not Found</h2>
        <p className="text-slate-600 mb-8">The program you are looking for does not exist.</p>
        <button onClick={() => navigate("/programs")} className="bg-[#1B2B48] text-white px-8 py-3 rounded-xl font-bold">Go Back</button>
      </div>
    );
  }

  const displayLearning = courseDetail?.learning || [];
  const displayModules = courseDetail?.modules || [];
  const displayDuration = courseDetail?.duration || dynamicCourse.duration;
  const displayLevel = courseDetail?.level || dynamicCourse.level || "All Levels";

  return (
    <div className="min-h-screen relative flex items-start justify-center py-12 sm:py-20 px-4 sm:px-6 font-sans">
      <img src={programsHeroImg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-slate-100/90 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col mt-6">
        <button onClick={() => navigate("/programs")} className="absolute -top-10 left-0 z-20 flex items-center gap-2 text-[#1B2B48] font-bold text-sm">
          <ArrowLeft className="w-5 h-5" /> Back to Programs
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full">
          <div className="bg-[#1B2B48] text-white p-8 sm:p-12">
            {dynamicCourse.category && <div className="inline-block bg-white/10 px-3 py-1.5 rounded-lg text-sm mb-6">{dynamicCourse.category}</div>}
            <h1 className="text-4xl sm:text-5xl font-bold mb-5">{dynamicCourse.title}</h1>
            <p className="text-white/80 text-base sm:text-lg max-w-3xl">{dynamicCourse.description}</p>
          </div>

          <div className="bg-[#f8f9fa] p-8 sm:p-12 flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              {displayLearning.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-[#1B2B48] mb-8">What You Will Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {displayLearning.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#1B2B48]" />
                        <span className="font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {displayModules.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1B2B48] mb-8">Program Modules</h2>
                  <div className="space-y-5">
                    {displayModules.map((mod: any, i: number) => (
                      <div key={i} className="bg-white border border-[#1B2B48] rounded-xl p-6">
                        <h3 className="font-bold text-[#1B2B48] text-lg mb-2">Module {i + 1}: {typeof mod === "string" ? mod : mod.name}</h3>
                        {typeof mod !== "string" && mod.description && <p className="text-sm text-slate-600">{mod.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-[#f0f5fa] border border-blue-100 rounded-2xl p-8 sticky top-28">
                <h3 className="text-[#1B2B48] font-bold text-xl mb-6">Program Details</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-blue-200/60">
                    <span className="text-slate-600 text-sm">Duration</span>
                    <span className="font-bold text-[#1B2B48] text-sm">{displayDuration}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-blue-200/60">
                    <span className="text-slate-600 text-sm">Level</span>
                    <span className="font-bold text-[#1B2B48] text-sm">{displayLevel}</span>
                  </div>
                </div>
                <button onClick={handleEnrollClick} disabled={enrolled} className="w-full bg-[#1B2B48] text-white font-bold py-4 rounded-xl shadow-md">
                  {enrolled ? "Enrolled Successfully" : "Enroll Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dynamicCourse && (
        <EnrollmentForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          program={{ id: dynamicCourse.id, title: dynamicCourse.title }}
          onSuccess={() => setEnrolled(true)}
        />
      )}
    </div>
  );
}