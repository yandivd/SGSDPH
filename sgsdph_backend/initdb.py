import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sgsdph_backend.settings')  # Reemplaza 'tu_proyecto' con el nombre de tu proyecto Django

import django
django.setup()

from autentic.models import Rol

rol = Rol(name='Creador')
rol.save()

rol = Rol(name='Solicitante')
rol.save()

rol = Rol(name='Autorizador')
rol.save()