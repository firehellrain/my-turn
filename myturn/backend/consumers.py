import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Meeting

class MeetingConsumer(WebsocketConsumer):

    def connect(self):
        self.meeting_code = self.scope['url_route']['kwargs']['meeting_id']
        self.meeting = Meeting.objects.get(meeting_id=self.meeting_code)
        
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
        request = text_data_json['request']
        
        if request in text_data_json['request']:

            if request == "get_turn_list":
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
                        'turn_type': text_data_json['turn_type']
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
        else:
            async_to_sync(self.channel_layer.group_send)(
                    self.meeting_code,
                    {
                        'type': 'null'
                    }
                )
            

    # Envia la lista de turnos al grupo
    def get_turn_list(self, event):
        self.send(text_data=json.dumps({
            'turn_list': list(self.meeting.turn_set.all().values()),
        }))

    def add_turn(self, event):
        try:
            self.meeting.turn_set.create(turn_type=event['turn_type'], turn_user=self.scope['user'])
            self.send(text_data=json.dumps({
            'turn_list': list(self.meeting.turn_set.all().values()),
        }))
        except: 
            self.send(text_data=json.dumps({
                'error': 'Peticion denegada, algo salio mal.'
            }))
        

   

    