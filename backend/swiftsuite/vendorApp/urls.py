from .views import *
from django.urls import path

urlpatterns = [
    path('vendor-enrolment/',VendoEnronmentListView.as_view(), name='vendor-enrolment'),
    path('vendor-detail/<int:pk>/',VendoEnronmentDetailView.as_view(), name='vendor-detail')
]
