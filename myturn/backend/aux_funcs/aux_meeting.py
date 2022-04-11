from backend.models import Meeting, MeetingUserList
from .aux_generic import generate_unique_meeting

def get_meeting_from_code(meeting_code):
    """
        Devuelve la reunión con el código dado
    """
    return Meeting.objects.get(meeting_id=meeting_code)

def get_meeting_from_mod(user):
    """
        Devuelve la reunión que modera el usuario
    """
    return Meeting.objects.get(meeting_mod=user)

def user_is_mod(user):
    """
        Comprueba si el usuario ya es moderador de una reunión
    """
    return Meeting.objects.filter(meeting_mod=user).exists()

def change_mod_from_meeting(meeting, user):
    """
        Cambia al moderador de la reunión
    """
    meeting.meeting_mod = user
    meeting.save()

def create_meeting(user, meetname):
    """
        Crea una reunión con el usuario dado como moderador
        y con el nombre de reunión dado
    """
    meeting = Meeting(
        meeting_id = generate_unique_meeting(), 
        meeting_mod = user,
        meeting_name = meetname,
    )
    meeting.save()
    return meeting

def delete_meet_from_code(meeting_code):
    """
        Borra la reunión y todas las conexiones
        de los usuarios de la misma
    """
    meeting = get_meeting_from_code(meeting_code)
    meetUserList = MeetingUserList.objects.filter(meeting_id=meeting_code)
    for meet in meetUserList.iterator():
        meet.delete()
    meeting.delete()

def get_user_list_from_meeting(meeting):
    """
        Devuelve la lista de usuarios conectados a una reunión
    """
    return MeetingUserList.objects.filter(meeting_id=meeting)

def user_is_connected_to_meet(user):
    """
        Comprueba si el usuario ya está en una reunión
    """
    return MeetingUserList.objects.filter(user=user).exists()

def user_get_connected_meet(user):
    """
        Devuelve la reunión a la que el usuario está conectado
    """
    meeting_code = MeetingUserList.objects.get(user=user).meeting_id
    return get_meeting_from_code(meeting_code)

def connect_user_to_meet(user, meeting):
    """
        Añade al usuario a la lista de conexiones de una reunión
    """
    return MeetingUserList.objects.create(meeting_id=meeting, user=user)

def disconnect_user_from_meet(user):
    """
        Borra al usuario de la lista de conexiones de una reunión
    """
    MeetingUserList.objects.filter(user=user).delete()