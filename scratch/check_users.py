import firebase_admin
from firebase_admin import credentials, firestore
import os

def get_users():
    # Absolute path to credentials
    cred_path = r'c:\Users\madhu\Desktop\internship\arambha_final-main\arambha_final-main\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json'
    
    if not os.path.exists(cred_path):
        print(f"Credentials not found at {cred_path}")
        return

    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        
        users_ref = db.collection('users')
        docs = users_ref.stream()
        
        print("Users found in Firestore:")
        found = False
        for doc in docs:
            found = True
            data = doc.to_dict()
            print(f"Email: {data.get('email')}, Role: {data.get('role')}")
        
        if not found:
            print("No users found in collection 'users'.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_users()
