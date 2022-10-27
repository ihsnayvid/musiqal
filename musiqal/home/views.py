from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate, login
from django.contrib import messages

# Create your views here.
def index(request):
    if request.user.is_anonymous:
        return redirect("/login")
    return render(request,'index.html')

def loginUser(request):
    if request.method=="POST":
        username=request.POST.get('username')
        password=request.POST.get('password')
        user = authenticate(username=username,password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(request,'login.html')
    return render(request,'login.html')

def logoutUser(request):
    logout(request)
    return redirect("/login")

def signUp(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        if User.objects.filter(username=username).exists():
            messages.info(request, 'Username Taken')
            return redirect('register')
        elif User.objects.filter(email=email).exists():
            messages.info(request, 'Email Taken')
            return redirect('register')
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            return redirect('login')
    
    return render(request, 'register.html')