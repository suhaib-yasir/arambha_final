import firebase_admin
from firebase_admin import credentials, firestore
import os
from datetime import datetime

# Path to credentials
cred_path = r"c:\Users\madhu\Desktop\internship\arambha_final-main\arambha_final-main\arambha_backend\arambha_backend\arambha-lms\backend\credentials.json"

if os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    # 1. Clean up misspelled collections
    misspelled = ['applicatent', 'enrolled', 'inquires']
    for coll_name in misspelled:
        docs = db.collection(coll_name).stream()
        for doc in docs:
            doc.reference.delete()
        print(f"Cleaned up '{coll_name}'")
        
    # 2. Initialize correct collections with dummy entries
    db.collection('applicants').document('dummy_entry').set({
        'name': 'System Check',
        'roleApplied': 'Ready for Applicants',
        'appliedAt': datetime.utcnow()
    })
    
    db.collection('enrollments').document('dummy_entry').set({
        'name': 'System Check',
        'course_title': 'Ready for Enrollments',
        'enrolled_at': firestore.SERVER_TIMESTAMP
    })
    
    db.collection('inquiries').document('dummy_entry').set({
        'name': 'System Check',
        'subject': 'Ready for Inquiries',
        'message': 'This is a system initialization entry.',
        'created_at': firestore.SERVER_TIMESTAMP
    })
    
    # Reset stats
    stats_ref = db.collection('stats').document('global')
    stats_ref.set({
        'total_enrollments': 0,
        'total_applications': 0,
        'total_contacts': 0
    })
    
    print("Correctly spelled collections 'applicants', 'enrollments', and 'inquiries' are ready.")
else:
    print("Credentials file not found.")
