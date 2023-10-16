from django.urls import path
from .api import *

urlpatterns = [
    path('solicitudes/', solicitud_api_view),
    path('solicitudes/dph/', solicitud_dph_api_view),
    path('solicitudes/<int:id>/', solicitud_detail_api_view),

    path('solicitantes/', solicitante_api_view),
    path('autoriza/', autoriza_api_view),
    path('ccostos/', centro_costo_api_view),
    path('cargo_presupuesto/', cPresupuesto_api_view),
]
