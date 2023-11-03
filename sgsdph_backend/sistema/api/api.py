from sistema.models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from autentic.models import *
from autentic.api.serializers import *

#### Solicitudes de Dietas ####
@api_view(['GET', 'POST'])
def solicitud_api_view(request):
    if request.method == 'GET':
        solicitudes = Solicitud.objects.all().filter(tipo_sol=1)
        serializer = SolicitudSerializerGET(solicitudes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        sol_serializer = SolicitudSerializer(data=request.data)
        if sol_serializer.is_valid():
            solicitud=sol_serializer.save()

            ### calcular el importe_dieta ###
            from sistema.views import calcular_importe
            calcular_importe(solicitud)

            ### fin ###

            return Response(sol_serializer.data, status=status.HTTP_201_CREATED)
        return Response(SolicitudSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def solicitud_no_modelo_api_view(request, uo_id):
    uo = Unidad_Organizativa.objects.get(id=uo_id)
    # id_user = request.user.id
    # print(id_user)
    # uo_test = Trabajador.objects.get(id=id_user).unidad_organizativa
    # print(uo_test)
    solicitudes = Solicitud.objects.filter(tipo_sol=1, unidad_organizativa=uo, estado='StandBye')
    solicitudes_serializer = SolicitudSerializerGET(solicitudes, many=True)
    return Response(solicitudes_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def solicitud_dph_no_modelo_api_view(request, uo_id):
    uo = Unidad_Organizativa.objects.get(id=uo_id)
    # id_user = request.user.id
    # print(id_user)
    # uo_test = Trabajador.objects.get(id=id_user).unidad_organizativa
    # print(uo_test)
    solicitudes = Solicitud.objects.filter(tipo_sol=2, unidad_organizativa=uo, estado='StandBye')
    solicitudes_serializer = SolicitudSerializerGET(solicitudes, many=True)
    return Response(solicitudes_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','PUT','DELETE','PATCH'])
def solicitud_detail_api_view(request, id):
    try:
        solicitud = Solicitud.objects.get(id=id)
    except Exception as e:
        print(e)
        return Response({'message':'Solicitud no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    if solicitud:
        if request.method == 'GET':
            serializer = SolicitudSerializerGET(solicitud)
            return Response(serializer.data, status=status.HTTP_200_OK)
                
        elif request.method == 'PUT':
            serializer = SolicitudSerializer(solicitud, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(SolicitudSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        elif request.method == 'DELETE':
            solicitud.delete()
            return Response({'message':'Solicitud eliminada correctamente'}, status=status.HTTP_204_NO_CONTENT)

        elif request.method == 'PATCH':
            producto_serializer = SolicitudSerializer(solicitud, data=request.data, partial=True)
            if producto_serializer.is_valid():
                producto_serializer.save()
                return Response(producto_serializer.data, status=status.HTTP_200_OK)
            return Response(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message':'Error, no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
#### Solicitudes de Dietas, passajes y hospedajes ####
@api_view(['GET', 'POST'])
def solicitud_dph_api_view(request):
    if request.method == 'GET':
        solicitudes = Solicitud.objects.all().filter(tipo_sol=2)
        serializer = SolicitudSerializerGET(solicitudes, many=True)
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
def centro_costo_detail_api_view(request, id):
    try:
        ccosto= Centro_Costo.objects.get(id=id)
        if request.method == 'GET':
            ccosto_serializer = CCostoSerializer(ccosto)
            return Response(ccosto_serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Centro de Costo no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    

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
    
@api_view(['GET'])
def persona_api_view(request):
    if request.method == 'GET':
        personas = Persona.objects.filter(eliminada=False)
        personas_serializer = PersonaSerializer(personas, many=True)
        return Response(personas_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def persona_detail_api_view(request, id):
    try:
        persona = Persona.objects.get(id=id)
        if request.method == 'GET':
            persona_serializer = PersonaSerializer(persona)
            return Response(persona_serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Trabajador inexistente'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def aperitivo_api_view(request):
    if request.method == 'GET':
        apertivos = Aperitivo.objects.all()
        aperitivos_serializer = AperitivoSerializer(apertivos, many=True)
        return Response(aperitivos_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def unidad_organizativa_api_view(request):
    uo = Unidad_Organizativa.objects.all()
    uo_serializer = UnidadOrganinzativaSerializer(uo, many=True)
    return Response(uo_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def unidad_organizativa_detail_api_view(request, id):
    try:
        uo = Unidad_Organizativa.objects.get(id=id)
        if request.method == 'GET':
            uo_serializer = UnidadOrganinzativaSerializer(uo)
            return Response(uo_serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Unidad Organizativa Inexistente'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET','POST'])
def modelo_api_view(request):
    if request.method == 'GET':
        modelos = Modelo.objects.all()
        modelos_serializer = ModeloSerializerGET(modelos, many=True)
        return Response(modelos_serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        modelo_serializer = ModeloSerializer(data=request.data)
        if modelo_serializer.is_valid():

            # acceder a las solicitudes
            solicitudes = request.data.get("solicitudes", [])
            for i in solicitudes:
                solicitud = Solicitud.objects.get(id=i)
                solicitud.estado = 'Ok'
                solicitud.save()

            modelo = modelo_serializer.save()
            try:
                nombre_completo = modelo.nombre
                # Divide la cadena en palabras
                palabras = nombre_completo.split()

                # Los dos últimos elementos son los apellidos
                apellidos = ' '.join(palabras[-2:])

                # El resto de las palabras es el nombre
                nombre = ' '.join(palabras[:-2])
                # Busca al trabajador por nombre y apellido
                print('Nombre: '+ nombre)
                print('Apellidos: '+ apellidos)
                creador = Trabajador.objects.filter(first_name=nombre, last_name=apellidos).first()
                modelo.firma_crea = creador.firma
                modelo.save()
                print('Firmado por el creador')
            except Exception as e:
                print(e)
            return Response(modelo_serializer.data, status=status.HTTP_201_CREATED)
        return Response(modelo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def modelo_dph_api_view(request):
    if request.method == 'GET':
        modelos = Modelo.objects.all().filter(tipo_model=2)
        modelos_serializer = ModeloSerializerGET(modelos, many=True)
        return Response(modelos_serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET','PUT','PATCH','DELETE'])
def modelo_detail_api_view(request, id):
    try:
        modelo = Modelo.objects.get(id=id)
        if request.method == 'GET':
            modelo_serializer = ModeloSerializerGET(modelo)
            return Response(modelo_serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'PATCH':
            modelo_serializer = ModeloSerializer(modelo, data=request.data, partial=True)
            if modelo_serializer.is_valid():
                modelo_serializer.save()
                return Response(modelo_serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'message':'Modelo no encontrado en el sistema'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def solicitudes_todas_api_view(request):
    if request.method == 'GET':
        solicitudes = Solicitud.objects.all()
        solicitudes_serializer = SolicitudSerializerGET(solicitudes, many=True)
        return Response(solicitudes_serializer.data, status=status.HTTP_200_OK)
