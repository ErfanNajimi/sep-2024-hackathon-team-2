from django.urls import path
from . import views

urlpatterns = [
    path('liam_test/', views.liam_test, name='liam_test'),
]