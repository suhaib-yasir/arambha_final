from fastapi import APIRouter, HTTPException
from models.schemas import ProgressSyncRequest
from services.firebase_service import get_db
from datetime import datetime

router = APIRouter(prefix="/api/progress")

@router.post("/sync")
async def sync_progress(req: ProgressSyncRequest):
    db = get_db()
    
    # Check course exists
    course_ref = db.collection('courses').document(req.course_id)
    if not course_ref.get().exists:
        raise HTTPException(status_code=404, detail="Course not found")
        
    # Path: users/{user_id}/enrollments/{course_id}/progress/{video_id}
    progress_ref = db.collection('users').document(req.user_id) \
                     .collection('enrollments').document(req.course_id) \
                     .collection('progress').document(req.video_id)
                     
    doc = progress_ref.get()
    
    old_max = 0.0
    if doc.exists:
        data = doc.to_dict()
        old_max = data.get('max_watched_position', 0.0)
        
    # Requirements: Update current_position, and max_watched_position = max(old_max, current_position)
    new_max = max(old_max, req.current_position)
    is_completed = False
    
    if req.current_position > 0 and req.total_duration > 0:
        if (new_max / req.total_duration) >= 0.90:
            is_completed = True
            
    progress_data = {
        'current_position': req.current_position,
        'max_watched_position': new_max,
        'is_completed': is_completed,
        'last_updated': datetime.utcnow()
    }
    
    try:
        progress_ref.set(progress_data, merge=True)
        return {"success": True, "progress": progress_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
