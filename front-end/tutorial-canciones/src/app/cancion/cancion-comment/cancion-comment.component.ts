import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { CancionComment } from './cancion-comment';
import { CommentCancion } from './commentCancion';

@Component({
  selector: 'app-cancion-comment',
  templateUrl: './cancion-comment.component.html',
  styleUrls: ['./cancion-comment.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CancionCommentComponent implements OnInit {
  cancion: Cancion
  userId: number
  token: string
  cancionCommentForm: FormGroup

  constructor(
    private cancionService: CancionService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  ngOnInit(): void {

    console.log(this.router.snapshot.params.cancionId);
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.getCancion()
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.cancionCommentForm = this.formBuilder.group({
        comentario: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
      })
    }


     //Toggle Click Function
     $("#menu-toggle").click(function(e) {
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
    this.toastr.success(`El comentario para la cancion fue creado`, "Creación exitosa");
  }

  cancelCreate() {
    this.cancionCommentForm.reset()
    this.routerPath.navigate([`/canciones/${this.userId}/${this.token}`])
  }

  getCancion() {
    this.cancionService.getCancion(this.router.snapshot.params.cancionId)
    .subscribe(com => {
      this.cancion = com;

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

  createCancionComment(newComment: CancionComment) {
    var idUsuario = this.router.snapshot.params.userId;
    var idCancion = this.router.snapshot.params.cancionId;
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

    var comment = new CommentCancion(newComment.comentario, fecha, hora, idCancion, idUsuario);
    console.log(comment)

    this.cancionService.comentarCancion(this.token, comment)
      .subscribe(com => {
        this.showSuccess()
        this.cancionCommentForm.reset()
        this.routerPath.navigate([`/canciones/${this.userId}/${this.token}`])
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
