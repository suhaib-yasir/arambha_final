import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Loader2, X, AlertCircle } from "lucide-react";
import programsHeroImg from "../assets/programs-hero.svg";
import { useAuth } from "../context/AuthContext";
import { enrollInCourse, getCourses } from "../services/courseService";
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

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  collegeName?: string;
  yearOfPassing?: string;
  highestEducation?: string;
}

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[^\d]/g, ''));
};

export default function ProgramDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // courseId query param is the Firestore document ID for dynamic courses
  const courseIdParam = searchParams.get("courseId");

  const { currentUser } = useAuth();

  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [dynamicCourse, setDynamicCourse] = useState<DynamicCourse | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    whatsapp: "",
    address: "",
    collegeName: "",
    yearOfPassing: "",
    highestEducation: "",
  });

  // Sync auth user into form fields
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  // Fetch course + its details from Firestore
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoadingDetail(true);
        setNotFound(false);

        // Determine which Firestore course ID to use:
        // Priority 1 — explicit ?courseId= query param (dynamic courses)
        // Priority 2 — :id route param (legacy static-mapped courses)
        const firestoreCourseId = courseIdParam || id;

        if (!firestoreCourseId) {
          setNotFound(true);
          return;
        }

        // --- Load base course data ---
        // Try fetching the course document directly first (faster path)
        const courseRef = doc(db, "courses", firestoreCourseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
          const data = courseSnap.data();
          setDynamicCourse({
            id: firestoreCourseId,
            title: data.title || "Untitled Course",
            category: data.category || "",
            duration: data.duration || "Self-Paced",
            description: data.description || "",
            image: data.image || "",
            level: data.level || "",
          });
        } else {
          // Fall back: scan all courses (handles cases where doc ID ≠ firestoreCourseId)
          const allCourses = await getCourses();
          const match = allCourses.find(
            (c: any) => String(c.id) === String(firestoreCourseId)
          );

          if (!match) {
            console.warn("Course not found for id:", firestoreCourseId);
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
        }

        // --- Load courseDetails sub-document ---
        const detailRef = doc(db, "courseDetails", firestoreCourseId);
        const detailSnap = await getDoc(detailRef);

        if (detailSnap.exists()) {
          setCourseDetail(detailSnap.data() as CourseDetail);
        } else {
          setCourseDetail(null);
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setNotFound(true);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchCourse();
  }, [id, courseIdParam]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!formData.whatsapp.trim()) {
      errors.whatsapp = "WhatsApp number is required";
    } else if (!validatePhone(formData.whatsapp)) {
      errors.whatsapp = "WhatsApp number must be 10 digits";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.collegeName.trim()) {
      errors.collegeName = "College name is required";
    }

    if (!formData.yearOfPassing.trim()) {
      errors.yearOfPassing = "Year of passing is required";
    } else if (!/^\d{4}$/.test(formData.yearOfPassing)) {
      errors.yearOfPassing = "Please enter a valid year (e.g., 2024)";
    }

    if (!formData.highestEducation) {
      errors.highestEducation = "Please select your education qualification";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEnrollClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!dynamicCourse || !currentUser) return;

    setEnrolling(true);
    try {
      // Convert camelCase to snake_case for backend
      const enrollmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        address: formData.address,
        college_name: formData.collegeName,
        year_of_passing: formData.yearOfPassing,
        highest_education: formData.highestEducation,
      };

      await enrollInCourse(currentUser.uid, dynamicCourse.id, enrollmentData);
      setEnrolled(true);
      setIsFormOpen(false);
      alert(
        `🎉 Congratulations! You have successfully enrolled in ${dynamicCourse.title}. Your details have been saved and the admin has been notified.`
      );
    } catch (error: any) {
      console.error("Enrollment failed:", error);
      alert("❌ Enrollment failed: " + (error.message || "Please try again"));
    } finally {
      setEnrolling(false);
    }
  };

  // --- Loading state ---
  if (loadingDetail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans gap-4">
        <Loader2 className="w-12 h-12 text-[#1B2B48] animate-spin" />
        <p className="text-[#1B2B48] font-semibold text-lg">Loading program details…</p>
      </div>
    );
  }

  // --- Not found state ---
  if (notFound || !dynamicCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <h2 className="text-3xl font-bold text-[#1B2B48] mb-4">Program Not Found</h2>
        <p className="text-slate-600 mb-8">
          The program you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/programs")}
          className="bg-[#1B2B48] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#10192A] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Merge: courseDetail (Firestore) takes priority over base course fields
  const displayLearning = courseDetail?.learning || [];
  const displayModules = courseDetail?.modules || [];
  const displayDuration = courseDetail?.duration || dynamicCourse.duration;
  const displayLevel = courseDetail?.level || dynamicCourse.level || "All Levels";

  return (
    <div className="min-h-screen relative flex items-start justify-center py-12 sm:py-20 px-4 sm:px-6 font-sans">
      {/* Background */}
      <img
        src={programsHeroImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-100/90 backdrop-blur-sm"></div>

      {/* Card Wrapper */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col mt-6">

        {/* Back Button */}
        <button
          onClick={() => navigate("/programs")}
          className="absolute -top-10 left-0 z-20 flex items-center gap-2 text-[#1B2B48] hover:text-[#D4AF37] transition-colors font-bold text-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Programs
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full">

          {/* Header */}
          <div className="bg-[#1B2B48] text-white p-8 sm:p-12 lg:p-14">
            {dynamicCourse.category && (
              <div className="inline-block bg-white/10 text-white/90 px-3 py-1.5 rounded-lg text-sm font-semibold mb-6 border border-white/5">
                {dynamicCourse.category}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              {dynamicCourse.title}
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-3xl leading-relaxed">
              {dynamicCourse.description}
            </p>
          </div>

          {/* Body */}
          <div className="bg-[#f8f9fa] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Left Column */}
            <div className="flex-1">

              {/* What You Will Learn */}
              {displayLearning.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2B48] mb-8">
                    What You Will Learn
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                    {displayLearning.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-[#1B2B48] shrink-0">
                          <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <span className="font-semibold text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Program Modules */}
              {displayModules.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2B48] mb-8">
                    Program Modules
                  </h2>
                  <div className="space-y-5">
                    {displayModules.map((mod, i) => (
                      <div
                        key={i}
                        className="bg-white border border-[#1B2B48] rounded-xl p-6 shadow-sm"
                      >
                        <h3 className="font-bold text-[#1B2B48] text-lg mb-2">
                          Module {i + 1}:{" "}
                          {typeof mod === "string" ? mod : mod.name}
                        </h3>
                        {typeof mod !== "string" && mod.description && (
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {mod.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state when no details exist yet */}
              {displayLearning.length === 0 && displayModules.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-lg font-medium">
                    Detailed curriculum coming soon.
                  </p>
                  <p className="text-sm mt-2">
                    Enroll now to be notified when content is available.
                  </p>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-[#f0f5fa] border border-blue-100 rounded-2xl p-8 shadow-sm sticky top-28">
                <h3 className="text-[#1B2B48] font-bold text-xl mb-6">
                  Program Details
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-blue-200/60">
                    <span className="text-slate-600 text-sm">Duration</span>
                    <span className="font-bold text-[#1B2B48] text-sm">
                      {displayDuration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-blue-200/60">
                    <span className="text-slate-600 text-sm">Level</span>
                    <span className="font-bold text-[#1B2B48] text-sm">
                      {displayLevel}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleEnrollClick}
                  disabled={enrolling || enrolled}
                  className="w-full bg-[#1B2B48] text-white font-bold py-4 rounded-xl text-base hover:bg-[#10192A] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {enrolling && <Loader2 className="animate-spin" size={20} />}
                  {enrolled
                    ? "Enrolled Successfully"
                    : enrolling
                    ? "Processing..."
                    : "Enroll Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X size={18} />
            </button>

            <div className="p-8 sm:p-10 overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1B2B48] mb-2">
                  Student Enrollment Form
                </h2>
                <p className="text-slate-500 text-sm">
                  Please provide your details to complete the enrollment for{" "}
                  <span className="font-bold text-[#1B2B48]">
                    {dynamicCourse.title}
                  </span>
                  .
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                        formErrors.name ? "border-red-500 bg-red-50" : "border-slate-200"
                      }`}
                      placeholder="John Doe"
                    />
                    {formErrors.name && (
                      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                        <AlertCircle size={14} />
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                        formErrors.email ? "border-red-500 bg-red-50" : "border-slate-200"
                      }`}
                      placeholder="you@example.com"
                    />
                    {formErrors.email && (
                      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                        <AlertCircle size={14} />
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number (10 digits) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                        formErrors.phone ? "border-red-500 bg-red-50" : "border-slate-200"
                      }`}
                      placeholder="9108032103"
                    />
                    {formErrors.phone && (
                      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                        <AlertCircle size={14} />
                        {formErrors.phone}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      WhatsApp Number (10 digits) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                        formErrors.whatsapp ? "border-red-500 bg-red-50" : "border-slate-200"
                      }`}
                      placeholder="9108032103"
                    />
                    {formErrors.whatsapp && (
                      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                        <AlertCircle size={14} />
                        {formErrors.whatsapp}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Permanent Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all resize-none ${
                      formErrors.address ? "border-red-500 bg-red-50" : "border-slate-200"
                    }`}
                    placeholder="Enter your complete address"
                  ></textarea>
                  {formErrors.address && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={14} />
                      {formErrors.address}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* College Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      College Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="collegeName"
                      required
                      value={formData.collegeName}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                        formErrors.collegeName ? "border-red-500 bg-red-50" : "border-slate-200"
                      }`}
                      placeholder="e.g., VTU"
                    />
                    {formErrors.collegeName && (
                      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                        <AlertCircle size={14} />
                        {formErrors.collegeName}
                      </div>
                    )}
                  </div>

                  {/* Year of Passing */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Year of Passing (YYYY) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="yearOfPassing"
                      required
                      value={formData.yearOfPassing}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                        formErrors.yearOfPassing ? "border-red-500 bg-red-50" : "border-slate-200"
                      }`}
                      placeholder="2024"
                      maxLength={4}
                    />
                    {formErrors.yearOfPassing && (
                      <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                        <AlertCircle size={14} />
                        {formErrors.yearOfPassing}
                      </div>
                    )}
                  </div>
                </div>

                {/* Education Qualification */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Highest Education Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="highestEducation"
                    required
                    value={formData.highestEducation}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1B2B48] outline-none transition-all ${
                      formErrors.highestEducation ? "border-red-500 bg-red-50" : "border-slate-200"
                    }`}
                  >
                    <option value="">-- Select Qualification --</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Com">B.Com</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="BA">BA</option>
                    <option value="BCA">BCA</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.highestEducation && (
                    <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle size={14} />
                      {formErrors.highestEducation}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      setFormErrors({});
                    }}
                    className="flex-1 py-4 bg-slate-100 text-[#1B2B48] font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={enrolling}
                    className="flex-1 py-4 bg-[#D4AF37] text-[#1B2B48] font-bold rounded-xl hover:bg-[#c9a430] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {enrolling ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : null}
                    {enrolling ? "Processing..." : "Confirm Enrollment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}