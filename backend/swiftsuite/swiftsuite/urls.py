
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('accounts.urls')),  # Include the app's URLs
    path('', TemplateView.as_view(template_name='index.html'), name="home"),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
]
