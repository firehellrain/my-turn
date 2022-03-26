from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict

from random import randint
from .models import Meeting

@api_view(('GET',))
@login_required
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
    meeting = get_object_or_404(Meeting, meeting_mod=request.user)
    data = {'meeting': model_to_dict(meeting)}
    return Response(data, status=status.HTTP_200_OK)

@api_view(('GET',))
@login_required
def access_meet(request, meeting_id):
    meeting = get_object_or_404(Meeting, meeting_id=meeting_id)
    data = {'meeting': model_to_dict(meeting)}
    return Response(data, status=status.HTTP_200_OK)

@api_view(('GET',))
@login_required
def create_meet(request):
    meeting = Meeting(meeting_id=randint(1111, 9999), meeting_mod=request.user, meeting_name=request.data.get('meetname'))
    meeting.save()
    data = {'meeting': model_to_dict(meeting)}
    return Response(data, status=status.HTTP_200_OK)
   
@api_view(('GET',))
@login_required
def delete_meet(request):
    meeting = Meeting.objects.get(meeting_mod=request.user)
    meeting.delete()
    return Response(status=status.HTTP_200_OK)
