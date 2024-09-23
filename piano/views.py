from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from .models import Tune, Score
from .forms import ScoreForm


# Create your views here.
def index(request):
    return render(request, 'index.html')

def piano(request):
    tunes = list(Tune.objects.all().values_list('note_progression'))

    if request.method == "POST":
        score_form = ScoreForm(data=request.POST)
        if score_form.is_valid():
            score = score_form.save(commit=False)
            score.player = request.user
            score.save()
            # messages.add_message(
            #     request, messages.SUCCESS,
            #     'Score saved'
            # )
            return redirect('piano')

    score_form = ScoreForm()


    return render(
        request, 
        'piano/piano.html',
        {
            'tunes': tunes,
            'score_form': score_form,
        },
    )

def stage1(request):
    return render(request, 'piano/stage1.html')

def stage2(request):
    return render(request, 'piano/stage2.html')

def stage3(request):
    return render(request, 'piano/stage3.html')

def leaderboard(request):
    scores = Score.objects.all().values()

    return render(
        request, 
        'piano/leaderboard.html',
        {'scores':scores},
    )

def mobile(request):
    return render(request, 'piano/mobile.html')

def tunes(request):
    return  render(request, 'piano/teamTunes.html')

def profile_view(request, pk):
    user = get_object_or_404(User, pk=pk)
    return render(request, 'profile.html', {'user': user})


