from django.http import HttpResponse
from random import randint
from backend.models import Meeting
from django.contrib.auth.models import User

def response(text, code):
    """
        Devuelve una respuesta HTTP customizada
        con el texto y el código dados
    """
    response = HttpResponse(text)
    response.status_code = code
    return response

def generate_unique_meeting():
    """ 
        Devuelve un código de reunión único 
    """
    while True:
        code = randint(1111, 9999)
        if Meeting.objects.filter(meeting_id=code).count() == 0: 
            break
    return code

def create_meeting(id, name, mod):
    """
        Crea una reunión con la id, el nombre de reunión y el moderador dados
    """
    return Meeting.objects.create(meeting_id=id, meeting_name=name, meeting_mod=mod)

def create_user(name, pw):
    """
        Crea un usuario con el nombre y la contraseña dados
    """
    return User.objects.create_user(username=name, password=pw)