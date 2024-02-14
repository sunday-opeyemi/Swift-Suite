import pyotp
import time
from .models import User, OneTimePassword
from django.core.mail import EmailMessage
from django.conf import settings

def generate_otp():
    totp = pyotp.TOTP('base32secret3232')
    val = totp.now() # => '492039'
    return val

    # # OTP verified for current time
    # print(totp.verify(val)) # => True
    # time.sleep(30)
    # totp.verify(val) # => False


def send_code_to_user(email):
   subject = "One time passcode for Email Verification"
   otp_code =  generate_otp()
   user = User.objects.get(email=email)
   current_site = "SwiftSuit"
   email_body = f'Hi {user.first_name}, thanks for signing up on {current_site}, kindly verify your email with the\none time passcode {otp_code} '
   from_email = settings.DEFAULT_FROM_EMAIL

   OneTimePassword.objects.create(user=user, code= otp_code)
   d_email = EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[email])
   d_email.send(fail_silently=True)

def send_normal_email(data):
    email = EmailMessage(
        subject= data['email_subject'],
        body = data['email_body'],
        from_email = settings.EMAIL_HOST_USER,
        to = [data['to_email']] 
    )

    email.send()