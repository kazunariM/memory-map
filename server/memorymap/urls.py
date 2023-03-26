from django.urls import path
from .views import EventLocationView#親と子
from .views import EventListAPIView#10件
#from .views import EventDetailView
from .views import EventCreateView#空のイベント
urlpatterns = [
    #path('event/<uuid:uuid>/location/', EventLocationView.as_view(), name='event-location'),
    path('events',EventListAPIView.as_view()),#10件
    path('event/<uuid:uuid>', EventLocationView.as_view(), name='event-location'),#詳細
    path('event',EventCreateView.as_view()),#空のイベント
]
