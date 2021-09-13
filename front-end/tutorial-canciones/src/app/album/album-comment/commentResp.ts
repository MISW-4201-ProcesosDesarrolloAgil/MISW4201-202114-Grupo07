import { Usuario } from '../../usuario/usuario';

export class CommentResp {
  id: number;
  comentario: string;
  fecha: string;
  hora: string;
  usuarioo: Usuario;



  constructor(
    id: number,
    comentario: string,
    fecha: string,
    hora: string,
    usuarioo: Usuario
  ) {
    this.id = id,
      this.comentario = comentario,
      this.fecha = fecha,
      this.hora = hora,
      this.usuarioo = usuarioo
  }
}
