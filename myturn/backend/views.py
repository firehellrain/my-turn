from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
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

### Vistas de la aplicación ###

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def user_data(request):
    """ 
        Cierra la sesión del usuario que lo solicita 
    """
    data = model_to_dict(request.user)
    return Response(data, status=status.HTTP_200_OK)

@api_view(('GET',))
def logoutUser(request):
    """ 
        Cierra la sesión del usuario que lo solicita 
    """
    request.user.auth_token.delete()
    return response("Se ha cerrado correctamente la sesión", status.HTTP_200_OK)

@api_view(('GET',))
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def delete_meet(request):
    """
        Borra la reunión que modera el usuario solicitante.
    """
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        meeting.delete()
        return response("Se ha cerrado correctamente la reunión", status.HTTP_200_OK)
    except: return response("El usuario no es moderador en ninguna reunión", status.HTTP_400_BAD_REQUEST)

