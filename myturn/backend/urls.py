from django.urls import path
from . import views

urlpatterns = [

    ### URLs de autentificación ###

    # Comprueba las credenciales e inicia sesión
    path('login', views.loginUser, name='login'),

    # Cierra la sesión del usuario 
    path('logout', views.logoutUser, name='logout'),

    ### URLs de control de reuniones ###

    # Comprueba si el usuario tiene una reunión creada
    path('has_meet', views.user_has_meet, name='has_meet'),

    # Accede a una reunión dado el código
    path('access_meet/<int:meeting_id>', views.access_meet, name='access_meet'),

    # Crea una reunión nueva
    path('create_meet', views.create_meet, name='create_meet'),

    # Borra la reunión del usuario
    path('delete_meet', views.delete_meet, name='delete_meet'),

]