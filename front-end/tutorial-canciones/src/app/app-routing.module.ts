import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { AlbumListComponent } from './album/album-list/album-list.component';
import { AlbumCreateComponent } from './album/album-create/album-create.component';
import { AlbumEditComponent } from './album/album-edit/album-edit.component';
import { CancionListComponent } from './cancion/cancion-list/cancion-list.component';
import { CancionCreateComponent } from './cancion/cancion-create/cancion-create.component';
import { CancionEditComponent } from './cancion/cancion-edit/cancion-edit.component';
import { AlbumJoinCancionComponent } from './album/album-join-cancion/album-join-cancion.component';
import { UsuarioSignupComponent } from './usuario/usuario-signup/usuario-signup.component';
import { AcercaDeComponent } from './inicio/acerca-de/acerca-de.component';
import { AlbumCommentComponent } from './album/album-comment/album-comment.component';
import { CancionCommentComponent } from './cancion/cancion-comment/cancion-comment.component';
import { AlbumCommentEditComponent } from './album/album-comment-edit/album-comment-edit.component';
import { CancionCommentEditComponent } from './cancion/cancion-comment-edit/cancion-comment-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'albumes/:userId/:userToken',
    component: AlbumListComponent
  },
  {
    path: 'albumes/create/:userId/:userToken',
    component: AlbumCreateComponent
  },
  {
    path: 'albumes/edit/:albumId/:userId/:userToken',
    component: AlbumEditComponent
  },
  {
    path: 'albumes/join/:albumId/:userId/:userToken',
    component: AlbumJoinCancionComponent
  },
  {
    path: 'albumes/comment/:albumId/:userId/:userToken',
    component: AlbumCommentComponent
  },
  {
    path: 'comment/edit/:commentId/:albumId/:userId/:userToken',
    component: AlbumCommentEditComponent
  },
  {
    path: 'canciones/:userId/:userToken',
    component: CancionListComponent
  },
  {
    path: 'canciones/create/:userId/:userToken',
    component: CancionCreateComponent
  },
  {
    path: 'canciones/edit/:cancionId/:userId/:userToken',
    component: CancionEditComponent
  },
  {
    path: 'canciones/comment/:cancionId/:userId/:userToken',
    component: CancionCommentComponent
  },
  {
    path: 'canciones/comment/edit/:commentId/:cancionId/:userId/:userToken',
    component: CancionCommentEditComponent
  },
  {
    path: 'acercade/:userId/:userToken',
    component: AcercaDeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
