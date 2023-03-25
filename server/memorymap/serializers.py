#シリアライザー
from rest_framework import serializers
from .models import Event, Location, User

class EventSerializer(serializers.ModelSerializer):#10件
    class Meta:
        model = Event
        #fields = ('id','title','body','author','created_at')
        #fields = ('uuid','title','thumbnail')
        fields = ('uuid','title')

# 以下、方針未決定のAPI
class UserSerializer(serializers.ModelSerializer): # uuidのみ取得
    class Meta:
        model = User
        fields = ('uuid',)