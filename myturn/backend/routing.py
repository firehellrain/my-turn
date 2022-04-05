from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/join_meet/(?P<meeting_id>\w+)', consumers.MeetingConsumer.as_asgi()),
]