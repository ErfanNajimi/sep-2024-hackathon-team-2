# Generated by Django 4.2.16 on 2024-09-21 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('piano', '0002_alter_tune_name_alter_tune_note_progression'),
    ]

    operations = [
        migrations.AddField(
            model_name='tune',
            name='audio_filename',
            field=models.CharField(blank=True, max_length=120),
        ),
    ]
