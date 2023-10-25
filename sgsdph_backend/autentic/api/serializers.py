from autentic.models import Trabajador, Rol, Centro_Costo, Cargo_al_Presupuesto
from rest_framework import serializers

class TrabajadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trabajador
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Trabajador(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        # Elimina 'password' del diccionario de datos
        password = validated_data.pop('password', None)

        # Actualiza los otros campos
        instance = super().update(instance, validated_data)

        # Si se proporciona una nueva contraseña, actualízala
        if password is not None:
            instance.set_password(password)
            instance.save()

        return instance
    
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class CCostoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Centro_Costo
        fields = '__all__'

class Cargo_al_presupuestoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo_al_Presupuesto
        fields = '__all__'