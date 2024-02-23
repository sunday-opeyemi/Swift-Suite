import pyotp
import time
from .models import User, OneTimePassword
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def generate_otp():
    totp = pyotp.TOTP('base32secret3232')
    val = totp.now() # => '492039'
    return val


def send_code_to_user(email):
   subject = "One time passcode for Email Verification"
   otp_code =  generate_otp()
   user = User.objects.get(email=email)
   from_email = settings.DEFAULT_FROM_EMAIL
   OneTimePassword.objects.create(user=user, code= otp_code)
   
   context = {
       'first_name':user.first_name,
       'last_name':user.last_name,
       'otp_code':otp_code
   }

   html_message = render_to_string(r'templates\email\verify_email.html', context=context)
   plain_message = strip_tags(html_message)


   d_email = EmailMultiAlternatives(
       subject=subject,
       body=plain_message,
       from_email=from_email,
       to=[email]
   )

   d_email.attach_alternative(html_message, 'text/html')
   d_email.send(fail_silently=True)

def send_normal_email(data):

   
    html_message = render_to_string(r'templates\email\reset_password.html', context=data)
    plain_message = strip_tags(html_message) 


    email = EmailMultiAlternatives(
        subject= data['email_subject'],
        body = plain_message,
        from_email = settings.EMAIL_HOST_USER,
        to = [data['to_email']] 
    )
    email.attach_alternative(html_message, 'text/html')
    email.send(fail_silently=True)