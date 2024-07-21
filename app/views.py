import logging
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EventFilter
from .serializers import EventSerializer
from .models import Event
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from .mixins import EventListMixin, EventCreateMixin

logger = logging.getLogger("app")


class EventListCreateView(
    EventListMixin, EventCreateMixin, generics.GenericAPIView
):
    queryset = Event.objects.all().order_by("id")
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EventFilter


class RetrieveEventByIDView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "id"


class RetrieveEventsByUserIDView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        logger.debug(
            "retrieve_events_by_user_id called with user_id: %s", user_id
        )
        return Event.objects.filter(actor_id=user_id).order_by("id")


class RetrieveEventsByRepoIDView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        repo_id = self.kwargs["repo_id"]
        logger.debug(
            "retrieve_events_by_repo_id called with repo_id: %s", repo_id
        )
        return Event.objects.filter(repo_id=repo_id).order_by("id")
