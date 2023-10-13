from sistema.models import Solicitud
from .serializers import SolicitudSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET', 'POST'])
def solicitud_api_view(request):
    if request.method == 'GET':
        solicitudes = Solicitud.objects.all()
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