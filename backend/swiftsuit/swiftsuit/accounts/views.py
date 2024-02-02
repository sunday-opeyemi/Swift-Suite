# from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .serializers import UserSerializer
# from rest_framework import status
# from rest_framework.authtoken.models import Token
# from django.contrib.auth.models import User
# from django.shortcuts import get_object_or_404
# # Create your views here.

# @api_view(['POST'])
# def login(request):
#     user = get_object_or_404(User, username = request.data['username'])
#     if not user.check_password(request.data['password']):
#         return Response({"detail":"Not found"}, status=status.HTTP_400_BAD_REQUEST)
#     token,created = Token.objects.get_or_create(user = user)
#     serializer = UserSerializer(instance=user)
#     return Response({"token":token.key, 'user':serializer.data})

# @api_view(['POST'])
# def signup(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         user = User.objects.get(username = request.data['username'])
#         user.set_password(request.data['password'])
#         user.save()
#         token = Token.objects.create(user = user)
#         return Response({"token": token.key, "user":serializer.data})
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def test_token(request):
#     return Response({})

#####################################################################################

from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer, LoginSerializer, PasswordResetSerializer,SetNewPasswordSerializer, LogoutUserSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_code_to_user
from .models import OneTimePassword, User
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.permissions import IsAuthenticated



class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data 
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            # send email
            send_code_to_user(user['email'])

            return Response({
                "data":user, 
                'message':"Sign up succesfull", 
                }, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        otpcode = request.data.get('otp')
        try:
            user_code_obj = OneTimePassword.objects.get(code = otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    "message":"account email verified successfully"
                }, status=status.HTTP_200_OK)
            return Response({
                "message":"code is invalid, user already verified."
            }, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist:
            return Response({"message":"Passcode not provided"}, status=status.HTTP_404_NOT_FOUND)


class LoginUserView(GenericAPIView):
    serializer_class  = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context = {'request':request})
        serializer.is_valid(raise_exception=True)
        return Response (serializer.data, status=status.HTTP_200_OK)



class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer
    def post(self, request):
        serializer = self.serializer_class(data = request.data, context ={'request':request})
        serializer.is_valid(raise_exception = True)
        return Response({'message':"A link has been sent to your email to reset your password"}, status=status.HTTP_200_OK)
    
class PasswordResetConfirm(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message':'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True, 'message':'credential is valid', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError:
            return Response({'message':'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        
class SetNewPassword(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message':'Password reset successful'}, status=status.HTTP_200_OK)
    

class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


