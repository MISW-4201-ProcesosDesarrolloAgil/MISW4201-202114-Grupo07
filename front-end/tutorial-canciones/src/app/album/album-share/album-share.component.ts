import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/usuario';
import { Album } from '../album';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '../album.service';
import { AlbumCompartir } from './albumCompartir';
import { UsuarioCompartirAlbum } from './usuarioCompartirAlbum';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-album-share',
  templateUrl: './album-share.component.html',
  styleUrls: ['./album-share.component.css'],

  providers: [NgbModalConfig, NgbModal]
})
export class AlbumShareComponent implements OnInit {
  @Input() albumComp: number;

  shareForm: FormGroup
  token: string
  modal: NgbModalRef;
  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    if (this.router.snapshot.params.userToken === " ") {
      console.log("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {

      this.token = this.router.snapshot.params.userToken
      this.shareForm = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.minLength(5)]]
      })
    }



  }


  compartirAlbum(usuarios: UsuarioCompartirAlbum) {

    var users = usuarios.nombre.split(',');
    console.log();
    for (let i = 0; i < users.length; i++) {
      if (users[i].length > 0) {
        var compartir = new AlbumCompartir(users[i], this.albumComp);
        this.albumService.compartirAlbum(this.router.snapshot.params.userId, this.token, compartir)
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
