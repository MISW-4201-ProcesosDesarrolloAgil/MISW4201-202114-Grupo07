import { Component, OnInit } from '@angular/core';
import { Cancion, Genero } from '../cancion';
import { CancionService } from '../cancion.service';
import { CancionFavorita } from '../cancion-favorita';
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

  conreultok: boolean;
  p: number = 0
  interpretes:Array<Cancion>
  
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
  interSelect:Array<String>= []

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

    selectedFeatures: any = [];
    titulo: string;
    minutos: number;
    segundos: number;
    icono: string;

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
        this.canciones = canciones
        this.mostrarCanciones = canciones
        for (let i = 0; i < this.canciones.length; i++) {
          this.cancionService.siCancionFavorita(this.canciones[i].id, this.userId)
            .subscribe(cancionService => {
              this.mostrarCanciones[i].favorito=cancionService
          })
          const id = canciones[i].id;
          const titulo = canciones[i].titulo;
          const minutos = canciones[i].minutos;
          const segundos = canciones[i].segundos;
          this.selectedFeatures = this.canciones.map(({id, titulo, minutos, segundos, usuario}) => {
            return {
              columns: [this.canciones[i].id, titulo, minutos, segundos, this.conreultok]
            };

          });
        }
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

  siCancionFavorita(indice: number) {
    this.cancionService.siCancionFavorita(indice, this.userId)
      .subscribe(cancionService => {
        this.conreultok = cancionService
    })
  }

  buscarCancion(busqueda: string) {
    let cancionesBusqueda: Array<Cancion> = []
    this.canciones.map(cancion => {
      if (cancion.titulo.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())) {
        cancionesBusqueda.push(cancion)
      }
    })
    this.mostrarCanciones = cancionesBusqueda.sort((a: Cancion, b: Cancion) => {
      if (a.titulo > b.titulo) return 1
      if (a.titulo < b.titulo) return -1
      return 0
    })
  }

  filtrarGenero(genero: any) {
    let generoFiltro: Array<Cancion> = []
    this.canciones.map(cancion => {
      if (cancion.genero.valor == genero) {
        generoFiltro.push(cancion)
      } else{

      }
    })
    this.mostrarCanciones = generoFiltro.sort((a: Cancion, b: Cancion) => {
      if (a.titulo > b.titulo) return 1
      if (a.titulo < b.titulo) return -1
      return 0
    })
  }

  filtrarInterprete(interprete: any) {
    let interpreteFiltro: Array<Cancion> = []
    this.canciones.map(cancion => {
      if (cancion.interprete.toLocaleLowerCase() == interprete.toLocaleLowerCase()) {
        interpreteFiltro.push(cancion)
      }
    })
    this.mostrarCanciones = interpreteFiltro.sort((a: Cancion, b: Cancion) => {
      if (a.titulo > b.titulo) return 1
      if (a.titulo < b.titulo) return -1
      return 0
    })
  }

  interpretesCan(){
    this.canciones.map(c => {
      if (!this.interSelect.includes(c.interprete)) {
        this.interSelect.push(c.interprete)
      }
    })
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
