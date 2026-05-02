import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader

load_dotenv()

# Setup Jinja2 environment
template_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
jinja_env = Environment(loader=FileSystemLoader(template_dir))

def send_email(to_email, subject, template_name, context):
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")

    if not smtp_user or not smtp_pass:
        print("SMTP credentials not configured. Skipping email.")
        return False

    try:
        # Render template
        template = jinja_env.get_template(template_name)
        html_content = template.render(context)

        message = MIMEMultipart("alternative")
        message["From"] = f"Arambha LMS <{smtp_user}>"
        message["To"] = to_email
        message["Subject"] = subject

        # Attach HTML content
        message.attach(MIMEText(html_content, "html"))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(message)
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

def send_enrollment_email(student_name, student_email, program_name, program_type, other_details=None):
    admin_email = os.getenv("ADMIN_EMAIL", "info@florixtechnologies.com")
    
    # 1. Send Welcome Email to Student
    student_subject = f"Welcome to Arambha! - {program_name}"
    student_context = {
        "student_name": student_name,
        "course_title": program_name
    }
    send_email(student_email, student_subject, "student_enrollment_welcome.html", student_context)

    # 2. Send Alert Email to Admin (Reuse welcome template or use simple text for now)
    admin_subject = f"New Enrollment Alert: {student_name}"
    return send_email(admin_email, admin_subject, "student_enrollment_welcome.html", student_context)

def send_inquiry_email(name, email, phone, subject, message):
    admin_email = os.getenv("ADMIN_EMAIL", "info@florixtechnologies.com")
    
    admin_subject = f"New Inquiry: {subject}"
    context = {
        "name": name,
        "email": email,
        "phone": phone,
        "subject": subject,
        "message": message
    }
    
    return send_email(admin_email, admin_subject, "admin_inquiry_alert.html", context)
