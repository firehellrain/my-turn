from .aux_funcs import response

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from backend.models import Meeting

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def get_turn_list(request, meeting_id):
    """ 
        Solicita la lista de turnos de una reunión.
        Si la reunión dada no existe,
        devuelve un aviso de error.
    """
    try:
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        data = meeting.turn_set.all().values()
        return Response(data, status=status.HTTP_200_OK)
    except: return response("La reunión indicada no existe", status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
@permission_classes([IsAuthenticated])
def request_turn(request, meeting_id):
    """ 
        Solicita un turno a nombre del usuario dentro de una reunión.
        En caso de que ya tenga un turno pedido,
        devuelve un aviso de error.
    """
    try:
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        meeting.turn_set.create(turn_type=request.data.get('turn_type'), turn_user=request.user)
        return response("Turno solicitado correctamente", status.HTTP_200_OK)
    except: return response("El usuario ya tiene un turno pedido", status.HTTP_400_BAD_REQUEST)

@api_view(('POST',))
@permission_classes([IsAuthenticated])
def delete_turn(request, meeting_id):
    """ 
        Borra el turno del usuario dentro de una reunión.
        En caso de que no tenga un turno pedido,
        devuelve un aviso de error.
    """
    try:
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        meeting.turn_set.filter(pk=request.data.get('turn_id')).delete()
        return response("Turno eliminado correctamente", status.HTTP_200_OK)
    except: return response("El usuario no tiene un turno pedido", status.HTTP_400_BAD_REQUEST)