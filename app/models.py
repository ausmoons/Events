from django.db import models


class Event(models.Model):
    EVENT_TYPES = [
        ('PushEvent', 'PushEvent'),
        ('ReleaseEvent', 'ReleaseEvent'),
        ('WatchEvent', 'WatchEvent'),
    ]

    type = models.CharField(max_length=100, choices=EVENT_TYPES)
    public = models.BooleanField(default=True)
    repo_id = models.IntegerField()
    actor_id = models.IntegerField()

    def __str__(self):
        return f"{self.type} by {self.actor_id} on {self.repo_id}"