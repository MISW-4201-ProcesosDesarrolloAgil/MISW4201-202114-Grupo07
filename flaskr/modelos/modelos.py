from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow import fields
from marshmallow.fields import Nested
import enum


db = SQLAlchemy()

albumes_canciones = db.Table('album_cancion',
    db.Column('album_id', db.Integer, db.ForeignKey('album.id'), primary_key = True),
    db.Column('cancion_id', db.Integer, db.ForeignKey('cancion.id'), primary_key = True))

class Genero(enum.Enum):
    Academico = 1
    Alternativo = 2
    Experimental = 3
    Folclor = 4
    Jazz = 5
    Pop = 6
    Rock = 7
    Tropical = 8
    Urbano = 9  
    

class Cancion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    titulo = db.Column(db.String(128))
    minutos = db.Column(db.Integer)
    segundos = db.Column(db.Integer)
    interprete = db.Column(db.String(128))
    genero = db.Column(db.Enum(Genero))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    albumes = db.relationship('Album', secondary = 'album_cancion', back_populates="canciones")
    comentarios = db.relationship('Comentario', cascade='all, delete, delete-orphan')
    compartidos = db.relationship('CancionCompartido', cascade='all, delete, delete-orphan')
    favorita = db.relationship('CancionFavorita')

    

class Medio(enum.Enum):
   DISCO = 1
   CASETE = 2
   CD = 3

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(128))
    anio = db.Column(db.Integer)
    descripcion = db.Column(db.String(512))
    medio = db.Column(db.Enum(Medio))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    canciones = db.relationship('Cancion', secondary = 'album_cancion', back_populates="albumes")
    comentarios = db.relationship('Comentario', cascade='all, delete, delete-orphan')
    compartidos = db.relationship('AlbumCompartido', cascade='all, delete, delete-orphan')
    
    
class Usuario(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    contrasena = db.Column(db.String(50))
    albumes = db.relationship('Album', cascade='all, delete, delete-orphan')
    canciones = db.relationship('Cancion', cascade='all, delete, delete-orphan')
    comentarios = db.relationship('Comentario', cascade='all, delete, delete-orphan')


class Comentario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comentario = db.Column(db.String(250))
    fecha = db.Column(db.String(10))
    hora = db.Column(db.String(5))
    album = db.Column(db.Integer, db.ForeignKey("album.id"))
    cancion = db.Column(db.Integer, db.ForeignKey("cancion.id"))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    usuarioo = db.relationship("Usuario", back_populates="comentarios")
    respuesta = db.Column(db.Integer, db.ForeignKey("comentario.id"))
    respuestas = db.relationship('Comentario', cascade='all, delete, delete-orphan')

class AlbumCompartido(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    album_id = db.Column(db.Integer, db.ForeignKey("album.id"))
    album = db.relationship("Album", back_populates="compartidos")
    usuario_id  = db.Column(db.Integer, db.ForeignKey("usuario.id"))

class CancionCompartido(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    cancion_id = db.Column(db.Integer, db.ForeignKey("cancion.id"))
    cancion = db.relationship("Cancion", back_populates="compartidos")
    usuario_id  = db.Column(db.Integer, db.ForeignKey("usuario.id"))

class CancionFavorita(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    cancion_id = db.Column(db.Integer, db.ForeignKey("cancion.id"))
    usuario_id  = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    canciones = db.relationship('Cancion', back_populates='favorita')

class EnumADiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {"llave": value.name, "valor": value.value}

class CancionSchema(SQLAlchemyAutoSchema):
    genero = EnumADiccionario(attribute=("genero"))
    class Meta:
         model = Cancion
         include_relationships = True
         include_fk=True
         load_instance = True

class AlbumSchema(SQLAlchemyAutoSchema):
    medio = EnumADiccionario(attribute=("medio"))
    class Meta:
         model = Album
         include_relationships = True
         load_instance = True

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Usuario
         include_relationships = True
         load_instance = True

class ComentarioSchema(SQLAlchemyAutoSchema):
    usuarioo = Nested(UsuarioSchema)
    class Meta:
         model = Comentario
         include_relationships = True
         load_instance = True    

class AlbumCompartidoSchema(SQLAlchemyAutoSchema):
    album = Nested(AlbumSchema)
    class Meta:
         model = AlbumCompartido
         include_relationships = True
         include_fk = True
         exclude = ['usuario_id','id','album_id']
         load_instance = True


class CancionCompartidoSchema(SQLAlchemyAutoSchema):
    cancion = Nested(CancionSchema)
    class Meta:
         model = CancionCompartido
         include_relationships = True
         include_fk = True
         exclude = ['usuario_id','id','cancion_id']
         load_instance = True

class CancionFavoritaSchema(SQLAlchemyAutoSchema):
    canciones = Nested(CancionSchema)
    class Meta:
         model = CancionFavorita
         include_relationships = True
         include_fk = True
         exclude = ['usuario_id','id','cancion_id']
         load_instance = True