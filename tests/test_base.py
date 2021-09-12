import unittest
from flaskr.vistas.vistas import VistaComentarios
from flaskr.modelos.modelos import *
from flaskr import create_app
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine = create_engine('sqlite:///aplicacion.sqlite')
Session = sessionmaker(bind=engine)
Base = declarative_base()

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

class Test_Pruebas(unittest.TestCase):
    def test(self):
        a = VistaComentarios()
        # print(a.get())


    
        
        