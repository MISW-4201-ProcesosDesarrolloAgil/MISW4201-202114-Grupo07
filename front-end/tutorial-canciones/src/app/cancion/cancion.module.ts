import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CancionListComponent } from './cancion-list/cancion-list.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { CancionDetailComponent } from './cancion-detail/cancion-detail.component';
import { CancionCreateComponent } from './cancion-create/cancion-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CancionEditComponent } from './cancion-edit/cancion-edit.component';
import { AppMenuModule } from '../app-header/app-menu.module';
import { CancionCommentComponent } from './cancion-comment/cancion-comment.component';
import { CancionShareComponent } from './cancion-share/cancion-share.component';
import { CancionCommentEditComponent } from './cancion-comment-edit/cancion-comment-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, CancionCommentComponent, CancionShareComponent, CancionCommentEditComponent],
  imports: [
    CommonModule, AppHeaderModule, ReactiveFormsModule, AppMenuModule, NgbModule, NgxPaginationModule
  ],
  exports: [CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, CancionCommentComponent, CancionShareComponent, CancionCommentEditComponent]
})
export class CancionModule { }
