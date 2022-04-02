import json
from channels.generic.websocket import WebsocketConsumer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
from asgiref.sync import async_to_sync
from .models import Meeting

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
            elif request == "disconnect":
                self.disconnect(0)
        except:
            self.send(text_data=json.dumps({
                'error': 'Peticion denegada, algo salio mal.'
            }))
            

    # Envia la lista de turnos al grupo
    def get_turn_list(self, event):
        """ 
            Solicita la lista de turnos de una reunión.
            Se asume que la reunión dada siempre va a existir.
        """
        user = self.verify_user(event['token_key'])

        if user.is_authenticated:
            if self.user.is_anonymous:
                self.user = user
            self.send(text_data=json.dumps({
                'turn_list': list(self.meeting.turn_set.all().values()),
            }))
        else:
            self.user_not_verified()

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
            self.user_not_verified()

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
            self.user_not_verified()
    
    def user_not_verified(self):
        """
            Devuelve un mensaje de error indicando que
            el usuario no ha sido verificado correctamente
        """
        self.send(text_data=json.dumps({
            'error': 'El usuario no ha sido identificado',
        }))

    def verify_user(self, token_key):
        """
            Comprueba si el token de verificación es válido.
            En caso afirmativo, devuelve los datos del usuario.
            En caso contrario, devuelve un usuario anónimo.
        """
        try:
            token = Token.objects.get(key=token_key)
            return token.user
        except Token.DoesNotExist:
            return AnonymousUser()
   

    