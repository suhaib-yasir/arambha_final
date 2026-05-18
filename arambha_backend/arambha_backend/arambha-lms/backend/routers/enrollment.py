from fastapi import APIRouter, HTTPException
from models.schemas import EnrollRequest
from services.firebase_service import get_db
from services.notification_service import send_enrollment_email
from datetime import datetime
from firebase_admin import firestore

router = APIRouter(prefix="/api")

@router.post("/enroll")
async def enroll_course(req: EnrollRequest):
    db = get_db()
    
    if db is None:
        # If database is unavailable, we still try to send the email notification
        send_enrollment_email(
            student_name=req.name or "Test Student (DB Unavailable)",
            student_email=req.email or "unknown@test.com",
            program_name=f"Course ID: {req.course_id}",
            program_type="Course Enrollment",
            other_details=f"User ID: {req.user_id}\nPhone: {req.phone}\nAddress: {req.address}\nNote: Database was unavailable."
        )
        return {"success": True, "message": "Enrolled (Notification sent, but DB unavailable)", "is_new": True}

    # 1. Update user's personal enrollment subcollection
    enrollment_ref = db.collection('users').document(req.user_id).collection('enrollments').document(req.course_id)
    doc_snap = enrollment_ref.get()
    
    if not doc_snap.exists:
        try:
            # Get course info for title
            course_snap = db.collection('courses').document(req.course_id).get()
            course_data = course_snap.to_dict() if course_snap.exists else {"title": "Unknown Course"}
            
            # Save to user's collection
            enrollment_ref.set({
                'course_id': req.course_id,
                'course_title': course_data.get('title'),
                'enrolled_at': datetime.utcnow(),
                'is_course_completed': False,
                'certificate_url': None
            })
            
            # 2. Save to top-level enrollments collection for Admin visibility
            admin_enrollment_ref = db.collection('enrollments').document()
            enroll_data = {
                'user_id': req.user_id,
                'course_id': req.course_id,
                'course_title': course_data.get('title'),
                'name': req.name,
                'email': req.email,
                'phone': req.phone,
                'whatsapp': req.whatsapp,
                'address': req.address,
                'college_name': req.college_name,
                'year_of_passing': req.year_of_passing,
                'highest_education': req.highest_education,
                'enrolled_at': firestore.SERVER_TIMESTAMP
            }
            admin_enrollment_ref.set(enroll_data)
            
            # 3. Update global stats
            stats_ref = db.collection('stats').document('global')
            stats_ref.set({
                'total_enrollments': firestore.Increment(1)
            }, merge=True)
            
            # 4. Send notification email
            details = f"Phone: {req.phone}\nWhatsApp: {req.whatsapp}\nAddress: {req.address}\nCollege: {req.college_name}\nEducation: {req.highest_education}"
            send_enrollment_email(
                student_name=req.name or "Unknown Student",
                student_email=req.email or "Unknown Email",
                program_name=course_data.get('title'),
                program_type="Course Enrollment",
                other_details=details
            )
            
            return {"success": True, "message": "Successfully enrolled", "is_new": True}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    # Even if already enrolled, we trigger the email for testing/confirmation if requested
    course_snap = db.collection('courses').document(req.course_id).get()
    course_data = course_snap.to_dict() if course_snap.exists else {"title": "Unknown Course"}
    
    details = f"Phone: {req.phone}\nWhatsApp: {req.whatsapp}\nAddress: {req.address}\nCollege: {req.college_name}\nEducation: {req.highest_education}"
    send_enrollment_email(
        student_name=req.name or "Unknown Student",
        student_email=req.email or "Unknown Email",
        program_name=course_data.get('title'),
        program_type="Course Enrollment",
        other_details=details
    )
    
    return {"success": True, "message": "Already enrolled (Confirmation email re-sent)", "is_new": False}
