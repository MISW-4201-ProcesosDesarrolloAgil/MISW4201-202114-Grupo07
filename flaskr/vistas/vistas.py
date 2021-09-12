from flask import request
from ..modelos import db, Cancion, CancionSchema, Usuario, UsuarioSchema, Album, AlbumSchema, Comentario, ComentarioSchema, AlbumCompartido, AlbumCompartidoSchema 
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

cancion_schema = CancionSchema()
usuario_schema = UsuarioSchema()
album_schema = AlbumSchema()
comentario_schema = ComentarioSchema()
album_compartido = AlbumCompartidoSchema()

class VistaCanciones(Resource):
 
    def post(self):
        nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"])
        db.session.add(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)

    def get(self):
        return [cancion_schema.dump(ca) for ca in Cancion.query.all()]

class VistaCancion(Resource):

    def get(self, id_cancion):
        return cancion_schema.dump(Cancion.query.get_or_404(id_cancion))

    def put(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        cancion.titulo = request.json.get("titulo",cancion.titulo)
        cancion.minutos = request.json.get("minutos",cancion.minutos)
        cancion.segundos = request.json.get("segundos",cancion.segundos)
        cancion.interprete = request.json.get("interprete",cancion.interprete)
        db.session.commit()
        return cancion_schema.dump(cancion)

    def delete(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        db.session.delete(cancion)
        db.session.commit()
        return '',204

class VistaAlbumesCanciones(Resource):
    def get(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        return [album_schema.dump(al) for al in cancion.albumes]

class VistaSignIn(Resource):
    
    def post(self):
        usuario_exist = Usuario.query.filter(Usuario.nombre == request.json["nombre"]).all()
        if len(usuario_exist) > 0:
             return {"mensaje":'El usuario ya existe!',"estado":0}, 409
        nuevo_usuario = Usuario(nombre=request.json["nombre"], contrasena=request.json["contrasena"])
        db.session.add(nuevo_usuario)
        db.session.commit()
        token_de_acceso = create_access_token(identity = nuevo_usuario.id)
        return {"mensaje":"usuario creado exitosamente", "estado":1, "token":token_de_acceso}, 200

class VistaUsuario(Resource):

    def get(self, id_usuario):
        return usuario_schema.dump(Usuario.query.get_or_404(id_usuario))


    def put(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.contrasena = request.json.get("contrasena",usuario.contrasena)
        db.session.commit()
        return usuario_schema.dump(usuario)

    def delete(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        db.session.delete(usuario)
        db.session.commit()
        return '',204

class VistaLogIn(Resource):

    def post(self):
        usuario = Usuario.query.filter(Usuario.nombre == request.json["nombre"], Usuario.contrasena == request.json["contrasena"]).first()
        db.session.commit()
        if usuario is None:
            return "El usuario no existe", 404
        else:
            token_de_acceso = create_access_token(identity = usuario.id)
            return {"mensaje":"Inicio de sesión exitoso", "token": token_de_acceso}

class VistaAlbumsUsuario(Resource):

    @jwt_required()
    def post(self, id_usuario):
        nuevo_album = Album(titulo=request.json["titulo"], anio=request.json["anio"], descripcion=request.json["descripcion"], medio=request.json["medio"])
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.albumes.append(nuevo_album)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'El usuario ya tiene un album con dicho nombre',409

        return album_schema.dump(nuevo_album)

    @jwt_required()
    def get(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        return [album_schema.dump(al) for al in usuario.albumes]

class VistaCancionesAlbum(Resource):

    def post(self, id_album):
        album = Album.query.get_or_404(id_album)
        
        if "id_cancion" in request.json.keys():
            
            nueva_cancion = Cancion.query.get(request.json["id_cancion"])
            if nueva_cancion is not None:
                album.canciones.append(nueva_cancion)
                db.session.commit()
            else:
                return 'Canción errónea',404
        else: 
            nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"])
            album.canciones.append(nueva_cancion)
        db.session.commit()
        return cancion_schema.dump(nueva_cancion)
       
    def get(self, id_album):
        album = Album.query.get_or_404(id_album)
        return [cancion_schema.dump(ca) for ca in album.canciones]

class VistaAlbum(Resource):

    def get(self, id_album):
        return album_schema.dump(Album.query.get_or_404(id_album))

    def put(self, id_album):
        album = Album.query.get_or_404(id_album)
        album.titulo = request.json.get("titulo",album.titulo)
        album.anio = request.json.get("anio", album.anio)
        album.descripcion = request.json.get("descripcion", album.descripcion)
        album.medio = request.json.get("medio", album.medio)
        db.session.commit()
        return album_schema.dump(album)

    def delete(self, id_album):
        album = Album.query.get_or_404(id_album)
        db.session.delete(album)
        db.session.commit()
        return '',204


class VistaComentarios(Resource):

    def get(self):
        print('entra')
        return [comentario_schema.dump(comentario) for comentario in Comentario.query.all()]


    def post(self):
        
        comentario = request.json['comentario']
        fecha = request.json['fecha']
        hora = request.json['hora']
        idalbum = request.json['idalbum']
        idusuario = request.json['idusuario']

        album = Album.query.get_or_404(idalbum)
        usuario = Usuario.query.get_or_404(idusuario)
        nuevo_comentario = Comentario(  comentario = comentario,\
                                        fecha = fecha,\
                                        hora = hora)
        usuario.comentarios.append(nuevo_comentario)
        album.comentarios.append(nuevo_comentario)
        db.session.add(nuevo_comentario)
        db.session.commit()
        return comentario_schema.dump(comentario_schema)

class VistaComentariosAlbum(Resource):

    def get(self, id_album):
        return [comentario_schema.dump(comentario) for comentario in Comentario.query.filter(Comentario.album == id_album).all()]

class VistaUsuarios(Resource):
    
    def get(self):
        return [usuario_schema.dump(ca) for ca in Usuario.query.all()]


class VistaAlbumsCompartido(Resource):

    def get(self, id_usuario, id_album):
        return usuario_schema.dump(Usuario.query.get_or_404(id_usuario))


    def post(self, id_usuario, id_album):
        ####VALIDAMOS SI EXISTE EL USUARIO
        usuario = Usuario.query.filter(Usuario.id == id_usuario).first()
        db.session.commit()
        if usuario is None:
            return "El usuario no existe", 404
        else:            
            album = Usuario.query.filter(Album.id == id_album).first()
            db.session.commit()
            if album is None:
                return "El album no existe", 404
            else:
                albumid = request.json['album_id']
                usuarioid = request.json['usuario_id']

                album = Album.query.get_or_404(albumid)
                usuario = Usuario.query.get_or_404(usuarioid)

                ##CONSULTAMOS SI ESE USUARIO YA TIENE EL ALBUM COMPRATIDO
                album_compartido = AlbumCompartido.query.filter( AlbumCompartido.album_id ==  albumid,  AlbumCompartido.usuario_id == usuarioid).first()
                db.session.commit()
                if album_compartido is None:
                    return "El usuario ya tiene el album compartido.", 404
                else:
                    nuevo_album_compartido = AlbumCompartido( album_id =  albumid, usuario_id = usuarioid)
                    db.session.add(nuevo_album_compartido)
                    db.session.commit()
                    return album_compartido.dump(album_compartido)
        
 