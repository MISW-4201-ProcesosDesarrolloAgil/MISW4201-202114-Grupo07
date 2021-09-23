import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioCompartirCancion } from '../usuarioCompartirCancion';
import { CancionCompartir } from '../cancionCompartir';
import { CancionService } from '../cancion.service';

@Component({
  selector: 'app-cancion-share',
  templateUrl: './cancion-share.component.html',
  styleUrls: ['./cancion-share.component.css']
})
export class CancionShareComponent implements OnInit {

  @Input() albumComp: number;

  compartirForm: FormGroup;
  token: string;
  modal: NgbModalRef;

  constructor(
    private cancionService: CancionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {

    if (this.router.snapshot.params.userToken === " ") {
      console.log("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {

      this.token = this.router.snapshot.params.userToken
      this.compartirForm = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.minLength(5)]]
      })
    }
  }

  compartirCancion(usuarios: UsuarioCompartirCancion) {

    var users = usuarios.nombre.split(',');
    for (let i = 0; i < users.length; i++) {
      if (users[i].length > 0) {
        var compartir = new CancionCompartir(users[i], this.albumComp);
        this.cancionService.compartirCancion(this.router.snapshot.params.userId, this.token, compartir)
          .subscribe(com => {
            this.showSuccess()
          },
            error => {
              if (error.statusText === "UNAUTHORIZED") {
                this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
              }
              else if (error.statusText === "UNPROCESSABLE ENTITY") {
                this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
              }
              else {
                console.log(error)
                this.showError("Ha ocurrido un error. " + error.error)
              }
            })
      }


    }


  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El album ha sido compartido`, "Exito!");
  }


}
