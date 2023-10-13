from django.urls import path
from .api import solicitud_api_view

urlpatterns = [
    path('solicitudes/', solicitud_api_view),
]
