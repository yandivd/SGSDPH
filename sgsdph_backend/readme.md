1- Levantar los contenedores (docker-compose start)
2-docker-compose exec sgsdph-backend python manage.py makemigrations
3-docker-compose exec sgsdph-backend python manage.py migrate
4-docker-compose exec sgsdph-backend python manage.py createsuperuser
