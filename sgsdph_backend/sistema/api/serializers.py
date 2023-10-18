from rest_framework import serializers
from sistema.models import *

class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = '__all__'

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'

class AperitivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aperitivo
        fields = '__all__'

class UnidadOrganinzativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad_Organizativa
        fields = '__all__'
        