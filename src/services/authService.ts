import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

/**
 * Sign up a new user with email and password
 */
export const signupUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      role: 'student',
      joinedAt: serverTimestamp(),
      totalCredits: 0,
      enrolledCoursesCount: 0,
      completedCoursesCount: 0,
      certificatesEarned: 0,
    });

    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Login with Google
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user document exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create user document for new Google users
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || 'Google User',
        email: user.email,
        role: 'student',
        joinedAt: serverTimestamp(),
        totalCredits: 0,
        enrolledCoursesCount: 0,
        completedCoursesCount: 0,
        certificatesEarned: 0,
      });
    }

    return user;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};
