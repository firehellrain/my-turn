from backend.aux_funcs.aux_generic import response
from backend.aux_funcs.aux_meeting import (
    get_meeting_from_code, 
    get_meeting_from_mod,
    user_is_mod,
    create_meeting,
    delete_meet_from_code,
    user_is_connected_to_meet,
    disconnect_user_from_meet
)
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def has_meet(request):
    """
        Comprueba si el usuario está moderando una reunión. 
        En caso afirmativo, envía los metadatos de la reunión,
        en caso contrario devuelve un aviso de error.
    """
    if user_is_mod(request.user):
        meeting = get_meeting_from_mod(request.user)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    else: return response("El usuario no es moderador en ninguna reunión", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def access_meet(request, meeting_id):
    """
        Comprueba si existe una reunión con el código dado. 
        En caso afirmativo, envía los metadatos de la reunión,
        en caso contrario devuelve un aviso de error.
    """
    try:
        meeting = get_meeting_from_code(meeting_id)
        if user_is_connected_to_meet(request.user):
            disconnect_user_from_meet(request.user)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El código de reunión no es válido", status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
@permission_classes([IsAuthenticated])
def create_meet(request):
    """
        Crea una reunión cuyo moderador será el usuario 
        que lo solicita, con el nombre dado por el mismo.
        En caso de que ya sea moderador de una reunión,
        devuelve un aviso de error.
    """
    if not user_is_mod(request.user):
        meeting = create_meeting(request.user, request.data.get('meetname'))
        if user_is_connected_to_meet(request.user):
            disconnect_user_from_meet(request.user)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    else: return response("El usuario es moderador en una reunión existente", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def delete_meet(request):
    """
        Borra la reunión que modera el usuario solicitante.
        En caso de que no sea moderador de una reunión,
        devuelve un aviso de error.
    """
    try:
        delete_meet_from_code(get_meeting_from_mod(request.user).meeting_id)
        return response("Se ha cerrado correctamente la reunión", status.HTTP_200_OK)
    except: return response("El usuario no es moderador en ninguna reunión", status.HTTP_400_BAD_REQUEST)