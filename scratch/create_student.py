import firebase_admin
from firebase_admin import credentials, auth, firestore
import os

def create_test_student():
    cred_path = r'c:\Users\madhu\Desktop\internship\arambha_final-main\arambha_final-main\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json'
    
    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        
        email = "student_test@gmail.com"
        password = "password123"
        name = "Test Student"
        
        try:
            # Check if user exists in Auth
            user = auth.get_user_by_email(email)
            print(f"User {email} already exists in Auth. Updating password...")
            auth.update_user(user.uid, password=password)
        except auth.UserNotFoundError:
            # Create user in Auth
            user = auth.create_user(
                email=email,
                password=password,
                display_name=name
            )
            print(f"Created new user {email} in Auth.")
            
        # Ensure user document exists in Firestore
        user_ref = db.collection('users').document(user.uid)
        user_ref.set({
            'uid': user.uid,
            'name': name,
            'email': email,
            'role': 'student',
            'createdAt': firestore.SERVER_TIMESTAMP,
            'credits': 100,
            'coursesEnrolled': 0,
            'coursesCompleted': 0
        }, merge=True)
        
        print(f"Successfully set up student login:")
        print(f"Email: {email}")
        print(f"Password: {password}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_test_student()
