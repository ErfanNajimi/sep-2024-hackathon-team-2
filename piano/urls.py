from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index.html'),
    path('liam_test/', views.liam_test, name='liam_test'),
]