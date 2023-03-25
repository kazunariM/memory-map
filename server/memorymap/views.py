from django.shortcuts import render

from rest_framework.generics import ListAPIView
from .models import Event
from .serializers import EventSerializer
from rest_framework import generics


class EventListAPIView(generics.ListAPIView):#10件取得
    queryset = Event.objects.all()
    serializer_class = EventSerializer

