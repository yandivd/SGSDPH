from django.shortcuts import render
from django.contrib.auth import login, get_backends
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView
from .models import Trabajador
from .api.serializers import *

# Create your views here.
def authenticate(username=None, password=None):
    print('autenticate')
    try:
        # Verificar en el modelo User
        user = Trabajador.objects.get(username=username)
        print(user)
        if user:
            print(user.check_password(password))
            if user.check_password(password):
                return user
    except Exception as e:
        print(e)

    return None

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            print(username)
            print(password)
            user = authenticate(username=username, password=password)
        else:
            return Response({'message': 'Usuario o contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            if user.is_active == False:
                return Response({'message': 'Usuario inactivo'}, status=status.HTTP_401_UNAUTHORIZED)
            user.backend = get_backends()[0].__class__.__module__ + '.' + get_backends()[0].__class__.__name__
            login(request, user, backend=user.backend)
            return Response({
                        'token': super(LoginAPI, self).post(request, format=None).data['token'],
                        'user': TrabajadorSerializer(user).data,
                        'isAdmin': user.is_staff,
                        'message': 'Inicio de Sesión con Éxito',
                    }, status=status.HTTP_201_CREATED)
        else:
                return Response({'message': 'Usuario o contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)