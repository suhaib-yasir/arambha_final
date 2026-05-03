from pydantic import BaseModel
from typing import Optional

class ProgressSyncRequest(BaseModel):
    user_id: str
    course_id: str
    video_id: str
    current_position: float
    total_duration: float

class EnrollRequest(BaseModel):
    user_id: str
    course_id: str
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    address: Optional[str] = None
    college_name: Optional[str] = None
    year_of_passing: Optional[str] = None
    highest_education: Optional[str] = None

class CertificateRequest(BaseModel):
    user_id: str
    course_id: str
    user_name: str

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str
    subject: str
    message: str
