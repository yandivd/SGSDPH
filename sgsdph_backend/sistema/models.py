from django.db import models
from autentic.models import Trabajador, Unidad_Organizativa, Centro_Costo, Cargo_al_Presupuesto

# Create your models here.

class Solicitud(models.Model):
    numero=models.IntegerField()
    solicitante=models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='Solicitante')
    trabajador=models.ForeignKey(Trabajador, on_delete=models.CASCADE)
    unidad_organizativa=models.ForeignKey(Unidad_Organizativa, on_delete=models.CASCADE)
    c_contable=models.ForeignKey(Centro_Costo, on_delete=models.CASCADE)
    provincia=models.CharField(max_length=50)
    origen=models.CharField(max_length=50)
    prov_destino=models.CharField(max_length=50)
    destino=models.CharField(max_length=50)
    regreso=models.CharField(max_length=50)
    fecha_inicio=models.DateField()
    fecha_final=models.DateField()
    #nuevos models add
    parleg=models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='Trabajador_parleg', null=True, blank=True)
    cargo_presupuesto=models.ForeignKey(Cargo_al_Presupuesto, on_delete=models.CASCADE)
    autoriza=models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='Autoriza')
    estado=models.CharField(max_length=200)
    observaciones=models.CharField(max_length=500, blank=True, null=True)
    labor=models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str(self.numero)

    class Meta:
        verbose_name="Solicitud"
        verbose_name_plural="Solicitudes"
