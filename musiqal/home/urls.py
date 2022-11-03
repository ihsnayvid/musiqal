from django.contrib import admin
from django.urls import path, include
from home import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('',views.index,name="home"),
    path('login',views.loginUser,name="login"),
    path('logout',views.logoutUser,name="logout"),
    path('register',views.signUp,name="register"),
    path('search',views.search,name="search"),
    path('likedsongs',views.likepage,name="liked"),
    path('lisongs/<str:s_id>/<str:name>',views.likes,name="like"),
    path('password_reset/',auth_views.PasswordResetView.as_view(),name='password_reset'),
    path('password_reset/done/',auth_views.PasswordResetDoneView.as_view(),name='password_reset_done'),
    path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(),name='password_reset_confirm'),
    path('reset/done/',auth_views.PasswordResetCompleteView.as_view(),name='password_reset_complete'),
]