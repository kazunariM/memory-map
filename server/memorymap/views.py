from django.shortcuts import render

from rest_framework.generics import ListAPIView, CreateAPIView
from .models import Event, Location, User
from .serializers import EventSerializer, UserSerializer, LocationSerializer
#from rest_framework import generics

class EventListAPIView(ListAPIView):#10件取得
    #queryset = Event.objects.all()
    queryset = Event.objects.all().order_by('uuid')[:10]
    serializer_class = EventSerializer

# イベントにロケーション情報をPOSTする(URLに記載されたuuidはそのままEventフィールドに適応される)
class LocationCreateAPIView(CreateAPIView):
    serializer_class = LocationSerializer

    def perform_create(self, serializer):
        event_uuid = self.kwargs.get('uuid')
        event = Event.objects.get(uuid=event_uuid)
        serializer.save(event=event)

# 以下、方針未決定のAPI
class UserListAPIView(ListAPIView): # uuidのみ取得
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.values('uuid',)
