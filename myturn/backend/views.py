from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.http import HttpResponse

from random import randint
from .models import Meeting

@api_view(('GET',))
def index(request):
    data = {
        'prueba': 'Bienvenidos a MyTurn!',
    }
    return Response(data, status=status.HTTP_200_OK)

@api_view(('POST',))
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
def logoutUser(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@api_view(('GET',))
@login_required
def user_has_meet(request):
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El usuario no tiene una reunión creada", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@login_required
def access_meet(request, meeting_id):
    try:
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El código de reunión no es válido", status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
@login_required
def create_meet(request):
    try:
        meeting = Meeting(meeting_id=randint(1111, 9999), meeting_mod=request.user, meeting_name=request.data.get('meetname'))
        meeting.save()
        data = {'meeting': model_to_dict(meeting)}
        return Response(data, status=status.HTTP_200_OK)
    except: return response("El usuario ya tiene una reunión creada", status.HTTP_400_BAD_REQUEST)
   
@api_view(('GET',))
@login_required
def delete_meet(request):
    try:
        meeting = Meeting.objects.get(meeting_mod=request.user)
        meeting.delete()
        return Response(status=status.HTTP_200_OK)
    except:  return response("El usuario no tiene una reunión creada", status.HTTP_400_BAD_REQUEST)

# Devuelve una respuesta HTTP customizada
def response(text, code):
    respuesta = HttpResponse(text)
    respuesta.status_code = code
    return respuesta
