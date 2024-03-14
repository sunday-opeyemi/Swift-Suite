from .views import *
from django.urls import path

urlpatterns = [
    path('vendor-enrolment/',VendoEnronmentListView.as_view(), name='vendor-enrolment'),
    path('vendor-enrolment-test/',VendorEnrolmentTestView.as_view(), name='vendor-enrolment-test'),
    
    # path('vendor-detail/<int:pk>/',VendoEnronmentDetailView.as_view(), name='vendor-detail')
]
