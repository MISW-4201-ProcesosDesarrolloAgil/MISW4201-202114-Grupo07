import { Album } from '../album';
import { Usuario } from '../../usuario/usuario';
import { DatePipe } from '@angular/common';
export class AlbumComment {
    id: number;
    comentario: string;
    album: Album;
    usuario: Usuario;
    fecha: DatePipe;


    constructor(
        id: number,
        comentario: string,
        album: Album,
        usuario: Usuario,
        fecha: DatePipe,
    ){
        this.id = id,
        this.comentario = comentario,
        this.album = album,
        this.usuario = usuario,
        this.fecha = fecha
    }
}
