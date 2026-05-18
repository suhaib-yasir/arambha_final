import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc, addDoc, serverTimestamp, increment, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface Course {
  id: string;
  title: string;
  category?: string;
  description?: string;
  image?: string;
  createdAt: any;
  uploadStatus: string;
  videoId?: string;
  videoTitle?: string;
  duration?: string;
}

export const getCourses = async (): Promise<Course[]> => {
  try {
    const coursesRef = collection(db, 'courses');
    const q = query(coursesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const courses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];

    if (courses.length > 0) return courses;
    
    // Fallback to local data if Firestore is empty
    return getLocalCourses();
  } catch (error) {
    console.warn('Error fetching courses from Firebase, falling back to local data:', error);
    return getLocalCourses();
  }
};

const getLocalCourses = (): Course[] => [
  {
    id: 'spoken-english',
    title: 'Spoken English Mastery',
    category: 'Spoken English',
    description: 'A structured Spoken English program designed to build fluency, confidence, pronunciation, and real-world communication skills.',
    duration: '2 Months',
    createdAt: new Date(),
    uploadStatus: 'completed'
  },
  {
    id: 'fullstack-java',
    title: 'Full Stack Java Developer',
    category: 'BTech',
    description: 'Master Java, Spring Boot, React, and MySQL to become a complete Full Stack Developer.',
    duration: '6 Months',
    createdAt: new Date(),
    uploadStatus: 'completed',
    videoId: '1l3Ppsow04PZnHzryBzbUobGAaeag4P47', // Dummy Drive ID
    videoTitle: 'Full Stack Java - Course Overview'
  },
  {
    id: 'campus-corporate',
    title: 'Campus to Corporate Program',
    category: 'Job Ready',
    description: 'Intensive preparation program with mock interviews, resume building, and aptitude training for smooth career transitions.',
    duration: '1 Month',
    createdAt: new Date(),
    uploadStatus: 'completed'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Expert',
    category: 'Graduate',
    description: 'Master modern digital marketing strategies including SEO, SEM, and Social Media.',
    duration: '3 Months',
    createdAt: new Date(),
    uploadStatus: 'completed'
  },
  {
    id: 'data-science',
    title: 'Data Science & AI',
    category: 'Job Ready',
    description: 'Learn Python, Machine Learning, and Data Analysis from scratch.',
    duration: '6 Months',
    createdAt: new Date(),
    uploadStatus: 'completed'
  }
];

export const deleteCourse = async (courseId: string) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

export const updateCourse = async (courseId: string, data: Partial<Course>) => {
  try {
    await updateDoc(doc(db, 'courses', courseId), data as any);
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const enrollInCourse = async (userId: string, courseId: string, details: any = {}) => {
  try {
    const payload = {
      user_id: userId,
      course_id: courseId,
      name: details.name || details.course_title,
      email: details.email,
      phone: details.phone,
      whatsapp: details.whatsapp,
      address: details.address,
      college_name: details.collegeName,
      year_of_passing: details.yearOfPassing,
      highest_education: details.highestEducation
    };

    const response = await fetch(`${BACKEND_URL}/api/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Backend enrollment failed');
    }

    const data = await response.json();
    
    // Create an enrollment object to return to the frontend for local state
    const enrollmentData = {
      id: data.id || 'new_enrollment',
      user_id: userId,
      course_id: courseId,
      course_title: details.course_title || 'Unknown Course',
      enrolled_at: new Date().toISOString(),
      status: 'paid',
      ...details
    };

    return enrollmentData;

  } catch (error: any) {
    console.error('Enrollment error details:', {
      message: error.message,
      url: `${BACKEND_URL}/api/enroll`,
      error
    });
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to enrollment server. Please ensure the backend is running.');
    }
    throw error;
  }
};

export const getEnrollments = async () => {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const q = query(enrollmentsRef, orderBy('enrolled_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
};

