from django.shortcuts import render

# Create your views here.
def liam_test(request):
    return render(request, 'liam_test.html')
