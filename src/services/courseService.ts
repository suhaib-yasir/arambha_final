import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
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
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

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
    const response = await fetch(`${BACKEND_URL}/api/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: userId, 
        course_id: courseId,
        ...details 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to enroll in course');
    }

    return await response.json();
  } catch (error) {
    console.error('Enrollment error:', error);
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

