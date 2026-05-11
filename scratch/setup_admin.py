import firebase_admin
from firebase_admin import credentials, auth, firestore
import os

def setup_admin():
    """
    Set up admin1@gmail.com as an admin user in Firestore.
    This script adds the user to the 'admins' collection which is required
    for the admin portal to display after login.
    """
    # Update this path to your credentials.json location
    cred_path = r'c:\Users\amaan\Desktop\bbc\arambha_final\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json'
    
    try:
        # Check if Firebase app is already initialized
        try:
            firebase_admin.get_app()
        except ValueError:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        
        db = firestore.client()
        
        admin_email = "admin1@gmail.com"
        
        try:
            # Get user by email from Firebase Auth
            user = auth.get_user_by_email(admin_email)
            user_uid = user.uid
            print(f"Found user {admin_email} with UID: {user_uid}")
            
            # Add user to admins collection
            admin_ref = db.collection('admins').document(user_uid)
            admin_ref.set({
                'uid': user_uid,
                'email': admin_email,
                'role': 'admin',
                'createdAt': firestore.SERVER_TIMESTAMP
            }, merge=True)
            
            print(f"✅ Successfully added {admin_email} as an admin!")
            print(f"Admin UID: {user_uid}")
            print("\nYou can now:")
            print(f"1. Log in with email: {admin_email}")
            print(f"2. Password: admin1")
            print(f"3. You will be automatically redirected to the Admin Portal")
            
        except auth.UserNotFoundError:
            print(f"❌ User {admin_email} not found in Firebase Auth!")
            print("Please create this user first in Firebase Console or through the signup page.")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Make sure the credentials.json path is correct.")

if __name__ == "__main__":
    setup_admin()
