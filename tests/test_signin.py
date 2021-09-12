import unittest
from flaskr.vistas.vistas import VistaComentarios
from flaskr.modelos.modelos import *
from flaskr import create_app
from flaskr.app import app
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker




class Test_Pruebas(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = True
        app.config['APP_ENV'] = 'APP_ENV_TESTING'
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()
        db.create_all()
        
        

    def test_registro_exitoso(self):
        rec = self.client.post('/signin',json={'nombre': 'carlos@gmail.com', 'contrasena': '12345'})
        code = rec.status_code
        response = rec.get_json()
        self.assertEqual(code, 200)
        self.assertEqual(response["mensaje"], 'usuario creado exitosamente')
        self.assertEqual(response["estado"], 1)

    
    def test_registro_usuarioexistente(self):
        u1= Usuario(nombre='carlos@gmail.com', contrasena ='12345')
        db.session.add(u1)
        db.session.commit()
        rec = self.client.post('/signin',json={'nombre': 'carlos@gmail.com', 'contrasena': '12345'})
        code = rec.status_code
        response = rec.get_json()
        self.assertEqual(code, 409)
        self.assertEqual(response["mensaje"], 'El usuario ya existe!')
        self.assertEqual(response["estado"], 0)

    
    def tearDown(self):
        with app.app_context():
            # Elimina todas las tablas de la base de datos
            db.session.remove()
            db.drop_all()