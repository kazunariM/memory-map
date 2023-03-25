from django.shortcuts import render
from django.contrib.auth import authenticate, login

from rest_framework import authentication, exceptions
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response


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

# ログイン周り
class LoginView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        user = authenticate(request, username=request.data['username'], password=request.data['password'])
        if user:
            login(request, user)
            return Response({})
        else:
            raise exceptions.AuthenticationFailed('アカウントが見つかりませんでした')
        
