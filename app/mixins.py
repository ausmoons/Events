from rest_framework import mixins, generics
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer


class EventListMixin(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Event.objects.all().order_by("id")
    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class EventCreateMixin(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Event.objects.all().order_by("id")
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        event_type = request.data.get("type")
        if event_type not in ["PushEvent", "ReleaseEvent", "WatchEvent"]:
            return Response(
                {"error": "Invalid event type"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return self.create(request, *args, **kwargs)
