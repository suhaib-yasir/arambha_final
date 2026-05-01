import sys
import os

# Add the current directory to sys.path to import services
sys.path.append(os.path.join(os.getcwd(), 'arambha-lms', 'backend'))

from services.firebase_service import get_db
from firebase_admin import firestore

def seed_careers():
    db = get_db()
    careers_ref = db.collection("careers")

    # Check if careers already exist to avoid duplicates
    existing_docs = list(careers_ref.limit(1).stream())
    if existing_docs:
        print("Careers collection already seeded. Skipping...")
        return

    jobs = [
        {
            "title": "Business Development Associate – Inside Sales",
            "department": "Sales",
            "location": "Bangalore",
            "experience": "0–2 Years",
            "salary": "₹3–5 LPA",
            "description": "Drive revenue growth through lead conversion and relationship building. Engage with prospective clients, understand their requirements, and close deals effectively.",
            "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
            "badge": "Urgent Hire"
        },
        {
            "title": "Digital Marketing Associate",
            "department": "Marketing",
            "location": "Bangalore",
            "experience": "0–2 Years",
            "salary": "₹3–5 LPA",
            "description": "Assist in executing digital marketing campaigns across platforms. Manage SEO/SEM activities, track performance metrics, and optimize campaigns to improve engagement and conversions.",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            "badge": "New"
        },
        {
            "title": "Brand Growth Executive",
            "department": "Marketing",
            "location": "Work from Home",
            "experience": "0–2 Years",
            "salary": "₹3–6 LPA",
            "description": "Support brand visibility and online engagement initiatives. Coordinate promotional campaigns and ensure consistent brand communication across all digital platforms.",
            "image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
            "badge": None
        },
        {
            "title": "Sales Lead / Manager",
            "department": "Sales",
            "location": "Bangalore",
            "experience": "0–2 Years",
            "salary": "₹3–8 LPA",
            "description": "Lead and motivate the sales team to achieve regional revenue targets. Mandatory experience in the EdTech industry required. Develop sales strategies and monitor KPIs.",
            "image": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
            "badge": None
        },
        {
            "title": "Marketing Strategy Manager",
            "department": "Marketing",
            "location": "Bangalore",
            "experience": "0–2 Years",
            "salary": "₹3–8 LPA",
            "description": "Design and execute data-driven marketing strategies aligned with business objectives. Analyze market trends and oversee campaign performance to drive sustainable growth.",
            "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            "badge": None
        },
        {
            "title": "Campus Growth Partner",
            "department": "Marketing",
            "location": "Work from Home",
            "experience": "0–2 Years",
            "salary": "₹3–5 LPA",
            "description": "Act as the company representative across college campuses. Build student networks, generate leads, and organize engagement activities to increase brand awareness.",
            "image": "https://images.unsplash.com/photo-1523240715639-9a67a0e570bd?q=80&w=2070&auto=format&fit=crop",
            "badge": None
        },
        {
            "title": "Corporate Sales Executive (B2B)",
            "department": "Sales",
            "location": "Bangalore",
            "experience": "0–2 Years",
            "salary": "₹4–8 LPA",
            "description": "Identify and develop corporate partnerships to expand business opportunities. Pitch tailored solutions, close deals, and maintain long-term client relationships.",
            "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
            "badge": None
        },
        {
            "title": "Human Resource Manager",
            "department": "Human Resources",
            "location": "Bangalore, India",
            "experience": "1–4 Years",
            "salary": "₹3–6 LPA",
            "description": "We are looking for an experienced Human Resource Manager with mandatory experience in the EdTech industry. Lead recruitment, employee engagement, performance management, and HR operations.",
            "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
            "badge": None
        }
    ]

    print(f"Seeding {len(jobs)} careers...")
    for job in jobs:
        job["createdAt"] = firestore.SERVER_TIMESTAMP
        careers_ref.add(job)
    
    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_careers()
