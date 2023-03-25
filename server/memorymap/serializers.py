#シリアライザー
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):#10件
    class Meta:
        model = Event
        #fields = ('id','title','body','author','created_at')
        #fields = ('uuid','title','thumbnail')
        fields = ('uuid','title')
