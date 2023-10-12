from django.contrib import admin
from django.urls import path, include
from .api import trabajdor_api_view

urlpatterns = [
    # path('api/autentic/', include('autentic.urls')),
    path('api/trabajadores/', trabajdor_api_view),
]