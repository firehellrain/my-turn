from .aux_funcs import response, generate_unique_meeting

from django.forms.models import model_to_dict
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from backend.models import Meeting

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
        En caso de que no sea moderador de una reunión,
        devuelve un aviso de error.
    """
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        meeting.delete()
        return response("Se ha cerrado correctamente la reunión", status.HTTP_200_OK)
    except: return response("El usuario no es moderador en ninguna reunión", status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
@permission_classes([IsAuthenticated])
def change_mod(request):
    """
        Cambia al moderador de la reunión actual.
        Si el usuario no es moderador de ninguna reunión,
        devuelve un error avisando. Si el usuario para asignar
        como moderador no existe, devuelve otro error.
    """
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        new_mod = User.objects.filter(username=request.data.get('new_mod'))
        if new_mod.exists():
            try:
                Meeting.objects.get(meeting_mod=new_mod)
                meeting.meeting_mod = new_mod
                meeting.save()
                return response("Moderador cambiado correctamente", status.HTTP_200_OK)
            except: return response("El usuario solicitado ya es moderador en otra reunión", status.HTTP_400_BAD_REQUEST)
        else: return response("El usuario solicitado no existe", status.HTTP_400_BAD_REQUEST)
    except: return response("El usuario no es moderador de ninguna reunión", status.HTTP_400_BAD_REQUEST)