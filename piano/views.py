from django.shortcuts import render
from django.views import generic


# Create your views here.
def index(request):
    return render(request, 'index.html')
    
def liam_test(request):
    return render(request, 'liam_test.html')
