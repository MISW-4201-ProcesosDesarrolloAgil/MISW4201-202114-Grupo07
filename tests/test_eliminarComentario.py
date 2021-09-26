import unittest
from flaskr.vistas.vistas import VistaComentarios
from flaskr.modelos.modelos import *
from flaskr import create_app
from flaskr.app import app
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker




class Test_eliminarComentario(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['DEBUG'] = True
        app.config['APP_ENV'] = 'APP_ENV_TESTING'
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()
        db.drop_all()
        db.create_all()
        

    def test_consulta_delete(self):
       u1= Usuario(nombre='test2@gmail.com', contrasena ='12345')
       c= Cancion(titulo='Prueba', minutos=2, segundos=3, interprete='Test Interprete')
       co = Comentario(comentario='Este es un comentario' , fecha='2020/09/22' , hora='21:35' )
       u1.canciones.append(c)
       u1.comentarios.append(co)
       db.session.add(u1)
       db.session.commit()
       self.client.delete('/comentario/1')
       rec2 = self.client.get('/comentarios')
       response = rec2.get_json()
       self.assertEqual(len(response), 0)

    

    

    
    def tearDown(self):
       with app.app_context():
           # Elimina todas las tablas de la base de datos
           db.session.remove()
           db.drop_all()