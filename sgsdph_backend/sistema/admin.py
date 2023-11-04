from django.contrib import admin
from sistema.models import Solicitud, Persona, Aperitivo, PARLEG, Modelo, Anticipo

# Register your models here.
class SolicitudAdmin(admin.ModelAdmin):
    list_display = ('solicitante', 'fecha_inicio_dieta','estado')

class ModeloAdmin(admin.ModelAdmin):
    list_display = ('consec','fecha')
    list_filter = ('unidad_organizativa',)
    search_fields = ('consec', 'fecha')

admin.site.register(Solicitud, SolicitudAdmin)
admin.site.register(Modelo, ModeloAdmin)
admin.site.register(Persona)
admin.site.register(Aperitivo)
admin.site.register(PARLEG)
admin.site.register(Anticipo)
