import { Album } from '../album';
import { Usuario } from '../../usuario/usuario';
import { DatePipe } from '@angular/common';
export class AlbumComment {
  comentario: string;


  constructor(
    comentario: string

  ) {
    this.comentario = comentario

  }
}
