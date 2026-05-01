import firebase_admin
from firebase_admin import credentials, firestore
import os

# Path to credentials
cred_path = r"c:\Users\madhu\Desktop\internship\arambha_final-main\arambha_final-main\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json"

if os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    collections_to_clear = ['applicants', 'applications', 'enrollments', 'inquiries', 'contacts']
    
    for coll_name in collections_to_clear:
        docs = db.collection(coll_name).stream()
        count = 0
        for doc in docs:
            doc.reference.delete()
            count += 1
        print(f"Cleared {count} documents from '{coll_name}'")
        
    # Reset stats
    stats_ref = db.collection('stats').document('global')
    stats_ref.set({
        'total_enrollments': 0,
        'total_applications': 0,
        'total_contacts': 0
    })
    print("Reset global stats to 0")
else:
    print("Credentials file not found.")
