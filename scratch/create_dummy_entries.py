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
    
    # Create dummy entries so collections appear in UI
    db.collection('applicatent').document('dummy_entry').set({
        'name': 'System Check',
        'roleApplied': 'Ready for Applicants',
        'appliedAt': datetime.utcnow()
    })
    
    db.collection('enrolled').document('dummy_entry').set({
        'name': 'System Check',
        'course_title': 'Ready for Enrollments',
        'enrolled_at': firestore.SERVER_TIMESTAMP
    })
    
    db.collection('inquires').document('dummy_entry').set({
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
    
    print("Dummy entries created for 'applicatent', 'enrolled', and 'inquires'.")
else:
    print("Credentials file not found.")
