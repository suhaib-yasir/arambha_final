import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface Webinar {
  id?: string;
  title: string;
  description: string;
  link: string;
  type: 'zoom' | 'gmeet'; // Zoom or Google Meet
  startTime: any; // Firestore Timestamp
  endTime: any; // Firestore Timestamp
  courseId?: string;
  createdAt?: any;
  createdBy?: string;
}

/**
 * Add a new webinar
 */
export const addWebinar = async (webinar: Webinar): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'webinars'), {
      ...webinar,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding webinar:', error);
    throw error;
  }
};

/**
 * Get all upcoming webinars (ordered by start time)
 */
export const getUpcomingWebinars = async (): Promise<Webinar[]> => {
  try {
    const q = query(collection(db, 'webinars'), orderBy('startTime', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Webinar[];
  } catch (error) {
    console.error('Error fetching webinars:', error);
    throw error;
  }
};

/**
 * Get active webinars (currently happening)
 */
export const getActiveWebinars = async (): Promise<Webinar[]> => {
  try {
    const allWebinars = await getUpcomingWebinars();
    const now = new Date();
    
    return allWebinars.filter(webinar => {
      const startTime = webinar.startTime?.toDate?.() || new Date(webinar.startTime);
      const endTime = webinar.endTime?.toDate?.() || new Date(webinar.endTime);
      return now >= startTime && now <= endTime;
    });
  } catch (error) {
    console.error('Error fetching active webinars:', error);
    throw error;
  }
};

/**
 * Delete a webinar
 */
export const deleteWebinar = async (webinarId: string) => {
  try {
    await deleteDoc(doc(db, 'webinars', webinarId));
  } catch (error) {
    console.error('Error deleting webinar:', error);
    throw error;
  }
};

/**
 * Update a webinar
 */
export const updateWebinar = async (webinarId: string, data: Partial<Webinar>) => {
  try {
    await updateDoc(doc(db, 'webinars', webinarId), data);
  } catch (error) {
    console.error('Error updating webinar:', error);
    throw error;
  }
};
