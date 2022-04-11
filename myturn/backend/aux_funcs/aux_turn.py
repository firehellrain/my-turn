from .aux_meeting import (
    get_meeting_from_code,
    user_is_connected_to_meet,
    user_get_connected_meet
)

from backend.models import Meeting

def get_turn_list_from_meet_code(meeting_code):
    """
        Devuelve la lista de turnos de una reunión
    """
    return get_meeting_from_code(meeting_code).turn_set.all()

def user_has_any_turn(user):
    """
        Comprueba si el usuario tiene un turno pedido
    """
    if user_is_connected_to_meet(user):
        return user_has_turn_on_meeting(user, user_get_connected_meet(user))
    else:
        for m in Meeting.objects.all():
            if user_has_turn_on_meeting(user, m.meeting_id):
                return True
        return False

def user_has_turn_on_meeting(user, meeting_code):
    """
        Comprueba si el usuario tiene un turno pedido
        en la reunión con el código dado
    """
    return get_turn_list_from_meet_code(meeting_code).filter(turn_user=user).exists()

def get_turn_from_meeting(meeting, turn_id):
    """
        Devuelve los datos del turno con la id indicada
        de la reunión de la que se solicita
    """
    return meeting.turn_set.get(pk=turn_id)

def user_add_turn(user, meeting, turn_type):
    """
        Crea un turno en la reunión dada por el usuario
        con el tipo de turno solicitado
    """
    meeting.turn_set.create(turn_type=turn_type, turn_user=user)

def delete_turn_from_meeting(meeting, turn_id):
    """
        Borra el turno con la id solicitada
        de la reunión indicada
    """
    meeting.turn_set.filter(pk=turn_id).delete()