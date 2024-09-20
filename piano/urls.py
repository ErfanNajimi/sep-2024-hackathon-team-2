from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index.html'),
    path('piano/', views.piano, name='piano.html'),
    path('mobile/', views.mobile, name='mobile.html'),
    path('leaderboard/', views.leaderboard, name='leaderboard.html'),
    path('stage1/', views.stage1, name='stage1.html'),
    path('stage2/', views.stage2, name='stage2.html'),
    path('stage3/', views.stage3, name='stage3.html'),
]