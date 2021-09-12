
export class Coment {
  id: number;
  comentario: string;
  fecha: string;
  hora: string;
  idalbum: number;
  idusuario: number;


  constructor(

    comentario: string,
    fecha: string,
    hora: string,
    idalbum: number,
    idusuario: number
  ) {

    this.comentario = comentario,
      this.fecha = fecha,
      this.hora = hora,
      this.idalbum = idalbum,
      this.idusuario = idusuario
  }
}
