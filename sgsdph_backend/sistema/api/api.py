from sistema.models import Solicitud
from .serializers import SolicitudSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from autentic.models import Trabajador, Rol, Centro_Costo, Cargo_al_Presupuesto
from autentic.api.serializers import TrabajadorSerializer, CCostoSerializer, Cargo_al_presupuestoSerializer

#### Solicitudes de Dietas ####
@api_view(['GET', 'POST'])
def solicitud_api_view(request):
    if request.method == 'GET':
        solicitudes = Solicitud.objects.all().filter(tipo_sol=1)
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = SolicitudSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(SolicitudSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE','PATCH'])
def solicitud_detail_api_view(request, id):
    try:
        solicitud = Solicitud.objects.get(id=id)
    except Exception as e:
        print(e)
        return Response({'message':'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = SolicitudSerializer(solicitud)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'PUT':
        serializer = SolicitudSerializer(solicitud, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(SolicitudSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.methodo == 'DELETE':
        solicitud.delete()
        return Response({'message':'Solicitud eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PATCH':
        producto_serializer = SolicitudSerializer(solicitud, data=request.data, partial=True)
        if producto_serializer.is_valid():
            producto_serializer.save()
            return Response(producto_serializer.data, status=status.HTTP_200_OK)
        return Response(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#### Solicitudes de Dietas, passajes y hospedajes ####
@api_view(['GET', 'POST'])
def solicitud_dph_api_view(request):
    if request.method == 'GET':
        solicitudes = Solicitud.objects.all().filter(tipo_sol=2)
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = SolicitudSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(SolicitudSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def solicitante_api_view(request):
    if request.method == 'GET':
        rol = Rol.objects.get(name='Solicitante')
        solicitantes = Trabajador.objects.all().filter(rol = rol)
        serializer = TrabajadorSerializer(solicitantes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def centro_costo_api_view(request):
    if request.method == 'GET':
        centro_costo = Centro_Costo.objects.all()
        ccosto_serializer = CCostoSerializer(centro_costo, many=True)
        return Response(ccosto_serializer.data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
def cPresupuesto_api_view(request):
    if request.method == 'GET':
        cargo_al_presupuesto = Cargo_al_Presupuesto.objects.all()
        cpresup_serializer = Cargo_al_presupuestoSerializer(cargo_al_presupuesto, many=True)
        return Response(cpresup_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def autoriza_api_view(request):
    if request.method == 'GET':
        rol = Rol.objects.get(name='Autorizador')
        solicitantes = Trabajador.objects.all().filter(rol = rol)
        serializer = TrabajadorSerializer(solicitantes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)