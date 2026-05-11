import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, PlusCircle, Settings, ShieldCheck, ChevronRight, Briefcase, Users, FileText, MessageSquare, BookOpen, Video } from "lucide-react";
import { getStats } from "../../services/careerService";
import ManageCourses from "./ManageCourses";
import ManageCareers from "./ManageCareers";
import ManageEnrollments from "./ManageEnrollments";
import ManageContacts from "./ManageContacts";
import ManageApplications from "./ManageApplications";
import AddCourseInfo from "./AddCourseInfo";
import AddWebinars from "./AddWebinars";
import { useLocation, useNavigate } from "react-router-dom";

type TabType = "manage" | "manage-careers" | "course-info" | "enrollments" | "inquiries" | "applications" | "webinar";

export default function AdminPortal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("manage");

  const [stats, setStats] = useState({ total_enrollments: 0, total_applications: 0, total_contacts: 0 });

  // Handle URL params if coming from a "Re-upload" link
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["manage", "manage-careers", "course-info", "enrollments", "inquiries", "applications", "webinar"].includes(tab)) {
      setActiveTab(tab as TabType);
    } else if (params.get("courseId")) {
      setActiveTab("manage"); // Or handle opening the create form inside ManageCourses
    }
  }, [location]);

  // Real-time stats listener
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "stats", "global"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Real-time Stats Update:", data);
        setStats({
          total_enrollments: data.total_enrollments || 0,
          total_applications: data.total_applications || 0,
          total_contacts: data.total_contacts || 0
        });
      }
    }, (err) => {
      console.error("Stats listener error:", err);
    });

    return () => unsubscribe();
  }, []);

  const tabs = [
    { id: "manage", label: "Manage Courses", icon: LayoutDashboard },
    { id: "course-info", label: "Add Course Info", icon: BookOpen },
    { id: "manage-careers", label: "Manage Jobs", icon: Briefcase },
    { id: "webinar", label: "Manage Webinars", icon: Video },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "enrollments", label: "Enrollments", icon: Users },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Portal Header */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-gold/10 rounded-2xl flex items-center justify-center text-accent-gold shadow-sm border border-accent-gold/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-extrabold text-primary">Admin Control Center</h1>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  Arambha LMS <ChevronRight size={14} /> 
                  {activeTab === "manage" && "Course Management"}
                  {activeTab === "course-info" && "Add Course Information"}
                  {activeTab === "manage-careers" && "Talent Management"}
                  {activeTab === "webinar" && "Webinar Management"}
                  {activeTab === "applications" && "Applications"}
                  {activeTab === "enrollments" && "Enrollments"}
                  {activeTab === "inquiries" && "Inquiries"}
                </p>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Enrollments</p>
                <h4 className="text-xl font-bold text-primary">{stats.total_enrollments}</h4>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Career Applications</p>
                <h4 className="text-xl font-bold text-primary">{stats.total_applications}</h4>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Website Inquiries</p>
                <h4 className="text-xl font-bold text-primary">{stats.total_contacts}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "manage" && <ManageCourses />}
            {activeTab === "course-info" && <AddCourseInfo />}
            {activeTab === "manage-careers" && <ManageCareers />}
            {activeTab === "webinar" && <AddWebinars />}
            {activeTab === "enrollments" && <ManageEnrollments />}
            {activeTab === "inquiries" && <ManageContacts />}
            {activeTab === "applications" && <ManageApplications />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quick Settings Footer (Optional Polish) */}
      <div className="fixed bottom-8 right-8">
        <button className="w-12 h-12 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
