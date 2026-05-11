import os
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.http import MediaFileUpload
from dotenv import load_dotenv
from pathlib import Path

env_path=Path(__file__).resolve().parent / ".env"

print(f"Loading .env from: {env_path}")

load_dotenv(env_path)

SCOPES=[
 "https://www.googleapis.com/auth/drive"
]

DEFAULT_ROOT_ID=os.getenv(
 "GOOGLE_DRIVE_FOLDER_ID"
)

SHARED_DRIVE_ID=os.getenv(
 "GOOGLE_SHARED_DRIVE_ID"
)

print("ROOT:",DEFAULT_ROOT_ID)
print("SHARED:",SHARED_DRIVE_ID)

CRED_PATH=os.path.join(
 os.path.dirname(__file__),
 "credentials.json"
)

creds = None
service = None

if os.path.exists(CRED_PATH):
    creds=Credentials.from_service_account_file(
     CRED_PATH,
     scopes=SCOPES
    )

    service=build(
     "drive",
     "v3",
     credentials=creds
    )
else:
    print("WARNING: credentials.json not found. Drive service disabled.")



def create_folder(name,parent=None):

    parent=parent or DEFAULT_ROOT_ID

    query=(
      f"name='{name}' "
      f"and mimeType='application/vnd.google-apps.folder' "
      f"and '{parent}' in parents "
      f"and trashed=false"
    )

    # Build list parameters based on whether we're using shared drives
    list_params = {
        "q": query,
        "fields": "files(id,name)",
        "supportsAllDrives": True,
        "includeItemsFromAllDrives": True
    }
    
    # Only add corpora and driveId if SHARED_DRIVE_ID is set
    if SHARED_DRIVE_ID:
        list_params["corpora"] = "drive"
        list_params["driveId"] = SHARED_DRIVE_ID

    results=service.files().list(**list_params).execute()

    folders=results.get(
      "files",
      []
    )

    if folders:
        return folders[0]["id"]

    metadata={
      "name":name,
      "mimeType":
      "application/vnd.google-apps.folder",
      "parents":[parent]
    }
    
    # Only add driveId if using shared drives
    if SHARED_DRIVE_ID:
        metadata["driveId"] = SHARED_DRIVE_ID

    folder=service.files().create(
        body=metadata,
        fields="id",
        supportsAllDrives=True
    ).execute()

    return folder["id"]





def upload_video(
 filepath,
 filename,
 parent_id
):

    media=MediaFileUpload(
      filepath,
      resumable=False
    )


    file_metadata={
      "name":filename,
      "parents":[parent_id]  
    }


    uploaded_file=service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id",
        supportsAllDrives=True
    ).execute()


    return uploaded_file["id"]





def get_access_token():

    from google.auth.transport.requests import Request

    creds.refresh(
      Request()
    )

    return creds.token