from django.db import models

# Create your models here.
class Tune(models.Model):
    name = models.CharField(max_length=120)
    note_progression = models.CharField(max_length=120)
    audio_filename = models.CharField(max_length=120, blank=True)

    class Meta: 
        ordering = ["name"]
    
    def __str__(self):
        return f"{self.name}"