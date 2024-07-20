from django.contrib import admin
from .models import Event


class EventAdmin(admin.ModelAdmin):
    list_display = ('type', 'public', 'repo_id', 'actor_id')
    list_filter = ('type', 'public')
    search_fields = ('repo_id', 'actor_id')


admin.site.register(Event, EventAdmin)
