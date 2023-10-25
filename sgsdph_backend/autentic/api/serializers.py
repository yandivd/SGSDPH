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
        # Verificar el método HTTP de la solicitud
        request = self.context.get('request')
        if request.method == 'POST':
            # Si es una solicitud POST, actualiza la contraseña
            updated_user = super().update(instance, validated_data)
            updated_user.set_password(validated_data['password'])
            updated_user.save()
        else:
            # Si es una solicitud PATCH, actualiza los otros campos sin cambiar la contraseña
            updated_user = super().update(instance, validated_data)

        return updated_user
    
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