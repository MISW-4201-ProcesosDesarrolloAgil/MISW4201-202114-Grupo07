export class CancionCompartir {

  usuario_id: string;
  cancion_id: number;

  constructor(

    usuario_id: string,
    cancion_id: number,

  ) {

    this.usuario_id = usuario_id,
      this.cancion_id = cancion_id
  }
}
