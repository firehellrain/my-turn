from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
@login_required
def index(request):
    data = {
        'prueba': 'Bienvenidos a MyTurn!',
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(('POST',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def loginUser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(('GET',))
@renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def logoutUser(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)