from django.shortcuts import render

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

