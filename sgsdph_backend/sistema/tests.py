from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework import status
from .models import Modelo, Persona
from .api.serializers import ModeloSerializer
from .api.api import persona_api_view
from autentic.models import Trabajador

class PersonaTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        # self.user = Trabajador.objects.create_user(username='test', password='Test123')
        self.alergeno = Persona.objects.create(nombre='Persona', apellidos='Vargas Dom', ci='99111304021', eliminada=False)
    
    def listar_personas_ok(self):
        # Crea una solicitud GET simulada con el encabezado de autorización Bearer y el token válido
        request = self.factory.get('/api/sistema/personas/')

        # Llama a la vista y obtiene la respuesta
        response = persona_api_view(request)

        # Verifica que el código de estado de la respuesta sea 200
        self.assertEqual(response.status_code, 200)