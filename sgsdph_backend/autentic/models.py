from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.
class CustomUser(AbstractUser):
    ci = models.CharField(max_length=11, verbose_name='Carnet de Identidad')
    # Cambia related_name para groups
    groups = models.ManyToManyField(
        Group,
        verbose_name=('groups'),
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='customuser_set',  # Cambia esto a un nombre único
        related_query_name='user',
    )
    
    # Cambia related_name para user_permissions
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=('user permissions'),
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_name='customuser_set',  # Cambia esto a un nombre único
        related_query_name='user',
    )

class Rol(models.Model):
    name = models.CharField(max_length=20, verbose_name='Nombre')
    class Meta:
        verbose_name="Rol"
        verbose_name_plural="Roles"
    def __str__(self):
        return self.name

class Unidad_Organizativa(models.Model):
    name=models.CharField(max_length=100, verbose_name='Nombre')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Unidad Organizativa"
        verbose_name_plural="Unidades Organizativas"

class Cargo_al_Presupuesto(models.Model):
    account=models.CharField(max_length=20, verbose_name='Cuenta')

    def __str__(self):
        return self.account
    class Meta:
        verbose_name="Cargo al Presupuesto"
        verbose_name_plural="Cargos al Presupuesto"
    
class Centro_Costo(models.Model):
    name=models.CharField(max_length=4, verbose_name='Nombre')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name="Centro de Costo"
        verbose_name_plural="Centros de Costo"

class Trabajador(CustomUser):
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, verbose_name='Rol')
    telf = models.CharField(max_length=10, verbose_name='Teléfono',null=True, blank=True)
    cargo = models.CharField(max_length=400, null=True, blank=True, verbose_name='Cargo')
    unidad_organizativa = models.ForeignKey(Unidad_Organizativa, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Unidad Organizativa')
    firma = models.ImageField(upload_to='Firmas', null=True, blank=True)
    dependencia = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.first_name+' '+self.last_name
    class Meta:
        verbose_name="Trabajador"
        verbose_name_plural="Trabajadores"
    