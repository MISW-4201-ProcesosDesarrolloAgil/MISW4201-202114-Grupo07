import unittest
from flaskr.vistas.vistas import VistaComentarios
from flaskr.modelos.modelos import *
from flaskr import create_app
from flaskr.app import app
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker




class Test_compartirCancion(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = True
        app.config['APP_ENV'] = 'APP_ENV_TESTING'
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()
        db.drop_all()
        db.create_all()
        

    def test_consulta_sincompartir(self):
       u1= Usuario(nombre='test@gmail.com', contrasena ='12345')
       db.session.add(u1)
       db.session.commit()
       rec = self.client.get('/compartirCancion/1')
       response = rec.get_json()
       self.assertEqual(len(response), 0)

    def test_postConsulta(self):
       u1= Usuario(nombre='test@gmail.com', contrasena ='12345')
       u2= Usuario(nombre='test2@gmail.com', contrasena ='12345')
       c= Cancion(titulo='Prueba', minutos=2, segundos=3, interprete='Test Interprete')
       u1.canciones.append(c)
       db.session.add(u1)
       db.session.add(u2)
       db.session.commit()
       self.client.post('/compartirCancion/1',json={'usuario_id': u2.nombre, 'cancion_id': c.id})
       rec = self.client.get('/compartirCancion/2')
       response = rec.get_json()
       self.assertEqual(len(response), 1)    

    

    
    def tearDown(self):
       with app.app_context():
           # Elimina todas las tablas de la base de datos
           db.session.remove()
           db.drop_all()