import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sgsdph_backend.settings')  # Reemplaza 'tu_proyecto' con el nombre de tu proyecto Django

import django
django.setup()

from autentic.models import Rol
from sistema.models import Aperitivo

rol = Rol(name='Crea')
rol.save()

rol = Rol(name='Solicitante')
rol.save()

rol = Rol(name='Autorizador')
rol.save()

rol = Rol(name='Economia')
rol.save()

rol = Rol(name='Administrador')
rol.save()

ap = Aperitivo(nombre='Desayuno')
ap.save()

ap = Aperitivo(nombre='Almuerzo')
ap.save()

ap = Aperitivo(nombre='Comida')
ap.save()