from fastapi import APIRouter, HTTPException
from models.schemas import ContactRequest
from services.firebase_service import get_db
from services.notification_service import send_inquiry_email
from firebase_admin import firestore

router = APIRouter(prefix="/api")

@router.post("/contact")
async def contact_us(req: ContactRequest):
    db = get_db()
    
    if db is None:
        # Fallback to email only
        send_inquiry_email(
            name=req.name,
            email=req.email,
            phone=req.phone,
            subject=req.subject,
            message=req.message
        )
        return {"success": True, "message": "Message sent (Email only, DB unavailable)"}

    try:
        # 1. Save to inquiries collection
        inquiry_ref = db.collection('inquiries').document()
        inquiry_data = {
            **req.dict(),
            "created_at": firestore.SERVER_TIMESTAMP
        }
        inquiry_ref.set(inquiry_data)
        
        # 2. Update global stats
        stats_ref = db.collection('stats').document('global')
        stats_ref.set({
            'total_contacts': firestore.Increment(1)
        }, merge=True)
        
        # 3. Send notification email
        send_inquiry_email(
            name=req.name,
            email=req.email,
            phone=req.phone,
            subject=req.subject,
            message=req.message
        )
        
        return {"success": True, "message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/contacts")
async def get_contacts():
    db = get_db()
    if db is None:
        return []
    
    try:
        docs = db.collection('inquiries').order_by('created_at', direction=firestore.Query.DESCENDING).stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
