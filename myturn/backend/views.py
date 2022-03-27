from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.http import HttpResponse

from random import randint
from .models import Meeting

### Funciones auxiliares ###

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

### Vistas de autentificación ###

@api_view(('POST',))
def loginUser(request):
    """
        Comprueba si las credenciales dadas son válidas.
        En caso afirmativo inicia la sesión al usuario,
        en caso contraro devuelve un error
    """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(status=status.HTTP_200_OK)
    else:
        return response("Las credenciales de inicio de sesión no son válidas", status.HTTP_404_NOT_FOUND)

@api_view(('GET',))
def logoutUser(request):
    """ 
        Cierra la sesión del usuario que lo solicita 
    """
    logout(request)
    return Response(status=status.HTTP_200_OK)

### Vistas de control de reuniones ###

@api_view(('GET',))
@login_required
def user_has_meet(request):
    """
        Comprueba si el usuario está moderando una reunión. 
        En caso afirmativo, envía los metadatos de la reunión,
        en caso contrario devuelve un aviso de error.
    """
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El usuario no es moderador en ninguna reunión", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@login_required
def access_meet(request, meeting_id):
    """
        Comprueba si existe una reunión con el código dado. 
        En caso afirmativo, envía los metadatos de la reunión,
        en caso contrario devuelve un aviso de error.
    """
    try:
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El código de reunión no es válido", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@login_required
def create_meet(request):
    """
        Crea una reunión cuyo moderador será el usuario 
        que lo solicita, con el nombre dado por el mismo.
        En caso de que ya sea moderador de una reunión,
        devuelve un aviso de error.
    """
    try:
        meeting = Meeting(meeting_id=generate_unique_meeting(), meeting_mod=request.user, meeting_name=request.data.get('meetname'))
        meeting.save()
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El usuario es moderador en una reunión existente", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@login_required
def delete_meet(request):
    """
        Borra la reunión que modera el usuario solicitante.
    """
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        meeting.delete()
        return Response(status=status.HTTP_200_OK)
    except:  return response("El usuario no es moderador en ninguna reunión", status.HTTP_400_BAD_REQUEST)

