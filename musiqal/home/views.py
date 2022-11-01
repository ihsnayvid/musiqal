from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate, login
from django.contrib import messages
import requests
import json

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
            messages.info(request, 'Invalid Username or Password!!')
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
        confirm_password = request.POST.get('confirm_password')
        if User.objects.filter(username=username).exists():
            messages.info(request, 'Username Taken')
            return redirect('register')
        elif User.objects.filter(email=email).exists():
            messages.info(request, 'Email Taken')
            return redirect('register')
        elif password != confirm_password:
            messages.info(request, 'Passwords do not match!!')
            return redirect('register')            
        else:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            return redirect('login')
    
    return render(request, 'register.html')
    
def search(request):
    if request.user.is_anonymous:
        return redirect("/login")
    search_query = request.GET.get('search')
    # send search_query to the api call
    url_search = "https://youtube-music1.p.rapidapi.com/v2/search"
    querysearch = {"query":search_query}

    headers = {
        "X-RapidAPI-Key": "fe4c8a33f4mshb03efeb944d6fb5p1954e8jsna74e41f4c88c",
        "X-RapidAPI-Host": "youtube-music1.p.rapidapi.com"
    }
    
    response = requests.get(url_search, headers=headers, params=querysearch)
    song_list = json.loads(response.text)['result']['songs']
    context = {
        'song_list' : song_list
    }
    # send song_id to the api call to download song
    # url_download = "https://youtube-music1.p.rapidapi.com/get_download_url"
    # querydownload = {"id":song_id,"ext":"mp3"}
    
    # response = requests.get(url_download, headers=headers, params=querydownload)
    # download_url = json.loads(response.text)['result']['download_url']
    # mp3 = requests.get(download_url)
    # with open('./static/music/song.mp3', 'wb') as f:
    #     f.write(mp3.content)
        
    return render(request, 'search.html', context)
        
    