from django.shortcuts import render

from rest_framework.generics import ListAPIView
from .models import Event, Location, User
from .serializers import EventSerializer,UserSerializer
#from rest_framework import generics

#aa
class EventListAPIView(ListAPIView):#10件取得
    #queryset = Event.objects.all()
    queryset = Event.objects.all().order_by('uuid')[:10]
    # print(queryset[0].title)
    # print(queryset[0].uuid)
    # print(queryset[0].text)
    # print(queryset[0].thumbnail )
    
    serializer_class = EventSerializer

# 以下、方針未決定のAPI
class UserListAPIView(ListAPIView): # uuidのみ取得
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.values('uuid',)
