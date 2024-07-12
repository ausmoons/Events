from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer
import logging

logger = logging.getLogger('app')

@api_view(['POST', 'GET'])
def events(request):
    if request.method == 'POST':
        event_type = request.data.get('type')
        if event_type not in ['PushEvent', 'ReleaseEvent', 'WatchEvent']:
            return Response({"error": "Invalid event type"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        event_type = request.query_params.get('type')
        if event_type:
            if event_type not in ['PushEvent', 'ReleaseEvent', 'WatchEvent']:
                return Response(
                    {"type": ["Select a valid choice. {} is not one of the available choices.".format(event_type)]},
                    status=status.HTTP_400_BAD_REQUEST
                )
            events = Event.objects.filter(type=event_type).order_by('id')
        else:
            events = Event.objects.all().order_by('id')
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def retrieve_event_by_id(request, event_id):
    try:
        logger.debug("retrieve_event_by_id called with id: %s", event_id)
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def retrieve_events_by_user_id(request, user_id):
    logger.debug("retrieve_events_by_user_id called with user_id: %s", user_id)
    events = Event.objects.filter(actor_id=user_id).order_by('id')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def retrieve_events_by_repo_id(request, repo_id):
    logger.debug("retrieve_events_by_repo_id called with repo_id: %s", repo_id)
    events = Event.objects.filter(repo_id=repo_id).order_by('id')
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
