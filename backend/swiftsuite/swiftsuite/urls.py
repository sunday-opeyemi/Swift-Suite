
from django.contrib import admin
from django.urls import path, include, re_path
from accounts.views import landingPage

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r'^accounts/', include("accounts.urls")),
    re_path(r'^vendor/', include("vendorApp.urls")),
    path('', landingPage, name="home"),
]
