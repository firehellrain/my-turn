from django.test import TestCase, Client
from django.test.utils import teardown_test_environment, setup_test_environment
from django.urls import reverse
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
import json, logging

from .models import Meeting

from views.aux_funcs import create_meeting, create_user

class MeetingTestCase(TestCase):

    def setUp(self):
        try: 
            teardown_test_environment()
        except AttributeError: pass
        create_user("testuser1", "testpw1")
        setup_test_environment()
        self.client = Client()
        logger = logging.getLogger("django.request")
        self.previous_level = logger.getEffectiveLevel()
        logger.setLevel(logging.ERROR)

    def test_user_has_meet(self):
        """
            Comprueba si dado un usuario con una reunión,
            la petición user_has_meet devuelve correctamente
            la información de la reunión del usuario
        """
        meet = create_meeting(1234, "testmeeting", User.objects.get(username="testuser1"))
        
        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('has_meet'))
        data = model_to_dict(meet)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)['meeting'], data)
        print("test_user_has_meet completado")

    def test_user_does_not_have_meet(self):
        """
            Comprueba si dado un usuario que no modera ninguna reunión,
            la petición user_has_meet devuelve correctamente el
            mensaje de error que confirma que no tiene reunión
        """
        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('has_meet'))
        
        self.assertEqual(response.status_code, 400)
        self.assertContains(response, "El usuario no es moderador en ninguna reunión", status_code=400)
        print("test_user_does_not_have_meet completado")
        
    def test_access_existing_meet(self):
        """
            Comprueba si dado un código de reunión,
            la petición access_meet devuelve correctamente
            la información de la reunión con ese código
        """
        meet = create_meeting(1234, "testmeeting", User.objects.get(username="testuser1"))
        
        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('access_meet', args=[1234]))
        data = model_to_dict(meet)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)['meeting'], data)
        print("test_access_existing_meet completado")

    def test_access_unexisting_meet(self):
        """
            Comprueba si dado un código de reunión inexistente,
            la petición access_meet devuelve correctamente el
            mensaje de error que confirma que la reunión no existe
        """
        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('access_meet', args=[1234]))

        self.assertEqual(response.status_code, 400)
        self.assertContains(response, "El código de reunión no es válido", status_code=400)
        print("test_access_unexisting_meet completado")

    def test_user_cannot_create_meet(self):
        """
            Comprueba si dado un usuario que es moderador en reunión,
            la petición create_meet devuelve correctamente el
            mensaje de error que confirma que ya es moderador de otra reunión
        """
        create_meeting(1234, "testmeeting", User.objects.get(username="testuser1"))

        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('create_meet'), data={"meetname": "testname"})

        self.assertEqual(response.status_code, 400)
        self.assertContains(response, "El usuario es moderador en una reunión existente", status_code=400)
        print("test_user_cannot_create_meet completado")

    def test_user_delete_existing_meet(self):
        """
            Comprueba si dado un usuario moderador de una reunión,
            la petición delete_meet devuelve correctamente
            la confirmación de eliminación de la reunión
        """
        create_meeting(1234, "testmeeting", User.objects.get(username="testuser1"))
        
        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('delete_meet'))

        self.assertEqual(response.status_code, 200)
        print("test_user_delete_existing_meet completado")

    def test_user_delete_unexisting_meet(self):
        """
            Comprueba si dado un usuario que no modera ninguna reunión,
            la petición delete_meet devuelve correctamente el
            mensaje de error que confirma que no tiene reunión
        """
        self.client.login(username="testuser1", password="testpw1")
        response = self.client.get(reverse('delete_meet'))

        self.assertEqual(response.status_code, 400)
        self.assertContains(response, "El usuario no es moderador en ninguna reunión", status_code=400)
        print("test_user_delete_existing_meet completado")

    def tearDown(self) -> None:
        """Reset the log level back to normal"""
        logger = logging.getLogger("django.request")
        logger.setLevel(self.previous_level)