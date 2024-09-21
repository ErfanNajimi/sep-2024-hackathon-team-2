from django.shortcuts import render
from django.views import generic
from .models import Tune


# Create your views here.
def index(request):
    return render(request, 'index.html')

def piano(request):
    tunes = Tune.objects.all().values()

    return render(
        request, 
        'piano/piano.html',
        {'tunes':tunes},
    )

def stage1(request):
    return render(request, 'piano/stage1.html')

def stage2(request):
    return  render(request, 'piano/stage2.html')

def stage3(request):
    return  render(request, 'piano/stage3.html')

def leaderboard(request):
    return  render(request, 'piano/leaderboard.html')

def mobile(request):
    return  render(request, 'piano/mobile.html')
