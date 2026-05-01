import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Check if admin exists in admins collection, create if missing
 */
export const seedAdminIfMissing = async (user) => {
  try {
    if (!user) {
      console.warn('No user provided to seedAdminIfMissing');
      return null;
    }

    const adminRef = doc(db, 'admins', user.uid);
    const adminDoc = await getDoc(adminRef);

    // If admin document already exists, return it
    if (adminDoc.exists()) {
      console.log('Admin already exists');
      return adminDoc.data();
    }

    // Create admin document if it doesn't exist
    const adminData = {
      name: user.displayName || 'Admin User',
      email: user.email,
      role: 'admin',
      createdAt: serverTimestamp(),
      uid: user.uid,
    };

    await setDoc(adminRef, adminData);
    console.log('Admin document created in admins collection');
    return adminData;
  } catch (error) {
    console.error('Error in seedAdminIfMissing:', error);
    throw error;
  }
};

/**
 * Check if user is an admin by looking up admins collection
 */
export const isUserAdmin = async (uid) => {
  try {
    const adminRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminRef);
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Create course with auto-generated videos subcollection
 * Automatically creates courses collection and videos subcollection through code
 */
export const createCourse = async (courseName, files, adminUid) => {
  try {
    if (!courseName || !files || files.length === 0 || !adminUid) {
      throw new Error('Missing required fields: courseName, files, or adminUid');
    }

    // Create course document in courses collection
    const courseRef = await addDoc(collection(db, 'courses'), {
      title: courseName,
      credits: 1,
      totalVideos: files.length,
      createdBy: adminUid,
      uploadStatus: 'pending_drive_upload',
      createdAt: serverTimestamp(),
    });

    const courseId = courseRef.id;
    console.log('Course created with ID:', courseId);

    // Create batch to add all videos at once
    const batch = writeBatch(db);

    // Add each file as a video in the videos subcollection
    files.forEach((file, index) => {
      const videoRef = doc(
        db,
        'courses',
        courseId,
        'videos',
        `video_${index + 1}`
      );

      const videoData = {
        title: `Video ${index + 1}`,
        order: index + 1,
        originalFileName: file.name,
        driveFileId: null,
        uploadStatus: 'pending',
        createdAt: serverTimestamp(),
      };

      batch.set(videoRef, videoData);
    });

    // Commit batch - creates videos subcollection automatically
    await batch.commit();
    console.log(`${files.length} videos created for course ${courseId}`);

    return {
      courseId,
      courseName,
      totalVideos: files.length,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};
