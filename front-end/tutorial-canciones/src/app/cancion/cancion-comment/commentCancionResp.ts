import { Usuario } from "src/app/usuario/usuario";

export class CommentCancionResp {
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
