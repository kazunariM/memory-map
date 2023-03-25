#シリアライザー
from rest_framework import serializers
from .models import Event, Location, User

class EventSerializer(serializers.ModelSerializer):#10件
    class Meta:
        model = Event
        #fields = ('id','title','body','author','created_at')
        #fields = ('uuid','title','thumbnail')
        fields = ('uuid','title')

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

