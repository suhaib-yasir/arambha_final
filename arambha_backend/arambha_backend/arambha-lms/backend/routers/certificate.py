from fastapi import APIRouter, HTTPException
from models.schemas import CertificateRequest
from services.firebase_service import get_db
from fpdf import FPDF
import tempfile
import os
import uuid

# Assume drive_service is available in the root level of backend
from drive_service import create_folder, upload_video

router = APIRouter(prefix="/api/certificate")

@router.post("/generate")
async def generate_certificate(req: CertificateRequest):
    db = get_db()
    
    # 1. The Grandfather Clause: check if already completed
    # Path: users/{user_id}/enrollments/{course_id}
    enrollment_ref = db.collection('users').document(req.user_id).collection('enrollments').document(req.course_id)
    enrollment_doc = enrollment_ref.get()
    
    if enrollment_doc.exists:
        data = enrollment_doc.to_dict()
        if data.get('is_course_completed') is True and data.get('certificate_url'):
            return {
                "success": True, 
                "message": "Certificate already generated",
                "certificate_url": data.get('certificate_url')
            }
            
    # 2. Dynamic Validation
    course_ref = db.collection('courses').document(req.course_id)
    course_doc = course_ref.get()
    if not course_doc.exists:
        raise HTTPException(status_code=404, detail="Course not found")
        
    course_data = course_doc.to_dict()
    total_videos = course_data.get('total_videos', course_data.get('totalVideos', 0)) # handle casing
    
    if total_videos == 0:
        raise HTTPException(status_code=400, detail="Course has no videos initialized")

    progress_ref_collection = enrollment_ref.collection('progress')
    progress_docs = progress_ref_collection.where('is_completed', '==', True).stream()
    
    completed_count = sum(1 for _ in progress_docs)
    
    if completed_count < total_videos:
        raise HTTPException(
            status_code=400, 
            detail=f"Course not completed. {completed_count}/{total_videos} videos completed."
        )
        
    # 3. PDF Generation
    pdf = FPDF()
    pdf.add_page()
    
    # Add simple styling
    pdf.set_font("helvetica", "B", 24)
    pdf.cell(0, 50, "Certificate of Completion", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 16)
    pdf.cell(0, 20, "This certifies that", align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "B", 32)
    pdf.set_text_color(0, 102, 204)
    pdf.cell(0, 30, req.user_name, align="C", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_text_color(0, 0, 0)
    pdf.set_font("helvetica", "", 16)
    pdf.cell(0, 20, "has successfully completed the course", align="C", new_x="LMARGIN", new_y="NEXT")
    
    
    pdf.set_font("helvetica", "I", 20)
    course_title = course_data.get('title', req.course_id)
    pdf.cell(0, 20, course_title, align="C", new_x="LMARGIN", new_y="NEXT")
    
    # Save to temp
    filename = f"certificate_{uuid.uuid4().hex[:8]}.pdf"
    temp_dir = tempfile.gettempdir()
    filepath = os.path.join(temp_dir, filename)
    
    pdf.output(filepath)
    
    # 4. Storage to Drive
    try:
        # Get or create Certificates folder
        folder_id = create_folder("LMS Certificates")
        
        # We can reuse upload_video from drive_service.py even though it's named video.
        # It's technically MediaFileUpload for any file. (Will upload application/pdf automatically based on extension or media body)
        # Note: If drive_service has strict mimetype, it might need tweaking, but MediaFileUpload usually guesses.
        file_id = upload_video(filepath, filename, folder_id)
        
        webViewLink = f"https://drive.google.com/file/d/{file_id}/view"
        
    except Exception as e:
        os.remove(filepath)
        raise HTTPException(status_code=500, detail=f"Failed to upload certificate: {str(e)}")
        
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)
            
    # Update Firestore
    enrollment_ref.set({
        'is_course_completed': True,
        'certificate_url': webViewLink
    }, merge=True)
    
    return {
        "success": True,
        "message": "Certificate generated",
        "certificate_url": webViewLink
    }
