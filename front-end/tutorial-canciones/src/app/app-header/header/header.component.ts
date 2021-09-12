import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private routerPath: Router
    ) { }

  userId: number
  token: string
  userName: string

  ngOnInit(): void {
      if(!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " "){
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        this.routerPath.navigate([`/`])
      }
      else{
        this.userId = parseInt(this.router.snapshot.params.userId)

        this.token = this.router.snapshot.params.userToken
        this.usuarioService.getUser(this.userId)
        .subscribe(usuario => { this.userName = usuario.nombre.split("@", 1)[0]
        })

      }

   }
 
  showError(error: string){
    this.toastr.error(error, "Error de autenticación")
  }

}

