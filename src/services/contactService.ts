import { addDoc, collection, getDocs, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendContactMessage = async (messageData: ContactMessage) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...messageData,
      createdAt: serverTimestamp(),
      status: 'new'
    });
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error('Failed to send contact message to Firestore:', error);
    throw new Error('Failed to send message');
  }
};

export const getContacts = async () => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Failed to fetch contacts from Firestore:', error);
    throw new Error('Failed to fetch contact messages');
  }
};
