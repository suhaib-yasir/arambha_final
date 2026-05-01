# Arambha LMS - Professional Video Pipeline

This project is a Learning Management System (LMS) equipped with a robust, automated video upload pipeline using **Google Drive** for storage and **Firebase Firestore** for metadata management.

## 🚀 Key Features
- **Resumable Chunked Upload:** Supports large video files by uploading them in 5MB chunks.
- **Google Drive Integration:** Automatically organizes videos into a Shared Drive.
- **Firebase Sync:** Real-time course and video metadata synchronization.
- **Admin Dashboard:** Premium dark-themed UI with real-time upload progress tracking.

## 🛠 Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend/` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Place your Firebase Service Account JSON file in the `backend/` folder and name it `credentials.json`.
4. Update the root `.env` file (in `arambha_backend/`) with your Google Drive ID:
   ```env
   GOOGLE_DRIVE_FOLDER_ID=your_shared_drive_id
   ```
5. Run the server:
   ```bash
   uvicorn app:app --reload
   ```

### 2. Frontend Setup
1. Navigate to the `arambha-lms/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your `.env` file contains the correct Firebase and Drive config:
   ```env
   VITE_FIREBASE_PROJECT_ID=...
   VITE_GOOGLE_DRIVE_FOLDER_ID=...
   VITE_GOOGLE_DRIVE_FOLDER_URL=...
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🎥 Using the Pipeline
1. Log in as an administrator.
2. Navigate to `/admin/chunked`.
3. Enter a Course Title and select a video file.
4. Watch the progress bar as the file is chunked and uploaded directly to your Shared Drive.

## 📂 Project Structure
- `backend/`: FastAPI server and Google Drive service logic.
- `src/pages/admin/ChunkedUpload.jsx`: The core resumable upload frontend logic.
- `src/firebase/`: Firebase configuration and initialization.
