from django.urls import path
from .api import *
from sistema.views import firmarAutoriza, firmarSolicitante

urlpatterns = [
    #solicitudes de dietas
    path('solicitudes/index/', solicitudes_todas_api_view),
    path('solicitudes/', solicitud_api_view),
    path('solicitudes/<int:id>/', solicitud_detail_api_view),

    #solicitudes de dietas pero solo las estand bye filtrndo por unidad organizativa
    path('solicitudes/no/<int:uo_id>/', solicitud_no_modelo_api_view),
    path('solicitudes/dph/no/<int:uo_id>/', solicitud_dph_no_modelo_api_view),

    #solicitudes de dietas pasaje y hospedaje 
    path('solicitudes/dph/', solicitud_dph_api_view),

    path('personas/', persona_api_view),
    path('personas/<int:id>/', persona_detail_api_view),

    path('solicitantes/', solicitante_api_view),
    path('autoriza/', autoriza_api_view),
    path('ccostos/', centro_costo_api_view),
    path('ccostos/<int:id>/', centro_costo_detail_api_view),
    path('cargo_presupuesto/', cPresupuesto_api_view),
    path('aperitivos/', aperitivo_api_view),

    path('unidad_organizativa/<int:id>/', unidad_organizativa_detail_api_view),
    path('unidad_organizativa/', unidad_organizativa_api_view),

    # este endpoint es para el get de las solicitudes de dietas
    # y para el post de cualquiera de las solicitudes ya que se le pasa 
    # el tipo de modelo por parametros
    path('modelo/dieta/', modelo_api_view),
    # este endpoint solo recive  un get y devuelve todas los modelos de dietas, pasajes y hospedaje
    path('modelo/dph/', modelo_dph_api_view),
    path('modelo/<int:id>/',modelo_detail_api_view),

    ### anticipos ###
    path('anticipo/', anticipo_api_view),
    path('anticipo/<int:id>/', anticipo_detail_api_view),

    path('firma_solicita/<int:id>/<int:id_modelo>/', firmarSolicitante),
    path('firma_autoriza/<int:id>/<int:id_modelo>/', firmarAutoriza),

]
