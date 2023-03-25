#URLパターン
from django.urls import path
from .views import EventListAPIView

urlpatterns = [
    path('events',EventListAPIView.as_view()),#10件
    
    
]
