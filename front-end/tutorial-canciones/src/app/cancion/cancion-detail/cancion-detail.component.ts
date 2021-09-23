import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../cancion';
import { CancionFavorita } from '../cancion-favorita';
import { CancionService } from '../cancion.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private cancionService: CancionService,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken

  }

  eliminarCancion(){
    this.deleteCancion.emit(this.cancion.id)
  }

  goToEdit(){
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
          this.showError(error.error)
      })
    }

    showError(error: string){
      this.toastr.error(error, "Mesaje de error")
    }

    showSuccess() {
      this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
    }

    showSuccesscf() {
      this.toastr.success(`La canción fue seleccionada como favorita`, "Seleccionada exitosamente");
    }



}
