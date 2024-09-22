urlpatterns = [
    #path('', views.index, name='index'),
    #path('piano/', views.piano, name='piano'),
    #path('mobile/', views.mobile, name='mobile'),
    #path('leaderboard/', views.leaderboard, name='leaderboard'),
    #path('stage1/', views.stage1, name='stage1'),
    #path('stage2/', views.stage2, name='stage2'),
    #path('stage3/', views.stage3, name='stage3'),
    #path('tunes/', views.tunes, name='tunes'),
    #path('profile/<int:pk>/', views.profile_view, name='profile'),
    #path('accounts/profile/', views.profile_view, name='account_profile'),
]


from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),         # Root URL for piano app
    path('piano/', views.piano, name='piano'),
    path('mobile/', views.mobile, name='mobile'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('stage1/', views.stage1, name='stage1'),
    path('stage2/', views.stage2, name='stage2'),
    path('stage3/', views.stage3, name='stage3'),
    path('tunes/', views.tunes, name='tunes'),
    path('profile/<int:pk>/', views.profile_view, name='profile'),
]
