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
        db.drop_all()
        db.create_all()
        

    def test_consulta_sincomentarios(self):
        rec = self.client.get('/comentarios')
        response = rec.get_json()
        self.assertEqual(len(response), 0)

    def test_consulta(self):
        u1= Usuario(nombre='test@gmail.com', contrasena ='12345')
        a= Album(titulo='Prueba', anio=1999, descripcion='esto es un test2', medio=Medio.DISCO)
        c = Comentario(comentario='Este es un comentario' , fecha='2020/09/22' , hora='21:35' )
        a.comentarios.append(c)
        u1.comentarios.append(c)
        u1.albumes.append(a)
        db.session.add(u1)
        db.session.commit()
        rec = self.client.get('/comentarios')
        response = rec.get_json()
        self.assertEqual(len(response), 1)

    def test_consulta_albumComent(self):
        u1= Usuario(nombre='test@gmail.com', contrasena ='12345')
        a= Album(titulo='Prueba', anio=1999, descripcion='esto es un test2', medio=Medio.DISCO)
        c = Comentario(comentario='Este es un comentario' , fecha='2020/09/22' , hora='21:35' )
        a.comentarios.append(c)
        u1.comentarios.append(c)
        u1.albumes.append(a)
        db.session.add(u1)
        db.session.commit()
        rec = self.client.get('/comentarioAlbum/1')
        response = rec.get_json()
        self.assertEqual(len(response), 1)

    def test_post_albumComent(self):
        u1= Usuario(nombre='test@gmail.com', contrasena ='12345')
        a= Album(titulo='Prueba', anio=1999, descripcion='esto es un test2', medio=Medio.DISCO)
        u1.albumes.append(a)
        db.session.add(u1)
        db.session.commit()
        rec = self.client.post('/comentarios',json={'comentario': 'Este es un comentario', 'fecha': '2020/09/22', 'hora': '21:35', 'idalbum': 1, 'idusuario': 1})
        code = rec.status_code
        response = rec.get_json()
        self.assertEqual(code, 200)
        self.assertEqual(response["id"], 1)



    
    def tearDown(self):
        with app.app_context():
            # Elimina todas las tablas de la base de datos
            db.session.remove()
            db.drop_all()