from rest_framework import serializers
from sistema.models import *
from autentic.api.serializers import TrabajadorSerializer

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'

class CentroCostoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Centro_Costo
        fields = '__all__'

class AperitivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aperitivo
        fields = '__all__'

class UnidadOrganinzativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad_Organizativa
        fields = '__all__'
        
class ModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'

class CargoPresupuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo_al_Presupuesto
        fields = '__all__'

class SolicitudSerializerGET(serializers.ModelSerializer):
    solicitante = TrabajadorSerializer()
    unidad_organizativa = UnidadOrganinzativaSerializer()
    c_contable = CentroCostoSerializer()
    trabajador = PersonaSerializer()
    cargo_presupuesto  = CargoPresupuestoSerializer()
    autoriza = TrabajadorSerializer()
    aperitivo = AperitivoSerializer(many=True)
    parleg = PersonaSerializer()
    class Meta:
        model = Solicitud
        fields = '__all__'

class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = '__all__'

class ModeloSerializerGET(serializers.ModelSerializer):
    solicitudes = SolicitudSerializerGET(many=True)
    class  Meta:
        model = Modelo
        fields = '__all__'