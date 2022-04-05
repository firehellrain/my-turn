from .aux_funcs import response

from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def user_data(request):
    """ 
        Devuelve la información del usuario que lo solicita
    """
    data = model_to_dict(request.user)
    return Response(data, status=status.HTTP_200_OK)

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def logoutUser(request):
    """ 
        Cierra la sesión del usuario que lo solicita 
    """
    request.user.auth_token.delete()
    return response("Se ha cerrado correctamente la sesión", status.HTTP_200_OK)