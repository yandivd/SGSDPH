from django.db import models
from autentic.models import Trabajador, Unidad_Organizativa, Centro_Costo, Cargo_al_Presupuesto

# Create your models here.

class Persona(models.Model):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    ci = models.CharField(max_length=11)
    def __str__(self):
        return self.nombre
    
class Aperitivo(models.Model):
    nombre = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre

class Solicitud(models.Model):
    tipo_sol = models.IntegerField(null=True, blank=True)
    numero=models.IntegerField() #numero que sale en la columna No (lo asignas  tu en dependencia)
    solicitante=models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='Solicitante') #persona que solicitara el modelo (misma para todas las solicitudes)
    trabajador=models.ForeignKey(Persona, on_delete=models.CASCADE) #trabajador para el cual se hace la solicitud (por supuesto cambia)
    unidad_organizativa=models.ForeignKey(Unidad_Organizativa, on_delete=models.CASCADE) # misma para todos los trabajadores
    c_contable=models.ForeignKey(Centro_Costo, on_delete=models.CASCADE) # mismo para todos los trabajadores
    provincia=models.CharField(max_length=50) ## puedes establecerlo como pred a todos la del primer trabajador pero puede que sea distinta
    origen=models.CharField(max_length=50) #lo mismo de arriba
    prov_destino=models.CharField(max_length=50) #lo mismo de arriba
    destino=models.CharField(max_length=50) #lo mismo de arriba
    regreso=models.CharField(max_length=50) #lo mismo de arriba
    ### fechas dietas ###
    fecha_inicio_dieta=models.DateField(null=True, blank=True)
    fecha_final_dieta=models.DateField()
    ### fechas hospedajes ###
    fecha_inicio_hosp=models.DateField(null=True, blank=True)
    fecha_final_hosp=models.DateField(null=True, blank=True)
    ### fechas pasajes ###
    fecha_inicio_pasaj=models.DateField(null=True, blank=True)
    fecha_final_pasaj=models.DateField(null=True, blank=True)
    ### transportacion###
    transp_ida = models.CharField(max_length=50, null=True, blank=True)
    transp_vuelta = models.CharField(max_length=50, null=True, blank=True)
    ### estos que siguen son lo mismo para el modelo completo, una vez se pongan en la primera solicitud se pone automatico en las demas
    parleg=models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='Trabajador_parleg', null=True, blank=True)
    cargo_presupuesto=models.ForeignKey(Cargo_al_Presupuesto, on_delete=models.CASCADE)
    autoriza=models.ForeignKey(Trabajador, on_delete=models.CASCADE, related_name='Autoriza')
    estado=models.CharField(max_length=200)
    observaciones=models.CharField(max_length=500, blank=True, null=True)
    aperitivo = models.ManyToManyField(Aperitivo)
    labor=models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str(self.numero)

    class Meta:
        verbose_name="Solicitud"
        verbose_name_plural="Solicitudes"

class Modelo(models.Model):
    tipo_model = models.IntegerField(null=True, blank=True)
    nombre=models.CharField(max_length=50) #persona que crea el modelo
    solicitante=models.CharField(max_length=50)
    unidad_organizativa=models.CharField(max_length=100)
    c_contable=models.CharField(max_length=4)
    consec=models.CharField(max_length=8)
    solicitudes=models.ManyToManyField(Solicitud)
    parleg=models.CharField(max_length=200, blank=True, null=True)
    autoriza=models.CharField(max_length=50)
    cargo_presupuesto=models.CharField(max_length=50)
    observaciones = models.CharField(max_length=500, blank=True, null=True)
    estado=models.CharField(max_length=10)
    #campos nuevos del autoriza y el solicita
    cargo_autoriza=models.CharField(max_length=100)
    dependencia_autoriza=models.CharField(max_length=100)
    cargo_solicita=models.CharField(max_length=100)
    area_trabajo_solicita=models.CharField(max_length=100)
    labor=models.CharField(max_length=500, blank=True, null=True)
    fecha=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name="Modelo de Solicitudes"
        verbose_name_plural="Modelos de Solicitudes"

class PARLEG(models.Model):
    trabajador=models.ForeignKey(Persona, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.trabajador.nombre
    class Meta:
        verbose_name="Persona autorizada a recoger y liquidar el Efectivo"
        verbose_name="Personas autorizadas a recoger y liquidar el Efectivo"