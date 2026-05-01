import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Check if user is an admin by looking up admins collection
 */
export const isUserAdmin = async (uid: string) => {
  try {
    const adminRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminRef);
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
