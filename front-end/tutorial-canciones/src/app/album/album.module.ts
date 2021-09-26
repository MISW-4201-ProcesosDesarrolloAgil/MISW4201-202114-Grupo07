import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AppMenuModule } from '../app-header/app-menu.module';
import { AlbumJoinCancionComponent } from './album-join-cancion/album-join-cancion.component';
import { AlbumCommentComponent } from './album-comment/album-comment.component';
import { AlbumShareComponent } from './album-share/album-share.component';
import { AlbumCommentEditComponent } from './album-comment-edit/album-comment-edit.component';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent, AlbumCommentComponent, AlbumShareComponent, AlbumCommentEditComponent],

  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule, AppMenuModule, NgxPaginationModule
  ],

  exports:[AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent, AlbumShareComponent, AlbumCommentComponent]
})
export class AlbumModule { }
