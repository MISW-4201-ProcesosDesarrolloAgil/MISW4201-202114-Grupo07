from flask import request
from ..modelos import db, Cancion, CancionSchema, Usuario, UsuarioSchema, Album, AlbumSchema, Comentario, ComentarioSchema, AlbumCompartido, AlbumCompartidoSchema, CancionFavoritaSchema, CancionFavorita, CancionCompartido, CancionCompartidoSchema
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

cancion_schema = CancionSchema()
usuario_schema = UsuarioSchema()
album_schema = AlbumSchema()
comentario_schema = ComentarioSchema()
album_comp_schema = AlbumCompartidoSchema()
cancion_favorita_schema = CancionFavoritaSchema()
cancion_comp_schema = CancionCompartidoSchema()



class VistaCanciones(Resource):
 
    def post(self):
        nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"], genero=request.json["genero"])
        usuario = Usuario.query.get_or_404(request.json["usuario"])
        usuario.canciones.append(nueva_cancion)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'El usuario ya tiene un album con dicho nombre',409

        return album_schema.dump(nueva_cancion)

    def get(self):
        return [cancion_schema.dump(ca) for ca in Cancion.query.all()]

class VistaCancionesUsuario(Resource):

    def get(self, id_usuario):
        print(id_usuario)
        return [cancion_schema.dump(cancion) for cancion in Cancion.query.filter(Cancion.usuario == id_usuario).all()]


class VistaCancion(Resource):

    def get(self, id_cancion):
        return cancion_schema.dump(Cancion.query.get_or_404(id_cancion))

    def put(self, id_cancion):
        cancion = Cancion.query.get_or_404(id_cancion)
        cancion.titulo = request.json.get("titulo",cancion.titulo)
        cancion.minutos = request.json.get("minutos",cancion.minutos)
        cancion.segundos = request.json.get("segundos",cancion.segundos)
        cancion.interprete = request.json.get("interprete",cancion.interprete)
        cancion.genero = request.json.get("genero",cancion.genero)
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
            nueva_cancion = Cancion(titulo=request.json["titulo"], minutos=request.json["minutos"], segundos=request.json["segundos"], interprete=request.json["interprete"], genero=request.json["genero"])
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
        return [comentario_schema.dump(comentario) for comentario in Comentario.query.all()]


    def post(self):
        comentario = request.json['comentario']
        fecha = request.json['fecha']
        hora = request.json['hora']
        idusuario = request.json['idusuario']
        usuario = Usuario.query.get_or_404(idusuario)
        nuevo_comentario = Comentario(  comentario = comentario,\
                                        fecha = fecha,\
                                        hora = hora)
        usuario.comentarios.append(nuevo_comentario)
        if "idalbum" in request.json:
            idalbum = request.json['idalbum']
            album = Album.query.get(idalbum)
            album.comentarios.append(nuevo_comentario)
        elif "idcancion" in request.json:
            idcancion = request.json['idcancion']
            cancion = Cancion.query.get(idcancion)
            cancion.comentarios.append(nuevo_comentario)
            
        db.session.add(nuevo_comentario)
        db.session.commit()
        return comentario_schema.dump(nuevo_comentario), 200

class VistaComentario(Resource):

    def get(self, id_comentario):
        comentarioAnt = Comentario.query.get_or_404(id_comentario)
        return comentario_schema.dump(comentarioAnt), 200

    def delete(self, id_comentario):
        comentario = Comentario.query.get_or_404(id_comentario)
        db.session.delete(comentario)
        db.session.commit()
        return '',204

    def put(self, id_comentario):
        comentarioAnt = Comentario.query.get_or_404(id_comentario)
        comentario = request.json['comentario']
        fecha = request.json['fecha']
        hora = request.json['hora']
        comentarioAnt.comentario = comentario
        comentarioAnt.fecha = fecha
        comentarioAnt.hora = hora
        db.session.commit()
        return comentario_schema.dump(comentarioAnt), 200

class VistaComentariosAlbum(Resource):

    def get(self, id_album):
        return [comentario_schema.dump(comentario) for comentario in Comentario.query.filter(Comentario.album == id_album).order_by(Comentario.fecha.desc()).order_by(Comentario.hora.desc()).all()]

class VistaComentariosCancion(Resource):

    def get(self, id_cancion):
        return [comentario_schema.dump(comentario) for comentario in Comentario.query.filter(Comentario.cancion == id_cancion).order_by(Comentario.fecha.desc()).order_by(Comentario.hora.desc()).all()]

class VistaUsuarios(Resource):
    
    def get(self):
        return [usuario_schema.dump(ca) for ca in Usuario.query.all()]


class VistaAlbumsCompartido(Resource):

    def get(self, id_usuariolog):
        return [album_comp_schema.dump(comentario) for comentario in AlbumCompartido.query.filter(AlbumCompartido.usuario_id == id_usuariolog).all()]


    def post(self, id_usuariolog):
        ####VALIDAMOS SI EXISTE EL USUARIO
        id_usuario = request.json['usuario_id']
        id_album = request.json['album_id']
        usuario = Usuario.query.filter(Usuario.nombre == id_usuario).first()
        verificarComp = AlbumCompartido.query.filter(AlbumCompartido.usuario_id == id_usuariolog).all()
        if len(verificarComp) > 0:
            return "No puede compartir un album compartido", 404
        if usuario.id == id_usuariolog:
            return "No se puede compartir con el mismo usuario logeado", 404
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
                usuarioid = usuario.id

                album = Album.query.get_or_404(albumid)
                usuario = Usuario.query.get_or_404(usuarioid)

                ##CONSULTAMOS SI ESE USUARIO YA TIENE EL ALBUM COMPRATIDO
                album_compar = AlbumCompartido.query.filter( AlbumCompartido.album_id ==  albumid,  AlbumCompartido.usuario_id == usuarioid).first()

                db.session.commit()
                if album_compar is None:
                    nuevo_album_compartido = AlbumCompartido( album_id =  albumid, usuario_id = usuarioid)
                    db.session.add(nuevo_album_compartido)
                    db.session.commit()
                    return album_comp_schema.dump(nuevo_album_compartido), 200
                    
                else:
                    return "El usuario ya tiene el album compartido.", 404
                    

class VistaCancionesCompartido(Resource):

    def get(self, id_usuariolog):
        return [cancion_comp_schema.dump(comentario) for comentario in CancionCompartido.query.filter(CancionCompartido.usuario_id == id_usuariolog).all()]


    def post(self, id_usuariolog):  
        ####VALIDAMOS SI EXISTE EL USUARIO
        id_usuario = request.json['usuario_id']
        id_cancion = request.json['cancion_id']
        usuario = Usuario.query.filter(Usuario.nombre == id_usuario).first()
        verificarComp = CancionCompartido.query.filter(CancionCompartido.usuario_id == id_usuariolog).all()
        if len(verificarComp) > 0:
            return "No puede compartir una canción compartida", 404
        if usuario.id == id_usuariolog:
            return "No se puede compartir con el mismo usuario logeado", 404
        db.session.commit()
        if usuario is None:
            return "El usuario no existe", 404
        else:            
            cancion = Usuario.query.filter(Cancion.id == id_cancion).first()
            db.session.commit()
            if cancion is None:
                return "La canción no existe", 404
            else:
                cancionid = request.json['cancion_id']
                usuarioid = usuario.id

                cancion = Cancion.query.get_or_404(cancionid)
                usuario = Usuario.query.get_or_404(usuarioid)

                ##CONSULTAMOS SI ESE USUARIO YA TIENE EL ALBUM COMPRATIDO
                cancion_compar = CancionCompartido.query.filter( CancionCompartido.cancion_id ==  cancionid,  CancionCompartido.usuario_id == usuarioid).first()

                db.session.commit()
                if cancion_compar is None:
                    nuevo_cancion_compartido = CancionCompartido( cancion_id =  cancionid, usuario_id = usuarioid)
                    db.session.add(nuevo_cancion_compartido)
                    db.session.commit()
                    return album_comp_schema.dump(nuevo_cancion_compartido), 200
                    
                else:
                    return "El usuario ya tiene la canción compartida.", 404

    

class VistaCancionFavorita(Resource):

    def delete(self, id_cancionlog, id_usuariolog):
        usuario = Usuario.query.filter(Usuario.id == id_usuariolog).first()
        db.session.commit()
        if usuario is None:
            return {"mensaje":"El usuario no existe"}, 400 
        else:            
            cancion = Cancion.query.filter(Cancion.id == id_cancionlog).first()
            db.session.commit()
            if cancion is None:
                return {"mensaje":"La canción no existe"}, 400 
            else:
                cancionid = cancion.id
                usuarioid = usuario.id

                cancion = Cancion.query.get_or_404(cancionid)
                usuario = Usuario.query.get_or_404(usuarioid)

                ##CONSULTAMOS SI ESE USUARIO YA TIENE La cancion COMPRATIDO
                cancion_compar = CancionFavorita.query.filter( CancionFavorita.cancion_id ==  cancionid,  CancionFavorita.usuario_id == usuarioid).first()
                db.session.commit()

                if cancion_compar is None:
                    return "El usuario No tiene la cancion como favorita, no se puede eliminar de favorita", 400
                else:
                    db.session.delete(cancion_compar)
                    db.session.commit()
                    return '',204 


    def get(self, id_cancionlog, id_usuariolog):
        ####VALIDAMOS SI EXISTE EL USUARIO
        usuario = Usuario.query.filter(Usuario.id == id_usuariolog).first()
        db.session.commit()
        if usuario is None:
            return {"mensaje":"El usuario no existe"}, 400 
        else:            
            cancion = Cancion.query.filter(Cancion.id == id_cancionlog).first()
            db.session.commit()
            if cancion is None:
                return {"mensaje":"El canción no existe"}, 400 
            else:
                cancionid = cancion.id
                usuarioid = usuario.id

                cancion = Cancion.query.get_or_404(cancionid)
                usuario = Usuario.query.get_or_404(usuarioid)

                ##CONSULTAMOS SI ESE USUARIO YA TIENE La cancion COMPRATIDO
                cancion_compar = CancionFavorita.query.filter( CancionFavorita.cancion_id ==  cancionid,  CancionFavorita.usuario_id == usuarioid).first()
                db.session.commit()

                if cancion_compar is None:
                    nueva_cancion_favorita = CancionFavorita( cancion_id =  cancionid, usuario_id = usuarioid)
                    db.session.add(nueva_cancion_favorita)
                    db.session.commit()
                    return cancion_favorita_schema.dump(nueva_cancion_favorita), 200
                    
                else:
                     return "El usuario ya tiene la misma cancion favorita, no se puede seleccionar como favorita de nuevo", 400 

class VistaCancionSiFavorita(Resource):  

    def get(self, id_cancionlog, id_usuariolog):
        ##CONSULTAMOS SI ESE USUARIO YA TIENE La cancion COMPRATIDO
        cancion_compar = CancionFavorita.query.filter( CancionFavorita.cancion_id ==  id_cancionlog,  CancionFavorita.usuario_id == id_usuariolog).first()
        db.session.commit()

        if cancion_compar is None:     
            return False 
        else:
            return True 

class VistaCancionNoFavorita(Resource):

    def get(self, id_cancionlog, id_usuariolog):
        ##CONSULTAMOS SI ESE USUARIO YA TIENE La cancion COMPRATIDO
        cancion_compar = CancionFavorita.query.filter( CancionFavorita.cancion_id ==  id_cancionlog,  CancionFavorita.usuario_id == id_usuariolog).first()
        db.session.commit()

        if cancion_compar is None:     
            return True
        else:
            return False

class VistaCancionesFavoritas(Resource):
    def get(self):
         return [cancion_favorita_schema.dump(fa) for fa in CancionFavorita.query.all()]