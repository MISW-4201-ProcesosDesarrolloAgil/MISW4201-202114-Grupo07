import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../cancion';
import { CancionFavorita } from '../cancion-favorita';
import { CommentResp } from 'src/app/album/album-comment/commentResp';
import { ToastrService } from 'ngx-toastr';
import { CancionService } from '../cancion.service';

@Component({
  selector: 'app-cancion-detail',
  templateUrl: './cancion-detail.component.html',
  styleUrls: ['./cancion-detail.component.css']
})
export class CancionDetailComponent implements OnInit {

  @Input() cancion: Cancion;
  @Output() deleteCancion = new EventEmitter();
  cancionSeleccionada: Cancion

  userId: number;
  token: string;
  comentarios: Array<CommentResp>

  constructor(
    private cancionService: CancionService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  ngOnInit() {

    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.getComentarios()
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
    }

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

  eliminarCancion() {
    this.deleteCancion.emit(this.cancion.id)
  }

  goToEdit() {
    this.routerPath.navigate([`/canciones/edit/${this.cancion.id}/${this.userId}/${this.token}`])
  }

  goToCommentCancion() {
    this.routerPath.navigate([`/canciones/comment/${this.cancion.id}/${this.userId}/${this.token}`])
  }

  selCancionFavorita() {
      this.cancionService.selCancionFavorita(this.cancion.id, this.userId)
      .subscribe(cancionService => {
        this.ngOnInit()
        this.showSuccesscf()
      },
      error=> {
          this.showErrorcf(error.error)
      })
    }

    showErrorcf(error: string){
      this.toastr.error(error, "Mesaje de error")
    }

    showSuccessdc() {
      this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
    }

    showSuccesscf() {
      this.toastr.success(`La canción fue seleccionada como favorita`, "Seleccionada exitosamente");
    }



}
