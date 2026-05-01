import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Fetch student profile data
 */
export const getStudentProfile = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('User document not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
};

/**
 * Fetch course progress for a student
 */
export const getStudentCourses = async (uid) => {
  try {
    const courseProgressRef = collection(
      db,
      'users',
      uid,
      'course_progress'
    );
    const courseProgressDocs = await getDocs(courseProgressRef);

    const courses = [];
    courseProgressDocs.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return courses;
  } catch (error) {
    console.error('Error fetching student courses:', error);
    throw error;
  }
};

/**
 * Fetch certificates for a student
 */
export const getStudentCertificates = async (uid) => {
  try {
    const certificatesRef = collection(db, 'certificates');
    const q = query(certificatesRef, where('userId', '==', uid));
    const certificateDocs = await getDocs(q);

    const certificates = [];
    certificateDocs.forEach((doc) => {
      certificates.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return certificates;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
};
