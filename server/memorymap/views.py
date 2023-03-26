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

#=======
# from django.shortcuts import render
# from django.contrib.auth import authenticate, login

# from rest_framework import authentication, exceptions
# from rest_framework.generics import ListAPIView, CreateAPIView
# from rest_framework.views import APIView
# from rest_framework.response import Response


#from .models import Event, Location, User
#from .serializers import EventSerializer, UserSerializer, LocationSerializer

#from rest_framework import generics

#class EventListAPIView(ListAPIView):#10件取得
    #queryset = Event.objects.all()
#>>>>>>> 5fc7721879c9438455f5e86746acfc0269f41182
class EventListAPIView(ListAPIView):#10件取得
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

#<<<<<<< HEAD
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

def post(self, request):#ruki
    user = authenticate(request, username=request.data['username'], password=request.data['password'])
    if user:
        login(request, user)
        return Response({})
    else:
        raise exceptions.AuthenticationFailed('アカウントが見つかりませんでした')
    
# =======
#     def post(self, request):
#         user = authenticate(request, username=request.data['username'], password=request.data['password'])
#         if user:
#             login(request, user)
#             return Response({})
#         else:
#             raise exceptions.AuthenticationFailed('アカウントが見つかりませんでした')
        
# >>>>>>> 5fc7721879c9438455f5e86746acfc0269f41182
