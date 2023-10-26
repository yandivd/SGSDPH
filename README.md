Para levantar el proyecto:
1-Clonar el repositorio
2-Construir y levantar los contenedores usando el comando "docker-compose up --build"
3-Una vez levantados entrar al sgsdph-backend con el comando "docker-compose exec sgsdph-backend sh"
4-Una vez ejecutado lo anterior ejecutar "python manage.py makemigrations", luego "python manage.py migrate", "python manage.py createsuperuser"(al hacer esto te guiara para que crees un superusuario) y por ultimo "python initdb.py" para inicializar algunos modelos necesarios.
5-Ahora entrar a localhost:8000/admin/ y entrar con las credenciales creadas anteriormente.
6-Crear Trabajadores con los distintos roles del sistema en dependencia lo que se quiera probar, asi como personas, cargos al presupuesto, centros contables etc.
7-Entrar a localhost:3000/ y utilizar el sistema

Nota: Cabe señalar que todo el proceso de dockerización se realizó con el objetivo de que el oponente pueda probar por sus medios el sistema, pues todos los datos reales están en la empresa y no pueden ser publicados.
