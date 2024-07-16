from django.urls import path
from app.views import EventListCreateView, RetrieveEventByIDView, RetrieveEventsByUserIDView, RetrieveEventsByRepoIDView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='events'),
    path('events/<int:id>/', RetrieveEventByIDView.as_view(), name='event-detail'),
    path('users/<int:user_id>/events/',
         RetrieveEventsByUserIDView.as_view(), name='user-events'),
    path('repos/<int:repo_id>/events/',
         RetrieveEventsByRepoIDView.as_view(), name='repo-events'),
]
