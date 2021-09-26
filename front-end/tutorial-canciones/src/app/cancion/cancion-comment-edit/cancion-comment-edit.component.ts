import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CancionService } from '../cancion.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentResp } from 'src/app/album/album-comment/commentResp';
import { Cancion } from 'src/app/album/album';
import { AlbumComment } from 'src/app/album/album-comment/album-comment';
import { CommentCancion } from '../commentCancion'

@Component({
  selector: 'app-cancion-comment-edit',
  templateUrl: './cancion-comment-edit.component.html',
  styleUrls: ['./cancion-comment-edit.component.css']
})
export class CancionCommentEditComponent implements OnInit {

  cancion: Cancion;
  comentarios: Array<CommentResp>
  cancionCommentForm: FormGroup
  userId: number
  token: string
  showComent: boolean
  cancionCommentId: number

  constructor(private cancionService: CancionService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.getCancion()
      this.getComentarios()
      this.getComentario()
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.cancionCommentId = this.router.snapshot.params.commentId
      this.cancionCommentForm = this.formBuilder.group({
        comentario: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
      })
    }

    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El comentario para el album fue creado`, "Creación exitosa");
  }

  ngOnChanges() {
    this.getComentarios();
  }

  getCancion() {
    this.cancionService.getCancion(this.router.snapshot.params.cancionId)
      .subscribe(com => {
        this.cancion = com;
      })
  }

  getComentario() {
    this.cancionService.getComentario(this.token, this.router.snapshot.params.commentId)
      .subscribe(com => {
        this.cancionCommentForm.get('comentario')?.setValue(com.comentario)
      }
      )
  }


  getComentarios(): void {
    if (this.cancion) {
      this.cancionService.getCancionComentarios(this.cancion.id)
        .subscribe(comen => {
          this.comentarios = comen
        },
          error => {
            console.log(error)
          })
    }
  }

  nuevoComentario() {
    this.showComent = !this.showComent;
  }

  cancelCreate() {
    this.routerPath.navigate([`/canciones/${this.userId}/${this.token}`])
  }

  editarCancionComment(newComment: AlbumComment) {
    var idUsuario = this.router.snapshot.params.userId;
    var idAlbum = this.router.snapshot.params.albumId;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var minutes = today.getMinutes();
    var hour = today.getHours();


    var ddT = '' + dd;
    var mmT = '' + mm;

    if (dd < 10) {
      ddT = '0' + dd;
    }

    if (mm < 10) {
      mmT = '0' + mm;
    }

    var fecha = yyyy + '/' + mmT + '/' + ddT;


    var minutesT = '' + minutes;
    var hourT = '' + hour;
    if (minutes < 10) {
      minutesT = '0' + minutes;
    }

    if (hour < 10) {
      hourT = '0' + hour;
    }

    var hora = hourT + ':' + minutesT;

    var comment = new CommentCancion(newComment.comentario, fecha, hora, idAlbum, idUsuario);

    this.cancionService.editarComentario(this.token, this.cancionCommentId, comment)
      .subscribe(com => {
        this.showSuccess()
        this.cancionCommentForm.reset()
        this.cancelCreate()
      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }
}
