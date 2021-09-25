from flaskr import create_app
from flask_restful import Api
from .modelos import db
from .vistas import VistaCanciones, VistaCancion, VistaSignIn, VistaAlbum, VistaAlbumsUsuario, VistaCancionesAlbum, VistaLogIn, VistaAlbumesCanciones, VistaComentarios, VistaComentariosAlbum,  VistaUsuario, VistaUsuarios, VistaAlbumsCompartido, VistaCancionesUsuario,VistaComentariosCancion,VistaCancionFavorita, VistaCancionesCompartido, VistaCancionSiFavorita, VistaCancionNoFavorita, VistaComentario, VistaCancionesFavoritas
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()
cors = CORS(app)

api = Api(app)
api.add_resource(VistaCanciones, '/canciones')
api.add_resource(VistaCancion, '/cancion/<int:id_cancion>')
api.add_resource(VistaAlbumesCanciones, '/cancion/<int:id_cancion>/albumes')
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaLogIn, '/logIn')
api.add_resource(VistaAlbumsUsuario, '/usuario/<int:id_usuario>/albumes')
api.add_resource(VistaUsuario, '/usuario/<int:id_usuario>')
api.add_resource(VistaAlbum, '/album/<int:id_album>')
api.add_resource(VistaCancionesAlbum, '/album/<int:id_album>/canciones')

api.add_resource(VistaComentarios, '/comentarios')
api.add_resource(VistaComentariosAlbum, '/comentarioAlbum/<int:id_album>')
api.add_resource(VistaComentariosCancion, '/comentarioCancion/<int:id_cancion>')

api.add_resource(VistaUsuarios, '/usuarios')
api.add_resource(VistaAlbumsCompartido, '/compartirAlbum/<int:id_usuariolog>') 

api.add_resource(VistaCancionesUsuario, '/usuarios/<int:id_usuario>/canciones')

api.add_resource(VistaCancionFavorita, '/addcancionFavorita/<int:id_cancionlog>/<int:id_usuariolog>') 
api.add_resource(VistaCancionSiFavorita, '/sicancionFavorita/<int:id_cancionlog>/<int:id_usuariolog>')
api.add_resource(VistaCancionNoFavorita, '/nocancionFavorita/<int:id_cancionlog>/<int:id_usuariolog>')

api.add_resource(VistaCancionesFavoritas, '/favoritas')

api.add_resource(VistaCancionesCompartido, '/compartirCancion/<int:id_usuariolog>') 

api.add_resource(VistaComentario, '/comentario/<int:id_comentario>') 

jwt = JWTManager(app) 
