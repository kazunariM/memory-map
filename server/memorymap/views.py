from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Event, Location

from django.shortcuts import render#不明
from rest_framework.generics import ListAPIView#直近10件
from .serializers import EventSerializer#10件
from .serializers import EventDSerializer#詳細
from .serializers import EventCSerializer#空のイベントを作成
from rest_framework.generics import RetrieveAPIView#投稿の詳細
from rest_framework.generics import CreateAPIView#空のイベントを作成

class EventListAPIView(ListAPIView):#10件取得
    queryset = Event.objects.all().order_by('uuid')[:10]
    serializer_class = EventSerializer



'''
class EventLocationView(APIView):#親子関係の子を引き連れる
    def get(self, request, uuid):
        event = get_object_or_404(Event, uuid=uuid)
        locations = Location.objects.filter(event=event)
        location_data = []
        for location in locations:
            location_data.append({
                "title": location.title,
                "lat": location.lat,
                "lon": location.lon
            })
        data = {
            "title": event.title,
            "text": event.text,
            "locations": location_data
        }
        return Response(data)
'''
class EventLocationView(APIView):#詳細
    def get(self, request, uuid):
        event = get_object_or_404(Event, uuid=uuid)
        locations = Location.objects.filter(event=event)
        serializer = EventDSerializer(event)
        data = serializer.data
        data["locations"] = [{
            "title": location.title,
            "lat": location.lat,
            "lon": location.lon
        } for location in locations]
        return Response(data)






class EventCreateView(CreateAPIView):#空のイベント作成
    queryset = Event.objects.all()
    serializer_class = EventCSerializer