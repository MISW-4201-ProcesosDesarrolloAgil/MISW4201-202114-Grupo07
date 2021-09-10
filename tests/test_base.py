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
        print(a.get())


    def setUp(self):
        u1= Usuario(nombre='Pepesito', contrasena ='12345')
        u2= Usuario(nombre='Pepe', contrasena ='12345')
        a= Album(titulo='Prueba', anio=1999, descripcion='Holi', medio=Medio.DISCO)
        c = Comentario(comentario='Este es un comentario' , fecha='2020/09/22' , hora='21:35' )
        r1 = Comentario(comentario='Este es un respuesta 1' , fecha='2020/09/22' , hora='21:35' )
        r2 = Comentario(comentario='Este es un respuesta 2' , fecha='2020/09/22' , hora='21:35' )
        u2.comentarios.append(r1)
        u2.comentarios.append(r2)
        c.respuestas.append(r1)
        c.respuestas.append(r2)
        a.comentarios.append(c)
        u1.albumes.append(a)
        u1.comentarios.append(c)

        db.session.add(u1)
        db.session.add(u2)
        db.session.commit()
        