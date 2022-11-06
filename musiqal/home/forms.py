from django import forms
from .models import *
  
class LikedSongsForm(forms.ModelForm):
  
    class Meta:
        model = l_songs
        fields = ['s_id', 'name']