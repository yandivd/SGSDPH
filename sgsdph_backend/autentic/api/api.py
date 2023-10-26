from autentic.models import Trabajador, Rol
from .serializers import TrabajadorSerializer, RolSerializer
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
    
@api_view(['GET','PATCH'])
def trabajador_detail_api_view(request, id):
    try:
        trabajador = Trabajador.objects.get(id=id)

    except Exception as e:
        print(e)
        return Response({'message':'Trabajador no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        trabajador_serializer = TrabajadorSerializer(trabajador)
        return Response(trabajador_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        trabajador_serializer = TrabajadorSerializer(trabajador, data=request.data, partial=True)
        if trabajador_serializer.is_valid():
            trabajador_serializer.save()
            return Response(trabajador_serializer.data, status=status.HTTP_200_OK)
        return Response(trabajador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def rol_api_view(request):
    if request.method == 'GET':
        roles = Rol.objects.all()
        roles_serializer = RolSerializer(roles, many=True)
        return Response(roles_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def rol_detail_api_view(request, id):
    try:
        rol = Rol.objects.get(id=id)
        rol_serializer= RolSerializer(rol)
        return Response(rol_serializer.data, status=status.HTTP_200_OK)

    except:
        return Response({'message': 'Rol Inexistente'}, status=status.HTTP_404_NOT_FOUND)
    