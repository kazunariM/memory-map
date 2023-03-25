from django.shortcuts import render

from rest_framework.generics import ListAPIView
from .models import Event
from .serializers import EventSerializer
#from rest_framework import generics

#aa
class EventListAPIView(ListAPIView):#10件取得
    #queryset = Event.objects.all()
    queryset = Event.objects.all().order_by('-created_at')[:10]
    print(queryset[0].title)
    print(queryset[0].uuid)
    print(queryset[0].text)
    print(queryset[0].thumbnail )
    
    serializer_class = EventSerializer



