from django.contrib import admin
from sistema.models import Solicitud, Persona, Aperitivo, PARLEG, Modelo, Anticipo

# Register your models here.
admin.site.register(Solicitud)
admin.site.register(Modelo)
admin.site.register(Persona)
admin.site.register(Aperitivo)
admin.site.register(PARLEG)
admin.site.register(Anticipo)
