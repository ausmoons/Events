import django_filters
from .models import Event


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = Event
        fields = {
            "type": ["exact"],
            "actor_id": ["exact"],
            "repo_id": ["exact"],
        }
