import json
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser, User
from asgiref.sync import async_to_sync

from .aux_funcs.aux_generic import user_not_verified, verify_user
from .aux_funcs.aux_meeting import (
    user_is_mod,
    get_meeting_from_code,
    get_user_list_from_meeting,
    user_is_connected_to_meet,
    connect_user_to_meet,
    disconnect_user_from_meet
)
from .aux_funcs.aux_turn import (
    get_turn_list_from_meet_code,
    user_add_turn,
    delete_turn_from_meeting, 
    get_turn_from_meeting
)

class MeetingConsumer(WebsocketConsumer):

    def connect(self):
        self.meeting_code = self.scope['url_route']['kwargs']['meeting_id']
        self.meeting = get_meeting_from_code(self.meeting_code)
        self.user = AnonymousUser()

        # Unirse a la reunión
        async_to_sync(self.channel_layer.group_add)(
            self.meeting_code,
            self.channel_name
        )

        self.accept()
    
    def disconnect(self, close_code):
        disconnect_user_from_meet(self.user)
        async_to_sync(self.channel_layer.group_discard)(
            self.meeting_code,
            self.channel_name
        )

    # Recibir mensaje del WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        
        try:
            request = text_data_json['request']

            if request == "auth_user":
                async_to_sync(self.channel_layer.send)(
                    self.channel_name,
                    {
                        'type': request,
                        'token_key': text_data_json['token_key']
                    }
                )
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': "get_user_list",
                    }
                )
            elif request == "add_turn":
                async_to_sync(self.channel_layer.send)(
                    self.channel_name,
                    {
                        'type': request,
                        'turn_type': text_data_json['turn_type'],
                    }
                )
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': "get_turn_list",
                    }
                )
            elif request == "delete_turn":
                async_to_sync(self.channel_layer.send)(
                    self.channel_name,
                    {
                        'type': request,
                        'turn_id': text_data_json['turn_id'],
                    }
                )
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': "get_turn_list",
                    }
                )
            elif request == "change_mod":
                async_to_sync(self.channel_layer.send)(
                    self.channel_name,
                    {
                        'type': request,
                        'new_mod': text_data_json['new_mod'],
                    }
                )
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': "get_user_list",
                    }
                )
            else:
                async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': request,
                    }
                )
        except:
            self.send(text_data=json.dumps({
                'error': 'Peticion denegada, algo salio mal.'
            }))
            
    def auth_user(self, event):
        """ 
            Comprueba el token del usuario y, en caso de ser válido,
            inicia la sesión del usuario en el websocket
        """
        user = verify_user(self, event['token_key'])
        
        if self.user.is_anonymous:
            self.user = user
            if not user_is_connected_to_meet(self.user):
                self.connexion = connect_user_to_meet(self.user, self.meeting)
        
        self.send(text_data=json.dumps({
            'user': {
                'user_id': self.user.pk,
                'user_name': self.user.first_name + " " + self.user.last_name
            }
        }))

    def get_turn_list(self, event):
        """ 
            Solicita la lista de turnos de una reunión.
            Se asume que la reunión dada siempre va a existir.
        """
        if self.user.is_authenticated:
            self.send(text_data=json.dumps({
                'turn_list': list(get_turn_list_from_meet_code(self.meeting_code).values()),
            }))
        else:
            user_not_verified(self)
    
    def get_user_list(self, event):
        """ 
            Solicita la lista de usuarios de una reunión.
            Se asume que la reunión dada siempre va a existir.
        """
        if self.user.is_authenticated:
            user_list = get_user_list_from_meeting(self.meeting).values_list('user', flat=True)
            username_list = {}

            for u in user_list:
                username_list[u] = User.objects.get(pk=u).first_name + " " + User.objects.get(pk=u).last_name

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
                user_add_turn(self.user, self.meeting, event['turn_type'])
            except:
                self.send(text_data=json.dumps({
                    'error': 'El usuario ya tiene un turno pedido.',
                }))
        else:
            user_not_verified(self)

    def delete_turn(self, event):
        """ 
            Borra el turno con la id indicada de la reunión
            si el usuario es el creador de este turno o
            si el usuario es moderador de la reunión.
            En cualquier otro caso devuelve un error.
        """

        if self.user.is_authenticated:
            turn = get_turn_from_meeting(self.meeting, event['turn_id'])
            if turn.turn_user == self.user or self.meeting.meeting_mod == self.user:
                delete_turn_from_meeting(self.meeting, event['turn_id'])
            else:
                self.send(text_data=json.dumps({
                    'error': "El usuario no tiene permisos para borrar este turno",
                }))
        else:
            user_not_verified(self)

    def change_mod(self, event):
        """ 
            Cambia al moderador de la reunión por el usuario indicado por el mismo.
            Si el usuario solicitante no es moderador o
            el nuevo usuario ya es moderador en otra reunión,
            devuelve un mensaje de error.
        """

        if self.user.is_authenticated:
            if self.meeting.meeting_mod == self.user:
                
                new_mod = User.objects.get(pk=event['new_mod'])

                if not user_is_mod(new_mod):
                    self.meeting.meeting_mod = new_mod
                    self.meeting.save()
                else: 
                    self.send(text_data=json.dumps({
                        'error': "El usuario ya es moderador de una reunión",
                    }))
            else:
                self.send(text_data=json.dumps({
                    'error': "El usuario solicitante no es moderador de la reunión",
                }))
        else:
            user_not_verified(self)
    
   

    