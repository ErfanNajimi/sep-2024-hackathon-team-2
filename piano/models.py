from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tune(models.Model):
    name = models.CharField(max_length=120)
    note_progression = models.CharField(max_length=120)
    audio_filename = models.CharField(max_length=120, blank=True)

    class Meta: 
        ordering = ["name"]
    
    def __str__(self):
        return f"{self.name}"

class Score(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE, name = "player")
    score = models.IntegerField(default=0)

    class Meta: 
        ordering = ["score"]
    
    def __str__(self):
        return f"{self.player}: {self.score} points"

