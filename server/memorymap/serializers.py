###########33新
###########33新
###########33新
from rest_framework import serializers
from .models import Event, Location

'''
class EventLSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('lat', 'lon')
        #fields = ('title', 'lat', 'lon')



class EventDSerializer(serializers.ModelSerializer):
    location_set = EventLSerializer(many=True)
    #location_set = EventLSerializer(many=True,read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'text', 'location_set')
'''
class EventLSerializer(serializers.ModelSerializer):#詳細
    class Meta:
        model = Location
        fields = ('title', 'lat', 'lon')


class EventDSerializer(serializers.ModelSerializer):#詳細
    locations = EventLSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('title', 'text', 'locations')


class EventSerializer(serializers.ModelSerializer):#10件
    class Meta:
        model = Event
        #fields = ('id','title','body','author','created_at')
        fields = ('uuid','title','thumbnail')
class EventCSerializer(serializers.ModelSerializer):#空のイベント作成
    class Meta:
        model = Event
        fields = '__all__'