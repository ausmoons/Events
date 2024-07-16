import logging
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event
from .serializers import EventSerializer
from .filters import EventFilter

logger = logging.getLogger('app')


class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('id')
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EventFilter

    def create(self, request, *args, **kwargs):
        event_type = request.data.get('type')
        if event_type not in ['PushEvent', 'ReleaseEvent', 'WatchEvent']:
            return Response({"error": "Invalid event type"}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


@api_view(['GET'])
def retrieve_event_by_id(request, event_id):
    try:
        logger.debug("retrieve_event_by_id called with id: %s", event_id)
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)


class RetrieveEventsByUserIDView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        logger.debug(
            "retrieve_events_by_user_id called with user_id: %s", user_id)
        return Event.objects.filter(actor_id=user_id).order_by('id')


class RetrieveEventsByRepoIDView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        repo_id = self.kwargs['repo_id']
        logger.debug(
            "retrieve_events_by_repo_id called with repo_id: %s", repo_id)
        return Event.objects.filter(repo_id=repo_id).order_by('id')
