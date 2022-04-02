import json
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from asgiref.sync import async_to_sync
from .models import Meeting, MeetingUserList
from django.contrib.auth.models import User

from .views.aux_funcs import user_not_verified, verify_user

class MeetingConsumer(WebsocketConsumer):

    def connect(self):
        self.meeting_code = self.scope['url_route']['kwargs']['meeting_id']
        self.meeting = Meeting.objects.get(meeting_id=self.meeting_code)
        self.user = AnonymousUser()

        # Unirse a la reunión
        async_to_sync(self.channel_layer.group_add)(
            self.meeting_code,
            self.channel_name
        )

        self.accept()
    
    def disconnect(self, close_code):
        MeetingUserList.objects.filter(user=self.user).delete()
        async_to_sync(self.channel_layer.group_discard)(
            self.meeting_code,
            self.channel_name
        )

    # Recibir mensaje del WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        
        try:
            request = text_data_json['request']
        
            if request == "get_turn_list":
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': request,
                        'token_key': text_data_json['token_key']
                    }
                )
            if request == "get_user_list":
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': request,
                    }
                )
            elif request == "add_turn":
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': request,
                        'turn_type': text_data_json['turn_type'],
                    }
                )
            elif request == "delete_turn":
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': request,
                        'turn_id': text_data_json['turn_id'],
                    }
                )
        except:
            self.send(text_data=json.dumps({
                'error': 'Peticion denegada, algo salio mal.'
            }))
            
    def get_turn_list(self, event):
        """ 
            Solicita la lista de turnos de una reunión.
            Se asume que la reunión dada siempre va a existir.
        """
        user = verify_user(self, event['token_key'])

        if user.is_authenticated:
            if self.user.is_anonymous:
                self.user = user
                self.connexion = MeetingUserList.objects.create(meeting_id=self.meeting, user=self.user)
            self.send(text_data=json.dumps({
                'turn_list': list(self.meeting.turn_set.all().values()),
            }))
        else:
            user_not_verified(self)
    
    def get_user_list(self, event):
        """ 
            Solicita la lista de usuarios de una reunión.
            Se asume que la reunión dada siempre va a existir.
        """
        user_list = MeetingUserList.objects.filter(meeting_id=self.meeting).values_list('user', flat=True)
        username_list = {}

        for u in user_list:
            username_list[u] = User.objects.get(pk=u).first_name + " " + User.objects.get(pk=u).last_name

        if self.user.is_authenticated:
            self.send(text_data=json.dumps({
                'user_list': username_list
            }))
        else:
            user_not_verified(self)

    def add_turn(self, event):
        """ 
            Solicita un turno a nombre del usuario dentro de una reunión.
            En caso de que ya tenga un turno pedido,
            devuelve un aviso de error.
        """

        if self.user.is_authenticated:
            try:
                self.meeting.turn_set.create(turn_type=event['turn_type'], turn_user=self.user)
                self.send(text_data=json.dumps({
                    'turn_list': list(self.meeting.turn_set.all().values()),
                }))
            except:
                self.send(text_data=json.dumps({
                    'error': 'El usuario ya tiene un turno pedido.',
                }))
        else:
            user_not_verified(self)

    def delete_turn(self, event):
        """ 
            Borra el turno con la id indicada de la reunión.
            ¿Comprobar si es moderador?
        """

        if self.user.is_authenticated:
            self.meeting.turn_set.filter(pk=event['turn_id']).delete()
            self.send(text_data=json.dumps({
                'turn_list': list(self.meeting.turn_set.all().values()),
            }))
        else:
            user_not_verified(self)

    
    
   

    