import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

/**
 * Sign up a new user with email and password
 * Creates both auth user and Firestore document
 */
export const signupUser = async (email, password, name) => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update auth user profile with name
    await updateProfile(user, {
      displayName: name,
    });

    // Create Firestore document in users collection
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
export const loginUser = async (email, password) => {
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
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
