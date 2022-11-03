from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class l_songs(models.Model):
    s_id = models.CharField('Title', max_length=100)
    name=models.CharField('Name',max_length=100)
    # thumbnail=models.ImageField(default='/static/images/musiqal_logo.png')
    def __str__(self):
        return self.name

# class Song(models.Model):
#     movie=models.CharField(max_length=200,blank=True)
#     song_name=models.CharField(max_length=200)
#     artist=models.CharField(max_length=200)
#     year=models.IntegerField()



#     def __str__(self):
#         return self.song_name

# class Playlist(models.Model):
#     list_name=models.CharField(max_length=100)
#     user=models.ForeignKey(User,on_delete=models.CASCADE)
#     song=models.ForeignKey(Song,on_delete=models.CASCADE,blank=True,default=None,null=True)

#     def __str__(self):
#         return self.list_name