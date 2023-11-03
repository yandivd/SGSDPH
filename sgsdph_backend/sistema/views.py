from django.shortcuts import render

# Create your views here.
def calcular_importe(solicitud):

    aperitivos = solicitud.aperitivo.all()
    
    total_desayuno = 0
    total_almuerzo = 0
    total_comida = 0

    # Realiza los cálculos basados en las palabras encontradas
    for i in aperitivos:
        if i.nombre == 'Desayuno':
            total_desayuno = solicitud.dias_estimados * 200
        elif i.nombre == 'Almuerzo':
            total_almuerzo = solicitud.dias_estimados * 500
        elif i.nombre == 'Comida':
            total_comida = solicitud.dias_estimados * 500

    total_general = total_desayuno + total_almuerzo + total_comida
    total_alimentacion = total_almuerzo + total_comida

    solicitud.importe_dieta = total_general
    solicitud.save()

    return total_general

