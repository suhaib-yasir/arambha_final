import firebase_admin
from firebase_admin import credentials, firestore
import os

# Path to credentials
cred_path = r"c:\Users\madhu\Desktop\internship\arambha_final-main\arambha_final-main\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json"

if os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    stats_ref = db.collection('stats').document('global').get()
    if stats_ref.exists:
        print(f"Stats found: {stats_ref.to_dict()}")
    else:
        print("Stats document 'stats/global' NOT FOUND.")
        
    enrollments_count = len(list(db.collection('enrollments').stream()))
    print(f"Enrollments count in collection: {enrollments_count}")
else:
    print("Credentials file not found.")
