
from rest_framework import serializers

from .models import Event, Location, User

class EventLSerializer(serializers.ModelSerializer):#投稿詳細
    class Meta:
        model = Location
        fields = ('title', 'lat', 'lon')


class EventDSerializer(serializers.ModelSerializer):#投稿詳細
    locations = EventLSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'text', 'locations')



class EventSerializer(serializers.ModelSerializer):#投稿10件
    class Meta:
        model = Event
        
        fields = ('uuid','title','thumbnail','lat','lon')
class EventCSerializer(serializers.ModelSerializer):#投稿空のイベント作成
    class Meta:
        model = Event
        fields = '__all__'
class LocationSerializer(serializers.ModelSerializer): # Location情報を取得
    class Meta:
        model = Location
        fields = '__all__'
        read_only_fields = ('uuid','event')

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, style={'input_type': 'password'})

    class Meta:
        fields = ('username','password')

