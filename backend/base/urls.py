
from django.urls import path
from . import views

urlpatterns = [
    path('products/',views.getProducts,name="product-list" ),
    path('products/<str:pk>/',views.getProduct,name="product-detail" ),
]