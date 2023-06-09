#<<<<<<< HEAD
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
from .serializers import EventSerializer, UserSerializer, LocationSerializer#ruki
from django.contrib.auth import authenticate, login#ruki
from .models import Event, Location, User#ruki
from rest_framework import authentication, exceptions#ruki
from django.middleware.csrf import get_token


class EventListAPIView(ListAPIView):#投稿10件取得
    queryset = Event.objects.all().order_by('-hold_date')[:10]
    serializer_class = EventSerializer

# イベントにロケーション情報をPOSTする(URLに記載されたuuidはそのままEventフィールドに適応される)
class LocationCreateAPIView(CreateAPIView):
    serializer_class = LocationSerializer

    def perform_create(self, serializer):
        event_uuid = self.kwargs.get('uuid')
        event = Event.objects.get(uuid=event_uuid)
        serializer.save(event=event)

# ログイン周り
class LoginView(APIView):
    serializer_class = UserSerializer


class EventLocationView(APIView):#投稿詳細
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

def post(self, request):#ruki
    user = authenticate(request, username=request.data['username'], password=request.data['password'])
    if user:
        login(request, user)
        return Response({})
    else:
        raise exceptions.AuthenticationFailed('アカウントが見つかりませんでした')
    

class GetCsrf(APIView):
    def get(self, request):
        return Response({'csrftoken':get_token(request)}, status=200)