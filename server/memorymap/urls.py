#URLパターン
from django.urls import path
from .views import EventListAPIView, LocationCreateAPIView, LoginView

urlpatterns = [
    path('events', EventListAPIView.as_view()), # 10件
    path('location/<uuid:pk>', LocationCreateAPIView.as_view()), # イベントにロケーション情報をPOSTする
    path('auth/login/', LoginView.as_view()) # ログイン周り


]
