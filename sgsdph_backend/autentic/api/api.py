from autentic.models import Trabajador
from .serializers import TrabajadorSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET', 'POST'])
def trabajdor_api_view(request):
    if request.method == 'GET':
        trabajadores = Trabajador.objects.all()
        trabajadores_serializer = TrabajadorSerializer(trabajadores, many=True)
        return Response(trabajadores_serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        trabajadores_serializer = TrabajadorSerializer(data=request.data)
        if trabajadores_serializer.is_valid():
            trabajadores_serializer.save()
            return Response(trabajadores_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(trabajadores_serializer.errors, status=status.HTTP_400_BAD_REQUEST)