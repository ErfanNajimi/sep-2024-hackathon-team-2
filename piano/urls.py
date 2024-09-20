from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index.html'),
    path('piano/', views.piano, name='piano.html'),
]