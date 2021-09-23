import unittest
from flaskr.vistas.vistas import VistaCancionFavorita
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
        
    def test_consulta_cancionFavorita(self):
        rec = self.client.get('/cancionFavorita/1')
        response = rec.get_json()
        self.assertEqual(len(response), 1)

    def test_post_cancionFavorita(self):
        rec = self.client.post('/cancionFavorita',json={'cancion_id': 1, 'usuario_id': 1})
        code = rec.status_code
        response = rec.get_json()
        self.assertEqual(code, 200)
        self.assertEqual(response["id"], 1)

    
    def tearDown(self):
        with app.app_context():
            # Elimina todas las tablas de la base de datos
            db.session.remove()
            db.drop_all()