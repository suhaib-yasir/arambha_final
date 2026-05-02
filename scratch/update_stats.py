import firebase_admin
from firebase_admin import credentials, firestore
import os

# Path to credentials
cred_path = r"c:\Users\madhu\Desktop\internship\arambha_final-main\arambha_final-main\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json"

if os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    # Recalculate stats based on actual collection sizes
    applicants_count = len(list(db.collection('applicants').stream()))
    enrollments_count = len(list(db.collection('enrollments').stream()))
    inquiries_count = len(list(db.collection('inquiries').stream()))
    
    # Update global stats
    stats_ref = db.collection('stats').document('global')
    stats_ref.set({
        'total_enrollments': enrollments_count,
        'total_applications': applicants_count,
        'total_contacts': inquiries_count
    })
    
    print(f"Stats updated: Enrollments={enrollments_count}, Applications={applicants_count}, Inquiries={inquiries_count}")
else:
    print("Credentials file not found.")
