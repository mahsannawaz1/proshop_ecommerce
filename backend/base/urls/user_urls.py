
from django.urls import path
from base.views import user_views as views



urlpatterns = [
   
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('',views.getUsers,name="user-list" ),
    path('profile/',views.getUserProfile,name="user-profile" ),
     path('register/',views.registerUser,name="user-register" ),
]