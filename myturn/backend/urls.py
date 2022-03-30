from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [

    # Comprueba las credenciales y devuelve un token de sesión
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    # Devuelve la información del usuario que lo solicita
    path('user_data', views.user_data, name='user_data'),

    # Cierra la sesión del usuario 
    path('logout', views.logoutUser, name='logout'),

    # Comprueba si el usuario tiene una reunión creada
    path('user_has_meet', views.user_has_meet, name='user_has_meet'),

    # Accede a una reunión dado el código
    path('access_meet/<int:meeting_id>', views.access_meet, name='access_meet'),

    # Crea una reunión nueva
    path('create_meet', views.create_meet, name='create_meet'),

    # Borra la reunión del usuario
    path('delete_meet', views.delete_meet, name='delete_meet'),

    # Solicita la lista de turnos de la reunión dada
    path('get_turn_list/<int:meeting_id>', views.get_turn_list, name='get_turn_list'),

    # Solicita un turno del tipo dado por el usuario
    path('request_turn/<int:meeting_id>', views.request_turn, name='request_turn'),

    # Elimina el turno que el usuario haya solicitado
    path('delete_turn/<int:meeting_id>', views.delete_turn, name='delete_turn'),

    # Cambia al moderador de la reunión actual
    path('change_mod', views.change_mod, name='change_mod'),

]