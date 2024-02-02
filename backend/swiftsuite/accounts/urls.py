from django.urls import path
from accounts import views as view

urlpatterns = [
    path('register/', view.register_user, name='register'),
    path('login/', view.user_login, name='login'),
    path('logout/', view.user_logout, name='logout'),
    path('change_password/', view.change_password, name='change_password'),
]