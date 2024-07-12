from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('events/', views.events, name='events'),  # POST and GET
    path('events/<int:event_id>/', views.retrieve_event_by_id,
         name='retrieve_event_by_id'),  # GET
    path('events/type/', views.retrieve_events_by_type,
         name='retrieve_events_by_type'),  # GET
    path('users/<int:user_id>/events/', views.retrieve_events_by_user_id,
         name='retrieve_events_by_user_id'),  # GET
    path('repos/<int:repo_id>/events/', views.retrieve_events_by_repo_id,
         name='retrieve_events_by_repo_id'),  # GET
]
