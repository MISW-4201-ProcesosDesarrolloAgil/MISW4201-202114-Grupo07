import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from './cancion';
import { CancionFavorita } from './cancion-favorita';
import { Album } from '../album/album';
import { Coment } from '../album/album-comment/coment';
import { CommentResp } from '../album/album-comment/commentResp';
import { CommentCancion } from './commentCancion';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private backUrl: string = "http://localhost:5000"

  constructor(private http: HttpClient) { }

  getCancionesAlbum(idAlbum: number, token: string): Observable<Cancion[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Cancion[]>(`${this.backUrl}/album/${idAlbum}/canciones`, { headers: headers })
  }

  getCanciones(): Observable<Cancion[]> {

    return this.http.get<Cancion[]>(`${this.backUrl}/canciones`)
  }

  getCancionesUsuarios(idUsuario: number): Observable<Cancion[]> {

    return this.http.get<Cancion[]>(`${this.backUrl}/usuarios/${idUsuario}/canciones`)
  }

  getAlbumesCancion(cancionId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.backUrl}/cancion/${cancionId}/albumes`)
  }

  crearCancion(cancion: Cancion): Observable<Cancion> {
    return this.http.post<Cancion>(`${this.backUrl}/canciones`, cancion)
  }

  getCancion(cancionId: number): Observable<Cancion> {
    return this.http.get<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  editarCancion(cancion: Cancion, cancionId: number): Observable<Cancion> {
    return this.http.put<Cancion>(`${this.backUrl}/cancion/${cancionId}`, cancion)
  }

  eliminarCancion(cancionId: number): Observable<Cancion> {
    return this.http.delete<Cancion>(`${this.backUrl}/cancion/${cancionId}`)
  }

  comentarCancion(token: string, coment: CommentCancion): Observable<CommentCancion> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<CommentCancion>(`${this.backUrl}/comentarios`, coment, { headers: headers })
  }

  getCancionComentarios(cancionId: number): Observable<CommentResp[]> {
    return this.http.get<CommentResp[]>(`${this.backUrl}/comentarioCancion/${cancionId}`)
  }

  selCancionFavorita(cancionId: number, userId: number): Observable<CancionFavorita>{
    return this.http.get<CancionFavorita>(`${this.backUrl}/addcancionFavorita/${cancionId}/${userId}`)
  }

}
