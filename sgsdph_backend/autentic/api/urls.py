from django.contrib import admin
from django.urls import path, include
from .api import trabajdor_api_view, rol_api_view, rol_detail_api_view, trabajador_detail_api_view

urlpatterns = [
    # path('api/autentic/', include('autentic.urls')),
    path('api/trabajadores/', trabajdor_api_view),
    path('api/trabajadores/<int:id>/', trabajador_detail_api_view),
    path('api/rol/', rol_api_view),
    path('api/rol/<int:id>/', rol_detail_api_view),
]