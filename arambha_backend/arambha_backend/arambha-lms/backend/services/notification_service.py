import httpx
import os
from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader

load_dotenv()

# Setup Jinja2 environment
template_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
jinja_env = Environment(loader=FileSystemLoader(template_dir))

def send_email(to_email, subject, template_name, context):
    resend_api_key = os.getenv("RESEND_API_KEY")
    if not resend_api_key:
        print("Resend API key not configured. Skipping email.")
        return False

    try:
        # Render template
        template = jinja_env.get_template(template_name)
        html_content = template.render(context)

        url = "https://api.resend.com/emails"
        headers = {
            "Authorization": f"Bearer {resend_api_key}",
            "Content-Type": "application/json"
        }
        
        # Using verified domain arambhaskills.com
        sender_email = os.getenv("RESEND_FROM_EMAIL", "Arambha LMS <info@arambhaskills.com>")
        
        data = {
            "from": sender_email,
            "to": [to_email],
            "subject": subject,
            "html": html_content
        }

        response = httpx.post(url, headers=headers, json=data)
        
        if response.status_code in [200, 201]:
            print(f"SUCCESS: Email sent to {to_email}")
            return True
        else:
            print(f"CRITICAL ERROR: Failed to send email to {to_email}. Resend Status: {response.status_code}, Response: {response.text}")
            return False

    except Exception as e:
        print(f"EXCEPTION: Failed to send email to {to_email}: {e}")
        return False

def send_enrollment_email(student_name, student_email, program_name, program_type, other_details=None):
    admin_email = os.getenv("ADMIN_EMAIL", "admin@arambhaskills.com")
    
    # 1. Send Welcome Email to Student
    student_subject = f"Welcome to Arambha! - {program_name}"
    student_context = {
        "student_name": student_name,
        "course_title": program_name
    }
    send_email(student_email, student_subject, "student_enrollment_welcome.html", student_context)

    # 2. Send Alert Email to Admin with detailed info
    admin_subject = f"New Enrollment Alert: {student_name}"
    admin_context = {
        "student_name": student_name,
        "student_email": student_email,
        "program_name": program_name,
        "program_type": program_type,
        "other_details": other_details or "No additional details provided."
    }
    return send_email(admin_email, admin_subject, "admin_enrollment_alert.html", admin_context)

def send_inquiry_email(name, email, phone, subject, message):
    admin_email = os.getenv("ADMIN_EMAIL", "admin@arambhaskills.com")
    
    admin_subject = f"New Inquiry: {subject}"
    context = {
        "name": name,
        "email": email,
        "phone": phone,
        "subject": subject,
        "message": message
    }
    
    return send_email(admin_email, admin_subject, "admin_inquiry_alert.html", context)
