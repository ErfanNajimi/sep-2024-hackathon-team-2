from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from .models import Tune
from allauth.account.forms import SignupForm  # Import SignupForm
from django.contrib import messages  # Import messages for feedback

# Create your views here.
def index(request):
    return render(request, 'index.html')

def piano(request):
    tunes = Tune.objects.all().values()
    return render(request, 'piano/piano.html', {'tunes': tunes})

def stage1(request):
    return render(request, 'piano/stage1.html')

def stage2(request):
    return render(request, 'piano/stage2.html')

def stage3(request):
    return render(request, 'piano/stage3.html')

def leaderboard(request):
    return render(request, 'piano/leaderboard.html')

def mobile(request):
    return render(request, 'piano/mobile.html')

def tunes(request):
    return render(request, 'piano/teamTunes.html')

def profile_view(request, pk):
    user = get_object_or_404(User, pk=pk)
    return render(request, 'profile.html', {'user': user})

# New signup view for user registration
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(request)  # Save the user and create an account
            messages.success(request, "You have successfully signed up!")  # Success message
            return redirect('profile', pk=user.pk)  # Redirect to the user's profile page
        else:
            # Form has errors, return it to the template with messages
            messages.error(request, "Please correct the errors below.")
    else:
        form = SignupForm()  # Show an empty form initially

    return render(request, 'signup_template.html', {'form': form})
