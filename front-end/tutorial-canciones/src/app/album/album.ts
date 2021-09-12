import { AlbumComment } from "./album-comment/album-comment";
import { Coment } from "./album-comment/coment";

export class Album {

  id: number;
  titulo: string;
  anio: number;
  descripcion: string;
  medio: Medio;
  usuario: number;
  interpretes: Array<string>;
  canciones: Array<Cancion>
  comentarios: Array<Coment>

  constructor(
    id: number,
    titulo: string,
    anio: number,
    descripcion: string,
    medio: Medio,
    usuario: number,
    interpretes: Array<string>,
    canciones: Array<Cancion>,
    comentarios: Array<Coment>
  ) {
    this.id = id,
      this.titulo = titulo,
      this.anio = anio,
      this.descripcion = descripcion,
      this.medio = medio,
      this.usuario = usuario,
      this.interpretes = interpretes,
      this.canciones = canciones,
      this.comentarios = comentarios
  }
}

export class Medio {
  llave: string;
  valor: number

  constructor(
    llave: string,
    valor: number
  ) {
    this.llave = llave,
      this.valor = valor
  }
}

export class Cancion {
  id: number;
  titulo: string;
  minutos: number;
  segundos: number;
  interprete: string;

  constructor(
    id: number,
    titulo: string,
    minutos: number,
    segundos: number,
    interprete: string
  ) {
    this.id = id,
      this.titulo = titulo,
      this.minutos = minutos,
      this.segundos = segundos,
      this.interprete = interprete
  }
}
// export class AlbumComment {
//   id: number;
//   comentario: string;
//   album: Album;
//   usuario: Usuario;
//   fecha: DatePipe;


//   constructor(
//       id: number,
//       comentario: string,
//       album: Album,
//       usuario: Usuario,
//       fecha: DatePipe,
//   ){
//       this.id = id,
//       this.comentario = comentario,
//       this.album = album,
//       this.usuario = usuario,
//       this.fecha = fecha
//   }
// }
