export class CommentCancion {
  id: number;
  comentario: string;
  fecha: string;
  hora: string;
  idcancion: number;
  idusuario: number;


  constructor(

    comentario: string,
    fecha: string,
    hora: string,
    idcancion: number,
    idusuario: number
  ) {

    this.comentario = comentario,
      this.fecha = fecha,
      this.hora = hora,
      this.idcancion = idcancion,
      this.idusuario = idusuario
  }
}
