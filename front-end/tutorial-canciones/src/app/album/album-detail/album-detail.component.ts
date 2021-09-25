import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from '../album';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AlbumService } from '../album.service';
import { Coment } from '../album-comment/coment';
import { CommentResp } from '../album-comment/commentResp';
import { CancionService } from 'src/app/cancion/cancion.service';
@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],

  providers: [NgbModalConfig, NgbModal]
})
export class AlbumDetailComponent implements OnInit {
  shareForm: FormGroup
  @Input() album: Album;
  @Output() deleteAlbum = new EventEmitter();

  userId: number;
  token: string;
  comentarios: Array<CommentResp>

  constructor(

    private cancionService: CancionService,
    private albumService: AlbumService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {


  }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken

    this.shareForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(5)]]
    })

  }

  eliminarComentario(comentario: CommentResp) {
    this.cancionService.eliminarComentario(comentario.id,)
      .subscribe(resp => {
        this.ngOnInit()
        this.showSuccessDelete()
      },
        error => {
          this.showErrorcf(error.error)
        })
  }
  showSuccessDelete() {
    this.toastr.success(`El comentario fue eliminado`, "Eliminado exitosamente");
    this.getComentarios()

  }

  ngOnChanges() {
    this.getComentarios();
  }

  showErrorcf(error: string) {
    this.toastr.error(error, "Mesaje de error")
  }

  goToEdit() {
    this.routerPath.navigate([`/albumes/edit/${this.album.id}/${this.userId}/${this.token}`])
  }

  goToJoinCancion() {
    this.routerPath.navigate([`/albumes/join/${this.album.id}/${this.userId}/${this.token}`])
  }

  goToCommentAlbum() {
    this.routerPath.navigate([`/albumes/comment/${this.album.id}/${this.userId}/${this.token}`])
  }

  eliminarAlbum() {
    this.deleteAlbum.emit(this.album.id)
  }
  open(content: any) {
    this.modalService.open(content);
  }

  getComentarios(): void {
    if (this.album) {
      this.albumService.getAlbumComentarios(this.album.id)
        .subscribe(comen => {
          console.log(comen)
          this.comentarios = comen

        },
          error => {
            console.log(error)

          })

    }

  }

}
