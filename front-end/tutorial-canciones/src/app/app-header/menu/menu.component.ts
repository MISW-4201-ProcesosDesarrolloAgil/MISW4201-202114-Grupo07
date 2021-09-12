import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute
    ) { }

  ngOnInit(): void {  }

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
      this.routerPath.navigate([`/canciones/${userId}/${token}`])
    }
    
  }

}
