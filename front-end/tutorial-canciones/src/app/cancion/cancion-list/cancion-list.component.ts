import { Component, OnInit } from '@angular/core';
import { Cancion, Genero } from '../cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CancionComp } from './cancionComp';
import * as $ from 'jquery';
@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.css']
})
export class CancionListComponent implements OnInit {

  public isCollapsed = true;

  generos:Array<Genero> = [
    {
      llave: "Academico",
      valor: 1
    },
    {
      llave: "Alternativo",
      valor: 2
    },
    {
      llave: "Experimental",
      valor: 3
    },
    {
      llave: "Folclor",
      valor: 4
    },
    {
      llave: "Jazz",
      valor: 5
    },
    {
      llave: "Pop",
      valor: 6
    },
    {
      llave: "Rock",
      valor: 7
    },
    {
      llave: "Tropical",
      valor: 8
    },
    {
      llave: "Urbano",
      valor: 9
    }
  ]

  constructor(
    private cancionService: CancionService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  canciones: Array<Cancion>
  mostrarCanciones: Array<Cancion>
  cancionSeleccionada: Cancion
  indiceSeleccionado: number = 0
  cancionesComp: Array<CancionComp>

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getCanciones();
    }
    //Toggle Click Function
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  getCanciones(): void {
    this.cancionService.getCancionesUsuarios(this.userId)
      .subscribe(canciones => {

        console.log(canciones)
        this.canciones = canciones
        this.mostrarCanciones = canciones
        this.onSelect(this.mostrarCanciones[0], 0)
      })

    this.cancionService.getCancionCompartidos(this.userId, this.token)
      .subscribe(canciones => {
        this.cancionesComp = canciones
        for (let i = 0; i < this.cancionesComp.length; i++) {
          this.canciones.push(this.cancionesComp[i].cancion)
          this.mostrarCanciones.push(this.cancionesComp[i].cancion)
        }

        if (canciones.length > 0) {
          this.onSelect(this.mostrarCanciones[0], 0)
        }
      })
  }

  onSelect(cancion: Cancion, indice: number) {
    this.indiceSeleccionado = indice
    this.cancionSeleccionada = cancion
    this.cancionService.getAlbumesCancion(cancion.id)
      .subscribe(albumes => {
        this.cancionSeleccionada.albumes = albumes
      },
        error => {
          this.showError(`Ha ocurrido un error: ${error.message}`)
        })

  }

  buscarCancion(busqueda: string) {
    let cancionesBusqueda: Array<Cancion> = []
    this.canciones.map(cancion => {
      if (cancion.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())) {
        cancionesBusqueda.push(cancion)
      }
    })
    this.mostrarCanciones = cancionesBusqueda.sort()
  }

  filtrarGenero(genero: any){
    let generoFiltro: Array<Cancion> = []
    this.canciones.map(cancion => {
      if (cancion.genero.valor == genero) {
        generoFiltro.push(cancion)
      }
    })
    this.mostrarCanciones = generoFiltro.sort()
  }

  filtrarInterprete(interprete: any){
    let interpreteFiltro: Array<Cancion> = []
    this.canciones.map(cancion => {
      if (cancion.interprete.toLocaleLowerCase().includes(interprete.toLocaleLowerCase())) {
        interpreteFiltro.push(cancion)
      }
    })
    this.mostrarCanciones = interpreteFiltro.sort()
  }

  eliminarCancion() {
    this.cancionService.eliminarCancion(this.cancionSeleccionada.id)
      .subscribe(cancion => {
        this.ngOnInit()
        this.showSuccess()
      },
        error => {
          this.showError("Ha ocurrido un error. " + error.message)
        })
  }

  irCrearCancion() {
    this.routerPath.navigate([`/canciones/create/${this.userId}/${this.token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La canción fue eliminada`, "Eliminada exitosamente");
  }

}
