import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      this.routerPath.navigate([`/`])
    }

   }

  goTo(menu: string){
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    if(menu === "logIn"){
      this.routerPath.navigate([`/`])
    }
    else if(menu === "album"){
      this.routerPath.navigate([`/albumes/${userId}/${token}`])
    }
    else if(menu === "cancion"){
      this.routerPath.navigate([`/canciones/${userId}/${token}`])
    }
    else if(menu === "acercade"){
      this.routerPath.navigate([`/acercade/${userId}/${token}`])
    }

  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

}
