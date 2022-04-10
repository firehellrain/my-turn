from django.http import HttpResponse
from random import randint
from backend.models import Meeting
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
import json

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
        Devuelve un código de reunión único con cuatro dígitos
    """
    while True:
        code = randint(1111, 9999)
        if Meeting.objects.filter(meeting_id=code).count() == 0: 
            break
    return code

def get_turn_list(meeting_code):
    """
        Devuelve la lista de turnos de una reunión
    """
    return Meeting.objects.get(meeting_id=meeting_code).turn_set.all().values()

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

def user_not_verified(self):
    """
        Devuelve un mensaje de error indicando que
        el usuario no ha sido verificado correctamente
    """
    self.send(text_data=json.dumps({
        'error': 'El usuario no ha sido identificado',
    }))

def verify_user(self, token_key):
    """
        Comprueba si el token de verificación es válido.
        En caso afirmativo, devuelve los datos del usuario.
        En caso contrario, devuelve un usuario anónimo.
    """
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()