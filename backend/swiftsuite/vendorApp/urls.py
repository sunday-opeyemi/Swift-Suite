from .views import *
from django.urls import path

urlpatterns = [
    path('vendor-enrolment/',VendoEnronmentView.as_view(), name='vendor-enrolment'),
    path('vendor-enrolment-test/',VendorEnrolmentTestView.as_view(), name='vendor-enrolment-test'),
    path('update-vendor-enrolment/<str:identifier>/',update_vendor_enrolment, name='update-vendor-enrolment'),
    path('catalogue-fragrancex/<int:pk>/<str:identifier>/',CatalogueFragrancexView.as_view(), name='catalogue-fragrancex'),
    path('catalogue-zanders/<int:pk>/<str:identifier>/',CatalogueZandersView.as_view(), name='catalogue-zanders'),
    path('catalogue-lipsey/<int:pk>/<str:identifier>/',CatalogueLipseyView.as_view(), name='catalogue-lipsey'),
    path('catalogue-ssi/<int:pk>/<str:identifier>/',CatalogueSsiView.as_view(), name='catalogue-ssi'),
    path('catalogue-cwr/<int:pk>/<str:identifier>/',CatalogueCwrView.as_view(), name='catalogue-cwr'),
    path('all-catalogue/<int:pk>/',AllCatalogueView.as_view(), name='all-catalogue'),

    path('add-to-product/<int:userid>/<int:product_id>/<str:vendor_name>/', AddProductView.as_view(), name='add-to-product'),
    path('view-all-products/<int:userid>/', ViewAllProducts.as_view(), name='view-all-products')
]
