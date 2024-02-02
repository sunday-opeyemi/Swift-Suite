
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('accounts.urls')),  # Include the app's URLs
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
