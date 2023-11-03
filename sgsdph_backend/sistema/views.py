from django.shortcuts import render
import re

# Create your views here.
def calcular_importe(solicitud):

    pattern = re.compile(r'desayuno|almuerzo|comida', re.IGNORECASE)
    # Encuentra todas las coincidencias en las observaciones
    matches = pattern.findall(solicitud.observaciones)
    
    total_desayuno = 0
    total_almuerzo = 0
    total_comida = 0

    # Realiza los cálculos basados en las palabras encontradas
    for match in matches:
        if match.lower() == 'desayuno':
            total_desayuno = solicitud.dias_estimadods * 250
        elif match.lower() == 'almuerzo':
            total_almuerzo = solicitud.dias_estimadods * 500
        elif match.lower() == 'comida':
            total_comida = solicitud.dias_estimadods * 500

    total_general = total_desayuno + total_almuerzo + total_comida

    solicitud.importe_dieta = total_general
    solicitud.save()

    return total_general

