from fastapi import FastAPI, UploadFile, File, Form, Request, Header
from fastapi.responses import JSONResponse
from typing import List
import os
import httpx

from drive_service import (
    create_folder,
    upload_video,
    get_access_token,
    DEFAULT_ROOT_ID
)

from services.firebase_service import get_db
from firebase_admin import firestore
from fastapi.middleware.cors import CORSMiddleware

from routers import enrollment, progress, certificate, contact

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Location","Range"]
)

app.include_router(enrollment.router)
app.include_router(progress.router)
app.include_router(certificate.router)
app.include_router(contact.router)


@app.get("/")
def home():
    return {
      "backend":"working"
    }


# ----------------------------
# Resumable Upload API
# ----------------------------

@app.post("/api/upload/initiate")
async def initiate_resumable_upload(
    course_name:str=Form(...),
    admin_uid:str=Form(...),
    filename:str=Form(...),
    content_type:str=Form(...),
    description:str=Form(None),
    category:str=Form(None),
    duration:str=Form(None),
    level:str=Form(None),
    price:str=Form(None),
    image_url:str=Form(None)
):
    db=get_db()

    course_ref=db.collection(
      "courses"
    ).document()

    course_id=course_ref.id

    course_ref.set({
      "title":course_name,
      "createdBy":admin_uid,
      "description":description,
      "category":category,
      "duration":duration,
      "level":level,
      "price":price,
      "image":image_url,
      "uploadStatus":"initiated",
      "createdAt":firestore.SERVER_TIMESTAMP
    })


    # Create a per-course subfolder on Drive (reuses existing if name matches)
    course_folder_id=create_folder(
      course_name,
      DEFAULT_ROOT_ID
    )

    # Store the folder ID in Firestore for reference
    course_ref.update({
      "driveFolderId": course_folder_id
    })

    token=get_access_token()

    url=(
      "https://www.googleapis.com/upload/drive/v3/files"
      "?uploadType=resumable"
      "&supportsAllDrives=true"
    )

    headers={
      "Authorization":f"Bearer {token}",
      "Content-Type":"application/json; charset=UTF-8",
      "X-Upload-Content-Type":content_type
    }

    body={
      "name":filename,
      "parents":[course_folder_id]
    }

    async with httpx.AsyncClient() as client:
        response=await client.post(
            url,
            headers=headers,
            json=body
        )

    if response.status_code!=200:
        return JSONResponse(
            status_code=response.status_code,
            content=str(response.text)
        )

    resumable_url=response.headers.get(
      "Location"
    )

    return {
      "success":True,
      "course_id":course_id,
      "resumable_url":resumable_url
    }



@app.put("/api/upload/chunk")
async def upload_chunk(
    request:Request,
    resumable_url:str=Header(...),
    content_range:str=Header(...)
):
    chunk=await request.body()

    headers={
      "Content-Range":content_range,
      "Content-Length":str(len(chunk))
    }

    async with httpx.AsyncClient() as client:
        response=await client.put(
           resumable_url,
           headers=headers,
           content=chunk
        )

    if response.status_code in [200,201]:
        drive_data=response.json()

        return {
           "status":"completed",
           "drive_id":drive_data.get("id")
        }

    elif response.status_code==308:
        return {
          "status":"incomplete",
          "range":response.headers.get("Range")
        }

    else:
        return JSONResponse(
            status_code=response.status_code,
            content=str(response.text)
        )



@app.post("/api/upload/finalize")
async def finalize_upload(
   course_id:str=Form(...),
   drive_id:str=Form(...),
   filename:str=Form(...)
):
    db=get_db()

    course_ref=db.collection(
      "courses"
    ).document(course_id)

    course_ref.update({
      "uploadStatus":"completed",
      "videoTitle": filename,
      "videoId": drive_id
    })

    return {
      "success":True
    }



# ----------------------------
# Legacy Simple Upload
# ----------------------------

@app.post("/upload-course")
async def upload_course(
    course_name:str=Form(...),
    admin_uid:str=Form(...),
    files:List[UploadFile]=File(...)
):

    db=get_db()

    course_ref=db.collection(
      "courses"
    ).document()

    course_id=course_ref.id


    course_ref.set({
      "title":course_name,
      "createdBy":admin_uid,
      "totalVideos":len(files),
      "uploadStatus":"processing",
      "createdAt":firestore.SERVER_TIMESTAMP
    })


    course_folder_id=create_folder(
      course_name,
      DEFAULT_ROOT_ID
    )


    uploaded_videos=[]

    for i,file in enumerate(
        files,
        start=1
    ):

        temp_path=f"temp_{course_id}_{i}.mp4"

        content=await file.read()

        with open(
           temp_path,
           "wb"
        ) as f:
            f.write(content)


        drive_id=upload_video(
          temp_path,
          file.filename,
          course_folder_id
        )

        os.remove(temp_path)


        video_ref=course_ref.collection(
           "videos"
        ).document(
           f"video_{i}"
        )


        firestore_data={
           "title":f"Video {i}",
           "order":i,
           "originalFileName":file.filename,
           "driveFileId":drive_id,
           "uploadStatus":"completed",
           "uploadDate":firestore.SERVER_TIMESTAMP
        }

        video_ref.set(
           firestore_data
        )


        # SAFE JSON RESPONSE OBJECT
        uploaded_videos.append({
            "title":f"Video {i}",
            "order":i,
            "filename":file.filename,
            "driveFileId":drive_id,
            "uploadStatus":"completed"
        })


    course_ref.update({
      "uploadStatus":"completed"
    })


    return {
      "success":True,
      "course_id":course_id,
      "course_folder_id":course_folder_id,
      "videos_uploaded":len(files),
      "videos":uploaded_videos
    }

# ----------------------------
# Careers API
# ----------------------------

@app.get("/api/careers")
async def get_careers():
    db = get_db()
    careers_ref = db.collection("careers").order_by("createdAt", direction=firestore.Query.DESCENDING)
    docs = careers_ref.stream()
    
    careers = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        # Convert timestamp to string for JSON serialization if it exists
        if 'createdAt' in data and data['createdAt'] and hasattr(data['createdAt'], 'isoformat'):
            data['createdAt'] = data['createdAt'].isoformat()
        careers.append(data)
    
    return careers

@app.post("/api/careers")
async def create_career(
    title: str = Form(...),
    department: str = Form(...),
    location: str = Form(...),
    experience: str = Form(...),
    salary: str = Form(...),
    description: str = Form(...),
    image: str = Form(None),
    badge: str = Form(None)
):
    db = get_db()
    career_ref = db.collection("careers").document()
    
    career_data = {
        "title": title,
        "department": department,
        "location": location,
        "experience": experience,
        "salary": salary,
        "description": description,
        "image": image,
        "badge": badge,
        "createdAt": firestore.SERVER_TIMESTAMP
    }
    
    career_ref.set(career_data)
    return {"success": True, "id": career_ref.id}

@app.delete("/api/careers/{career_id}")
async def delete_career(career_id: str):
    db = get_db()
    db.collection("careers").document(career_id).delete()
    return {"success": True}

@app.post("/api/careers/apply")
async def apply_for_job(
    role_applied: str = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    whatsapp: str = Form(...),
    address: str = Form(...),
    skills: str = Form(...),
    area_of_interest: str = Form(...),
    college_name: str = Form(...),
    year_of_passing: str = Form(...),
    highest_education: str = Form(...),
    work_experience_status: str = Form(...),
    linkedin_url: str = Form(None),
    portfolio_url: str = Form(None),
    github_url: str = Form(None),
    reference_name: str = Form(None)
):
    from services.notification_service import send_enrollment_email
    db = get_db()
    
    if db is None:
        # Send notification email even if DB is down for testing
        details = f"Phone: {phone}\nWhatsApp: {whatsapp}\nSkills: {skills}\nCollege: {college_name}\nEducation: {highest_education}\nExperience: {work_experience_status}\nLinkedIn: {linkedin_url}\nNote: DB was unavailable."
        send_enrollment_email(
            student_name=name,
            student_email=email,
            program_name=role_applied,
            program_type="Career/Job",
            other_details=details
        )
        return {"success": True, "id": "mock_id_db_unavailable"}

    application_ref = db.collection("applicants").document()
    
    app_data = {
        "roleApplied": role_applied,
        "name": name,
        "email": email,
        "phone": phone,
        "whatsapp": whatsapp,
        "address": address,
        "skills": skills,
        "areaOfInterest": area_of_interest,
        "collegeName": college_name,
        "yearOfPassing": year_of_passing,
        "highestEducation": highest_education,
        "workExperienceStatus": work_experience_status,
        "linkedinUrl": linkedin_url,
        "portfolioUrl": portfolio_url,
        "githubUrl": github_url,
        "referenceName": reference_name,
        "appliedAt": firestore.SERVER_TIMESTAMP
    }
    
    application_ref.set(app_data)
    
    # Update stats
    stats_ref = db.collection('stats').document('global')
    stats_ref.set({
        'total_applications': firestore.Increment(1)
    }, merge=True)
    
    # Send notification email
    details = f"Phone: {phone}\nWhatsApp: {whatsapp}\nSkills: {skills}\nCollege: {college_name}\nEducation: {highest_education}\nExperience: {work_experience_status}\nLinkedIn: {linkedin_url}"
    
    send_enrollment_email(
        student_name=name,
        student_email=email,
        program_name=role_applied,
        program_type="Career/Job",
        other_details=details
    )
    
    return {"success": True, "id": application_ref.id}

@app.get("/api/careers/applications")
async def get_applications():
    db = get_db()
    if db is None:
        return []
    
    try:
        docs = db.collection('applicants').order_by('appliedAt', direction=firestore.Query.DESCENDING).stream()
        apps = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id
            if 'appliedAt' in data and data['appliedAt'] and hasattr(data['appliedAt'], 'isoformat'):
                data['appliedAt'] = data['appliedAt'].isoformat()
            apps.append(data)
        return apps
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats")
async def get_stats():
    db = get_db()
    stats_snap = db.collection('stats').document('global').get()
    if stats_snap.exists:
        data = stats_snap.to_dict()
        print(f"Stats Data from DB: {data}")
        return {
            "total_enrollments": data.get("total_enrollments", 0),
            "total_applications": data.get("total_applications", 0),
            "total_contacts": data.get("total_contacts", 0)
        }
    return {"total_enrollments": 0, "total_applications": 0, "total_contacts": 0}

# ----------------------------
# Courses API
# ----------------------------

@app.get("/api/courses")
async def get_courses():
    db = get_db()
    courses_ref = db.collection("courses").order_by("createdAt", direction=firestore.Query.DESCENDING)
    docs = courses_ref.stream()
    
    courses = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id
        if 'createdAt' in data and data['createdAt'] and hasattr(data['createdAt'], 'isoformat'):
            data['createdAt'] = data['createdAt'].isoformat()
        courses.append(data)
    
    return courses