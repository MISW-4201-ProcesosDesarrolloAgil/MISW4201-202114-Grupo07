export class CancionFavorita {
  id: number;
  cancion_id: number;
  usuario_id: number;

    constructor(
        id: number,
        cancion_id: number,
        usuario_id: number
    ){
        this.id = id,
        this.cancion_id = cancion_id,
        this.usuario_id = usuario_id
    }
}
