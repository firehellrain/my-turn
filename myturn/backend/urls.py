from django.urls import path
from . import views

urlpatterns = [

    ### URLs de autentificación ###

    # Pestaña de inicio de sesión
    path('', views.index, name='index'),

    # Comprueba las credenciales e inicia sesión
    path('login', views.loginUser, name='login'),

    # Cierra la sesión del usuario 
    path('logout', views.logoutUser, name='logout'),
]