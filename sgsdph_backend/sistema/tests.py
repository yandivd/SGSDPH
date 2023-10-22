from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework import status
from .models import *
from .api.serializers import ModeloSerializer
from .api.api import *
from autentic.models import *

class SolicitudAPITestCase(TestCase):
    def setUp(self):
        
        self.factory = APIRequestFactory()
        self.rol = Rol.objects.create(name='Crea')
        # Crear objetos de prueba necesarios, por ejemplo, Trabajadores, Unidades Organizativas, etc.
        self.unidad_organizativa = Unidad_Organizativa.objects.create(name="Ejemplo Unidad Organizativa")
        self.trabajador = Trabajador.objects.create(rol=self.rol, telf='76857465', cargo='DAWLL', unidad_organizativa=self.unidad_organizativa, dependencia='Direccion Territoria')
        self.cargo_presupuesto = Cargo_al_Presupuesto.objects.create(account="Ejemplo Cuenta Presupuesto")
        self.persona = Persona.objects.create(nombre="Ejemplo Persona", apellidos="Ejemplo Apellidos", ci="1234567890")
        self.c_contable = Centro_Costo.objects.create(name='AR25')
        self.parleg = PARLEG.objects.create(trabajador=self.persona)
        self.aperitivo1 = Aperitivo(nombre='Aper1') 
        self.aperitivo2 = Aperitivo(nombre='Aper2') 

    # def test_crear_solicitud(self):
    #     datos_solicitud = {
    #         "tipo_sol":1,
    #         "numero":2,
    #         "solicitante":self.trabajador,
    #         "trabajador":self.persona,
    #         "unidad_organizativa":self.unidad_organizativa,
    #         "fecha_inicio_dieta":"2023-10-18",
    #         "fecha_final_dieta":"2023-10-20",
    #         "labor":"rggt",
    #         "observaciones":"dfg",
    #         "c_contable":self.c_contable,
    #         "provincia":"La Habana",
    #         "origen":"Centro Habana",
    #         "prov_destino":"La Habana",
    #         "destino":"La Habana Vieja",
    #         "regreso":"Mayabeque",
    #         "parleg":self.parleg,
    #         "cargo_presupuesto":self.cargo_presupuesto,
    #         "autoriza":self.trabajador,
    #         "estado":"StandBye",
    #         "aperitivo":[self.aperitivo1, self.aperitivo2]
    #     }

    #     request = self.factory.post('/api/sistema/solicitudes/', datos_solicitud)
    #     response = solicitud_api_view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_obtener_solicitudes(self):
        request = self.factory.get('/api/sistema/solicitudes/')
        response = solicitud_api_view(request)
        self.assertEqual(response.status_code, 200)
        # Puedes agregar aserciones adicionales para verificar la respuesta, como la cantidad de solicitudes devueltas.


class PersonaTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        # self.user = Trabajador.objects.create_user(username='test', password='Test123')
        self.alergeno = Persona.objects.create(nombre='Persona', apellidos='Vargas Dom', ci='99111304021', eliminada=False)
    
    def test_listar_personas_ok(self):
        # Crea una solicitud GET simulada con el encabezado de autorización Bearer y el token válido
        request = self.factory.get('/api/sistema/personas/')

        # Llama a la vista y obtiene la respuesta
        response = persona_api_view(request)

        # Verifica que el código de estado de la respuesta sea 200
        self.assertEqual(response.status_code, 200)