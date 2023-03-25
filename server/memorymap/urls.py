#URLパターン
from django.urls import path
from .views import EventListAPIView, UserListAPIView

urlpatterns = [
    path('events',EventListAPIView.as_view()), # 10件

    # 以下、方針未決定のAPI
    path('auth/login/',UserListAPIView.as_view()), # uuidのみ取得


]
