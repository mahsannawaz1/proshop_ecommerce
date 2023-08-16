from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('',views.getProducts,name="product-list" ),
    path('<str:pk>/',views.getProduct,name="product-detail" ),
    
]
