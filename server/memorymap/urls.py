#URLパターン
from django.urls import path
from .views import EventListAPIView, UserListAPIView, LocationCreateAPIView

urlpatterns = [
    path('events',EventListAPIView.as_view()), # 10件
    path('location/<uuid:pk>',LocationCreateAPIView.as_view()), # イベントにロケーション情報をPOSTする

    # 以下、方針未決定のAPI
    path('auth/login/',UserListAPIView.as_view()), # uuidのみ取得

]
