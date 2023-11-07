from django.shortcuts import render
from .models import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.
def calcular_importe_dieta(solicitud):

    aperitivos = solicitud.aperitivo.all()
    
    total_almuerzo = 0
    total_comida = 0

    # Realiza los cálculos basados en las palabras encontradas
    for i in aperitivos:
        if i.nombre == 'Almuerzo':
            total_almuerzo = solicitud.dias_estimados * 500
        elif i.nombre == 'Comida':
            total_comida = solicitud.dias_estimados * 500

    total_general = total_almuerzo + total_comida

    solicitud.importe_dieta = total_general
    solicitud.save()

    return total_general

def calcular_importe_desayuno(solicitud):

    aperitivos = solicitud.aperitivo.all()
    
    total_desayuno = 0

    # Realiza los cálculos basados en las palabras encontradas
    for i in aperitivos:
        if i.nombre == 'Desayuno':
            total_desayuno = solicitud.dias_estimados * 200

    total_general = total_desayuno

    solicitud.importe_desayuno = total_general
    solicitud.save()

    return total_general

@api_view(['POST'])
def firmarSolicitante(request, id, id_modelo):
    try:
        trabajador = Trabajador.objects.get(id=id)
        modelo = Modelo.objects.get(id=id_modelo)
        if request.method == "POST":
            print(trabajador.firma)
            modelo.firma_solicita = trabajador.firma
            
            modelo.save()
            return Response({'Message':'Firmado con exito'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message':'Trabajador no encontrado'}, status=status.HTT404)
    
@api_view(['POST'])
def firmarAutoriza(request, id, id_modelo):
    try:
        trabajador = Trabajador.objects.get(id=id)
        modelo = Modelo.objects.get(id=id_modelo)
        if request.method == "POST":
            modelo.firma_autoriza = trabajador.firma
            modelo.save()
            return Response({'Message':'Firmado con exito'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message':'Trabajador no encontrado'}, status=status.HTT404)

